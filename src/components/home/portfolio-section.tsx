import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { media } from "@/data/media";
import type { CmsProject } from "@/lib/cms-types";

interface PortfolioSectionProps {
  projects?: CmsProject[];
}

const fallbackShowcase = [
  {
    slug: "hubspot-ai-crm-followup",
    title: "AI CRM Follow-Up Sequence",
    category: "CRM Automation",
    image: media.crmWorkflow,
    tagline: "A HubSpot-native lead nurturing engine that writes, sends and adapts follow-ups without a human in the loop.",
    tools: ["n8n", "HubSpot", "OpenAI", "Gmail"],
  },
  {
    slug: "dentist-ai-booking-chatbot",
    title: "AI Booking Chatbot for Bright Smile Dental",
    category: "AI Agents",
    image: media.bookingWorkflow,
    tagline: "A conversational booker that turns website chat into confirmed calendar appointments and branded emails 24/7.",
    tools: ["OpenAI", "Google Calendar", "n8n", "Gmail"],
  },
  {
    slug: "receipt-ocr-whatsapp",
    title: "Receipt Processing with AI OCR",
    category: "Workflow Automation",
    image: media.receiptWorkflow,
    tagline: "Snap a receipt in WhatsApp — get a filed record, an itemised row in Sheets and a backup in Drive in under a minute.",
    tools: ["OpenAI Vision", "Google Sheets", "WhatsApp", "Drive"],
  },
];

const categories = ["All", "CRM Automation", "AI Agents", "Workflow Automation"];

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const items = (projects && projects.length > 0)
    ? projects.slice(0, 4).map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        image: p.gallery?.[0]?.src ?? p.cover,
        tagline: p.tagline,
        tools: p.tools ?? [],
      }))
    : fallbackShowcase;

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter((item) => item.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const activeProject = filteredItems[0] || items[0];

  return (
    <section className="container-page py-16 sm:py-24">
      {/* Top Header Row with Title and See All Orange Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
            Lets have a look at
            <br />
            my <span className="text-[#FF5E1E]">Portfolio</span>
          </h2>
        </div>

        <Link
          to="/portfolio"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5E1E] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,94,30,0.35)] transition-all hover:bg-[#E54D12] hover:scale-105 self-start sm:self-auto"
        >
          <span>See All</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Visual Showcase (2 Large Previews Side-by-Side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredItems.slice(0, 2).map((item) => (
          <Link
            key={item.slug}
            to="/portfolio/$slug"
            params={{ slug: item.slug }}
            className="group block relative overflow-hidden rounded-[28px] border border-gray-200 bg-white p-3 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[22px] bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
                <span className="inline-block rounded-full bg-[#FF5E1E] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  {item.category}
                </span>
                <p className="font-display text-lg font-bold text-white mt-1.5 drop-shadow">
                  {item.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Indicator (Orange Pill + Dots) */}
      <div className="flex items-center justify-center gap-2 mt-8 mb-10">
        <div className="h-2 w-7 rounded-full bg-[#FF5E1E]" />
        <div className="h-2 w-2 rounded-full bg-gray-300" />
        <div className="h-2 w-2 rounded-full bg-gray-300" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Featured Project Detail with Orange Circular Arrow */}
      {activeProject && (
        <div className="max-w-2xl mx-auto text-center px-4">
          <Link
            to="/portfolio/$slug"
            params={{ slug: activeProject.slug }}
            className="group inline-flex items-center gap-3 font-display text-xl sm:text-2xl font-extrabold text-gray-900 hover:text-[#FF5E1E] transition-colors"
          >
            <span>{activeProject.title}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5E1E] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
          <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
            {activeProject.tagline}
          </p>
        </div>
      )}
    </section>
  );
}
