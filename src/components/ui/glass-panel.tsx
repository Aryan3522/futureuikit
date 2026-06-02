/**
 * @registry-slug glass-panel
 * @registry-name Glass Panel
 */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

const glassPanelVariants = cva(
  "rounded-xl border border-foreground/10 transition-all duration-300",
  {
    variants: {
      variant: {
        mantle: "bg-foreground/[0.03] backdrop-blur-[20px]",
        heavy: "bg-foreground/[0.02] backdrop-blur-[40px]",
      },
      glow: {
        none: "",
        subtle: "hover:box-shadow-[0_0_30px_rgba(139,92,246,0.1)]",
        luminous: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
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
