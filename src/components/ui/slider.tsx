"use client"

/**
 * @registry-slug slider
 * @registry-name Slider
 * @registry-description A standard Slider component.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export type SliderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type SliderShape = "default" | "square" | "rounded" | "sharp";
export type SliderSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type SliderSize = "default" | "sm" | "md" | "lg" | "xl";
export type SliderVariant = "solid" | "outline" | "ghost" | "glass" | "elevated" | "soft";

const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden bg-muted",
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent border-2 border-muted",
        ghost: "bg-muted/50",
        glass: "bg-white/10 dark:bg-black/20 backdrop-blur-md shadow-inner border border-white/10",
        elevated: "shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]",
        soft: "shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] bg-muted/50",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-xl",
        sharp: "rounded-[2px]",
      },
      spacing: {
        default: "h-2",
        "2x": "h-1",
        "4x": "h-2",
        "6x": "h-3",
        "8x": "h-4",
      }
    },
    defaultVariants: {
      variant: "solid",
      shape: "default",
      spacing: "default",
    }
  }
);

const sliderRangeVariants = cva(
  "absolute h-full",
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent border-y-2 border-l-2",
        ghost: "opacity-80",
        glass: "opacity-80 backdrop-blur-md mix-blend-overlay",
        elevated: "shadow-md",
        soft: "",
      },
      color: {
        default: "bg-foreground border-foreground",
        blue: "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500",
        emerald: "bg-emerald-500 border-emerald-500",
        rose: "bg-rose-500 border-rose-500",
        amber: "bg-amber-500 border-amber-500",
        violet: "bg-violet-600 dark:bg-violet-500 border-violet-600 dark:border-violet-500",
        indigo: "bg-indigo-600 dark:bg-indigo-500 border-indigo-600 dark:border-indigo-500",
        sky: "bg-sky-500 border-sky-500",
        slate: "bg-slate-600 dark:bg-slate-500 border-slate-600 dark:border-slate-500",
        orange: "bg-orange-500 border-orange-500",
      },
    },
    compoundVariants: [
      { variant: "outline", color: "default", className: "bg-transparent" },
      { variant: "outline", color: "blue", className: "bg-transparent" },
      { variant: "outline", color: "emerald", className: "bg-transparent" },
      { variant: "outline", color: "rose", className: "bg-transparent" },
      { variant: "outline", color: "amber", className: "bg-transparent" },
      { variant: "outline", color: "violet", className: "bg-transparent" },
      { variant: "outline", color: "indigo", className: "bg-transparent" },
      { variant: "outline", color: "sky", className: "bg-transparent" },
      { variant: "outline", color: "slate", className: "bg-transparent" },
      { variant: "outline", color: "orange", className: "bg-transparent" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
    }
  }
);

const sliderThumbVariants = cva(
  "block bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing",
  {
    variants: {
      variant: {
        solid: "border-2",
        outline: "border-2",
        ghost: "border-2 shadow-none",
        glass: "bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/50 shadow-sm",
        elevated: "shadow-[0_2px_8px_rgba(0,0,0,0.3)] border-0",
        soft: "shadow-[0_2px_10px_rgba(0,0,0,0.1)] border-0 bg-background",
      },
      color: {
        default: "border-foreground focus-visible:ring-ring/50",
        blue: "border-blue-600 dark:border-blue-500 focus-visible:ring-blue-600/50 dark:focus-visible:ring-blue-500/50",
        emerald: "border-emerald-500 focus-visible:ring-emerald-500/50",
        rose: "border-rose-500 focus-visible:ring-rose-500/50",
        amber: "border-amber-500 focus-visible:ring-amber-500/50",
        violet: "border-violet-600 dark:border-violet-500 focus-visible:ring-violet-600/50 dark:focus-visible:ring-violet-500/50",
        indigo: "border-indigo-600 dark:border-indigo-500 focus-visible:ring-indigo-600/50 dark:focus-visible:ring-indigo-500/50",
        sky: "border-sky-500 focus-visible:ring-sky-500/50",
        slate: "border-slate-600 dark:border-slate-500 focus-visible:ring-slate-600/50 dark:focus-visible:ring-slate-500/50",
        orange: "border-orange-500 focus-visible:ring-orange-500/50",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-xl",
        sharp: "rounded-[2px]",
      },
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-7 w-7",
      }
    },
    defaultVariants: {
      variant: "solid",
      color: "default",
      shape: "default",
      size: "default",
    }
  }
);


export interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "color"> {
  variant?: SliderVariant;
  color?: SliderColor;
  shape?: SliderShape;
  spacing?: SliderSpacing;
  size?: SliderSize;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant = "solid", color = "default", shape = "default", spacing = "default", size = "default", ...props }, ref) => {

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className={sliderTrackVariants({ variant, shape, spacing })}>
        <SliderPrimitive.Range className={sliderRangeVariants({ variant, color })} />
      </SliderPrimitive.Track>
      {Array.from({ length: (props.value?.length || props.defaultValue?.length || 1) }).map((_, index) => (
        <SliderPrimitive.Thumb key={index} className={sliderThumbVariants({ variant, color, shape, size })} />
      ))}
    </SliderPrimitive.Root>
  );
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
