import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { technologies } from "@/data/projects";
import { media } from "@/data/media";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azeem Olunloye — AI Automation Engineer" },
      {
        name: "description",
        content:
          "Azeem Olunloye designs and ships production AI automation systems — AI agents, CRM sequences, voice ops and integrations that quietly do the work.",
      },
      { property: "og:title", content: "Azeem Olunloye — AI Automation Engineer" },
      {
        property: "og:description",
        content:
          "Azeem Olunloye designs and ships production AI automation systems — AI agents, CRM sequences, voice ops and integrations that quietly do the work.",
      },
    ],
  }),
  component: Home,
});

const services = [
  {
    n: "01",
    t: "AI Agents",
    d: "Agents with memory, tools and guardrails that complete real tasks — booking, triage, intake — instead of chatting about them.",
  },
  {
    n: "02",
    t: "CRM & Lifecycle Automation",
    d: "HubSpot pipelines and follow-up sequences that personalise every touch and stop the moment a lead replies.",
  },
  {
    n: "03",
    t: "Document & Voice Intake",
    d: "Vision OCR and voice agents that turn photos, PDFs and phone calls into validated, structured records.",
  },
  {
    n: "04",
    t: "Systems Integration",
    d: "n8n, webhooks and REST glued together with retries, dedupe and audit logs so it survives the 3am edge case.",
  },
];

const process = [
  ["Discover", "One call. I map the current workflow, the failure points, and the value of removing them."],
  ["Design", "A tight architecture doc — triggers, tools, models, guardrails, cost profile."],
  ["Build", "I ship end-to-end. Real integrations, real data, no demos-only vaporware."],
  ["Handover", "Docs, dashboards, and the how-to-run-it-forever runbook."],
];

