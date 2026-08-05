export type FaqItem = { q: string; a: string };
export type FaqGroup = { group: string; items: FaqItem[] };

/** Grouped, scannable FAQ shown on the Services page (#faq). */
export const faqGroups: FaqGroup[] = [
  {
    group: "General automation",
    items: [
      {
        q: "What is workflow automation?",
        a: "Workflow automation is the process of using software to automate repetitive business tasks, reducing manual work, improving accuracy and saving valuable time.",
      },
      {
        q: "What business processes can be automated?",
        a: "Almost any repetitive process — lead generation, CRM updates, email follow-ups, appointment reminders, document processing, reporting, customer support and internal workflows.",
      },
      {
        q: "Do I need technical knowledge?",
        a: "No. Every automation is built to be simple to use, and I provide guidance whenever needed.",
      },
    ],
  },
  {
    group: "Business benefits",
    items: [
      {
        q: "How can automation help my business?",
        a: "Automation reduces repetitive work, eliminates human error, improves response times and lets your team focus on higher-value activities.",
      },
      {
        q: "Will automation replace my employees?",
        a: "No. Automation handles repetitive, time-consuming tasks so your team can focus on strategic, creative and customer-facing work.",
      },
      {
        q: "How much time can automation save?",
        a: "Depending on the workflow, automation can save several hours every week by removing manual steps and reducing processing time.",
      },
      {
        q: "Can automation reduce business costs?",
        a: "Yes. Businesses often reduce operational costs by minimizing manual work, preventing errors and improving overall efficiency.",
      },
    ],
  },
  {
    group: "Services",
    items: [
      {
        q: "Can you automate AI agents and chatbots?",
        a: "Yes. I build AI-powered assistants, customer support bots, internal AI tools and intelligent workflows tailored to your business.",
      },
      {
        q: "Can you automate CRM systems?",
        a: "Yes. I automate lead capture, follow-ups, contact management, pipeline updates and customer communication.",
      },
      {
        q: "Can you automate document processing?",
        a: "Yes. I build OCR and document automation systems that extract, organize and process information from invoices, forms, receipts and PDFs.",
      },
      {
        q: "Can you automate sales and lead generation?",
        a: "Yes. I create systems that discover leads, enrich contact information, qualify prospects and automate personalized outreach.",
      },
    ],
  },
  {
    group: "Integrations",
    items: [
      {
        q: "Can you integrate with my existing software?",
        a: "Yes. I build solutions around your current tools whenever possible using APIs, webhooks and modern automation platforms.",
      },
      {
        q: "What platforms do you specialize in?",
        a: "Mainly n8n, Make, Zapier, OpenAI, Airtable, HubSpot, Google Workspace, APIs, webhooks and AI-powered automation tools.",
      },
    ],
  },
  {
    group: "Security",
    items: [
      {
        q: "Are my business data and credentials secure?",
        a: "Yes. I follow industry best practices to protect your data, use secure authentication methods and keep sensitive information confidential.",
      },
    ],
  },
  {
    group: "Timeline & scale",
    items: [
      {
        q: "How long does it take to build an automation?",
        a: "Most automation projects are completed within a few days to two weeks, depending on complexity and integrations.",
      },
      {
        q: "Can my automation be upgraded later?",
        a: "Absolutely. Every solution is modular and scalable, making it easy to add new features as your business grows.",
      },
      {
        q: "Can automation grow with my business?",
        a: "Yes. Every system is designed with scalability in mind so it can evolve as your business expands.",
      },
    ],
  },
  {
    group: "Support",
    items: [
      {
        q: "What happens if something stops working?",
        a: "I provide troubleshooting, updates and ongoing support whenever required so your automation keeps running smoothly.",
      },
      {
        q: "Do you provide support after delivery?",
        a: "Yes. I offer post-launch support, maintenance and optimization to keep your systems reliable and efficient.",
      },
    ],
  },
  {
    group: "Getting started",
    items: [
      {
        q: "How do we get started?",
        a: "Use the contact form or the WhatsApp button to share your requirements. Once I understand your goals, I'll recommend the best automation for your business.",
      },
    ],
  },
];
