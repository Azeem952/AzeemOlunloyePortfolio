import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { media } from "@/data/media";
import { ArrowUpRight, CheckCircle2, Sparkles, Terminal, Layers, Cpu, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Azeem Olunloye — AI Automation Engineer" },
      {
        name: "description",
        content:
          "Independent AI Automation Engineer with 2+ years architecting multi-app workflows, autonomous AI agents, and CRM data pipelines.",
      },
      { property: "og:title", content: "About Azeem Olunloye — AI Automation Engineer" },
      {
        property: "og:description",
        content:
          "How I engineer production automations that run reliably without supervision.",
      },
    ],
  }),
  component: About,
});

const principles = [
  {
    icon: Terminal,
    title: "Determinism Over Magic",
    desc: "LLMs are used where language judgement or flexible extraction is genuinely required. Everywhere else, workflows rely on deterministic logic, strict schemas, and reproducible branching.",
  },
  {
    icon: ShieldCheck,
    title: "Built For Production Failure Modes",
    desc: "Silent breakages destroy trust. Every automation ships with webhook signature verification, rate limit backoffs, automatic retries, and instant error alerts.",
  },
  {
    icon: Layers,
    title: "Documented & Operable",
    desc: "You receive clean, modular workflows with plain-English documentation, environment variable guides, and handover recordings so your team can maintain them.",
  },
  {
    icon: Cpu,
    title: "Direct ROI Measurement",
    desc: "Every system is evaluated against real operational metrics: hours returned to staff, lead response latency reduced, and costly human errors eliminated.",
  },
];

const capabilities = [
  {
    category: "Automation Engines",
    items: ["n8n (Self-hosted & Cloud)", "Make.com", "Zapier", "Custom Node.js Webhooks"],
  },
  {
    category: "AI & Language Models",
    items: ["OpenAI GPT-4o & Function Calling", "Claude 3.5 Sonnet", "Structured Outputs", "Vision OCR"],
  },
  {
    category: "CRMs & Data Stores",
    items: ["HubSpot CRM", "Salesforce", "Airtable", "Google Sheets API", "Supabase PostgreSQL"],
  },
  {
    category: "Channels & Communication",
    items: ["WhatsApp Cloud API", "Telegram Bot API", "Gmail & Google Workspace", "Slack Webhooks"],
  },
];

const lifecycleSteps = [
  {
    step: "01",
    title: "Process Audit & Architecture",
    body: "We map the exact steps of your current manual workflow, identifying edge cases, system bottlenecks, data schemas, and API constraints before writing any code.",
  },
  {
    step: "02",
    title: "Staged Build & Sandbox Testing",
    body: "Workflows and agents are developed with sandboxed credentials and verified against historical edge cases, simulated payloads, and unexpected user inputs.",
  },
  {
    step: "03",
    title: "Production Cutover & Monitoring",
    body: "We deploy the automation to live triggers with rate-limiting, error logging, and alert channels configured to ping before minor hiccups become operational failures.",
  },
  {
    step: "04",
    title: "Handover & Optimization",
    body: "A comprehensive video walkthrough and architecture documentation are provided so you maintain complete ownership without vendor lock-in.",
  },
];

