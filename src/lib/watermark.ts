/**
 * Client-side watermarking for uploaded portfolio images.
 * Stamps the official logo bottom-right at low opacity, scaled to the image.
 */
const LOGO_SRC = "/favicon.png";
const OFFSET = 24;
const OPACITY = 0.1;

const WATERMARKABLE = /^image\/(png|jpe?g|webp)$/;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  });
}

export async function watermarkImage(file: File): Promise<File> {
  if (typeof document === "undefined") return file;
  if (!WATERMARKABLE.test(file.type)) return file;

  try {
    const [base, logo] = await Promise.all([
      loadImage(URL.createObjectURL(file)),
      loadImage(LOGO_SRC),
    ]);

    const canvas = document.createElement("canvas");
    canvas.width = base.naturalWidth;
    canvas.height = base.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(base, 0, 0);

    // Scale the mark to ~10% of the shorter edge, clamped for tiny/huge images.
    const shortEdge = Math.min(canvas.width, canvas.height);
    const target = Math.max(48, Math.min(180, shortEdge * 0.1));
    const ratio = logo.naturalWidth / logo.naturalHeight || 1;
    const w = ratio >= 1 ? target : target * ratio;
    const h = ratio >= 1 ? target / ratio : target;
    const scale = shortEdge / 800;
    const offset = Math.max(12, OFFSET * Math.min(2, Math.max(0.5, scale)));

    ctx.globalAlpha = OPACITY;
    ctx.drawImage(logo, canvas.width - w - offset, canvas.height - h - offset, w, h);
    ctx.globalAlpha = 1;

    const isPng = file.type === "image/png";
    const type = isPng ? "image/png" : "image/jpeg";
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, type, isPng ? undefined : 0.92),
    );
    if (!blob) return file;

    const name = file.name.replace(/\.(webp|jpe?g|png)$/i, isPng ? ".png" : ".jpg");
    return new File([blob], name, { type, lastModified: Date.now() });
  } catch {
    return file;
  }
}
