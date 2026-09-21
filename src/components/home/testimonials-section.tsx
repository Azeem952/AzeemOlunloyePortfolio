import { Star } from "lucide-react";

const outcomes = [
  {
    quote:
      "The AI CRM follow-up sequence eliminated manual drafting completely. 100% of new leads now receive contextual follow-up, and sequences halt automatically whenever a lead responds.",
    author: "Operations Director",
    company: "Real Estate Client",
    metric: "100% Lead Follow-up",
  },
  {
    quote:
      "Our receipt processing went from manual WhatsApp typing to an autonomous system. In under 60 seconds receipts are extracted with vision AI, validated, and logged into Google Sheets.",
    author: "Finance & Operations Lead",
    company: "SMB Client",
    metric: "<60s Record Filing",
  },
  {
    quote:
      "The booking assistant handles patient conversations 24/7. It checks live calendar availability, books confirmed appointments, and dispatches reminders with zero double-bookings.",
    author: "Practice Manager",
    company: "Dental Clinic Client",
    metric: "24/7 Always-On Booking",
  },
];

export function TestimonialsSection() {
  return (
    <section className="container-page py-10 sm:py-16">
      <div className="relative rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#121214] text-white p-7 sm:p-10 md:p-14 overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Subtle warm orange/amber fluid ambient backdrop */}
        <div className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-[#FF5E1E]/12 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-[#FFA066]/10 blur-[120px]" />

        {/* Centered Heading */}
        <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Testimonials That
            <br />
            Spoke to <span className="text-[#FF5E1E]">My Results</span>
          </h2>
          <p className="text-sm sm:text-base text-white/65 mt-4 leading-relaxed">
            Verified client outcomes and measurable metrics delivered from production automation systems.
          </p>
        </div>

        {/* 3 Outcome Testimonial Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {outcomes.map((item, idx) => (
            <div
              key={item.company}
              className="relative flex flex-col justify-between rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/[0.07] hover:border-[#FF5E1E]/40"
            >
              {/* Top Quote Icon & Stars */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-black text-[#FF5E1E] leading-none">
                    “
                  </span>
                  <div className="flex items-center gap-1 text-[#FF5E1E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Result Badge */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-display text-xs sm:text-sm font-bold text-white">
                    {item.author}
                  </p>
                  <p className="text-[11px] text-white/50">{item.company}</p>
                </div>
                <span className="rounded-full bg-[#FF5E1E]/20 px-2.5 py-1 text-[11px] font-bold text-[#FF5E1E]">
                  {item.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
