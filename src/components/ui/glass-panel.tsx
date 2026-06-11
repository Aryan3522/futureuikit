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

const glassPanelVariants = cva(
  "rounded-xl border transition-all duration-300",
  {
    variants: {
      variant: {
        subtle: "bg-white/5 dark:bg-black/10 backdrop-blur-md border-white/20 dark:border-white/10 shadow-sm",
        mantle: "bg-white/10 dark:bg-black/20 backdrop-blur-xl border-white/30 dark:border-white/10 shadow-md",
        heavy: "bg-white/20 dark:bg-black/40 backdrop-blur-2xl border-white/40 dark:border-white/20 shadow-xl",
        frost: "bg-white/40 dark:bg-black/60 backdrop-blur-3xl border-white/50 dark:border-white/30 shadow-2xl ring-1 ring-white/10",
      },
      glow: {
        none: "",
        subtle: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
        luminous: "shadow-[0_0_30px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(139,92,246,0.35)] ring-1 ring-primary/20",
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
    VariantProps<typeof glassPanelVariants> {}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant, glow, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(glassPanelVariants({ variant, glow }), className)}
        {...props}
      />
    )
  }
)
GlassPanel.displayName = "GlassPanel"

export { GlassPanel, glassPanelVariants }
