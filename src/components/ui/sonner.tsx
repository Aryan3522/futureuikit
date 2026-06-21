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
import { cn } from "@/lib/utils"

export type ToasterColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ToasterShape = "default" | "square" | "rounded" | "sharp";
export type ToasterSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface ToasterProps extends React.ComponentProps<typeof Sonner> {
  color?: ToasterColor;
  shape?: ToasterShape;
  spacing?: ToasterSpacing;
}

const colorThemeMap: Record<ToasterColor, { buttonBg: string; buttonText: string; iconColor: string }> = {
  default: { buttonBg: "group-[.toast]:bg-primary", buttonText: "group-[.toast]:text-primary-foreground", iconColor: "text-foreground" },
  blue: { buttonBg: "group-[.toast]:bg-blue-600 dark:group-[.toast]:bg-blue-500", buttonText: "group-[.toast]:text-white", iconColor: "text-blue-600 dark:text-blue-500" },
  emerald: { buttonBg: "group-[.toast]:bg-emerald-600 dark:group-[.toast]:bg-emerald-500", buttonText: "group-[.toast]:text-white", iconColor: "text-emerald-600 dark:text-emerald-500" },
  rose: { buttonBg: "group-[.toast]:bg-rose-600 dark:group-[.toast]:bg-rose-500", buttonText: "group-[.toast]:text-white", iconColor: "text-rose-600 dark:text-rose-500" },
  amber: { buttonBg: "group-[.toast]:bg-amber-600 dark:group-[.toast]:bg-amber-500", buttonText: "group-[.toast]:text-white", iconColor: "text-amber-600 dark:text-amber-500" },
  violet: { buttonBg: "group-[.toast]:bg-violet-600 dark:group-[.toast]:bg-violet-500", buttonText: "group-[.toast]:text-white", iconColor: "text-violet-600 dark:text-violet-500" },
  indigo: { buttonBg: "group-[.toast]:bg-indigo-600 dark:group-[.toast]:bg-indigo-500", buttonText: "group-[.toast]:text-white", iconColor: "text-indigo-600 dark:text-indigo-500" },
  sky: { buttonBg: "group-[.toast]:bg-sky-600 dark:group-[.toast]:bg-sky-500", buttonText: "group-[.toast]:text-white", iconColor: "text-sky-600 dark:text-sky-500" },
  slate: { buttonBg: "group-[.toast]:bg-slate-600 dark:group-[.toast]:bg-slate-500", buttonText: "group-[.toast]:text-white", iconColor: "text-slate-600 dark:text-slate-500" },
  orange: { buttonBg: "group-[.toast]:bg-orange-600 dark:group-[.toast]:bg-orange-500", buttonText: "group-[.toast]:text-white", iconColor: "text-orange-600 dark:text-orange-500" },
};

const getShapeClass = (shape: ToasterShape, isButton?: boolean) => {
  if (isButton) {
    switch (shape) {
      case "square": return "!rounded-none";
      case "sharp": return "!rounded-sm";
      case "rounded": return "!rounded-md";
      case "default": return "!rounded-md";
    }
  }
  switch (shape) {
    case "square": return "!rounded-none";
    case "sharp": return "!rounded-md";
    case "rounded": return "!rounded-2xl";
    case "default": return "!rounded-xl";
  }
};

const getSpacingClass = (spacing: ToasterSpacing) => {
  switch (spacing) {
    case "2x": return "!p-2";
    case "4x": return "!p-4";
    case "6x": return "!p-6";
    case "8x": return "!p-8";
    default: return "!p-4";
  }
};

const Toaster = ({ 
  color = "default",
  shape = "default",
  spacing = "default",
  ...props 
}: ToasterProps) => {
  const { theme = "system" } = useTheme()

  const activeTheme = colorThemeMap[color];
  const shapeClass = getShapeClass(shape);
  const shapeClassButton = getShapeClass(shape, true);
  const spacingClass = getSpacingClass(spacing);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheck className={cn("h-4 w-4", activeTheme.iconColor)} />,
        info: <Info className={cn("h-4 w-4", activeTheme.iconColor)} />,
        warning: <TriangleAlert className={cn("h-4 w-4", activeTheme.iconColor)} />,
        error: <OctagonX className={cn("h-4 w-4", activeTheme.iconColor)} />,
        loading: <LoaderCircle className={cn("h-4 w-4 animate-spin", activeTheme.iconColor)} />,
      }}
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            shapeClass,
            spacingClass
          ),
          description: "group-[.toast]:text-muted-foreground",
          actionButton: cn(
            activeTheme.buttonBg,
            activeTheme.buttonText,
            shapeClassButton
          ),
          cancelButton: cn(
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            shapeClassButton
          ),
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
