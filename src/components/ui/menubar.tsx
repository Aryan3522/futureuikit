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
export type MenubarShape = "default" | "square" | "rounded" | "sharp";
export type MenubarSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface MenubarContextValue {
  color: MenubarColor;
  shape: MenubarShape;
  spacing: MenubarSpacing;
}

const MenubarContext = React.createContext<MenubarContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface MenubarProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> {
  color?: MenubarColor;
  shape?: MenubarShape;
  spacing?: MenubarSpacing;
}

const Menubar: React.FC<MenubarProps> = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>(({ className, color = "default", shape = "default", spacing = "default", ...props }, ref) => (
  <MenubarContext.Provider value={{ color, shape, spacing }}>
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        "flex items-center space-x-1 border border-border bg-background p-1",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-xl" : "rounded-md",
        spacing === "2x" ? "h-8" : spacing === "6x" || spacing === "8x" ? "h-12" : "h-10",
        className
      )}
      {...props}
    />
  </MenubarContext.Provider>
))
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
  const { shape } = React.useContext(MenubarContext);
  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden border border-border bg-background p-1 text-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
        shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
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
    const { shape } = React.useContext(MenubarContext);
    return (
      <MenubarPrimitive.Portal>
        <MenubarPrimitive.Content
          ref={ref}
          align={align}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
          className={cn(
            "z-50 min-w-[12rem] overflow-hidden border border-border bg-background p-1 text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
            shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
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
