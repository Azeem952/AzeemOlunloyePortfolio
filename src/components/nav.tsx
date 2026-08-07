import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const RESUME_URL = "/api/public/media/azeem-olunloye-resume.pdf";

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
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-200 ${
        scrolled
          ? "hairline-b bg-background/85 shadow-card backdrop-blur-xl"
          : "hairline-b bg-background"
      }`}
    >
      <div
        className={`container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 transition-[height] duration-200 md:grid-cols-[auto_1fr_auto] ${
          scrolled ? "h-[68px] md:h-[76px]" : "h-[72px] md:h-[88px]"
        }`}
      >
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
              className="nav-link relative text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            download="Azeem-Olunloye-Resume.pdf"
            className="inline-flex h-11 items-center rounded-xl border px-5 text-sm font-bold text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            Resume
          </a>
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
        <div className="menu-in hairline-t bg-background md:hidden">
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
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              download="Azeem-Olunloye-Resume.pdf"
              onClick={() => setOpen(false)}
              className="py-3 text-lg font-bold tracking-tight"
            >
              Resume
            </a>
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
