"use client"

/**
 * @registry-slug dropdown-menu
 * @registry-name Dropdown Menu
 * @registry-description A standard Dropdown Menu component with uniquely distinct premium variants and animations.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

export type DropdownVariant = "default" | "premium" | "clean" | "solid" | "floating" | "minimal";
export type DropdownSize = "default" | "sm" | "md" | "lg" | "xl";
export type DropdownColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type DropdownShape = "default" | "square" | "rounded" | "sharp";
export type DropdownSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface DropdownMenuContextValue {
  variant: DropdownVariant;
  size: DropdownSize;
  color: DropdownColor;
  shape: DropdownShape;
  spacing: DropdownSpacing;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue>({
  variant: "default",
  size: "default",
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface DropdownMenuProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
  variant?: DropdownVariant;
  size?: DropdownSize;
  color?: DropdownColor;
  shape?: DropdownShape;
  spacing?: DropdownSpacing;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ variant = "default", size = "default", color = "default", shape = "default", spacing = "default", children, ...props }) => {
  return (
    <DropdownMenuContext.Provider value={{ variant, size, color, shape, spacing }}>
      <DropdownMenuPrimitive.Root {...props}>{children}</DropdownMenuPrimitive.Root>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const getFocusClasses = (variant: DropdownVariant, color: DropdownColor) => {
  if (variant === "solid") {
    return "focus:bg-white/20 focus:text-white data-[state=open]:bg-white/20 focus:backdrop-blur-md";
  }
  
  if (variant === "floating") {
    switch (color) {
      case "blue": return "focus:bg-blue-50/80 focus:text-blue-700 dark:focus:bg-blue-500/10 dark:focus:text-blue-300 focus:scale-[0.98] transition-all";
      case "emerald": return "focus:bg-emerald-50/80 focus:text-emerald-700 dark:focus:bg-emerald-500/10 dark:focus:text-emerald-300 focus:scale-[0.98] transition-all";
      case "rose": return "focus:bg-rose-50/80 focus:text-rose-700 dark:focus:bg-rose-500/10 dark:focus:text-rose-300 focus:scale-[0.98] transition-all";
      case "amber": return "focus:bg-amber-50/80 focus:text-amber-700 dark:focus:bg-amber-500/10 dark:focus:text-amber-300 focus:scale-[0.98] transition-all";
      case "violet": return "focus:bg-violet-50/80 focus:text-violet-700 dark:focus:bg-violet-500/10 dark:focus:text-violet-300 focus:scale-[0.98] transition-all";
      case "indigo": return "focus:bg-indigo-50/80 focus:text-indigo-700 dark:focus:bg-indigo-500/10 dark:focus:text-indigo-300 focus:scale-[0.98] transition-all";
      case "sky": return "focus:bg-sky-50/80 focus:text-sky-700 dark:focus:bg-sky-500/10 dark:focus:text-sky-300 focus:scale-[0.98] transition-all";
      case "slate": return "focus:bg-slate-50/80 focus:text-slate-700 dark:focus:bg-slate-500/10 dark:focus:text-slate-300 focus:scale-[0.98] transition-all";
      case "orange": return "focus:bg-orange-50/80 focus:text-orange-700 dark:focus:bg-orange-500/10 dark:focus:text-orange-300 focus:scale-[0.98] transition-all";
      default: return "focus:bg-accent/80 focus:text-accent-foreground focus:scale-[0.98] transition-all";
    }
  }

  if (variant === "minimal") {
    switch (color) {
      case "blue": return "focus:bg-transparent focus:text-blue-600 dark:focus:text-blue-400 focus:border-l-2 focus:border-blue-500 pl-2 -ml-2 rounded-none transition-all";
      case "emerald": return "focus:bg-transparent focus:text-emerald-600 dark:focus:text-emerald-400 focus:border-l-2 focus:border-emerald-500 pl-2 -ml-2 rounded-none transition-all";
      case "rose": return "focus:bg-transparent focus:text-rose-600 dark:focus:text-rose-400 focus:border-l-2 focus:border-rose-500 pl-2 -ml-2 rounded-none transition-all";
      case "amber": return "focus:bg-transparent focus:text-amber-600 dark:focus:text-amber-400 focus:border-l-2 focus:border-amber-500 pl-2 -ml-2 rounded-none transition-all";
      case "violet": return "focus:bg-transparent focus:text-violet-600 dark:focus:text-violet-400 focus:border-l-2 focus:border-violet-500 pl-2 -ml-2 rounded-none transition-all";
      case "indigo": return "focus:bg-transparent focus:text-indigo-600 dark:focus:text-indigo-400 focus:border-l-2 focus:border-indigo-500 pl-2 -ml-2 rounded-none transition-all";
      case "sky": return "focus:bg-transparent focus:text-sky-600 dark:focus:text-sky-400 focus:border-l-2 focus:border-sky-500 pl-2 -ml-2 rounded-none transition-all";
      case "slate": return "focus:bg-transparent focus:text-slate-600 dark:focus:text-slate-400 focus:border-l-2 focus:border-slate-500 pl-2 -ml-2 rounded-none transition-all";
      case "orange": return "focus:bg-transparent focus:text-orange-600 dark:focus:text-orange-400 focus:border-l-2 focus:border-orange-500 pl-2 -ml-2 rounded-none transition-all";
      default: return "focus:bg-transparent focus:text-foreground focus:border-l-2 focus:border-foreground pl-2 -ml-2 rounded-none transition-all";
    }
  }

  if (variant === "clean") {
    switch (color) {
      case "blue": return "focus:bg-blue-500/5 focus:text-blue-600 dark:focus:text-blue-400";
      case "emerald": return "focus:bg-emerald-500/5 focus:text-emerald-600 dark:focus:text-emerald-400";
      case "rose": return "focus:bg-rose-500/5 focus:text-rose-600 dark:focus:text-rose-400";
      case "amber": return "focus:bg-amber-500/5 focus:text-amber-600 dark:focus:text-amber-400";
      case "violet": return "focus:bg-violet-500/5 focus:text-violet-600 dark:focus:text-violet-400";
      case "indigo": return "focus:bg-indigo-500/5 focus:text-indigo-600 dark:focus:text-indigo-400";
      case "sky": return "focus:bg-sky-500/5 focus:text-sky-600 dark:focus:text-sky-400";
      case "slate": return "focus:bg-slate-500/5 focus:text-slate-600 dark:focus:text-slate-400";
      case "orange": return "focus:bg-orange-500/5 focus:text-orange-600 dark:focus:text-orange-400";
      default: return "focus:bg-accent/50 focus:text-accent-foreground";
    }
  }

  if (variant === "premium") {
     switch (color) {
      case "blue": return "focus:bg-blue-500/15 focus:text-blue-700 dark:focus:text-blue-300 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]";
      case "emerald": return "focus:bg-emerald-500/15 focus:text-emerald-700 dark:focus:text-emerald-300 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]";
      case "rose": return "focus:bg-rose-500/15 focus:text-rose-700 dark:focus:text-rose-300 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]";
      case "amber": return "focus:bg-amber-500/15 focus:text-amber-700 dark:focus:text-amber-300 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]";
      case "violet": return "focus:bg-violet-500/15 focus:text-violet-700 dark:focus:text-violet-300 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]";
      case "indigo": return "focus:bg-indigo-500/15 focus:text-indigo-700 dark:focus:text-indigo-300 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]";
      case "sky": return "focus:bg-sky-500/15 focus:text-sky-700 dark:focus:text-sky-300 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]";
      case "slate": return "focus:bg-slate-500/15 focus:text-slate-700 dark:focus:text-slate-300 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]";
      case "orange": return "focus:bg-orange-500/15 focus:text-orange-700 dark:focus:text-orange-300 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]";
      default: return "focus:bg-white/10 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]";
     }
  }

  // Default
  switch (color) {
    case "blue": return "focus:bg-blue-100 focus:text-blue-900 dark:focus:bg-blue-900/30 dark:focus:text-blue-100 data-[state=open]:bg-blue-100 dark:data-[state=open]:bg-blue-900/30";
    case "emerald": return "focus:bg-emerald-100 focus:text-emerald-900 dark:focus:bg-emerald-900/30 dark:focus:text-emerald-100 data-[state=open]:bg-emerald-100 dark:data-[state=open]:bg-emerald-900/30";
    case "rose": return "focus:bg-rose-100 focus:text-rose-900 dark:focus:bg-rose-900/30 dark:focus:text-rose-100 data-[state=open]:bg-rose-100 dark:data-[state=open]:bg-rose-900/30";
    case "amber": return "focus:bg-amber-100 focus:text-amber-900 dark:focus:bg-amber-900/30 dark:focus:text-amber-100 data-[state=open]:bg-amber-100 dark:data-[state=open]:bg-amber-900/30";
    case "violet": return "focus:bg-violet-100 focus:text-violet-900 dark:focus:bg-violet-900/30 dark:focus:text-violet-100 data-[state=open]:bg-violet-100 dark:data-[state=open]:bg-violet-900/30";
    case "indigo": return "focus:bg-indigo-100 focus:text-indigo-900 dark:focus:bg-indigo-900/30 dark:focus:text-indigo-100 data-[state=open]:bg-indigo-100 dark:data-[state=open]:bg-indigo-900/30";
    case "sky": return "focus:bg-sky-100 focus:text-sky-900 dark:focus:bg-sky-900/30 dark:focus:text-sky-100 data-[state=open]:bg-sky-100 dark:data-[state=open]:bg-sky-900/30";
    case "slate": return "focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-900/30 dark:focus:text-slate-100 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-900/30";
    case "orange": return "focus:bg-orange-100 focus:text-orange-900 dark:focus:bg-orange-900/30 dark:focus:text-orange-100 data-[state=open]:bg-orange-100 dark:data-[state=open]:bg-orange-900/30";
    default: return "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent";
  }
};

const getAnimationClasses = (variant: DropdownVariant) => {
  const baseEntry = "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";
  
  if (variant === "premium") {
    return cn(baseEntry, "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-4 data-[side=top]:slide-in-from-bottom-4 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]");
  }
  if (variant === "floating") {
    return cn(baseEntry, "data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-90 data-[side=bottom]:slide-in-from-top-6 data-[side=top]:slide-in-from-bottom-6 duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]");
  }
  if (variant === "clean") {
    return cn(baseEntry, "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-500 ease-out");
  }
  if (variant === "solid") {
    return cn(baseEntry, "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]");
  }
  if (variant === "minimal") {
    return cn(baseEntry, "data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1 duration-200 ease-in-out");
  }
  // default
  return cn(baseEntry, "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-300");
}

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => {
  const { color, shape, spacing, variant } = React.useContext(DropdownMenuContext);

  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center gap-2 outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-sm",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-3 py-2 text-base" : "px-2 py-1.5 text-sm",
        inset && "pl-8",
        getFocusClasses(variant, color),
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
})
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const getContentClasses = (variant: DropdownVariant, color: DropdownColor) => {
  if (variant === "solid") {
    switch (color) {
      case "blue": return "bg-gradient-to-b from-blue-500 to-blue-600 border-blue-400/50 text-white shadow-[0_20px_40px_-15px_rgba(37,99,235,0.5)] ring-1 ring-blue-500/50";
      case "emerald": return "bg-gradient-to-b from-emerald-500 to-emerald-600 border-emerald-400/50 text-white shadow-[0_20px_40px_-15px_rgba(16,185,129,0.5)] ring-1 ring-emerald-500/50";
      case "rose": return "bg-gradient-to-b from-rose-500 to-rose-600 border-rose-400/50 text-white shadow-[0_20px_40px_-15px_rgba(244,63,94,0.5)] ring-1 ring-rose-500/50";
      case "amber": return "bg-gradient-to-b from-amber-500 to-amber-600 border-amber-400/50 text-white shadow-[0_20px_40px_-15px_rgba(245,158,11,0.5)] ring-1 ring-amber-500/50";
      case "violet": return "bg-gradient-to-b from-violet-500 to-violet-600 border-violet-400/50 text-white shadow-[0_20px_40px_-15px_rgba(139,92,246,0.5)] ring-1 ring-violet-500/50";
      case "indigo": return "bg-gradient-to-b from-indigo-500 to-indigo-600 border-indigo-400/50 text-white shadow-[0_20px_40px_-15px_rgba(99,102,241,0.5)] ring-1 ring-indigo-500/50";
      case "sky": return "bg-gradient-to-b from-sky-500 to-sky-600 border-sky-400/50 text-white shadow-[0_20px_40px_-15px_rgba(14,165,233,0.5)] ring-1 ring-sky-500/50";
      case "slate": return "bg-gradient-to-b from-slate-600 to-slate-700 border-slate-500/50 text-white shadow-[0_20px_40px_-15px_rgba(71,85,105,0.5)] ring-1 ring-slate-500/50";
      case "orange": return "bg-gradient-to-b from-orange-500 to-orange-600 border-orange-400/50 text-white shadow-[0_20px_40px_-15px_rgba(249,115,22,0.5)] ring-1 ring-orange-500/50";
      default: return "bg-gradient-to-b from-zinc-800 to-zinc-950 border-zinc-700/50 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/10 dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-950 dark:border-white/50 dark:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.2)]";
    }
  }

  if (variant === "premium") {
    switch (color) {
      case "blue": return "bg-background/40 backdrop-blur-[40px] border-blue-500/30 shadow-[0_8px_40px_-12px_rgba(37,99,235,0.3)] ring-1 ring-white/20 dark:ring-white/10";
      case "emerald": return "bg-background/40 backdrop-blur-[40px] border-emerald-500/30 shadow-[0_8px_40px_-12px_rgba(16,185,129,0.3)] ring-1 ring-white/20 dark:ring-white/10";
      case "rose": return "bg-background/40 backdrop-blur-[40px] border-rose-500/30 shadow-[0_8px_40px_-12px_rgba(244,63,94,0.3)] ring-1 ring-white/20 dark:ring-white/10";
      case "amber": return "bg-background/40 backdrop-blur-[40px] border-amber-500/30 shadow-[0_8px_40px_-12px_rgba(245,158,11,0.3)] ring-1 ring-white/20 dark:ring-white/10";
      case "violet": return "bg-background/40 backdrop-blur-[40px] border-violet-500/30 shadow-[0_8px_40px_-12px_rgba(139,92,246,0.3)] ring-1 ring-white/20 dark:ring-white/10";
      case "indigo": return "bg-background/40 backdrop-blur-[40px] border-indigo-500/30 shadow-[0_8px_40px_-12px_rgba(99,102,241,0.3)] ring-1 ring-white/20 dark:ring-white/10";
      case "sky": return "bg-background/40 backdrop-blur-[40px] border-sky-500/30 shadow-[0_8px_40px_-12px_rgba(14,165,233,0.3)] ring-1 ring-white/20 dark:ring-white/10";
      case "slate": return "bg-background/40 backdrop-blur-[40px] border-slate-500/30 shadow-[0_8px_40px_-12px_rgba(71,85,105,0.3)] ring-1 ring-white/20 dark:ring-white/10";
      case "orange": return "bg-background/40 backdrop-blur-[40px] border-orange-500/30 shadow-[0_8px_40px_-12px_rgba(249,115,22,0.3)] ring-1 ring-white/20 dark:ring-white/10";
      default: return "bg-background/40 backdrop-blur-[40px] border-foreground/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)] ring-1 ring-white/20 dark:ring-white/10";
    }
  }

  if (variant === "clean") {
    switch(color) {
      case "blue": return "bg-background/95 border-none shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/5";
      case "emerald": return "bg-background/95 border-none shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/5";
      case "rose": return "bg-background/95 border-none shadow-[0_30px_60px_-15px_rgba(244,63,94,0.15)] ring-1 ring-rose-500/5";
      case "amber": return "bg-background/95 border-none shadow-[0_30px_60px_-15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/5";
      case "violet": return "bg-background/95 border-none shadow-[0_30px_60px_-15px_rgba(139,92,246,0.15)] ring-1 ring-violet-500/5";
      case "indigo": return "bg-background/95 border-none shadow-[0_30px_60px_-15px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/5";
      case "sky": return "bg-background/95 border-none shadow-[0_30px_60px_-15px_rgba(14,165,233,0.15)] ring-1 ring-sky-500/5";
      case "slate": return "bg-background/95 border-none shadow-[0_30px_60px_-15px_rgba(100,116,139,0.15)] ring-1 ring-slate-500/5";
      case "orange": return "bg-background/95 border-none shadow-[0_30px_60px_-15px_rgba(249,115,22,0.15)] ring-1 ring-orange-500/5";
      default: return "bg-background/95 border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] ring-1 ring-foreground/5 dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]";
    }
  }

  if (variant === "floating") {
    switch(color) {
      case "blue": return "bg-background border border-blue-500/20 shadow-[0_0_0_1px_rgba(37,99,235,0.02),0_30px_60px_-12px_rgba(37,99,235,0.25)] translate-y-2";
      case "emerald": return "bg-background border border-emerald-500/20 shadow-[0_0_0_1px_rgba(16,185,129,0.02),0_30px_60px_-12px_rgba(16,185,129,0.25)] translate-y-2";
      case "rose": return "bg-background border border-rose-500/20 shadow-[0_0_0_1px_rgba(244,63,94,0.02),0_30px_60px_-12px_rgba(244,63,94,0.25)] translate-y-2";
      case "amber": return "bg-background border border-amber-500/20 shadow-[0_0_0_1px_rgba(245,158,11,0.02),0_30px_60px_-12px_rgba(245,158,11,0.25)] translate-y-2";
      case "violet": return "bg-background border border-violet-500/20 shadow-[0_0_0_1px_rgba(139,92,246,0.02),0_30px_60px_-12px_rgba(139,92,246,0.25)] translate-y-2";
      case "indigo": return "bg-background border border-indigo-500/20 shadow-[0_0_0_1px_rgba(99,102,241,0.02),0_30px_60px_-12px_rgba(99,102,241,0.25)] translate-y-2";
      case "sky": return "bg-background border border-sky-500/20 shadow-[0_0_0_1px_rgba(14,165,233,0.02),0_30px_60px_-12px_rgba(14,165,233,0.25)] translate-y-2";
      case "slate": return "bg-background border border-slate-500/20 shadow-[0_0_0_1px_rgba(100,116,139,0.02),0_30px_60px_-12px_rgba(100,116,139,0.25)] translate-y-2";
      case "orange": return "bg-background border border-orange-500/20 shadow-[0_0_0_1px_rgba(249,115,22,0.02),0_30px_60px_-12px_rgba(249,115,22,0.25)] translate-y-2";
      default: return "bg-background border border-border/50 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_30px_60px_-12px_rgba(0,0,0,0.2)] translate-y-2 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_60px_-12px_rgba(0,0,0,0.5)]";
    }
  }

  if (variant === "minimal") {
    return "bg-background border-2 border-foreground/10 shadow-none ring-0";
  }

  // default
  return "bg-background border border-border shadow-md";
};

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => {
  const { shape, variant, size, color } = React.useContext(DropdownMenuContext);
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 overflow-hidden p-1 text-foreground origin-[--radix-dropdown-menu-content-transform-origin]",
        getAnimationClasses(variant),
        shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
        size === "sm" ? "min-w-[10rem]" : size === "lg" ? "min-w-[16rem]" : size === "xl" ? "min-w-[20rem]" : "min-w-[12rem]",
        getContentClasses(variant, color),
        className
      )}
      {...props}
    />
  )
})
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  const { shape, variant, size, color } = React.useContext(DropdownMenuContext);
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={variant === "floating" ? sideOffset + 8 : sideOffset}
        className={cn(
          "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto overflow-x-hidden p-1 text-foreground origin-[--radix-dropdown-menu-content-transform-origin]",
          getAnimationClasses(variant),
          shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
          size === "sm" ? "min-w-[10rem]" : size === "lg" ? "min-w-[16rem]" : size === "xl" ? "min-w-[20rem]" : "min-w-[12rem]",
          getContentClasses(variant, color),
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
})
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => {
  const { color, shape, spacing, variant } = React.useContext(DropdownMenuContext);
  
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-md",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-3 py-2 text-base" : "px-2 py-1.5 text-sm",
        inset && "pl-8",
        getFocusClasses(variant, color),
        className
      )}
      {...props}
    />
  )
})
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
  const { color, shape, spacing, variant } = React.useContext(DropdownMenuContext);
  
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-md",
        spacing === "2x" ? "py-1 pl-8 pr-2 text-xs" : spacing === "6x" || spacing === "8x" ? "py-2 pl-10 pr-3 text-base" : "py-1.5 pl-8 pr-2 text-sm",
        getFocusClasses(variant, color),
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
})
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => {
  const { color, shape, spacing, variant } = React.useContext(DropdownMenuContext);
  
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-md",
        spacing === "2x" ? "py-1 pl-8 pr-2 text-xs" : spacing === "6x" || spacing === "8x" ? "py-2 pl-10 pr-3 text-base" : "py-1.5 pl-8 pr-2 text-sm",
        getFocusClasses(variant, color),
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
})
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => {
  const { spacing, variant } = React.useContext(DropdownMenuContext);
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "font-semibold",
        variant === "solid" ? "text-white/80" : "",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-3 py-2 text-base" : "px-2 py-1.5 text-sm",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
})
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(DropdownMenuContext);
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px", 
        variant === "solid" ? "bg-white/20" : 
        variant === "premium" ? "bg-border/50" :
        variant === "clean" ? "bg-border/30" :
        variant === "floating" ? "bg-border/40" :
        variant === "minimal" ? "bg-foreground/10" :
        "bg-border", 
        className
      )}
      {...props}
    />
  );
})
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  const { variant } = React.useContext(DropdownMenuContext);
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", variant === "solid" ? "text-white/80" : "", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
