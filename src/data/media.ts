// Uploaded project media. Served by the app itself from Cloud storage
// (/api/public/media/*) so URLs resolve on any host, including Vercel.
export const media = {
  portrait: "/api/public/media/portrait.jpg",

  crmWebhook: "/api/public/media/crm-webhook.png",
  crmContacts: "/api/public/media/crm-contacts.png",
  crmWorkflow: "/api/public/media/crm-workflow.png",
  crmEmail: "/api/public/media/crm-email.jpg",

  receiptWorkflow: "/api/public/media/receipt-workflow.png",
  receiptWhatsapp: "/api/public/media/whatsapp-ocr.png",
  receiptSheet: "/api/public/media/receipt-sheet.jpg",

  bookingWorkflow: "/api/public/media/booking-workflow.png",
  bookingChat: "/api/public/media/booking-chat.jpg",
  bookingEmail: "/api/public/media/booking-email.png",
  bookingVideo: "/api/public/media/booking-demo.mp4",

  officeWorkflow:
    "/api/public/media/office-assistant-workflow.png",
  officeGmail:
    "/api/public/media/office-assistant-gmail.png",
  officeVideo:
    "/api/public/media/office-assistant-demo.mp4",

  reminderSms: "/api/public/media/reminder-sms.png",
  reminderBrief: "/api/public/media/reminder-brief.png",
  reminderAirtable:
    "/api/public/media/reminder-airtable.png",
  reminderCalendar:
    "/api/public/media/reminder-calendar.png",
  reminderVideo: "/api/public/media/reminder-demo.mp4",

  mamateeDashboard:
    "/api/public/media/mamatee-dashboard.png",
  mamateeWorkflow:
    "/api/public/media/mamatee-workflow.png",
  mamateeVideo: "/api/public/media/mamatee-demo.mp4",

  crmVideo: "/api/public/media/crm-demo.mp4",
  receiptVideo: "/api/public/media/receipt-demo.mp4",

  leadgenWorkflow: "/api/public/media/leadgen-workflow.jpg",
  leadgenEmail: "/api/public/media/leadgen-email.jpg",
  leadgenVideo: "/api/public/media/leadgen-demo.mp4",

  forexWorkflow: "/api/public/media/forex-workflow.jpg",
  forexTelegram: "/api/public/media/forex-telegram.jpg",
  forexVideo: "/api/public/media/forex-demo.mp4",
} as const;
