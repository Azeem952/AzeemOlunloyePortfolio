import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import {
  CtaBand,
  Eyebrow,
  HexPortrait,
  TechLogo,
} from "@/components/ui-kit";
import { media } from "@/data/media";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Azeem Olunloye, AI Automation Engineer" },
      {
        name: "description",
        content:
          "AI Automation Engineer specialising in workflow automation, AI agents, CRM automation and API integrations that cut manual work and operating cost.",
      },
      { property: "og:title", content: "About — Azeem Olunloye" },
      {
        property: "og:description",
        content:
          "From manual operations to intelligent systems — how I design, build and support automation businesses actually keep running.",
      },
    ],
  }),
  component: About,
});

const timeline = [
  {
    year: "Discover",
    title: "Map the process",
    detail:
      "Interviews, screen-shares and data review to find where time, cost and errors actually accumulate.",
  },
  {
    year: "Design",
    title: "Architect the system",
    detail:
      "Triggers, data flow, failure paths and human checkpoints defined before a single node is built.",
  },
  {
    year: "Build",
    title: "Implement and test",
    detail:
      "Workflows, agents and integrations built with validation, retries, logging and edge-case coverage.",
  },
  {
    year: "Deploy",
    title: "Ship with monitoring",
    detail:
      "Rolled out on live data with alerting, access control and documentation your team can follow.",
  },
  {
    year: "Optimize",
    title: "Measure and improve",
    detail:
      "Track throughput, accuracy and cost, then refine prompts, routing and logic as the business changes.",
  },
];

const expertise = [
  {
    name: "Workflow Automation",
    detail: "Building intelligent workflows across business systems.",
  },
  {
    name: "AI Agents",
    detail:
      "Developing AI-powered assistants that automate repetitive tasks and support decision-making.",
  },
  {
    name: "AI Chatbots",
    detail:
      "Building conversational assistants for websites, WhatsApp, Telegram and internal operations.",
  },
  {
    name: "CRM Automation",
    detail: "Automating HubSpot, Salesforce and custom CRM workflows.",
  },
  {
    name: "API Integration",
    detail:
      "Connecting software using REST APIs, webhooks and automation platforms.",
  },
  {
    name: "Business Process Optimization",
    detail: "Analyzing workflows and redesigning inefficient processes.",
  },
  {
    name: "Data Processing & OCR",
    detail: "Extracting, validating and organizing data automatically.",
  },
  {
    name: "Lead Generation Automation",
    detail:
      "Building systems that discover, enrich and qualify leads automatically.",
  },
];

const logos = [
  "n8n",
  "Make",
  "Zapier",
  "OpenAI",
  "Claude",
  "Google Sheets",
  "Google Drive",
  "Airtable",
  "HubSpot",
  "Slack",
  "Gmail",
  "Google Workspace",
  "Voiceflow",
  "Telegram",
  "WhatsApp",
  "LinkedIn",
];

const techGroups = [
  { group: "Automation Platforms", items: ["n8n", "Make", "Zapier"] },
  { group: "AI Platforms", items: ["OpenAI", "Claude", "Voiceflow"] },
  { group: "Databases", items: ["Airtable", "Google Sheets", "Supabase"] },
  { group: "Integrations", items: ["REST APIs", "Webhooks", "OAuth", "JSON"] },
  { group: "CRM", items: ["HubSpot", "Salesforce", "Google Workspace"] },
  { group: "Communication", items: ["Telegram", "WhatsApp", "Slack", "Gmail"] },
];

const why = [
  {
    name: "Reliable Delivery",
    detail:
      "Clear scope, agreed milestones and systems that go live when I say they will.",
  },
  {
    name: "Clean Automation Architecture",
    detail:
      "Readable, modular workflows with proper error handling — not sprawling one-off hacks.",
  },
  {
    name: "Scalable Systems",
    detail:
      "Built to hold up as volume grows, with queues, retries and sensible rate limits.",
  },
  {
    name: "Business-First Thinking",
    detail:
      "Every automation is judged on hours saved, cost removed and revenue protected.",
  },
  {
    name: "Secure Integrations",
    detail:
      "Scoped credentials, least-privilege access and no sensitive data left in the open.",
  },
  {
    name: "Long-Term Support",
    detail:
      "Documentation, handover and ongoing optimisation once the system is running.",
  },
];

