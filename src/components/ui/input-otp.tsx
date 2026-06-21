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
  "flex items-center gap-2 has-[:disabled]:opacity-50",
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

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput> & VariantProps<typeof inputOTPVariants>
>(({ className, containerClassName, spacing, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(inputOTPVariants({ spacing }), containerClassName)}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
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
  "relative flex items-center justify-center border-y border-r text-sm transition-all first:border-l focus:z-10",
  {
    variants: {
      color: {
        default: "border-border bg-transparent text-foreground focus:ring-ring",
        blue: "border-blue-200 dark:border-blue-800 bg-transparent text-blue-950 dark:text-blue-50 focus:ring-blue-600 dark:focus:ring-blue-500",
        emerald: "border-emerald-200 dark:border-emerald-800 bg-transparent text-emerald-950 dark:text-emerald-50 focus:ring-emerald-500",
        rose: "border-rose-200 dark:border-rose-800 bg-transparent text-rose-950 dark:text-rose-50 focus:ring-rose-500",
        amber: "border-amber-200 dark:border-amber-800 bg-transparent text-amber-950 dark:text-amber-50 focus:ring-amber-500",
        violet: "border-violet-200 dark:border-violet-800 bg-transparent text-violet-950 dark:text-violet-50 focus:ring-violet-600 dark:focus:ring-violet-500",
        indigo: "border-indigo-200 dark:border-indigo-800 bg-transparent text-indigo-950 dark:text-indigo-50 focus:ring-indigo-600 dark:focus:ring-indigo-500",
        sky: "border-sky-200 dark:border-sky-800 bg-transparent text-sky-950 dark:text-sky-50 focus:ring-sky-500",
        slate: "border-slate-200 dark:border-slate-800 bg-transparent text-slate-950 dark:text-slate-50 focus:ring-slate-600 dark:focus:ring-slate-500",
        orange: "border-orange-200 dark:border-orange-800 bg-transparent text-orange-950 dark:text-orange-50 focus:ring-orange-500",
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
      color: "default",
      shape: "default",
      spacing: "default",
    }
  }
)

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number } & VariantProps<typeof slotVariants>
>(({ index, className, color, shape, spacing, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  // Map color to ring class explicitly since dynamic rings can be tricky with tailwind merge
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

  return (
    <div
      ref={ref}
      className={cn(
        slotVariants({ color, shape, spacing }),
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
