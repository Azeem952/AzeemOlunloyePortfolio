export type Service = {
  slug: string;
  name: string;
  brand: string;
  summary: string;
  bullets: string[];
  tools: string[];
};

export const services: Service[] = [
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    brand: "n8n",
    summary:
      "Repetitive multi-app processes rebuilt as reliable workflows that run on triggers, schedules or webhooks — with error handling and logging.",
    bullets: [
      "Process mapping and automation audit",
      "n8n / Make builds with retries and alerting",
      "Documented handover so your team can edit it",
    ],
    tools: ["n8n", "Make", "Zapier", "Airtable"],
  },
  {
    slug: "ai-agents",
    name: "AI Agents & Chatbots",
    brand: "OpenAI",
    summary:
      "Agents that answer, qualify and act — booking appointments, routing questions and updating your systems instead of just replying.",
    bullets: [
      "WhatsApp, web and Telegram assistants",
      "Tool-using agents with guardrails",
      "Human handoff when confidence is low",
    ],
    tools: ["OpenAI", "Claude", "Voiceflow", "WhatsApp"],
  },
  {
    slug: "crm-automation",
    name: "CRM Automation",
    brand: "HubSpot",
    summary:
      "Lead capture, enrichment, personalised follow-up sequences and pipeline hygiene that keep your CRM the single source of truth.",
    bullets: [
      "Automated multi-touch follow-up",
      "Reply detection that stops sequences",
      "Deal-stage and property automation",
    ],
    tools: ["HubSpot", "Salesforce", "Gmail", "Airtable"],
  },
  {
    slug: "system-integration",
    name: "System Integration",
    brand: "Zapier",
    summary:
      "APIs, webhooks and databases wired together so data moves once, correctly, without anybody copying it between tabs.",
    bullets: [
      "REST/webhook integrations and middleware",
      "Data sync with deduplication",
      "Auth, rate limits and failure recovery",
    ],
    tools: ["Zapier", "Supabase", "Postgres", "Stripe"],
  },
  {
    slug: "document-processing",
    name: "Document & Data Processing",
    brand: "Google Sheets",
    summary:
      "OCR and LLM extraction pipelines that turn receipts, invoices and forms into structured, validated rows in seconds.",
    bullets: [
      "Vision OCR with strict JSON schemas",
      "Confidence checks and retry prompts",
      "Filing to Sheets, Drive or your database",
    ],
    tools: ["OpenAI", "Google Sheets", "Google Drive", "n8n"],
  },
  {
    slug: "lead-generation",
    name: "Lead Generation Automation",
    brand: "LinkedIn",
    summary:
      "Scouting, enrichment and outreach systems that build qualified lists and start conversations while you sleep.",
    bullets: [
      "Scraping and enrichment pipelines",
      "Personalised cold outreach at scale",
      "Reply routing straight into your CRM",
    ],
    tools: ["Apify", "Hunter.io", "Instantly", "HubSpot"],
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Discover",
    detail:
      "A short call plus a look at how the work happens today. I map the steps, the tools and the hours being lost.",
  },
  {
    n: "02",
    title: "Design",
    detail:
      "You get an architecture: triggers, data flow, failure modes, and exactly what the automation will and won't decide.",
  },
  {
    n: "03",
    title: "Build",
    detail:
      "I build in short cycles with real data, so you see the system working on your own workflows, not a demo.",
  },
  {
    n: "04",
    title: "Handover",
    detail:
      "Documentation, a walkthrough recording and monitoring — plus a support window so nothing breaks quietly.",
  },
];

export const stack = [
  "n8n",
  "Make",
  "Zapier",
  "OpenAI",
  "Claude",
  "HubSpot",
  "Airtable",
  "Google Sheets",
  "Google Drive",
  "Gmail",
  "Slack",
  "Telegram",
  "WhatsApp",
  "Twilio",
  "Supabase",
  "Stripe",
  "Notion",
  "TradingView",
];
