import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { media } from "@/data/media";

export function HeroSection() {
  return (
    <section className="relative w-full pt-10 sm:pt-14 pb-16 overflow-hidden">
      {/* Top Greeting Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
          <span>Hello!</span>
          <Sparkles className="h-3.5 w-3.5 text-[#FF5E1E]" />
        </div>
      </div>

      {/* Main Headline */}
      <div className="mt-5 text-center px-4">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.12]">
          I'm <span className="text-[#FF5E1E]">Azeem</span>,
          <br />
          AI Automation Engineer
        </h1>
      </div>

      {/* Hero Grid with Bio, Center Arch Portrait, and Experience Badge */}
      <div className="container-page mt-10 md:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4">
          
          {/* Left Column: Quotes + Positioning Bio + Orange Arrows */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="font-serif text-5xl sm:text-6xl font-black text-gray-300 select-none leading-none mb-2">
              “
            </div>
            <p className="max-w-xs text-sm sm:text-base leading-relaxed text-gray-600 font-medium">
              AI Automation Engineer with 2+ years designing agents, CRM sequences,
              document pipelines and integrations that run in production — reliably, and without supervision.
            </p>

            {/* Hand-drawn style decorative arrow pointing toward the portrait */}
            <div className="hidden lg:block mt-6 ml-6">
              <svg width="68" height="48" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF5E1E]">
                <path d="M4 8C20 6 42 14 58 36M58 36L44 34M58 36L56 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Center Column: Warm Arch Background + Portrait + Floating Buttons */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center relative">
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[340px] sm:h-[400px] md:h-[440px] flex items-end justify-center">
              {/* Peach / Orange Arch Shape */}
              <div className="absolute inset-x-4 bottom-0 top-12 sm:top-10 rounded-t-[140px] sm:rounded-t-[180px] bg-[#FCAE80] opacity-95 shadow-inner" />

              {/* Decorative Subtle Concentric Curves */}
              <div className="absolute -inset-4 bottom-0 rounded-t-[160px] sm:rounded-t-[200px] border-2 border-dashed border-[#FF5E1E]/20 pointer-events-none" />

              {/* Portrait Image */}
              <div className="relative z-10 w-full h-full flex items-end justify-center overflow-hidden rounded-b-2xl">
                <img
                  src={media.portraitPhoto}
                  alt="Azeem Olunloye"
                  className="h-[92%] w-auto object-cover object-top drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>

              {/* Floating Action Badge Pill on bottom */}
              <div className="absolute -bottom-4 z-20 flex items-center gap-2 rounded-full bg-white/95 p-1.5 pl-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 backdrop-blur-md">
                <Link
                  to="/portfolio"
                  className="flex items-center gap-1.5 rounded-full bg-[#FF5E1E] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-[0_2px_10px_rgba(255,94,30,0.4)] transition-all hover:bg-[#E54D12]"
                >
                  <span>Portfolio</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full px-4 py-2 text-xs sm:text-sm font-bold text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Hire me
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Stars Rating + Years Experience + Production Stats */}
          <div className="lg:col-span-3 order-3 flex flex-col items-center lg:items-end text-center lg:text-right mt-6 lg:mt-0">
            {/* Stars */}
            <div className="flex items-center gap-1 text-[#FF5E1E] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>

            {/* Experience Metric */}
            <p className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              2+ Years
            </p>
            <p className="text-xs uppercase font-bold tracking-wider text-gray-500 mt-1">
              Experience
            </p>

            {/* Production Workflows Pill */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#F5F6F8] px-4 py-2.5 border border-gray-200/80">
              <span className="h-2 w-2 rounded-full bg-[#FF5E1E] animate-pulse" />
              <div className="text-left">
                <p className="font-display font-extrabold text-sm text-gray-900 leading-tight">15+ Workflows</p>
                <p className="text-[11px] text-gray-500 font-medium">in live production</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
