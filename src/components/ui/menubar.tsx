"use client"

/**
 * @registry-slug menubar
 * @registry-name Menubar
 * @registry-description A standard Menubar component.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

export type MenubarColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type MenubarVariant = "solid" | "outline" | "ghost" | "link";
export type MenubarShape = "default" | "square" | "rounded" | "sharp";
export type MenubarSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type MenubarTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";

const colorThemeMap: Record<MenubarColor, { bgIndicator: string; hoverBorder: string; textIndicator: string; focusRing: string; bgSoft: string; borderIndicator: string }> = {
  default: { bgIndicator: "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]", hoverBorder: "hover:border-primary/50", textIndicator: "text-primary", focusRing: "focus:ring-primary/50", bgSoft: "bg-primary/5", borderIndicator: "border-primary/40 hover:border-l-primary" },
  blue: { bgIndicator: "bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.5)] dark:shadow-[0_0_8px_rgba(59,130,246,0.5)]", hoverBorder: "hover:border-blue-600/50 dark:hover:border-blue-500/50", textIndicator: "text-blue-600 dark:text-blue-500", focusRing: "focus:ring-blue-600/50 dark:focus:ring-blue-500/50", bgSoft: "bg-blue-600/5 dark:bg-blue-500/5", borderIndicator: "border-blue-600/40 dark:border-blue-500/40 hover:border-l-blue-600 dark:hover:border-l-blue-500" },
  emerald: { bgIndicator: "bg-emerald-600 dark:bg-emerald-500 shadow-[0_0_8px_rgba(22,163,74,0.5)] dark:shadow-[0_0_8px_rgba(34,197,94,0.5)]", hoverBorder: "hover:border-emerald-600/50 dark:hover:border-emerald-500/50", textIndicator: "text-emerald-600 dark:text-emerald-500", focusRing: "focus:ring-emerald-600/50 dark:focus:ring-emerald-500/50", bgSoft: "bg-emerald-600/5 dark:bg-emerald-500/5", borderIndicator: "border-emerald-600/40 dark:border-emerald-500/40 hover:border-l-emerald-600 dark:hover:border-l-emerald-500" },
  rose: { bgIndicator: "bg-rose-600 dark:bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.5)] dark:shadow-[0_0_8px_rgba(244,63,94,0.5)]", hoverBorder: "hover:border-rose-600/50 dark:hover:border-rose-500/50", textIndicator: "text-rose-600 dark:text-rose-500", focusRing: "focus:ring-rose-600/50 dark:focus:ring-rose-500/50", bgSoft: "bg-rose-600/5 dark:bg-rose-500/5", borderIndicator: "border-rose-600/40 dark:border-rose-500/40 hover:border-l-rose-600 dark:hover:border-l-rose-500" },
  amber: { bgIndicator: "bg-amber-600 dark:bg-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.5)] dark:shadow-[0_0_8px_rgba(245,158,11,0.5)]", hoverBorder: "hover:border-amber-600/50 dark:hover:border-amber-500/50", textIndicator: "text-amber-600 dark:text-amber-500", focusRing: "focus:ring-amber-600/50 dark:focus:ring-amber-500/50", bgSoft: "bg-amber-600/5 dark:bg-amber-500/5", borderIndicator: "border-amber-600/40 dark:border-amber-500/40 hover:border-l-amber-600 dark:hover:border-l-amber-500" },
  violet: { bgIndicator: "bg-violet-600 dark:bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.5)] dark:shadow-[0_0_8px_rgba(139,92,246,0.5)]", hoverBorder: "hover:border-violet-600/50 dark:hover:border-violet-500/50", textIndicator: "text-violet-600 dark:text-violet-500", focusRing: "focus:ring-violet-600/50 dark:focus:ring-violet-500/50", bgSoft: "bg-violet-600/5 dark:bg-violet-500/5", borderIndicator: "border-violet-600/40 dark:border-violet-500/40 hover:border-l-violet-600 dark:hover:border-l-violet-500" },
  indigo: { bgIndicator: "bg-indigo-600 dark:bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)] dark:shadow-[0_0_8px_rgba(99,102,241,0.5)]", hoverBorder: "hover:border-indigo-600/50 dark:hover:border-indigo-500/50", textIndicator: "text-indigo-600 dark:text-indigo-500", focusRing: "focus:ring-indigo-600/50 dark:focus:ring-indigo-500/50", bgSoft: "bg-indigo-600/5 dark:bg-indigo-500/5", borderIndicator: "border-indigo-600/40 dark:border-indigo-500/40 hover:border-l-indigo-600 dark:hover:border-l-indigo-500" },
  sky: { bgIndicator: "bg-sky-600 dark:bg-sky-500 shadow-[0_0_8px_rgba(2,132,199,0.5)] dark:shadow-[0_0_8px_rgba(14,165,233,0.5)]", hoverBorder: "hover:border-sky-600/50 dark:hover:border-sky-500/50", textIndicator: "text-sky-600 dark:text-sky-500", focusRing: "focus:ring-sky-600/50 dark:focus:ring-sky-500/50", bgSoft: "bg-sky-600/5 dark:bg-sky-500/5", borderIndicator: "border-sky-600/40 dark:border-sky-500/40 hover:border-l-sky-600 dark:hover:border-l-sky-500" },
  slate: { bgIndicator: "bg-slate-600 dark:bg-slate-500 shadow-[0_0_8px_rgba(71,85,105,0.5)] dark:shadow-[0_0_8px_rgba(100,116,139,0.5)]", hoverBorder: "hover:border-slate-600/50 dark:hover:border-slate-500/50", textIndicator: "text-slate-600 dark:text-slate-500", focusRing: "focus:ring-slate-600/50 dark:focus:ring-slate-500/50", bgSoft: "bg-slate-600/5 dark:bg-slate-500/5", borderIndicator: "border-slate-600/40 dark:border-slate-500/40 hover:border-l-slate-600 dark:hover:border-l-slate-500" },
  orange: { bgIndicator: "bg-orange-600 dark:bg-orange-500 shadow-[0_0_8px_rgba(234,88,12,0.5)] dark:shadow-[0_0_8px_rgba(249,115,22,0.5)]", hoverBorder: "hover:border-orange-600/50 dark:hover:border-orange-500/50", textIndicator: "text-orange-600 dark:text-orange-500", focusRing: "focus:ring-orange-600/50 dark:focus:ring-orange-500/50", bgSoft: "bg-orange-600/5 dark:bg-orange-500/5", borderIndicator: "border-orange-600/40 dark:border-orange-500/40 hover:border-l-orange-600 dark:hover:border-l-orange-500" },
};

interface MenubarContextValue {
  color: MenubarColor;
  variant: MenubarVariant;
  shape: MenubarShape;
  spacing: MenubarSpacing;
  theme: MenubarTheme;
}

const MenubarContext = React.createContext<MenubarContextValue>({
  color: "default",
  variant: "outline",
  shape: "default",
  spacing: "default",
  theme: "default",
});

export interface MenubarProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> {
  color?: MenubarColor;
  variant?: MenubarVariant;
  shape?: MenubarShape;
  spacing?: MenubarSpacing;
  theme?: MenubarTheme;
}

const Menubar: React.FC<MenubarProps> = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>(({ className, color = "default", variant = "outline", shape = "default", spacing = "default", theme = "default", ...props }, ref) => {
  const getThemeClass = () => {
    const activeTheme = colorThemeMap[color];
    switch (theme) {
      case "modern": return cn("backdrop-blur-2xl bg-gradient-to-br from-background/90 to-muted/40 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.03)] border-foreground/5 transition-all duration-300", activeTheme.hoverBorder);
      case "clean": return "bg-transparent border-b-2 border-x-0 border-t-0 border-foreground/10 hover:border-foreground/40 shadow-none transition-all duration-500 rounded-none";
      case "futuristic": return cn("bg-background/80 backdrop-blur-3xl shadow-[0_0_15px_rgba(var(--primary),0.15)] transition-all duration-300 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm uppercase tracking-wider", activeTheme.borderIndicator);
      case "brutal": return "border-2 border-foreground shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] rounded-none font-mono";
      case "halftone": return "bg-[radial-gradient(circle_at_center,var(--primary)_1.5px,transparent_1.5px)] bg-[size:6px_6px] bg-background/90";
      default: return "";
    }
  };

  const getVariantClass = () => {
    if (theme === "clean" || theme === "brutal") return ""; // these themes override borders/bg
    
    // Fallbacks if theme doesn't override completely
    switch (variant) {
      case "solid": return "bg-muted/50 border border-border";
      case "outline": return "bg-background border border-border";
      case "ghost": return "bg-transparent border-transparent";
      case "link": return "bg-transparent border-transparent";
      default: return "";
    }
  };

  return (
    <MenubarContext.Provider value={{ color, variant, shape, spacing, theme }}>
      <MenubarPrimitive.Root
        ref={ref}
        className={cn(
          "flex items-center space-x-1 p-1",
          shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-2xl" : "rounded-md",
          spacing === "2x" ? "h-8" : spacing === "6x" ? "h-12" : spacing === "8x" ? "h-14 p-2" : "h-10",
          getVariantClass(),
          getThemeClass(),
          className
        )}
        {...props}
      />
    </MenubarContext.Provider>
  );
})
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(MenubarContext);
  
  const getFocusClasses = () => {
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

  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center font-medium outline-none transition-colors",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-sm",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-4 py-2 text-base" : "px-3 py-1.5 text-sm",
        getFocusClasses(),
        className
      )}
      {...props}
    />
  )
})
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(MenubarContext);
  
  const getFocusClasses = () => {
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

  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center gap-2 outline-none transition-colors",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-sm",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-3 py-2 text-base" : "px-2 py-1.5 text-sm",
        inset && "pl-8",
        getFocusClasses(),
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
})
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => {
  const { shape, theme, variant, color } = React.useContext(MenubarContext);

  const getThemeClass = () => {
    const activeTheme = colorThemeMap[color];
    switch (theme) {
      case "modern": return cn("backdrop-blur-2xl bg-gradient-to-br from-background/95 to-muted/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-foreground/5", activeTheme.borderIndicator);
      case "clean": return "bg-background border border-foreground/10 shadow-sm";
      case "futuristic": return cn("bg-background/90 backdrop-blur-3xl uppercase tracking-wider", activeTheme.borderIndicator, activeTheme.bgIndicator.replace("bg-", "shadow-").replace("shadow-[", "shadow-[0_0_15px_").replace(/rgba\(([^,]+,[^,]+,[^,]+),[^)]+\)/g, "rgba($1,0.15)"));
      case "brutal": return "border-2 border-foreground shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] rounded-none font-mono";
      case "halftone": return cn("bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-[size:4px_4px] bg-background/95 shadow-md", activeTheme.borderIndicator);
      default: return cn("bg-background shadow-md", activeTheme.borderIndicator);
    }
  };

  const getVariantClass = () => {
    if (theme === "clean" || theme === "brutal") return "";
    const activeTheme = colorThemeMap[color];
    switch (variant) {
      case "solid": return cn("bg-muted/95", activeTheme.borderIndicator);
      default: return "";
    }
  };

  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden p-1 text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
        shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl border",
        getThemeClass(),
        getVariantClass(),
        className
      )}
      {...props}
    />
  )
})
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => {
    const { shape, theme, variant, color } = React.useContext(MenubarContext);

    const getThemeClass = () => {
      const activeTheme = colorThemeMap[color];
      switch (theme) {
        case "modern": return cn("backdrop-blur-2xl bg-gradient-to-br from-background/95 to-muted/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-foreground/5", activeTheme.borderIndicator);
        case "clean": return "bg-background border border-foreground/10 shadow-sm";
        case "futuristic": return cn("bg-background/90 backdrop-blur-3xl uppercase tracking-wider", activeTheme.borderIndicator, activeTheme.bgIndicator.replace("bg-", "shadow-").replace("shadow-[", "shadow-[0_0_15px_").replace(/rgba\(([^,]+,[^,]+,[^,]+),[^)]+\)/g, "rgba($1,0.15)"));
        case "brutal": return "border-2 border-foreground shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] rounded-none font-mono";
        case "halftone": return cn("bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-[size:4px_4px] bg-background/95 shadow-md", activeTheme.borderIndicator);
        default: return cn("bg-background shadow-md", activeTheme.borderIndicator);
      }
    };
  
    const getVariantClass = () => {
      if (theme === "clean" || theme === "brutal") return "";
      const activeTheme = colorThemeMap[color];
      switch (variant) {
        case "solid": return cn("bg-muted/95", activeTheme.borderIndicator);
        default: return "";
      }
    };

    return (
      <MenubarPrimitive.Portal>
        <MenubarPrimitive.Content
          ref={ref}
          align={align}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
          className={cn(
            "z-50 min-w-[12rem] overflow-hidden p-1 text-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
            shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl border",
            getThemeClass(),
            getVariantClass(),
            className
          )}
          {...props}
        />
      </MenubarPrimitive.Portal>
    )
  }
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(MenubarContext);
  
  const getFocusClasses = () => {
    switch (color) {
      case "blue": return "focus:bg-blue-100 focus:text-blue-900 dark:focus:bg-blue-900/30 dark:focus:text-blue-100";
      case "emerald": return "focus:bg-emerald-100 focus:text-emerald-900 dark:focus:bg-emerald-900/30 dark:focus:text-emerald-100";
      case "rose": return "focus:bg-rose-100 focus:text-rose-900 dark:focus:bg-rose-900/30 dark:focus:text-rose-100";
      case "amber": return "focus:bg-amber-100 focus:text-amber-900 dark:focus:bg-amber-900/30 dark:focus:text-amber-100";
      case "violet": return "focus:bg-violet-100 focus:text-violet-900 dark:focus:bg-violet-900/30 dark:focus:text-violet-100";
      case "indigo": return "focus:bg-indigo-100 focus:text-indigo-900 dark:focus:bg-indigo-900/30 dark:focus:text-indigo-100";
      case "sky": return "focus:bg-sky-100 focus:text-sky-900 dark:focus:bg-sky-900/30 dark:focus:text-sky-100";
      case "slate": return "focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-900/30 dark:focus:text-slate-100";
      case "orange": return "focus:bg-orange-100 focus:text-orange-900 dark:focus:bg-orange-900/30 dark:focus:text-orange-100";
      default: return "focus:bg-accent focus:text-accent-foreground";
    }
  };

  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-md",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-3 py-2 text-base" : "px-2 py-1.5 text-sm",
        inset && "pl-8",
        getFocusClasses(),
        className
      )}
      {...props}
    />
  )
})
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(MenubarContext);
  
  const getFocusClasses = () => {
    switch (color) {
      case "blue": return "focus:bg-blue-100 focus:text-blue-900 dark:focus:bg-blue-900/30 dark:focus:text-blue-100";
      case "emerald": return "focus:bg-emerald-100 focus:text-emerald-900 dark:focus:bg-emerald-900/30 dark:focus:text-emerald-100";
      case "rose": return "focus:bg-rose-100 focus:text-rose-900 dark:focus:bg-rose-900/30 dark:focus:text-rose-100";
      case "amber": return "focus:bg-amber-100 focus:text-amber-900 dark:focus:bg-amber-900/30 dark:focus:text-amber-100";
      case "violet": return "focus:bg-violet-100 focus:text-violet-900 dark:focus:bg-violet-900/30 dark:focus:text-violet-100";
      case "indigo": return "focus:bg-indigo-100 focus:text-indigo-900 dark:focus:bg-indigo-900/30 dark:focus:text-indigo-100";
      case "sky": return "focus:bg-sky-100 focus:text-sky-900 dark:focus:bg-sky-900/30 dark:focus:text-sky-100";
      case "slate": return "focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-900/30 dark:focus:text-slate-100";
      case "orange": return "focus:bg-orange-100 focus:text-orange-900 dark:focus:bg-orange-900/30 dark:focus:text-orange-100";
      default: return "focus:bg-accent focus:text-accent-foreground";
    }
  };

  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-md",
        spacing === "2x" ? "py-1 pl-8 pr-2 text-xs" : spacing === "6x" || spacing === "8x" ? "py-2 pl-10 pr-3 text-base" : "py-1.5 pl-8 pr-2 text-sm",
        getFocusClasses(),
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
})
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(MenubarContext);
  
  const getFocusClasses = () => {
    switch (color) {
      case "blue": return "focus:bg-blue-100 focus:text-blue-900 dark:focus:bg-blue-900/30 dark:focus:text-blue-100";
      case "emerald": return "focus:bg-emerald-100 focus:text-emerald-900 dark:focus:bg-emerald-900/30 dark:focus:text-emerald-100";
      case "rose": return "focus:bg-rose-100 focus:text-rose-900 dark:focus:bg-rose-900/30 dark:focus:text-rose-100";
      case "amber": return "focus:bg-amber-100 focus:text-amber-900 dark:focus:bg-amber-900/30 dark:focus:text-amber-100";
      case "violet": return "focus:bg-violet-100 focus:text-violet-900 dark:focus:bg-violet-900/30 dark:focus:text-violet-100";
      case "indigo": return "focus:bg-indigo-100 focus:text-indigo-900 dark:focus:bg-indigo-900/30 dark:focus:text-indigo-100";
      case "sky": return "focus:bg-sky-100 focus:text-sky-900 dark:focus:bg-sky-900/30 dark:focus:text-sky-100";
      case "slate": return "focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-900/30 dark:focus:text-slate-100";
      case "orange": return "focus:bg-orange-100 focus:text-orange-900 dark:focus:bg-orange-900/30 dark:focus:text-orange-100";
      default: return "focus:bg-accent focus:text-accent-foreground";
    }
  };

  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-md",
        spacing === "2x" ? "py-1 pl-8 pr-2 text-xs" : spacing === "6x" || spacing === "8x" ? "py-2 pl-10 pr-3 text-base" : "py-1.5 pl-8 pr-2 text-sm",
        getFocusClasses(),
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
})
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => {
  const { spacing } = React.useContext(MenubarContext);
  return (
    <MenubarPrimitive.Label
      ref={ref}
      className={cn(
        "font-semibold text-foreground",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-3 py-2 text-base" : "px-2 py-1.5 text-sm",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
})
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground opacity-60",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
