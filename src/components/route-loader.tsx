import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/**
 * Minimal fullscreen navigation loader. Appears only while the next route is
 * loading, with a short minimum visible time so it never flickers.
 */
export function RouteLoader() {
  const isPending = useRouterState({
    select: (s) => s.status === "pending" || s.isLoading,
  });
  const [visible, setVisible] = useState(false);
  const [slow, setSlow] = useState(false);
  const shownAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (slowTimer.current) clearTimeout(slowTimer.current);
    if (isPending) {
      shownAt.current = Date.now();
      setVisible(true);
      slowTimer.current = setTimeout(() => setSlow(true), 2000);
      return () => {
        if (slowTimer.current) clearTimeout(slowTimer.current);
      };
    }
    setSlow(false);
    if (!visible) return;
    const elapsed = Date.now() - shownAt.current;
    const wait = Math.max(0, 300 - elapsed);
    timer.current = setTimeout(() => setVisible(false), wait);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [isPending, visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="route-loader fixed inset-0 z-[100] grid place-items-center"
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src="/favicon.png"
          alt=""
          width={44}
          height={44}
          className="route-loader-logo h-11 w-11 rounded-xl object-contain"
        />
        <span className="route-loader-ring" />
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {slow ? "Preparing case study…" : "Loading"}
        </p>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
