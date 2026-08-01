import type { Database } from "@/integrations/supabase/types";
import type { CmsProject } from "./cms-types";

type Row = Database["public"]["Tables"]["projects"]["Row"];
type MediaRow = Database["public"]["Tables"]["project_media"]["Row"];

/** Browser-safe mapping from database rows to the shape the site renders. */
export function toClientProject(row: Row, mediaRows: MediaRow[]): CmsProject {
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
    updatedAt: row.updated_at,
    media: sorted.map((m) => ({
      id: m.id,
      kind: m.kind,
      url: m.url,
      caption: m.caption,
      sortOrder: m.sort_order,
    })),
  };
}
