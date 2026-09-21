import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectsQuery } from "@/lib/content-queries";
import type { CmsProject } from "@/lib/cms-types";
import { ArrowUpRight, Sparkles, CheckCircle2, Search } from "lucide-react";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Production AI Automation Systems | Azeem Olunloye" },
      {
        name: "description",
        content:
          "Selected AI automation systems, autonomous agents, and CRM pipelines shipped to production by Azeem Olunloye.",
      },
      { property: "og:title", content: "Portfolio — Azeem Olunloye" },
      {
        property: "og:description",
        content:
          "Real case studies with architecture workflows, outcome metrics, and production screenshots.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  errorComponent: () => (
    <div className="container-page py-32 text-center">
      <p className="text-gray-500">Portfolio could not be loaded. Please refresh.</p>
    </div>
  ),
  component: Portfolio,
});

const CATEGORIES = ["All", "AI Agents", "CRM Automation", "Workflow Automation", "Document Processing"];

function Portfolio() {
  const { data: projects } = useSuspenseQuery(projectsQuery) as { data: CmsProject[] };
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        p.categories?.some((c) => c.toLowerCase().includes(selectedCategory.toLowerCase()));

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tools?.some((t) => t.toLowerCase().includes(q)) ||
        p.overview?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-dvh bg-white text-gray-900 selection:bg-[#FF5E1E] selection:text-white">
      <Nav />

      <main className="overflow-hidden">
        {/* Header Hero */}
        <section className="container-page pt-10 sm:pt-16 pb-12 sm:pb-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
              <span>Shipped Systems</span>
              <Sparkles className="h-3.5 w-3.5 text-[#FF5E1E]" />
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12] max-w-4xl mx-auto">
            Production systems engineered for <span className="text-[#FF5E1E]">real business workflows</span>.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Every build here represents a live production automation deployed for a real operational need, 
            complete with error guards and monitoring.
          </p>
        </section>

        {/* Filters & Search Toolbar */}
        <section className="container-page mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-[#141416] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search systems, tools…"
                className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF5E1E] focus:outline-none focus:ring-1 focus:ring-[#FF5E1E]"
              />
            </div>
          </div>
        </section>

        {/* Project Case Studies Grid (Editorial 2-Column with High-Quality Imagery) */}
        <section className="container-page pb-20 sm:pb-28">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 p-16 text-center">
              <p className="font-display text-lg font-bold text-gray-800">No projects match your filter</p>
              <p className="text-sm text-gray-500 mt-1">Try selecting "All" or clearing your search term.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center rounded-full bg-[#141416] px-5 py-2 text-xs font-bold text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {filtered.map((p) => {
                const coverImage = p.gallery?.[0]?.src ?? p.cover;

                return (
                  <Link
                    key={p.slug}
                    to="/portfolio/$slug"
                    params={{ slug: p.slug }}
                    className="group flex flex-col justify-between rounded-[32px] border border-gray-200/90 bg-white p-4 sm:p-5 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden"
                  >
                    <div>
                      {/* Visual Mockup Container */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] bg-gray-100 border border-gray-100">
                        <img
                          src={coverImage}
                          alt={p.title}
                          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="rounded-full bg-[#141416]/85 backdrop-blur-md px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                            {p.category}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition-all duration-300 group-hover:bg-[#FF5E1E] group-hover:text-white group-hover:scale-110">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="pt-6 px-2">
                        <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-[#FF5E1E] transition-colors leading-snug">
                          {p.title}
                        </h2>
                        <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                          {p.tagline}
                        </p>

                        {/* Measurable Outcome Pill if exists */}
                        {p.outcome && p.outcome.length > 0 && (
                          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200/70 px-3 py-1.5 text-xs font-semibold text-[#FF5E1E]">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">
                              {p.outcome[0].metric} — {p.outcome[0].label || "Verified Metric"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Tools Bar */}
                    <div className="mt-6 pt-4 px-2 border-t border-gray-100 flex flex-wrap items-center gap-1.5">
                      {p.tools?.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600"
                        >
                          {tool}
                        </span>
                      ))}
                      {p.tools && p.tools.length > 4 && (
                        <span className="text-[11px] text-gray-400 font-semibold pl-1">
                          +{p.tools.length - 4} more
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom Discuss CTA */}
        <section className="container-page py-12 text-center mb-8">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Need a custom system like <span className="text-[#FF5E1E]">these</span>?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
              Every system is customized for the exact tool stack and operational constraints of your business.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5E1E] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,94,30,0.35)] transition-all hover:bg-[#E54D12] hover:scale-105"
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

