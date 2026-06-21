"use client"

/**
 * @registry-slug tooltip
 * @registry-name Tooltip
 * @registry-description A standard Tooltip component.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

export type TooltipColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type TooltipShape = "default" | "square" | "rounded" | "sharp";
export type TooltipSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface TooltipContextValue {
  color: TooltipColor;
  shape: TooltipShape;
  spacing: TooltipSpacing;
}

const TooltipContext = React.createContext<TooltipContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  color?: TooltipColor;
  shape?: TooltipShape;
  spacing?: TooltipSpacing;
}

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip: React.FC<TooltipProps> = ({ color = "default", shape = "default", spacing = "default", children, ...props }) => {
  return (
    <TooltipContext.Provider value={{ color, shape, spacing }}>
      <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(TooltipContext);
  
  const getColorClasses = () => {
    switch (color) {
      case "blue": return "bg-blue-600 text-white dark:bg-blue-500";
      case "emerald": return "bg-emerald-500 text-white";
      case "rose": return "bg-rose-500 text-white";
      case "amber": return "bg-amber-500 text-white";
      case "violet": return "bg-violet-600 text-white dark:bg-violet-500";
      case "indigo": return "bg-indigo-600 text-white dark:bg-indigo-500";
      case "sky": return "bg-sky-500 text-white";
      case "slate": return "bg-slate-600 text-white dark:bg-slate-500";
      case "orange": return "bg-orange-500 text-white";
      default: return "bg-foreground text-background";
    }
  };

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-xl" : "rounded-md",
        spacing === "2x" ? "px-2 py-1 text-[10px]" : spacing === "6x" || spacing === "8x" ? "px-4 py-2 text-base" : "px-3 py-1.5 text-sm",
        getColorClasses(),
        className
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
