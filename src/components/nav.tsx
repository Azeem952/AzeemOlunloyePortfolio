import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Work" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
        scrolled ? "hairline-b shadow-card" : "hairline-b"
      }`}
    >
      <div className="container-page grid h-[72px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-[88px] md:grid-cols-[auto_1fr_auto]">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/favicon.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-xl object-contain"
          />
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-extrabold tracking-tight">
              Azeem Olunloye
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              AI Automation Engineer
            </span>
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            disabled
            title="Resume coming soon"
            className="inline-flex h-11 cursor-not-allowed items-center rounded-xl border px-5 text-sm font-bold text-muted-foreground"
          >
            Resume
          </button>
          <Link
            to="/contact"
            className="inline-flex h-11 items-center rounded-xl bg-accent px-5 text-sm font-bold text-accent-foreground shadow-green transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-2"
          >
            Let's talk
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center justify-self-end rounded-xl border md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute inset-x-0 top-0 h-0.5 rounded bg-foreground transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 rounded bg-foreground transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="hairline-t bg-background md:hidden">
          <nav className="container-page flex flex-col py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-bold tracking-tight"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-12 items-center justify-center rounded-xl bg-accent font-bold text-accent-foreground shadow-green"
            >
              Let's talk
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
