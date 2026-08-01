import { createFileRoute, useNavigate, useRouter, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { CmsProject, ProjectInput } from "@/lib/cms-types";
import {
  addProjectMedia,
  createProject,
  deleteMedia,
  getAdminProject,
  reorderMedia,
  updateMediaCaption,
  updateProject,
  uploadFile,
} from "@/lib/admin-client";

export const Route = createFileRoute("/azeemadmin/projects/$id")({
  component: ProjectEditor,
});

const EMPTY: ProjectInput = {
  slug: "",
  title: "",
  tagline: "",
  category: "Automation",
  categories: [],
  year: String(new Date().getFullYear()),
  client: "",
  duration: "",
  role: "",
  overview: "",
  problem: "",
  solution: "",
  architecture: [],
  workflow: [],
  tools: [],
  features: [],
  outcome: [],
  tags: [],
  featured: false,
  published: false,
};

const lines = (v: string) => v.split("\n").map((s) => s.trim()).filter(Boolean);
const csv = (v: string) => v.split(",").map((s) => s.trim()).filter(Boolean);

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

function ProjectEditor() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ProjectInput>(EMPTY);
  const [media, setMedia] = useState<CmsProject["media"]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  const set = <K extends keyof ProjectInput>(k: K, v: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const loadMedia = async () => {
    if (isNew) return;
    const p = await getAdminProject(id);
    setMedia(p?.media ?? []);
  };

  useEffect(() => {
    if (isNew) return;
    getAdminProject(id)
      .then((p) => {
        if (!p) {
          toast.error("Project not found");
          return;
        }
        setForm({
          slug: p.slug,
          title: p.title,
          tagline: p.tagline,
          category: p.category,
          categories: p.categories,
          year: p.year,
          client: p.client,
          duration: p.duration,
          role: p.role,
          overview: p.overview,
          problem: p.problem,
          solution: p.solution,
          architecture: p.architecture,
          workflow: p.workflow,
          tools: p.tools,
          features: p.features,
          outcome: p.outcome,
          tags: p.tags,
          featured: p.featured,
          published: p.published,
        });
        setMedia(p.media);
      })
      .catch((e) => toast.error(e.message ?? "Could not load project"))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const save = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error("Title and URL slug are required");
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        const newId = await createProject(form);
        toast.success("Project created");
        router.invalidate();
        navigate({ to: "/azeemadmin/projects/$id", params: { id: newId } });
      } else {
        await updateProject(id, form);
        toast.success("Changes saved");
        router.invalidate();
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save");
    } finally {
      setSaving(false);
    }
  };

  const onUpload = async (files: FileList | null) => {
    if (!files?.length || isNew) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of Array.from(files)) {
        const r = await uploadFile(file);
        uploaded.push({ url: r.url, kind: r.kind, caption: "" });
      }
      await addProjectMedia(id, uploaded, media.length);
      await loadMedia();
      toast.success(`${uploaded.length} file(s) added`);
      router.invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const onDropMedia = async (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const next = [...media];
    const from = next.findIndex((m) => m.id === dragId);
    const to = next.findIndex((m) => m.id === targetId);
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setMedia(next);
    setDragId(null);
    await reorderMedia(next.map((m) => m.id));
    router.invalidate();
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-8 pb-24">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/azeemadmin/projects" className="text-xs text-muted-foreground hover:underline">
            ← Portfolio
          </Link>
          <h1 className="font-display text-3xl tracking-tight">
            {isNew ? "New project" : form.title || "Untitled"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
            />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
            />
            Featured
          </label>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-semibold text-ink-foreground disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </header>

      <section className="grid gap-4 rounded-2xl border bg-background p-5 sm:grid-cols-2">
        <Field label="Title">
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (isNew && !form.slug)
                set(
                  "slug",
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, ""),
                );
            }}
          />
        </Field>
        <Field label="URL slug" hint="Appears as /portfolio/your-slug">
          <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        </Field>
        <Field label="Tagline">
          <input className={inputCls} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
        </Field>
        <Field label="Primary category">
          <input className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)} />
        </Field>
        <Field label="All categories" hint="Comma separated">
          <input
            className={inputCls}
            value={form.categories.join(", ")}
            onChange={(e) => set("categories", csv(e.target.value))}
          />
        </Field>
        <Field label="Tags" hint="Comma separated">
          <input
            className={inputCls}
            value={form.tags.join(", ")}
            onChange={(e) => set("tags", csv(e.target.value))}
          />
        </Field>
        <Field label="Year">
          <input className={inputCls} value={form.year} onChange={(e) => set("year", e.target.value)} />
        </Field>
        <Field label="Client">
          <input className={inputCls} value={form.client} onChange={(e) => set("client", e.target.value)} />
        </Field>
        <Field label="Duration">
          <input className={inputCls} value={form.duration} onChange={(e) => set("duration", e.target.value)} />
        </Field>
        <Field label="Role">
          <input className={inputCls} value={form.role} onChange={(e) => set("role", e.target.value)} />
        </Field>
      </section>

      <section className="grid gap-4 rounded-2xl border bg-background p-5">
        <Field label="Overview">
          <textarea
            rows={3}
            className={inputCls}
            value={form.overview}
            onChange={(e) => set("overview", e.target.value)}
          />
        </Field>
        <Field label="Problem">
          <textarea
            rows={3}
            className={inputCls}
            value={form.problem}
            onChange={(e) => set("problem", e.target.value)}
          />
        </Field>
        <Field label="Solution">
          <textarea
            rows={3}
            className={inputCls}
            value={form.solution}
            onChange={(e) => set("solution", e.target.value)}
          />
        </Field>
        <Field label="Architecture" hint="One item per line">
          <textarea
            rows={4}
            className={inputCls}
            value={form.architecture.join("\n")}
            onChange={(e) => set("architecture", lines(e.target.value))}
          />
        </Field>
        <Field label="Workflow steps" hint="One per line — Step title | detail">
          <textarea
            rows={5}
            className={inputCls}
            value={form.workflow.map((w) => `${w.step} | ${w.detail}`).join("\n")}
            onChange={(e) =>
              set(
                "workflow",
                lines(e.target.value).map((l) => {
                  const [step, ...rest] = l.split("|");
                  return { step: step.trim(), detail: rest.join("|").trim() };
                }),
              )
            }
          />
        </Field>
        <Field label="Features" hint="One per line">
          <textarea
            rows={4}
            className={inputCls}
            value={form.features.join("\n")}
            onChange={(e) => set("features", lines(e.target.value))}
          />
        </Field>
        <Field label="Tools" hint="Comma separated">
          <input
            className={inputCls}
            value={form.tools.join(", ")}
            onChange={(e) => set("tools", csv(e.target.value))}
          />
        </Field>
        <Field label="Outcome metrics" hint="One per line — 100% | lead follow-up">
          <textarea
            rows={4}
            className={inputCls}
            value={form.outcome.map((o) => `${o.metric} | ${o.label}`).join("\n")}
            onChange={(e) =>
              set(
                "outcome",
                lines(e.target.value).map((l) => {
                  const [metric, ...rest] = l.split("|");
                  return { metric: metric.trim(), label: rest.join("|").trim() };
                }),
              )
            }
          />
        </Field>
      </section>

      <section className="rounded-2xl border bg-background p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">Media</h2>
            <p className="text-xs text-muted-foreground">
              Images, videos and documents. First image becomes the cover; drag to reorder.
            </p>
          </div>
          <input
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => onUpload(e.target.files)}
          />
          <button
            type="button"
            disabled={isNew || uploading}
            onClick={() => fileRef.current?.click()}
            className="inline-flex h-10 items-center rounded-full border px-5 text-sm font-semibold disabled:opacity-50"
          >
            {uploading ? "Uploading…" : isNew ? "Save project first" : "Upload files"}
          </button>
        </div>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((m) => (
            <li
              key={m.id}
              draggable
              onDragStart={() => setDragId(m.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropMedia(m.id)}
              className={`rounded-xl border p-3 ${dragId === m.id ? "opacity-50" : ""}`}
            >
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                {m.kind === "image" ? (
                  <img src={m.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                ) : m.kind === "video" ? (
                  <video src={m.url} className="h-full w-full object-cover" muted playsInline />
                ) : (
                  <div className="grid h-full place-items-center text-xs text-muted-foreground">
                    {m.kind.toUpperCase()}
                  </div>
                )}
              </div>
              <input
                className="mt-2 w-full rounded-lg border bg-background px-2 py-1.5 text-xs outline-none"
                defaultValue={m.caption}
                placeholder="Caption"
                onBlur={async (e) => {
                  if (e.target.value === m.caption) return;
                  await updateMediaCaption(m.id, e.target.value);
                  toast.success("Caption saved");
                  void loadMedia();
                }}
              />
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="cursor-grab text-muted-foreground">⠿ drag</span>
                <button
                  type="button"
                  className="text-destructive"
                  onClick={async () => {
                    if (!confirm("Remove this file from the project?")) return;
                    await deleteMedia(m.id);
                    toast.success("Removed");
                    void loadMedia();
                    router.invalidate();
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
          {!media.length && (
            <li className="text-sm text-muted-foreground">No media yet.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
