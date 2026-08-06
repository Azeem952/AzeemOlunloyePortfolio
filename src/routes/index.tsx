import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import {
  CtaBand,
  Eyebrow,
  GhostLink,
  HexPortrait,
  PrimaryLink,
  StatBlock,
  TechLogo,
} from "@/components/ui-kit";
import { media } from "@/data/media";
import { services, stack } from "@/data/services";
import { projectsQuery } from "@/lib/content-queries";
import type { CmsProject } from "@/lib/cms-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azeem Olunloye — AI Automation Engineer" },
      {
        name: "description",
        content:
          "I build AI agents, CRM sequences and workflow automations that remove manual work. 2+ years shipping production automation systems for growing teams.",
      },
      { property: "og:title", content: "Azeem Olunloye — AI Automation Engineer" },
      {
        property: "og:description",
        content:
          "AI agents, CRM automation and integrations that quietly do the work. See the systems I've shipped.",
      },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: media.portraitHero,
        fetchPriority: "high",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  errorComponent: () => <HomeShell projects={[]} />,
  component: () => <HomeShell projects={Route.useLoaderData() as CmsProject[]} />,
});

function HomeShell({ projects }: { projects: CmsProject[] }) {
  const featured = projects.slice(0, 4);

  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        {/* Hero */}
        <section className="container-page grid items-center gap-14 pt-14 pb-16 md:grid-cols-[1.15fr_0.85fr] md:pt-24 md:pb-28">
          <div>
            <Reveal>
              <Eyebrow>Available for new projects</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-[40px] font-extrabold leading-[1.06] tracking-[-0.02em] text-balance sm:text-[52px] md:text-[64px] md:leading-[72px]">
                I build AI automations that do the work your team keeps redoing.
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-[18px] leading-[1.7] text-muted-foreground">
                AI Automation Engineer with 2+ years designing agents, CRM
                sequences, document pipelines and integrations that run in
                production — reliably, and without supervision.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap gap-4">
                <PrimaryLink to="/contact">Start a project →</PrimaryLink>
                <GhostLink to="/portfolio">View my work</GhostLink>
              </div>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t pt-8">
                <StatBlock value="2+" label="Years building automations" />
                <StatBlock value="15+" label="Workflows in production" />
                <StatBlock value="20+" label="Tools integrated" />
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <HexPortrait
              priority
              src={media.portraitHero}
              alt="Azeem Olunloye, AI Automation Engineer"
            />
          </Reveal>
        </section>

        {/* Trusted tools */}
        <section className="hairline-t hairline-b bg-muted">
          <div className="container-page py-12">
            <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Platforms I build on every week
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {stack.slice(0, 10).map((t) => (
                <TechLogo key={t} name={t} size={26} className="opacity-90" />
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="container-page section-y">
          <Reveal>
            <Eyebrow>What I do</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-balance md:text-[44px]">
              Automation solutions for modern businesses
            </h2>
            <p className="mt-5 max-w-2xl text-[18px] leading-[1.7] text-muted-foreground">
              Every engagement starts with the workflow, not the tool. Then I
              pick the stack that makes it dependable.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <article className="card-lift h-full rounded-2xl border bg-surface p-7">
                  <TechLogo name={s.brand} size={36} showName={false} />
                  <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {s.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {s.tools.map((t) => (
                      <TechLogo key={t} name={t} size={20} showName={false} />
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <GhostLink to="/services">Explore all services →</GhostLink>
          </div>
        </section>

        {/* Featured work */}
        {featured.length > 0 && (
          <section className="hairline-t bg-muted">
            <div className="container-page section-y">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <Eyebrow>Selected work</Eyebrow>
                    <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-balance md:text-[44px]">
                      Systems shipped, not slideware
                    </h2>
                  </div>
                  <Link
                    to="/portfolio"
                    className="text-[15px] font-bold text-accent hover:underline"
                  >
                    See all projects →
                  </Link>
                </div>
              </Reveal>

              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {featured.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 70}>
                    <Link
                      to="/portfolio/$slug"
                      params={{ slug: p.slug }}
                      className="card-lift group block h-full overflow-hidden rounded-2xl border bg-surface"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-subtle">
                        <img
                          src={p.gallery[0]?.src ?? p.cover}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-7">
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent-2">
                          {p.category}
                        </span>
                        <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                          {p.tagline}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                          {p.tools.slice(0, 4).map((t) => (
                            <TechLogo key={t} name={t} size={20} showName={false} />
                          ))}
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Impact */}
        <section className="container-page section-y">
          <Reveal>
            <div className="grid gap-10 rounded-2xl border bg-surface px-8 py-12 sm:grid-cols-2 lg:grid-cols-4 md:px-14">
              <StatBlock value="100%" label="Of new leads followed up" />
              <StatBlock value="<60s" label="Receipt to filed record" />
              <StatBlock value="24/7" label="Agents answering enquiries" />
              <StatBlock value="0" label="Manual sends per week" />
            </div>
          </Reveal>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
