import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { media } from "@/data/media";

const serviceCards = [
  {
    title: "Workflow Automation",
    category: "n8n · Make · Zapier",
    desc: "Repetitive multi-app operations rebuilt as reliable automated pipelines with retries and alerts.",
    preview: media.crmWorkflow,
    slug: "workflow-automation",
  },
  {
    title: "AI Agents & Chatbots",
    category: "OpenAI · Claude · WhatsApp",
    desc: "Autonomous conversational agents that qualify leads, answer FAQs, and book calendar appointments 24/7.",
    preview: media.bookingChat,
    slug: "ai-agents",
  },
  {
    title: "CRM Automation",
    category: "HubSpot · Salesforce · Sheets",
    desc: "Lead capture, automated follow-up sequences, and pipeline sync that keeps data clean and updated.",
    preview: media.crmContacts,
    slug: "crm-automation",
  },
];

export function ServicesSection() {
  return (
    <section className="container-page py-8">
      {/* Dark rounded container with Midnight Navy background */}
      <div className="relative rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#0B1220] text-white p-7 sm:p-10 md:p-14 overflow-hidden border border-white/15 shadow-2xl">
        
        {/* Subtle Electric Blue ambient glow backdrop textures */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#5B8CFF]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8EA9FF]/10 blur-[120px]" />
        
        {/* Header Row */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              My <span className="text-[#5B8CFF]">Services</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-white/70 leading-relaxed">
            Repetitive multi-app processes rebuilt as reliable workflows that run on triggers,
            schedules or webhooks — with built-in error handling and logging.
          </p>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {serviceCards.map((service) => (
            <Link
              key={service.title}
              to="/services"
              className="group relative flex flex-col justify-between rounded-3xl bg-[#172033]/90 border border-white/10 p-6 transition-all duration-300 hover:border-[#5B8CFF]/50 hover:bg-[#1E2942] hover:-translate-y-1 overflow-hidden backdrop-blur-sm"
              style={{
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* Card Title & Category */}
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#8EA9FF]">
                  {service.category}
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight text-white mt-1">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 mt-2 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Card Visual Preview Mockup */}
              <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/40 border border-white/10">
                <img
                  src={service.preview}
                  alt={service.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Circular Arrow Action Button with Glass Style */}
                <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1220]/80 border border-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-[#5B8CFF] group-hover:scale-110 group-hover:border-[#5B8CFF]">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Indicator (Electric Blue Pill + Dots) */}
        <div className="relative z-10 flex items-center justify-center gap-2 mt-10">
          <div className="h-2 w-7 rounded-full bg-[#5B8CFF]" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
        </div>

      </div>
    </section>
  );
}
