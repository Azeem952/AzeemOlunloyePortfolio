import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectsQuery } from "@/lib/content-queries";
import type { CmsProject } from "@/lib/cms-types";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Sparkles, Terminal, Layers } from "lucide-react";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Production AI Automation Systems | Azeem Olunloye" },
      {
        name: "description",
        content:
          "Horizontal showcase of production AI automation systems, autonomous agents, and CRM pipelines shipped by Azeem Olunloye.",
      },
      { property: "og:title", content: "Portfolio — Azeem Olunloye" },
      {
        property: "og:description",
        content:
          "Interactive case studies with architectural workflows, outcome metrics, and production screenshots.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  errorComponent: () => (
    <div className="container-page py-32 text-center">
      <p className="text-[#667085]">Portfolio could not be loaded. Please refresh.</p>
    </div>
  ),
  component: Portfolio,
});

const CATEGORIES = ["All", "AI Agents", "CRM Automation", "Workflow Automation", "Document Processing"];

function Portfolio() {
  const { data: projects } = useSuspenseQuery(projectsQuery) as { data: CmsProject[] };
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (selectedCategory === "All") return true;
      return (
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        p.categories?.some((c) => c.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    });
  }, [projects, selectedCategory]);

  const activeIndex = Math.min(currentIndex, Math.max(0, filtered.length - 1));
  const activeProject = filtered[activeIndex] || projects[0];

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filtered.length]);

  // Mobile Touch Swipe Handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    
    // Only trigger if horizontal swipe is dominant and exceeds threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="min-h-dvh bg-white text-[#101828] selection:bg-[#5B8CFF] selection:text-white">
      <Nav />

      <main className="overflow-hidden">
        {/* Header Hero */}
        <section className="container-page pt-10 sm:pt-16 pb-8 sm:pb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#101828] shadow-sm backdrop-blur-md">
              <span>Shipped Systems</span>
              <Sparkles className="h-3.5 w-3.5 text-[#5B8CFF]" />
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#101828] leading-[1.12] max-w-4xl mx-auto">
            Production systems engineered for <span className="text-[#5B8CFF]">real business workflows</span>.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#667085] leading-relaxed max-w-2xl mx-auto">
            Browse through active client builds below. Each case study documents the complete problem, 
            architecture, and verified business outcomes.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#0B1220] text-white shadow-md scale-105"
                    : "bg-gray-100 text-[#667085] hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Horizontal Showcase Experience */}
        {filtered.length > 0 && activeProject && (
          <section className="container-page pb-20 sm:pb-28">
            <div 
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              style={{ touchAction: "pan-y" }}
              className="relative rounded-[36px] sm:rounded-[48px] border border-gray-200/90 bg-[#F5F7FB] p-6 sm:p-10 md:p-14 shadow-lg overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#5B8CFF]/10 blur-[100px]" />

              {/* Showcase Grid: Left Media Reveal + Right Editorial Details */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Project Media Mockup with Directional Smooth Animated Transition */}
                <div className="lg:col-span-7">
                  <div
                    key={`${activeProject.slug}-${direction}`}
                    className={`group relative aspect-[16/10] w-full overflow-hidden rounded-[28px] sm:rounded-[36px] bg-white border border-gray-200 shadow-xl transition-all duration-500 ${
                      direction === "next" ? "animate-slide-in-right" : "animate-slide-in-left"
                    }`}
                  >
                    <img
                      src={activeProject.gallery?.[0]?.src ?? activeProject.cover}
                      alt={activeProject.title}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Category Overlay Tag with Liquid Glass styling */}
                    <div className="absolute top-5 left-5">
                      <span className="rounded-full glass-panel-dark px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md">
                        {activeProject.category}
                      </span>
                    </div>

                    {/* Verified Outcome Badge on bottom left with Liquid Glass styling */}
                    {activeProject.outcome && activeProject.outcome[0] && (
                      <div className="absolute bottom-5 left-5 right-5 sm:right-auto inline-flex items-center gap-2 rounded-2xl glass-panel px-4 py-2 border border-white/80 shadow-lg">
                        <CheckCircle2 className="h-4 w-4 text-[#5B8CFF] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-[#101828]">
                          {activeProject.outcome[0].metric} — {activeProject.outcome[0].label || "Target"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Editorial Details + Case Study Actions */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Year & Client Pill */}
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#667085] mb-3">
                      <span>{activeProject.year || "Production System"}</span>
                      {activeProject.client && (
                        <>
                          <span>·</span>
                          <span>{activeProject.client}</span>
                        </>
                      )}
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#101828] leading-[1.18]">
                      {activeProject.title}
                    </h2>

                    <p className="mt-4 text-sm sm:text-base text-[#667085] leading-relaxed">
                      {activeProject.tagline}
                    </p>

                    {/* Technical tools used */}
                    <div className="mt-6">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                        Technologies & APIs
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.tools?.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-lg bg-white border border-gray-200 px-3 py-1 text-xs font-semibold text-[#101828] shadow-2xs"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Link & Navigation Arrows */}
                  <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <Link
                      to="/portfolio/$slug"
                      params={{ slug: activeProject.slug }}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5B8CFF] px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_4px_16px_rgba(91,140,255,0.35)] transition-all hover:bg-[#3E6EE0] hover:scale-105"
                    >
                      <span>Read Deep Case Study</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>

                    {/* Directional Previous / Next Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        aria-label="Previous project"
                        onClick={handlePrev}
                        className="flex h-11 w-11 items-center justify-center rounded-full glass-pill text-[#0B1220] shadow-sm hover:border-[#5B8CFF] hover:text-[#5B8CFF] transition-all hover:scale-108 active:scale-92"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <span className="text-xs font-mono font-bold text-[#667085] px-2.5 py-1 rounded-full bg-white/70 border border-gray-200/80 shadow-2xs">
                        {activeIndex + 1} / {filtered.length}
                      </span>
                      <button
                        type="button"
                        aria-label="Next project"
                        onClick={handleNext}
                        className="flex h-11 w-11 items-center justify-center rounded-full glass-pill text-[#0B1220] shadow-sm hover:border-[#5B8CFF] hover:text-[#5B8CFF] transition-all hover:scale-108 active:scale-92"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horizontal Thumbnail Previews Strip */}
              <div className="mt-12 pt-8 border-t border-gray-200/60 hidden md:flex items-center gap-4 overflow-x-auto pb-2">
                {filtered.map((p, idx) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => {
                      setDirection(idx > activeIndex ? "next" : "prev");
                      setCurrentIndex(idx);
                    }}
                    className={`group relative flex-shrink-0 w-36 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      idx === activeIndex
                        ? "border-[#5B8CFF] shadow-md scale-105"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={p.gallery?.[0]?.src ?? p.cover}
                      alt={p.title}
                      className="h-full w-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Discuss CTA */}
        <section className="container-page py-12 text-center mb-8">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#101828]">
              Need an automation system like <span className="text-[#5B8CFF]">these</span>?
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-3 leading-relaxed">
              Every system is customized for the exact tool stack and operational constraints of your business.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#5B8CFF] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(91,140,255,0.35)] transition-all hover:bg-[#3E6EE0] hover:scale-105"
              >
                <span>Request System Architecture</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

