import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="hairline-t mt-32">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl leading-tight text-balance">
              Have a workflow that eats your week?
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
            >
              Start a project →
            </Link>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Site</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://wa.me/2348138602053"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/azeem-olunloye-42177141b"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Based</p>
            <p className="text-sm">Remote · working globally</p>
            <p className="mt-2 text-sm text-muted-foreground">Available for new projects</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Azeem Olunloye. All rights reserved.</p>
          <p className="font-mono">AI Automation Engineer</p>
        </div>
      </div>
    </footer>
  );
}
