import { useEffect } from "react";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui-kit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqGroups } from "@/data/faq";

/** FAQ accordion (single-open) anchored at #faq. */
export function FaqSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#faq") return;
    const id = window.setTimeout(() => {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section id="faq" className="container-page section-y scroll-mt-[104px] md:scroll-mt-[120px]">
      <Reveal>
        <div className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-balance md:text-[44px]">
            Questions clients ask before we start
          </h2>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl space-y-10">
        {faqGroups.map((g, gi) => (
          <Reveal key={g.group} delay={Math.min(gi, 3) * 60}>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {g.group}
            </p>
            <Accordion type="single" collapsible className="space-y-3">
              {g.items.map((item) => (
                <AccordionItem
                  key={item.q}
                  value={item.q}
                  className="rounded-2xl border border-border bg-surface px-5 shadow-card transition-colors duration-200 last:border-b data-[state=open]:border-accent/40"
                >
                  <AccordionTrigger className="py-5 text-left text-[16px] font-bold tracking-tight hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pr-6 text-[15px] leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
