/**
 * @registry-slug primary
 * @registry-name Primary Button
 * @registry-description A Future UI Primary Button component.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export type PrimaryButtonVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "ghost" | "link" | "outline";
export type PrimaryButtonShape = "default" | "square" | "rounded" | "sharp";
export type PrimaryButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface PrimaryButtonProps extends HTMLMotionProps<"button"> {
  variant?: PrimaryButtonVariant;
  shape?: PrimaryButtonShape;
  spacing?: PrimaryButtonSpacing;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const PrimaryButton = React.memo(React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ 
    className, 
    children, 
    variant = "primary",
    shape = "default",
    spacing = "default",
    startIcon,
    endIcon,
    disabled,
    ...props 
  }, ref) => {
    
    const getShapeStyles = () => {
      switch (shape) {
        case "square": return "rounded-none";
        case "sharp": return "rounded-[2px]";
        case "rounded": return "rounded-full"; // Wait, button rounded is usually rounded-full or rounded-xl? I will use rounded-full for shape="rounded", rounded-md for default. Wait, most other components use rounded-xl. Let's use rounded-full for maximum rounded, default for rounded-md.
        case "default": return "rounded-md";
      }
    };

    const getSpacingStyles = () => {
      switch (spacing) {
        case "2x": return "h-8 px-4 text-xs gap-1.5";
        case "4x": return "h-10 px-5 text-sm gap-2";
        case "6x": return "h-12 px-8 text-base gap-2.5";
        case "8x": return "h-14 px-10 text-lg gap-3";
        default: return "h-10 px-6 text-sm gap-2";
      }
    };

    const getVariantStyles = () => {
      switch (variant) {
        case "primary": return "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-transparent";
        case "secondary": return "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 border border-transparent";
        case "success": return "bg-emerald-500 text-white hover:bg-emerald-600 border border-transparent";
        case "danger": return "bg-rose-500 text-white hover:bg-rose-600 border border-transparent";
        case "warning": return "bg-amber-500 text-white hover:bg-amber-600 border border-transparent";
        case "info": return "bg-sky-500 text-white hover:bg-sky-600 border border-transparent";
        case "ghost": return "bg-transparent text-foreground hover:bg-accent border border-transparent";
        case "outline": return "bg-transparent text-foreground border border-input hover:bg-accent hover:text-accent-foreground";
        case "link": return "bg-transparent text-primary underline-offset-4 hover:underline border border-transparent";
        default: return "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-transparent";
      }
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && variant !== "link" ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center cursor-pointer select-none transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          "w-full sm:w-auto font-medium",
          getVariantStyles(),
          getShapeStyles(),
          getSpacingStyles(),
          className
        )}
        {...props}
      >
        {startIcon && <span className="flex items-center justify-center shrink-0">{startIcon}</span>}
        <span className="relative z-10 whitespace-nowrap">{children as React.ReactNode}</span>
        {endIcon && <span className="flex items-center justify-center shrink-0">{endIcon}</span>}
      </motion.button>
    );
  }
));
PrimaryButton.displayName = "PrimaryButton";