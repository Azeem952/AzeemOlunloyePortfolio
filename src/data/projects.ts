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
    video: media.crmVideo,
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
    video: media.bookingVideo,
    gallery: [
      { src: media.bookingChat, caption: "Live chat with the agent confirming a mouth-cleaning appointment." },
      { src: media.bookingEmail, caption: "Branded confirmation email dispatched on booking." },
      { src: media.bookingWorkflow, caption: "n8n workflow — agent, tools, calendar and email in one pass." },
    ],
  },
  {
    slug: "ai-office-assistant",
    title: "AI Office Assistant",
    tagline:
      "An always-on inbox operator that reads, classifies, drafts and files email so the office never starts the day behind.",
    category: "AI Agents",
    categories: ["AI Agents", "n8n", "Workflow Automation", "Integrations"],
    year: "2026",
    client: "Operations team (private)",
    duration: "2 weeks",
    role: "AI Automation Engineer — agent design, tooling, delivery",
    cover: media.officeWorkflow,
    accent: "oklch(0.62 0.16 34)",
    overview:
      "The office inbox was the bottleneck for everything: enquiries, invoices, scheduling and internal requests all arrived in one stream. I built an assistant that triages every message, decides what to do, drafts the reply in the right tone, and hands anything ambiguous back to a human with context attached.",
    problem:
      "Two staff members spent the first two hours of every day reading and sorting mail. Urgent messages were buried under newsletters, replies went out inconsistently, and nothing was logged — so nobody could say what had been answered.",
    solution:
      "An n8n agent watches Gmail, classifies each thread into an intent, pulls context from the connected tools, and either drafts a reply for approval or completes the task outright. Every action is logged so the team can audit what the assistant did and why.",
    architecture: [
      "Gmail trigger streams new threads into n8n with attachments and metadata intact.",
      "A classifier model assigns an intent — enquiry, invoice, scheduling, internal, or noise.",
      "The agent selects tools per intent: calendar lookups, document search, or CRM reads.",
      "Replies are drafted with a tone guide and saved as Gmail drafts for one-click approval.",
      "Low-confidence or high-stakes threads are escalated with a summary instead of auto-handled.",
      "Every decision, tool call and outcome is appended to an activity log.",
    ],
    workflow: [
      { step: "Watch", detail: "Gmail trigger fires on every new inbound thread." },
      { step: "Classify", detail: "LLM assigns intent, urgency and required tools." },
      { step: "Gather", detail: "Agent pulls calendar, document or contact context as needed." },
      { step: "Decide", detail: "Auto-handle, draft for approval, or escalate to a human." },
      { step: "Draft", detail: "Reply written in the house tone and saved to Gmail drafts." },
      { step: "Log", detail: "Intent, action and confidence written to the activity log." },
    ],
    tools: ["n8n", "OpenAI GPT-4", "Gmail API", "Google Calendar", "Webhooks", "JavaScript"],
    features: [
      "Intent classification across the whole inbox",
      "Tone-matched draft replies ready for one-click send",
      "Confidence gating — ambiguity escalates instead of guessing",
      "Full audit log of every decision",
      "Runs continuously, no scheduled batch delay",
    ],
    outcome: [
      { metric: "~2 hrs", label: "of daily triage removed" },
      { metric: "100%", label: "of threads classified and logged" },
      { metric: "24/7", label: "coverage, including weekends" },
    ],
    video: media.officeVideo,
    gallery: [
      { src: media.officeWorkflow, caption: "n8n orchestration — trigger, classifier, tool router and logging." },
      { src: media.officeGmail, caption: "Gmail thread handled by the assistant with a draft ready to send." },
    ],
  },
  {
    slug: "appointment-reminder-sms",
    title: "Appointment Reminder & SMS Confirmation System",
    tagline:
      "A trust-first reminder engine for a medical clinic: it re-checks the calendar before every send, so no patient is ever texted about an appointment that already moved.",
    category: "Workflow Automation",
    categories: ["Workflow Automation", "n8n", "Integrations"],
    year: "2026",
    client: "Medical clinic (challenge brief)",
    duration: "1 week",
    role: "AI Automation Engineer — reliability design and build",
    cover: media.reminderCalendar,
    accent: "oklch(0.62 0.16 34)",
    overview:
      "A clinic's reminder automation had become a liability — it double-booked and texted patients about slots that had already been rescheduled. I rebuilt it around a single rule: a patient only ever receives a text about an appointment that is genuinely still on.",
    problem:
      "The original workflow read the calendar once on a schedule and queued reminders. If an appointment moved or was cancelled between the read and the send, the text still went out. Patients stopped trusting the messages, and the front desk fielded the fallout.",
    solution:
      "A scheduled n8n workflow reads Google Calendar, but every reminder re-verifies the event immediately before dispatch. A short safety delay absorbs late changes, an Airtable data store logs every send, and a duplicate guard makes it impossible for the same patient to get the same reminder twice.",
    architecture: [
      "Schedule trigger sweeps Google Calendar for appointments inside the reminder window.",
      "Each candidate is written to an Airtable data store keyed by event ID.",
      "A safety delay lets late reschedules and cancellations land before anything sends.",
      "Immediately before dispatch, the event is re-fetched — moved or cancelled slots are skipped.",
      "Twilio sends the SMS; the message and timestamp are logged back to Airtable.",
      "The duplicate guard checks Reminder_Sent before any send, so retries are safe.",
    ],
    workflow: [
      { step: "Sweep", detail: "Scheduled read of Google Calendar for upcoming appointments." },
      { step: "Store", detail: "Upsert each event into Airtable keyed by Event_ID." },
      { step: "Hold", detail: "Safety delay absorbs last-minute reschedules and cancellations." },
      { step: "Re-check", detail: "Re-fetch the event; skip if it moved, cancelled or already reminded." },
      { step: "Send", detail: "Twilio delivers the SMS asking the patient to reply YES to confirm." },
      { step: "Log", detail: "Reminder_Sent_At and Reminder_Sent written back to Airtable." },
    ],
    tools: ["n8n", "Google Calendar", "Twilio", "Airtable", "Schedule triggers", "JavaScript"],
    features: [
      "Pre-send calendar re-check — rescheduled slots never get the old reminder",
      "Idempotent duplicate guard on every patient and event",
      "Safety delay window before dispatch",
      "Full message log with timestamps in Airtable",
      "Safe retries — a failed run cannot double-send",
    ],
    outcome: [
      { metric: "0", label: "reminders for moved appointments" },
      { metric: "0", label: "duplicate texts per patient" },
      { metric: "100%", label: "of sends logged and auditable" },
    ],
    video: media.reminderVideo,
    gallery: [
      { src: media.reminderCalendar, caption: "Google Calendar — the source of truth the workflow re-checks before every send." },
      { src: media.reminderSms, caption: "Twilio SMS reminders delivered to patients with a YES confirmation prompt." },
      { src: media.reminderAirtable, caption: "Airtable log — event ID, phone, appointment time, sent-at and sent flag." },
      { src: media.reminderBrief, caption: "The original brief: reliability design, calendar sync and safe retries." },
    ],
  },
  {
    slug: "mama-tees-kitchen-ops",
    title: "Mama Tee's Kitchen — Voice AI Order Operations",
    tagline:
      "A voice agent takes the call, an n8n router files the order, and the kitchen watches one live operations dashboard instead of a ringing phone.",
    category: "Voice AI",
    categories: ["Voice AI", "AI Agents", "n8n", "Workflow Automation", "Integrations"],
    year: "2026",
    client: "Mama Tee's Kitchen",
    duration: "2 weeks",
    role: "AI Automation Engineer — voice agent, routing and dashboard",
    cover: media.mamateeDashboard,
    accent: "oklch(0.62 0.16 34)",
    overview:
      "A busy kitchen was losing orders to a phone nobody could answer during service. I built a voice AI front desk that takes orders and reservations, routes each call type to the right sheet, escalates anything it can't handle, and surfaces everything on a live operations dashboard.",
    problem:
      "Orders, reservations and complaints all arrived on one phone line during the busiest hours. Staff wrote them on paper, missed callbacks, and had no record of what a customer had asked for — so follow-ups simply never happened.",
    solution:
      "A Vapi voice agent answers every call and posts a structured transcript to an n8n webhook. A switch routes on call type: orders and reservations append to their own sheets, and anything unhandled lands in a follow-up queue with the customer's name and number. Telegram notifies the team instantly, and a dashboard shows the whole picture.",
    architecture: [
      "Vapi voice agent handles the call and extracts a structured payload.",
      "A webhook posts the payload to n8n; a JavaScript node normalises fields.",
      "A Switch node routes on call type: order, reservation, or unhandled request.",
      "Each branch appends to its own Google Sheet — orders, reservations, follow-ups.",
      "Telegram messages notify the kitchen for each branch in real time.",
      "An operations dashboard reads the sheets and surfaces follow-ups and recent orders.",
    ],
    workflow: [
      { step: "Answer", detail: "Voice agent picks up and captures the order or request." },
      { step: "Post", detail: "Structured transcript hits the n8n webhook." },
      { step: "Normalise", detail: "JavaScript node cleans names, phone numbers and items." },
      { step: "Route", detail: "Switch branches on order, reservation or unhandled request." },
      { step: "File", detail: "Append the row to the matching Google Sheet." },
      { step: "Notify", detail: "Telegram alerts the kitchen; dashboard updates live." },
    ],
    tools: ["Vapi (Voice AI)", "n8n", "Google Sheets", "Telegram", "Webhooks", "JavaScript"],
    features: [
      "Voice agent answers every call, including during service",
      "Three-way routing: orders, reservations, follow-ups",
      "Nothing dropped — unhandled requests become a worked queue",
      "Instant Telegram notifications per branch",
      "Live operations dashboard with CSV export",
    ],
    outcome: [
      { metric: "0", label: "missed calls during service" },
      { metric: "3", label: "call types routed automatically" },
      { metric: "1", label: "dashboard for the whole operation" },
    ],
    video: media.mamateeVideo,
    gallery: [
      { src: media.mamateeDashboard, caption: "Operations dashboard — follow-up queue and recent orders with CSV export." },
      { src: media.mamateeWorkflow, caption: "n8n routing: webhook → normalise → switch → sheets → Telegram." },
    ],
  },
  {
    slug: "ai-lead-generation-scouting",
    title: "AI Lead Generation & Scouting Engine",
    tagline:
      "Crawls prospect websites, spots the automation gap, writes the pitch, and sends it — a whole outbound desk running as one n8n workflow.",
    category: "Lead Generation",
    categories: ["Lead Generation", "AI Agents", "n8n", "Workflow Automation"],
    year: "2026",
    client: "Own agency pipeline",
    duration: "3 weeks",
    role: "AI Automation Engineer — research agent, copy generation, delivery",
    cover: media.leadgenWorkflow,
    accent: "oklch(0.62 0.16 34)",
    overview:
      "Outbound only works when the message proves you actually looked at the business. This system reads a sheet of prospects, crawls each website, has an AI agent identify the specific operational gap automation could close, drafts a tailored email around that finding, sends it, and writes the outcome back to the sheet.",
    problem:
      "Manual prospecting meant an hour per lead: open the site, read the services, guess at a pain point, write something bespoke, log it. At that rate the pipeline was capped at a handful of contacts a week and the research quality drifted whenever the day got busy.",
    solution:
      "One n8n workflow owns the loop. It batches rows from Google Sheets, crawls and scrapes every page of each site with Firecrawl, cleans the markdown in a Code node, and passes it to an AI Agent with a structured output parser. The agent returns a named opportunity plus a subject and body; Gmail sends it, a Wait node paces the send rate, and the sheet row is updated so nobody is contacted twice.",
    architecture: [
      "Google Sheets holds the prospect list — company, URL, status, last contacted.",
      "Loop Over Items batches rows so long crawls never block the run.",
      "Firecrawl crawls and scrapes every page; polling nodes wait on crawl status.",
      "A JavaScript node strips navigation, boilerplate and markdown noise.",
      "An IF node routes sites with enough content to the agent and parks thin ones on a second crawl pass.",
      "An AI Agent (OpenAI chat model + structured output parser) returns the opportunity, subject and body as strict JSON.",
      "Gmail sends the email; a Wait node throttles the cadence; the sheet row is updated with status and timestamp.",
    ],
    workflow: [
      { step: "Read", detail: "Pull unworked prospect rows from Google Sheets." },
      { step: "Crawl", detail: "Firecrawl scrapes all pages of the prospect's website." },
      { step: "Poll", detail: "Wait and check crawl status until the scrape completes." },
      { step: "Clean", detail: "JavaScript node reduces the pages to usable business context." },
      { step: "Qualify", detail: "IF branch sends thin sites through a second, deeper crawl." },
      { step: "Reason", detail: "AI Agent names the automation gap and drafts subject + body." },
      { step: "Send", detail: "Gmail delivers the email; Wait node paces the sequence." },
      { step: "Log", detail: "Sheet row updated with status, opportunity and sent time." },
    ],
    tools: ["n8n", "Firecrawl", "OpenAI", "Structured Output Parser", "Gmail API", "Google Sheets", "JavaScript"],
    features: [
      "Per-prospect research instead of merge-tag personalisation",
      "Structured output parser keeps every draft machine-safe",
      "Two-pass crawling for thin or JavaScript-heavy sites",
      "Rate-paced sending to protect domain reputation",
      "Sheet as source of truth — no duplicate outreach",
    ],
    outcome: [
      { metric: "20", label: "prospects researched per run, unattended" },
      { metric: "~1 hr → 0", label: "manual research time per lead" },
      { metric: "100%", label: "of emails reference a real, site-specific finding" },
    ],
    video: media.leadgenVideo,
    gallery: [
      { src: media.leadgenWorkflow, caption: "n8n scouting workflow — sheet → crawl → clean → AI agent → Gmail → update row." },
      { src: media.leadgenEmail, caption: "Generated outreach: an abandoned-cart recovery pitch written from the prospect's own store." },
    ],
  },
  {
    slug: "forex-signal-workflow",
    title: "Forex Signal Workflow Automation",
    tagline:
      "An hourly n8n bot that pulls multi-timeframe market data, filters the news, scores every pair, and reports only what clears the threshold.",
    category: "Workflow Automation",
    categories: ["Workflow Automation", "AI Agents", "n8n", "Integrations"],
    year: "2026",
    client: "Private trading desk",
    duration: "2 weeks",
    role: "AI Automation Engineer — data pipeline, scoring model, delivery",
    cover: media.forexWorkflow,
    accent: "oklch(0.62 0.16 34)",
    overview:
      "Chart-watching does not scale. I built a scheduled workflow that fetches 5m, 15m, 1H and 4H data for a basket of pairs from Twelve Data, merges the timeframes, filters out high-impact news windows, scores each pair out of 100, and posts a clean Telegram report — including the honest 'no qualifying signals' case.",
    problem:
      "The manual routine meant checking four timeframes across several pairs every hour, cross-referencing the news calendar, and deciding under time pressure. It was inconsistent, easy to skip, and impossible to review afterwards.",
    solution:
      "A published n8n workflow runs hourly. Staggered Wait nodes keep the Twelve Data API inside its rate limit while four HTTP requests pull each timeframe. A Merge node assembles one object per pair, an ANALYSIS node computes technical conditions, a SCORING node grades the setup out of 100, and a ranking node composes the Telegram message — actionable signals above 70, a watchlist for 60–69, and a full scan summary for everything else.",
    architecture: [
      "Schedule Trigger fires the run every hour.",
      "Four staggered Wait branches pace requests to stay inside API rate limits.",
      "HTTP Request nodes fetch 5m, 15m, 1H and 4H candles from Twelve Data.",
      "A News Filter node suppresses pairs inside high-impact news windows.",
      "Merge (append) assembles all timeframes into a single evaluation payload.",
      "ANALYSIS computes technical conditions; SCORING grades each pair out of 100.",
      "A ranking node formats the report and Telegram delivers it to the desk.",
    ],
    workflow: [
      { step: "Schedule", detail: "Hourly trigger starts the scan." },
      { step: "Pace", detail: "Staggered waits keep the market-data API within limits." },
      { step: "Fetch", detail: "Pull 5m, 15m, 1H and 4H candles per pair." },
      { step: "Filter", detail: "Drop pairs sitting inside a high-impact news window." },
      { step: "Merge", detail: "Combine timeframes into one object per pair." },
      { step: "Analyse", detail: "Compute technical conditions across the timeframes." },
      { step: "Score", detail: "Grade each pair out of 100 against the strategy rules." },
      { step: "Report", detail: "Telegram posts signals, watchlist and full scan summary." },
    ],
    tools: ["n8n", "Twelve Data API", "Telegram Bot API", "JavaScript", "Webhooks", "Cron"],
    features: [
      "Multi-timeframe confluence — 5m, 15m, 1H and 4H in one score",
      "News-aware filtering before any signal is published",
      "70-point threshold with a 60–69 watchlist tier",
      "Reports the empty result honestly instead of forcing a trade",
      "Every run logged in n8n executions for later review",
    ],
    outcome: [
      { metric: "24", label: "unattended scans per day" },
      { metric: "~3.5 min", label: "full scan, start to Telegram report" },
      { metric: "100%", label: "of runs archived for post-trade review" },
    ],
    video: media.forexVideo,
    gallery: [
      { src: media.forexWorkflow, caption: "n8n execution view — staggered timeframe fetches, news filter, merge, analysis, scoring." },
      { src: media.forexTelegram, caption: "Telegram report: scored pairs, watchlist tier and an honest no-signal result." },
    ],
  },
];

export const categories = [
  "All",
  "AI Agents",
  "Voice AI",
  "CRM Automation",
  "Workflow Automation",
  "Integrations",
  "n8n",
  "Lead Generation",
];

export const technologies = [
  "n8n",
  "OpenAI",
  "Vapi Voice AI",
  "HubSpot",
  "Twilio",
  "Airtable",
  "Gmail API",
  "Google Calendar",
  "Google Sheets",
  "Google Drive",
  "Green API (WhatsApp)",
  "Telegram",
  "Webhooks",
  "REST APIs",
  "JavaScript",
];

