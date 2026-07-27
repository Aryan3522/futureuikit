/**
 * @registry-slug separator
 * @registry-name Separator
 * @registry-description Horizontal and vertical dividers with solid, dashed, and gradient styles plus inline labels.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-is-new
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type SeparatorColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const lineColorMap: Record<SeparatorColor, { solid: string; gradient: string }> = {
  default: { solid: "border-border", gradient: "from-transparent via-border to-transparent" },
  blue: { solid: "border-blue-600/50", gradient: "from-transparent via-blue-600/60 to-transparent" },
  emerald: { solid: "border-emerald-500/50", gradient: "from-transparent via-emerald-500/60 to-transparent" },
  rose: { solid: "border-rose-500/50", gradient: "from-transparent via-rose-500/60 to-transparent" },
  amber: { solid: "border-amber-500/50", gradient: "from-transparent via-amber-500/60 to-transparent" },
  violet: { solid: "border-violet-600/50", gradient: "from-transparent via-violet-600/60 to-transparent" },
  indigo: { solid: "border-indigo-600/50", gradient: "from-transparent via-indigo-600/60 to-transparent" },
  sky: { solid: "border-sky-500/50", gradient: "from-transparent via-sky-500/60 to-transparent" },
  slate: { solid: "border-slate-600/50", gradient: "from-transparent via-slate-600/60 to-transparent" },
  orange: { solid: "border-orange-500/50", gradient: "from-transparent via-orange-500/60 to-transparent" },
};

const separatorVariants = cva("shrink-0", {
  variants: {
    orientation: {
      horizontal: "w-full border-t",
      vertical: "self-stretch border-l",
    },
    variant: {
      solid: "",
      dashed: "border-dashed",
      dotted: "border-dotted",
      gradient: "border-0 bg-gradient-to-r",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", variant: "gradient", className: "h-px" },
    { orientation: "vertical", variant: "gradient", className: "w-px bg-gradient-to-b" },
  ],
  defaultVariants: { orientation: "horizontal", variant: "solid" },
});

export interface SeparatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof separatorVariants> {
  color?: SeparatorColor;
  /** Inline label rendered centered on the line (horizontal only). */
  label?: React.ReactNode;
  /** Set false when the separator is purely decorative but conveys structure. */
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", variant = "solid", color = "default", label, decorative = true, ...props }, ref) => {
    const palette = lineColorMap[color];
    const lineClass =
      variant === "gradient"
        ? palette.gradient
        : palette.solid;

    if (label && orientation === "horizontal") {
      return (
        <div
          ref={ref}
          role={decorative ? "none" : "separator"}
          className={cn("flex w-full items-center gap-4", className)}
          {...props}
        >
          <span className={cn(separatorVariants({ orientation, variant }), lineClass, "flex-1 w-auto")} />
          <span className="shrink-0 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
          <span className={cn(separatorVariants({ orientation, variant }), lineClass, "flex-1 w-auto")} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : (orientation ?? "horizontal")}
        className={cn(separatorVariants({ orientation, variant }), lineClass, className)}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator, separatorVariants };
