"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * PrimaryButton Component
 * 
 * Variants:
 * - modern: Slightly rounded, smooth gradient-like transitions, sophisticated hover effects.
 * - clean: Solid colors, sharp but rounded, minimal distractions.
 * - minimal: Outline or ghost-like, very light on the eyes.
 * 
 * Props:
 * - variant: "modern" | "clean" | "minimal"
 * - color: CSS color string (hex, rgb, etc.)
 * - className: additional classes
 */
export const PrimaryButton = React.forwardRef(
  ({ 
    className, 
    children, 
    variant = "primary", // primary, success, warning, danger, info, secondary
    mode = "modern",    // modern, clean, minimal
    color, 
    disabled,
    style,
    ...props 
  }, ref) => {
    
    const intentColors = {
      primary: "#2563eb",
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#06b6d4",
      secondary: "#64748b",
    };

    // Style/Intent normalization
    const styleOptions = ["modern", "clean", "minimal"];
    const intents = Object.keys(intentColors);
    
    let finalIntent = variant;
    let finalMode = mode;

    // Handle case where user passes a style to 'variant' prop
    if (styleOptions.includes(variant)) {
      finalMode = variant;
      finalIntent = intents.includes(mode) ? mode : "primary";
    }

    const finalColor = color || intentColors[finalIntent] || intentColors.primary;

    const getModeStyles = () => {
      const baseStyles = {
        borderRadius: "6px", // Standardized to minimal radius
      };

      switch (finalMode) {
        case "modern":
          return {
            ...baseStyles,
            background: finalColor,
            color: "#ffffff",
            border: "none",
          };
        case "clean":
          return {
            ...baseStyles,
            background: finalColor,
            color: "#ffffff",
            border: "none",
          };
        case "minimal":
          return {
            ...baseStyles,
            background: "transparent",
            color: finalColor,
            border: `1px solid ${finalColor}`,
          };
        default:
          return {
            ...baseStyles,
            background: finalColor,
            color: "#ffffff",
            border: "none",
          };
      }
    };

    const modeClasses = {
      modern: "relative overflow-hidden px-6 py-2 rounded-md font-semibold tracking-wide",
      clean: "px-5 py-2 rounded-md font-medium",
      minimal: "px-5 py-2 rounded-md font-medium hover:bg-opacity-10",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled ? { 
          scale: 1.02,
          filter: finalMode === "minimal" ? "brightness(0.95)" : "brightness(1.1)",
        } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center cursor-pointer select-none transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:filter-none",
          modeClasses[finalMode] || modeClasses.modern,
          className
        )}
        style={{
          ...getModeStyles(),
          ...style
        }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {finalMode === "modern" && !disabled && (
          <motion.div
            className="absolute inset-0 z-0 bg-white/10"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </motion.button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
