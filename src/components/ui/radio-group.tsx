"use client"

/**
 * @registry-slug radio-group
 * @registry-name Radio Group
 * @registry-description A standard Radio Group component.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

export type RadioGroupColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type RadioGroupShape = "default" | "square" | "rounded" | "sharp";
export type RadioGroupSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface RadioGroupContextValue {
  color: RadioGroupColor;
  shape: RadioGroupShape;
  spacing: RadioGroupSpacing;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  color?: RadioGroupColor;
  shape?: RadioGroupShape;
  spacing?: RadioGroupSpacing;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, color = "default", shape = "default", spacing = "default", ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ color, shape, spacing }}>
      <RadioGroupPrimitive.Root
        className={cn(
          "grid", 
          spacing === "2x" ? "gap-1" : spacing === "6x" || spacing === "8x" ? "gap-4" : "gap-2",
          className
        )}
        {...props}
        ref={ref}
      />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { color, shape, spacing } = React.useContext(RadioGroupContext)
  
  const getColorClasses = () => {
    switch (color) {
      case "blue": return "border-blue-600 text-blue-600 focus-visible:ring-blue-600 dark:border-blue-500 dark:text-blue-500 dark:focus-visible:ring-blue-500";
      case "emerald": return "border-emerald-500 text-emerald-500 focus-visible:ring-emerald-500";
      case "rose": return "border-rose-500 text-rose-500 focus-visible:ring-rose-500";
      case "amber": return "border-amber-500 text-amber-500 focus-visible:ring-amber-500";
      case "violet": return "border-violet-600 text-violet-600 focus-visible:ring-violet-600 dark:border-violet-500 dark:text-violet-500 dark:focus-visible:ring-violet-500";
      case "indigo": return "border-indigo-600 text-indigo-600 focus-visible:ring-indigo-600 dark:border-indigo-500 dark:text-indigo-500 dark:focus-visible:ring-indigo-500";
      case "sky": return "border-sky-500 text-sky-500 focus-visible:ring-sky-500";
      case "slate": return "border-slate-600 text-slate-600 focus-visible:ring-slate-600 dark:border-slate-500 dark:text-slate-500 dark:focus-visible:ring-slate-500";
      case "orange": return "border-orange-500 text-orange-500 focus-visible:ring-orange-500";
      default: return "border-foreground text-foreground focus-visible:ring-ring";
    }
  };

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square border ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-md" : "rounded-full",
        spacing === "2x" ? "h-3 w-3" : spacing === "6x" || spacing === "8x" ? "h-5 w-5" : "h-4 w-4",
        getColorClasses(),
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className={cn(
          "fill-current text-current", 
          shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-sm" : "rounded-full",
          spacing === "2x" ? "h-1.5 w-1.5" : spacing === "6x" || spacing === "8x" ? "h-3 w-3" : "h-2.5 w-2.5"
        )} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
