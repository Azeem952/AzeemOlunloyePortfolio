import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listAdminProjects, listLibrary } from "@/lib/admin-client";

export const Route = createFileRoute("/azeemadmin/")({
  component: Overview,
});

function Overview() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, media: 0 });
  const [recent, setRecent] = useState<{ id: string; title: string; published: boolean }[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    (async () => {
      const [projects, library] = await Promise.all([listAdminProjects(), listLibrary()]);
      setStats({
        total: projects.length,
        published: projects.filter((p) => p.published).length,
        drafts: projects.filter((p) => !p.published).length,
        media: library.length,
      });
      setRecent(
        [...projects]
          .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
          .slice(0, 5)
          .map((p) => ({ id: p.id, title: p.title, published: p.published })),
      );
    })().catch(() => undefined);
  }, []);

  const cards = [
    { label: "Projects", value: stats.total },
    { label: "Published", value: stats.published },
    { label: "Drafts", value: stats.drafts },
    { label: "Media files", value: stats.media },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage everything on the public site without touching code.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border bg-background p-5">
            <p className="text-3xl font-semibold tabular-nums">{c.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/azeemadmin/projects/$id"
          params={{ id: "new" }}
          className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-semibold text-ink-foreground"
        >
          New project
        </Link>
        <Link
          to="/azeemadmin/media"
          className="inline-flex h-10 items-center rounded-full border px-5 text-sm font-semibold"
        >
          Upload media
        </Link>
      </div>

      <section className="rounded-2xl border bg-background">
        <h2 className="border-b px-5 py-4 text-sm font-semibold">Recently updated</h2>
        <ul className="divide-y">
          {recent.map((p) => (
            <li key={p.id} className="flex items-center justify-between px-5 py-3">
              <Link
                to="/azeemadmin/projects/$id"
                params={{ id: p.id }}
                className="text-sm hover:underline"
              >
                {p.title}
              </Link>
              <span className="text-xs text-muted-foreground">
                {p.published ? "Published" : "Draft"}
              </span>
            </li>
          ))}
          {!recent.length && (
            <li className="px-5 py-6 text-sm text-muted-foreground">No projects yet.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
