import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { services, processSteps, stack } from "@/data/services";
import { media } from "@/data/media";
import { ArrowUpRight, CheckCircle2, Sparkles, Workflow, Bot, Database, Zap, FileText, Users } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AI Automation & Workflow Engineering | Azeem Olunloye" },
      {
        name: "description",
        content:
          "Production workflow automation, autonomous AI agents, CRM sequences, and API integrations engineered for growing teams.",
      },
      { property: "og:title", content: "Services — Azeem Olunloye" },
      {
        property: "og:description",
        content:
          "Custom automation systems designed to remove manual operations and run reliably.",
      },
    ],
  }),
  component: Services,
});

const serviceIcons: Record<string, typeof Workflow> = {
  "workflow-automation": Workflow,
  "ai-agents": Bot,
  "crm-automation": Database,
  "system-integration": Zap,
  "document-processing": FileText,
  "lead-generation": Users,
};

// Map each service to real project screenshots already in the repo
const serviceVisuals: Record<string, string> = {
  "workflow-automation": media.crmWorkflow,
  "ai-agents": media.bookingChat,
  "crm-automation": media.crmContacts,
  "system-integration": media.crmWebhook,
  "document-processing": media.receiptWorkflow,
  "lead-generation": media.crmEmail,
};

function Services() {
  return (
    <div className="min-h-dvh bg-white text-gray-900 selection:bg-[#FF5E1E] selection:text-white">
      <Nav />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="container-page pt-10 sm:pt-16 pb-12 sm:pb-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
              <span>Production Capabilities</span>
              <Sparkles className="h-3.5 w-3.5 text-[#FF5E1E]" />
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12] max-w-4xl mx-auto">
            Engineering automations that <span className="text-[#FF5E1E]">eliminate repetitive operations</span>.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Every system is built with fault tolerance, retry logic, and documented architecture—so your business operations run smoothly around the clock.
          </p>
        </section>

        {/* Highlight Services Showcase (Editorial Split Cards with real screenshots) */}
        <section className="container-page pb-16 sm:pb-24">
          <div className="space-y-12">
            {services.map((service, idx) => {
              const Icon = serviceIcons[service.slug] || Workflow;
              const visual = serviceVisuals[service.slug] || media.crmWorkflow;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={service.slug}
                  className="rounded-[32px] sm:rounded-[40px] border border-gray-200/80 bg-[#FAFBFD] p-6 sm:p-10 md:p-12 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Content Column */}
                    <div className={`lg:col-span-6 ${isEven ? "order-2 lg:order-1" : "order-2"}`}>
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5E1E] text-white shadow-sm">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#FF5E1E]">
                          {service.brand} Ecosystem
                        </span>
                      </div>

                      <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                        {service.name}
                      </h2>
                      <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                        {service.summary}
                      </p>

                      <div className="mt-6 space-y-2.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Deliverables & Capabilities:
                        </p>
                        {service.bullets.map((b) => (
                          <div key={b} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-[#FF5E1E] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200/60">
                        <span className="text-xs font-semibold text-gray-500 mr-2">Tools:</span>
                        {service.tools.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Visual Preview Mockup Column */}
                    <div className={`lg:col-span-6 ${isEven ? "order-1 lg:order-2" : "order-1"}`}>
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
                        <img
                          src={visual}
                          alt={service.name}
                          className="h-full w-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Delivery Process (Dark Container matching Reference) */}
        <section className="container-page py-8">
          <div className="relative rounded-[32px] sm:rounded-[44px] bg-[#121214] text-white p-7 sm:p-10 md:p-14 overflow-hidden border border-white/10 shadow-2xl">
            <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#FF5E1E]/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#FFA066]/10 blur-[120px]" />

            <div className="relative z-10 max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E1E]">
                Execution Methodology
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
                How Engagements Are Delivered
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-3 leading-relaxed">
                Clear milestones, shared staging environments, and fully documented handovers.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step) => (
                <div
                  key={step.n}
                  className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-sm"
                >
                  <span className="font-display text-3xl font-black text-[#FF5E1E]">
                    {step.n}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white mt-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 mt-2 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Production Tooling Stack */}
        <section className="container-page py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Integrations & Supported <span className="text-[#FF5E1E]">Platforms</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
              Software and platforms integrated across active client production systems.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {stack.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-gray-200 bg-[#F5F6F8] px-4 py-2 text-xs sm:text-sm font-semibold text-gray-800 shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-page py-12 text-center mb-8">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Ready to automate your <span className="text-[#FF5E1E]">bottlenecks</span>?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
              Drop a quick brief of your manual process. I will reply within one business day with feasibility and initial scoping.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5E1E] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,94,30,0.35)] transition-all hover:bg-[#E54D12] hover:scale-105"
              >
                <span>Book a Discovery Call</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-800 hover:bg-gray-100 transition-colors"
              >
                View Live Builds
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

