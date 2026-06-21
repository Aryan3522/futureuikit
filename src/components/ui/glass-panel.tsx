/**
 * @registry-slug glass-panel
 * @registry-name Glass Panel
 * @registry-description A Future UI Glass Panel component.
 * @registry-category ui
 */
"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type GlassPanelColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type GlassPanelShape = "default" | "square" | "rounded" | "sharp";
export type GlassPanelSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export const colorThemeMap: Record<GlassPanelColor, { subtle: string; mantle: string; heavy: string; frost: string; glowSubtle: string; glowLuminous: string; }> = {
  default: {
    subtle: "bg-background/40 border-border/20 backdrop-blur-md",
    mantle: "bg-background/60 border-border/20 backdrop-blur-xl",
    heavy: "bg-background/80 border-border/30 backdrop-blur-2xl",
    frost: "bg-background/90 border-border/40 backdrop-blur-3xl ring-1 ring-border/10",
    glowSubtle: "hover:shadow-[0_0_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]",
    glowLuminous: "shadow-[0_0_30px_rgba(0,0,0,0.12)] hover:shadow-[0_0_40px_rgba(0,0,0,0.18)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] ring-1 ring-border/10",
  },
  blue: {
    subtle: "bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/20 dark:border-blue-500/10",
    mantle: "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30 dark:border-blue-500/10",
    heavy: "bg-blue-500/20 dark:bg-blue-500/30 border-blue-500/40 dark:border-blue-500/20",
    frost: "bg-blue-500/30 dark:bg-blue-500/40 border-blue-500/50 dark:border-blue-500/30 ring-1 ring-blue-500/20",
    glowSubtle: "hover:shadow-lg hover:shadow-blue-500/15",
    glowLuminous: "shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 ring-1 ring-blue-500/30",
  },
  emerald: {
    subtle: "bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 dark:border-emerald-500/10",
    mantle: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30 dark:border-emerald-500/10",
    heavy: "bg-emerald-500/20 dark:bg-emerald-500/30 border-emerald-500/40 dark:border-emerald-500/20",
    frost: "bg-emerald-500/30 dark:bg-emerald-500/40 border-emerald-500/50 dark:border-emerald-500/30 ring-1 ring-emerald-500/20",
    glowSubtle: "hover:shadow-lg hover:shadow-emerald-500/15",
    glowLuminous: "shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 ring-1 ring-emerald-500/30",
  },
  rose: {
    subtle: "bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/20 dark:border-rose-500/10",
    mantle: "bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/30 dark:border-rose-500/10",
    heavy: "bg-rose-500/20 dark:bg-rose-500/30 border-rose-500/40 dark:border-rose-500/20",
    frost: "bg-rose-500/30 dark:bg-rose-500/40 border-rose-500/50 dark:border-rose-500/30 ring-1 ring-rose-500/20",
    glowSubtle: "hover:shadow-lg hover:shadow-rose-500/15",
    glowLuminous: "shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 ring-1 ring-rose-500/30",
  },
  amber: {
    subtle: "bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/20 dark:border-amber-500/10",
    mantle: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30 dark:border-amber-500/10",
    heavy: "bg-amber-500/20 dark:bg-amber-500/30 border-amber-500/40 dark:border-amber-500/20",
    frost: "bg-amber-500/30 dark:bg-amber-500/40 border-amber-500/50 dark:border-amber-500/30 ring-1 ring-amber-500/20",
    glowSubtle: "hover:shadow-lg hover:shadow-amber-500/15",
    glowLuminous: "shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 ring-1 ring-amber-500/30",
  },
  violet: {
    subtle: "bg-violet-500/5 dark:bg-violet-500/10 border-violet-500/20 dark:border-violet-500/10",
    mantle: "bg-violet-500/10 dark:bg-violet-500/20 border-violet-500/30 dark:border-violet-500/10",
    heavy: "bg-violet-500/20 dark:bg-violet-500/30 border-violet-500/40 dark:border-violet-500/20",
    frost: "bg-violet-500/30 dark:bg-violet-500/40 border-violet-500/50 dark:border-violet-500/30 ring-1 ring-violet-500/20",
    glowSubtle: "hover:shadow-lg hover:shadow-violet-500/15",
    glowLuminous: "shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/35 ring-1 ring-violet-500/30",
  },
  indigo: {
    subtle: "bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-500/20 dark:border-indigo-500/10",
    mantle: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/30 dark:border-indigo-500/10",
    heavy: "bg-indigo-500/20 dark:bg-indigo-500/30 border-indigo-500/40 dark:border-indigo-500/20",
    frost: "bg-indigo-500/30 dark:bg-indigo-500/40 border-indigo-500/50 dark:border-indigo-500/30 ring-1 ring-indigo-500/20",
    glowSubtle: "hover:shadow-lg hover:shadow-indigo-500/15",
    glowLuminous: "shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 ring-1 ring-indigo-500/30",
  },
  sky: {
    subtle: "bg-sky-500/5 dark:bg-sky-500/10 border-sky-500/20 dark:border-sky-500/10",
    mantle: "bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/30 dark:border-sky-500/10",
    heavy: "bg-sky-500/20 dark:bg-sky-500/30 border-sky-500/40 dark:border-sky-500/20",
    frost: "bg-sky-500/30 dark:bg-sky-500/40 border-sky-500/50 dark:border-sky-500/30 ring-1 ring-sky-500/20",
    glowSubtle: "hover:shadow-lg hover:shadow-sky-500/15",
    glowLuminous: "shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 ring-1 ring-sky-500/30",
  },
  slate: {
    subtle: "bg-slate-500/5 dark:bg-slate-500/10 border-slate-500/20 dark:border-slate-500/10",
    mantle: "bg-slate-500/10 dark:bg-slate-500/20 border-slate-500/30 dark:border-slate-500/10",
    heavy: "bg-slate-500/20 dark:bg-slate-500/30 border-slate-500/40 dark:border-slate-500/20",
    frost: "bg-slate-500/30 dark:bg-slate-500/40 border-slate-500/50 dark:border-slate-500/30 ring-1 ring-slate-500/20",
    glowSubtle: "hover:shadow-lg hover:shadow-slate-500/15",
    glowLuminous: "shadow-lg shadow-slate-500/25 hover:shadow-xl hover:shadow-slate-500/35 ring-1 ring-slate-500/30",
  },
  orange: {
    subtle: "bg-orange-500/5 dark:bg-orange-500/10 border-orange-500/20 dark:border-orange-500/10",
    mantle: "bg-orange-500/10 dark:bg-orange-500/20 border-orange-500/30 dark:border-orange-500/10",
    heavy: "bg-orange-500/20 dark:bg-orange-500/30 border-orange-500/40 dark:border-orange-500/20",
    frost: "bg-orange-500/30 dark:bg-orange-500/40 border-orange-500/50 dark:border-orange-500/30 ring-1 ring-orange-500/20",
    glowSubtle: "hover:shadow-lg hover:shadow-orange-500/15",
    glowLuminous: "shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 ring-1 ring-orange-500/30",
  }
};

