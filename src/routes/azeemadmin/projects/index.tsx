import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { CmsProject } from "@/lib/cms-types";
import {
  deleteProject,
  duplicateProject,
  listAdminProjects,
  reorderProjects,
  setPublished,
} from "@/lib/admin-client";

export const Route = createFileRoute("/azeemadmin/projects/")({
  component: ProjectsAdmin,
});

function ProjectsAdmin() {
  const router = useRouter();
  const [items, setItems] = useState<CmsProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragId, setDragId] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const load = () =>
    listAdminProjects()
      .then(setItems)
      .catch((e) => toast.error(e.message ?? "Could not load projects"))
      .finally(() => setLoading(false));

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDrop = async (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const next = [...items];
    const from = next.findIndex((p) => p.id === dragId);
    const to = next.findIndex((p) => p.id === targetId);
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setItems(next);
    setDragId(null);
    try {
      await reorderProjects(next.map((p) => p.id));
      toast.success("Order saved");
      router.invalidate();
    } catch {
      toast.error("Could not save the new order");
      void load();
    }
  };

  const visible = items.filter(
    (p) =>
      !q.trim() ||
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.slug.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Portfolio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag rows to reorder how projects appear on the site.
          </p>
        </div>
        <Link
          to="/azeemadmin/projects/$id"
          params={{ id: "new" }}
          className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-semibold text-ink-foreground"
        >
          New project
        </Link>
      </header>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search projects"
        className="h-11 w-full max-w-sm rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="overflow-hidden rounded-2xl border bg-background">
        {loading ? (
          <p className="px-5 py-8 text-sm text-muted-foreground">Loading…</p>
        ) : !visible.length ? (
          <p className="px-5 py-8 text-sm text-muted-foreground">No projects found.</p>
        ) : (
          <ul className="divide-y">
            {visible.map((p) => (
              <li
                key={p.id}
                draggable
                onDragStart={() => setDragId(p.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(p.id)}
                className={`flex flex-wrap items-center gap-4 px-4 py-3 ${
                  dragId === p.id ? "opacity-50" : ""
                }`}
              >
                <span className="cursor-grab select-none text-muted-foreground" aria-hidden>
                  ⠿
                </span>
                {p.cover ? (
                  <img
                    src={p.cover}
                    alt=""
                    className="h-12 w-20 shrink-0 rounded-md object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-12 w-20 shrink-0 rounded-md bg-muted" />
                )}
                <div className="min-w-0 flex-1">
                  <Link
                    to="/azeemadmin/projects/$id"
                    params={{ id: p.id }}
                    className="block truncate text-sm font-semibold hover:underline"
                  >
                    {p.title}
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">
                    /{p.slug} · {p.media.length} media
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    await setPublished(p.id, !p.published);
                    toast.success(p.published ? "Moved to drafts" : "Published");
                    void load();
                    router.invalidate();
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    p.published
                      ? "bg-emerald-500/15 text-emerald-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {p.published ? "Published" : "Draft"}
                </button>
                <div className="flex gap-2 text-xs">
                  <a
                    href={`/portfolio/${p.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border px-3 py-1"
                  >
                    View
                  </a>
                  <button
                    type="button"
                    className="rounded-full border px-3 py-1"
                    onClick={async () => {
                      await duplicateProject(p.id);
                      toast.success("Duplicated as draft");
                      void load();
                    }}
                  >
                    Duplicate
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-destructive/40 px-3 py-1 text-destructive"
                    onClick={async () => {
                      if (!confirm(`Delete “${p.title}”? This cannot be undone.`)) return;
                      await deleteProject(p.id);
                      toast.success("Project deleted");
                      void load();
                      router.invalidate();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
