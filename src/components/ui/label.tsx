/**
 * @registry-slug label
 * @registry-name Label
 * @registry-description A form label with size and color variants, plus required-field indicator.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-is-new
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type LabelColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const labelVariants = cva(
  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none",
  {
    variants: {
      color: {
        default: "text-foreground",
        blue: "text-blue-600 dark:text-blue-500",
        emerald: "text-emerald-600 dark:text-emerald-500",
        rose: "text-rose-600 dark:text-rose-500",
        amber: "text-amber-600 dark:text-amber-500",
        violet: "text-violet-600 dark:text-violet-500",
        indigo: "text-indigo-600 dark:text-indigo-500",
        sky: "text-sky-600 dark:text-sky-500",
        slate: "text-slate-600 dark:text-slate-500",
        orange: "text-orange-600 dark:text-orange-500",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
    },
  }
);

export interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color">,
    VariantProps<typeof labelVariants> {
  /** Show a required-field asterisk. */
  required?: boolean;
  /** Muted helper text rendered after the label. */
  hint?: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, color, size, required, hint, children, ...props }, ref) => (
    <label ref={ref} className={cn(labelVariants({ color, size }), className)} {...props}>
      {children}
      {required && <span className="ml-0.5 text-rose-500" aria-hidden="true">*</span>}
      {hint && <span className="ml-2 font-normal text-muted-foreground">{hint}</span>}
    </label>
  )
);
Label.displayName = "Label";

export { Label, labelVariants };
