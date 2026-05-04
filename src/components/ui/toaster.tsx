"use client";

import * as React from "react"
import { AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  // Group toasts by position
  const positions = ["bottom-right", "bottom-left", "top-right", "top-left"] as const;

  return (
    <ToastProvider>
      {positions.map((position) => {
        const positionToasts = toasts.filter((t) => (t.position || "bottom-right") === position);
        if (positionToasts.length === 0) return null;

        return (
          <React.Fragment key={position}>
            <AnimatePresence mode="popLayout">
              {positionToasts.map(function ({ id, title, description, action, ...props }) {
                return (
                  <Toast key={id} {...props} position={position}>
                    <div className="grid gap-1">
                      {title && <ToastTitle>{title}</ToastTitle>}
                      {description && (
                        <ToastDescription>{description}</ToastDescription>
                      )}
                    </div>
                    {action}
                    <ToastClose />
                  </Toast>
                );
              })}
            </AnimatePresence>
            <ToastViewport position={position} />
          </React.Fragment>
        );
      })}
      {/* Fallback for initial render or single position */}
      {toasts.length > 0 && !positions.some(p => toasts.some(t => t.position === p)) && (
        <ToastViewport />
      )}
    </ToastProvider>
  );
}