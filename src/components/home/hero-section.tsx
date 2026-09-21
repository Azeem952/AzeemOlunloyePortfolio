import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { media } from "@/data/media";

export function HeroSection() {
  return (
    <section className="relative w-full pt-8 sm:pt-14 pb-16 overflow-hidden">
      {/* Subtle atmospheric ambient glow */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-[500px] w-[750px] bg-gradient-to-b from-[#5B8CFF]/10 via-[#8EA9FF]/5 to-transparent blur-[120px] -z-10" />

      {/* Top Greeting Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-4 py-1.5 text-xs sm:text-sm font-semibold text-gray-800 shadow-sm backdrop-blur-md">
          <span>Hello!</span>
          <Sparkles className="h-3.5 w-3.5 text-[#5B8CFF]" />
        </div>
      </div>

      {/* Main Headline */}
      <div className="mt-5 text-center px-4">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#101828] leading-[1.12]">
          I'm <span className="text-[#5B8CFF]">Azeem</span>,
          <br />
          AI Automation Engineer
        </h1>
      </div>

      {/* Hero Grid with Bio, Art-Directed Center Portrait, and Experience Badge */}
      <div className="container-page mt-10 md:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4">
          
          {/* Left Column: Quotes + Positioning Bio + Subtle Editorial Arrow */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="font-serif text-5xl sm:text-6xl font-black text-gray-200 select-none leading-none mb-2">
              “
            </div>
            <p className="max-w-xs text-sm sm:text-base leading-relaxed text-[#667085] font-medium">
              AI Automation Engineer with 2+ years designing agents, CRM sequences,
              document pipelines and integrations that run in production — reliably, and without supervision.
            </p>

            {/* Hand-drawn style decorative arrow pointing toward the portrait */}
            <div className="hidden lg:block mt-6 ml-6">
              <svg width="68" height="48" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#5B8CFF]">
                <path d="M4 8C20 6 42 14 58 36M58 36L44 34M58 36L56 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Center Column: Art-Directed Layered Glass Frame + Portrait + Floating Badges & Controls */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center relative">
            <div className="relative w-[300px] sm:w-[360px] md:w-[410px] h-[380px] sm:h-[440px] md:h-[480px] flex items-end justify-center group">
              
              {/* Layer 1: Atmospheric Ambient Radial Bloom */}
              <div className="pointer-events-none absolute inset-x-6 bottom-6 top-8 rounded-t-[160px] sm:rounded-t-[200px] bg-gradient-to-b from-[#5B8CFF]/25 via-[#8EA9FF]/15 to-transparent blur-2xl -z-10" />

              {/* Layer 2: Outer Subtle Glass Border Ring */}
              <div className="absolute -inset-2.5 sm:-inset-3.5 bottom-0 rounded-t-[170px] sm:rounded-t-[210px] border border-[#5B8CFF]/30 pointer-events-none" />

              {/* Layer 3: Architectural Frosted Backplate with Engineering Accent */}
              <div 
                className="absolute inset-x-3 sm:inset-x-4 bottom-0 top-12 sm:top-10 rounded-t-[150px] sm:rounded-t-[190px] border border-white/80 overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #F0F5FF 0%, #E3EDFF 45%, #D4E3FC 100%)",
                  boxShadow: "0 20px 50px rgba(11, 18, 32, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.9)",
                }}
              >
                {/* Subtle Geometric Engineering Grid & Coordinate Lines */}
                <div 
                  className="absolute inset-0 opacity-[0.18] pointer-events-none" 
                  style={{
                    backgroundImage: "linear-gradient(to right, #5B8CFF 1px, transparent 1px), linear-gradient(to bottom, #5B8CFF 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                {/* Radial Soft Sunburst Highlight */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none" />
              </div>

              {/* Floating Glass Status Indicator Pill (Top Right) */}
              <div 
                className="absolute -top-1 sm:top-2 -right-2 sm:-right-4 z-30 flex items-center gap-2 rounded-full px-3.5 py-1.5 glass-panel border border-white/80 text-[11px] font-bold text-[#0B1220] shadow-lg animate-float-soft"
                style={{ animationDuration: "6s" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B8CFF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B8CFF]" />
                </span>
                <span className="tracking-tight">Production Active</span>
              </div>

              {/* Floating Glass Architecture Badge (Left Mid-Level) */}
              <div 
                className="hidden sm:flex absolute left-[-16px] sm:left-[-24px] bottom-24 z-30 items-center gap-2 rounded-2xl p-2.5 px-3.5 glass-panel border border-white/80 shadow-xl"
                style={{ animation: "float-soft 8s ease-in-out infinite" }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#5B8CFF] text-white shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-display text-[11px] font-extrabold text-[#0B1220] leading-tight">AI & CRM</p>
                  <p className="text-[10px] text-[#667085] font-medium leading-none mt-0.5">Zero-Friction</p>
                </div>
              </div>

              {/* Layer 4: Azeem's Real Portrait Photo with Editorial Breakout Depth */}
              <div className="relative z-10 w-full h-full flex items-end justify-center overflow-visible">
                <img
                  src={media.portraitPhoto}
                  alt="Azeem Olunloye"
                  className="h-[96%] w-auto object-cover object-top drop-shadow-[0_18px_24px_rgba(11,18,32,0.22)] transition-transform duration-700 group-hover:scale-[1.018]"
                />
              </div>

              {/* Layer 5: Refined Liquid Glass Floating Action Control Pill */}
              <div
                className="absolute -bottom-5 z-30 flex items-center gap-2 rounded-full p-1.5 pl-2.5 backdrop-blur-2xl border border-white/70 shadow-[0_16px_36px_rgba(11,18,32,0.18)] bg-white/85"
                style={{
                  boxShadow: "0 14px 34px rgba(11, 18, 32, 0.14), inset 0 1.5px 1.5px rgba(255, 255, 255, 1)",
                }}
              >
                <Link
                  to="/portfolio"
                  className="flex items-center gap-1.5 rounded-full bg-[#5B8CFF] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-[0_3px_14px_rgba(91,140,255,0.45)] transition-all hover:bg-[#3E6EE0] hover:scale-105 active:scale-95"
                >
                  <span>Portfolio</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full px-4 py-2 text-xs sm:text-sm font-bold text-[#101828] hover:bg-black/5 transition-colors"
                >
                  Hire me
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Stars Rating + Years Experience + Production Stats */}
          <div className="lg:col-span-3 order-3 flex flex-col items-center lg:items-end text-center lg:text-right mt-6 lg:mt-0">
            {/* Stars */}
            <div className="flex items-center gap-1 text-[#5B8CFF] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>

            {/* Experience Metric */}
            <p className="font-display text-4xl sm:text-5xl font-extrabold text-[#101828] tracking-tight">
              2+ Years
            </p>
            <p className="text-xs uppercase font-bold tracking-wider text-[#667085] mt-1">
              Experience
            </p>

            {/* Production Workflows Pill with Glass Effect */}
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-2xl bg-[#F5F7FB] px-4 py-2.5 border border-gray-200/80 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#5B8CFF] animate-pulse" />
              <div className="text-left">
                <p className="font-display font-extrabold text-sm text-[#101828] leading-tight">15+ Workflows</p>
                <p className="text-[11px] text-[#667085] font-medium">in live production</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
