import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { useState } from "react";

export const EMAIL = "azeemolunloye@gmail.com";
export const PHONE = "+234 813 860 2053";
export const WHATSAPP = "https://wa.me/2348138602053";
export const LINKEDIN = "https://www.linkedin.com/in/azeem-olunloye-42177141b";
export const GITHUB = "https://github.com/Azeem952";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#121214] text-white pt-16 pb-12 rounded-t-[36px] md:rounded-t-[52px] border-t border-white/10 mt-16 sm:mt-24">
      <div className="container-page">
        {/* Top Banner Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Lets Connect there
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF5E1E] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,94,30,0.4)] transition-transform duration-300 hover:scale-105 hover:bg-[#E54D12]"
          >
            <span>Hire me</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12 border-b border-white/10">
          {/* Col 1: Bio & Logo */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5E1E] text-white font-black text-base shadow-[0_0_14px_rgba(255,94,30,0.5)]">
                ✦
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight">
                Azeem
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60 max-w-sm">
              I design and ship AI automation systems that remove manual work —
              autonomous agents, CRM sequences, document intake and multi-app integrations
              that run reliably without supervision.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#FF5E1E] hover:text-white hover:border-[#FF5E1E] transition-all"
              >
                <span className="font-bold text-xs">in</span>
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#FF5E1E] hover:text-white hover:border-[#FF5E1E] transition-all"
              >
                <span className="font-bold text-xs">wa</span>
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#FF5E1E] hover:text-white hover:border-[#FF5E1E] transition-all"
              >
                <span className="font-bold text-xs">gh</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#FF5E1E] hover:text-white hover:border-[#FF5E1E] transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF5E1E] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF5E1E] mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors break-all">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  {PHONE}
                </a>
              </li>
              <li className="text-white/50 pt-1">
                Remote · Worldwide Client Availability
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Inquiries */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF5E1E] mb-4">
              Get in touch
            </h3>
            <p className="text-xs text-white/60 mb-3">
              Drop your email to discuss automation requirements for your team.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="Enter Email Address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full rounded-full border border-white/15 bg-white/5 py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-white/40 focus:border-[#FF5E1E] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5E1E] text-white hover:bg-[#E54D12] transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-green-400">
                Thanks! Azeem will be in touch shortly.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Azeem Olunloye. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white/80 cursor-pointer">Terms and Conditions</span>
            <span>·</span>
            <span className="hover:text-white/80 cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
