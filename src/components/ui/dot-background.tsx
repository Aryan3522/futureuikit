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
export type DotBackgroundSize = "default" | "sm" | "md" | "lg" | "xl";
export type DotBackgroundTheme = "default" | "modern" | "clean";

export interface DotBackgroundProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  dotColor?: string;
  maskOpacity?: number;
  children?: React.ReactNode;
  color?: DotBackgroundColor;
  size?: DotBackgroundSize;
  theme?: DotBackgroundTheme;
}

const colorThemeMap: Record<DotBackgroundColor, { dotColor: string }> = {
  default: { dotColor: "var(--foreground)" },
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

const getSizeConfig = (size: DotBackgroundSize, defaultDotSize: number, defaultGap: number) => {
  if (defaultDotSize !== 1 || defaultGap !== 20) return { dotSize: defaultDotSize, gap: defaultGap };
  switch (size) {
    case "sm": return { dotSize: 1, gap: 12 };
    case "md": return { dotSize: 1.5, gap: 18 };
    case "lg": return { dotSize: 2, gap: 24 };
    case "xl": return { dotSize: 3, gap: 32 };
    default: return { dotSize: 1, gap: 20 };
  }
};

const getThemeConfig = (theme: DotBackgroundTheme, maskOpacity: number, dotColorStr: string) => {
  let maskImage = `radial-gradient(ellipse at center, black, transparent 80%)`;
  let bgClass = "bg-background";
  let opacity = maskOpacity;
  let filter = "";

  switch (theme) {
    case "clean":
      maskImage = "none";
      opacity = maskOpacity * 0.5;
      break;
  }
  return { maskImage, bgClass, opacity, filter };
};

export const DotBackground: React.FC<DotBackgroundProps> = React.memo(({
  className,
  dotSize = 1,
  gap = 20,
  dotColor,
  maskOpacity = 0.5,
  children,
  color = "default",
  size = "default",
  theme = "default",
}) => {
  const activeTheme = colorThemeMap[color];
  // Convert standard foreground variable correctly if not explicitly provided
  const actualDotColor = dotColor || (color === "default" ? "currentColor" : activeTheme.dotColor);
  const sizeConfig = getSizeConfig(size, dotSize, gap);
  const themeConfig = getThemeConfig(theme, maskOpacity, actualDotColor);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden flex items-center justify-center transition-colors duration-500",
        themeConfig.bgClass,
        className
      )}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          backgroundImage: `radial-gradient(${actualDotColor} ${sizeConfig.dotSize}px, transparent ${sizeConfig.dotSize}px)`,
          backgroundSize: `${sizeConfig.gap}px ${sizeConfig.gap}px`,
          maskImage: themeConfig.maskImage,
          WebkitMaskImage: themeConfig.maskImage,
          opacity: themeConfig.opacity,
          filter: themeConfig.filter,
        }}
      />
      
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
});
DotBackground.displayName = "DotBackground";
