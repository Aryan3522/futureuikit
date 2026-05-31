/**
 * @registry-slug glowy
 * @registry-name Glowy Button
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type GlowyButtonVariant = "primary" | "success" | "warning" | "danger" | "info" | "secondary";

export interface GlowyButtonProps extends HTMLMotionProps<"button"> {
  variant?: GlowyButtonVariant;
  icon?: LucideIcon;
  color?: string;
  glowColor?: string;
}

export const GlowyButton = React.forwardRef<HTMLButtonElement, GlowyButtonProps>(
  ({ 
    className, 
    children, 
    variant = "primary",
    icon: Icon = ArrowRight,
    color,
    glowColor,
    disabled,
    ...props 
  }, ref) => {
    
    const intentColors: Record<GlowyButtonVariant, { base: string; glow: string; glass: string }> = {
      primary: { base: "#00afaf", glow: "rgba(0, 175, 175, 0.5)", glass: "rgba(0, 175, 175, 0.35)" },
      success: { base: "#10b981", glow: "rgba(16, 185, 129, 0.5)", glass: "rgba(16, 185, 129, 0.35)" },
      warning: { base: "#f59e0b", glow: "rgba(245, 158, 11, 0.5)", glass: "rgba(245, 158, 11, 0.35)" },
      danger: { base: "#ef4444", glow: "rgba(239, 68, 68, 0.5)", glass: "rgba(239, 68, 68, 0.35)" },
      info: { base: "#06b6d4", glow: "rgba(6, 182, 212, 0.5)", glass: "rgba(6, 182, 212, 0.35)" },
      secondary: { base: "#64748b", glow: "rgba(100, 116, 139, 0.5)", glass: "rgba(100, 116, 139, 0.35)" },
    };

    const theme = intentColors[variant] || intentColors.primary;
    const finalColor = color || theme.base;
    const finalGlow = glowColor || theme.glow;
    const finalGlass = theme.glass;

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        initial="initial"
        whileHover={!disabled ? "hover" : "initial"}
        whileTap={!disabled ? "hover" : "initial"}
        className={cn(
          "relative inline-flex items-center justify-center sm:min-w-42.5 h-12 rounded-full font-bold overflow-hidden",
          "bg-background text-foreground border-2",
          "w-full sm:w-auto",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className
        )}
        style={{
          borderColor: finalColor,
          boxShadow: `0 0 20px ${finalGlow}`,
        }}
        {...props}
      >
        <motion.div
          variants={{
            initial: { x: 0 },
            hover: { x: -18 }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative z-30 flex items-center justify-center pointer-events-none"
        >
          {children}
        </motion.div>

        <motion.div
          variants={{
            initial: { 
              width: "100%", 
              height: "100%", 
              right: 0, 
              top: 0,
              borderRadius: "999px",
            },
            hover: { 
              width: "40px", 
              height: "40px", 
              right: "2px", 
              top: "2px",
              borderRadius: "999px",
            }
          }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className="absolute z-20 flex items-center justify-center backdrop-blur-xl border border-black/10 dark:border-white/30 shadow-2xl pointer-events-none m-0 p-0"
          style={{
            backgroundColor: finalGlass,
          }}
        >
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0, x: 0, rotate: -45 },
              hover: { opacity: 1, scale: 1, x: 0, rotate: 0 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="flex items-center justify-center text-foreground"
          >
            <Icon size={20} />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-black/5 dark:via-white/10 to-transparent"
          variants={{
            initial: { x: "-100%" },
            hover: { x: "100%" }
          }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
        />
      </motion.button>
    );
  }
);

GlowyButton.displayName = "GlowyButton";