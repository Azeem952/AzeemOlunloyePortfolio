import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Eyebrow, HexPortrait } from "@/components/ui-kit";
import { media } from "@/data/media";
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
const PHONE = "+234 813 860 2053";
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
      errs.email = "Please enter a valid email address.";
    if (form.subject.trim().length < 2) errs.subject = "Please add a subject.";
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
      setErrors({});
      toast.success("Message sent successfully.");
    } catch {
      setStatus("error");
      setServerError("Unable to send message. Please try again later.");
      toast.error("Unable to send message. Please try again later.");
    }

  };

  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        <section className="container-page grid items-center gap-14 pt-14 pb-16 md:grid-cols-[1.1fr_0.9fr] md:pt-24 md:pb-20">
          <div>
            <Reveal>
              <Eyebrow>Available for new projects</Eyebrow>
              <h1 className="mt-6 font-display text-[40px] font-extrabold leading-[1.06] tracking-[-0.02em] text-balance md:text-[64px] md:leading-[72px]">
                Let's talk about what to automate
              </h1>
              <p className="mt-6 max-w-xl text-[18px] leading-[1.7] text-muted-foreground">
                The best briefs are one paragraph: the workflow that's costing
                you time, what you've already tried, and what "done" looks like.
                I read everything and reply within one working day.
              </p>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <InfoCard label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
                <InfoCard label="WhatsApp" value={PHONE} href={WHATSAPP} external />
                <InfoCard label="LinkedIn" value="Azeem Olunloye" href={LINKEDIN} external />
                <InfoCard label="Location" value="Remote — worldwide" />
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <HexPortrait src={media.portraitHero} alt="Azeem Olunloye" />
          </Reveal>
        </section>

        <section className="container-page grid gap-8 pb-20 md:grid-cols-[1.4fr_1fr] md:pb-28">
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              aria-describedby="form-status"
              className="rounded-2xl border bg-surface p-7 shadow-card md:p-10"
            >
              <h2 className="font-display text-2xl font-extrabold tracking-tight">
                Send a brief
              </h2>
              <div className="mt-7 grid gap-6 sm:grid-cols-2">
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
                  label="Subject"
                  id="subject"
                  value={form.subject}
                  onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                  error={errors.subject}
                />
              </div>


              <div className="mt-6">
                <label htmlFor="message" className="mb-2 block text-sm font-bold">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={7}
                  maxLength={4000}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  aria-invalid={!!errors.message}
                  aria-errormessage={errors.message ? "message-error" : undefined}
                  className="w-full resize-none rounded-xl border bg-background px-4 py-3 text-base outline-none transition-[border-color,box-shadow] duration-200 placeholder:opacity-70 placeholder:transition-opacity focus:border-accent focus:shadow-green focus:placeholder:opacity-40"
                  placeholder="What are you trying to automate?"
                />
                {errors.message && (
                  <p id="message-error" className="animate-fade-in mt-2 text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex h-14 items-center gap-2 rounded-xl bg-accent px-7 text-[15px] font-bold text-accent-foreground shadow-green transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-2 disabled:translate-y-0 disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      Sending...
                      <span
                        aria-hidden
                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      />
                    </>
                  ) : status === "sent" ? (
                    <>
                      Sent
                      <span aria-hidden className="check-pop inline-block">✓</span>
                    </>
                  ) : (
                    <>
                      Send message
                      <span className="cta-arrow">→</span>
                    </>
                  )}
                </button>

                <p id="form-status" role="status" aria-live="polite" className="text-sm">
                  {status === "sent" && (
                    <span className="animate-fade-in inline-flex items-center gap-2 font-semibold text-accent-2">
                      <span
                        aria-hidden
                        className="check-pop grid h-5 w-5 place-items-center rounded-full bg-accent text-[11px] text-accent-foreground"
                      >
                        ✓
                      </span>
                      Message sent successfully.
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
            <aside className="space-y-6">
              <div className="rounded-2xl border bg-surface p-7">
                <p className="text-sm font-extrabold">Other ways to reach me</p>
                <ul className="mt-4 space-y-1">
                  <ContactLink href={WHATSAPP} external label="WhatsApp" value={PHONE} />
                  <ContactLink href={LINKEDIN} external label="LinkedIn" value="Azeem Olunloye" />
                  <ContactLink href={`mailto:${EMAIL}`} label="Email" value={EMAIL} last />
                </ul>
              </div>

              <div className="rounded-2xl border bg-muted p-7">
                <p className="flex items-center gap-2 text-sm font-extrabold">
                  <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                  Availability
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Always open to new automation projects — no waitlist, no cap.
                  Typical engagements run one to four weeks from brief to handover.
                </p>
              </div>

              <div className="bg-gradient-ink rounded-2xl p-7">
                <p className="text-sm font-extrabold text-ink-foreground">
                  Good fits for me
                </p>
                <ul className="mt-4 space-y-3 text-[15px] text-ink-foreground/75">
                  {[
                    "Repetitive multi-tool processes",
                    "Lead follow-up and CRM hygiene",
                    "Document and receipt intake",
                    "Customer enquiries answered 24/7",
                  ].map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function InfoCard({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <div className="rounded-xl border bg-surface px-5 py-4 transition-colors hover:border-accent">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 truncate text-[15px] font-semibold">{value}</p>
    </div>
  );
  if (!href) return inner;
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {inner}
    </a>
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
          <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </span>
          <span className="mt-1 block truncate text-[15px] font-semibold">{value}</span>
        </span>
        <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
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
      <label htmlFor={id} className="mb-2 block text-sm font-bold">
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
        className="h-14 w-full rounded-xl border bg-background px-4 text-base outline-none transition-[border-color,box-shadow] duration-200 placeholder:opacity-70 placeholder:transition-opacity focus:border-accent focus:shadow-green focus:placeholder:opacity-40"
      />
      {error && (
        <p id={`${id}-error`} className="animate-fade-in mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
