import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import {
  CtaBand,
  Eyebrow,
  HexPortrait,
  StatBlock,
  TechLogo,
} from "@/components/ui-kit";
import { media } from "@/data/media";
import { stack } from "@/data/services";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Azeem Olunloye, AI Automation Engineer" },
      {
        name: "description",
        content:
          "The journey, skills and tools behind 2+ years of building AI agents, CRM automations and document pipelines that run in production.",
      },
      { property: "og:title", content: "About — Azeem Olunloye" },
      {
        property: "og:description",
        content:
          "From manual operations to autonomous systems — how I build AI automation that businesses actually keep running.",
      },
    ],
  }),
  component: About,
});

const timeline = [
  {
    year: "2023",
    title: "First automations",
    detail:
      "Started replacing spreadsheet-and-copy-paste operations with scripted workflows, learning where automation breaks in the real world.",
  },
  {
    year: "2024",
    title: "Going all-in on n8n and LLMs",
    detail:
      "Moved from scripts to orchestrated workflows: webhooks, retries, and LLM steps for classification, extraction and drafting.",
  },
  {
    year: "2025",
    title: "Production AI agents",
    detail:
      "Shipped WhatsApp and web agents that qualify, book and file — with reply detection, confidence checks and human handoff.",
  },
  {
    year: "2026",
    title: "End-to-end automation systems",
    detail:
      "Full systems for CRM, document intake, lead generation and reporting — designed, built, documented and handed over.",
  },
];

const skills = [
  { name: "Workflow orchestration", level: "n8n, Make, Zapier" },
  { name: "LLM engineering", level: "Prompting, JSON schemas, evaluation" },
  { name: "API & webhook integration", level: "REST, auth, retries, queues" },
  { name: "CRM systems", level: "HubSpot, Salesforce, Airtable" },
  { name: "Data & OCR pipelines", level: "Vision models, validation, filing" },
  { name: "Conversational agents", level: "WhatsApp, Telegram, web chat" },
];

function About() {
  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        <section className="container-page grid items-center gap-14 pt-14 pb-16 md:grid-cols-[1.1fr_0.9fr] md:pt-24 md:pb-24">
          <div>
            <Reveal>
              <Eyebrow>About me</Eyebrow>
              <h1 className="mt-6 font-display text-[40px] font-extrabold leading-[1.06] tracking-[-0.02em] text-balance md:text-[64px] md:leading-[72px]">
                I turn manual operations into systems that run themselves
              </h1>
              <p className="mt-6 max-w-xl text-[18px] leading-[1.7] text-muted-foreground">
                I'm Azeem Olunloye, an AI Automation Engineer. For 2+ years I've
                been building the unglamorous infrastructure behind growing
                teams: the follow-ups that always go out, the receipts that file
                themselves, the enquiries answered at 2am.
              </p>
              <p className="mt-4 max-w-xl text-[18px] leading-[1.7] text-muted-foreground">
                My work sits between operations and engineering — mapping how a
                business actually runs, then rebuilding the repetitive parts as
                dependable automation with monitoring and clear handover.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <HexPortrait
              src={media.portraitHero}
              alt="Portrait of Azeem Olunloye"
            />
          </Reveal>
        </section>

        <section className="hairline-t hairline-b bg-muted">
          <div className="container-page py-14">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <StatBlock value="2+" label="Years of experience" />
              <StatBlock value="15+" label="Automations in production" />
              <StatBlock value="20+" label="Platforms integrated" />
              <StatBlock value="100%" label="Remote, working globally" />
            </div>
          </div>
        </section>

        <section className="container-page section-y">
          <Reveal>
            <Eyebrow>My journey</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-balance md:text-[44px]">
              From scripts to autonomous systems
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-0 md:grid-cols-2">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 70}>
                <div className="relative h-full border-l pl-8 pb-10">
                  <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-background bg-accent" />
                  <p className="text-sm font-extrabold text-accent">{t.year}</p>
                  <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                    {t.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="hairline-t bg-muted">
          <div className="container-page section-y">
            <Reveal>
              <Eyebrow>Skills</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-balance md:text-[44px]">
                What I'm good at
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((s, i) => (
                <Reveal key={s.name} delay={i * 60}>
                  <div className="card-lift h-full rounded-2xl border bg-surface p-7">
                    <h3 className="font-display text-lg font-extrabold tracking-tight">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-[15px] text-muted-foreground">
                      {s.level}
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
              <Eyebrow>Tools I use</Eyebrow>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-balance md:text-[44px]">
                The stack behind the systems
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
        </section>

        <CtaBand
          title="Let's build something that runs without you"
          body="If a process in your business happens the same way every week, it probably shouldn't need a person."
        />
      </main>
      <Footer />
    </div>
  );
}
