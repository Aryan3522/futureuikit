"use client"

/**
 * @registry-slug toggle-group
 * @registry-name Toggle Group
 * @registry-description A standard Toggle Group component.
 * @registry-category ui
 * @registry-type components:ui
 */


import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

export type ToggleGroupColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const colorMap: Record<ToggleGroupColor, { on: string; off: string; hover: string }> = {
  default: { on: "data-[state=on]:bg-foreground data-[state=on]:text-background", off: "data-[state=off]:bg-muted data-[state=off]:text-muted-foreground", hover: "hover:data-[state=off]:bg-muted/80 hover:data-[state=off]:text-foreground" },
  blue: { on: "data-[state=on]:bg-blue-600 data-[state=on]:text-white", off: "data-[state=off]:bg-muted data-[state=off]:text-muted-foreground", hover: "hover:data-[state=off]:bg-blue-100 dark:hover:data-[state=off]:bg-blue-900/20 hover:data-[state=off]:text-blue-600 dark:hover:data-[state=off]:text-blue-400" },
  emerald: { on: "data-[state=on]:bg-emerald-600 data-[state=on]:text-white", off: "data-[state=off]:bg-muted data-[state=off]:text-muted-foreground", hover: "hover:data-[state=off]:bg-emerald-100 dark:hover:data-[state=off]:bg-emerald-900/20 hover:data-[state=off]:text-emerald-600 dark:hover:data-[state=off]:text-emerald-400" },
  rose: { on: "data-[state=on]:bg-rose-600 data-[state=on]:text-white", off: "data-[state=off]:bg-muted data-[state=off]:text-muted-foreground", hover: "hover:data-[state=off]:bg-rose-100 dark:hover:data-[state=off]:bg-rose-900/20 hover:data-[state=off]:text-rose-600 dark:hover:data-[state=off]:text-rose-400" },
  amber: { on: "data-[state=on]:bg-amber-500 data-[state=on]:text-white", off: "data-[state=off]:bg-muted data-[state=off]:text-muted-foreground", hover: "hover:data-[state=off]:bg-amber-100 dark:hover:data-[state=off]:bg-amber-900/20 hover:data-[state=off]:text-amber-600 dark:hover:data-[state=off]:text-amber-400" },
  violet: { on: "data-[state=on]:bg-violet-600 data-[state=on]:text-white", off: "data-[state=off]:bg-muted data-[state=off]:text-muted-foreground", hover: "hover:data-[state=off]:bg-violet-100 dark:hover:data-[state=off]:bg-violet-900/20 hover:data-[state=off]:text-violet-600 dark:hover:data-[state=off]:text-violet-400" },
  indigo: { on: "data-[state=on]:bg-indigo-600 data-[state=on]:text-white", off: "data-[state=off]:bg-muted data-[state=off]:text-muted-foreground", hover: "hover:data-[state=off]:bg-indigo-100 dark:hover:data-[state=off]:bg-indigo-900/20 hover:data-[state=off]:text-indigo-600 dark:hover:data-[state=off]:text-indigo-400" },
  sky: { on: "data-[state=on]:bg-sky-500 data-[state=on]:text-white", off: "data-[state=off]:bg-muted data-[state=off]:text-muted-foreground", hover: "hover:data-[state=off]:bg-sky-100 dark:hover:data-[state=off]:bg-sky-900/20 hover:data-[state=off]:text-sky-600 dark:hover:data-[state=off]:text-sky-400" },
  slate: { on: "data-[state=on]:bg-slate-600 data-[state=on]:text-white", off: "data-[state=off]:bg-muted data-[state=off]:text-muted-foreground", hover: "hover:data-[state=off]:bg-slate-100 dark:hover:data-[state=off]:bg-slate-900/20 hover:data-[state=off]:text-slate-600 dark:hover:data-[state=off]:text-slate-400" },
  orange: { on: "data-[state=on]:bg-orange-500 data-[state=on]:text-white", off: "data-[state=off]:bg-muted data-[state=off]:text-muted-foreground", hover: "hover:data-[state=off]:bg-orange-100 dark:hover:data-[state=off]:bg-orange-900/20 hover:data-[state=off]:text-orange-600 dark:hover:data-[state=off]:text-orange-400" },
};

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  spacing: "default",
  variant: "default",
  color: "default",
  shape: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, spacing, color, shape, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, spacing, color, shape }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, spacing, color, shape, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  const shapeClass = cn(
    context.shape === "rounded" || shape === "rounded" ? "rounded-lg" : "",
    context.shape === "pill" || shape === "pill" ? "rounded-full" : "",
    context.shape === "square" || shape === "square" ? "rounded-none" : "",
    context.shape === "sharp" || shape === "sharp" ? "rounded-[2px]" : "",
    (!context.shape || context.shape === "default" || !shape || shape === "default") ? "rounded-lg" : "",
  )

  const spacingClass = cn(
    context.spacing === "2x" || spacing === "2x" ? "px-2 py-1 text-xs" : "",
    context.spacing === "4x" || spacing === "4x" ? "px-3 py-1.5 text-sm" : "",
    context.spacing === "6x" || spacing === "6x" ? "px-4 py-2 text-base" : "",
    context.spacing === "8x" || spacing === "8x" ? "px-5 py-2.5 text-lg" : "",
    (!context.spacing || context.spacing === "default" || !spacing || spacing === "default") ? "px-3 py-1.5 text-sm" : "",
  )

  const themeColor = (color || context.color || "default") as ToggleGroupColor;
  const theme = colorMap[themeColor] ?? colorMap.default;

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background border border-border",
        shapeClass,
        spacingClass,
        theme.on,
        theme.off,
        theme.hover,
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
