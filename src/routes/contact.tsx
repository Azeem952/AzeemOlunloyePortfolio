import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Azeem Olunloye" },
      {
        name: "description",
        content:
          "Start a project with Azeem Olunloye. Message on WhatsApp, connect on LinkedIn, or send a brief.",
      },
      { property: "og:title", content: "Contact — Azeem Olunloye" },
      {
        property: "og:description",
        content: "Start a project with Azeem Olunloye — AI Automation Engineer.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "A working email helps.";
    if (form.message.trim().length < 10)
      errs.message = "A little more context, please.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setState("sending");
    const subject = encodeURIComponent(`Project enquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:azeemiolunloye@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => setState("sent"), 400);
  };

  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        <section className="container-page pt-16 pb-12 md:pt-28">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-balance md:text-8xl">
            Let's talk about<br />
            <span className="italic text-muted-foreground">what to automate.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            The best briefs are one paragraph long: the workflow that's costing
            you time, what you've tried, and what "done" would look like. I read
            everything.
          </p>
        </section>

        <section className="container-page grid gap-16 pb-24 md:grid-cols-[1.4fr_1fr] md:pb-32">
          <form onSubmit={onSubmit} noValidate className="space-y-6">
            <Field
              label="Name"
              id="name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              error={errors.name}
            />
            <Field
              label="Email"
              id="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              error={errors.email}
            />
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                aria-invalid={!!errors.message}
                className="w-full resize-none border-0 border-b bg-transparent py-3 text-lg outline-none focus:border-foreground"
                placeholder="What are you trying to automate?"
              />
              {errors.message && (
                <p className="mt-2 text-xs text-destructive">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {state === "sent" ? "Opening your mail app…" : state === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>

          <aside className="space-y-10 md:pl-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Prefer to chat?
              </p>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="https://wa.me/2348138602053?text=Hi%20Azeem%2C%20I%27d%20like%20to%20talk%20about%20automation."
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-baseline justify-between border-b py-3"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                        WhatsApp
                      </span>
                      <span className="mt-1 block text-lg">+234 813 860 2053</span>
                    </span>
                    <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/azeem-olunloye-42177141b?utm_source=share_via&utm_content=profile&utm_medium=member_io"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-baseline justify-between border-b py-3"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                        LinkedIn
                      </span>
                      <span className="mt-1 block text-lg">Azeem Olunloye</span>
                    </span>
                    <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:azeemiolunloye@gmail.com"
                    className="group flex items-baseline justify-between border-b py-3"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                        Email
                      </span>
                      <span className="mt-1 block text-lg">azeemiolunloye@gmail.com</span>
                    </span>
                    <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Response time
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Within one working day. If it's urgent, WhatsApp is fastest.
              </p>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
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
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-0 border-b bg-transparent py-3 text-lg outline-none focus:border-foreground"
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
