/**
 * @registry-slug alert
 * @registry-name Alert
 * @registry-description Inline alert banners with solid, soft, and outline styles, icons, and dismissal.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type AlertColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const alertVariants = cva(
  "relative flex w-full items-start gap-3 border transition-colors duration-300 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:mt-0.5",
  {
    variants: {
      variant: {
        soft: "border-transparent",
        solid: "border-transparent text-white",
        outline: "bg-transparent",
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
      size: {
        sm: "p-3 text-xs",
        md: "p-4 text-sm",
        lg: "p-5 text-base",
      },
      shape: {
        default: "rounded-xl",
        square: "rounded-none",
        rounded: "rounded-2xl",
        sharp: "rounded-[2px]",
      },
    },
    compoundVariants: [
      { variant: "soft", color: "default", className: "bg-muted/70 text-foreground" },
      { variant: "soft", color: "blue", className: "bg-blue-600/10 text-blue-700 dark:text-blue-400" },
      { variant: "soft", color: "emerald", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
      { variant: "soft", color: "rose", className: "bg-rose-500/10 text-rose-700 dark:text-rose-400" },
      { variant: "soft", color: "amber", className: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
      { variant: "soft", color: "violet", className: "bg-violet-600/10 text-violet-700 dark:text-violet-400" },
      { variant: "soft", color: "indigo", className: "bg-indigo-600/10 text-indigo-700 dark:text-indigo-400" },
      { variant: "soft", color: "sky", className: "bg-sky-500/10 text-sky-700 dark:text-sky-400" },
      { variant: "soft", color: "slate", className: "bg-slate-600/10 text-slate-700 dark:text-slate-400" },
      { variant: "soft", color: "orange", className: "bg-orange-500/10 text-orange-700 dark:text-orange-400" },
      { variant: "solid", color: "default", className: "bg-foreground text-background" },
      { variant: "solid", color: "blue", className: "bg-blue-600" },
      { variant: "solid", color: "emerald", className: "bg-emerald-500" },
      { variant: "solid", color: "rose", className: "bg-rose-500" },
      { variant: "solid", color: "amber", className: "bg-amber-500" },
      { variant: "solid", color: "violet", className: "bg-violet-600" },
      { variant: "solid", color: "indigo", className: "bg-indigo-600" },
      { variant: "solid", color: "sky", className: "bg-sky-500" },
      { variant: "solid", color: "slate", className: "bg-slate-600" },
      { variant: "solid", color: "orange", className: "bg-orange-500" },
      { variant: "outline", color: "default", className: "border-border text-foreground" },
      { variant: "outline", color: "blue", className: "border-blue-600/50 text-blue-700 dark:text-blue-400" },
      { variant: "outline", color: "emerald", className: "border-emerald-500/50 text-emerald-700 dark:text-emerald-400" },
      { variant: "outline", color: "rose", className: "border-rose-500/50 text-rose-700 dark:text-rose-400" },
      { variant: "outline", color: "amber", className: "border-amber-500/50 text-amber-700 dark:text-amber-400" },
      { variant: "outline", color: "violet", className: "border-violet-600/50 text-violet-700 dark:text-violet-400" },
      { variant: "outline", color: "indigo", className: "border-indigo-600/50 text-indigo-700 dark:text-indigo-400" },
      { variant: "outline", color: "sky", className: "border-sky-500/50 text-sky-700 dark:text-sky-400" },
      { variant: "outline", color: "slate", className: "border-slate-600/50 text-slate-700 dark:text-slate-400" },
      { variant: "outline", color: "orange", className: "border-orange-500/50 text-orange-700 dark:text-orange-400" },
    ],
    defaultVariants: {
      variant: "soft",
      color: "default",
      size: "md",
      shape: "default",
    },
  }
);

const statusIconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
} as const;

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "title">,
    VariantProps<typeof alertVariants> {
  /** Semantic status — picks a sensible default icon. */
  status?: keyof typeof statusIconMap;
  /** Custom icon; overrides status icon. Pass null to hide. */
  icon?: React.ReactNode;
  title?: React.ReactNode;
  /** Show a dismiss button and animate out on close. */
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, color, size, shape, status, icon, title, dismissible, onDismiss, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(true);
    const StatusIcon = status ? statusIconMap[status] : null;
    const renderedIcon = icon !== undefined ? icon : StatusIcon ? <StatusIcon /> : null;

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            role="alert"
            initial={false}
            exit={{ opacity: 0, height: 0, marginTop: 0, overflow: "hidden" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={cn(alertVariants({ variant, color, size, shape }), className)}
            {...(props as React.ComponentProps<typeof motion.div>)}
          >
            {renderedIcon}
            <div className="flex-1 min-w-0">
              {title && <p className="font-semibold leading-snug">{title}</p>}
              {children && <div className={cn("leading-relaxed", title && "mt-1 opacity-90")}>{children}</div>}
            </div>
            {dismissible && (
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => {
                  setOpen(false);
                  onDismiss?.();
                }}
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current rounded-md p-0.5"
              >
                <X className="size-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
