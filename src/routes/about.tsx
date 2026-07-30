import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Azeem Olunloye" },
      {
        name: "description",
        content:
          "Two years in, focused on shipping AI automation systems that businesses actually rely on. Here's how I work and what I care about.",
      },
      { property: "og:title", content: "About — Azeem Olunloye" },
      {
        property: "og:description",
        content:
          "Two years in, focused on shipping AI automation systems that businesses actually rely on.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-dvh">
      <Nav />
      <main>
        <section className="container-page pt-16 pb-16 md:pt-28">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">About</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-balance md:text-8xl">
            Engineering the boring<br />
            <span className="text-muted-foreground">out of good businesses.</span>
          </h1>
        </section>

        <section className="container-page grid gap-16 pb-24 md:grid-cols-[2fr_1fr] md:pb-32">
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              I'm Azeem Olunloye — an AI automation engineer with two years
              designing and shipping production systems that quietly replace
              repetitive human work.
            </p>
            <p className="text-muted-foreground">
              My path into automation started with a simple frustration:
              watching operators, sales teams and back-office staff spend hours
              a day on work that had no business being manual. Every "just this
              one spreadsheet" was really a workflow waiting to be built.
            </p>
            <p className="text-muted-foreground">
              I moved from tinkering with Zapier and Make into serious n8n
              engineering, then folded in LLMs — first as summarisers, then as
              agents with real tools and guardrails. Today I build end-to-end:
              triggers, integrations, prompts, validators, retries, dashboards,
              and the runbook that keeps it alive at 3am.
            </p>
            <p className="text-muted-foreground">
              The systems I care about share a shape. They're observable.
              They fail loudly. They stop when they should. They're kind to the
              humans on the other end. And they hold up under the awkward
              edge cases nobody wrote a ticket for.
            </p>
            <p>
              If your business is drowning in a workflow that could belong to
              software — I'd like to talk.
            </p>
          </div>

          <aside className="space-y-8 md:sticky md:top-24 md:self-start">
            <div className="hairline-b pb-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Focus</p>
              <p className="mt-2">AI Automation Engineering</p>
            </div>
            <div className="hairline-b pb-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Experience</p>
              <p className="mt-2">2+ years shipping production workflows</p>
            </div>
            <div className="hairline-b pb-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Working with</p>
              <p className="mt-2">Startups, SMBs, agencies, operations teams</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Elsewhere</p>
              <ul className="mt-2 space-y-1">
                <li>
                  <a
                    href="https://www.linkedin.com/in/azeem-olunloye-42177141b"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/2348138602053"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="hairline-t bg-muted">
          <div className="container-page py-24 md:py-32">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Principles</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
              How I build.
            </h2>
            <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
              {[
                {
                  t: "Reliability before cleverness",
                  d: "A modest workflow that runs forever beats a brilliant one that flakes on Tuesdays.",
                },
                {
                  t: "Humans in the loop, on purpose",
                  d: "Automation should escalate, not hide. Every system I ship knows when to ping a person.",
                },
                {
                  t: "Observable by default",
                  d: "Logs, retries and clear failure modes. If it breaks, you'll know before your customer does.",
                },
                {
                  t: "Kind interfaces",
                  d: "Whether the user is a customer on WhatsApp or a sales rep in HubSpot — the interaction should feel considered.",
                },
                {
                  t: "Cost-aware AI",
                  d: "Right model for the job. Not every step needs a frontier model; most steps don't need one at all.",
                },
                {
                  t: "Ship, then harden",
                  d: "Get value flowing in week one; spend the rest of the engagement making it bulletproof.",
                },
              ].map((p) => (
                <div key={p.t} className="bg-background p-8">
                  <p className="text-lg font-medium">{p.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page py-24 md:py-32">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-end">
            <h2 className="font-display text-4xl leading-tight text-balance md:text-6xl">
              The best briefs start<br />with a real problem.
            </h2>
            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
              >
                Tell me yours
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex h-12 items-center justify-center rounded-full border px-6 text-sm font-medium"
              >
                See the work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