const getShapeClass = (shape: GlassPanelShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-xl";
  }
};

const getSpacingClass = (spacing: GlassPanelSpacing) => {
  switch (spacing) {
    case "2x": return "p-2";
    case "4x": return "p-4";
    case "6x": return "p-8";
    case "8x": return "p-12";
    default: return "p-6";
  }
};

const glassPanelVariants = cva(
  "border transition-all duration-300",
  {
    variants: {
      variant: {
        subtle: "backdrop-blur-md shadow-sm",
        mantle: "backdrop-blur-xl shadow-md",
        heavy: "backdrop-blur-2xl shadow-xl",
        frost: "backdrop-blur-3xl shadow-2xl",
      },
      glow: {
        none: "",
        subtle: "", // Added via theme map
        luminous: "", // Added via theme map
      }
    },
    defaultVariants: {
      variant: "mantle",
      glow: "none",
    },
  }
)

export interface GlassPanelProps
  extends Omit<HTMLMotionProps<"div">, "color" | "transition">,
    VariantProps<typeof glassPanelVariants> {
      color?: GlassPanelColor;
      shape?: GlassPanelShape;
      spacing?: GlassPanelSpacing;
    }

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = "mantle", glow = "none", color = "default", shape = "default", spacing = "default", ...props }, ref) => {
    const activeTheme = colorThemeMap[color];
    
    let themeClasses = "";
    if (variant === "subtle") themeClasses = activeTheme.subtle;
    else if (variant === "mantle") themeClasses = activeTheme.mantle;
    else if (variant === "heavy") themeClasses = activeTheme.heavy;
    else if (variant === "frost") themeClasses = activeTheme.frost;

    let glowClasses = "";
    if (glow === "subtle") glowClasses = activeTheme.glowSubtle;
    else if (glow === "luminous") glowClasses = activeTheme.glowLuminous;

    return (
      <motion.div
        ref={ref}
        className={cn(glassPanelVariants({ variant, glow }), themeClasses, glowClasses, getShapeClass(shape), getSpacingClass(spacing), className)}
        {...props}
      />
    )
  }
)
GlassPanel.displayName = "GlassPanel"

export { GlassPanel, glassPanelVariants }
