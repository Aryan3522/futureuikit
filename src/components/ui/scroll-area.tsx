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
export type ScrollAreaVariant = "default" | "minimal" | "glass" | "glow";

interface ScrollAreaContextValue {
  color: ScrollAreaColor;
  shape: ScrollAreaShape;
  spacing: ScrollAreaSpacing;
  variant: ScrollAreaVariant;
}

const ScrollAreaContext = React.createContext<ScrollAreaContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
  variant: "default",
});

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  color?: ScrollAreaColor;
  shape?: ScrollAreaShape;
  spacing?: ScrollAreaSpacing;
  variant?: ScrollAreaVariant;
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, color = "default", shape = "default", spacing = "default", variant = "default", children, ...props }, ref) => (
  <ScrollAreaContext.Provider value={{ color, shape, spacing, variant }}>
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
  const { color, shape, spacing, variant } = React.useContext(ScrollAreaContext);

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
      default: return "bg-foreground/20 hover:bg-foreground/50";
    }
  };

  const getVariantTrackClasses = () => {
    switch (variant) {
      case "glass": return "bg-muted/30 backdrop-blur-sm border-white/10 dark:border-white/5";
      case "minimal": return "bg-transparent hover:bg-muted/10";
      case "glow": return "bg-transparent border-white/5";
      default: return "";
    }
  };

  const getVariantThumbClasses = () => {
    let base = getThumbColorClasses();
    switch (variant) {
      case "glass": return cn(base, "border border-white/20 shadow-sm backdrop-blur-md opacity-80 hover:opacity-100");
      case "minimal": return cn(base, "opacity-40 hover:opacity-80");
      case "glow": return cn(base, "shadow-[0_0_8px_currentColor] opacity-60 hover:opacity-100 border border-current/20");
      default: return base;
    }
  };

  const getThicknessClasses = () => {
    let baseSpacing = spacing;
    if (variant === "minimal" && spacing === "default") baseSpacing = "2x"; // Thinner default for minimal
    
    if (orientation === "vertical") {
      switch (baseSpacing) {
        case "2x": return "h-full w-1.5 border-l border-l-transparent p-[1px]";
        case "4x": return "h-full w-2.5 border-l border-l-transparent p-[1px]";
        case "6x": return "h-full w-3 border-l border-l-transparent p-[1px]";
        case "8x": return "h-full w-4 border-l border-l-transparent p-[1px]";
        default: return "h-full w-2.5 border-l border-l-transparent p-[1px]"; // default is 2.5
      }
    } else {
      switch (baseSpacing) {
        case "2x": return "h-1.5 flex-col border-t border-t-transparent p-[1px]";
        case "4x": return "h-2.5 flex-col border-t border-t-transparent p-[1px]";
        case "6x": return "h-3 flex-col border-t border-t-transparent p-[1px]";
        case "8x": return "h-4 flex-col border-t border-t-transparent p-[1px]";
        default: return "h-2.5 flex-col border-t border-t-transparent p-[1px]";
      }
    }
  };

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors duration-300",
        getThicknessClasses(),
        getVariantTrackClasses(),
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb 
        className={cn(
          "relative flex-1 transition-all duration-300",
          shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[1px]" : "rounded-full",
          getVariantThumbClasses()
        )} 
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
})
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
