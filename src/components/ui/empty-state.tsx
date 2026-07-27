/**
 * @registry-slug empty-state
 * @registry-name Empty State
 * @registry-description A polished empty-state placeholder with icon, copy, and action slots.
 * @registry-category feedback
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type EmptyStateColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const iconAccentMap: Record<EmptyStateColor, string> = {
  default: "bg-muted text-muted-foreground",
  blue: "bg-blue-600/10 text-blue-600 dark:text-blue-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  violet: "bg-violet-600/10 text-violet-600 dark:text-violet-400",
  indigo: "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  slate: "bg-slate-600/10 text-slate-600 dark:text-slate-400",
  orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

const emptyStateVariants = cva("flex w-full flex-col items-center justify-center text-center", {
  variants: {
    variant: {
      plain: "",
      dashed: "rounded-2xl border-2 border-dashed border-border/70 bg-muted/20",
      card: "rounded-2xl border border-border/60 bg-background shadow-sm",
    },
    size: {
      sm: "gap-2 p-6",
      md: "gap-3 p-10",
      lg: "gap-4 p-16",
    },
  },
  defaultVariants: { variant: "dashed", size: "md" },
});

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "title">,
    VariantProps<typeof emptyStateVariants> {
  color?: EmptyStateColor;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Action buttons rendered under the copy. */
  actions?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, variant, size, color = "default", icon, title, description, actions, ...props }, ref) => (
    <div ref={ref} className={cn(emptyStateVariants({ variant, size }), className)} {...props}>
      {icon && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl [&_svg]:size-7",
            iconAccentMap[color]
          )}
        >
          {icon}
        </motion.span>
      )}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
      {actions && <div className="mt-2 flex flex-wrap items-center justify-center gap-3">{actions}</div>}
    </div>
  )
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
