/**
 * @registry-slug badge
 * @registry-name Badge
 * @registry-description A small status descriptor for UI elements.
 * @registry-category ui
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "select-none font-label w-fit inline-flex items-center border font-medium uppercase tracking-[0.18em] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        secondary: "border-transparent",
        outline: "bg-transparent",
        ghost: "border-transparent bg-transparent",
      },
      color: {
        default: "",
        blue: "",
        emerald: "",
        rose: "",
        amber: "",
        violet: "",
        indigo: "",
        sky: "",
        slate: "",
        orange: "",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-full",
        sharp: "rounded-[2px]",
      },
      spacing: {
        default: "px-4 py-1.5 text-[11px]",
        "2x": "px-2 py-0.5 text-[10px]",
        "4x": "px-4 py-1 text-[11px]",
        "6x": "px-6 py-2 text-xs",
        "8x": "px-8 py-3 text-sm",
      }
    },
    compoundVariants: [

      { variant: "solid", color: "default", className: "bg-foreground text-background" },
      { variant: "solid", color: "blue", className: "bg-blue-600 text-white dark:bg-blue-500" },
      { variant: "solid", color: "emerald", className: "bg-emerald-500 text-white dark:bg-emerald-600" },
      { variant: "solid", color: "rose", className: "bg-rose-500 text-white dark:bg-rose-600" },
      { variant: "solid", color: "amber", className: "bg-amber-500 text-white dark:bg-amber-600" },
      { variant: "solid", color: "violet", className: "bg-violet-600 text-white dark:bg-violet-500" },
      { variant: "solid", color: "indigo", className: "bg-indigo-600 text-white dark:bg-indigo-500" },
      { variant: "solid", color: "sky", className: "bg-sky-500 text-white dark:bg-sky-600" },
      { variant: "solid", color: "slate", className: "bg-slate-600 text-white dark:bg-slate-500" },
      { variant: "solid", color: "orange", className: "bg-orange-500 text-white dark:bg-orange-600" },

      { variant: "secondary", color: "default", className: "bg-muted text-foreground" },
      { variant: "secondary", color: "blue", className: "bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100" },
      { variant: "secondary", color: "emerald", className: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100" },
      { variant: "secondary", color: "rose", className: "bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100" },
      { variant: "secondary", color: "amber", className: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100" },
      { variant: "secondary", color: "violet", className: "bg-violet-100 text-violet-900 dark:bg-violet-900/40 dark:text-violet-100" },
      { variant: "secondary", color: "indigo", className: "bg-indigo-100 text-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-100" },
      { variant: "secondary", color: "sky", className: "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100" },
      { variant: "secondary", color: "slate", className: "bg-slate-100 text-slate-900 dark:bg-slate-900/40 dark:text-slate-100" },
      { variant: "secondary", color: "orange", className: "bg-orange-100 text-orange-900 dark:bg-orange-900/40 dark:text-orange-100" },

      { variant: "outline", color: "default", className: "border-border text-foreground" },
      { variant: "outline", color: "blue", className: "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500" },
      { variant: "outline", color: "emerald", className: "border-emerald-500 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500" },
      { variant: "outline", color: "rose", className: "border-rose-500 text-rose-600 dark:border-rose-500 dark:text-rose-500" },
      { variant: "outline", color: "amber", className: "border-amber-500 text-amber-600 dark:border-amber-500 dark:text-amber-500" },
      { variant: "outline", color: "violet", className: "border-violet-600 text-violet-600 dark:border-violet-500 dark:text-violet-500" },
      { variant: "outline", color: "indigo", className: "border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-500" },
      { variant: "outline", color: "sky", className: "border-sky-500 text-sky-600 dark:border-sky-500 dark:text-sky-500" },
      { variant: "outline", color: "slate", className: "border-slate-600 text-slate-600 dark:border-slate-500 dark:text-slate-500" },
      { variant: "outline", color: "orange", className: "border-orange-500 text-orange-600 dark:border-orange-500 dark:text-orange-500" },

      { variant: "ghost", color: "default", className: "hover:bg-accent text-foreground" },
      { variant: "ghost", color: "blue", className: "hover:bg-blue-50 text-blue-600 dark:hover:bg-blue-900/20 dark:text-blue-500" },
      { variant: "ghost", color: "emerald", className: "hover:bg-emerald-50 text-emerald-600 dark:hover:bg-emerald-900/20 dark:text-emerald-500" },
      { variant: "ghost", color: "rose", className: "hover:bg-rose-50 text-rose-600 dark:hover:bg-rose-900/20 dark:text-rose-500" },
      { variant: "ghost", color: "amber", className: "hover:bg-amber-50 text-amber-600 dark:hover:bg-amber-900/20 dark:text-amber-500" },
      { variant: "ghost", color: "violet", className: "hover:bg-violet-50 text-violet-600 dark:hover:bg-violet-900/20 dark:text-violet-500" },
      { variant: "ghost", color: "indigo", className: "hover:bg-indigo-50 text-indigo-600 dark:hover:bg-indigo-900/20 dark:text-indigo-500" },
      { variant: "ghost", color: "sky", className: "hover:bg-sky-50 text-sky-600 dark:hover:bg-sky-900/20 dark:text-sky-500" },
      { variant: "ghost", color: "slate", className: "hover:bg-slate-50 text-slate-600 dark:hover:bg-slate-900/20 dark:text-slate-500" },
      { variant: "ghost", color: "orange", className: "hover:bg-orange-50 text-orange-600 dark:hover:bg-orange-900/20 dark:text-orange-500" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      shape: "default",
      spacing: "default",
    },
  }
)

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof badgeVariants> {}

const Badge = React.memo(function Badge({
  className,
  variant,
  color,
  shape,
  spacing,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, color, shape, spacing }), className)} {...props} />
  )
});
Badge.displayName = "Badge";

export { Badge, badgeVariants }