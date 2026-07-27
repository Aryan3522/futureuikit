/**
 * @registry-slug stepper
 * @registry-name Stepper
 * @registry-description A multi-step progress indicator with animated connectors, spring check marks, and vertical mode.
 * @registry-category navigation
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type StepperColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const accentMap: Record<StepperColor, { solid: string; text: string; ring: string }> = {
  default: { solid: "bg-foreground text-background", text: "text-foreground", ring: "ring-foreground/30" },
  blue: { solid: "bg-blue-600 text-white", text: "text-blue-600 dark:text-blue-400", ring: "ring-blue-600/40" },
  emerald: { solid: "bg-emerald-500 text-white", text: "text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-500/40" },
  rose: { solid: "bg-rose-500 text-white", text: "text-rose-600 dark:text-rose-400", ring: "ring-rose-500/40" },
  amber: { solid: "bg-amber-500 text-white", text: "text-amber-600 dark:text-amber-400", ring: "ring-amber-500/40" },
  violet: { solid: "bg-violet-600 text-white", text: "text-violet-600 dark:text-violet-400", ring: "ring-violet-600/40" },
  indigo: { solid: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", ring: "ring-indigo-600/40" },
  sky: { solid: "bg-sky-500 text-white", text: "text-sky-600 dark:text-sky-400", ring: "ring-sky-500/40" },
  slate: { solid: "bg-slate-600 text-white", text: "text-slate-600 dark:text-slate-400", ring: "ring-slate-600/40" },
  orange: { solid: "bg-orange-500 text-white", text: "text-orange-600 dark:text-orange-400", ring: "ring-orange-500/40" },
};

export interface Step {
  title: string;
  description?: string;
  /** Custom indicator content; defaults to the step number. */
  icon?: React.ReactNode;
}

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  steps: Step[];
  /** Zero-based index of the current step. */
  current: number;
  color?: StepperColor;
  orientation?: "horizontal" | "vertical";
  /** Allow clicking completed steps to navigate back. */
  onStepClick?: (index: number) => void;
}

const CheckMark = () => (
  <svg viewBox="0 0 12 10" fill="none" className="size-3.5" aria-hidden="true">
    <motion.path
      d="M1 5.3 4.2 8.5 11 1.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  </svg>
);

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, steps, current, color = "default", orientation = "horizontal", onStepClick, ...props }, ref) => {
    const accent = accentMap[color];
    const isVertical = orientation === "vertical";

    return (
      <div
        ref={ref}
        className={cn("flex w-full", isVertical ? "flex-col" : "items-start", className)}
        {...props}
      >
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          const clickable = done && !!onStepClick;

          const indicator = (
            <motion.button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onStepClick(index)}
              aria-current={active ? "step" : undefined}
              aria-label={`Step ${index + 1}: ${step.title}`}
              animate={active ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.35 }}
              className={cn(
                "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                done || active ? accent.solid : "bg-muted text-muted-foreground",
                active && cn("ring-4", accent.ring),
                clickable ? "cursor-pointer" : "cursor-default"
              )}
            >
              {done ? <CheckMark /> : step.icon ?? index + 1}
            </motion.button>
          );

          const connector = index < steps.length - 1 && (
            <div
              aria-hidden="true"
              className={cn(
                "relative overflow-hidden bg-muted",
                isVertical ? "ml-[17px] h-8 w-0.5 my-1" : "mt-[17px] h-0.5 flex-1 mx-2"
              )}
            >
              <motion.div
                initial={false}
                animate={isVertical ? { height: done ? "100%" : "0%" } : { width: done ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn("absolute inset-0", accent.solid.split(" ")[0])}
              />
            </div>
          );

          const labels = (
            <div className={cn("flex flex-col", isVertical ? "pt-1.5" : "mt-3 items-center text-center")}>
              <span
                className={cn(
                  "text-sm font-semibold transition-colors duration-300",
                  active ? accent.text : done ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
              {step.description && (
                <span className="mt-0.5 text-xs text-muted-foreground max-w-[16ch]">{step.description}</span>
              )}
            </div>
          );

          if (isVertical) {
            return (
              <React.Fragment key={step.title}>
                <div className="flex items-start gap-4">
                  {indicator}
                  {labels}
                </div>
                {connector}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={step.title}>
              <div className="flex flex-col items-center min-w-0">
                {indicator}
                {labels}
              </div>
              {connector}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);
Stepper.displayName = "Stepper";

export { Stepper };
