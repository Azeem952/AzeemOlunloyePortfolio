import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().max(100).optional().default("Website Lead"),
  email: z.string().trim().email("Please provide a valid email address.").max(255),
  subject: z.string().trim().max(150).optional().default("Portfolio Inquiry"),
  message: z.string().trim().max(4000).optional().default("New lead from website form."),
  source: z.string().trim().max(100).optional().default("Contact Form"),
});

export type ContactInput = z.infer<typeof leadSchema>;

const SITE = "azeemolunloye-portfolio.vercel.app";
const DEFAULT_CHAT_ID = "1238144142";

const esc = (v: string) =>
  (v || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const submittedAt = new Date().toISOString();

    // 1) Support both TELEGRAM_ and VITE_TELEGRAM_ naming conventions, strip any accidental quotes
    const rawToken =
      process.env["TELEGRAM_BOT_TOKEN"] ||
      process.env["VITE_TELEGRAM_BOT_TOKEN"] ||
      process.env["BOT_TOKEN"];

    const rawChatId =
      process.env["TELEGRAM_CHAT_ID"] ||
      process.env["VITE_TELEGRAM_CHAT_ID"] ||
      process.env["CHAT_ID"] ||
      DEFAULT_CHAT_ID;

    const token = rawToken?.replace(/^['"]+|['"]+$/g, "").trim();
    const chatId = rawChatId?.replace(/^['"]+|['"]+$/g, "").trim();

    console.log(
      `[Telegram] Processing lead from: ${data.source}. Bot Token configured: ${Boolean(token)}, Chat ID: ${chatId}`
    );

    let notified = false;

    if (token) {
      const htmlText = [
        `📩 <b>NEW LEAD: ${esc(data.source || "Website Form")}</b>`,
        "",
        `<b>Name:</b> ${esc(data.name || "N/A")}`,
        `<b>Email:</b> ${esc(data.email)}`,
        `<b>Subject:</b> ${esc(data.subject || "N/A")}`,
        "",
        "<b>Message:</b>",
        esc(data.message || "N/A"),
        "",
        `<b>Time:</b> ${esc(submittedAt)}`,
        `<b>Website:</b> ${SITE}`,
      ].join("\n");

      const plainText = [
        `📩 NEW LEAD: ${data.source || "Website Form"}`,
        "",
        `Name: ${data.name || "N/A"}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject || "N/A"}`,
        "",
        "Message:",
        data.message || "N/A",
        "",
        `Time: ${submittedAt}`,
        `Website: ${SITE}`,
      ].join("\n");

      // Attempt 1: Rich HTML formatting
      try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: htmlText,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        });

        const payload = (await res.json().catch(() => null)) as {
          ok?: boolean;
          description?: string;
        } | null;

        if (res.ok && payload?.ok) {
          notified = true;
          console.log("[Telegram] Message successfully delivered (HTML mode)");
        } else {
          console.warn(
            `[Telegram] HTML delivery failed [${res.status}]: ${payload?.description ?? "unknown"}. Retrying with plain text...`
          );

          // Attempt 2: Plain text fallback (prevents HTML tag formatting rejection)
          const retryRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: plainText,
              disable_web_page_preview: true,
            }),
          });

          const retryPayload = (await retryRes.json().catch(() => null)) as {
            ok?: boolean;
            description?: string;
          } | null;

          if (retryRes.ok && retryPayload?.ok) {
            notified = true;
            console.log("[Telegram] Message successfully delivered (Plain text mode)");
          } else {
            console.error(
              `[Telegram] Plain text fallback failed [${retryRes.status}]: ${retryPayload?.description ?? "unknown"}`
            );
          }
        }
      } catch (err) {
        console.error("[Telegram] Network error dispatching to Telegram Bot API:", err);
      }
    } else {
      console.error(
        "[Telegram] TELEGRAM_BOT_TOKEN is not configured! Please add TELEGRAM_BOT_TOKEN to your environment variables."
      );
    }

    // 2) Best-effort database backup (if Supabase is ever connected)
    try {
      const { publicClient } = await import("./cms.server");
      const client = publicClient();
      if (client) {
        const { error } = await client.from("contact_submissions").insert({
          id: crypto.randomUUID(),
          name: data.name || "Website Lead",
          email: data.email,
          subject: data.subject || "Website Form",
          message: data.message || "",
          source: data.source || "contact-page",
        });
        if (error) console.warn("Supabase archive non-fatal note:", error);
      }
    } catch {
      // Ignored for standalone mode
    }

    if (!notified) {
      throw new Error("delivery_failed");
    }

    return { ok: true as const, submittedAt };
  });