function Home() {
  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid-bg opacity-[0.55]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-20 blur-3xl bg-gradient-accent"
          />

          <div className="container-page relative grid gap-14 pt-14 pb-20 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-16 md:pt-24 md:pb-28">
            <div>
              <p className="reveal inline-flex items-center gap-2.5 rounded-full border bg-surface/70 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for select projects — 2026
              </p>

              <h1 className="reveal mt-7 font-display text-[2.75rem] leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                I build AI systems that{" "}
                <span className="text-gradient">run the work</span> nobody
                should still be doing by hand.
              </h1>

              <p className="reveal mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
                I'm Azeem Olunloye — an AI Automation Engineer. For two years
                I've shipped production workflow systems for CRM follow-up,
                document intake, voice operations and inbox triage. Reliable,
                observable, and built to keep running after I hand them over.
              </p>

              <div className="reveal mt-9 flex flex-wrap gap-3">
                <Link
                  to="/portfolio"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-ink-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  Explore my work
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center rounded-full border bg-surface px-7 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  Start a project
                </Link>
              </div>

              <dl className="reveal mt-12 grid max-w-lg grid-cols-3 gap-6 border-t pt-7">
                {[
                  { v: 2, suffix: "+ yrs", l: "Building automation" },
                  { v: 15, suffix: "+", l: "Workflows in production" },
                  { v: 24, suffix: "/7", l: "Systems always on" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="font-display text-3xl tracking-tight md:text-4xl">
                      <Counter value={s.v} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-1.5 text-xs leading-snug text-muted-foreground">
                      {s.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Portrait — framed, layered composition */}
            <div className="reveal relative mx-auto w-full max-w-sm md:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[28px] bg-gradient-accent opacity-15 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[24px] border bg-subtle shadow-lift">
                <img
                  src={media.portrait}
                  alt="Portrait of Azeem Olunloye, AI Automation Engineer"
                  width={976}
                  height={1020}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/80 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg text-ink-foreground">
                    Azeem Olunloye
                  </p>
                  <p className="text-xs text-ink-foreground/70">
                    AI Automation Engineer · Lagos, working globally
                  </p>
                </div>
              </div>

              <div className="float-soft absolute -left-4 bottom-16 hidden rounded-xl border bg-surface/90 px-4 py-3 shadow-card backdrop-blur md:block">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Live workflows
                </p>
                <p className="mt-0.5 font-display text-xl">
                  <Counter value={15} suffix="+" />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trusted technologies ─────────────────────────────── */}
        <section className="hairline-t overflow-hidden bg-muted/60" aria-label="Technologies">
          <div className="container-page pt-12 pb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              The stack I ship with
            </p>
          </div>
          <div className="relative border-y bg-surface">
            <div className="flex w-max marquee py-5">
              {[...technologies, ...technologies].map((t, i) => (
                <span
                  key={i}
                  className="mx-6 whitespace-nowrap font-display text-2xl text-muted-foreground md:text-4xl"
                >
                  {t}
                  <span className="mx-5 text-accent">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── What I build ─────────────────────────────────────── */}
        <section className="container-page py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.6fr]">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                What I build
              </p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Four disciplines,
                <br />
                one operating system.
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
                Every engagement ends the same way: a workflow that used to need
                a person now runs itself, with a log you can audit.
              </p>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((s, i) => (
                <Reveal key={s.n} delay={i * 90}>
                  <article className="card-lift group h-full rounded-2xl border bg-surface p-7 shadow-card">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-accent">{s.n}</span>
                      <span
                        aria-hidden
                        className="h-8 w-8 rounded-lg bg-gradient-accent opacity-15 transition-opacity duration-500 group-hover:opacity-40"
                      />
                    </div>
                    <h3 className="mt-6 font-display text-xl tracking-tight">{s.t}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {s.d}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────── */}
        <section className="hairline-t bg-muted">
          <div className="container-page py-24 md:py-32">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                How I work
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
                A short, honest engagement — no theatre.
              </h2>
            </Reveal>
            <ol className="mt-14 grid gap-5 md:grid-cols-4">
              {process.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 90}>
                  <div className="card-lift h-full rounded-2xl border bg-surface p-7 shadow-card">
                    <p className="font-mono text-xs text-accent">0{i + 1}</p>
                    <p className="mt-5 font-display text-lg tracking-tight">{t}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Business impact ──────────────────────────────────── */}
        <section className="hairline-t">
          <div className="container-page py-24 md:py-32">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Business impact
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
                The numbers clients actually feel.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { v: 100, suffix: "%", l: "of new leads receive a personalised follow-up" },
                { v: 60, prefix: "<", suffix: "s", l: "from receipt photo to filed, structured row" },
                { v: 2, suffix: " hrs", l: "of daily inbox triage removed per office" },
                { v: 0, l: "missed calls during kitchen service hours" },
              ].map((m, i) => (
                <Reveal key={m.l} delay={i * 80}>
                  <div className="h-full rounded-2xl border bg-surface p-7 shadow-card">
                    <p className="font-display text-4xl tracking-tight md:text-5xl">
                      <Counter value={m.v} prefix={m.prefix} suffix={m.suffix} />
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {m.l}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Portfolio CTA ────────────────────────────────────── */}
        <section className="container-page pb-24 md:pb-32">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-ink px-8 py-16 text-ink-foreground md:px-16 md:py-24">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-accent opacity-30 blur-3xl"
              />
              <div className="relative max-w-2xl">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-foreground/60">
                  Case studies
                </p>
                <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
                  Six systems, built end-to-end and still running.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-foreground/70">
                  Workflow diagrams, live screenshots and video walkthroughs for
                  every build — including the reasoning behind each guardrail.
                </p>
                <Link
                  to="/portfolio"
                  className="group mt-9 inline-flex h-13 items-center gap-2 rounded-full bg-ink-foreground px-8 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5"
                >
                  View portfolio
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Contact CTA ──────────────────────────────────────── */}
        <section className="hairline-t">
          <div className="container-page grid gap-8 py-20 md:grid-cols-[1.6fr_1fr] md:items-end md:py-28">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-balance md:text-7xl">
                Let's remove
                <br />
                the busywork.
              </h2>
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-ink-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                Start a project
              </Link>
              <a
                href="https://wa.me/2348138602053?text=Hi%20Azeem%2C%20I%27d%20like%20to%20talk%20about%20automation."
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border px-6 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                Message on WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
