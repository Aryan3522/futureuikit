/**
 * @registry-slug card
 * @registry-name Card
 * @registry-description A Future UI Card component.
 * @registry-category ui
 */
import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "border transition-colors",
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent",
        ghost: "border-transparent bg-transparent",
        glass: "backdrop-blur-xl",
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
        default: "rounded-xl",
        square: "rounded-none",
        rounded: "rounded-3xl",
        sharp: "rounded-[2px]",
      },
      spacing: {
        default: "",
        "2x": "p-2",
        "4x": "p-4",
        "6x": "p-6",
        "8x": "p-8",
      }
    },
    compoundVariants: [
      // SOLID
      { variant: "solid", color: "default", className: "bg-background text-foreground border-border" },
      { variant: "solid", color: "blue", className: "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500" },
      { variant: "solid", color: "emerald", className: "bg-emerald-500 text-white border-emerald-500 dark:bg-emerald-600 dark:border-emerald-600" },
      { variant: "solid", color: "rose", className: "bg-rose-500 text-white border-rose-500 dark:bg-rose-600 dark:border-rose-600" },
      { variant: "solid", color: "amber", className: "bg-amber-500 text-white border-amber-500 dark:bg-amber-600 dark:border-amber-600" },
      { variant: "solid", color: "violet", className: "bg-violet-600 text-white border-violet-600 dark:bg-violet-500 dark:border-violet-500" },
      { variant: "solid", color: "indigo", className: "bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500" },
      { variant: "solid", color: "sky", className: "bg-sky-500 text-white border-sky-500 dark:bg-sky-600 dark:border-sky-600" },
      { variant: "solid", color: "slate", className: "bg-slate-600 text-white border-slate-600 dark:bg-slate-500 dark:border-slate-500" },
      { variant: "solid", color: "orange", className: "bg-orange-500 text-white border-orange-500 dark:bg-orange-600 dark:border-orange-600" },

      // OUTLINE
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

      // GHOST
      { variant: "ghost", color: "default", className: "hover:bg-accent text-foreground" },
      { variant: "ghost", color: "blue", className: "hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-500" },
      { variant: "ghost", color: "emerald", className: "hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600 dark:text-emerald-500" },
      { variant: "ghost", color: "rose", className: "hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 dark:text-rose-500" },
      { variant: "ghost", color: "amber", className: "hover:bg-amber-50 dark:hover:bg-amber-950 text-amber-600 dark:text-amber-500" },
      { variant: "ghost", color: "violet", className: "hover:bg-violet-50 dark:hover:bg-violet-950 text-violet-600 dark:text-violet-500" },
      { variant: "ghost", color: "indigo", className: "hover:bg-indigo-50 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-500" },
      { variant: "ghost", color: "sky", className: "hover:bg-sky-50 dark:hover:bg-sky-950 text-sky-600 dark:text-sky-500" },
      { variant: "ghost", color: "slate", className: "hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-500" },
      { variant: "ghost", color: "orange", className: "hover:bg-orange-50 dark:hover:bg-orange-950 text-orange-600 dark:text-orange-500" },

      // GLASS
      { variant: "glass", color: "default", className: "bg-background/20 border-border/50 text-foreground" },
      { variant: "glass", color: "blue", className: "bg-blue-500/20 border-blue-500/50 text-blue-900 dark:text-blue-100" },
      { variant: "glass", color: "emerald", className: "bg-emerald-500/20 border-emerald-500/50 text-emerald-900 dark:text-emerald-100" },
      { variant: "glass", color: "rose", className: "bg-rose-500/20 border-rose-500/50 text-rose-900 dark:text-rose-100" },
      { variant: "glass", color: "amber", className: "bg-amber-500/20 border-amber-500/50 text-amber-900 dark:text-amber-100" },
      { variant: "glass", color: "violet", className: "bg-violet-500/20 border-violet-500/50 text-violet-900 dark:text-violet-100" },
      { variant: "glass", color: "indigo", className: "bg-indigo-500/20 border-indigo-500/50 text-indigo-900 dark:text-indigo-100" },
      { variant: "glass", color: "sky", className: "bg-sky-500/20 border-sky-500/50 text-sky-900 dark:text-sky-100" },
      { variant: "glass", color: "slate", className: "bg-slate-500/20 border-slate-500/50 text-slate-900 dark:text-slate-100" },
      { variant: "glass", color: "orange", className: "bg-orange-500/20 border-orange-500/50 text-orange-900 dark:text-orange-100" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      shape: "default",
      spacing: "default",
    },
  }
)

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, color, shape, spacing, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, color, shape, spacing }), className)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm opacity-70", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
