import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const RESUME_URL = "/api/public/media/azeem-olunloye-resume.pdf";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex w-full justify-center px-4 pt-4 sm:pt-6 transition-all duration-300">
      <div
        className={`flex w-full max-w-4xl items-center justify-between rounded-full border border-white/15 bg-[#141416]/95 px-3 py-2 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "scale-[0.98] bg-[#141416]/98 shadow-black/40" : ""
        }`}
      >
        {/* Left Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
              currentPath === "/"
                ? "bg-[#FF5E1E] text-white shadow-[0_2px_12px_rgba(255,94,30,0.4)]"
                : "text-white/70 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hidden sm:inline-flex rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors ${
              currentPath === "/about"
                ? "bg-white/15 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            About
          </Link>
          <Link
            to="/services"
            className={`hidden sm:inline-flex rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors ${
              currentPath === "/services"
                ? "bg-white/15 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Service
          </Link>
        </div>

        {/* Center Logo */}
        <Link to="/" className="flex items-center gap-2 px-2 hover:opacity-90 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5E1E] text-white font-black text-sm shadow-[0_0_14px_rgba(255,94,30,0.5)]">
            <span className="translate-y-[-0.5px]">✦</span>
          </div>
          <span className="font-display font-extrabold tracking-tight text-sm sm:text-base text-white">
            Azeem
          </span>
        </Link>

        {/* Right Links */}
        <div className="hidden sm:flex items-center gap-1 sm:gap-2">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            download="Azeem-Olunloye-Resume.pdf"
            className="rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            Resume
          </a>
          <Link
            to="/portfolio"
            className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors ${
              currentPath.startsWith("/portfolio")
                ? "bg-white/15 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Project
          </Link>
          <Link
            to="/contact"
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
              currentPath === "/contact"
                ? "bg-[#FF5E1E] text-white shadow-[0_2px_12px_rgba(255,94,30,0.4)]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            to="/contact"
            className="rounded-full bg-[#FF5E1E] px-3 py-1.5 text-xs font-semibold text-white"
          >
            Contact
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white"
          >
            <span className="relative block h-2.5 w-3.5">
              <span
                className={`absolute inset-x-0 top-0 h-0.5 rounded bg-white transition-transform duration-300 ${
                  open ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 rounded bg-white transition-transform duration-300 ${
                  open ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="absolute top-16 left-4 right-4 z-50 rounded-3xl border border-white/15 bg-[#141416]/98 p-5 text-white shadow-2xl backdrop-blur-xl sm:hidden animate-in fade-in zoom-in-95 duration-200">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold ${
                currentPath === "/" ? "bg-[#FF5E1E] text-white" : "text-white/80 hover:bg-white/10"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold ${
                currentPath === "/about" ? "bg-[#FF5E1E] text-white" : "text-white/80 hover:bg-white/10"
              }`}
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold ${
                currentPath === "/services" ? "bg-[#FF5E1E] text-white" : "text-white/80 hover:bg-white/10"
              }`}
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold ${
                currentPath.startsWith("/portfolio") ? "bg-[#FF5E1E] text-white" : "text-white/80 hover:bg-white/10"
              }`}
            >
              Projects
            </Link>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              download="Azeem-Olunloye-Resume.pdf"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-white/80 hover:bg-white/10"
            >
              Resume
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-[#FF5E1E] font-bold text-white shadow-[0_4px_16px_rgba(255,94,30,0.4)]"
            >
              Let's talk
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
