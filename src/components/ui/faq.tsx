/**
 * @registry-slug faq
 * @registry-name FAQ
 * @registry-description A frequently-asked-questions section with smooth height animation and accessible disclosure.
 * @registry-category layout
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type FAQColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const accentMap: Record<FAQColor, string> = {
  default: "text-foreground",
  blue: "text-blue-600 dark:text-blue-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  rose: "text-rose-600 dark:text-rose-400",
  amber: "text-amber-600 dark:text-amber-400",
  violet: "text-violet-600 dark:text-violet-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  sky: "text-sky-600 dark:text-sky-400",
  slate: "text-slate-600 dark:text-slate-400",
  orange: "text-orange-600 dark:text-orange-400",
};

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  items: FAQItem[];
  color?: FAQColor;
  variant?: "list" | "card" | "split";
  /** Allow several items open at once. */
  allowMultiple?: boolean;
  /** Index opened by default; -1 for none. */
  defaultOpen?: number;
}

const FAQ = React.forwardRef<HTMLDivElement, FAQProps>(
  ({ className, items, color = "default", variant = "list", allowMultiple = false, defaultOpen = 0, ...props }, ref) => {
    const [open, setOpen] = React.useState<number[]>(defaultOpen >= 0 ? [defaultOpen] : []);
    const baseId = React.useId();

    const toggle = (index: number) => {
      setOpen((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : allowMultiple
            ? [...prev, index]
            : [index]
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col",
          variant === "list" && "divide-y divide-border/60",
          variant === "card" && "gap-3",
          variant === "split" && "gap-3 sm:grid sm:grid-cols-2 sm:items-start",
          className
        )}
        {...props}
      >
        {items.map((item, index) => {
          const isOpen = open.includes(index);
          return (
            <div
              key={index}
              className={cn(
                variant !== "list" &&
                  "rounded-2xl border border-border/60 bg-background transition-colors duration-300 hover:border-border"
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${index}`}
                id={`${baseId}-trigger-${index}`}
                onClick={() => toggle(index)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 text-left font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-xl",
                  variant === "list" ? "py-5" : "p-5"
                )}
              >
                <span className="text-sm md:text-base">{item.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={cn("shrink-0", isOpen ? accentMap[color] : "text-muted-foreground")}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${baseId}-panel-${index}`}
                    role="region"
                    aria-labelledby={`${baseId}-trigger-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className={cn(
                        "text-sm leading-relaxed text-muted-foreground",
                        variant === "list" ? "pb-5 pr-8" : "px-5 pb-5 pr-10"
                      )}
                    >
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }
);
FAQ.displayName = "FAQ";

export { FAQ };
