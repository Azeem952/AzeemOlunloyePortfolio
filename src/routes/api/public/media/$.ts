import { createFileRoute } from "@tanstack/react-router";

// Public, host-agnostic media endpoint. Streams files out of the private
// `media` bucket so uploaded images/videos work on any host (Lovable, Vercel,
// custom domain) without needing a public bucket or CDN-specific URL scheme.
export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        if (!path || path.includes("..")) {
          return new Response("Not found", { status: 404 });
        }

        // Publishable-key client (anon read policy on the `media` bucket) so
        // this works on any host without a service-role secret.
        const { publicClient } = await import("@/lib/cms.server");
        const client = publicClient();

        // Fast path: hand the browser a short-lived direct storage URL so the
        // file streams from storage (range requests, CDN caching) instead of
        // being buffered through this worker.
        const signed = await client.storage
          .from("media")
          .createSignedUrl(path, 60 * 60 * 24);
        if (signed.data?.signedUrl) {
          return new Response(null, {
            status: 302,
            headers: {
              location: signed.data.signedUrl,
              "cache-control": "public, max-age=3600",
            },
          });
        }

        const { data, error } = await client.storage.from("media").download(path);
        if (error || !data) {
          return new Response("Not found", { status: 404 });
        }



        const body = await data.arrayBuffer();
        const total = body.byteLength;
        const contentType = data.type || "application/octet-stream";
        const range = request.headers.get("range");

        // Range support so <video> can seek.
        if (range) {
          const match = /bytes=(\d*)-(\d*)/.exec(range);
          if (match) {
            const start = match[1] ? Number(match[1]) : 0;
            const end = match[2] ? Number(match[2]) : total - 1;
            if (start < total && end < total && start <= end) {
              return new Response(body.slice(start, end + 1), {
                status: 206,
                headers: {
                  "content-type": contentType,
                  "content-length": String(end - start + 1),
                  "content-range": `bytes ${start}-${end}/${total}`,
                  "accept-ranges": "bytes",
                  "cache-control": "public, max-age=31536000, immutable",
                },
              });
            }
          }
        }

        return new Response(body, {
          headers: {
            "content-type": contentType,
            "content-length": String(total),
            "accept-ranges": "bytes",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
