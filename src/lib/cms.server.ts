import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { CmsProject, CmsMedia } from "./cms-types";
import { toClientProject } from "./cms-map";
import { supabaseEnv } from "./supabase-env";
import { projects, type Project } from "@/data/projects";

/** Convert a static project from src/data/projects.ts into a CmsProject */
function mapStaticProject(p: Project, index: number): CmsProject {
  const mediaList: CmsMedia[] = (p.gallery ?? []).map((g, i) => ({
    id: `media-${p.slug}-${i}`,
    kind: "image",
    url: g.src,
    caption: g.caption,
    sortOrder: i,
  }));
  if (p.video) {
    mediaList.push({
      id: `media-${p.slug}-video`,
      kind: "video",
      url: p.video,
      caption: "Walkthrough video",
      sortOrder: mediaList.length,
    });
  }

  return {
    ...p,
    id: `project-${p.slug}`,
    published: true,
    featured: true,
    sortOrder: index,
    tags: p.categories?.length ? p.categories : [p.category],
    media: mediaList,
    updatedAt: "2026-03-01T00:00:00Z",
  };
}

export const staticProjects: CmsProject[] = projects.map(mapStaticProject);

/** Publishable-key client for public reads (RLS applies as anon). Returns null if not configured. */
export function publicClient() {
  const env = supabaseEnv();
  if (!env) return null;
  const { url, key } = env;

  return createClient<Database>(url, key, {
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

export const toProject = toClientProject;

export async function fetchPublicProjects(): Promise<CmsProject[]> {
  try {
    const client = publicClient();
    if (!client) return staticProjects;

    const [{ data: rows }, { data: mediaRows }] = await Promise.all([
      client.from("projects").select("*").eq("published", true).order("sort_order"),
      client.from("project_media").select("*").order("sort_order"),
    ]);

    if (!rows || rows.length === 0) return staticProjects;
    return rows.map((r) => toProject(r, (mediaRows ?? []).filter((m) => m.project_id === r.id)));
  } catch (err) {
    console.warn("Supabase fetch failed or not configured, serving static projects:", err);
    return staticProjects;
  }
}

export async function fetchPublicProject(slug: string): Promise<CmsProject | null> {
  try {
    const client = publicClient();
    if (!client) {
      return staticProjects.find((p) => p.slug === slug) ?? null;
    }

    const { data: row } = await client
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (!row) {
      return staticProjects.find((p) => p.slug === slug) ?? null;
    }

    const { data: mediaRows } = await client
      .from("project_media")
      .select("*")
      .eq("project_id", row.id)
      .order("sort_order");

    return toProject(row, mediaRows ?? []);
  } catch (err) {
    console.warn("Supabase fetch failed or not configured, serving static project:", err);
    return staticProjects.find((p) => p.slug === slug) ?? null;
  }
}
