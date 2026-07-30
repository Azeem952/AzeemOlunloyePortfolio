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
      const { sendLovableEmail } = await import("@lovable.dev/email-js");
      const subject = data.subject
        ? `Portfolio enquiry — ${data.subject}`
        : `Portfolio enquiry from ${data.name}`;

      const result = await sendLovableEmail({
        to: NOTIFY_TO,
        replyTo: data.email,
        subject,
        text: [
          `New contact form submission`,
          ``,
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Subject: ${data.subject || "(none)"}`,
          `Submitted: ${submittedAt}`,
          ``,
          `Message:`,
          data.message,
        ].join("\n"),
      });
      emailed = result?.sent !== false;
    } catch (err) {
      console.error("contact email dispatch failed", err);
    }

    await supabaseAdmin
      .from("contact_submissions")
      .update({ email_status: emailed ? "sent" : "stored_only" })
      .eq("id", row.id);

    return { ok: true as const, id: row.id, emailed, submittedAt };
  });
