/**
 * @registry-slug scroll-progress
 * @registry-name Scroll Progress
 * @registry-description A high-performance scroll progress indicator with smooth spring-based animations powered by Framer Motion.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import React from "react";
import { cn } from "@/lib/utils";

export type ScrollProgressColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ScrollProgressShape = "default" | "square" | "rounded" | "sharp";
export type ScrollProgressSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface ScrollProgressProps {
  container?: React.RefObject<HTMLElement | null>;
  className?: string;
  color?: ScrollProgressColor;
  shape?: ScrollProgressShape;
  spacing?: ScrollProgressSpacing;
}

const colorThemeMap: Record<ScrollProgressColor, string> = {
  default: "bg-foreground",
  blue: "bg-blue-600 dark:bg-blue-500",
  emerald: "bg-emerald-600 dark:bg-emerald-500",
  rose: "bg-rose-600 dark:bg-rose-500",
  amber: "bg-amber-600 dark:bg-amber-500",
  violet: "bg-violet-600 dark:bg-violet-500",
  indigo: "bg-indigo-600 dark:bg-indigo-500",
  sky: "bg-sky-600 dark:bg-sky-500",
  slate: "bg-slate-600 dark:bg-slate-500",
  orange: "bg-orange-600 dark:bg-orange-500",
};

const getShapeClass = (shape: ScrollProgressShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-r-sm";
    case "rounded": return "rounded-r-md";
    case "default": return "rounded-r-full";
  }
};

const getSpacingClass = (spacing: ScrollProgressSpacing) => {
  switch (spacing) {
    case "2x": return "h-0.5";
    case "4x": return "h-1";
    case "6x": return "h-1.5";
    case "8x": return "h-2";
    default: return "h-1";
  }
};

export const ScrollProgress = React.memo(function ScrollProgress({ 
  container,
  className,
  color = "default",
  shape = "default",
  spacing = "default"
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({ container })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const activeTheme = colorThemeMap[color];
  const shapeClass = getShapeClass(shape);
  const spacingClass = getSpacingClass(spacing);

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 origin-left z-[9999]",
        activeTheme,
        shapeClass,
        spacingClass,
        className
      )}
      style={{ scaleX }}
    />
  )
});
ScrollProgress.displayName = "ScrollProgress";