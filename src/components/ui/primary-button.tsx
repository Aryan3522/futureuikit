/**
 * @registry-slug primary
 * @registry-name Primary Button
 * @registry-dependency framer-motion
 */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PrimaryButton = React.forwardRef<HTMLButtonElement, any>(
  ({ 
    className, 
    children, 
    variant = "primary",
    mode = "modern",
    color, 
    disabled,
    style,
    ...props 
  }, ref) => {
    
    const intentColors: Record<string, string> = {
      primary: "#2563eb",
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#06b6d4",
      secondary: "#64748b",
    };

    const styleOptions = ["modern", "clean", "minimal"];
    const intents = Object.keys(intentColors);
    
    let finalIntent = variant as string;
    let finalMode = mode as string;

    if (styleOptions.includes(variant as string)) {
      finalMode = variant as string;
      finalIntent = intents.includes(mode as string) ? (mode as string) : "primary";
    }

    const finalColor = color || intentColors[finalIntent] || intentColors.primary;

    const getModeStyles = () => {
      const baseStyles: React.CSSProperties = {
        borderRadius: "6px",
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

    const modeClasses: Record<string, string> = {
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
        } as any}
        {...props}
      >
        <span className="relative z-10">{children as React.ReactNode}</span>
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