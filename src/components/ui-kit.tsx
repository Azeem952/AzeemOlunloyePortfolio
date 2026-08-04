import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Official brand marks, sourced from each company's own favicon. */
export const brandDomains: Record<string, string> = {
  n8n: "n8n.io",
  Make: "make.com",
  "Make.com": "make.com",
  Zapier: "zapier.com",
  OpenAI: "openai.com",
  "OpenAI GPT-4": "openai.com",
  ChatGPT: "openai.com",
  Claude: "claude.ai",
  Anthropic: "anthropic.com",
  Gemini: "gemini.google.com",
  HubSpot: "hubspot.com",
  Salesforce: "salesforce.com",
  Airtable: "airtable.com",
  Notion: "notion.so",
  Slack: "slack.com",
  Gmail: "gmail.com",
  "Gmail API": "gmail.com",
  "Google Sheets": "sheets.google.com",
  "Google Drive": "drive.google.com",
  "Google Calendar": "calendar.google.com",
  "Google Workspace": "workspace.google.com",
  Telegram: "telegram.org",
  WhatsApp: "whatsapp.com",
  Twilio: "twilio.com",
  Stripe: "stripe.com",
  Supabase: "supabase.com",
  LinkedIn: "linkedin.com",
  TradingView: "tradingview.com",
  Voiceflow: "voiceflow.com",
  ElevenLabs: "elevenlabs.io",
  Apify: "apify.com",
  "Green API": "green-api.com",
  Pinecone: "pinecone.io",
  Postgres: "postgresql.org",
  PostgreSQL: "postgresql.org",
  Calendly: "calendly.com",
  Instantly: "instantly.ai",
  "Hunter.io": "hunter.io",
  Shopify: "shopify.com",
  Vercel: "vercel.com",
  JavaScript: "developer.mozilla.org",
};

export function brandIcon(name: string) {
  const domain = brandDomains[name];
  return domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : null;
}

/** A single official logo chip: brand mark + wordmark. */
export function TechLogo({
  name,
  size = 28,
  className,
  showName = true,
}: {
  name: string;
  size?: number;
  className?: string;
  showName?: boolean;
}) {
  const src = brandIcon(name);
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {src ? (
        <img
          src={src}
          alt={`${name} logo`}
          width={size}
          height={size}
          loading="lazy"
          style={{ width: size, height: size }}
          className="shrink-0 rounded-[6px] object-contain"
        />
      ) : null}
      {showName && (
        <span className="whitespace-nowrap text-[15px] font-semibold text-foreground">
          {name}
        </span>
      )}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-muted px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

const btnBase =
  "inline-flex h-14 items-center justify-center gap-2 rounded-xl px-7 text-[15px] font-bold transition-all duration-300";

export function PrimaryLink({
  to,
  href,
  children,
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const cls = cn(
    btnBase,
    "bg-accent text-accent-foreground shadow-green hover:-translate-y-0.5 hover:bg-accent-2",
    className,
  );
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  return (
    <Link to={to ?? "/contact"} className={cls}>
      {children}
    </Link>
  );
}

export function GhostLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        btnBase,
        "border bg-background text-foreground hover:-translate-y-0.5 hover:border-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Hexagon-framed portrait used across Home, About and Contact. */
export function HexPortrait({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[420px]", className)}>
      <div
        aria-hidden
        className="hexagon absolute -inset-3 bg-gradient-accent opacity-90"
      />
      <div className="hexagon relative aspect-[1/1.08] w-full overflow-hidden bg-muted">
        <img
          src={src}
          alt={alt}
          width={420}
          height={454}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          {...(priority ? { fetchPriority: "high" as const } : {})}
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}

export function StatBlock({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-extrabold tracking-tight text-accent md:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

/** Dark call-to-action band that closes every page. */
export function CtaBand({
  title = "Ready to automate the work that slows you down?",
  body = "Tell me the workflow that eats your week. I'll map it, build it, and hand it over documented — usually in one to four weeks.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="container-page pb-20 md:pb-28">
      <div className="bg-gradient-ink overflow-hidden rounded-[24px] px-6 py-16 text-center md:px-16 md:py-24">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink-foreground text-balance md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-foreground/70 md:text-lg">
          {body}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <PrimaryLink to="/contact">Start a project →</PrimaryLink>
          <Link
            to="/portfolio"
            className={cn(
              btnBase,
              "border border-white/20 bg-white/5 text-ink-foreground hover:bg-white/10",
            )}
          >
            View my work
          </Link>
        </div>
      </div>
    </section>
  );
}
