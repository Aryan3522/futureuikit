"use client";

/**
 * @registry-slug toast
 * @registry-name Toast Notification
 * @registry-description A Future UI Toast Notification component.
 * @registry-category ui
 * @registry-dependency @radix-ui/react-toast
 * @registry-dependency class-variance-authority
 * @registry-dependency lucide-react
 * @registry-dependency framer-motion
 * @registry-file src/components/ui/toaster.tsx
 * @registry-file src/hooks/use-toast.ts
 */

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export type ToastVariant = "solid" | "outline" | "ghost" | "glass" | "elevated" | "soft" | "destructive";
export type ToastColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange" | "destructive";
export type ToastShape = "default" | "square" | "rounded" | "sharp";
export type ToastSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type ToastSize = "default" | "sm" | "md" | "lg" | "xl";

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & {
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top" | "bottom";
  }
>(({ className, position = "bottom-right", ...props }, ref) => {
  const positionClasses = {
    "top-right": "top-0 right-0 flex-col",
    "top-left": "top-0 left-0 flex-col",
    "bottom-right": "bottom-0 right-0 flex-col-reverse",
    "bottom-left": "bottom-0 left-0 flex-col-reverse",
    "top": "top-0 left-1/2 -translate-x-1/2 flex-col",
    "bottom": "bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse",
  };

  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed z-[100] flex max-h-screen w-full p-4 md:max-w-[420px] outline-none",
        positionClasses[position],
        className
      )}
      {...props} />
  );
})
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden border p-4 pr-6 shadow-lg transition-colors backdrop-blur-none",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        outline: "bg-background border-2",
        ghost: "bg-background border-transparent shadow-none",
        glass: "backdrop-blur-xl bg-white/10 dark:bg-black/20 border shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        elevated: "bg-background border-border shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]",
        soft: "border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]",
        destructive: "destructive border-red-500 bg-red-500 text-white dark:border-red-900 dark:bg-red-900",
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
        destructive: "",
      },
      shape: {
        default: "rounded-xl",
        square: "rounded-none",
        rounded: "rounded-2xl",
        sharp: "rounded-md",
      },
      spacing: {
        default: "p-4 pr-6",
        "2x": "p-2 pr-6",
        "4x": "p-4 pr-6",
        "6x": "p-6 pr-8",
        "8x": "p-8 pr-10",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      }
    },
    compoundVariants: [
      // SOLID
      { variant: "solid", color: "default", className: "bg-foreground text-background" },
      { variant: "solid", color: "blue", className: "bg-blue-600 text-white dark:bg-blue-500" },
      { variant: "solid", color: "emerald", className: "bg-emerald-600 text-white dark:bg-emerald-500" },
      { variant: "solid", color: "rose", className: "bg-rose-600 text-white dark:bg-rose-500" },
      { variant: "solid", color: "amber", className: "bg-amber-500 text-amber-950 dark:bg-amber-400" },
      { variant: "solid", color: "violet", className: "bg-violet-600 text-white dark:bg-violet-500" },
      { variant: "solid", color: "indigo", className: "bg-indigo-600 text-white dark:bg-indigo-500" },
      { variant: "solid", color: "sky", className: "bg-sky-500 text-sky-950 dark:bg-sky-400" },
      { variant: "solid", color: "slate", className: "bg-slate-600 text-white dark:bg-slate-500" },
      { variant: "solid", color: "orange", className: "bg-orange-500 text-orange-950 dark:bg-orange-400" },
      { variant: "solid", color: "destructive", className: "destructive bg-red-600 text-white dark:bg-red-500 border-red-600 dark:border-red-500" },

      // OUTLINE & GHOST
      { variant: ["outline", "ghost"], color: "default", className: "text-foreground border-border" },
      { variant: ["outline", "ghost"], color: "blue", className: "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" },
      { variant: ["outline", "ghost"], color: "emerald", className: "text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500" },
      { variant: ["outline", "ghost"], color: "rose", className: "text-rose-600 border-rose-600 dark:text-rose-500 dark:border-rose-500" },
      { variant: ["outline", "ghost"], color: "amber", className: "text-amber-600 border-amber-600 dark:text-amber-500 dark:border-amber-500" },
      { variant: ["outline", "ghost"], color: "violet", className: "text-violet-600 border-violet-600 dark:text-violet-500 dark:border-violet-500" },
      { variant: ["outline", "ghost"], color: "indigo", className: "text-indigo-600 border-indigo-600 dark:text-indigo-500 dark:border-indigo-500" },
      { variant: ["outline", "ghost"], color: "sky", className: "text-sky-600 border-sky-600 dark:text-sky-500 dark:border-sky-500" },
      { variant: ["outline", "ghost"], color: "slate", className: "text-slate-600 border-slate-600 dark:text-slate-500 dark:border-slate-500" },
      { variant: ["outline", "ghost"], color: "orange", className: "text-orange-600 border-orange-600 dark:text-orange-500 dark:border-orange-500" },
      { variant: ["outline", "ghost"], color: "destructive", className: "destructive text-red-600 border-red-600 dark:text-red-500 dark:border-red-500" },

      // GLASS
      { variant: "glass", color: "default", className: "border-white/20 dark:border-white/10 text-foreground" },
      { variant: "glass", color: "blue", className: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300" },
      { variant: "glass", color: "emerald", className: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
      { variant: "glass", color: "rose", className: "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300" },
      { variant: "glass", color: "amber", className: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300" },
      { variant: "glass", color: "violet", className: "bg-violet-500/10 border-violet-500/20 text-violet-700 dark:text-violet-300" },
      { variant: "glass", color: "indigo", className: "bg-indigo-500/10 border-indigo-500/20 text-indigo-700 dark:text-indigo-300" },
      { variant: "glass", color: "sky", className: "bg-sky-500/10 border-sky-500/20 text-sky-700 dark:text-sky-300" },
      { variant: "glass", color: "slate", className: "bg-slate-500/10 border-slate-500/20 text-slate-700 dark:text-slate-300" },
      { variant: "glass", color: "orange", className: "bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-300" },
      { variant: "glass", color: "destructive", className: "destructive bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300" },

      // SOFT
      { variant: "soft", color: "default", className: "bg-muted text-foreground" },
      { variant: "soft", color: "blue", className: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300" },
      { variant: "soft", color: "emerald", className: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" },
      { variant: "soft", color: "rose", className: "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300" },
      { variant: "soft", color: "amber", className: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300" },
      { variant: "soft", color: "violet", className: "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300" },
      { variant: "soft", color: "indigo", className: "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300" },
      { variant: "soft", color: "sky", className: "bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300" },
      { variant: "soft", color: "slate", className: "bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300" },
      { variant: "soft", color: "orange", className: "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300" },
      { variant: "soft", color: "destructive", className: "destructive bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900" },
      
      // ELEVATED
      { variant: "elevated", color: "default", className: "text-foreground" },
      { variant: "elevated", color: "blue", className: "text-blue-600 dark:text-blue-400" },
      { variant: "elevated", color: "emerald", className: "text-emerald-600 dark:text-emerald-400" },
      { variant: "elevated", color: "rose", className: "text-rose-600 dark:text-rose-400" },
      { variant: "elevated", color: "amber", className: "text-amber-600 dark:text-amber-400" },
      { variant: "elevated", color: "violet", className: "text-violet-600 dark:text-violet-400" },
      { variant: "elevated", color: "indigo", className: "text-indigo-600 dark:text-indigo-400" },
      { variant: "elevated", color: "sky", className: "text-sky-600 dark:text-sky-400" },
      { variant: "elevated", color: "slate", className: "text-slate-600 dark:text-slate-400" },
      { variant: "elevated", color: "orange", className: "text-orange-600 dark:text-orange-400" },
      { variant: "elevated", color: "destructive", className: "destructive text-red-600 dark:text-red-400 shadow-[0_10px_40px_-10px_rgba(239,68,68,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.5)]" },
    ],
    defaultVariants: {
      variant: "elevated",
      color: "default",
      shape: "default",
      spacing: "default",
      size: "default",
    },
  }
)

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
    VariantProps<typeof toastVariants> {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top" | "bottom";
  color?: ToastColor;
  shape?: ToastShape;
  spacing?: ToastSpacing;
  size?: ToastSize;
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, variant, position = "bottom-right", color = "default", shape = "default", spacing = "default", size = "default", ...props }, ref) => {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");
  const isCenter = position === "top" || position === "bottom";

  const animationVariants = {
    initial: { 
      opacity: 0, 
      x: isCenter ? 0 : isLeft ? -100 : 100,
      y: isTop ? -50 : 50,
      scale: 0.9 
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeIn" as const }
    }
  };

  return (
    <ToastPrimitives.Root
      ref={ref}
      asChild
      className={cn(
        toastVariants({ variant, color, shape, spacing, size }),
        className
      )}
      {...props}
    >
      <motion.li
        variants={animationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        layout
        style={{ willChange: "transform, opacity" }}
      >
        {props.children}
      </motion.li>
    </ToastPrimitives.Root>
  );
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-current/20 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-current/10 focus:outline-none focus:ring-1 focus:ring-current disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-white/40 group-[.destructive]:hover:border-white/30 group-[.destructive]:hover:bg-white group-[.destructive]:hover:text-red-600 group-[.destructive]:focus:ring-white",
      className
    )}
    {...props} />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-current/50 opacity-0 transition-opacity hover:text-current focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}>
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-[0.9em] opacity-90", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export type ToastActionElement = React.ReactElement<typeof ToastAction>

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };