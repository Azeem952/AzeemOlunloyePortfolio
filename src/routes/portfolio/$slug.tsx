import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/portfolio/$slug")({
  head: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    if (!p) return { meta: [{ title: "Case study — Azeem Olunloye" }] };
    return {
      meta: [
        { title: `${p.title} — Azeem Olunloye` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.title} — Azeem Olunloye` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  loader: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  component: ProjectPage,
});

function ProjectPage() {
  const p = Route.useLoaderData();
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 2);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? null : (i + 1) % p.gallery.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null ? null : (i - 1 + p.gallery.length) % p.gallery.length,
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, p.gallery.length]);

  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        <article>
          <header className="container-page pt-12 pb-10 md:pt-20">
            <Link
              to="/portfolio"
              className="text-xs uppercase tracking-widest text-muted-foreground underline underline-offset-4"
            >
              ← Portfolio
            </Link>
            <p className="mt-8 font-mono text-xs text-muted-foreground">
              {p.category} · {p.year}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl">
              {p.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {p.tagline}
            </p>
          </header>

          <div className="container-page">
            <div className="overflow-hidden rounded-lg bg-subtle">
              <img
                src={p.gallery[0]?.src ?? p.cover}
                alt={p.gallery[0]?.caption ?? p.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>

          <section className="container-page grid gap-12 py-24 md:grid-cols-[1fr_2fr] md:py-32">
            <aside className="space-y-6 md:sticky md:top-24 md:self-start">
              {[
                ["Client", p.client],
                ["Role", p.role],
                ["Duration", p.duration],
                ["Year", p.year],
              ].map(([k, v]) => (
                <div key={k} className="hairline-b pb-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {k}
                  </p>
                  <p className="mt-1 text-sm">{v}</p>
                </div>
              ))}
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Tools
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tools.map((t) => (
                    <span key={t} className="rounded-full border px-2.5 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            <div className="space-y-16">
              <Block title="Overview" body={p.overview} />
              <Block title="The problem" body={p.problem} />
              <Block title="The solution" body={p.solution} />

              <div>
                <SectionLabel>Architecture</SectionLabel>
                <ul className="mt-6 space-y-4">
                  {p.architecture.map((line, i) => (
                    <li key={i} className="flex gap-4 border-t pt-4">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionLabel>Workflow</SectionLabel>
                <ol className="mt-6 grid gap-px bg-border">
                  {p.workflow.map((w, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[80px_1fr] gap-6 bg-background p-5 md:grid-cols-[160px_1fr]"
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")} · {w.step}
                      </span>
                      <span className="text-sm leading-relaxed">{w.detail}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <SectionLabel>Key features</SectionLabel>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="rounded-md border p-4 text-sm leading-relaxed"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionLabel>Business outcome</SectionLabel>
                <div className="mt-6 grid gap-px bg-border md:grid-cols-3">
                  {p.outcome.map((o) => (
                    <div key={o.label} className="bg-background p-6">
                      <p className="font-display text-4xl">{o.metric}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="hairline-t bg-muted">
            <div className="container-page py-24">
              <SectionLabel>Gallery</SectionLabel>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {p.gallery.map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="group text-left"
                  >
                    <div className="overflow-hidden rounded-lg bg-background">
                      <img
                        src={g.src}
                        alt={g.caption}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">{g.caption}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Related */}
          <section className="container-page py-24 md:py-32">
            <div className="mb-10 flex items-end justify-between">
              <SectionLabel>Related projects</SectionLabel>
              <Link to="/portfolio" className="text-sm underline underline-offset-4">
                All →
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/portfolio/$slug"
                  params={{ slug: r.slug }}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-lg bg-subtle">
                    <img
                      src={r.gallery[0]?.src ?? r.cover}
                      alt={r.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="mt-4 font-mono text-xs text-muted-foreground">
                    {r.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl">{r.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={p.gallery[lightbox].caption}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            ✕
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) =>
                i === null ? 0 : (i - 1 + p.gallery.length) % p.gallery.length,
              );
            }}
            className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? 0 : (i + 1) % p.gallery.length));
            }}
            className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            →
          </button>
          <figure className="max-h-[90vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={p.gallery[lightbox].src}
              alt={p.gallery[lightbox].caption}
              className="max-h-[80vh] w-auto rounded"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {p.gallery[lightbox].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </p>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <p className="mt-4 text-lg leading-relaxed text-foreground/90 text-balance">
        {body}
      </p>
    </div>
  );
}
