/**
 * @registry-slug skeuomorphic-button
 * @registry-name Skeuomorphic Button
 * @registry-description A premium, production-ready skeuomorphic button with realistic depth, tactile interactions, and modern aesthetics.
 * @registry-category ui
 * @registry-type components:ui
 */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type SkeuomorphicButtonVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "link"
  | "glass"
  | "elevated"
  | "soft";

export type SkeuomorphicButtonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type SkeuomorphicButtonShape = "default" | "square" | "rounded" | "sharp";
export type SkeuomorphicButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type SkeuomorphicButtonSize = "default" | "sm" | "md" | "lg" | "xl";

const skeuomorphicButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer overflow-hidden font-medium tracking-tight select-none border-t border-white/20 border-l border-white/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale",
  {
    variants: {
      variant: {
        solid: "bg-gradient-to-b shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.3)] active:shadow-[0_2px_0_0_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.3)]",
        outline: "bg-transparent border-2 shadow-[0_2px_0_0_rgba(0,0,0,0.05)] active:shadow-none hover:bg-accent/10",
        ghost: "bg-transparent border-none shadow-none hover:bg-accent/10",
        link: "bg-transparent border-none shadow-none hover:underline underline-offset-4 border-t-0 border-l-0",
        glass: "backdrop-blur-md border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:brightness-110",
        elevated: "shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2),0_6px_6px_-3px_rgba(0,0,0,0.1),inset_0_2px_0_0_rgba(255,255,255,0.5)] dark:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5),0_6px_6px_-3px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-1 active:translate-y-0",
        soft: "shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.15)]",
      },
      color: {
        default: "",
        blue: "",
        emerald: "",
        rose: "",
        amber: "",
        violet: "",
        indigo: "",
        sky: "",
        slate: "",
        orange: "",
      },
      shape: {
        default: "rounded-md",
        square: "rounded-none",
        rounded: "rounded-xl",
        sharp: "rounded-[2px]",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
      spacing: {
        default: "px-5 py-2.5",
        "2x": "px-3 py-1.5",
        "4x": "px-4 py-2",
        "6x": "px-6 py-3",
        "8x": "px-8 py-4",
      },
    },
    compoundVariants: [
      // SOLID
      { variant: "solid", color: "default", className: "from-foreground/80 to-foreground shadow-black/40 dark:from-background dark:to-background/80 dark:shadow-white/20 dark:text-foreground text-background" },
      { variant: "solid", color: "blue", className: "from-blue-500 to-blue-600 shadow-blue-900/40 text-white" },
      { variant: "solid", color: "emerald", className: "from-emerald-500 to-emerald-600 shadow-emerald-900/40 text-white" },
      { variant: "solid", color: "rose", className: "from-rose-500 to-rose-600 shadow-rose-900/40 text-white" },
      { variant: "solid", color: "amber", className: "from-amber-400 to-amber-500 shadow-amber-900/40 text-amber-950" },
      { variant: "solid", color: "violet", className: "from-violet-500 to-violet-600 shadow-violet-900/40 text-white" },
      { variant: "solid", color: "indigo", className: "from-indigo-500 to-indigo-600 shadow-indigo-900/40 text-white" },
      { variant: "solid", color: "sky", className: "from-sky-400 to-sky-500 shadow-sky-900/40 text-sky-950" },
      { variant: "solid", color: "slate", className: "from-slate-500 to-slate-600 shadow-slate-900/40 text-white" },
      { variant: "solid", color: "orange", className: "from-orange-500 to-orange-600 shadow-orange-900/40 text-white" },
      
      // OUTLINE
      { variant: "outline", color: "default", className: "border-border text-foreground" },
      { variant: "outline", color: "blue", className: "border-blue-500 text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30" },
      { variant: "outline", color: "emerald", className: "border-emerald-500 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30" },
      { variant: "outline", color: "rose", className: "border-rose-500 text-rose-600 dark:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30" },
      { variant: "outline", color: "amber", className: "border-amber-500 text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30" },
      { variant: "outline", color: "violet", className: "border-violet-500 text-violet-600 dark:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/30" },
      { variant: "outline", color: "indigo", className: "border-indigo-500 text-indigo-600 dark:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30" },
      { variant: "outline", color: "sky", className: "border-sky-500 text-sky-600 dark:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30" },
      { variant: "outline", color: "slate", className: "border-slate-500 text-slate-600 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-950/30" },
      { variant: "outline", color: "orange", className: "border-orange-500 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30" },
      
      // GHOST & LINK (Share same text color)
      { variant: ["ghost", "link"], color: "default", className: "text-foreground hover:bg-accent" },
      { variant: ["ghost", "link"], color: "blue", className: "text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30" },
      { variant: ["ghost", "link"], color: "emerald", className: "text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30" },
      { variant: ["ghost", "link"], color: "rose", className: "text-rose-600 dark:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30" },
      { variant: ["ghost", "link"], color: "amber", className: "text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30" },
      { variant: ["ghost", "link"], color: "violet", className: "text-violet-600 dark:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/30" },
      { variant: ["ghost", "link"], color: "indigo", className: "text-indigo-600 dark:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30" },
      { variant: ["ghost", "link"], color: "sky", className: "text-sky-600 dark:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30" },
      { variant: ["ghost", "link"], color: "slate", className: "text-slate-600 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-950/30" },
      { variant: ["ghost", "link"], color: "orange", className: "text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30" },
      
      // GLASS
      { variant: "glass", color: "default", className: "bg-white/10 dark:bg-black/20 text-foreground" },
      { variant: "glass", color: "blue", className: "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30" },
      { variant: "glass", color: "emerald", className: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" },
      { variant: "glass", color: "rose", className: "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30" },
      { variant: "glass", color: "amber", className: "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30" },
      { variant: "glass", color: "violet", className: "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/30" },
      { variant: "glass", color: "indigo", className: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30" },
      { variant: "glass", color: "sky", className: "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30" },
      { variant: "glass", color: "slate", className: "bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/30" },
      { variant: "glass", color: "orange", className: "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30" },

      // ELEVATED
      { variant: "elevated", color: "default", className: "bg-background text-foreground" },
      { variant: "elevated", color: "blue", className: "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-blue-500/20" },
      { variant: "elevated", color: "emerald", className: "bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 shadow-emerald-500/20" },
      { variant: "elevated", color: "rose", className: "bg-rose-50 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 shadow-rose-500/20" },
      { variant: "elevated", color: "amber", className: "bg-amber-50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 shadow-amber-500/20" },
      { variant: "elevated", color: "violet", className: "bg-violet-50 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 shadow-violet-500/20" },
      { variant: "elevated", color: "indigo", className: "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 shadow-indigo-500/20" },
      { variant: "elevated", color: "sky", className: "bg-sky-50 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 shadow-sky-500/20" },
      { variant: "elevated", color: "slate", className: "bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 shadow-slate-500/20" },
      { variant: "elevated", color: "orange", className: "bg-orange-50 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 shadow-orange-500/20" },

      // SOFT
      { variant: "soft", color: "default", className: "bg-muted text-foreground" },
      { variant: "soft", color: "blue", className: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400" },
      { variant: "soft", color: "emerald", className: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400" },
      { variant: "soft", color: "rose", className: "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400" },
      { variant: "soft", color: "amber", className: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400" },
      { variant: "soft", color: "violet", className: "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-400" },
      { variant: "soft", color: "indigo", className: "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400" },
      { variant: "soft", color: "sky", className: "bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-400" },
      { variant: "soft", color: "slate", className: "bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-400" },
      { variant: "soft", color: "orange", className: "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-400" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      shape: "default",
      size: "default",
      spacing: "default",
    },
  }
);

export interface SkeuomorphicButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, VariantProps<typeof skeuomorphicButtonVariants> {
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  glow?: boolean;
  pressedEffect?: boolean;
}

const getIconSize = (size: SkeuomorphicButtonSize | null | undefined) => {
  switch (size) {
    case "sm": return "[&>svg]:w-3.5 [&>svg]:h-3.5";
    case "md": return "[&>svg]:w-4 [&>svg]:h-4";
    case "lg": return "[&>svg]:w-5 [&>svg]:h-5";
    case "xl": return "[&>svg]:w-6 [&>svg]:h-6";
    default: return "[&>svg]:w-4 [&>svg]:h-4";
  }
};

export const SkeuomorphicButton = React.forwardRef<
  HTMLButtonElement,
  SkeuomorphicButtonProps
>(
  (
    {
      variant = "solid",
      color = "default",
      spacing = "default",
      shape = "default",
      size = "default",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      glow = false,
      pressedEffect = true,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Filter out props that might conflict with motion.button
    const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...filteredProps } = props as any;

    const getGlowStyles = () => {
      if (!glow) return "";
      return "after:absolute after:inset-0 after:z-[-1] after:blur-xl after:opacity-50 after:scale-110 after:bg-inherit hover:after:opacity-80 transition-all";
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled ? { y: -2, scale: 1.01 } : {}}
        whileTap={!disabled && pressedEffect ? { y: 2, scale: 0.98 } : {}}
        className={cn(skeuomorphicButtonVariants({ variant, color, shape, size, spacing }), getGlowStyles(), fullWidth && "w-full", className)}
        disabled={disabled || loading}
        {...filteredProps}
      >
        {/* Reflection Highlight */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-gradient-to-tr from-white/0 via-white/30 to-white/60 mix-blend-overlay" />
        
        {/* Inner Bevel */}
        <div className="absolute inset-[1px] z-0 pointer-events-none rounded-[inherit] border-t border-white/30 border-l border-white/20" />
        
        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading && (
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          )}
          
          {!loading && icon && iconPosition === "left" && (
            <span className={cn("shrink-0 inline-flex items-center justify-center", getIconSize(size))}>{icon}</span>
          )}
          
          {children && <span className="truncate">{children}</span>}
          
          {!loading && icon && iconPosition === "right" && (
            <span className={cn("shrink-0 inline-flex items-center justify-center", getIconSize(size))}>{icon}</span>
          )}
        </div>

        {/* Glossy Overlay */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </motion.button>
    );
  }
);

SkeuomorphicButton.displayName = "SkeuomorphicButton";
