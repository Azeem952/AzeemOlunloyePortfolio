// One-off migration: pull existing CDN media into Cloud storage + seed the CMS tables.
import { media } from "../src/data/media";
import { projects } from "../src/data/projects";

const URL_BASE = process.env.SUPABASE_URL!;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const DEV = "http://localhost:8080";

const h = (extra: Record<string, string> = {}) => ({
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  ...extra,
});

const typeFor = (name: string) =>
  name.endsWith(".png") ? "image/png"
  : name.endsWith(".mp4") ? "video/mp4"
  : name.endsWith(".pdf") ? "application/pdf"
  : "image/jpeg";

const kindFor = (name: string) =>
  name.endsWith(".mp4") ? "video" : name.endsWith(".pdf") ? "pdf" : "image";

const map = new Map<string, string>();

async function migrateOne(cdnUrl: string) {
  if (map.has(cdnUrl)) return map.get(cdnUrl)!;
  const filename = cdnUrl.split("/").pop()!;
  const res = await fetch(DEV + cdnUrl);
  if (!res.ok) throw new Error(`download ${cdnUrl} -> ${res.status}`);
  const bytes = new Uint8Array(await res.arrayBuffer());
  const contentType = typeFor(filename);

  const up = await fetch(`${URL_BASE}/storage/v1/object/media/${filename}`, {
    method: "POST",
    headers: h({ "Content-Type": contentType, "x-upsert": "true" }),
    body: bytes,
  });
  if (!up.ok) throw new Error(`upload ${filename} -> ${up.status} ${await up.text()}`);

  const publicUrl = `/api/public/media/${filename}`;
  await fetch(`${URL_BASE}/rest/v1/media_library`, {
    method: "POST",
    headers: h({ "Content-Type": "application/json", Prefer: "resolution=merge-duplicates" }),
    body: JSON.stringify({
      path: filename,
      url: publicUrl,
      filename,
      content_type: contentType,
      size_bytes: bytes.byteLength,
      kind: kindFor(filename),
    }),
  });

  console.log("migrated", filename, bytes.byteLength);
  map.set(cdnUrl, publicUrl);
  return publicUrl;
}

async function main() {
  for (const url of Object.values(media)) await migrateOne(url);

  for (const [i, p] of projects.entries()) {
    const galleryUrls: { url: string; caption: string }[] = [];
    for (const g of p.gallery) {
      galleryUrls.push({ url: await migrateOne(g.src), caption: g.caption });
    }
    const videoUrl = p.video ? await migrateOne(p.video) : null;
    const coverUrl = await migrateOne(p.cover);

    const insert = await fetch(`${URL_BASE}/rest/v1/projects`, {
      method: "POST",
      headers: h({ "Content-Type": "application/json", Prefer: "return=representation,resolution=merge-duplicates" }),
      body: JSON.stringify({
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
        tags: [],
        cover_url: coverUrl,
        featured: i < 2,
        published: true,
        sort_order: i,
      }),
    });
    const text = await insert.text();
    if (!insert.ok) throw new Error(`project ${p.slug} -> ${insert.status} ${text}`);
    const row = JSON.parse(text)[0];

    const mediaRows = [
      ...(videoUrl
        ? [{ project_id: row.id, kind: "video", url: videoUrl, caption: `Recorded walkthrough — ${p.title}`, sort_order: 0 }]
        : []),
      ...galleryUrls.map((g, gi) => ({
        project_id: row.id,
        kind: "image",
        url: g.url,
        caption: g.caption,
        sort_order: gi + 1,
      })),
    ];
    const mres = await fetch(`${URL_BASE}/rest/v1/project_media`, {
      method: "POST",
      headers: h({ "Content-Type": "application/json" }),
      body: JSON.stringify(mediaRows),
    });
    if (!mres.ok) throw new Error(`media ${p.slug} -> ${mres.status} ${await mres.text()}`);
    console.log("seeded", p.slug, mediaRows.length, "media");
  }
  console.log("done");
}

main();
