import { ArrowUpRight, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";

export function CtaSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSent(true);
      setTimeout(() => setSent(false), 5000);
      setEmail("");
    }
  };

  return (
    <section className="container-page py-16 sm:py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
          Have an Awesome Project
          <br />
          Idea? <span className="text-[#FF5E1E]">Let's Discuss</span>
        </h2>

        {/* Big Pill Input Container matching reference */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 relative max-w-xl mx-auto flex items-center rounded-full border border-gray-300/90 bg-white p-2 pl-5 shadow-lg focus-within:border-[#FF5E1E] focus-within:ring-2 focus-within:ring-[#FF5E1E]/20 transition-all"
        >
          <Mail className="h-5 w-5 text-gray-400 shrink-0 mr-3" />
          <input
            type="email"
            required
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5E1E] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#E54D12] hover:scale-105 shrink-0"
          >
            <span>Send</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>

        {sent && (
          <p className="mt-3 text-sm font-semibold text-green-600">
            Thank you! Azeem will reach out to schedule our discovery call.
          </p>
        )}

        {/* Guarantee / Benefit Badges below input */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-gray-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#FF5E1E]" />
            <span>Direct Engineering Handover</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#FF5E1E]" />
            <span>Rapid Prototype Turnaround</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#FF5E1E]" />
            <span>Guaranteed Reliability</span>
          </div>
        </div>
      </div>
    </section>
  );
}
