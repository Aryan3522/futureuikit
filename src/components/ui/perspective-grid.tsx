/**
 * @registry-slug perspective-grid
 * @registry-name Perspective Grid
 * @registry-description A Future UI Perspective Grid component.
 * @registry-category ui
 */
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type PerspectiveGridColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type PerspectiveGridShape = "default" | "square" | "rounded" | "sharp";
export type PerspectiveGridSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface PerspectiveGridProps {
  className?: string;
  gridLineGap?: number;
  showOverlay?: boolean;
  fadeRadius?: number;
  color?: PerspectiveGridColor;
  shape?: PerspectiveGridShape;
  spacing?: PerspectiveGridSpacing;
}

const colorThemeMap: Record<PerspectiveGridColor, { text: string }> = {
  default: { text: "text-muted-foreground/30" },
  blue: { text: "text-blue-600/30 dark:text-blue-500/30" },
  emerald: { text: "text-emerald-600/30 dark:text-emerald-500/30" },
  rose: { text: "text-rose-600/30 dark:text-rose-500/30" },
  amber: { text: "text-amber-600/30 dark:text-amber-500/30" },
  violet: { text: "text-violet-600/30 dark:text-violet-500/30" },
  indigo: { text: "text-indigo-600/30 dark:text-indigo-500/30" },
  sky: { text: "text-sky-600/30 dark:text-sky-500/30" },
  slate: { text: "text-slate-600/30 dark:text-slate-500/30" },
  orange: { text: "text-orange-600/30 dark:text-orange-500/30" },
};

const getShapeClass = (shape: PerspectiveGridShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-none"; // Grid typically full bleed
  }
};

const getSpacingValue = (spacing: PerspectiveGridSpacing, defaultGap: number) => {
  if (defaultGap !== 60) return defaultGap; // User provided explicit gap
  switch (spacing) {
    case "2x": return 40;
    case "4x": return 60;
    case "6x": return 80;
    case "8x": return 100;
    default: return 60;
  }
};

export const PerspectiveGrid = React.memo(function PerspectiveGrid({
  className,
  gridLineGap = 60,
  showOverlay = true,
  fadeRadius = 80,
  color = "default",
  shape = "default",
  spacing = "default"
}: PerspectiveGridProps) {
  const activeTheme = colorThemeMap[color];
  const shapeClass = getShapeClass(shape);
  const actualGap = getSpacingValue(spacing, gridLineGap);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-background",
        activeTheme.text,
        shapeClass,
        "[--fade-stop:theme(colors.background)]",
        className
      )}
      style={{
        perspective: "2000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute w-[80rem] aspect-square origin-center"
        style={{
          left: "50%",
          top: "50%",
          transform:
            "translate(-50%, -50%) rotateX(30deg) rotateY(-5deg) rotateZ(20deg) scale(2)",
          transformStyle: "preserve-3d",

          backgroundImage: `
            repeating-linear-gradient(
              to right,
              currentColor 0px,
              currentColor 1px,
              transparent 1px,
              transparent ${actualGap}px
            ),
            repeating-linear-gradient(
              to bottom,
              currentColor 0px,
              currentColor 1px,
              transparent 1px,
              transparent ${actualGap}px
            )
          `,
        }}
      />

      {showOverlay && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle, transparent 25%, var(--fade-stop) ${fadeRadius}%)`,
          }}
        />
      )}
    </div>
  );
});
PerspectiveGrid.displayName = "PerspectiveGrid";

export default React.memo(PerspectiveGrid);
