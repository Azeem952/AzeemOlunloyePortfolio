import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { submitContact } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Azeem Olunloye, AI Automation Engineer" },
      {
        name: "description",
        content:
          "Start an automation project with Azeem Olunloye. Send a brief, message on WhatsApp, or connect on LinkedIn. Replies within one working day.",
      },
      { property: "og:title", content: "Contact — Azeem Olunloye" },
      {
        property: "og:description",
        content: "Start an automation project with Azeem Olunloye — AI Automation Engineer.",
      },
    ],
  }),
  component: Contact,
});

const EMAIL = "azeemolunloye@gmail.com";
const WHATSAPP =
  "https://wa.me/2348138602053?text=Hi%20Azeem%2C%20I%27d%20like%20to%20talk%20about%20automation.";
const LINKEDIN =
  "https://www.linkedin.com/in/azeem-olunloye-42177141b?utm_source=share_via&utm_content=profile&utm_medium=member_io";

type Status = "idle" | "sending" | "sent" | "error";

function Contact() {
  const send = useServerFn(submitContact);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "A working email helps me reply.";
    if (form.message.trim().length < 10)
      errs.message = "A little more context, please (10 characters minimum).";
    if (form.message.trim().length > 4000) errs.message = "That's a little too long.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setStatus("sending");
    try {
      await send({
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        },
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setServerError(
        "Something went wrong sending your message. Please try WhatsApp or email me directly.",
      );
    }
  };

  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
          <div className="container-page relative pt-16 pb-12 md:pt-24">
            <p className="reveal inline-flex items-center gap-2.5 rounded-full border bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open for new projects — remote, worldwide
            </p>
            <h1 className="reveal mt-6 max-w-3xl font-display text-[2.75rem] leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
              Let's talk about <span className="text-gradient">what to automate.</span>
            </h1>
            <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              The best briefs are one paragraph long: the workflow that's costing
              you time, what you've already tried, and what "done" would look
              like. I read everything and reply within one working day.
            </p>
          </div>
        </section>

        <section className="container-page grid gap-12 pb-24 md:grid-cols-[1.35fr_1fr] md:gap-16 md:pb-32">
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              aria-describedby="form-status"
              className="rounded-2xl border bg-surface p-6 shadow-card md:p-9"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Name"
                  id="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  error={errors.name}
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  error={errors.email}
                />
              </div>
              <div className="mt-6">
                <Field
                  label="Subject (optional)"
                  id="subject"
                  value={form.subject}
                  onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  maxLength={4000}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  aria-invalid={!!errors.message}
                  aria-errormessage={errors.message ? "message-error" : undefined}
                  className="w-full resize-none rounded-xl border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-accent"
                  placeholder="What are you trying to automate?"
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-ink-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift disabled:translate-y-0 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <p id="form-status" role="status" aria-live="polite" className="text-sm">
                  {status === "sent" && (
                    <span className="text-accent">
                      Thank you — your message is in. I'll reply within one working day.
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-destructive">{serverError}</span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={120}>
            <aside className="space-y-8">
              <div className="rounded-2xl border bg-surface p-6 shadow-card">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Prefer to chat?
                </p>
                <ul className="mt-4 space-y-1">
                  <ContactLink
                    href={WHATSAPP}
                    external
                    label="WhatsApp"
                    value="+234 813 860 2053"
                  />
                  <ContactLink
                    href={LINKEDIN}
                    external
                    label="LinkedIn"
                    value="Azeem Olunloye"
                  />
                  <ContactLink href={`mailto:${EMAIL}`} label="Email" value={EMAIL} last />
                </ul>
              </div>

              <div className="rounded-2xl border bg-muted p-6">
                <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                  Availability
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Always open to new automation projects — no waitlist, no cap.
                  Typical engagements run one to four weeks from brief to handover.
                </p>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                If the workflow is worth automating, I'll say so — and if it
                isn't, I'll tell you that too, before you spend anything.
              </p>
            </aside>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ContactLink({
  href,
  label,
  value,
  external,
  last,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
  last?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className={`group flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:text-accent ${
          last ? "" : "border-b"
        }`}
      >
        <span className="min-w-0">
          <span className="block text-xs uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
          <span className="mt-1 block truncate text-base">{value}</span>
        </span>
        <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </li>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-errormessage={error ? `${id}-error` : undefined}
        className="w-full rounded-xl border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-accent"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
