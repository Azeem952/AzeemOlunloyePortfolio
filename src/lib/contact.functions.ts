import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name.").max(100),
  email: z.string().trim().email("A working email helps.").max(255),
  subject: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(10, "A little more context, please.").max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;

const NOTIFY_TO = "azeemolunloye@gmail.com";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const submittedAt = new Date().toISOString();

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        subject: data.subject || null,
        message: data.message,
        source: "contact-page",
      })
      .select("id")
      .single();

    if (error) {
      console.error("contact insert failed", error);
      throw new Error("Your message could not be saved. Please try WhatsApp or email.");
    }

    let emailed = false;
    try {
      const apiKey = process.env.LOVABLE_API_KEY;
      const senderDomain = process.env.LOVABLE_EMAIL_DOMAIN;
      if (apiKey && senderDomain) {
        const { sendLovableEmail } = await import("@lovable.dev/email-js");
        const subject = data.subject
          ? `Portfolio enquiry — ${data.subject}`
          : `Portfolio enquiry from ${data.name}`;

        const lines = [
          `New contact form submission`,
          ``,
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Subject: ${data.subject || "(none)"}`,
          `Submitted: ${submittedAt}`,
          ``,
          `Message:`,
          data.message,
        ];

        const result = await sendLovableEmail(
          {
            to: NOTIFY_TO,
            from: `notify@${senderDomain}`,
            sender_domain: senderDomain,
            reply_to: data.email,
            subject,
            text: lines.join("\n"),
            html: `<pre style="font:14px/1.6 ui-sans-serif,system-ui,sans-serif;white-space:pre-wrap">${lines
              .join("\n")
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")}</pre>`,
            idempotency_key: row.id,
          },
          { apiKey },
        );
        emailed = result.success === true;
      }
    } catch (err) {
      console.error("contact email dispatch failed", err);
    }


    await supabaseAdmin
      .from("contact_submissions")
      .update({ email_status: emailed ? "sent" : "stored_only" })
      .eq("id", row.id);

    return { ok: true as const, id: row.id, emailed, submittedAt };
  });
