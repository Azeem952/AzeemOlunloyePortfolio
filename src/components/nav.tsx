import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
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
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-xl hairline-b"
          : "bg-transparent"
      }`}
    >
      <div className="container-page grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-20 md:grid-cols-[1fr_auto_1fr]">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-accent font-mono text-[11px] font-bold text-accent-foreground">
            AO
          </span>
          <span className="truncate">Azeem Olunloye</span>
        </Link>

        <nav className="hidden items-center gap-1 justify-self-center md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="link-underline mx-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{
                className: "text-foreground",
                "data-active": "true",
              }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden justify-self-end md:block">
          <Link
            to="/contact"
            className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-ink-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Start a project
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center justify-self-end rounded-full border md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute inset-x-0 top-0 h-px bg-foreground transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-px bg-foreground transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
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
                className="py-3 text-lg font-medium tracking-tight text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-gradient-accent font-medium text-accent-foreground"
            >
              Start a project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
