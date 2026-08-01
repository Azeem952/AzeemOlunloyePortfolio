import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { deleteLibraryItem, listLibrary, renameLibraryItem, uploadFile } from "@/lib/admin-client";

export const Route = createFileRoute("/azeemadmin/media")({
  component: MediaAdmin,
});

type Item = Awaited<ReturnType<typeof listLibrary>>[number];

function MediaAdmin() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () =>
    listLibrary()
      .then(setItems)
      .catch((e) => toast.error(e.message ?? "Could not load media"))
      .finally(() => setLoading(false));

  useEffect(() => {
    void load();
  }, []);

  const onUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) await uploadFile(file);
      toast.success("Uploaded");
      void load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Media library</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            All uploaded files. URLs work on any host.
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
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-semibold text-ink-foreground disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload files"}
        </button>
      </header>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : !items.length ? (
        <p className="text-sm text-muted-foreground">Nothing uploaded yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m) => (
            <li key={m.id} className="rounded-xl border bg-background p-3">
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
                defaultValue={m.filename}
                onBlur={async (e) => {
                  if (e.target.value === m.filename) return;
                  await renameLibraryItem(m.id, e.target.value);
                  toast.success("Renamed");
                  void load();
                }}
              />
              <div className="mt-2 flex items-center justify-between text-xs">
                <button
                  type="button"
                  className="text-muted-foreground"
                  onClick={() => {
                    void navigator.clipboard.writeText(m.url);
                    toast.success("URL copied");
                  }}
                >
                  Copy URL
                </button>
                <button
                  type="button"
                  className="text-destructive"
                  onClick={async () => {
                    if (!confirm(`Delete ${m.filename}? Pages using it will break.`)) return;
                    await deleteLibraryItem(m.id, m.path);
                    toast.success("Deleted");
                    void load();
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
  );
}
