import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { WhyHireMeSection } from "@/components/home/why-hire-me-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/home/cta-section";
import { MarqueeSection } from "@/components/home/marquee-section";
import { BlogSection } from "@/components/home/blog-section";
import { media } from "@/data/media";
import { projectsQuery } from "@/lib/content-queries";
import type { CmsProject } from "@/lib/cms-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azeem Olunloye — AI Automation Engineer" },
      {
        name: "description",
        content:
          "I build AI agents, CRM sequences and workflow automations that remove manual work. 2+ years shipping production automation systems for growing teams.",
      },
      { property: "og:title", content: "Azeem Olunloye — AI Automation Engineer" },
      {
        property: "og:description",
        content:
          "AI agents, CRM automation and integrations that quietly do the work. See the systems I've shipped.",
      },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: media.portraitPhoto,
        fetchPriority: "high",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  errorComponent: () => <HomeShell projects={[]} />,
  component: () => <HomeShell projects={Route.useLoaderData() as CmsProject[]} />,
});

function HomeShell({ projects }: { projects: CmsProject[] }) {
  return (
    <div className="min-h-dvh bg-white text-gray-900 selection:bg-[#5B8CFF] selection:text-white">
      {/* 1. Top Navigation Bar (Floating dark pill) */}
      <Nav />

      <main>
        {/* 2. Hero Section (Arch, portrait, stats, arrows) */}
        <HeroSection />

        {/* 3. Services Section (Dark rounded container, wavy texture, 3 cards) */}
        <ServicesSection />

        {/* 4. Work Experience Section (Two-sided timeline with central markers) */}
        <ExperienceSection />

        {/* 5. "Why Hire Me?" Section (Light-gray container, portrait, stats, CTA) */}
        <WhyHireMeSection />

        {/* 6. Portfolio Showcase Section (Large previews, category filters, CTA) */}
        <PortfolioSection projects={projects} />

        {/* 7. Testimonials Section (Dark container, quotes, stars, verified cards) */}
        <TestimonialsSection />

        {/* 8. Project / Contact CTA Section (Input pill box, guarantee badges) */}
        <CtaSection />

        {/* 9. Orange Marquee Ticker */}
        <MarqueeSection />

        {/* 10. Blog / Content Section (3 preview cards with circular arrow buttons) */}
        <BlogSection />
      </main>

      {/* 11. Footer ("Lets Connect there", newsletter, 4-col links, copyright) */}
      <Footer />
    </div>
  );
}
