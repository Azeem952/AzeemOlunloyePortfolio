import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { CtaBand, Eyebrow, StatBlock, TechLogo } from "@/components/ui-kit";
import { categories } from "@/data/projects";
import { listPublicProjects } from "@/lib/content.functions";
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
  loader: () => listPublicProjects(),
  errorComponent: () => (
    <div className="container-page py-32 text-center">
      <p className="text-muted-foreground">Portfolio could not be loaded. Please refresh.</p>
    </div>
  ),
  component: Portfolio,
});

function Portfolio() {
  const projects = Route.useLoaderData() as CmsProject[];
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const activeCats = useMemo(() => {
    const s = new Set<string>(["All"]);
    projects.forEach((p) => p.categories.forEach((c) => s.add(c)));
    const known = categories.filter((c) => s.has(c));
    const extra = [...s].filter((c) => !categories.includes(c));
    return [...known, ...extra];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const inCat = cat === "All" || p.categories.includes(cat);
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
        <section className="container-page pt-14 pb-10 text-center md:pt-24">
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

        <section className="container-page pb-4">
          <Reveal>
            <div className="grid gap-8 rounded-2xl border bg-muted px-8 py-10 sm:grid-cols-3">
              <StatBlock value={`${projects.length}`} label="Case studies" />
              <StatBlock value="20+" label="Tools integrated" />
              <StatBlock value="2+" label="Years shipping" />
            </div>
          </Reveal>
        </section>

        <section className="container-page sticky top-[72px] z-30 flex flex-col gap-4 bg-background/90 py-5 backdrop-blur-md md:top-[88px] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {activeCats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-xl border px-4 py-2 text-sm font-bold transition-colors ${
                  cat === c
                    ? "border-accent bg-accent text-accent-foreground shadow-green"
                    : "hover:border-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="relative block w-full md:w-64">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects, tools…"
              className="h-11 w-full rounded-xl border bg-background px-4 pr-9 text-sm outline-none focus:border-accent"
            />
            <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">⌕</span>
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
                          preload="metadata"
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
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      )}
                      {p.video && (
                        <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-bold text-ink-foreground">
                          ▶ Demo video
                        </span>
                      )}
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
