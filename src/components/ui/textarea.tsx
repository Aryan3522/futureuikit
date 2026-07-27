/**
 * @registry-slug textarea
 * @registry-name Textarea
 * @registry-description A premium textarea with variants, colors, and optional auto-resize.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type TextareaColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const textareaVariants = cva(
  "flex w-full bg-transparent text-foreground transition-all duration-300 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-20",
  {
    variants: {
      variant: {
        solid: "border border-transparent bg-muted/60 focus-visible:bg-transparent focus-visible:ring-2",
        outline: "border focus-visible:ring-2",
        ghost: "border border-transparent hover:bg-muted/40 focus-visible:bg-transparent focus-visible:ring-2",
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
        sm: "px-3 py-2 text-xs",
        md: "px-3.5 py-2.5 text-sm",
        lg: "px-4 py-3 text-base",
      },
      shape: {
        default: "rounded-lg",
        square: "rounded-none",
        rounded: "rounded-2xl",
        sharp: "rounded-[2px]",
      },
    },
    compoundVariants: [
      { color: "default", className: "border-border focus-visible:ring-ring/40" },
      { color: "blue", className: "border-blue-600/40 focus-visible:ring-blue-600/40 focus-visible:border-blue-600" },
      { color: "emerald", className: "border-emerald-500/40 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500" },
      { color: "rose", className: "border-rose-500/40 focus-visible:ring-rose-500/40 focus-visible:border-rose-500" },
      { color: "amber", className: "border-amber-500/40 focus-visible:ring-amber-500/40 focus-visible:border-amber-500" },
      { color: "violet", className: "border-violet-600/40 focus-visible:ring-violet-600/40 focus-visible:border-violet-600" },
      { color: "indigo", className: "border-indigo-600/40 focus-visible:ring-indigo-600/40 focus-visible:border-indigo-600" },
      { color: "sky", className: "border-sky-500/40 focus-visible:ring-sky-500/40 focus-visible:border-sky-500" },
      { color: "slate", className: "border-slate-600/40 focus-visible:ring-slate-600/40 focus-visible:border-slate-600" },
      { color: "orange", className: "border-orange-500/40 focus-visible:ring-orange-500/40 focus-visible:border-orange-500" },
    ],
    defaultVariants: {
      variant: "outline",
      color: "default",
      size: "md",
      shape: "default",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "color">,
    VariantProps<typeof textareaVariants> {
  /** Grow with content instead of showing a scrollbar. */
  autoResize?: boolean;
  /** Error state — overrides color with the destructive treatment. */
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, color, size, shape, autoResize, error, onInput, ...props }, ref) => {
    const handleInput: React.FormEventHandler<HTMLTextAreaElement> = (event) => {
      if (autoResize) {
        const el = event.currentTarget;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
      onInput?.(event as Parameters<NonNullable<typeof onInput>>[0]);
    };

    return (
      <textarea
        ref={ref}
        aria-invalid={error || undefined}
        onInput={handleInput}
        className={cn(
          textareaVariants({ variant, color: error ? "rose" : color, size, shape }),
          autoResize && "resize-none overflow-hidden",
          error && "border-rose-500 focus-visible:ring-rose-500/40",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
