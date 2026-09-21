export function MarqueeSection() {
  const items = [
    "Workflow Automation",
    "AI Agents & Chatbots",
    "CRM Sequences",
    "n8n & Make Orchestration",
    "OpenAI & Claude LLMs",
    "Document OCR Pipelines",
    "API & Webhook Integrations",
    "Lead Generation Automation",
  ];

  // Duplicate for seamless loop (-50% translateX keyframe needs 2 copies)
  const doubled = [...items, ...items];

  return (
    <div className="w-full bg-[#FF5E1E] text-white py-4 overflow-hidden select-none my-10 sm:my-16">
      <div className="marquee flex items-center whitespace-nowrap">
        {doubled.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-6 px-6">
            <span className="text-sm sm:text-base font-extrabold tracking-wider uppercase">
              {item}
            </span>
            <span className="text-white/70 font-black text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
