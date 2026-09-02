import { useEffect, useMemo } from "react";
import { Reveal } from "@/components/reveal";
import { FAQ, type FaqTabsData } from "@/components/ui/faq-tabs";
import { faqGroups } from "@/data/faq";

/** Tabbed FAQ anchored at #faq. */
export function FaqSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#faq") return;
    const id = window.setTimeout(() => {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(id);
  }, []);

  const { categories, faqData } = useMemo(() => {
    const categories: Record<string, string> = {};
    const faqData: FaqTabsData = {};
    faqGroups.forEach((g) => {
      const key = g.group.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      categories[key] = g.group;
      faqData[key] = g.items.map((i) => ({ question: i.q, answer: i.a }));
    });
    return { categories, faqData };
  }, []);

  return (
    <section id="faq" className="container-page section-y scroll-mt-[104px] md:scroll-mt-[120px]">
      <Reveal>
        <FAQ
          subtitle="FAQ"
          title="Questions clients ask before we start"
          categories={categories}
          faqData={faqData}
        />
      </Reveal>
    </section>
  );
}
