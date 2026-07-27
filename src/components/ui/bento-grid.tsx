/**
 * @registry-slug bento-grid
 * @registry-name Bento Grid
 * @registry-description A responsive bento feature grid with spanning tiles, hover glow, and staggered reveals.
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

export type BentoColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const glowMap: Record<BentoColor, { icon: string; glow: string }> = {
  default: { icon: "bg-muted text-foreground", glow: "from-foreground/10" },
  blue: { icon: "bg-blue-600/10 text-blue-600 dark:text-blue-400", glow: "from-blue-600/20" },
  emerald: { icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", glow: "from-emerald-500/20" },
  rose: { icon: "bg-rose-500/10 text-rose-600 dark:text-rose-400", glow: "from-rose-500/20" },
  amber: { icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400", glow: "from-amber-500/20" },
  violet: { icon: "bg-violet-600/10 text-violet-600 dark:text-violet-400", glow: "from-violet-600/20" },
  indigo: { icon: "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400", glow: "from-indigo-600/20" },
  sky: { icon: "bg-sky-500/10 text-sky-600 dark:text-sky-400", glow: "from-sky-500/20" },
  slate: { icon: "bg-slate-600/10 text-slate-600 dark:text-slate-400", glow: "from-slate-600/20" },
  orange: { icon: "bg-orange-500/10 text-orange-600 dark:text-orange-400", glow: "from-orange-500/20" },
};

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns on large screens. */
  columns?: 2 | 3 | 4;
}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, columns = 3, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid gap-4 auto-rows-[minmax(160px,auto)]",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    />
  )
);
BentoGrid.displayName = "BentoGrid";

export interface BentoItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "title"> {
  color?: BentoColor;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Column span on large screens. */
  colSpan?: 1 | 2 | 3;
  /** Row span. */
  rowSpan?: 1 | 2;
  /** Optional visual filling the tile behind the text. */
  background?: React.ReactNode;
}

const BentoItem = React.forwardRef<HTMLDivElement, BentoItemProps>(
  ({ className, color = "default", icon, title, description, colSpan = 1, rowSpan = 1, background, children, ...props }, ref) => {
    const palette = glowMap[color];
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border/60 bg-background p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5",
          colSpan === 2 && "sm:col-span-2",
          colSpan === 3 && "sm:col-span-2 lg:col-span-3",
          rowSpan === 2 && "row-span-2",
          className
        )}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            palette.glow
          )}
        />
        {background && <div className="absolute inset-0 -z-0">{background}</div>}
        <div className="relative z-10 flex flex-col gap-3">
          {icon && (
            <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl [&_svg]:size-5", palette.icon)}>
              {icon}
            </span>
          )}
          {title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}
          {description && <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>}
          {children}
        </div>
      </motion.div>
    );
  }
);
BentoItem.displayName = "BentoItem";

export { BentoGrid, BentoItem };
