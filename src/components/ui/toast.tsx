/**
 * @registry-slug toast
 * @registry-name Toast Notification
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
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-colors",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & { position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" }
>(({ className, variant, position = "bottom-right", ...props }, ref) => {
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

  return (
    <ToastPrimitives.Root
      ref={ref}
      asChild
      className={cn(toastVariants({ variant }), className)}
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
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
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
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
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

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
export type ToastActionElement = React.ReactElement<typeof ToastAction>

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };