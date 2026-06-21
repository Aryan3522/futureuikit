/**
 * @registry-slug dot-background
 * @registry-name Dot Background
 * @registry-description A Future UI Dot Background component.
 * @registry-category ui
 */
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type DotBackgroundColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type DotBackgroundShape = "default" | "square" | "rounded" | "sharp";
export type DotBackgroundSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface DotBackgroundProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  dotColor?: string;
  maskOpacity?: number;
  children?: React.ReactNode;
  color?: DotBackgroundColor;
  shape?: DotBackgroundShape;
  spacing?: DotBackgroundSpacing;
}

const colorThemeMap: Record<DotBackgroundColor, { dotColor: string }> = {
  default: { dotColor: "var(--primary)" },
  blue: { dotColor: "#2563eb" }, // Blue-600
  emerald: { dotColor: "#16a34a" }, // Emerald-600
  rose: { dotColor: "#e11d48" }, // Rose-600
  amber: { dotColor: "#d97706" }, // Amber-600
  violet: { dotColor: "#7c3aed" }, // Violet-600
  indigo: { dotColor: "#4f46e5" }, // Indigo-600
  sky: { dotColor: "#0284c7" }, // Sky-600
  slate: { dotColor: "#475569" }, // Slate-600
  orange: { dotColor: "#ea580c" }, // Orange-600
};

const getShapeClass = (shape: DotBackgroundShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-none"; // Backgrounds are usually full bleed by default
  }
};

const getSpacingValue = (spacing: DotBackgroundSpacing, defaultGap: number) => {
  if (defaultGap !== 20) return defaultGap; // User provided explicit gap
  switch (spacing) {
    case "2x": return 10;
    case "4x": return 20;
    case "6x": return 30;
    case "8x": return 40;
    default: return 20;
  }
};

export const DotBackground: React.FC<DotBackgroundProps> = React.memo(({
          className,
          dotSize = 1,
          gap = 20,
          dotColor,
          maskOpacity = 1,
          children,
          color = "default",
          shape = "default",
          spacing = "default",
        }) => {
          const activeTheme = colorThemeMap[color];
          const actualDotColor = dotColor || activeTheme.dotColor;
          const actualGap = getSpacingValue(spacing, gap);
          const shapeClass = getShapeClass(shape);

          return (
            <div
              className={cn(
                "relative w-full h-full overflow-hidden bg-background flex items-center justify-center",
                shapeClass,
                className
              )}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(${actualDotColor} ${dotSize}px, transparent ${dotSize}px)`,
                  backgroundSize: `${actualGap}px ${actualGap}px`,
                  maskImage: `radial-gradient(ellipse at center, black, transparent 80%)`,
                  WebkitMaskImage: `radial-gradient(ellipse at center, black, transparent 80%)`,
                  opacity: maskOpacity,
                }}
              />
              
              <div className="relative z-10 w-full">
                {children}
              </div>
            </div>
          );
        });
DotBackground.displayName = "DotBackground";
