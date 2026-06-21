"use client"

/**
 * @registry-slug scroll-area
 * @registry-name Scroll Area
 * @registry-description A standard Scroll Area component.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

export type ScrollAreaColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ScrollAreaShape = "default" | "square" | "rounded" | "sharp";
export type ScrollAreaSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface ScrollAreaContextValue {
  color: ScrollAreaColor;
  shape: ScrollAreaShape;
  spacing: ScrollAreaSpacing;
}

const ScrollAreaContext = React.createContext<ScrollAreaContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  color?: ScrollAreaColor;
  shape?: ScrollAreaShape;
  spacing?: ScrollAreaSpacing;
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, color = "default", shape = "default", spacing = "default", children, ...props }, ref) => (
  <ScrollAreaContext.Provider value={{ color, shape, spacing }}>
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-2xl" : "rounded-md",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  </ScrollAreaContext.Provider>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(ScrollAreaContext);

  const getThumbColorClasses = () => {
    switch (color) {
      case "blue": return "bg-blue-600/50 hover:bg-blue-600 dark:bg-blue-500/50 dark:hover:bg-blue-500";
      case "emerald": return "bg-emerald-500/50 hover:bg-emerald-500";
      case "rose": return "bg-rose-500/50 hover:bg-rose-500";
      case "amber": return "bg-amber-500/50 hover:bg-amber-500";
      case "violet": return "bg-violet-600/50 hover:bg-violet-600 dark:bg-violet-500/50 dark:hover:bg-violet-500";
      case "indigo": return "bg-indigo-600/50 hover:bg-indigo-600 dark:bg-indigo-500/50 dark:hover:bg-indigo-500";
      case "sky": return "bg-sky-500/50 hover:bg-sky-500";
      case "slate": return "bg-slate-600/50 hover:bg-slate-600 dark:bg-slate-500/50 dark:hover:bg-slate-500";
      case "orange": return "bg-orange-500/50 hover:bg-orange-500";
      default: return "bg-muted hover:bg-accent";
    }
  };

  const thickness = spacing === "2x" ? "1.5" : spacing === "6x" ? "3" : spacing === "8x" ? "4" : "2.5";

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          `h-full w-${thickness} border-l border-l-transparent p-[1px]`,
        orientation === "horizontal" &&
          `h-${thickness} flex-col border-t border-t-transparent p-[1px]`,
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb 
        className={cn(
          "relative flex-1 transition-colors",
          shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[1px]" : "rounded-full",
          getThumbColorClasses()
        )} 
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
})
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
