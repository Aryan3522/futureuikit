"use client"

/**
 * @registry-slug slider
 * @registry-name Slider
 * @registry-description A standard Slider component.
 * @registry-category ui
 * @registry-type components:ui
 */


import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

export type SliderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type SliderShape = "default" | "square" | "rounded" | "sharp";
export type SliderSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  color?: SliderColor;
  shape?: SliderShape;
  spacing?: SliderSpacing;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, color = "default", shape = "default", spacing = "default", ...props }, ref) => {

  const getColorClasses = () => {
    switch(color) {
      case "blue": return "bg-blue-600 dark:bg-blue-500";
      case "emerald": return "bg-emerald-500";
      case "rose": return "bg-rose-500";
      case "amber": return "bg-amber-500";
      case "violet": return "bg-violet-600 dark:bg-violet-500";
      case "indigo": return "bg-indigo-600 dark:bg-indigo-500";
      case "sky": return "bg-sky-500";
      case "slate": return "bg-slate-600 dark:bg-slate-500";
      case "orange": return "bg-orange-500";
      default: return "bg-foreground";
    }
  };

  const getBorderColorClasses = () => {
    switch(color) {
      case "blue": return "border-blue-600 dark:border-blue-500";
      case "emerald": return "border-emerald-500";
      case "rose": return "border-rose-500";
      case "amber": return "border-amber-500";
      case "violet": return "border-violet-600 dark:border-violet-500";
      case "indigo": return "border-indigo-600 dark:border-indigo-500";
      case "sky": return "border-sky-500";
      case "slate": return "border-slate-600 dark:border-slate-500";
      case "orange": return "border-orange-500";
      default: return "border-foreground";
    }
  };

  const getRingColorClasses = () => {
    switch(color) {
      case "blue": return "focus-visible:ring-blue-600/50 dark:focus-visible:ring-blue-500/50";
      case "emerald": return "focus-visible:ring-emerald-500/50";
      case "rose": return "focus-visible:ring-rose-500/50";
      case "amber": return "focus-visible:ring-amber-500/50";
      case "violet": return "focus-visible:ring-violet-600/50 dark:focus-visible:ring-violet-500/50";
      case "indigo": return "focus-visible:ring-indigo-600/50 dark:focus-visible:ring-indigo-500/50";
      case "sky": return "focus-visible:ring-sky-500/50";
      case "slate": return "focus-visible:ring-slate-600/50 dark:focus-visible:ring-slate-500/50";
      case "orange": return "focus-visible:ring-orange-500/50";
      default: return "focus-visible:ring-ring/50";
    }
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className={cn("relative w-full grow overflow-hidden bg-muted", shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-full", spacing === "2x" ? "h-1" : spacing === "6x" || spacing === "8x" ? "h-3" : "h-2")}>
        <SliderPrimitive.Range className={cn("absolute h-full", getColorClasses())} />
      </SliderPrimitive.Track>
      {Array.from({ length: (props.value?.length || props.defaultValue?.length || 1) }).map((_, index) => (
        <SliderPrimitive.Thumb key={index} className={cn("block border-2 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", spacing === "2x" ? "h-4 w-4" : spacing === "6x" || spacing === "8x" ? "h-6 w-6" : "h-5 w-5", shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-xl" : "rounded-full", getBorderColorClasses(), getRingColorClasses())} />
      ))}
    </SliderPrimitive.Root>
  );
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
