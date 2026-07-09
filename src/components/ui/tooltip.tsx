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
export type TooltipTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
export type TooltipVariant = "solid" | "outline" | "ghost" | "link";
export type TooltipShape = "default" | "square" | "rounded" | "sharp";
export type TooltipSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type TooltipSize = "default" | "sm" | "md" | "lg";

interface TooltipContextValue {
  color: TooltipColor;
  theme: TooltipTheme;
  variant: TooltipVariant;
  shape: TooltipShape;
  spacing: TooltipSpacing;
  size: TooltipSize;
}

const TooltipContext = React.createContext<TooltipContextValue>({
  color: "default",
  theme: "default",
  variant: "solid",
  shape: "default",
  spacing: "default",
  size: "default",
});

const colorThemeMap: Record<TooltipColor, { border: string; bg: string; text: string; glow: string; brutalShadow: string; }> = {
  default: { border: "border-border", bg: "bg-background", text: "text-foreground", glow: "shadow-md", brutalShadow: "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]" },
  blue: { border: "border-blue-600/30 dark:border-blue-500/30", bg: "bg-blue-600 text-white dark:bg-blue-500", text: "text-blue-900 dark:text-blue-100", glow: "shadow-[0_0_15px_-3px_rgba(37,99,235,0.3)]", brutalShadow: "shadow-[2px_2px_0px_0px_rgba(37,99,235,1)]" },
  emerald: { border: "border-emerald-600/30 dark:border-emerald-500/30", bg: "bg-emerald-500 text-white", text: "text-emerald-900 dark:text-emerald-100", glow: "shadow-[0_0_15px_-3px_rgba(5,150,105,0.3)]", brutalShadow: "shadow-[2px_2px_0px_0px_rgba(5,150,105,1)]" },
  rose: { border: "border-rose-600/30 dark:border-rose-500/30", bg: "bg-rose-500 text-white", text: "text-rose-900 dark:text-rose-100", glow: "shadow-[0_0_15px_-3px_rgba(225,29,72,0.3)]", brutalShadow: "shadow-[2px_2px_0px_0px_rgba(225,29,72,1)]" },
  amber: { border: "border-amber-600/30 dark:border-amber-500/30", bg: "bg-amber-500 text-white", text: "text-amber-900 dark:text-amber-100", glow: "shadow-[0_0_15px_-3px_rgba(217,119,6,0.3)]", brutalShadow: "shadow-[2px_2px_0px_0px_rgba(217,119,6,1)]" },
  violet: { border: "border-violet-600/30 dark:border-violet-500/30", bg: "bg-violet-600 text-white dark:bg-violet-500", text: "text-violet-900 dark:text-violet-100", glow: "shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)]", brutalShadow: "shadow-[2px_2px_0px_0px_rgba(124,58,237,1)]" },
  indigo: { border: "border-indigo-600/30 dark:border-indigo-500/30", bg: "bg-indigo-600 text-white dark:bg-indigo-500", text: "text-indigo-900 dark:text-indigo-100", glow: "shadow-[0_0_15px_-3px_rgba(79,70,229,0.3)]", brutalShadow: "shadow-[2px_2px_0px_0px_rgba(79,70,229,1)]" },
  sky: { border: "border-sky-600/30 dark:border-sky-500/30", bg: "bg-sky-500 text-white", text: "text-sky-900 dark:text-sky-100", glow: "shadow-[0_0_15px_-3px_rgba(2,132,199,0.3)]", brutalShadow: "shadow-[2px_2px_0px_0px_rgba(2,132,199,1)]" },
  slate: { border: "border-slate-600/30 dark:border-slate-500/30", bg: "bg-slate-600 text-white dark:bg-slate-500", text: "text-slate-900 dark:text-slate-100", glow: "shadow-[0_0_15px_-3px_rgba(71,85,105,0.3)]", brutalShadow: "shadow-[2px_2px_0px_0px_rgba(71,85,105,1)]" },
  orange: { border: "border-orange-600/30 dark:border-orange-500/30", bg: "bg-orange-500 text-white", text: "text-orange-900 dark:text-orange-100", glow: "shadow-[0_0_15px_-3px_rgba(234,88,12,0.3)]", brutalShadow: "shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]" },
};

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  color?: TooltipColor;
  theme?: TooltipTheme;
  variant?: TooltipVariant;
  shape?: TooltipShape;
  spacing?: TooltipSpacing;
  size?: TooltipSize;
}

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip: React.FC<TooltipProps> = ({ 
  color = "default", 
  theme = "default",
  variant = "solid",
  shape = "default", 
  spacing = "default", 
  size = "default",
  children, 
  ...props 
}) => {
  return (
    <TooltipContext.Provider value={{ color, theme, variant, shape, spacing, size }}>
      <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  const { color, theme, variant, shape, spacing, size } = React.useContext(TooltipContext);
  const activeTheme = colorThemeMap[color];

  const getContainerStyles = () => {
    // For tooltip, solid variant means we use the full background color (e.g., bg-blue-600 text-white).
    // The previous implementation used bg-blue-500 for the solid variant.
    // For outline, ghost, link, we use transparent or soft backgrounds and the specific text color.
    
    let baseBg = activeTheme.bg;
    let textStyle = "text-white";

    if (color === "default") {
      baseBg = "bg-foreground";
      textStyle = "text-background";
    }

    if (variant === "outline" || variant === "ghost" || variant === "link") {
      baseBg = variant === "ghost" || variant === "link" ? "bg-transparent backdrop-blur-md" : "bg-background";
      textStyle = color === "default" ? "text-foreground" : activeTheme.text;
    }

    switch (theme) {
      case "modern":
        return cn(baseBg, textStyle, "border border-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl", 
          color !== "default" && variant !== "ghost" && variant !== "link" ? activeTheme.border : "",
          color !== "default" && variant !== "ghost" && variant !== "link" ? activeTheme.glow : "shadow-[0_20px_50px_0] shadow-foreground/10 dark:shadow-foreground/5",
          (variant === "ghost" || variant === "link") ? "border-transparent shadow-none" : "");
      case "brutal":
        return cn(baseBg, textStyle, "border-2", 
          (variant === "ghost" || variant === "link") ? "border-transparent shadow-none" : (color !== "default" ? activeTheme.border : "border-foreground"),
          variant !== "ghost" && variant !== "link" ? (color !== "default" ? activeTheme.brutalShadow : activeTheme.brutalShadow) : "");
      case "futuristic":
        return cn(baseBg, textStyle, "border relative overflow-hidden", 
          "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-foreground/[0.02]",
          (variant === "outline" || variant === "ghost" || variant === "link") 
            ? ((variant === "ghost" || variant === "link") ? "border-transparent" : (color !== "default" ? activeTheme.border : "border-border"))
            : cn(color !== "default" ? activeTheme.border : "border-border", color !== "default" ? activeTheme.glow : "shadow-sm"),
          variant === "ghost" && "!border-transparent", variant === "link" && "!border-transparent !shadow-none");
      case "halftone":
        return cn(baseBg, textStyle, "border border-dashed relative overflow-hidden", 
          "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]",
          (variant === "ghost" || variant === "link") ? "border-transparent shadow-none" : (color !== "default" ? activeTheme.border : "border-foreground/20"),
          variant !== "ghost" && variant !== "link" ? (color !== "default" ? activeTheme.brutalShadow : "shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]") : "");
      case "clean":
        return cn(baseBg, textStyle, (variant === "ghost" || variant === "link") ? "border-transparent shadow-none" : "border-border/40 border-[0.5px]", 
          color !== "default" && variant !== "ghost" && variant !== "link" ? activeTheme.glow : "shadow-sm");
      case "default":
      default:
        return cn(baseBg, textStyle, (variant === "ghost" || variant === "link") ? "border-transparent shadow-none" : "border-border border", 
          color !== "default" && variant !== "ghost" && variant !== "link" ? activeTheme.glow : "shadow-md");
    }
  };

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-xl" : "rounded-md",
        spacing === "2x" ? "px-2 py-1" : spacing === "6x" ? "px-4 py-2" : spacing === "8x" ? "px-6 py-3" : "px-3 py-1.5",
        size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
        getContainerStyles(),
        className
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
