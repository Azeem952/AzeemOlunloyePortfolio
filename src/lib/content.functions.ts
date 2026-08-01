import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Project } from "@/data/projects";

type Row = Database["public"]["Tables"]["projects"]["Row"];
type MediaRow = Database["public"]["Tables"]["project_media"]["Row"];

export type CmsProject = Project & {
  id: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  tags: string[];
  media: { id: string; kind: string; url: string; caption: string; sortOrder: number }[];
};

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export function toProject(row: Row, mediaRows: MediaRow[]): CmsProject {
  const sorted = [...mediaRows].sort((a, b) => a.sort_order - b.sort_order);
  const images = sorted.filter((m) => m.kind === "image");
  const video = sorted.find((m) => m.kind === "video");
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    category: row.category,
    categories: row.categories ?? [],
    year: row.year,
    client: row.client,
    duration: row.duration,
    role: row.role,
    cover: row.cover_url || images[0]?.url || "",
    accent: "oklch(0.62 0.16 250)",
    overview: row.overview,
    problem: row.problem,
    solution: row.solution,
    architecture: row.architecture ?? [],
    workflow: (row.workflow as { step: string; detail: string }[] | null) ?? [],
    tools: row.tools ?? [],
    features: row.features ?? [],
    outcome: (row.outcome as { metric: string; label: string }[] | null) ?? [],
    gallery: images.map((m) => ({ src: m.url, caption: m.caption })),
    ...(video ? { video: video.url } : {}),
    published: row.published,
    featured: row.featured,
    sortOrder: row.sort_order,
    tags: row.tags ?? [],
    media: sorted.map((m) => ({
      id: m.id,
      kind: m.kind,
      url: m.url,
      caption: m.caption,
      sortOrder: m.sort_order,
    })),
  };
}

/** Public: every published project, in the order set in the dashboard. */
export const listPublicProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<CmsProject[]> => {
    const supabase = publicClient();
    const [{ data: rows }, { data: mediaRows }] = await Promise.all([
      supabase.from("projects").select("*").eq("published", true).order("sort_order"),
      supabase.from("project_media").select("*").order("sort_order"),
    ]);
    if (!rows) return [];
    return rows.map((r) => toProject(r, (mediaRows ?? []).filter((m) => m.project_id === r.id)));
  },
);

/** Public: one published project by slug. */
export const getPublicProject = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<CmsProject | null> => {
    const supabase = publicClient();
    const { data: row } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (!row) return null;
    const { data: mediaRows } = await supabase
      .from("project_media")
      .select("*")
      .eq("project_id", row.id)
      .order("sort_order");
    return toProject(row, mediaRows ?? []);
  });
