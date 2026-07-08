"use client"

/**
 * @registry-slug sonner
 * @registry-name Sonner
 * @registry-description A standard Sonner component.
 * @registry-category ui
 * @registry-type components:ui
 */

import React from "react"
import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type ToasterVariant = "solid" | "outline" | "ghost" | "glass" | "elevated" | "soft";
export type ToasterColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ToasterShape = "default" | "square" | "rounded" | "sharp";
export type ToasterSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type ToasterSize = "default" | "sm" | "md" | "lg" | "xl";

const toastVariants = cva(
  "group toast flex gap-3 overflow-hidden transition-all !backdrop-blur-none",
  {
    variants: {
      variant: {
        solid: "!border-transparent",
        outline: "!bg-background !border-2",
        ghost: "!bg-background !border-transparent !shadow-none",
        glass: "!backdrop-blur-xl !bg-white/10 dark:!bg-black/20 !border !shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        elevated: "!bg-background !border-border !shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] dark:!shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]",
        soft: "!border-transparent !shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]",
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
        default: "!rounded-xl",
        square: "!rounded-none",
        rounded: "!rounded-2xl",
        sharp: "!rounded-md",
      },
      spacing: {
        default: "!p-4",
        "2x": "!p-2",
        "4x": "!p-4",
        "6x": "!p-6",
        "8x": "!p-8",
      },
      size: {
        default: "!text-sm",
        sm: "!text-xs",
        md: "!text-sm",
        lg: "!text-base",
        xl: "!text-lg",
      }
    },
    compoundVariants: [
      // SOLID
      { variant: "solid", color: "default", className: "!bg-foreground !text-background" },
      { variant: "solid", color: "blue", className: "!bg-blue-600 !text-white dark:!bg-blue-500" },
      { variant: "solid", color: "emerald", className: "!bg-emerald-600 !text-white dark:!bg-emerald-500" },
      { variant: "solid", color: "rose", className: "!bg-rose-600 !text-white dark:!bg-rose-500" },
      { variant: "solid", color: "amber", className: "!bg-amber-500 !text-amber-950 dark:!bg-amber-400" },
      { variant: "solid", color: "violet", className: "!bg-violet-600 !text-white dark:!bg-violet-500" },
      { variant: "solid", color: "indigo", className: "!bg-indigo-600 !text-white dark:!bg-indigo-500" },
      { variant: "solid", color: "sky", className: "!bg-sky-500 !text-sky-950 dark:!bg-sky-400" },
      { variant: "solid", color: "slate", className: "!bg-slate-600 !text-white dark:!bg-slate-500" },
      { variant: "solid", color: "orange", className: "!bg-orange-500 !text-orange-950 dark:!bg-orange-400" },

      // OUTLINE & GHOST
      { variant: ["outline", "ghost"], color: "default", className: "!text-foreground !border-border" },
      { variant: ["outline", "ghost"], color: "blue", className: "!text-blue-600 !border-blue-600 dark:!text-blue-500 dark:!border-blue-500" },
      { variant: ["outline", "ghost"], color: "emerald", className: "!text-emerald-600 !border-emerald-600 dark:!text-emerald-500 dark:!border-emerald-500" },
      { variant: ["outline", "ghost"], color: "rose", className: "!text-rose-600 !border-rose-600 dark:!text-rose-500 dark:!border-rose-500" },
      { variant: ["outline", "ghost"], color: "amber", className: "!text-amber-600 !border-amber-600 dark:!text-amber-500 dark:!border-amber-500" },
      { variant: ["outline", "ghost"], color: "violet", className: "!text-violet-600 !border-violet-600 dark:!text-violet-500 dark:!border-violet-500" },
      { variant: ["outline", "ghost"], color: "indigo", className: "!text-indigo-600 !border-indigo-600 dark:!text-indigo-500 dark:!border-indigo-500" },
      { variant: ["outline", "ghost"], color: "sky", className: "!text-sky-600 !border-sky-600 dark:!text-sky-500 dark:!border-sky-500" },
      { variant: ["outline", "ghost"], color: "slate", className: "!text-slate-600 !border-slate-600 dark:!text-slate-500 dark:!border-slate-500" },
      { variant: ["outline", "ghost"], color: "orange", className: "!text-orange-600 !border-orange-600 dark:!text-orange-500 dark:!border-orange-500" },

      // GLASS
      { variant: "glass", color: "default", className: "!border-white/20 dark:!border-white/10 !text-foreground" },
      { variant: "glass", color: "blue", className: "!bg-blue-500/10 !border-blue-500/20 !text-blue-700 dark:!text-blue-300" },
      { variant: "glass", color: "emerald", className: "!bg-emerald-500/10 !border-emerald-500/20 !text-emerald-700 dark:!text-emerald-300" },
      { variant: "glass", color: "rose", className: "!bg-rose-500/10 !border-rose-500/20 !text-rose-700 dark:!text-rose-300" },
      { variant: "glass", color: "amber", className: "!bg-amber-500/10 !border-amber-500/20 !text-amber-700 dark:!text-amber-300" },
      { variant: "glass", color: "violet", className: "!bg-violet-500/10 !border-violet-500/20 !text-violet-700 dark:!text-violet-300" },
      { variant: "glass", color: "indigo", className: "!bg-indigo-500/10 !border-indigo-500/20 !text-indigo-700 dark:!text-indigo-300" },
      { variant: "glass", color: "sky", className: "!bg-sky-500/10 !border-sky-500/20 !text-sky-700 dark:!text-sky-300" },
      { variant: "glass", color: "slate", className: "!bg-slate-500/10 !border-slate-500/20 !text-slate-700 dark:!text-slate-300" },
      { variant: "glass", color: "orange", className: "!bg-orange-500/10 !border-orange-500/20 !text-orange-700 dark:!text-orange-300" },

      // SOFT
      { variant: "soft", color: "default", className: "!bg-muted !text-foreground" },
      { variant: "soft", color: "blue", className: "!bg-blue-50 dark:!bg-blue-950 !text-blue-700 dark:!text-blue-300" },
      { variant: "soft", color: "emerald", className: "!bg-emerald-50 dark:!bg-emerald-950 !text-emerald-700 dark:!text-emerald-300" },
      { variant: "soft", color: "rose", className: "!bg-rose-50 dark:!bg-rose-950 !text-rose-700 dark:!text-rose-300" },
      { variant: "soft", color: "amber", className: "!bg-amber-50 dark:!bg-amber-950 !text-amber-700 dark:!text-amber-300" },
      { variant: "soft", color: "violet", className: "!bg-violet-50 dark:!bg-violet-950 !text-violet-700 dark:!text-violet-300" },
      { variant: "soft", color: "indigo", className: "!bg-indigo-50 dark:!bg-indigo-950 !text-indigo-700 dark:!text-indigo-300" },
      { variant: "soft", color: "sky", className: "!bg-sky-50 dark:!bg-sky-950 !text-sky-700 dark:!text-sky-300" },
      { variant: "soft", color: "slate", className: "!bg-slate-50 dark:!bg-slate-950 !text-slate-700 dark:!text-slate-300" },
      { variant: "soft", color: "orange", className: "!bg-orange-50 dark:!bg-orange-950 !text-orange-700 dark:!text-orange-300" },
      
      // ELEVATED
      { variant: "elevated", color: "default", className: "!text-foreground" },
      { variant: "elevated", color: "blue", className: "!text-blue-600 dark:!text-blue-400" },
      { variant: "elevated", color: "emerald", className: "!text-emerald-600 dark:!text-emerald-400" },
      { variant: "elevated", color: "rose", className: "!text-rose-600 dark:!text-rose-400" },
      { variant: "elevated", color: "amber", className: "!text-amber-600 dark:!text-amber-400" },
      { variant: "elevated", color: "violet", className: "!text-violet-600 dark:!text-violet-400" },
      { variant: "elevated", color: "indigo", className: "!text-indigo-600 dark:!text-indigo-400" },
      { variant: "elevated", color: "sky", className: "!text-sky-600 dark:!text-sky-400" },
      { variant: "elevated", color: "slate", className: "!text-slate-600 dark:!text-slate-400" },
      { variant: "elevated", color: "orange", className: "!text-orange-600 dark:!text-orange-400" },
    ],
    defaultVariants: {
      variant: "elevated",
      color: "default",
      shape: "default",
      spacing: "default",
      size: "default",
    },
  }
);

