/**
 * @registry-slug highlighter
 * @registry-name Highlighter
 * @registry-description A standard Highlighter component.
 * @registry-category ui
 * @registry-type components:ui
 */
"use client";

import { useLayoutEffect, useRef } from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { cn } from "@/lib/utils";

export type HighlighterColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type HighlighterShape = "default" | "square" | "rounded" | "sharp";
export type HighlighterSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface HighlighterProps {
  children: React.ReactNode;
  action?: "underline" | "box" | "circle" | "highlight" | "strike-through" | "crossed-off" | "bracket";
  color?: HighlighterColor;
  customColor?: string; // Fallback for custom hex
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number; // Override for spacing
  multiline?: boolean;
  isView?: boolean;
  shape?: HighlighterShape;
  spacing?: HighlighterSpacing;
  className?: string;
}

const colorThemeMap: Record<HighlighterColor, { hex: string }> = {
  default: { hex: "var(--foreground)" }, // Default black/white
  blue: { hex: "#2563eb" }, // Blue-600
  emerald: { hex: "#16a34a" }, // Emerald-600
  rose: { hex: "#e11d48" }, // Rose-600
  amber: { hex: "#d97706" }, // Amber-600
  violet: { hex: "#7c3aed" }, // Violet-600
  indigo: { hex: "#4f46e5" }, // Indigo-600
  sky: { hex: "#0284c7" }, // Sky-600
  slate: { hex: "#475569" }, // Slate-600
  orange: { hex: "#ea580c" }, // Orange-600
};

const getShapeClass = (shape: HighlighterShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-lg";
    case "default": return "rounded-none";
  }
};

const getSpacingValue = (spacing: HighlighterSpacing) => {
  switch (spacing) {
    case "2x": return 2;
    case "4x": return 4;
    case "6x": return 6;
    case "8x": return 8;
    default: return 2;
  }
};

export function Highlighter({
  children,
  action = "highlight",
  color = "default",
  customColor,
  shape = "default",
  spacing = "default",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding,
  multiline = true,
  isView = false,
  className
}: HighlighterProps) {
  const elementRef = useRef(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  const activeTheme = colorThemeMap[color] ?? colorThemeMap.default;
  const annotationColor = customColor || activeTheme.hex;
  const annotationPadding = padding !== undefined ? padding : getSpacingValue(spacing);
  const shapeClass = getShapeClass(shape);

  useLayoutEffect(() => {
    const element = elementRef.current
    let annotation: any = null
    let resizeObserver: any = null

    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color: annotationColor,
        strokeWidth,
        animationDuration,
        iterations,
        padding: annotationPadding,
        multiline,
      }

      const currentAnnotation = annotate(element, annotationConfig as any)
      annotation = currentAnnotation
      currentAnnotation.show()

      resizeObserver = new ResizeObserver(() => {
        currentAnnotation.hide()
        currentAnnotation.show()
      })

      resizeObserver.observe(element)
      resizeObserver.observe(document.body)
    }

    return () => {
      annotation?.remove()
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    };
  }, [
    shouldShow,
    action,
    annotationColor,
    strokeWidth,
    animationDuration,
    iterations,
    annotationPadding,
    multiline,
  ])

  return (
    <span ref={elementRef} className={cn("relative inline-block bg-transparent", shapeClass, className)}>
      {children}
    </span>
  );
}
