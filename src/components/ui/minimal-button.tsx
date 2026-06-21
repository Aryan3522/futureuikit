"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * @registry-slug minimal-button
 * @registry-name Minimal Button
 * @registry-description An ultra-clean, premium, modern button inspired by Vercel, Linear, and Stripe. Focuses on typography, precise spacing, and subtle interactions.
 * @registry-category ui
 * @registry-type components:ui
 */

export type MinimalButtonVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "soft"
  | "link";

export type MinimalButtonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type MinimalButtonShape = "default" | "square" | "rounded" | "sharp";
export type MinimalButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface MinimalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MinimalButtonVariant;
  color?: MinimalButtonColor;
  spacing?: MinimalButtonSpacing;
  shape?: MinimalButtonShape;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const colorVariants: Record<MinimalButtonColor, { solid: string, soft: string, ghost: string, outline: string }> = {
  default: { 
    solid: "bg-foreground text-background hover:bg-foreground/90", 
    soft: "bg-muted text-foreground hover:bg-accent", 
    ghost: "text-foreground hover:bg-accent", 
    outline: "border-border text-foreground hover:bg-accent" 
  },
  blue: { solid: "bg-blue-600 text-white hover:bg-blue-700", soft: "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20", ghost: "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10", outline: "border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950" },
  emerald: { solid: "bg-emerald-600 text-white hover:bg-emerald-700", soft: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20", ghost: "text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10", outline: "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950" },
  rose: { solid: "bg-rose-600 text-white hover:bg-rose-700", soft: "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20", ghost: "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10", outline: "border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950" },
  amber: { solid: "bg-amber-500 text-zinc-950 hover:bg-amber-600", soft: "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20", ghost: "text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10", outline: "border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950" },
  violet: { solid: "bg-violet-600 text-white hover:bg-violet-700", soft: "bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400 dark:hover:bg-violet-500/20", ghost: "text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-500/10", outline: "border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-400 dark:hover:bg-violet-950" },
  indigo: { solid: "bg-indigo-600 text-white hover:bg-indigo-700", soft: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20", ghost: "text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10", outline: "border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950" },
  sky: { solid: "bg-sky-500 text-white hover:bg-sky-600", soft: "bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20", ghost: "text-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-500/10", outline: "border-sky-200 text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:text-sky-400 dark:hover:bg-sky-950" },
  slate: { solid: "bg-slate-600 text-white hover:bg-slate-700", soft: "bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-500/10 dark:text-slate-400 dark:hover:bg-slate-500/20", ghost: "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-500/10", outline: "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-950" },
  orange: { solid: "bg-orange-600 text-white hover:bg-orange-700", soft: "bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20", ghost: "text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-500/10", outline: "border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950" },
};

const getShapeClass = (shape: MinimalButtonShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "rounded": return "rounded-xl";
    case "sharp": return "rounded-[2px]";
    case "default": return "rounded-full";
  }
};

const getSpacingClass = (spacing: MinimalButtonSpacing) => {
  switch (spacing) {
    case "2x": return "h-8 px-3 text-xs";
    case "4x": return "h-10 px-5 text-sm";
    case "6x": return "h-12 px-8 text-base";
    case "8x": return "h-14 px-10 text-lg";
    default: return "h-10 px-6 text-sm";
  }
};

const getIconSize = (spacing: MinimalButtonSpacing) => {
  switch (spacing) {
    case "2x": return "[&>svg]:w-3.5 [&>svg]:h-3.5";
    case "4x": return "[&>svg]:w-4 [&>svg]:h-4";
    case "6x": return "[&>svg]:w-5 [&>svg]:h-5";
    case "8x": return "[&>svg]:w-6 [&>svg]:h-6";
    default: return "[&>svg]:w-4 [&>svg]:h-4";
  }
};

export const MinimalButton = React.forwardRef<HTMLButtonElement, MinimalButtonProps>(
  (
    {
      variant = "solid",
      color = "default",
      spacing = "default",
      shape = "default",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    let styleVariant: "solid" | "soft" | "ghost" | "outline" = "solid";

    if (variant === "outline" || variant === "ghost" || variant === "soft") {
      styleVariant = variant;
    } else if (variant === "link") {
      styleVariant = "ghost";
    }

    const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...filteredProps } = props as any;

    const baseClasses = cn(
      "relative inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap outline-none",
      "transition-colors duration-200 ease-out select-none",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      fullWidth && "w-full",
      getShapeClass(shape),
      getSpacingClass(spacing),
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      variant === "link" ? "hover:underline bg-transparent hover:bg-transparent px-0" : "",
      variant === "outline" ? "border" : "border border-transparent", 
      colorVariants[color]?.[styleVariant] || colorVariants.default.solid,
      className
    );

    const MotionComponent = motion.button;

    return (
      <MotionComponent
        ref={ref}
        whileTap={!disabled ? { scale: 0.97 } : undefined}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
        className={baseClasses}
        disabled={disabled || loading}
        {...filteredProps}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}

        {!loading && icon && iconPosition === "left" && (
          <span className={cn("shrink-0 inline-flex items-center justify-center", getIconSize(spacing))}>
            {icon}
          </span>
        )}

        {children && <span className="truncate">{children}</span>}

        {!loading && icon && iconPosition === "right" && (
          <span className={cn("shrink-0 inline-flex items-center justify-center", getIconSize(spacing))}>
            {icon}
          </span>
        )}
      </MotionComponent>
    );
  }
);

MinimalButton.displayName = "MinimalButton";
