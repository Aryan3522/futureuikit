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
  ({ className, children, variant = "modern", color = "#2563eb", onClick, ...props }, ref) => {
    
    const getVariantStyles = () => {
      switch (variant) {
        case "modern":
          return {
            background: color,
            color: "#ffffff",
            border: "none",
          };
        case "clean":
          return {
            background: color,
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
          };
        case "minimal":
          return {
            background: "transparent",
            color: color,
            border: `1px solid ${color}`,
            borderRadius: "6px",
          };
        default:
          return {
            background: color,
            color: "#ffffff",
            border: "none",
          };
      }
    };

    const variantClasses = {
      modern: "relative overflow-hidden px-6 py-2.5 rounded-xl font-semibold tracking-wide",
      clean: "px-5 py-2 rounded-lg font-medium",
      minimal: "px-5 py-2 font-medium hover:bg-opacity-10",
    };

    const buttonStyles = getVariantStyles();

    return (
      <motion.button
        ref={ref}
        whileHover={{ 
          scale: 1.02,
          filter: variant === "minimal" ? "brightness(0.95)" : "brightness(1.1)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={cn(
          "inline-flex items-center justify-center cursor-pointer select-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant] || variantClasses.modern,
          className
        )}
        style={{
          ...buttonStyles,
          ...props.style
        }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === "modern" && (
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
