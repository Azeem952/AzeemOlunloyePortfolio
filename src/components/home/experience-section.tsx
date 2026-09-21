const experiences = [
  {
    role: "Independent AI Automation Engineer",
    period: "2024 — Present",
    location: "Remote · Worldwide Clients",
    focus: "Production AI Systems & Pipelines",
    description:
      "Architecting autonomous AI agents, n8n orchestration engines, and multi-touch CRM follow-up pipelines running reliably in production without supervision.",
    markerColor: "orange",
  },
  {
    role: "Workflow Automation Specialist",
    period: "2023 — 2024",
    location: "Client Engagements",
    focus: "Cross-Platform Workflow Engineering",
    description:
      "Rebuilt manual lead capture, document intake, and appointment scheduling into fault-tolerant pipelines using n8n, Make, Twilio, and webhooks.",
    markerColor: "dark",
  },
  {
    role: "Systems Integration Consultant",
    period: "2022 — 2023",
    location: "Operations & CRM Systems",
    focus: "API Integrations & Data Pipelines",
    description:
      "Wired REST APIs, webhooks, Airtable, and Google Sheets to eliminate manual copy-pasting and keep customer records updated in real time.",
    markerColor: "orange",
  },
];

export function ExperienceSection() {
  return (
    <section className="container-page py-16 sm:py-24">
      {/* Centered Heading */}
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          My <span className="text-[#FF5E1E]">Work Experience</span>
        </h2>
      </div>

      {/* Two-sided Timeline matching reference */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical Dashed Line (visible on md+) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0 border-r-2 border-dashed border-gray-300" />

        <div className="space-y-12 md:space-y-16">
          {experiences.map((item, idx) => (
            <div
              key={item.role}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center"
            >
              {/* Left Column: Role & Period */}
              <div className="md:text-right">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                  {item.role}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#FF5E1E] mt-1">
                  {item.period}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.location}
                </p>
              </div>

              {/* Central Marker Badge (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md border-4 border-white ${
                    item.markerColor === "orange"
                      ? "bg-[#FF5E1E] text-white shadow-orange-500/30"
                      : "bg-[#141416] text-white shadow-black/30"
                  }`}
                >
                  <span className="text-xs font-black">✦</span>
                </div>
              </div>

              {/* Right Column: Focus & Details */}
              <div className="pl-6 md:pl-0 border-l-2 border-dashed border-[#FF5E1E] md:border-l-0">
                <h4 className="font-display text-lg font-bold text-gray-900">
                  {item.focus}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 mt-2 max-w-md">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
