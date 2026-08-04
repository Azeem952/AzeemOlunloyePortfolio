import { useEffect, useState } from "react";

const WA_LINK =
  "https://wa.me/2348138602053?text=Hi%20Azeem%2C%20I%27d%20like%20to%20talk%20about%20automation.";

export function WhatsAppWidget() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-500 md:bottom-10 md:right-8 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {open && (
        <div className="w-64 rounded-2xl border bg-surface p-4 shadow-lift">
          <p className="font-display text-sm tracking-tight">Chat with Azeem</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Tell me what you'd like automated — I usually reply the same day.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full bg-ink px-4 text-xs font-semibold text-ink-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            Open WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        aria-expanded={open}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-105"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25"
        />
        {open ? (
          <span className="relative text-xl leading-none">✕</span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="relative h-7 w-7 fill-current"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.15 8.15 0 0 1-1.25-4.35c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.2-8.24 8.2Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
