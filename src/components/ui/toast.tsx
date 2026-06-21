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

import { motion, AnimatePresence } from "framer-motion"

export type ToastColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ToastShape = "default" | "square" | "rounded" | "sharp";
export type ToastSpacing = "default" | "2x" | "4x" | "6x" | "8x";

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & {
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  }
>(({ className, position = "bottom-right", ...props }, ref) => {
  const positionClasses = {
    "top-right": "top-0 right-0 flex-col",
    "top-left": "top-0 left-0 flex-col",
    "bottom-right": "bottom-0 right-0 flex-col-reverse",
    "bottom-left": "bottom-0 left-0 flex-col-reverse",
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
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden border p-4 pr-6 shadow-lg transition-colors",
  {
    variants: {
      variant: {
        default: "", // colors handled dynamically
        destructive:
          "destructive group border-red-500 bg-red-500 text-white dark:border-red-900 dark:bg-red-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
    VariantProps<typeof toastVariants> {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  color?: ToastColor;
  shape?: ToastShape;
  spacing?: ToastSpacing;
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, variant, position = "bottom-right", color = "default", shape = "default", spacing = "default", ...props }, ref) => {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  const animationVariants = {
    initial: { 
      opacity: 0, 
      x: isLeft ? -100 : 100,
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

  const getColorClasses = () => {
    if (variant === "destructive") return ""; // let variant override
    switch (color) {
      case "blue": return "bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-900";
      case "emerald": return "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-900";
      case "rose": return "bg-rose-100 text-rose-900 border-rose-200 dark:bg-rose-950 dark:text-rose-100 dark:border-rose-900";
      case "amber": return "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-900";
      case "violet": return "bg-violet-100 text-violet-900 border-violet-200 dark:bg-violet-950 dark:text-violet-100 dark:border-violet-900";
      case "indigo": return "bg-indigo-100 text-indigo-900 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-100 dark:border-indigo-900";
      case "sky": return "bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-100 dark:border-sky-900";
      case "slate": return "bg-slate-100 text-slate-900 border-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:border-slate-900";
      case "orange": return "bg-orange-100 text-orange-900 border-orange-200 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-900";
      default: return "bg-background text-foreground border-border";
    }
  };

  return (
    <ToastPrimitives.Root
      ref={ref}
      asChild
      className={cn(
        toastVariants({ variant }), 
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-2xl" : "rounded-md",
        spacing === "2x" ? "p-2 pr-6" : spacing === "6x" || spacing === "8x" ? "p-6 pr-8" : "p-4 pr-6",
        getColorClasses(),
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
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export type ToastActionElement = React.ReactElement<typeof ToastAction>

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };