import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqTabsData = Record<string, { question: string; answer: string }[]>;

/**
 * Tabbed FAQ: animated category tabs with a sliding active highlight and
 * accordion items with a rotating plus icon. Only one item open at a time.
 */
export function FAQ({
  title = "FAQs",
  subtitle = "Frequently Asked Questions",
  categories,
  faqData,
  className,
}: {
  title?: string;
  subtitle?: string;
  categories: Record<string, string>;
  faqData: FaqTabsData;
  className?: string;
}) {
  const keys = Object.keys(categories);
  const [selected, setSelected] = useState(keys[0]);

  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)}>
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabs categories={categories} selected={selected} setSelected={setSelected} />
      <FAQList faqData={faqData} selected={selected} />
    </div>
  );
}

function FAQHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{subtitle}</span>
      <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-balance md:text-[44px]">
        {title}
      </h2>
    </div>
  );
}

function FAQTabs({
  categories,
  selected,
  setSelected,
}: {
  categories: Record<string, string>;
  selected: string;
  setSelected: (k: string) => void;
}) {
  return (
    <div className="filter-row mt-10 flex flex-nowrap gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible">
      {Object.entries(categories).map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => setSelected(key)}
          aria-pressed={selected === key}
          className={cn(
            "relative overflow-hidden whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors duration-200",
            selected === key
              ? "border-accent text-accent-foreground"
              : "border-border bg-background/60 text-muted-foreground backdrop-blur hover:text-foreground",
          )}
        >
          <span className="relative z-10">{label}</span>
          <AnimatePresence>
            {selected === key && (
              <motion.span
                layoutId="faq-tab-highlight"
                className="absolute inset-0 z-0 bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
}

function FAQList({ faqData, selected }: { faqData: FaqTabsData; selected: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const items = faqData[selected] ?? [];
  return (
    <div className="mt-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="space-y-3"
        >
          {items.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={open === faq.question}
              onToggle={() => setOpen(open === faq.question ? null : faq.question)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-surface/70 shadow-card backdrop-blur-md transition-colors duration-200",
        isOpen ? "border-accent/40" : "border-border",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <span className="text-[16px] font-bold tracking-tight">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full border",
            isOpen ? "border-accent text-accent" : "border-border text-muted-foreground",
          )}
        >
          <Plus className="size-4" aria-hidden />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <p className="px-5 pb-5 pr-10 text-[15px] leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
