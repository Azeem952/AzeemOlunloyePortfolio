import { Link } from "@tanstack/react-router";

export const EMAIL = "azeemolunloye@gmail.com";
export const WHATSAPP = "https://wa.me/2348138602053";
export const LINKEDIN = "https://www.linkedin.com/in/azeem-olunloye-42177141b";

export function Footer() {
  return (
    <footer className="hairline-t mt-32 bg-muted">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl leading-[1.1] tracking-tight text-balance md:text-4xl">
              Have a workflow that <span className="text-gradient">eats your week</span>?
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-ink-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              Start a project
            </Link>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Site
            </p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="link-underline">Home</Link></li>
              <li><Link to="/about" className="link-underline">About</Link></li>
              <li><Link to="/portfolio" className="link-underline">Work</Link></li>
              <li><Link to="/contact" className="link-underline">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${EMAIL}`} className="link-underline break-all">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="link-underline">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="link-underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Availability
            </p>
            <p className="text-sm">Remote · working globally</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              Open for new projects
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Azeem Olunloye. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">AI Automation Engineer</p>
        </div>
      </div>
    </footer>
  );
}
