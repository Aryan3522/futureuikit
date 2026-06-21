/**
 * @registry-slug button
 * @registry-name Button
 * @registry-description A Future UI Button component.
 * @registry-category ui
 * @registry-dependency @radix-ui/react-slot
 * @registry-dependency class-variance-authority
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        outline: "border bg-transparent",
        ghost: "border-transparent bg-transparent",
        link: "border-transparent bg-transparent underline-offset-4 hover:underline",
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
      spacing: {
        default: "h-9 px-4 py-2 w-full sm:w-auto",
        "2x": "h-8 px-2 text-xs w-full sm:w-auto",
        "4x": "h-10 px-4 w-full sm:w-auto",
        "6x": "h-12 px-6 text-base w-full sm:w-auto",
        "8x": "h-14 px-8 text-lg w-full sm:w-auto",
        icon: "h-9 w-9",
      },
      shape: {
        default: "rounded-md",
        square: "rounded-none",
        rounded: "rounded-full",
        sharp: "rounded-[2px]",
      },
    },
    compoundVariants: [
      // SOLID VARIANTS
      { variant: "solid", color: "default", className: "bg-foreground text-background hover:bg-foreground/90" },
      { variant: "solid", color: "blue", className: "bg-blue-600 text-white hover:bg-blue-600/90 dark:bg-blue-500 dark:hover:bg-blue-500/90" },
      { variant: "solid", color: "emerald", className: "bg-emerald-500 text-white hover:bg-emerald-500/90 dark:bg-emerald-600 dark:hover:bg-emerald-600/90" },
      { variant: "solid", color: "rose", className: "bg-rose-500 text-white hover:bg-rose-500/90 dark:bg-rose-600 dark:hover:bg-rose-600/90" },
      { variant: "solid", color: "amber", className: "bg-amber-500 text-white hover:bg-amber-500/90 dark:bg-amber-600 dark:hover:bg-amber-600/90" },
      { variant: "solid", color: "violet", className: "bg-violet-600 text-white hover:bg-violet-600/90 dark:bg-violet-500 dark:hover:bg-violet-500/90" },
      { variant: "solid", color: "indigo", className: "bg-indigo-600 text-white hover:bg-indigo-600/90 dark:bg-indigo-500 dark:hover:bg-indigo-500/90" },
      { variant: "solid", color: "sky", className: "bg-sky-500 text-white hover:bg-sky-500/90 dark:bg-sky-600 dark:hover:bg-sky-600/90" },
      { variant: "solid", color: "slate", className: "bg-slate-600 text-white hover:bg-slate-600/90 dark:bg-slate-500 dark:hover:bg-slate-500/90" },
      { variant: "solid", color: "orange", className: "bg-orange-500 text-white hover:bg-orange-500/90 dark:bg-orange-600 dark:hover:bg-orange-600/90" },
      
      // OUTLINE VARIANTS
      { variant: "outline", color: "default", className: "border-border hover:bg-accent text-foreground" },
      { variant: "outline", color: "blue", className: "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950" },
      { variant: "outline", color: "emerald", className: "border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-950" },
      { variant: "outline", color: "rose", className: "border-rose-500 text-rose-600 hover:bg-rose-50 dark:border-rose-500 dark:text-rose-500 dark:hover:bg-rose-950" },
      { variant: "outline", color: "amber", className: "border-amber-500 text-amber-600 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-500 dark:hover:bg-amber-950" },
      { variant: "outline", color: "violet", className: "border-violet-600 text-violet-600 hover:bg-violet-50 dark:border-violet-500 dark:text-violet-500 dark:hover:bg-violet-950" },
      { variant: "outline", color: "indigo", className: "border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-500 dark:text-indigo-500 dark:hover:bg-indigo-950" },
      { variant: "outline", color: "sky", className: "border-sky-500 text-sky-600 hover:bg-sky-50 dark:border-sky-500 dark:text-sky-500 dark:hover:bg-sky-950" },
      { variant: "outline", color: "slate", className: "border-slate-600 text-slate-600 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-500 dark:hover:bg-slate-950" },
      { variant: "outline", color: "orange", className: "border-orange-500 text-orange-600 hover:bg-orange-50 dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-950" },
      
      // GHOST VARIANTS
      { variant: "ghost", color: "default", className: "hover:bg-accent text-foreground" },
      { variant: "ghost", color: "blue", className: "text-blue-600 hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-blue-950" },
      { variant: "ghost", color: "emerald", className: "text-emerald-600 hover:bg-emerald-50 dark:text-emerald-500 dark:hover:bg-emerald-950" },
      { variant: "ghost", color: "rose", className: "text-rose-600 hover:bg-rose-50 dark:text-rose-500 dark:hover:bg-rose-950" },
      { variant: "ghost", color: "amber", className: "text-amber-600 hover:bg-amber-50 dark:text-amber-500 dark:hover:bg-amber-950" },
      { variant: "ghost", color: "violet", className: "text-violet-600 hover:bg-violet-50 dark:text-violet-500 dark:hover:bg-violet-950" },
      { variant: "ghost", color: "indigo", className: "text-indigo-600 hover:bg-indigo-50 dark:text-indigo-500 dark:hover:bg-indigo-950" },
      { variant: "ghost", color: "sky", className: "text-sky-600 hover:bg-sky-50 dark:text-sky-500 dark:hover:bg-sky-950" },
      { variant: "ghost", color: "slate", className: "text-slate-600 hover:bg-slate-50 dark:text-slate-500 dark:hover:bg-slate-950" },
      { variant: "ghost", color: "orange", className: "text-orange-600 hover:bg-orange-50 dark:text-orange-500 dark:hover:bg-orange-950" },

      // LINK VARIANTS
      { variant: "link", color: "default", className: "text-foreground" },
      { variant: "link", color: "blue", className: "text-blue-600 dark:text-blue-500" },
      { variant: "link", color: "emerald", className: "text-emerald-600 dark:text-emerald-500" },
      { variant: "link", color: "rose", className: "text-rose-600 dark:text-rose-500" },
      { variant: "link", color: "amber", className: "text-amber-600 dark:text-amber-500" },
      { variant: "link", color: "violet", className: "text-violet-600 dark:text-violet-500" },
      { variant: "link", color: "indigo", className: "text-indigo-600 dark:text-indigo-500" },
      { variant: "link", color: "sky", className: "text-sky-600 dark:text-sky-500" },
      { variant: "link", color: "slate", className: "text-slate-600 dark:text-slate-500" },
      { variant: "link", color: "orange", className: "text-orange-600 dark:text-orange-500" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      spacing: "default",
      shape: "default",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, spacing, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, color, spacing, shape, className }))}
        ref={ref}
        {...props} 
      />
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }