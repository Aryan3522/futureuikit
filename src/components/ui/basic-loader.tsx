/**
 * @registry-slug basic-loader
 * @registry-name Basic Loader
 * @registry-description A modern, animated loading indicator with multiple visual styles.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BasicLoaderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type BasicLoaderShape = "default" | "square" | "rounded" | "sharp";
export type BasicLoaderSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface BasicLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "modern" | "clean" | "minimal";
  color?: BasicLoaderColor;
  shape?: BasicLoaderShape;
  spacing?: BasicLoaderSpacing;
  text?: string;
  customColor?: string; // Kept for exact backwards compatibility if needed
}

const colorThemeMap: Record<BasicLoaderColor, string> = {
  default: "currentColor", // uses current text color / foreground
  blue: "#3b82f6",
  emerald: "#10b981",
  rose: "#f43f5e",
  amber: "#f59e0b",
  violet: "#8b5cf6",
  indigo: "#6366f1",
  sky: "#0ea5e9",
  slate: "#64748b",
  orange: "#f97316",
};

const getShapeClass = (shape: BasicLoaderShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[4px]";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-full";
  }
};

const getSpacingClass = (spacing: BasicLoaderSpacing) => {
  switch (spacing) {
    case "2x": return "gap-1 mt-2";
    case "4x": return "gap-2 mt-4";
    case "6x": return "gap-4 mt-8";
    case "8x": return "gap-6 mt-10";
    default: return "gap-3 mt-6";
  }
};

export const BasicLoader: React.FC<BasicLoaderProps> = React.memo(({ 
  className, 
  variant = "modern", 
  color = "default", 
  shape = "default",
  spacing = "default",
  customColor,
  text, 
  ...props 
}) => {
  
  const activeColor = customColor || colorThemeMap[color];
  const shapeClass = getShapeClass(shape);

  const getLoader = () => {
    switch (variant) {
      case "modern":
        return (
          <div className="relative w-16 h-16">
            <motion.div
              className={cn("absolute inset-0 border-4 border-solid border-transparent", shapeClass)}
              style={{ borderTopColor: activeColor }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className={cn("absolute inset-2 border-4 border-solid border-transparent opacity-50", shapeClass)}
              style={{ borderBottomColor: activeColor }}
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        );
      case "clean":
        return (
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn("w-3 h-3", shapeClass)}
                style={{ backgroundColor: activeColor }}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        );
      case "minimal":
        return (
          <motion.div
            className={cn("w-8 h-8 border-2 border-solid border-transparent", shapeClass)}
            style={{ borderTopColor: activeColor }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        );
      default:
        return (
          <div 
            className={cn("w-10 h-10 border-4 border-solid border-muted-foreground/20 border-t-current animate-spin", shapeClass)} 
            style={{ color: activeColor }}
          />
        );
    }
  };

  const spacingClasses = getSpacingClass(spacing).split(" ");
  const mtClass = spacingClasses.find(c => c.startsWith("mt-"));

  return (
    <div className={cn("flex flex-col justify-center items-center w-full h-full min-h-[inherit]", className)} {...props}>
      {getLoader()}
      {text && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={cn("text-sm font-medium text-muted-foreground tracking-wide animate-pulse text-center", mtClass)}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
});
BasicLoader.displayName = "BasicLoader";
