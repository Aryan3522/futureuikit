"use client"

/**
 * @registry-slug dropdown-menu
 * @registry-name Dropdown Menu
 * @registry-description A standard Dropdown Menu component.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

export type DropdownColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type DropdownShape = "default" | "square" | "rounded" | "sharp";
export type DropdownSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface DropdownMenuContextValue {
  color: DropdownColor;
  shape: DropdownShape;
  spacing: DropdownSpacing;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface DropdownMenuProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
  color?: DropdownColor;
  shape?: DropdownShape;
  spacing?: DropdownSpacing;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ color = "default", shape = "default", spacing = "default", children, ...props }) => {
  return (
    <DropdownMenuContext.Provider value={{ color, shape, spacing }}>
      <DropdownMenuPrimitive.Root {...props}>{children}</DropdownMenuPrimitive.Root>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(DropdownMenuContext);
  
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
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center gap-2 outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-colors",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-sm",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-3 py-2 text-base" : "px-2 py-1.5 text-sm",
        inset && "pl-8",
        getFocusClasses(),
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
})
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => {
  const { shape } = React.useContext(DropdownMenuContext);
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden border border-border bg-background p-1 text-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
        className
      )}
      {...props}
    />
  )
})
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  const { shape } = React.useContext(DropdownMenuContext);
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden border border-border bg-background p-1 text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
          shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
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
  const { color, shape, spacing } = React.useContext(DropdownMenuContext);
  
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
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(DropdownMenuContext);
  
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
    <DropdownMenuPrimitive.CheckboxItem
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
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
})
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(DropdownMenuContext);
  
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
    <DropdownMenuPrimitive.RadioItem
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
  const { spacing } = React.useContext(DropdownMenuContext);
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "font-semibold",
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
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
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