export interface ToasterProps extends React.ComponentProps<typeof Sonner> {
  variant?: ToasterVariant;
  color?: ToasterColor;
  shape?: ToasterShape;
  spacing?: ToasterSpacing;
  size?: ToasterSize;
}

const getIconSizeClass = (size: ToasterSize) => {
  switch (size) {
    case "sm": return "h-3 w-3";
    case "md": return "h-4 w-4";
    case "lg": return "h-5 w-5";
    case "xl": return "h-6 w-6";
    default: return "h-4 w-4";
  }
}

const Toaster = ({ 
  variant = "elevated",
  color = "default",
  shape = "default",
  spacing = "default",
  size = "default",
  ...props 
}: ToasterProps) => {
  const { theme = "system" } = useTheme()

  const toastClass = toastVariants({ variant, color, shape, spacing, size });
  const iconSizeClass = getIconSizeClass(size);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheck className={iconSizeClass} />,
        info: <Info className={iconSizeClass} />,
        warning: <TriangleAlert className={iconSizeClass} />,
        error: <OctagonX className={iconSizeClass} />,
        loading: <LoaderCircle className={cn(iconSizeClass, "animate-spin")} />,
      }}
      toastOptions={{
        classNames: {
          toast: toastClass,
          description: cn("!opacity-80"),
          actionButton: cn(
            "!bg-primary !text-primary-foreground",
            shape === "square" ? "!rounded-none" : shape === "sharp" ? "!rounded-sm" : "!rounded-md"
          ),
          cancelButton: cn(
            "!bg-muted !text-muted-foreground",
            shape === "square" ? "!rounded-none" : shape === "sharp" ? "!rounded-sm" : "!rounded-md"
          ),
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
