import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { media } from "@/data/media";
import { submitContact } from "@/lib/contact.functions";
import { ArrowUpRight, CheckCircle2, Mail, MessageSquare, Sparkles, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Azeem Olunloye — AI Automation Engineer" },
      {
        name: "description",
        content:
          "Start an automation project with Azeem Olunloye. Direct brief submission, WhatsApp, or LinkedIn. Direct engineer response within one business day.",
      },
      { property: "og:title", content: "Contact Azeem Olunloye — AI Automation Engineer" },
      {
        property: "og:description",
        content: "Discuss your workflow bottlenecks directly with Azeem Olunloye.",
      },
    ],
  }),
  component: Contact,
});

const EMAIL = "azeemolunloye@gmail.com";
const PHONE = "+234 813 860 2053";
const WHATSAPP = "https://wa.me/2348138602053?text=Hi%20Azeem%2C%20I%27d%20like%20to%20discuss%20an%20automation%20project.";
const LINKEDIN = "https://www.linkedin.com/in/azeem-olunloye-42177141b";

type Status = "idle" | "sending" | "sent" | "error";

function Contact() {
  const send = useServerFn(submitContact);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Please enter a valid email address.";
    if (!form.subject.trim()) errs.subject = "Please add a subject.";
    if (!form.message.trim())
      errs.message = "Please provide your message.";
    if (form.message.trim().length > 4000) errs.message = "Message exceeds maximum length.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setStatus("sending");
    try {
      await send({
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          source: "Contact Page Form",
        },
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      toast.success("Message delivered successfully to Telegram.");
    } catch {
      setStatus("error");
      setServerError("Unable to send message right now. Please message directly on WhatsApp or Email.");
      toast.error("Unable to send message. Please contact via WhatsApp or Email.");
    }
  };

  return (
    <div className="min-h-dvh bg-white text-gray-900 selection:bg-[#5B8CFF] selection:text-white">
      <Nav />

      <main className="overflow-hidden">
        {/* Editorial Contact Header */}
        <section className="container-page pt-10 sm:pt-16 pb-12 sm:pb-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
              <span>Direct Engineering Communication</span>
              <Sparkles className="h-3.5 w-3.5 text-[#5B8CFF]" />
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12] max-w-3xl mx-auto">
            Let's talk through your <span className="text-[#5B8CFF]">automation goals</span>.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Brief me on the workflow that is eating your team's hours. I review every submission personally and respond within one business day.
          </p>
        </section>

        {/* Dual Column: Form & Direct Contact Cards */}
        <section className="container-page pb-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-[32px] sm:rounded-[40px] border border-gray-200 bg-white p-7 sm:p-10 shadow-lg">
                <h2 className="font-display text-2xl font-extrabold text-gray-900 tracking-tight">
                  Send a Project Brief
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Fill in the details below. All fields are sent directly to my private inbox.
                </p>

                <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Sarah Jenkins"
                        className="w-full rounded-2xl border border-gray-300 bg-[#F9FAFB] px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#5B8CFF] focus:outline-none focus:ring-1 focus:ring-[#5B8CFF]"
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="sarah@company.com"
                        className="w-full rounded-2xl border border-gray-300 bg-[#F9FAFB] px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#5B8CFF] focus:outline-none focus:ring-1 focus:ring-[#5B8CFF]"
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Topic or System Needed *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="e.g. HubSpot Lead Nurturing, n8n OCR Intake, AI Booking Agent"
                      className="w-full rounded-2xl border border-gray-300 bg-[#F9FAFB] px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#5B8CFF] focus:outline-none focus:ring-1 focus:ring-[#5B8CFF]"
                    />
                    {errors.subject && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Workflow Description & Context *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      maxLength={4000}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="What is the current manual process? Which tools are involved (HubSpot, Sheets, WhatsApp)? What does success look like?"
                      className="w-full rounded-2xl border border-gray-300 bg-[#F9FAFB] p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#5B8CFF] focus:outline-none focus:ring-1 focus:ring-[#5B8CFF] resize-none"
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#5B8CFF] py-4 text-sm font-bold text-white shadow-[0_4px_16px_rgba(91,140,255,0.35)] transition-all hover:bg-[#4A7DEF] hover:scale-[1.01] disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <span>Transmitting Brief...</span>
                      ) : status === "sent" ? (
                        <span>Brief Received — Will Reply Soon!</span>
                      ) : (
                        <>
                          <span>Submit Project Brief</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    {status === "sent" && (
                      <p className="mt-3 text-center text-xs font-semibold text-green-600">
                        Thank you! Your inquiry was sent directly to Azeem.
                      </p>
                    )}
                    {serverError && (
                      <p className="mt-3 text-center text-xs font-semibold text-red-600">
                        {serverError}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar Column: Direct Contact & Portrait */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Channels Card */}
              <div className="rounded-[32px] sm:rounded-[40px] border border-gray-200/80 bg-[#FAFBFD] p-6 sm:p-8">
                <h3 className="font-display text-xl font-extrabold text-gray-900 tracking-tight">
                  Direct Communication
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Prefer instant messaging? Reach out directly via these channels:
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all hover:border-[#5B8CFF] hover:shadow-md group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 font-bold text-sm">
                        WA
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-gray-400">WhatsApp</p>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">{PHONE}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#5B8CFF] transition-colors" />
                  </a>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all hover:border-[#5B8CFF] hover:shadow-md group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#5B8CFF]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase text-gray-400">Email</p>
                        <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{EMAIL}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#5B8CFF] transition-colors" />
                  </a>

                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all hover:border-[#5B8CFF] hover:shadow-md group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold text-sm">
                        IN
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-gray-400">LinkedIn</p>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">Azeem Olunloye</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#5B8CFF] transition-colors" />
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#5B8CFF]" />
                    <span>Replies within 24 business hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#5B8CFF]" />
                    <span>Remote · Available for global engagements</span>
                  </div>
                </div>
              </div>

              {/* Personal Arch Profile Card */}
              <div className="rounded-[32px] sm:rounded-[40px] bg-[#F5F6F8] border border-gray-200/80 p-6 flex items-center gap-5">
                <div className="relative w-20 h-24 shrink-0 flex items-end justify-center">
                  <div className="absolute inset-x-1 bottom-0 top-3 rounded-t-[30px] bg-gradient-to-t from-[#8EA9FF]/30 to-[#DCE6FF]" />
                  <img
                    src={media.portraitPhoto}
                    alt="Azeem Olunloye"
                    className="relative z-10 h-[92%] w-auto object-cover object-top drop-shadow"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-gray-900 text-sm">Azeem Olunloye</h4>
                  <p className="text-xs text-[#5B8CFF] font-semibold mt-0.5">AI Automation Engineer</p>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                    2+ years shipping production-grade n8n, Make, and AI agent architectures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

