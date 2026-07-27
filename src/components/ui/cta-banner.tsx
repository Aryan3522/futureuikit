/**
 * @registry-slug cta-banner
 * @registry-name CTA Banner
 * @registry-description A call-to-action section with gradient, glass, and outline styles plus animated entrance.
 * @registry-category layout
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type CTAColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const gradientMap: Record<CTAColor, string> = {
  default: "from-foreground via-foreground to-foreground/80 text-background",
  blue: "from-blue-600 via-blue-600 to-indigo-600 text-white",
  emerald: "from-emerald-500 via-emerald-500 to-teal-600 text-white",
  rose: "from-rose-500 via-rose-500 to-pink-600 text-white",
  amber: "from-amber-500 via-amber-500 to-orange-600 text-white",
  violet: "from-violet-600 via-violet-600 to-purple-600 text-white",
  indigo: "from-indigo-600 via-indigo-600 to-blue-600 text-white",
  sky: "from-sky-500 via-sky-500 to-cyan-600 text-white",
  slate: "from-slate-600 via-slate-600 to-slate-800 text-white",
  orange: "from-orange-500 via-orange-500 to-red-500 text-white",
};

const glowMap: Record<CTAColor, string> = {
  default: "bg-foreground/10",
  blue: "bg-blue-600/20",
  emerald: "bg-emerald-500/20",
  rose: "bg-rose-500/20",
  amber: "bg-amber-500/20",
  violet: "bg-violet-600/20",
  indigo: "bg-indigo-600/20",
  sky: "bg-sky-500/20",
  slate: "bg-slate-600/20",
  orange: "bg-orange-500/20",
};

export interface CTABannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "title"> {
  color?: CTAColor;
  variant?: "gradient" | "glass" | "outline";
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Action buttons / links rendered under the copy. */
  actions?: React.ReactNode;
  align?: "center" | "start";
}

const CTABanner = React.forwardRef<HTMLDivElement, CTABannerProps>(
  ({ className, color = "default", variant = "gradient", eyebrow, title, description, actions, align = "center", ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl p-10 md:p-16",
        variant === "gradient" && cn("bg-gradient-to-br", gradientMap[color]),
        variant === "glass" && "border border-border/50 bg-background/60 backdrop-blur-xl text-foreground",
        variant === "outline" && "border border-border bg-background text-foreground",
        className
      )}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {variant !== "gradient" && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full blur-3xl",
            glowMap[color]
          )}
        />
      )}
      <div
        className={cn(
          "relative z-10 flex flex-col gap-4 max-w-2xl",
          align === "center" && "items-center text-center mx-auto"
        )}
      >
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">{eyebrow}</span>
        )}
        <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">{title}</h2>
        {description && <p className="text-sm md:text-base leading-relaxed opacity-80">{description}</p>}
        {actions && <div className={cn("mt-4 flex flex-wrap gap-3", align === "center" && "justify-center")}>{actions}</div>}
      </div>
    </motion.div>
  )
);
CTABanner.displayName = "CTABanner";

export { CTABanner };
