import { media } from "./media";

export type Project = {

  slug: string;
  title: string;
  tagline: string;
  category: string;
  categories: string[];
  year: string;
  client: string;
  duration: string;
  role: string;
  cover: string;
  accent: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  workflow: { step: string; detail: string }[];
  tools: string[];
  features: string[];
  outcome: { metric: string; label: string }[];
  gallery: { src: string; caption: string }[];

  video?: string;
};


export const projects: Project[] = [
  {
    slug: "hubspot-ai-crm-followup",
    title: "AI CRM Follow-Up Sequence",
    tagline:
      "A HubSpot-native lead nurturing engine that writes, sends and adapts follow-ups without a human in the loop.",
    category: "CRM Automation",
    categories: ["CRM Automation", "AI Agents", "n8n", "Lead Generation"],
    year: "2026",
    client: "Real-estate agency (private)",
    duration: "3 weeks",
    role: "AI Automation Engineer — architecture, prompt design, delivery",
    cover: media.crmWorkflow,
    accent: "oklch(0.62 0.16 34)",
    overview:
      "Sales reps were losing warm leads because manual follow-up was inconsistent. I built a workflow that watches HubSpot for new contacts and lifecycle changes, generates a personalised sequence with an LLM, sends the emails on cadence, and stops the moment a lead replies.",
    problem:
      "The team booked ads and captured contacts in HubSpot, but only 30% of leads received a second touch. Reps were copy-pasting templates and forgetting to pause sequences when someone replied — creating a bad experience and killing deals.",
    solution:
      "A single n8n workflow acts as the follow-up brain. It subscribes to HubSpot webhooks, classifies the event, drafts contextual emails with OpenAI, sends them through Gmail on a 3-4-7 day cadence, checks the inbox before each send, and writes state back to the contact record so reps see everything in HubSpot.",
    architecture: [
      "HubSpot private app publishes contact.creation and contact.propertyChange events to an n8n webhook.",
      "A parser normalises the payload and routes on event type.",
      "OpenAI generates the initial email plus two follow-ups, each grounded in the contact's stage and source.",
      "Gmail sends the message; n8n polls for replies before every scheduled follow-up.",
      "HubSpot is updated with the sequence stage and reply status so the CRM stays the source of truth.",
    ],
    workflow: [
      { step: "Trigger", detail: "HubSpot webhook fires on new contact or lifecycle stage change." },
      { step: "Enrich", detail: "Fetch the full contact via HubSpot API and check for a valid email." },
      { step: "Generate", detail: "OpenAI drafts an initial email using the contact's name, source and stage." },
      { step: "Send + Wait", detail: "Gmail delivers the email; the workflow waits 3 days." },
      { step: "Reply guard", detail: "Search Gmail threads for a reply; branch to notify the agent if found." },
      { step: "Follow-up 1 & 2", detail: "Generate and send two more contextual follow-ups on days 4 and 7." },
      { step: "Close", detail: "Mark the contact as replied or no-reply and stop the sequence." },
    ],
    tools: ["n8n", "HubSpot", "OpenAI GPT-4", "Gmail API", "Webhooks", "JavaScript"],
    features: [
      "Zero-touch follow-up for every new HubSpot contact",
      "Reply detection — sequences stop automatically",
      "Personalised copy per lead, not templated blasts",
      "Full audit trail written back to HubSpot",
      "Agent notifications on replies via Gmail",
    ],
    outcome: [
      { metric: "100%", label: "of new leads receive follow-up" },
      { metric: "3→7 days", label: "adaptive cadence per lead" },
      { metric: "0", label: "manual sends per week" },
    ],
    gallery: [
      { src: media.crmWebhook, caption: "HubSpot private app webhook — contact.creation & propertyChange subscriptions." },
      { src: media.crmWorkflow, caption: "n8n orchestration: parse → generate → send → wait → reply guard → repeat." },
      { src: media.crmEmail, caption: "Sample follow-up email generated and delivered by the workflow." },
      { src: media.crmContacts, caption: "HubSpot contacts list kept in sync as the source of truth." },
    ],
  },
  {
    slug: "receipt-ocr-whatsapp",
    title: "Receipt Processing with AI OCR",
    tagline:
      "Snap a receipt in WhatsApp — get a filed record, an itemised row in Sheets and a backup in Drive in under a minute.",
    category: "AI Agents",
    categories: ["AI Agents", "n8n", "Integrations", "Workflow Automation"],
    year: "2026",
    client: "SMB operations team",
    duration: "2 weeks",
    role: "AI Automation Engineer — end-to-end build",
    cover: media.receiptWorkflow,
    accent: "oklch(0.62 0.16 34)",
    overview:
      "Bookkeeping was drowning in phone photos of receipts. I built a WhatsApp-first pipeline that ingests images through Green API, runs OCR with a vision LLM, validates the extraction, dedupes against previous filings and writes the result to Sheets and Drive.",
    problem:
      "Staff were forwarding receipts in WhatsApp groups. Someone had to download each image, type the amount into a spreadsheet, re-upload to Drive and reply to confirm. Duplicates and typos were routine.",
    solution:
      "A single n8n workflow owns the loop. WhatsApp images arrive via Green API webhook, get deduped by message ID, are converted to base64 and sent to an OpenAI vision model with a strict JSON schema. Confident extractions are logged to Sheets, filed in Drive, and confirmed back to the sender.",
    architecture: [
      "Green API webhook receives WhatsApp media events.",
      "Dedup layer skips repeat message IDs and non-image content.",
      "Image is downloaded, base64-encoded and sent to OpenAI with a validation prompt.",
      "Parsed JSON is checked for confidence; low-confidence receipts trigger a user-friendly retry message.",
      "Confident rows are appended to Google Sheets and the file is uploaded to Google Drive.",
      "Success or failure confirmation is sent back through Green API.",
    ],
    workflow: [
      { step: "Ingest", detail: "Green API webhook fires on incoming WhatsApp media." },
      { step: "Dedupe", detail: "Skip if the message ID has already been processed." },
      { step: "Download", detail: "Fetch the image and encode to base64." },
      { step: "OCR", detail: "OpenAI extracts vendor, date, total and line items with a strict schema." },
      { step: "Validate", detail: "Reject low-confidence results; ask the user for a clearer shot." },
      { step: "File", detail: "Append to Sheets; upload to Drive; branch on either failure." },
      { step: "Confirm", detail: "Reply on WhatsApp with the parsed total and a link." },
    ],
    tools: ["n8n", "Green API (WhatsApp)", "OpenAI Vision", "Google Sheets", "Google Drive", "Webhooks"],
    features: [
      "WhatsApp-native — no app to install",
      "Automatic dedupe against previous submissions",
      "Confidence-gated OCR with polite retry",
      "Two-way confirmation back to the sender",
      "Sheets + Drive as system of record",
    ],
    outcome: [
      { metric: "< 60s", label: "receipt to filed row" },
      { metric: "0", label: "manual data entry" },
      { metric: "2 clicks", label: "for the person submitting" },
    ],
    gallery: [
      { src: media.receiptWorkflow, caption: "n8n pipeline: WhatsApp ingest → dedupe → OCR → validate → Sheets + Drive." },
      { src: media.receiptWhatsapp, caption: "WhatsApp submission and instant confirmation back to the sender." },
      { src: media.receiptSheet, caption: "Google Sheets ledger — every receipt parsed into structured rows." },
    ],
  },
  {
    slug: "dentist-ai-booking-chatbot",
    title: "AI Booking Chatbot for Bright Smile Dental",
    tagline:
      "A calm, conversational booker that turns a website chat into a confirmed calendar appointment and a branded confirmation email.",
    category: "AI Agents",
    categories: ["AI Agents", "Voice AI", "n8n", "Integrations"],
    year: "2026",
    client: "Bright Smile Dental (concept build)",
    duration: "2 weeks",
    role: "AI Automation Engineer — agent design + delivery",
    cover: media.bookingWorkflow,
    accent: "oklch(0.62 0.16 34)",
    overview:
      "A dental practice wanted their website chat to book appointments end-to-end without a receptionist. I built an AI agent that checks live availability, negotiates a slot, writes the booking to the calendar and sends a branded confirmation email.",
    problem:
      "Their existing chat could only collect a name and email — front-desk staff still had to phone every enquirer back to actually book. Response times were slow and roughly a third of enquiries dropped off before a callback happened.",
    solution:
      "An n8n workflow with a memory-backed AI agent handles the full conversation. The agent reads live calendar availability, offers slots in a friendly tone, confirms the treatment and time, writes a calendar event and dispatches a styled confirmation email — all inside a single webhook round-trip.",
    architecture: [
      "Chat widget posts to an n8n webhook on every message.",
      "AI Agent (OpenAI) with a short-term memory holds the booking conversation.",
      "Tools: search records, get many events, create record, create event, send message.",
      "Branching logic handles unclear input with a polite clarification.",
      "On confirmation, a calendar event is created and a branded HTML email is sent.",
    ],
    workflow: [
      { step: "Message in", detail: "Webhook receives the user's message from the chat widget." },
      { step: "Agent", detail: "OpenAI agent with memory decides intent: browse, book, reschedule." },
      { step: "Availability", detail: "Reads free slots from the practice calendar." },
      { step: "Offer + confirm", detail: "Proposes 1-3 windows and confirms treatment + slot." },
      { step: "Book", detail: "Creates the calendar event and stores the booking record." },
      { step: "Email", detail: "Sends a Bright Smile Dental branded HTML confirmation." },
    ],
    tools: ["n8n", "OpenAI GPT-4", "Google Calendar", "Gmail API", "Webhooks", "JavaScript"],
    features: [
      "End-to-end booking without a human handoff",
      "Live availability — never double-books",
      "Graceful recovery when the user is ambiguous",
      "Branded HTML confirmation email",
      "Runs 24/7, responds in seconds",
    ],
    outcome: [
      { metric: "24/7", label: "always-on booking" },
      { metric: "~30s", label: "average time to booked" },
      { metric: "1 webhook", label: "handles the whole flow" },
    ],
    gallery: [
      { src: media.bookingChat, caption: "Live chat with the agent confirming a mouth-cleaning appointment." },
      { src: media.bookingEmail, caption: "Branded confirmation email dispatched on booking." },
      { src: media.bookingWorkflow, caption: "n8n workflow — agent, tools, calendar and email in one pass." },
    ],
  },
];

export const categories = [
  "All",
  "AI Agents",
  "CRM Automation",
  "n8n",
  "Workflow Automation",
  "Integrations",
  "Lead Generation",
  "Voice AI",
];

export const technologies = [
  "n8n",
  "OpenAI",
  "HubSpot",
  "Gmail API",
  "Google Calendar",
  "Google Sheets",
  "Google Drive",
  "Green API (WhatsApp)",
  "Webhooks",
  "JavaScript",
  "REST APIs",
  "Zod / JSON Schemas",
];
