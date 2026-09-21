import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name.").max(100),
  email: z.string().trim().email("A working email helps.").max(255),
  subject: z.string().trim().min(2, "Please add a subject.").max(150),
  message: z.string().trim().min(10, "A little more context, please.").max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;

const SITE = "azeemolunloye-portfolio.vercel.app";
const DEFAULT_CHAT_ID = "1238144142";

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const submittedAt = new Date().toISOString();

    // 1) Telegram is the delivery channel — it decides success/failure.
    const token = process.env["TELEGRAM_BOT_TOKEN"];
    const chatId = process.env["TELEGRAM_CHAT_ID"] || DEFAULT_CHAT_ID;

    let notified = false;
    if (token) {
      const text = [
        "📩 <b>NEW PORTFOLIO LEAD</b>",
        "",
        "<b>Name:</b>",
        esc(data.name),
        "",
        "<b>Email:</b>",
        esc(data.email),
        "",
        "<b>Subject:</b>",
        esc(data.subject),
        "",
        "<b>Message:</b>",
        esc(data.message),
        "",
        "<b>Time:</b>",
        esc(submittedAt),
        "",
        "<b>Website:</b>",
        SITE,
      ].join("\n");

      for (let attempt = 0; attempt < 2 && !notified; attempt++) {
        try {
          const res = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: "HTML",
                disable_web_page_preview: true,
              }),
            },
          );
          const payload = (await res.json().catch(() => null)) as
            | { ok?: boolean; description?: string }
            | null;
          if (res.ok && payload?.ok) notified = true;
          else
            console.error(
              `telegram send failed [${res.status}]: ${payload?.description ?? "unknown"}`,
            );
        } catch (err) {
          console.error("telegram dispatch failed", err);
        }
      }
    } else {
      console.error("TELEGRAM_BOT_TOKEN is not configured in this environment");
    }

    // 2) Archive the submission (best effort — never blocks delivery).
    try {
      const { publicClient } = await import("./cms.server");
      const client = publicClient();
      if (client) {
        const { error } = await client.from("contact_submissions").insert({
          id: crypto.randomUUID(),
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          source: "contact-page",
        });
        if (error) console.error("contact insert failed", error);
      }
    } catch (err) {
      console.error("contact archive failed", err);
    }

    if (!notified) {
      throw new Error("delivery_failed");
    }

    return { ok: true as const, submittedAt };
  });
