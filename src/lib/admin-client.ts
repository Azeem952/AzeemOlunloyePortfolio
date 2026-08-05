import { supabase } from "@/integrations/supabase/client";
import type { CmsProject, ProjectInput } from "./cms-types";
import { toClientProject } from "./cms-map";
import { watermarkImage } from "./watermark";

export const ADMIN_EMAIL = "azeemolunloye@gmail.com";

export function mediaKindFor(file: File): "image" | "video" | "pdf" | "doc" {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (file.type === "application/pdf") return "pdf";
  return "doc";
}

export function safeName(name: string) {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${Date.now()}-${cleaned || "file"}`;
}

const MAX_BYTES = 200 * 1024 * 1024;
const ALLOWED = /^(image\/(png|jpe?g|gif|webp|avif|svg\+xml)|video\/(mp4|webm|quicktime)|application\/pdf|application\/json|text\/plain)$/;

/** Uploads a file to Cloud storage and records it in the media library. */
export async function uploadFile(original: File) {
  if (original.size > MAX_BYTES) throw new Error(`${original.name} is larger than 200 MB.`);
  if (original.type && !ALLOWED.test(original.type)) {
    throw new Error(`${original.name}: unsupported file type (${original.type}).`);
  }
  // Every uploaded image gets the official logo watermarked bottom-right.
  const file = await watermarkImage(original);
  const path = safeName(file.name);
  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });
  if (error) throw error;

  const url = `/api/public/media/${path}`;
  const kind = mediaKindFor(file);
  const { error: dbError } = await supabase.from("media_library").insert({
    path,
    url,
    filename: file.name,
    content_type: file.type || "",
    size_bytes: file.size,
    kind,
  });
  if (dbError) throw dbError;
  return { url, kind, filename: file.name, path };
}

export async function listAdminProjects(): Promise<CmsProject[]> {
  const [{ data: rows, error }, { data: mediaRows }] = await Promise.all([
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("project_media").select("*").order("sort_order"),
  ]);
  if (error) throw error;
  return (rows ?? []).map((r) =>
    toClientProject(r, (mediaRows ?? []).filter((m) => m.project_id === r.id)),
  );
}

export async function getAdminProject(id: string): Promise<CmsProject | null> {
  const { data: row, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!row) return null;
  const { data: mediaRows } = await supabase
    .from("project_media")
    .select("*")
    .eq("project_id", id)
    .order("sort_order");
  return toClientProject(row, mediaRows ?? []);
}

function payload(input: ProjectInput) {
  return {
    slug: input.slug,
    title: input.title,
    tagline: input.tagline,
    category: input.category,
    categories: input.categories,
    year: input.year,
    client: input.client,
    duration: input.duration,
    role: input.role,
    overview: input.overview,
    problem: input.problem,
    solution: input.solution,
    architecture: input.architecture,
    workflow: input.workflow,
    tools: input.tools,
    features: input.features,
    outcome: input.outcome,
    tags: input.tags,
    featured: input.featured,
    published: input.published,
  };
}

export async function createProject(input: ProjectInput) {
  const { data: last } = await supabase
    .from("projects")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const { data, error } = await supabase
    .from("projects")
    .insert({ ...payload(input), sort_order: (last?.sort_order ?? -1) + 1 })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function updateProject(id: string, input: ProjectInput) {
  const { error } = await supabase.from("projects").update(payload(input)).eq("id", id);
  if (error) throw error;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function duplicateProject(id: string) {
  const source = await getAdminProject(id);
  if (!source) throw new Error("Project not found");
  const newId = await createProject({
    slug: `${source.slug}-copy-${Math.floor(Math.random() * 1000)}`,
    title: `${source.title} (copy)`,
    tagline: source.tagline,
    category: source.category,
    categories: source.categories,
    year: source.year,
    client: source.client,
    duration: source.duration,
    role: source.role,
    overview: source.overview,
    problem: source.problem,
    solution: source.solution,
    architecture: source.architecture,
    workflow: source.workflow,
    tools: source.tools,
    features: source.features,
    outcome: source.outcome,
    tags: source.tags,
    featured: false,
    published: false,
  });
  if (source.media.length) {
    const { error } = await supabase.from("project_media").insert(
      source.media.map((m, i) => ({
        project_id: newId,
        kind: m.kind,
        url: m.url,
        caption: m.caption,
        sort_order: i,
      })),
    );
    if (error) throw error;
  }
  return newId;
}

export async function setPublished(id: string, published: boolean) {
  const { error } = await supabase.from("projects").update({ published }).eq("id", id);
  if (error) throw error;
}

export async function reorderProjects(ids: string[]) {
  await Promise.all(
    ids.map((id, i) => supabase.from("projects").update({ sort_order: i }).eq("id", id)),
  );
}

export async function addProjectMedia(
  projectId: string,
  items: { url: string; kind: string; caption: string }[],
  startAt: number,
) {
  const { error } = await supabase.from("project_media").insert(
    items.map((m, i) => ({
      project_id: projectId,
      kind: m.kind,
      url: m.url,
      caption: m.caption,
      sort_order: startAt + i,
    })),
  );
  if (error) throw error;
}

export async function updateMediaCaption(id: string, caption: string) {
  const { error } = await supabase.from("project_media").update({ caption }).eq("id", id);
  if (error) throw error;
}

export async function deleteMedia(id: string) {
  const { error } = await supabase.from("project_media").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderMedia(ids: string[]) {
  await Promise.all(
    ids.map((id, i) => supabase.from("project_media").update({ sort_order: i }).eq("id", id)),
  );
}

export async function listLibrary() {
  const { data, error } = await supabase
    .from("media_library")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function renameLibraryItem(id: string, filename: string) {
  const { error } = await supabase.from("media_library").update({ filename }).eq("id", id);
  if (error) throw error;
}

export async function deleteLibraryItem(id: string, path: string) {
  await supabase.storage.from("media").remove([path]);
  const { error } = await supabase.from("media_library").delete().eq("id", id);
  if (error) throw error;
}
