"use client"

/**
 * @registry-slug input-otp
 * @registry-name Input Otp
 * @registry-description A standard Input Otp component.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputOTPVariants = cva(
  "flex items-center has-[:disabled]:opacity-50",
  {
    variants: {
      spacing: {
        default: "gap-2",
        "2x": "gap-1",
        "4x": "gap-2",
        "6x": "gap-4",
        "8x": "gap-6",
      }
    },
    defaultVariants: {
      spacing: "default"
    }
  }
)

const InputOTPContext = React.createContext<{
  color?: "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
  variant?: "solid" | "outline" | "ghost" | "link";
  shape?: "default" | "square" | "rounded" | "sharp";
  spacing?: "default" | "2x" | "4x" | "6x" | "8x";
  theme?: "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
}>({});

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput> & VariantProps<typeof inputOTPVariants> & {
    color?: "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
    variant?: "solid" | "outline" | "ghost" | "link";
    shape?: "default" | "square" | "rounded" | "sharp";
    theme?: "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
  }
>(({ className, containerClassName, spacing = "default", color = "default", variant = "outline", shape = "default", theme = "default", ...props }, ref) => (
  <InputOTPContext.Provider value={{ color, variant, shape, spacing: spacing as any, theme }}>
    <OTPInput
      ref={ref}
      containerClassName={cn(inputOTPVariants({ spacing }), containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  </InputOTPContext.Provider>
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const slotVariants = cva(
  "relative flex items-center justify-center text-sm transition-all focus:z-10",
  {
    variants: {
      variant: {
        solid: "border-y border-r first:border-l",
        outline: "bg-transparent border-y border-r first:border-l",
        ghost: "bg-transparent border-transparent",
        link: "bg-transparent border-b-2 border-transparent hover:border-muted-foreground",
      },
      color: {
        default: "text-foreground",
        blue: "text-blue-950 dark:text-blue-50",
        emerald: "text-emerald-950 dark:text-emerald-50",
        rose: "text-rose-950 dark:text-rose-50",
        amber: "text-amber-950 dark:text-amber-50",
        violet: "text-violet-950 dark:text-violet-50",
        indigo: "text-indigo-950 dark:text-indigo-50",
        sky: "text-sky-950 dark:text-sky-50",
        slate: "text-slate-950 dark:text-slate-50",
        orange: "text-orange-950 dark:text-orange-50",
      },
      shape: {
        default: "first:rounded-l-md last:rounded-r-md",
        square: "rounded-none",
        rounded: "first:rounded-l-full last:rounded-r-full",
        sharp: "first:rounded-l-[2px] last:rounded-r-[2px]",
      },
      spacing: {
        default: "h-10 w-10",
        "2x": "h-8 w-8 text-xs",
        "4x": "h-10 w-10",
        "6x": "h-12 w-12 text-base",
        "8x": "h-14 w-14 text-lg",
      }
    },
    defaultVariants: {
      variant: "outline",
      color: "default",
      shape: "default",
      spacing: "default",
    }
  }
)

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number } & VariantProps<typeof slotVariants>
>(({ index, className, variant: propVariant, color: propColor, shape: propShape, spacing: propSpacing, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const styleContext = React.useContext(InputOTPContext)
  
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  const variant = propVariant || styleContext.variant || "outline"
  const color = propColor || styleContext.color || "default"
  const shape = propShape || styleContext.shape || "default"
  const spacing = propSpacing || styleContext.spacing || "default"
  const theme = styleContext.theme || "default"

  // Base styles (borders and backgrounds based on variant)
  let variantStyles = "";
  if (variant === "outline" || variant === "solid") {
    variantStyles += 
      color === "blue" ? "border-blue-200 dark:border-blue-800 " :
      color === "emerald" ? "border-emerald-200 dark:border-emerald-800 " :
      color === "rose" ? "border-rose-200 dark:border-rose-800 " :
      color === "amber" ? "border-amber-200 dark:border-amber-800 " :
      color === "violet" ? "border-violet-200 dark:border-violet-800 " :
      color === "indigo" ? "border-indigo-200 dark:border-indigo-800 " :
      color === "sky" ? "border-sky-200 dark:border-sky-800 " :
      color === "slate" ? "border-slate-200 dark:border-slate-800 " :
      color === "orange" ? "border-orange-200 dark:border-orange-800 " :
      "border-border ";
  } else if (variant === "link") {
    variantStyles += 
      color === "blue" ? "border-b-blue-600 dark:border-b-blue-500 " :
      color === "emerald" ? "border-b-emerald-500 " :
      color === "rose" ? "border-b-rose-500 " :
      color === "amber" ? "border-b-amber-500 " :
      color === "violet" ? "border-b-violet-600 dark:border-b-violet-500 " :
      color === "indigo" ? "border-b-indigo-600 dark:border-b-indigo-500 " :
      color === "sky" ? "border-b-sky-500 " :
      color === "slate" ? "border-b-slate-600 dark:border-b-slate-500 " :
      color === "orange" ? "border-b-orange-500 " :
      "border-b-foreground ";
  }

  // Add low opacity backgrounds for solid and ghost
  if (variant === "solid" || variant === "ghost") {
    variantStyles += 
      color === "blue" ? "bg-blue-50 dark:bg-blue-900/30 " :
      color === "emerald" ? "bg-emerald-50 dark:bg-emerald-900/30 " :
      color === "rose" ? "bg-rose-50 dark:bg-rose-900/30 " :
      color === "amber" ? "bg-amber-50 dark:bg-amber-900/30 " :
      color === "violet" ? "bg-violet-50 dark:bg-violet-900/30 " :
      color === "indigo" ? "bg-indigo-50 dark:bg-indigo-900/30 " :
      color === "sky" ? "bg-sky-50 dark:bg-sky-900/30 " :
      color === "slate" ? "bg-slate-100 dark:bg-slate-800/50 " :
      color === "orange" ? "bg-orange-50 dark:bg-orange-900/30 " :
      "bg-muted ";
  }

  // Ring classes
  const ringClass = 
    color === "blue" ? "ring-blue-600 dark:ring-blue-500 ring-offset-background" :
    color === "emerald" ? "ring-emerald-500 ring-offset-background" :
    color === "rose" ? "ring-rose-500 ring-offset-background" :
    color === "amber" ? "ring-amber-500 ring-offset-background" :
    color === "violet" ? "ring-violet-600 dark:ring-violet-500 ring-offset-background" :
    color === "indigo" ? "ring-indigo-600 dark:ring-indigo-500 ring-offset-background" :
    color === "sky" ? "ring-sky-500 ring-offset-background" :
    color === "slate" ? "ring-slate-600 dark:ring-slate-500 ring-offset-background" :
    color === "orange" ? "ring-orange-500 ring-offset-background" :
    "ring-ring ring-offset-background";

  // Theme effects
  const themeClasses = 
    theme === "modern" ? "backdrop-blur-2xl bg-gradient-to-br from-background/80 to-muted/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.02)] border border-foreground/5 hover:border-foreground/30 hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300 ease-out" :
    theme === "brutal" ? "border-2 border-foreground shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_rgba(255,255,255,1)] transition-all" :
    theme === "clean" ? "bg-transparent border-foreground/10 hover:border-foreground/40 hover:bg-foreground/5 focus:bg-transparent shadow-none transition-all duration-500" :
    theme === "futuristic" ? "bg-background/80 backdrop-blur-3xl shadow-[0_0_15px_rgba(var(--primary),0.2)] border-primary/20 hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] transition-all duration-300" :
    theme === "halftone" ? "bg-[url('/halftone.png')] bg-repeat hover:bg-blend-overlay hover:bg-foreground/10 transition-all" :
    "transition-all duration-200 hover:border-foreground/40 hover:scale-[1.02] active:scale-[0.98]"; // default

  // Fix shapes for variants that have gap (link). Outline groups them together.
  const isSeparated = variant === "link" || theme === "brutal";
  
  let shapeClass = "";
  if (isSeparated) {
    shapeClass = 
      shape === "rounded" ? "rounded-full" :
      shape === "square" ? "rounded-none" :
      shape === "sharp" ? "rounded-[2px]" :
      "rounded-md";
  }

  return (
    <div
      ref={ref}
      className={cn(
        slotVariants({ variant, color, shape, spacing }),
        variantStyles,
        shapeClass,
        themeClasses,
        isActive && `z-10 ring-2 ${ringClass}`,
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot className="text-foreground" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
