import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { media } from "@/data/media";

const posts = [
  {
    title: "Building Reliable n8n Workflows with Webhook Retries and Alerts",
    category: "Workflow Automation",
    date: "15 Sep 2024",
    readTime: "5 min read",
    image: media.crmWorkflow,
    slug: "hubspot-ai-crm-followup",
  },
  {
    title: "How We Replaced 2 Hours of Daily Inbox Triage with an Autonomous Agent",
    category: "AI Agents",
    date: "28 Oct 2024",
    readTime: "4 min read",
    image: media.bookingChat,
    slug: "dentist-ai-booking-chatbot",
  },
  {
    title: "Automating Multi-Touch Lead Nurturing: HubSpot, LLMs, and Reply Guards",
    category: "CRM & Pipelines",
    date: "10 Nov 2024",
    readTime: "6 min read",
    image: media.receiptWorkflow,
    slug: "receipt-ocr-whatsapp",
  },
];

export function BlogSection() {
  return (
    <section className="container-page py-16 sm:py-24">
      {/* Top Header Row with Title and See All Orange Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
            From my
            <br />
            <span className="text-[#FF5E1E]">blog post</span>
          </h2>
        </div>

        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5E1E] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,94,30,0.35)] transition-all hover:bg-[#E54D12] hover:scale-105 self-start sm:self-auto"
        >
          <span>See All</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* 3 Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <Link
            key={post.title}
            to="/portfolio/$slug"
            params={{ slug: post.slug }}
            className="group flex flex-col justify-between rounded-[28px] border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div>
              {/* Image Preview with Circular Button */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Circular Arrow Action Button */}
                <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#121214] border border-white/10 text-white shadow-md transition-all duration-300 group-hover:bg-[#FF5E1E] group-hover:scale-110">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              {/* Tag & Metadata */}
              <div className="mt-5 flex items-center gap-3 text-xs font-semibold">
                <span className="rounded-full bg-[#FF5E1E]/10 px-3 py-1 text-[#FF5E1E]">
                  {post.category}
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">{post.date}</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">{post.readTime}</span>
              </div>

              {/* Title */}
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-gray-900 mt-3 group-hover:text-[#FF5E1E] transition-colors leading-snug">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
