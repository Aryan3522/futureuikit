/**
 * @registry-slug GutterLines
 * @registry-name GutterLines
 * @registry-description A standard GutterLines component.
 * @registry-category ui
 * @registry-type components:ui
 */
"use client";

import React from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type GutterLinesColor = "default" | "primary" | "muted" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type GutterLinesShape = "default" | "square" | "rounded" | "sharp";
export type GutterLinesSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type GutterLinesSize = "default" | "sm" | "md" | "lg";

const gutterLinesVariants = cva(
  "w-full h-full",
  {
    variants: {
      variant: {
        default: "",
        vertical: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface GutterLinesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gutterLinesVariants> {
  color?: GutterLinesColor;
  shape?: GutterLinesShape;
  spacing?: GutterLinesSpacing;
  size?: GutterLinesSize;
}

const colorThemeMap: Record<GutterLinesColor, { pattern: string; opacityClass: string }> = {
  default: { pattern: "var(--color-primary)", opacityClass: "opacity-20 dark:opacity-30" },
  primary: { pattern: "var(--color-primary)", opacityClass: "opacity-25 dark:opacity-35" },
  muted: { pattern: "var(--color-muted-foreground)", opacityClass: "opacity-20 dark:opacity-25" },
  blue: { pattern: "#2563eb", opacityClass: "opacity-20" },
  emerald: { pattern: "#16a34a", opacityClass: "opacity-20" },
  rose: { pattern: "#e11d48", opacityClass: "opacity-20" },
  amber: { pattern: "#d97706", opacityClass: "opacity-20" },
  violet: { pattern: "#7c3aed", opacityClass: "opacity-20" },
  indigo: { pattern: "#4f46e5", opacityClass: "opacity-20" },
  sky: { pattern: "#0284c7", opacityClass: "opacity-20" },
  slate: { pattern: "#475569", opacityClass: "opacity-20" },
  orange: { pattern: "#ea580c", opacityClass: "opacity-20" },
};

const getShapeClass = (shape: GutterLinesShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-lg";
    case "default": return "rounded-none"; // Typically full bleed
  }
};

const getSpacingValue = (spacing: GutterLinesSpacing) => {
  switch (spacing) {
    case "2x": return "0.25rem";
    case "4x": return "0.5rem";
    case "6x": return "0.75rem";
    case "8x": return "1rem";
    default: return "0.5rem";
  }
};

const getSizeValue = (size: GutterLinesSize) => {
  switch (size) {
    case "sm": return "1px";
    case "md": return "2px";
    case "lg": return "4px";
    default: return "1px";
  }
};

export const GutterLines = React.forwardRef<HTMLDivElement, GutterLinesProps>(
  ({ className, variant, color = "default", shape = "default", spacing = "default", size = "default", style, ...props }, ref) => {
    const activeTheme = colorThemeMap[color];
    const shapeClass = getShapeClass(shape);
    const spacingValue = getSpacingValue(spacing);
    const sizeValue = getSizeValue(size);
    
    const direction = variant === "vertical" ? "to right" : "to bottom";
    
    return (
      <div 
        ref={ref}
        style={{
          '--pattern': activeTheme.pattern,
          backgroundImage: `repeating-linear-gradient(${direction}, var(--pattern) 0, var(--pattern) ${sizeValue}, transparent ${sizeValue}, transparent ${spacingValue})`,
          ...style
        } as React.CSSProperties}
        className={cn(gutterLinesVariants({ variant, className }), shapeClass, activeTheme.opacityClass)} 
        {...props} 
      />
    )
  }
)
GutterLines.displayName = "GutterLines"
