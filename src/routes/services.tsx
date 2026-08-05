import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import {
  CtaBand,
  Eyebrow,
  GhostLink,
  PrimaryLink,
  TechLogo,
} from "@/components/ui-kit";
import { processSteps, services, stack } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AI Automation & Workflow Engineering" },
      {
        name: "description",
        content:
          "Workflow automation, AI agents, CRM automation, system integration, document processing and lead generation systems built and documented end to end.",
      },
      { property: "og:title", content: "Services — Azeem Olunloye" },
      {
        property: "og:description",
        content:
          "Automation services: workflows, AI agents, CRM, integrations, document processing and lead generation.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        <section className="container-page pt-14 pb-4 text-center md:pt-24">
          <Reveal>
            <Eyebrow>Services</Eyebrow>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-[40px] font-extrabold leading-[1.06] tracking-[-0.02em] text-balance md:text-[64px] md:leading-[72px]">
              Automation built around your process
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-[1.7] text-muted-foreground">
              Six ways I remove manual work — each delivered with architecture,
              monitoring and documentation, not just a workflow file.
            </p>
          </Reveal>
        </section>

        <section className="container-page section-y">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <article className="card-lift flex h-full flex-col rounded-2xl border bg-surface p-8">
                  <TechLogo name={s.brand} size={40} showName={false} />
                  <h2 className="mt-6 font-display text-xl font-extrabold tracking-tight">
                    {s.name}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {s.summary}
                  </p>
                  <ul className="mt-6 space-y-3 text-[15px]">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="text-muted-foreground">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-4 pt-8">
                    {s.tools.map((t) => (
                      <TechLogo key={t} name={t} size={22} showName={false} />
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="hairline-t hairline-b bg-muted">
          <div className="container-page section-y">
            <Reveal>
              <Eyebrow>How I work</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-balance md:text-[44px]">
                A four-step process, no surprises
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((s, i) => (
                <Reveal key={s.n} delay={i * 70}>
                  <div className="card-lift h-full rounded-2xl border bg-surface p-7">
                    <span className="font-display text-3xl font-extrabold text-accent">
                      {s.n}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {s.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page section-y">
          <Reveal>
            <div className="text-center">
              <Eyebrow>The stack</Eyebrow>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-balance md:text-[44px]">
                Tools I use in production
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {stack.map((t) => (
                <div
                  key={t}
                  className="flex flex-col items-center gap-3 rounded-2xl border bg-surface px-4 py-6 text-center"
                >
                  <TechLogo name={t} size={32} showName={false} />
                  <span className="text-sm font-semibold">{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <PrimaryLink to="/contact">Book a discovery call →</PrimaryLink>
            <GhostLink to="/portfolio">See real builds</GhostLink>
          </div>
        </section>

        <FaqSection />

        <CtaBand
          title="Not sure which one you need?"
          body="Describe the process that keeps eating your week. I'll tell you whether it's worth automating — before you spend anything."
        />
      </main>
      <Footer />
    </div>
  );
}
