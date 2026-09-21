import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { projectsQuery } from "@/lib/content-queries";
import type { CmsProject } from "@/lib/cms-types";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Terminal, Sparkles, Layers, ShieldCheck, Play } from "lucide-react";

type LoaderData = { project: CmsProject; related: CmsProject[] };

export const Route = createFileRoute("/portfolio/$slug")({
  head: ({ loaderData }) => {
    const p = (loaderData as LoaderData | undefined)?.project;
    if (!p) return { meta: [{ title: "Case Study — Azeem Olunloye" }] };
    return {
      meta: [
        { title: `${p.title} — AI Automation Case Study | Azeem Olunloye` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.title} — Azeem Olunloye` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  loader: async ({ context, params }): Promise<LoaderData> => {
    const all = (await context.queryClient.ensureQueryData(projectsQuery)) as CmsProject[];
    const project = all.find((x) => x.slug === params.slug);
    if (!project) throw notFound();
    return { project, related: all.filter((x) => x.slug !== project.slug).slice(0, 2) };
  },
  errorComponent: () => (
    <div className="container-page py-32 text-center">
      <p className="text-gray-600">This case study could not be loaded.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-32 text-center">
      <p className="text-gray-600">Case study not found.</p>
      <Link to="/portfolio" className="mt-4 inline-block font-bold text-[#5B8CFF] underline underline-offset-4">
        Back to portfolio
      </Link>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p, related } = Route.useLoaderData() as LoaderData;
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
    <div className="min-h-dvh bg-white text-gray-900 selection:bg-[#5B8CFF] selection:text-white">
      <Nav />

      <main className="overflow-hidden">
        {/* Case Study Header Banner */}
        <header className="container-page pt-8 sm:pt-14 pb-8 sm:pb-12">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#5B8CFF] transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Work</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="rounded-full bg-[#141416] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {p.category}
            </span>
            {p.year && (
              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
                {p.year}
              </span>
            )}
            {p.client && (
              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
                {p.client}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12]">
            {p.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
            {p.tagline}
          </p>
        </header>

        {/* Hero Visual Mockup */}
        <section className="container-page mb-14 sm:mb-20">
          <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] border border-gray-200 shadow-xl bg-gray-50">
            <img
              src={p.gallery[0]?.src ?? p.cover}
              alt={p.gallery[0]?.caption ?? p.title}
              className="aspect-[16/9] w-full object-cover object-top"
            />
          </div>

          {p.video && (
            <div className="mt-8 overflow-hidden rounded-[24px] border border-gray-200 bg-[#0B1220] p-4 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-3 px-2">
                <Play className="h-4 w-4 text-[#5B8CFF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">Live Video Demo</span>
              </div>
              <video
                src={p.video}
                controls
                playsInline
                preload="none"
                poster={p.gallery[0]?.src ?? p.cover}
                className="aspect-video w-full rounded-xl bg-black"
              >
                Your browser does not support embedded video.
              </video>
            </div>
          )}
        </section>

        {/* Two-Column Deep Case Study Breakdown */}
        <section className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-20 sm:pb-28">
          {/* Left Metadata Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
            <div className="rounded-3xl border border-gray-200/80 bg-[#F8F9FA] p-6 sm:p-7 shadow-sm space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#5B8CFF] pb-2 border-b border-gray-200">
                Project Parameters
              </h3>

              {[
                ["Role", p.role || "AI Automation Engineer"],
                ["Duration", p.duration || "Production Build"],
                ["Deployment", "Live in Production"],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-gray-200/60 pb-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{k}</p>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-gray-800">{v}</p>
                </div>
              ))}

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Tech Stack & APIs
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tools?.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-white border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-1.5 rounded-full bg-[#5B8CFF] py-2.5 px-4 text-xs font-bold text-white shadow-sm hover:bg-[#4A7DEF] transition-colors"
                >
                  <span>Build Similar System</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Narrative Content */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">
            {/* Overview */}
            {p.overview && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B8CFF]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Overview</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  The Context & Need
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {p.overview}
                </p>
              </div>
            )}

            {/* Problem & Solution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {p.problem && (
                <div className="rounded-3xl border border-red-200/60 bg-red-50/40 p-6 sm:p-7">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">The Problem</span>
                  <h3 className="font-display text-lg font-bold text-gray-900 mt-1 mb-3">What was broken</h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{p.problem}</p>
                </div>
              )}

              {p.solution && (
                <div className="rounded-3xl border border-green-200/60 bg-green-50/40 p-6 sm:p-7">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700">The Solution</span>
                  <h3 className="font-display text-lg font-bold text-gray-900 mt-1 mb-3">The Engineered Fix</h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{p.solution}</p>
                </div>
              )}
            </div>

            {/* Architecture Flow */}
            {p.architecture && p.architecture.length > 0 && (
              <div className="rounded-[32px] bg-[#0B1220] text-white p-7 sm:p-10 border border-white/10 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B8CFF] mb-2">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>System Pipeline</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Architecture & Data Flow
                </h2>
                <div className="mt-6 space-y-3">
                  {p.architecture.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="font-mono text-xs font-bold text-[#5B8CFF] mt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs sm:text-sm text-white/85 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Workflow Steps Breakdown */}
            {p.workflow && p.workflow.length > 0 && (
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B8CFF] mb-2">
                  <Layers className="h-3.5 w-3.5" />
                  <span>Step-by-Step Logic</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
                  Execution Workflow
                </h2>
                <div className="space-y-4">
                  {p.workflow.map((w, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-gray-200/80 bg-[#FAFBFD] p-5 sm:p-6 transition-all hover:border-[#5B8CFF]/40"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5B8CFF] text-white font-mono text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="font-display text-base font-extrabold text-gray-900">
                          {w.step}
                        </h3>
                      </div>
                      <p className="mt-2.5 pl-10 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {w.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Outcomes */}
            {p.outcome && p.outcome.length > 0 && (
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B8CFF] mb-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Measurable Impact</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
                  Verified Business Outcomes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {p.outcome.map((o, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-gray-200 bg-[#F8F9FA] p-5 text-center flex flex-col justify-center"
                    >
                      <p className="font-display text-3xl sm:text-4xl font-black text-[#5B8CFF] tracking-tight">
                        {o.metric}
                      </p>
                      <p className="mt-2 text-xs text-gray-600 font-medium">
                        {o.label || "Production Target"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visual Gallery */}
            {p.gallery && p.gallery.length > 1 && (
              <div>
                <h2 className="font-display text-2xl font-extrabold text-gray-900 tracking-tight mb-6">
                  System Screenshots & Evidence
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {p.gallery.slice(1).map((g, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLightbox(idx + 1)}
                      className="group text-left block overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={g.src}
                          alt={g.caption || p.title}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      {g.caption && (
                        <p className="p-3 text-xs text-gray-600 bg-white border-t border-gray-100">
                          {g.caption}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Case Studies */}
        {related.length > 0 && (
          <section className="container-page py-16 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#5B8CFF]">Next Builds</span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Related Systems
                </h2>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-800 hover:text-[#5B8CFF] transition-colors"
              >
                <span>View all builds</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/portfolio/$slug"
                  params={{ slug: r.slug }}
                  className="group block rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100">
                    <img
                      src={r.gallery[0]?.src ?? r.cover}
                      alt={r.title}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-4 px-2">
                    <span className="text-xs font-bold uppercase text-[#5B8CFF]">{r.category}</span>
                    <h3 className="font-display text-lg font-bold text-gray-900 mt-1 group-hover:text-[#5B8CFF] transition-colors">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            ✕
          </button>
          <figure className="max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={p.gallery[lightbox]?.src}
              alt={p.gallery[lightbox]?.caption || p.title}
              className="max-h-[82vh] w-auto rounded-xl shadow-2xl mx-auto"
            />
            {p.gallery[lightbox]?.caption && (
              <figcaption className="mt-4 text-center text-xs sm:text-sm text-white/80">
                {p.gallery[lightbox]?.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  );
}

