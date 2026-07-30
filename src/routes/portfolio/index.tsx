import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { categories, projects } from "@/data/projects";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Azeem Olunloye" },
      {
        name: "description",
        content:
          "Selected AI automation projects — CRM sequences, agentic bookers, and document intake systems shipped to production.",
      },
      { property: "og:title", content: "Portfolio — Azeem Olunloye" },
      {
        property: "og:description",
        content:
          "Selected AI automation projects shipped to production — CRM, agents, integrations.",
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const activeCats = useMemo(() => {
    const s = new Set<string>(["All"]);
    projects.forEach((p) => p.categories.forEach((c) => s.add(c)));
    return categories.filter((c) => s.has(c));
  }, []);

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
  }, [cat, q]);

  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        <section className="container-page pt-16 pb-12 md:pt-28">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Portfolio · {projects.length} projects
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-balance md:text-8xl">
            Systems shipped.<br />
            <span className="text-muted-foreground">Not slideware.</span>
          </h1>
        </section>

        <section className="container-page hairline-t hairline-b sticky top-16 z-30 flex flex-col gap-4 bg-background/85 py-4 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {activeCats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  cat === c
                    ? "border-foreground bg-foreground text-background"
                    : "hover:bg-subtle"
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
              className="h-9 w-full rounded-full border bg-transparent px-4 pr-9 text-sm outline-none focus:border-foreground"
            />
            <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">⌕</span>
          </label>
        </section>

        <section className="container-page py-16 md:py-20">
          {filtered.length === 0 ? (
            <p className="py-24 text-center text-muted-foreground">
              No projects match that filter.
            </p>
          ) : (
            <div className="grid gap-16 md:gap-24">
              {filtered.map((p, i) => {
                const alt = i % 2 === 1;
                return (
                  <Link
                    key={p.slug}
                    to="/portfolio/$slug"
                    params={{ slug: p.slug }}
                    className="group grid gap-8 md:grid-cols-12 md:items-center"
                  >
                    <div
                      className={`overflow-hidden rounded-lg bg-subtle md:col-span-8 ${
                        alt ? "md:order-2 md:col-start-5" : ""
                      }`}
                    >
                      <img
                        src={p.gallery[0]?.src ?? p.cover}
                        alt={p.title}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className={`md:col-span-4 ${alt ? "md:order-1" : ""}`}>
                      <p className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")} · {p.category}
                      </p>
                      <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {p.tagline}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.tools.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="mt-6 inline-block text-sm underline underline-offset-4 transition-transform group-hover:translate-x-1">
                        Read case study →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
