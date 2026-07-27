/**
 * @registry-slug input
 * @registry-name Input
 * @registry-description A premium text input with variants, colors, sizes, and icon slots.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-is-new
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type InputColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const inputVariants = cva(
  "flex w-full bg-transparent text-foreground transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "border border-transparent bg-muted/60 focus-visible:bg-transparent focus-visible:ring-2",
        outline: "border focus-visible:ring-2",
        ghost: "border border-transparent hover:bg-muted/40 focus-visible:bg-transparent focus-visible:ring-2",
        underline: "border-0 border-b rounded-none px-1 focus-visible:ring-0 focus-visible:border-b-2",
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
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-3.5 text-sm",
        lg: "h-12 px-4 text-base",
      },
      shape: {
        default: "rounded-lg",
        square: "rounded-none",
        rounded: "rounded-full",
        sharp: "rounded-[2px]",
      },
    },
    compoundVariants: [
      { variant: ["solid", "outline", "ghost"], color: "default", className: "border-border focus-visible:ring-ring/40" },
      { variant: ["solid", "outline", "ghost"], color: "blue", className: "border-blue-600/40 focus-visible:ring-blue-600/40 focus-visible:border-blue-600" },
      { variant: ["solid", "outline", "ghost"], color: "emerald", className: "border-emerald-500/40 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500" },
      { variant: ["solid", "outline", "ghost"], color: "rose", className: "border-rose-500/40 focus-visible:ring-rose-500/40 focus-visible:border-rose-500" },
      { variant: ["solid", "outline", "ghost"], color: "amber", className: "border-amber-500/40 focus-visible:ring-amber-500/40 focus-visible:border-amber-500" },
      { variant: ["solid", "outline", "ghost"], color: "violet", className: "border-violet-600/40 focus-visible:ring-violet-600/40 focus-visible:border-violet-600" },
      { variant: ["solid", "outline", "ghost"], color: "indigo", className: "border-indigo-600/40 focus-visible:ring-indigo-600/40 focus-visible:border-indigo-600" },
      { variant: ["solid", "outline", "ghost"], color: "sky", className: "border-sky-500/40 focus-visible:ring-sky-500/40 focus-visible:border-sky-500" },
      { variant: ["solid", "outline", "ghost"], color: "slate", className: "border-slate-600/40 focus-visible:ring-slate-600/40 focus-visible:border-slate-600" },
      { variant: ["solid", "outline", "ghost"], color: "orange", className: "border-orange-500/40 focus-visible:ring-orange-500/40 focus-visible:border-orange-500" },
      { variant: "underline", color: "default", className: "border-border focus-visible:border-foreground" },
      { variant: "underline", color: "blue", className: "border-blue-600/40 focus-visible:border-blue-600" },
      { variant: "underline", color: "emerald", className: "border-emerald-500/40 focus-visible:border-emerald-500" },
      { variant: "underline", color: "rose", className: "border-rose-500/40 focus-visible:border-rose-500" },
      { variant: "underline", color: "amber", className: "border-amber-500/40 focus-visible:border-amber-500" },
      { variant: "underline", color: "violet", className: "border-violet-600/40 focus-visible:border-violet-600" },
      { variant: "underline", color: "indigo", className: "border-indigo-600/40 focus-visible:border-indigo-600" },
      { variant: "underline", color: "sky", className: "border-sky-500/40 focus-visible:border-sky-500" },
      { variant: "underline", color: "slate", className: "border-slate-600/40 focus-visible:border-slate-600" },
      { variant: "underline", color: "orange", className: "border-orange-500/40 focus-visible:border-orange-500" },
    ],
    defaultVariants: {
      variant: "outline",
      color: "default",
      size: "md",
      shape: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "color" | "size">,
    VariantProps<typeof inputVariants> {
  /** Optional element rendered inside the field, before the input text. */
  leftIcon?: React.ReactNode;
  /** Optional element rendered inside the field, after the input text. */
  rightIcon?: React.ReactNode;
  /** Error state — overrides color with the destructive treatment. */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, color, size, shape, leftIcon, rightIcon, error, ...props }, ref) => {
    const field = (
      <input
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          inputVariants({ variant, color: error ? "rose" : color, size, shape }),
          leftIcon && "pl-9",
          rightIcon && "pr-9",
          error && "border-rose-500 focus-visible:ring-rose-500/40",
          className
        )}
        {...props}
      />
    );

    if (!leftIcon && !rightIcon) return field;

    return (
      <div className="relative w-full">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4 pointer-events-none">
            {leftIcon}
          </span>
        )}
        {field}
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
