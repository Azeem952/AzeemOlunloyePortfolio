import { ArrowUpRight, CheckCircle2, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import { toast } from "sonner";

export function CtaSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const send = useServerFn(submitContact);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await send({
        data: {
          email: cleanEmail,
          name: "Project Lead",
          subject: "Homepage Project Discussion Inquiry",
          message: `User submitted email: ${cleanEmail} via Homepage CTA banner to discuss a project.`,
          source: "Homepage CTA Banner",
        },
      });
      setSent(true);
      setEmail("");
      toast.success("Inquiry delivered to Telegram! Azeem will reach out shortly.");
      setTimeout(() => setSent(false), 8000);
    } catch (err) {
      console.error("CTA submission failed:", err);
      toast.error("Unable to deliver message to Telegram. Please contact directly on WhatsApp or Email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page py-16 sm:py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#101828] leading-[1.15]">
          Have an Awesome Project
          <br />
          Idea? <span className="text-[#5B8CFF]">Let's Discuss</span>
        </h2>

        {/* Big Pill Input Container matching reference with Liquid Glass shadow */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 relative max-w-xl mx-auto flex items-center rounded-full border border-gray-300/90 bg-white p-2 pl-5 shadow-lg focus-within:border-[#5B8CFF] focus-within:ring-2 focus-within:ring-[#5B8CFF]/20 transition-all"
        >
          <Mail className="h-5 w-5 text-gray-400 shrink-0 mr-3" />
          <input
            type="email"
            required
            disabled={loading}
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-[#101828] placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#5B8CFF] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#3E6EE0] hover:scale-105 shrink-0 disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send</span>
                <ArrowUpRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {sent && (
          <p className="mt-3 text-sm font-semibold text-green-600 animate-fade-in">
            Thank you! Azeem received your notification on Telegram and will reach out shortly.
          </p>
        )}

        {/* Guarantee / Benefit Badges below input */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-[#667085]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#5B8CFF]" />
            <span>Direct Engineering Handover</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#5B8CFF]" />
            <span>Rapid Prototype Turnaround</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#5B8CFF]" />
            <span>Guaranteed Reliability</span>
          </div>
        </div>
      </div>
    </section>
  );
}