function About() {
  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        <section className="container-page grid items-center gap-14 pt-14 pb-16 md:grid-cols-[1.1fr_0.9fr] md:pt-24 md:pb-24">
          <div className="min-w-0">
            <Reveal>
              <Eyebrow>About me</Eyebrow>
              <h1 className="mt-6 font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[40px] md:text-[64px] md:leading-[72px]">
                I turn manual operations into systems that run themselves
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-muted-foreground md:text-[18px]">
                I'm Azeem Olunloye, an AI Automation Engineer. I design and
                build workflow automation and business process automation for
                teams that have outgrown manual work — the follow-ups that must
                always go out, the documents that should file themselves, the
                enquiries that need an answer at 2am.
              </p>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-muted-foreground md:text-[18px]">
                My work sits between operations and engineering: AI agents and
                AI chatbots that handle conversations end to end, CRM automation
                that keeps pipelines clean, and API integrations that connect
                the tools a business already pays for. I work across both
                no-code and low-code platforms and custom code, choosing
                whichever makes the system easiest to run and extend.
              </p>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-muted-foreground md:text-[18px]">
                The goal is never automation for its own sake. It's process
                optimization with a measurable result — intelligent systems that
                support digital transformation, improve business efficiency,
                reduce operating cost and scale without adding headcount.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <HexPortrait
              src={media.portraitHero}
              alt="Portrait of Azeem Olunloye"
              priority
            />
          </Reveal>
        </section>

        <section className="hairline-t hairline-b bg-muted">
          <div className="container-page py-14">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <Stat value={2} suffix="+" label="Years experience" />
              <Stat value={50} suffix="+" label="Projects" />
              <Stat value={15} suffix="+" label="Clients" />
              <Stat label="Remote — worldwide" text="Global" />
            </div>
          </div>
        </section>

        <section className="container-page section-y">
          <Reveal>
            <Eyebrow>Professional summary</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance md:text-[44px]">
              What I actually do for a business
            </h2>
            <div className="mt-8 grid max-w-4xl gap-5 text-[16px] leading-[1.8] text-muted-foreground md:text-[17px]">
              <p>
                I help businesses automate repetitive work and reduce the manual
                operations that quietly consume a team's week. Most companies
                don't have a software problem — they have a coordination
                problem: data copied between tools, approvals waiting in
                inboxes, follow-ups that depend on someone remembering. I find
                those bottlenecks, remove them, and replace them with systems
                that run on triggers rather than reminders.
              </p>
              <p>
                In practice that means integrating disconnected systems so a CRM,
                spreadsheet, inbox, messaging app and database behave like one
                platform. It means using AI where judgement is needed —
                classifying enquiries, extracting fields from documents,
                drafting replies — and deterministic logic everywhere accuracy
                matters. Each build ships with validation, retries, logging and
                alerting, so failures are visible instead of silent.
              </p>
              <p>
                The outcome is measured in the way a business feels day to day:
                higher productivity because staff spend their time on work only
                people can do, a better customer experience because responses
                are immediate and consistent, and lower operational cost because
                capacity grows without new hires. Every project is handed over
                documented, so your team can operate and extend it long after
                the engagement ends.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="hairline-t bg-muted">
          <div className="container-page section-y">
            <Reveal>
              <Eyebrow>Core expertise</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-display text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance md:text-[44px]">
                Where I go deep
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {expertise.map((s, i) => (
                <Reveal key={s.name} delay={i * 50}>
                  <div className="card-lift h-full rounded-2xl border bg-surface p-7">
                    <h3 className="font-display text-lg font-extrabold tracking-tight">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
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
              <Eyebrow>Tools &amp; platforms</Eyebrow>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance md:text-[44px]">
                The stack behind the systems
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {logos.map((t) => (
                <div
                  key={t}
                  className="flex min-w-0 flex-col items-center gap-3 rounded-2xl border bg-surface px-3 py-6 text-center"
                >
                  <TechLogo name={t} size={32} showName={false} />
                  <span className="break-words text-[13px] font-semibold sm:text-sm">
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="hairline-t bg-muted">
          <div className="container-page section-y">
            <Reveal>
              <Eyebrow>Technologies</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-display text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance md:text-[44px]">
                Technologies I work with
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {techGroups.map((g, i) => (
                <Reveal key={g.group} delay={i * 50}>
                  <div className="h-full rounded-2xl border bg-surface p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {g.group}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-lg border bg-background px-3 py-1.5 text-[13px] font-semibold"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page section-y">
          <Reveal>
            <Eyebrow>Process</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance md:text-[44px]">
              How a project runs
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-0 md:grid-cols-2">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 60}>
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
              <Eyebrow>Why me</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-display text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance md:text-[44px]">
                Why businesses work with me
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {why.map((w, i) => (
                <Reveal key={w.name} delay={i * 50}>
                  <div className="card-lift h-full rounded-2xl border bg-surface p-7">
                    <h3 className="font-display text-lg font-extrabold tracking-tight">
                      {w.name}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                      {w.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
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

function Stat({
  value,
  suffix,
  text,
  label,
}: {
  value?: number;
  suffix?: string;
  text?: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-extrabold tracking-tight text-accent md:text-5xl">
        {text ?? <Counter value={value ?? 0} suffix={suffix ?? ""} />}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
