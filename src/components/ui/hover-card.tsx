"use client"

/**
 * @registry-slug hover-card
 * @registry-name Hover Card
 * @registry-description A standard Hover Card component.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

export type HoverCardColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type HoverCardTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
export type HoverCardVariant = "solid" | "outline" | "ghost" | "link";
export type HoverCardShape = "default" | "square" | "rounded" | "sharp";
export type HoverCardSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface HoverCardContextValue {
  color: HoverCardColor;
  theme: HoverCardTheme;
  variant: HoverCardVariant;
  shape: HoverCardShape;
  spacing: HoverCardSpacing;
}

const HoverCardContext = React.createContext<HoverCardContextValue>({
  color: "default",
  theme: "default",
  variant: "solid",
  shape: "default",
  spacing: "default",
});

const colorThemeMap: Record<HoverCardColor, { border: string; bg: string; text: string; glow: string; brutalShadow: string; }> = {
  default: { border: "border-border", bg: "bg-background", text: "text-foreground", glow: "shadow-md", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" },
  blue: { border: "border-blue-600/30 dark:border-blue-500/30", bg: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-900 dark:text-blue-100", glow: "shadow-[0_0_15px_-3px_rgba(37,99,235,0.3)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]" },
  emerald: { border: "border-emerald-600/30 dark:border-emerald-500/30", bg: "bg-emerald-50 dark:bg-emerald-950/20", text: "text-emerald-900 dark:text-emerald-100", glow: "shadow-[0_0_15px_-3px_rgba(5,150,105,0.3)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(5,150,105,1)]" },
  rose: { border: "border-rose-600/30 dark:border-rose-500/30", bg: "bg-rose-50 dark:bg-rose-950/20", text: "text-rose-900 dark:text-rose-100", glow: "shadow-[0_0_15px_-3px_rgba(225,29,72,0.3)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]" },
  amber: { border: "border-amber-600/30 dark:border-amber-500/30", bg: "bg-amber-50 dark:bg-amber-950/20", text: "text-amber-900 dark:text-amber-100", glow: "shadow-[0_0_15px_-3px_rgba(217,119,6,0.3)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(217,119,6,1)]" },
  violet: { border: "border-violet-600/30 dark:border-violet-500/30", bg: "bg-violet-50 dark:bg-violet-950/20", text: "text-violet-900 dark:text-violet-100", glow: "shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(124,58,237,1)]" },
  indigo: { border: "border-indigo-600/30 dark:border-indigo-500/30", bg: "bg-indigo-50 dark:bg-indigo-950/20", text: "text-indigo-900 dark:text-indigo-100", glow: "shadow-[0_0_15px_-3px_rgba(79,70,229,0.3)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]" },
  sky: { border: "border-sky-600/30 dark:border-sky-500/30", bg: "bg-sky-50 dark:bg-sky-950/20", text: "text-sky-900 dark:text-sky-100", glow: "shadow-[0_0_15px_-3px_rgba(2,132,199,0.3)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(2,132,199,1)]" },
  slate: { border: "border-slate-600/30 dark:border-slate-500/30", bg: "bg-slate-50 dark:bg-slate-950/20", text: "text-slate-900 dark:text-slate-100", glow: "shadow-[0_0_15px_-3px_rgba(71,85,105,0.3)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(71,85,105,1)]" },
  orange: { border: "border-orange-600/30 dark:border-orange-500/30", bg: "bg-orange-50 dark:bg-orange-950/20", text: "text-orange-900 dark:text-orange-100", glow: "shadow-[0_0_15px_-3px_rgba(234,88,12,0.3)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]" },
};

export interface HoverCardProps extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> {
  color?: HoverCardColor;
  theme?: HoverCardTheme;
  variant?: HoverCardVariant;
  shape?: HoverCardShape;
  spacing?: HoverCardSpacing;
}

const HoverCard: React.FC<HoverCardProps> = ({ 
  color = "default", 
  theme = "default",
  variant = "solid",
  shape = "default", 
  spacing = "default", 
  children, 
  ...props 
}) => {
  return (
    <HoverCardContext.Provider value={{ color, theme, variant, shape, spacing }}>
      <HoverCardPrimitive.Root {...props}>{children}</HoverCardPrimitive.Root>
    </HoverCardContext.Provider>
  );
};

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
  const { color, theme, variant, shape, spacing } = React.useContext(HoverCardContext);
  const activeTheme = colorThemeMap[color];

  const getContainerStyles = () => {
    const baseBg = variant === "ghost" || variant === "link" ? "bg-transparent backdrop-blur-md" : (color === "default" ? "bg-background" : activeTheme.bg);
    const textStyle = color === "default" ? "text-foreground" : activeTheme.text;

    switch (theme) {
      case "modern":
        return cn(baseBg, textStyle, "border border-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl", 
          color !== "default" && variant !== "ghost" && variant !== "link" ? activeTheme.border : "",
          color !== "default" && variant !== "ghost" && variant !== "link" ? activeTheme.glow : "shadow-[0_20px_50px_0] shadow-foreground/10 dark:shadow-foreground/5",
          (variant === "ghost" || variant === "link") ? "border-transparent shadow-none" : "");
      case "brutal":
        return cn(baseBg, textStyle, "border-4", 
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
        return cn(baseBg, textStyle, "border-2 border-dashed relative overflow-hidden", 
          "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]",
          (variant === "ghost" || variant === "link") ? "border-transparent shadow-none" : (color !== "default" ? activeTheme.border : "border-foreground/20"),
          variant !== "ghost" && variant !== "link" ? (color !== "default" ? activeTheme.brutalShadow : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]") : "");
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
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
        shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
        spacing === "2x" ? "p-2" : spacing === "4x" ? "p-4" : spacing === "6x" ? "p-6" : spacing === "8x" ? "p-8" : "p-4",
        getContainerStyles(),
        className
      )}
      {...props}
    />
  )
})
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
