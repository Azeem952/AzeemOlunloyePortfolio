import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { CtaBand, CtaPill, Eyebrow, TechLogo } from "@/components/ui-kit";
import { categories } from "@/data/projects";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectsQuery } from "@/lib/content-queries";
import type { CmsProject } from "@/lib/cms-types";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Work — AI Automation Case Studies | Azeem Olunloye" },
      {
        name: "description",
        content:
          "Selected AI automation projects — CRM sequences, agentic bookers, OCR intake and lead generation systems shipped to production.",
      },
      { property: "og:title", content: "Work — Azeem Olunloye" },
      {
        property: "og:description",
        content:
          "Selected AI automation projects shipped to production — CRM, agents, integrations.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  errorComponent: () => (
    <div className="container-page py-32 text-center">
      <p className="text-muted-foreground">Portfolio could not be loaded. Please refresh.</p>
    </div>
  ),
  component: Portfolio,
});

/**
 * Compact niche filters. Each niche groups the raw project categories so the
 * work page shows a short, meaningful row instead of a wall of pills.
 */
const NICHES: { label: string; match: string[] }[] = [
  { label: "AI Agents", match: ["AI Agents", "AI Chatbots", "AI"] },
  { label: "Voice AI", match: ["Voice AI"] },
  {
    label: "CRM & Sales",
    match: ["CRM Automation", "CRM Integration", "Lead Generation", "Customer Service", "Customer Support"],
  },
  {
    label: "Workflow Automation",
    match: ["Workflow Automation", "Workflow Engineering", "Automation", "n8n"],
  },
  { label: "Integrations", match: ["Integrations"] },
  { label: "Data & OCR", match: ["OCR", "Data", "Data & OCR", "Document Processing"] },
];

function Portfolio() {
  const { data: projects } = useSuspenseQuery(projectsQuery) as { data: CmsProject[] };
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const activeCats = useMemo(() => {
    const present = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => present.add(c)));
    const niches = NICHES.filter((n) => n.match.some((m) => present.has(m))).map((n) => n.label);
    return ["All", ...niches];
  }, [projects]);

  const filtered = useMemo(() => {
    const niche = NICHES.find((n) => n.label === cat);
    return projects.filter((p) => {
      const inCat = cat === "All" || (niche ? p.categories.some((c) => niche.match.includes(c)) : true);
      const query = q.trim().toLowerCase();
      const inQ =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.tools.some((t) => t.toLowerCase().includes(query)) ||
        p.categories.some((c) => c.toLowerCase().includes(query));
      return inCat && inQ;
    });
  }, [cat, q, projects]);

  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        <section className="container-page pt-14 pb-8 text-center md:pt-24 md:pb-12">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-[40px] font-extrabold leading-[1.06] tracking-[-0.02em] text-balance md:text-[64px] md:leading-[72px]">
              Automation systems shipped to production
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-[1.7] text-muted-foreground">
              Real builds with real screenshots, workflows and demo recordings —
              each one running for a business, not a portfolio.
            </p>
          </Reveal>
        </section>



        <section className="container-page sticky top-[72px] z-30 flex flex-col gap-2.5 bg-background/90 py-3 backdrop-blur-md md:top-[88px] md:flex-row md:items-center md:justify-between md:gap-4 md:py-4">
          <div
            role="tablist"
            aria-label="Filter projects by niche"
            className="filter-row -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-0.5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
          >
            {activeCats.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`shrink-0 snap-start whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-200 ${
                  cat === c
                    ? "border-accent bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="relative block w-full md:w-60 md:shrink-0">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects, tools…"
              className="h-10 w-full rounded-full border bg-background px-4 pr-9 text-sm outline-none focus:border-accent"
            />
            <span aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">⌕</span>
          </label>
        </section>

        <section className="container-page pb-20 pt-8 md:pb-28">
          {filtered.length === 0 ? (
            <p className="py-24 text-center text-muted-foreground">
              No projects match that filter.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {filtered.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 2) * 70}>
                  <Link
                    to="/portfolio/$slug"
                    params={{ slug: p.slug }}
                    className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-subtle">
                      {p.video ? (
                        <video
                          src={p.video}
                          muted
                          loop
                          playsInline
                          preload="none"
                          poster={p.gallery[0]?.src ?? p.cover}
                          onMouseEnter={(e) => void e.currentTarget.play()}
                          onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={p.gallery[0]?.src ?? p.cover}
                          alt={p.title}
                          width={800}
                          height={500}
                          decoding="async"
                          loading={i < 2 ? "eager" : "lazy"}
                          fetchPriority={i < 2 ? "high" : "auto"}
                          className="h-full w-full object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.02]"
                        />
                      )}
                      {p.video && (
                        <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-bold text-ink-foreground">
                          ▶ Demo video
                        </span>
                      )}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-ink opacity-0 transition-opacity duration-[250ms] group-hover:opacity-10"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex flex-wrap gap-2">
                        {p.categories.slice(0, 2).map((c) => (
                          <span
                            key={c}
                            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent-2"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                        {p.tagline}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-4">
                        {p.tools.slice(0, 5).map((t) => (
                          <TechLogo key={t} name={t} size={22} showName={false} />
                        ))}
                      </div>
                      <span className="mt-auto pt-7">
                        <CtaPill>Read case study →</CtaPill>
                      </span>

                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <CtaBand
          title="Your workflow could be the next case study"
          body="Send a one-paragraph brief and I'll tell you how I'd automate it."
        />
      </main>
      <Footer />
    </div>
  );
}
