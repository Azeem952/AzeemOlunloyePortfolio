import { Link } from "@tanstack/react-router";

export const EMAIL = "azeemolunloye@gmail.com";
export const PHONE = "+234 813 860 2053";
export const WHATSAPP = "https://wa.me/2348138602053";
export const LINKEDIN = "https://www.linkedin.com/in/azeem-olunloye-42177141b";

export function Footer() {
  return (
    <footer className="hairline-t bg-muted">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/favicon.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl object-contain"
              />
              <div>
                <p className="text-[15px] font-extrabold tracking-tight">
                  Azeem Olunloye
                </p>
                <p className="text-xs text-muted-foreground">
                  AI Automation Engineer
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              I design and ship AI automation systems that remove manual work —
              agents, CRM sequences, document intake and integrations that run
              without supervision.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-extrabold">Pages</p>
            <ul className="space-y-2.5 text-[15px] text-muted-foreground">
              <li><Link to="/" className="hover:text-accent">Home</Link></li>
              <li><Link to="/about" className="hover:text-accent">About</Link></li>
              <li><Link to="/services" className="hover:text-accent">Services</Link></li>
              <li>
                <Link
                  to="/services"
                  hash="faq"
                  className="hover:text-accent"
                  onClick={() => {
                    if (window.location.pathname === "/services") {
                      document
                        .getElementById("faq")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  FAQ
                </Link>
              </li>
              <li><Link to="/portfolio" className="hover:text-accent">Work</Link></li>

              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-extrabold">Contact</p>
            <ul className="space-y-2.5 text-[15px] text-muted-foreground">
              <li>
                <a href={`mailto:${EMAIL}`} className="break-all hover:text-accent">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-accent">
                  WhatsApp — {PHONE}
                </a>
              </li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-accent">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-extrabold">Availability</p>
            <p className="text-[15px] text-muted-foreground">Remote · working globally</p>
            <p className="mt-2 inline-flex items-center gap-2 text-[15px] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Open for new projects
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex h-12 items-center rounded-xl bg-accent px-6 text-sm font-bold text-accent-foreground shadow-green transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-2"
            >
              Start a project
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Azeem Olunloye. All rights reserved.</p>
          <p>Built and automated in-house.</p>
        </div>
      </div>
    </footer>
  );
}
