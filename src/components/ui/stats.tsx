/**
 * @registry-slug stats
 * @registry-name Stats
 * @registry-description A stats section with spring count-up numbers that animate when scrolled into view.
 * @registry-category layout
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export type StatsColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const accentMap: Record<StatsColor, string> = {
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

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  /** Decimal places to render. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Locale-aware thousands separators. */
  separated?: boolean;
}

const CountUp = ({ value, decimals = 0, prefix = "", suffix = "", separated = true, className, ...props }: CountUpProps) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useMotionValueEvent(spring, "change", (latest) => {
    const fixed = latest.toFixed(decimals);
    setDisplay(separated ? Number(fixed).toLocaleString(undefined, { minimumFractionDigits: decimals }) : fixed);
  });

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export interface StatItem {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  description?: string;
}

export interface StatsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  items: StatItem[];
  color?: StatsColor;
  variant?: "plain" | "card" | "divided";
}

const Stats = React.forwardRef<HTMLDivElement, StatsProps>(
  ({ className, items, color = "default", variant = "plain", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid gap-6 sm:grid-cols-2",
        // Tailwind needs literal class names — no dynamic construction.
        items.length === 3 && "lg:grid-cols-3",
        items.length >= 4 && "lg:grid-cols-4",
        variant === "divided" && "gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border/60",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className={cn(
            "flex flex-col items-center text-center gap-1.5",
            variant === "card" && "rounded-2xl border border-border/60 bg-background p-8 hover:shadow-lg hover:shadow-black/5 transition-shadow duration-300",
            variant === "divided" && "py-6 sm:py-0 sm:px-8"
          )}
        >
          <span className={cn("text-4xl md:text-5xl font-black tracking-tight", accentMap[color])}>
            <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} decimals={item.decimals} />
          </span>
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{item.label}</span>
          {item.description && <p className="text-xs text-muted-foreground/80 max-w-[24ch]">{item.description}</p>}
        </motion.div>
      ))}
    </div>
  )
);
Stats.displayName = "Stats";

export { Stats, CountUp };
