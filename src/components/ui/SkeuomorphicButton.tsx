"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * @registry-slug skeuomorphic-button
 * @registry-name Skeuomorphic Button
 * @registry-description A premium, production-ready skeuomorphic button with realistic depth, tactile interactions, and modern aesthetics.
 * @registry-category ui
 * @registry-type components:ui
 */

export type SkeuomorphicButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "glass"
  | "elevated"
  | "soft";

export type SkeuomorphicButtonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type SkeuomorphicButtonShape = "default" | "square" | "rounded" | "sharp";
export type SkeuomorphicButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface SkeuomorphicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SkeuomorphicButtonVariant;
  color?: SkeuomorphicButtonColor;
  spacing?: SkeuomorphicButtonSpacing;
  shape?: SkeuomorphicButtonShape;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  elevation?: "low" | "medium" | "high";
  glow?: boolean;
  pressedEffect?: boolean;
}

const colorMap: Record<SkeuomorphicButtonColor, string> = {
  default: "from-foreground/80 to-foreground shadow-black/40 dark:from-background dark:to-background/80 dark:shadow-white/20 dark:text-foreground text-background",
  blue: "from-blue-500 to-blue-600 shadow-blue-900/40 text-white",
  emerald: "from-emerald-500 to-emerald-600 shadow-emerald-900/40 text-white",
  rose: "from-rose-500 to-rose-600 shadow-rose-900/40 text-white",
  amber: "from-amber-400 to-amber-500 shadow-amber-900/40 text-amber-950",
  violet: "from-violet-500 to-violet-600 shadow-violet-900/40 text-white",
  indigo: "from-indigo-500 to-indigo-600 shadow-indigo-900/40 text-white",
  sky: "from-sky-400 to-sky-500 shadow-sky-900/40 text-sky-950",
  slate: "from-slate-500 to-slate-600 shadow-slate-900/40 text-white",
  orange: "from-orange-500 to-orange-600 shadow-orange-900/40 text-white",
};

const getShapeClass = (shape: SkeuomorphicButtonShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[2px]";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-md";
  }
};

const getSpacingStyles = (spacing: SkeuomorphicButtonSpacing) => {
  switch (spacing) {
    case "2x": return "px-3 py-1.5 text-xs";
    case "4x": return "px-4 py-2 text-sm";
    case "6x": return "px-6 py-3 text-base";
    case "8x": return "px-8 py-4 text-lg";
    default: return "px-5 py-2.5 text-sm";
  }
};

const getIconSize = (spacing: SkeuomorphicButtonSpacing) => {
  switch (spacing) {
    case "2x": return "[&>svg]:w-3.5 [&>svg]:h-3.5";
    case "4x": return "[&>svg]:w-4 [&>svg]:h-4";
    case "6x": return "[&>svg]:w-5 [&>svg]:h-5";
    case "8x": return "[&>svg]:w-6 [&>svg]:h-6";
    default: return "[&>svg]:w-4 [&>svg]:h-4";
  }
};

export const SkeuomorphicButton = React.forwardRef<
  HTMLButtonElement,
  SkeuomorphicButtonProps
>(
  (
    {
      variant = "primary",
      color = "default",
      spacing = "default",
      shape = "default",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      elevation = "medium",
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

    const baseStyles = cn(
      "relative inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer overflow-hidden",
      "font-medium tracking-tight select-none",
      "border-t border-white/20 border-l border-white/10",
      fullWidth && "w-full",
      getShapeClass(shape),
      getSpacingStyles(spacing),
      disabled && "opacity-50 cursor-not-allowed grayscale",
      className
    );

    const variantStyles = {
      primary: cn(
        "bg-gradient-to-b",
        colorMap[color],
        "shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.3)]",
        "active:shadow-[0_2px_0_0_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.3)]"
      ),
      secondary: cn(
        "bg-background text-foreground border-border",
        "shadow-[0_4px_0_0_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.1)]",
        "active:shadow-[0_2px_0_0_rgba(0,0,0,0.1),0_4px_8px_-2px_rgba(0,0,0,0.1)]"
      ),
      ghost: "bg-transparent hover:bg-accent border-none shadow-none text-muted-foreground",
      outline: cn(
        "bg-transparent border-2 border-border text-foreground hover:bg-accent",
        "shadow-[0_2px_0_0_rgba(0,0,0,0.05)] active:shadow-none"
      ),
      glass: cn(
        "bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 text-white",
        "shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)]",
        "hover:bg-white/20 transition-all"
      ),
      elevated: cn(
        "bg-muted text-foreground",
        "shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2),0_6px_6px_-3px_rgba(0,0,0,0.1),inset_0_2px_0_0_rgba(255,255,255,0.5)] dark:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5),0_6px_6px_-3px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
      ),
      soft: cn(
        "bg-muted text-foreground",
        "shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.15)]"
      ),
    };

    const getGlowStyles = () => {
      if (!glow) return "";
      return "after:absolute after:inset-0 after:z-[-1] after:blur-xl after:opacity-50 after:scale-110 after:bg-inherit hover:after:opacity-80 transition-all";
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled ? { y: -2, scale: 1.01 } : {}}
        whileTap={!disabled && pressedEffect ? { y: 2, scale: 0.98 } : {}}
        className={cn(baseStyles, variantStyles[variant], getGlowStyles())}
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
            <span className={cn("shrink-0 inline-flex items-center justify-center", getIconSize(spacing))}>{icon}</span>
          )}
          
          {children && <span className="truncate">{children}</span>}
          
          {!loading && icon && iconPosition === "right" && (
            <span className={cn("shrink-0 inline-flex items-center justify-center", getIconSize(spacing))}>{icon}</span>
          )}
        </div>

        {/* Glossy Overlay */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </motion.button>
    );
  }
);

SkeuomorphicButton.displayName = "SkeuomorphicButton";
