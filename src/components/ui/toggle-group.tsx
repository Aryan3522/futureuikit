"use client"

/**
 * @registry-slug toggle-group
 * @registry-name Toggle Group
 * @registry-description A premium Toggle Group component with dynamic colors and variants.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency @radix-ui/react-toggle-group
 * @registry-dependency class-variance-authority
 */

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export type ToggleGroupVariant = "solid" | "outline" | "ghost" | "glass" | "elevated" | "soft";
export type ToggleGroupColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ToggleGroupShape = "default" | "square" | "rounded" | "sharp" | "pill";
export type ToggleGroupSize = "default" | "sm" | "md" | "lg" | "xl";
export type ToggleGroupSpacing = "default" | "2x" | "4x" | "6x" | "8x";

const toggleGroupItemVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        solid: "border-transparent data-[state=off]:bg-transparent data-[state=off]:hover:bg-muted/50",
        outline: "bg-transparent border-2 data-[state=off]:border-muted-foreground/30 data-[state=off]:hover:bg-muted/50",
        ghost: "bg-transparent border-transparent data-[state=off]:hover:bg-muted/50",
        glass: "backdrop-blur-xl border data-[state=off]:bg-black/5 data-[state=off]:border-black/10 dark:data-[state=off]:bg-white/5 dark:data-[state=off]:border-white/10 data-[state=off]:hover:bg-black/10 dark:data-[state=off]:hover:bg-white/10",
        elevated: "border-border shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] data-[state=off]:bg-background data-[state=off]:hover:bg-muted/50",
        soft: "border-transparent data-[state=off]:bg-muted/30 data-[state=off]:hover:bg-muted/50",
      },
      color: {
        default: "", blue: "", emerald: "", rose: "", amber: "", violet: "", indigo: "", sky: "", slate: "", orange: "",
      },
      shape: {
        default: "rounded-md",
        square: "rounded-none",
        rounded: "rounded-lg",
        sharp: "rounded-[2px]",
        pill: "rounded-full"
      },
      size: {
        default: "h-10",
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
        xl: "h-14",
      },
      spacing: {
        default: "px-3 py-1.5 text-sm",
        "2x": "px-2 py-1 text-xs",
        "4x": "px-4 py-2 text-sm",
        "6x": "px-6 py-3 text-base",
        "8x": "px-8 py-4 text-lg",
      }
    },
    compoundVariants: [
      // SOLID
      { variant: "solid", color: "default", className: "data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-md" },
      { variant: "solid", color: "blue", className: "data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:shadow-md dark:data-[state=on]:bg-blue-500" },
      { variant: "solid", color: "emerald", className: "data-[state=on]:bg-emerald-600 data-[state=on]:text-white data-[state=on]:shadow-md dark:data-[state=on]:bg-emerald-500" },
      { variant: "solid", color: "rose", className: "data-[state=on]:bg-rose-600 data-[state=on]:text-white data-[state=on]:shadow-md dark:data-[state=on]:bg-rose-500" },
      { variant: "solid", color: "amber", className: "data-[state=on]:bg-amber-500 data-[state=on]:text-white data-[state=on]:shadow-md dark:data-[state=on]:bg-amber-400" },
      { variant: "solid", color: "violet", className: "data-[state=on]:bg-violet-600 data-[state=on]:text-white data-[state=on]:shadow-md dark:data-[state=on]:bg-violet-500" },
      { variant: "solid", color: "indigo", className: "data-[state=on]:bg-indigo-600 data-[state=on]:text-white data-[state=on]:shadow-md dark:data-[state=on]:bg-indigo-500" },
      { variant: "solid", color: "sky", className: "data-[state=on]:bg-sky-500 data-[state=on]:text-white data-[state=on]:shadow-md dark:data-[state=on]:bg-sky-400" },
      { variant: "solid", color: "slate", className: "data-[state=on]:bg-slate-600 data-[state=on]:text-white data-[state=on]:shadow-md dark:data-[state=on]:bg-slate-500" },
      { variant: "solid", color: "orange", className: "data-[state=on]:bg-orange-500 data-[state=on]:text-white data-[state=on]:shadow-md dark:data-[state=on]:bg-orange-400" },

      // OUTLINE
      { variant: "outline", color: "default", className: "data-[state=on]:border-foreground data-[state=on]:text-foreground data-[state=on]:bg-foreground/5" },
      { variant: "outline", color: "blue", className: "data-[state=on]:border-blue-600 data-[state=on]:text-blue-600 data-[state=on]:bg-blue-600/5 dark:data-[state=on]:border-blue-500 dark:data-[state=on]:text-blue-500" },
      { variant: "outline", color: "emerald", className: "data-[state=on]:border-emerald-600 data-[state=on]:text-emerald-600 data-[state=on]:bg-emerald-600/5 dark:data-[state=on]:border-emerald-500 dark:data-[state=on]:text-emerald-500" },
      { variant: "outline", color: "rose", className: "data-[state=on]:border-rose-600 data-[state=on]:text-rose-600 data-[state=on]:bg-rose-600/5 dark:data-[state=on]:border-rose-500 dark:data-[state=on]:text-rose-500" },
      { variant: "outline", color: "amber", className: "data-[state=on]:border-amber-500 data-[state=on]:text-amber-600 data-[state=on]:bg-amber-500/5 dark:data-[state=on]:border-amber-400 dark:data-[state=on]:text-amber-400" },
      { variant: "outline", color: "violet", className: "data-[state=on]:border-violet-600 data-[state=on]:text-violet-600 data-[state=on]:bg-violet-600/5 dark:data-[state=on]:border-violet-500 dark:data-[state=on]:text-violet-500" },
      { variant: "outline", color: "indigo", className: "data-[state=on]:border-indigo-600 data-[state=on]:text-indigo-600 data-[state=on]:bg-indigo-600/5 dark:data-[state=on]:border-indigo-500 dark:data-[state=on]:text-indigo-500" },
      { variant: "outline", color: "sky", className: "data-[state=on]:border-sky-500 data-[state=on]:text-sky-600 data-[state=on]:bg-sky-500/5 dark:data-[state=on]:border-sky-400 dark:data-[state=on]:text-sky-400" },
      { variant: "outline", color: "slate", className: "data-[state=on]:border-slate-600 data-[state=on]:text-slate-600 data-[state=on]:bg-slate-600/5 dark:data-[state=on]:border-slate-500 dark:data-[state=on]:text-slate-500" },
      { variant: "outline", color: "orange", className: "data-[state=on]:border-orange-500 data-[state=on]:text-orange-600 data-[state=on]:bg-orange-500/5 dark:data-[state=on]:border-orange-400 dark:data-[state=on]:text-orange-400" },

      // GHOST
      { variant: "ghost", color: "default", className: "data-[state=on]:bg-foreground/10 data-[state=on]:text-foreground" },
      { variant: "ghost", color: "blue", className: "data-[state=on]:bg-blue-500/15 data-[state=on]:text-blue-600 dark:data-[state=on]:text-blue-400" },
      { variant: "ghost", color: "emerald", className: "data-[state=on]:bg-emerald-500/15 data-[state=on]:text-emerald-600 dark:data-[state=on]:text-emerald-400" },
      { variant: "ghost", color: "rose", className: "data-[state=on]:bg-rose-500/15 data-[state=on]:text-rose-600 dark:data-[state=on]:text-rose-400" },
      { variant: "ghost", color: "amber", className: "data-[state=on]:bg-amber-500/15 data-[state=on]:text-amber-600 dark:data-[state=on]:text-amber-400" },
      { variant: "ghost", color: "violet", className: "data-[state=on]:bg-violet-500/15 data-[state=on]:text-violet-600 dark:data-[state=on]:text-violet-400" },
      { variant: "ghost", color: "indigo", className: "data-[state=on]:bg-indigo-500/15 data-[state=on]:text-indigo-600 dark:data-[state=on]:text-indigo-400" },
      { variant: "ghost", color: "sky", className: "data-[state=on]:bg-sky-500/15 data-[state=on]:text-sky-600 dark:data-[state=on]:text-sky-400" },
      { variant: "ghost", color: "slate", className: "data-[state=on]:bg-slate-500/15 data-[state=on]:text-slate-600 dark:data-[state=on]:text-slate-400" },
      { variant: "ghost", color: "orange", className: "data-[state=on]:bg-orange-500/15 data-[state=on]:text-orange-600 dark:data-[state=on]:text-orange-400" },

      // GLASS
      { variant: "glass", color: "default", className: "data-[state=on]:bg-foreground/20 data-[state=on]:border-foreground/30 data-[state=on]:shadow-md" },
      { variant: "glass", color: "blue", className: "data-[state=on]:bg-blue-500/20 data-[state=on]:border-blue-500/30 data-[state=on]:text-blue-600 dark:data-[state=on]:text-blue-400 data-[state=on]:shadow-md" },
      { variant: "glass", color: "emerald", className: "data-[state=on]:bg-emerald-500/20 data-[state=on]:border-emerald-500/30 data-[state=on]:text-emerald-600 dark:data-[state=on]:text-emerald-400 data-[state=on]:shadow-md" },
      { variant: "glass", color: "rose", className: "data-[state=on]:bg-rose-500/20 data-[state=on]:border-rose-500/30 data-[state=on]:text-rose-600 dark:data-[state=on]:text-rose-400 data-[state=on]:shadow-md" },
      { variant: "glass", color: "amber", className: "data-[state=on]:bg-amber-500/20 data-[state=on]:border-amber-500/30 data-[state=on]:text-amber-600 dark:data-[state=on]:text-amber-400 data-[state=on]:shadow-md" },
      { variant: "glass", color: "violet", className: "data-[state=on]:bg-violet-500/20 data-[state=on]:border-violet-500/30 data-[state=on]:text-violet-600 dark:data-[state=on]:text-violet-400 data-[state=on]:shadow-md" },
      { variant: "glass", color: "indigo", className: "data-[state=on]:bg-indigo-500/20 data-[state=on]:border-indigo-500/30 data-[state=on]:text-indigo-600 dark:data-[state=on]:text-indigo-400 data-[state=on]:shadow-md" },
      { variant: "glass", color: "sky", className: "data-[state=on]:bg-sky-500/20 data-[state=on]:border-sky-500/30 data-[state=on]:text-sky-600 dark:data-[state=on]:text-sky-400 data-[state=on]:shadow-md" },
      { variant: "glass", color: "slate", className: "data-[state=on]:bg-slate-500/20 data-[state=on]:border-slate-500/30 data-[state=on]:text-slate-600 dark:data-[state=on]:text-slate-400 data-[state=on]:shadow-md" },
      { variant: "glass", color: "orange", className: "data-[state=on]:bg-orange-500/20 data-[state=on]:border-orange-500/30 data-[state=on]:text-orange-600 dark:data-[state=on]:text-orange-400 data-[state=on]:shadow-md" },

      // ELEVATED
      { variant: "elevated", color: "default", className: "data-[state=on]:bg-foreground/5 data-[state=on]:text-foreground data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" },
      { variant: "elevated", color: "blue", className: "data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600 dark:data-[state=on]:bg-blue-900/30 dark:data-[state=on]:text-blue-400 data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" },
      { variant: "elevated", color: "emerald", className: "data-[state=on]:bg-emerald-50 data-[state=on]:text-emerald-600 dark:data-[state=on]:bg-emerald-900/30 dark:data-[state=on]:text-emerald-400 data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" },
      { variant: "elevated", color: "rose", className: "data-[state=on]:bg-rose-50 data-[state=on]:text-rose-600 dark:data-[state=on]:bg-rose-900/30 dark:data-[state=on]:text-rose-400 data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" },
      { variant: "elevated", color: "amber", className: "data-[state=on]:bg-amber-50 data-[state=on]:text-amber-600 dark:data-[state=on]:bg-amber-900/30 dark:data-[state=on]:text-amber-400 data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" },
      { variant: "elevated", color: "violet", className: "data-[state=on]:bg-violet-50 data-[state=on]:text-violet-600 dark:data-[state=on]:bg-violet-900/30 dark:data-[state=on]:text-violet-400 data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" },
      { variant: "elevated", color: "indigo", className: "data-[state=on]:bg-indigo-50 data-[state=on]:text-indigo-600 dark:data-[state=on]:bg-indigo-900/30 dark:data-[state=on]:text-indigo-400 data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" },
      { variant: "elevated", color: "sky", className: "data-[state=on]:bg-sky-50 data-[state=on]:text-sky-600 dark:data-[state=on]:bg-sky-900/30 dark:data-[state=on]:text-sky-400 data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" },
      { variant: "elevated", color: "slate", className: "data-[state=on]:bg-slate-50 data-[state=on]:text-slate-600 dark:data-[state=on]:bg-slate-900/30 dark:data-[state=on]:text-slate-400 data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" },
      { variant: "elevated", color: "orange", className: "data-[state=on]:bg-orange-50 data-[state=on]:text-orange-600 dark:data-[state=on]:bg-orange-900/30 dark:data-[state=on]:text-orange-400 data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" },

      // SOFT
      { variant: "soft", color: "default", className: "data-[state=on]:bg-muted-foreground/20 data-[state=on]:text-foreground" },
      { variant: "soft", color: "blue", className: "data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900/50 data-[state=on]:text-blue-600 dark:data-[state=on]:text-blue-400" },
      { variant: "soft", color: "emerald", className: "data-[state=on]:bg-emerald-100 dark:data-[state=on]:bg-emerald-900/50 data-[state=on]:text-emerald-600 dark:data-[state=on]:text-emerald-400" },
      { variant: "soft", color: "rose", className: "data-[state=on]:bg-rose-100 dark:data-[state=on]:bg-rose-900/50 data-[state=on]:text-rose-600 dark:data-[state=on]:text-rose-400" },
      { variant: "soft", color: "amber", className: "data-[state=on]:bg-amber-100 dark:data-[state=on]:bg-amber-900/50 data-[state=on]:text-amber-600 dark:data-[state=on]:text-amber-400" },
      { variant: "soft", color: "violet", className: "data-[state=on]:bg-violet-100 dark:data-[state=on]:bg-violet-900/50 data-[state=on]:text-violet-600 dark:data-[state=on]:text-violet-400" },
      { variant: "soft", color: "indigo", className: "data-[state=on]:bg-indigo-100 dark:data-[state=on]:bg-indigo-900/50 data-[state=on]:text-indigo-600 dark:data-[state=on]:text-indigo-400" },
      { variant: "soft", color: "sky", className: "data-[state=on]:bg-sky-100 dark:data-[state=on]:bg-sky-900/50 data-[state=on]:text-sky-600 dark:data-[state=on]:text-sky-400" },
      { variant: "soft", color: "slate", className: "data-[state=on]:bg-slate-100 dark:data-[state=on]:bg-slate-900/50 data-[state=on]:text-slate-600 dark:data-[state=on]:text-slate-400" },
      { variant: "soft", color: "orange", className: "data-[state=on]:bg-orange-100 dark:data-[state=on]:bg-orange-900/50 data-[state=on]:text-orange-600 dark:data-[state=on]:text-orange-400" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      shape: "default",
      spacing: "default",
      size: "default"
    }
  }
)

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleGroupItemVariants>
>({
  size: "default",
  spacing: "default",
  variant: "solid",
  color: "default",
  shape: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleGroupItemVariants>
>(({ className, variant, size, spacing, color, shape, children, ...props }, ref) => {
  // If variant is glass or outline, the container can sometimes look good with a shared background,
  // but to keep them completely isolated per-button, we just wrap them in a flex container.
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1.5", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, color, shape }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
})

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleGroupItemVariants>
>(({ className, children, variant, size, spacing, color, shape, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleGroupItemVariants({
          variant: variant || context.variant,
          color: color || context.color,
          shape: shape || context.shape,
          size: size || context.size,
          spacing: spacing || context.spacing,
        }),
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
