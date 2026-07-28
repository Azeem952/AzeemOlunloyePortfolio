import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { projects, technologies } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azeem Olunloye — AI Automation Engineer" },
      {
        name: "description",
        content:
          "Azeem Olunloye designs and ships production AI automation systems — CRM sequences, agents, and integrations that quietly do the work.",
      },
      { property: "og:title", content: "Azeem Olunloye — AI Automation Engineer" },
      {
        property: "og:description",
        content:
          "Production AI automation systems — CRM sequences, agents, and integrations that quietly do the work.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        {/* Hero */}
        <section className="container-page pt-16 pb-24 md:pt-28 md:pb-40">
          <p className="reveal mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Available for select projects — 2026
          </p>
          <h1 className="reveal font-display text-5xl leading-[0.95] tracking-tight text-balance md:text-8xl">
            I build quiet AI systems<br />
            <span className="italic text-muted-foreground">that do loud work.</span>
          </h1>
          <div className="reveal mt-10 grid gap-8 md:grid-cols-[2fr_1fr] md:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-balance">
              I'm Azeem — an AI automation engineer with two years shipping
              workflow systems that replace repetitive human effort with
              reliable, observable software. CRM follow-ups, agentic booking,
              document intake, integrations that just work.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                to="/portfolio"
                className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                See selected work
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-11 items-center rounded-full border px-6 text-sm font-medium transition-colors hover:bg-subtle"
              >
                Start a project
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-8 md:grid-cols-4">
            {[
              ["2+ yrs", "Building automation"],
              ["12+", "Workflows in production"],
              ["24/7", "Systems always on"],
              ["Global", "Clients & timezones"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-3xl md:text-4xl">{v}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What I do */}
        <section className="hairline-t">
          <div className="container-page grid gap-12 py-24 md:grid-cols-[1fr_2fr] md:py-32">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                What I do
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Four things,<br />done exceptionally.
              </h2>
            </div>
            <div className="grid gap-px bg-border md:grid-cols-2">
              {[
                {
                  n: "01",
                  t: "AI Agents",
                  d: "Conversational agents with memory, tools and guardrails — not chat toys.",
                },
                {
                  n: "02",
                  t: "CRM Automation",
                  d: "HubSpot, pipelines, lifecycle-aware sequences that stop when a lead replies.",
                },
                {
                  n: "03",
                  t: "Document Intake",
                  d: "Vision OCR, structured JSON, validation and confident writes to your system of record.",
                },
                {
                  n: "04",
                  t: "Integrations",
                  d: "n8n, webhooks and REST — glued together so it survives the 3am edge case.",
                },
              ].map((s) => (
                <div key={s.n} className="bg-background p-8">
                  <p className="font-mono text-xs text-muted-foreground">{s.n}</p>
                  <h3 className="mt-4 text-xl font-medium">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured work */}
        <section className="container-page py-24 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Selected work</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Recent shipments</h2>
            </div>
            <Link to="/portfolio" className="text-sm underline underline-offset-4">
              All projects →
            </Link>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            {featured.map((p, i) => (
              <Link
                key={p.slug}
                to="/portfolio/$slug"
                params={{ slug: p.slug }}
                className={`group block ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="relative overflow-hidden rounded-lg bg-subtle">
                  <img
                    src={p.gallery[0]?.src ?? p.cover}
                    alt={p.title}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
                      i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} · {p.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl leading-tight md:text-3xl">
                      {p.title}
                    </h3>
                  </div>
                  <span className="mt-2 inline-block text-sm text-muted-foreground transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="hairline-t bg-muted">
          <div className="container-page py-24 md:py-32">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Process</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-balance md:text-6xl">
              A short, honest engagement — no theatre.
            </h2>
            <ol className="mt-16 grid gap-px bg-border md:grid-cols-4">
              {[
                ["Discover", "One call. I map the current workflow, the failure points, and the value of removing them."],
                ["Design", "A tight architecture doc — triggers, tools, models, guardrails, cost profile."],
                ["Build", "I ship end-to-end. Real integrations, real data, no demos-only vaporware."],
                ["Handover", "Docs, dashboards, and the how-to-run-it-forever runbook."],
              ].map(([t, d], i) => (
                <li key={t} className="bg-background p-8">
                  <p className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </p>
                  <p className="mt-4 text-lg font-medium">{t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Technologies */}
        <section className="hairline-t overflow-hidden">
          <div className="container-page py-16">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Stack</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl md:text-4xl">
              The tools I actually ship with.
            </h2>
          </div>
          <div className="relative border-y">
            <div className="flex w-max marquee py-6">
              {[...technologies, ...technologies].map((t, i) => (
                <span
                  key={i}
                  className="mx-8 whitespace-nowrap font-display text-3xl text-muted-foreground md:text-5xl"
                >
                  {t} <span className="mx-6 text-accent">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-page py-24 md:py-40">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-end">
            <h2 className="font-display text-5xl leading-[1] tracking-tight text-balance md:text-8xl">
              Let's remove<br />the busywork.
            </h2>
            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
              >
                Start a project
              </Link>
              <a
                href="https://wa.me/2348138602053"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border px-6 text-sm font-medium"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
