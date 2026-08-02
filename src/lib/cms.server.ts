import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { CmsProject } from "./cms-types";
import { toClientProject } from "./cms-map";
import { supabaseEnv } from "./supabase-env";

/** Publishable-key client for public reads (RLS applies as anon). */
export function publicClient() {
  const { url, key } = supabaseEnv();
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
  const supabase = publicClient();
  const [{ data: rows }, { data: mediaRows }] = await Promise.all([
    supabase.from("projects").select("*").eq("published", true).order("sort_order"),
    supabase.from("project_media").select("*").order("sort_order"),
  ]);
  if (!rows) return [];
  return rows.map((r) => toProject(r, (mediaRows ?? []).filter((m) => m.project_id === r.id)));
}

export async function fetchPublicProject(slug: string): Promise<CmsProject | null> {
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
}