function About() {
  return (
    <div className="min-h-dvh bg-white text-gray-900 selection:bg-[#FF5E1E] selection:text-white">
      <Nav />

      <main className="overflow-hidden">
        {/* Editorial Hero Introduction */}
        <section className="container-page pt-10 sm:pt-16 pb-14 sm:pb-20">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
              <span>Engineering Background</span>
              <Sparkles className="h-3.5 w-3.5 text-[#FF5E1E]" />
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto px-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12]">
              I build systems that <span className="text-[#FF5E1E]">run themselves</span> so teams can focus on growth.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              I'm Azeem Olunloye, an AI Automation Engineer. Over the last 2+ years, I have architected 
              and deployed mission-critical automations across n8n, HubSpot, OpenAI, and custom API pipelines.
            </p>
          </div>

          {/* Side-by-side Portrait & Deep Bio */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Portrait with Warm Arch Frame */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-[280px] sm:w-[320px] md:w-[350px] h-[350px] sm:h-[400px] md:h-[430px] flex items-end justify-center">
                <div className="absolute inset-x-4 bottom-0 top-10 rounded-t-[140px] sm:rounded-t-[170px] bg-[#FCAE80] opacity-95 shadow-inner" />
                <div className="absolute -inset-3 bottom-0 rounded-t-[155px] sm:rounded-t-[185px] border-2 border-dashed border-[#FF5E1E]/25 pointer-events-none" />
                
                <div className="relative z-10 w-full h-full flex items-end justify-center overflow-hidden rounded-b-2xl">
                  <img
                    src={media.portraitPhoto}
                    alt="Azeem Olunloye"
                    className="h-[92%] w-auto object-cover object-top drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Narrative Editorial Text */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 text-gray-600 leading-relaxed text-sm sm:text-base">
              <div className="inline-block rounded-full bg-gray-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gray-800">
                Philosophy & Approach
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Between practical operations and robust software engineering.
              </h2>
              <p>
                Most businesses do not have a tool shortage—they have an orchestration deficit. 
                Customer details are manually copied from webhooks into spreadsheets, incoming inquiries wait 
                hours for manual triage, and sales follow-ups break down the moment a human rep gets busy.
              </p>
              <p>
                My work eliminates these points of friction. I combine autonomous AI agents that handle 
                open-ended customer interactions with deterministic workflow engines that enforce business logic, 
                data validation, and strict reliability.
              </p>
              <div className="pt-3 flex flex-wrap gap-4 text-xs sm:text-sm font-semibold text-gray-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF5E1E]" />
                  <span>2+ Years in Live Production</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF5E1E]" />
                  <span>15+ Production Workflows</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF5E1E]" />
                  <span>20+ Enterprise Tools Integrated</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Principles (Dark Rounded Container matching Services/Testimonials) */}
        <section className="container-page py-8">
          <div className="relative rounded-[32px] sm:rounded-[44px] bg-[#121214] text-white p-7 sm:p-10 md:p-14 overflow-hidden border border-white/10 shadow-2xl">
            <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#FF5E1E]/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#FFA066]/10 blur-[120px]" />

            <div className="relative z-10 max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E1E]">
                How I Think About Automations
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
                Core Engineering Principles
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-3 leading-relaxed">
                Automations shouldn't be brittle side projects. They require the same architectural discipline 
                as customer-facing software.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {principles.map((p, i) => (
                <div
                  key={p.title}
                  className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-7 backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:border-[#FF5E1E]/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF5E1E] text-white mb-4 shadow-[0_2px_12px_rgba(255,94,30,0.4)]">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Capabilities Grid */}
        <section className="container-page py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Technical <span className="text-[#FF5E1E]">Capabilities</span> & Stack
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
              Proven toolsets applied in actual client systems, chosen for reliability and long-term maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.category}
                className="rounded-3xl border border-gray-200/80 bg-[#F8F9FA] p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display text-base font-extrabold text-gray-900 tracking-tight pb-3 border-b border-gray-200">
                    {cap.category}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {cap.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5E1E]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Delivery Lifecycle */}
        <section className="container-page py-8 mb-16">
          <div className="rounded-[32px] sm:rounded-[40px] bg-[#F5F6F8] border border-gray-200/80 p-7 sm:p-12">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E1E]">
                Execution Roadmap
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-1">
                How Engagements Run
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Predictable 1–4 week sprints from scoping to handover without unexpected roadblocks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {lifecycleSteps.map((step) => (
                <div key={step.step} className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-display text-2xl font-black text-[#FF5E1E]">
                      {step.step}
                    </span>
                    <h3 className="font-display text-base font-bold text-gray-900 mt-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="container-page py-12 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Have a process ready for <span className="text-[#FF5E1E]">automation</span>?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
              Let's talk through your manual bottlenecks. I'll outline whether and how it should be automated before any commitment.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5E1E] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,94,30,0.35)] transition-all hover:bg-[#E54D12] hover:scale-105"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-800 hover:bg-gray-100 transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

