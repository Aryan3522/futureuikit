/**
 * @registry-slug progress
 * @registry-name Progress
 * @registry-description Animated linear and circular progress indicators with colors and sizes.
 * @registry-category ui
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

export type ProgressColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const barColorMap: Record<ProgressColor, string> = {
  default: "bg-foreground",
  blue: "bg-blue-600",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  violet: "bg-violet-600",
  indigo: "bg-indigo-600",
  sky: "bg-sky-500",
  slate: "bg-slate-600",
  orange: "bg-orange-500",
};

const strokeColorMap: Record<ProgressColor, string> = {
  default: "stroke-foreground",
  blue: "stroke-blue-600",
  emerald: "stroke-emerald-500",
  rose: "stroke-rose-500",
  amber: "stroke-amber-500",
  violet: "stroke-violet-600",
  indigo: "stroke-indigo-600",
  sky: "stroke-sky-500",
  slate: "stroke-slate-600",
  orange: "stroke-orange-500",
};

const trackVariants = cva("relative w-full overflow-hidden bg-muted", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    },
    shape: {
      default: "rounded-full",
      square: "rounded-none",
      rounded: "rounded-full",
      sharp: "rounded-[2px]",
    },
  },
  defaultVariants: { size: "md", shape: "default" },
});

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof trackVariants> {
  /** Current value, 0–max. */
  value?: number;
  max?: number;
  color?: ProgressColor;
  /** Show the percentage label after the bar. */
  showValue?: boolean;
  /** Indeterminate loading state. */
  indeterminate?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, color = "default", size, shape, showValue, indeterminate, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div ref={ref} className={cn("flex w-full items-center gap-3", className)} {...props}>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          className={cn(trackVariants({ size, shape }))}
        >
          {indeterminate ? (
            <motion.div
              className={cn("absolute inset-y-0 w-1/3 rounded-full", barColorMap[color])}
              animate={{ x: ["-120%", "340%"] }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
            />
          ) : (
            <motion.div
              className={cn("h-full rounded-full", barColorMap[color])}
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 24 }}
            />
          )}
        </div>
        {showValue && !indeterminate && (
          <span className="text-xs font-semibold tabular-nums text-muted-foreground w-9 text-right shrink-0">
            {Math.round(pct)}%
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

export interface CircularProgressProps extends Omit<React.SVGAttributes<SVGSVGElement>, "color"> {
  value?: number;
  max?: number;
  color?: ProgressColor;
  /** Diameter in pixels. */
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
}

const CircularProgress = ({
  value = 0,
  max = 100,
  color = "default",
  size = 64,
  strokeWidth = 6,
  showValue,
  className,
  ...props
}: CircularProgressProps) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn("-rotate-90", className)}
        {...props}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={false}
          animate={{ strokeDashoffset: circumference - (pct / 100) * circumference }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
          className={strokeColorMap[color]}
        />
      </svg>
      {showValue && (
        <span className="absolute text-xs font-bold tabular-nums text-foreground">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
};

export { Progress, CircularProgress };
