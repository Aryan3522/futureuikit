/**
 * @registry-slug pricing
 * @registry-name Pricing
 * @registry-description A premium pricing section with tier cards, a monthly/yearly toggle, and a highlighted plan.
 * @registry-category layout
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type PricingColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const accentMap: Record<PricingColor, { solid: string; text: string; ring: string; soft: string }> = {
  default: { solid: "bg-foreground text-background hover:bg-foreground/90", text: "text-foreground", ring: "ring-foreground/20", soft: "bg-muted" },
  blue: { solid: "bg-blue-600 text-white hover:bg-blue-600/90", text: "text-blue-600 dark:text-blue-400", ring: "ring-blue-600/40", soft: "bg-blue-600/10" },
  emerald: { solid: "bg-emerald-500 text-white hover:bg-emerald-500/90", text: "text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-500/40", soft: "bg-emerald-500/10" },
  rose: { solid: "bg-rose-500 text-white hover:bg-rose-500/90", text: "text-rose-600 dark:text-rose-400", ring: "ring-rose-500/40", soft: "bg-rose-500/10" },
  amber: { solid: "bg-amber-500 text-white hover:bg-amber-500/90", text: "text-amber-600 dark:text-amber-400", ring: "ring-amber-500/40", soft: "bg-amber-500/10" },
  violet: { solid: "bg-violet-600 text-white hover:bg-violet-600/90", text: "text-violet-600 dark:text-violet-400", ring: "ring-violet-600/40", soft: "bg-violet-600/10" },
  indigo: { solid: "bg-indigo-600 text-white hover:bg-indigo-600/90", text: "text-indigo-600 dark:text-indigo-400", ring: "ring-indigo-600/40", soft: "bg-indigo-600/10" },
  sky: { solid: "bg-sky-500 text-white hover:bg-sky-500/90", text: "text-sky-600 dark:text-sky-400", ring: "ring-sky-500/40", soft: "bg-sky-500/10" },
  slate: { solid: "bg-slate-600 text-white hover:bg-slate-600/90", text: "text-slate-600 dark:text-slate-400", ring: "ring-slate-600/40", soft: "bg-slate-600/10" },
  orange: { solid: "bg-orange-500 text-white hover:bg-orange-500/90", text: "text-orange-600 dark:text-orange-400", ring: "ring-orange-500/40", soft: "bg-orange-500/10" },
};

export interface PricingTier {
  name: string;
  description?: string;
  /** Monthly price. Strings ("Custom") render as-is. */
  monthly: number | string;
  /** Yearly price per month. Falls back to monthly when omitted. */
  yearly?: number | string;
  currency?: string;
  features: string[];
  cta?: string;
  onSelect?: () => void;
  /** Visually highlight this tier. */
  featured?: boolean;
  badge?: string;
}

export interface PricingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  tiers: PricingTier[];
  color?: PricingColor;
  /** Show the monthly/yearly toggle. */
  showToggle?: boolean;
  yearlyLabel?: string;
}

const Pricing = React.forwardRef<HTMLDivElement, PricingProps>(
  ({ className, tiers, color = "default", showToggle = true, yearlyLabel = "Save 20%", ...props }, ref) => {
    const [yearly, setYearly] = React.useState(false);
    const accent = accentMap[color];

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {showToggle && (
          <div className="mb-10 flex items-center justify-center gap-3">
            <span className={cn("text-sm font-medium", !yearly ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
            <button
              type="button"
              role="switch"
              aria-checked={yearly}
              aria-label="Toggle yearly billing"
              onClick={() => setYearly(!yearly)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full px-0.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                yearly ? accent.solid.split(" ")[0] : "bg-muted"
              )}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className={cn("block h-5 w-5 rounded-full bg-background shadow-sm", yearly && "ml-auto")}
              />
            </button>
            <span className={cn("text-sm font-medium", yearly ? "text-foreground" : "text-muted-foreground")}>
              Yearly
              <span className={cn("ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", accent.soft, accent.text)}>
                {yearlyLabel}
              </span>
            </span>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {tiers.map((tier, i) => {
            const price = yearly ? tier.yearly ?? tier.monthly : tier.monthly;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-background p-8 transition-shadow duration-300",
                  tier.featured
                    ? cn("border-transparent ring-2 shadow-xl shadow-black/5", accent.ring)
                    : "border-border/60 hover:shadow-lg hover:shadow-black/5"
                )}
              >
                {tier.featured && tier.badge && (
                  <span
                    className={cn(
                      "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                      accent.solid
                    )}
                  >
                    {tier.badge}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                {tier.description && <p className="mt-1.5 text-sm text-muted-foreground">{tier.description}</p>}
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-black tracking-tight text-foreground tabular-nums">
                    {typeof price === "number" ? `${tier.currency ?? "$"}${price}` : price}
                  </span>
                  {typeof price === "number" && <span className="text-sm text-muted-foreground">/month</span>}
                </div>
                <ul className="mt-8 flex flex-col gap-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className={cn("mt-0.5 size-4 shrink-0", accent.text)} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={tier.onSelect}
                  className={cn(
                    "mt-8 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background",
                    tier.featured
                      ? cn(accent.solid, "shadow-md")
                      : "border border-border text-foreground hover:bg-muted/60"
                  )}
                >
                  {tier.cta ?? "Get started"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }
);
Pricing.displayName = "Pricing";

export { Pricing };
