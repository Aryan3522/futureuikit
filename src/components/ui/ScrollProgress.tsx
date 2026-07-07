/**
 * @registry-slug scroll-progress
 * @registry-name Scroll Progress
 * @registry-description A high-performance scroll progress indicator with smooth spring-based animations powered by Framer Motion.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client"

import * as React from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export type ScrollProgressColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ScrollProgressSize = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ScrollProgressProps {
  container?: React.RefObject<HTMLElement | null>;
  className?: string;
  color?: ScrollProgressColor;
  size?: ScrollProgressSize;
  position?: "fixed" | "absolute";
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

const getSizeClass = (size: ScrollProgressSize) => {
  switch (size) {
    case "sm": return "h-0.5";
    case "md": return "h-1";
    case "lg": return "h-2";
    case "xl": return "h-3";
    case "2xl": return "h-4";
    default: return "h-1";
  }
};

export const ScrollProgress = React.memo(function ScrollProgress({ 
  container,
  className,
  color = "default",
  size = "md",
  position = "fixed"
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({ container })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className={cn(
        "z-[9999] top-0 left-0 right-0 origin-left",
        position,
        colorThemeMap[color],
        getSizeClass(size),
        className
      )}
      style={{ scaleX }}
    />
  )
});
ScrollProgress.displayName = "ScrollProgress";