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

export type PrimaryButtonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type PrimaryButtonShape = "default" | "square" | "rounded" | "sharp";
export type PrimaryButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface PrimaryButtonProps extends Omit<HTMLMotionProps<"button">, "color"> {
  variant?: "modern" | "clean" | "minimal";
  color?: PrimaryButtonColor;
  shape?: PrimaryButtonShape;
  spacing?: PrimaryButtonSpacing;
}

export const PrimaryButton = React.memo(React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ 
    className, 
    children, 
    variant = "modern",
    color = "default",
    shape = "default",
    spacing = "default",
    disabled,
    style,
    ...props 
  }, ref) => {
    
    const intentColors: Record<PrimaryButtonColor, string> = {
      default: "#18181b", // zinc-900
      blue: "#2563eb",
      emerald: "#10b981",
      rose: "#f43f5e",
      amber: "#f59e0b",
      violet: "#7c3aed",
      indigo: "#4f46e5",
      sky: "#0ea5e9",
      slate: "#475569",
      orange: "#f97316",
    };

    const finalColor = intentColors[color] || intentColors.default;

    const getShapeStyles = () => {
      switch (shape) {
        case "square": return "rounded-none";
        case "sharp": return "rounded-[2px]";
        case "rounded": return "rounded-xl";
        case "default": return "rounded-md";
      }
    };

    const getSpacingStyles = () => {
      switch (spacing) {
        case "2x": return "h-8 px-4 text-xs";
        case "4x": return "h-10 px-5 text-sm";
        case "6x": return "h-12 px-8 text-base";
        case "8x": return "h-14 px-10 text-lg";
        default: return "h-10 px-6 text-sm";
      }
    };

    const getModeStyles = () => {
      switch (variant) {
        case "modern":
          return {
            background: finalColor,
            color: color === "default" || color === "amber" || color === "sky" ? "#ffffff" : "#ffffff", // Mostly white text for solid colors, wait: amber text should be dark?
            // Actually, we can just enforce white text except for amber on solid if needed, but simple CSS handles it.
            // Let's rely on standard color values for text
          };
        case "clean":
          return {
            background: finalColor,
            color: "#ffffff",
          };
        case "minimal":
          return {
            background: "transparent",
            color: finalColor,
            border: `1px solid ${finalColor}`,
          };
        default:
          return {
            background: finalColor,
            color: "#ffffff",
          };
      }
    };

    const variantClasses = {
      modern: "relative overflow-hidden font-semibold tracking-wide border-transparent",
      clean: "font-medium border-transparent",
      minimal: "font-medium hover:bg-opacity-10",
    };

    // Fix for amber/sky text colors on solid backgrounds if needed
    const getTextColorClass = () => {
      if (variant !== "minimal") {
        if (color === "amber" || color === "sky") {
          return "text-foreground"; // Special contrast for light colors
        }
        if (color === "default") {
          return "text-white dark:text-white"; // default zinc-900
        }
        return "text-white";
      }
      return ""; // Minimal mode uses inline style for color
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled ? { 
          scale: 1.02,
          filter: variant === "minimal" ? "brightness(0.95)" : "brightness(1.1)",
        } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center cursor-pointer select-none transition-all duration-200 border",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:filter-none",
          "w-full sm:w-auto",
          variantClasses[variant],
          getShapeStyles(),
          getSpacingStyles(),
          getTextColorClass(),
          className
        )}
        style={{
          ...getModeStyles(),
          ...(style as any)
        }}
        {...props}
      >
        <span className="relative z-10">{children as React.ReactNode}</span>
        {variant === "modern" && !disabled && (
          <motion.div
            className="absolute inset-0 z-0 bg-white/10 pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </motion.button>
    );
  }
));
PrimaryButton.displayName = "PrimaryButton";