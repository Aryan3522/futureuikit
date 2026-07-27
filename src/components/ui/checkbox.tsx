/**
 * @registry-slug checkbox
 * @registry-name Checkbox
 * @registry-description An animated checkbox with a spring check mark, colors, shapes, and label support.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type CheckboxColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const checkboxVariants = cva(
  "peer inline-flex shrink-0 items-center justify-center border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
  {
    variants: {
      color: {
        default: "border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground data-[state=checked]:text-background focus-visible:ring-ring/40",
        blue: "border-blue-600/50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white focus-visible:ring-blue-600",
        emerald: "border-emerald-500/50 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 data-[state=checked]:text-white focus-visible:ring-emerald-500",
        rose: "border-rose-500/50 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500 data-[state=checked]:text-white focus-visible:ring-rose-500",
        amber: "border-amber-500/50 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:text-white focus-visible:ring-amber-500",
        violet: "border-violet-600/50 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600 data-[state=checked]:text-white focus-visible:ring-violet-600",
        indigo: "border-indigo-600/50 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 data-[state=checked]:text-white focus-visible:ring-indigo-600",
        sky: "border-sky-500/50 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500 data-[state=checked]:text-white focus-visible:ring-sky-500",
        slate: "border-slate-600/50 data-[state=checked]:bg-slate-600 data-[state=checked]:border-slate-600 data-[state=checked]:text-white focus-visible:ring-slate-600",
        orange: "border-orange-500/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 data-[state=checked]:text-white focus-visible:ring-orange-500",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      shape: {
        default: "rounded-md",
        square: "rounded-none",
        rounded: "rounded-full",
        sharp: "rounded-[2px]",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
      shape: "default",
    },
  }
);

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onChange">,
    VariantProps<typeof checkboxVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Optional label rendered next to the box; clicking it toggles the checkbox. */
  label?: React.ReactNode;
}

const checkSizes = { sm: 10, md: 12, lg: 14 } as const;

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, color, size, shape, checked, defaultChecked, onCheckedChange, label, disabled, id, ...props }, ref) => {
    const [internal, setInternal] = React.useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internal;
    const autoId = React.useId();
    const boxId = id ?? autoId;

    const toggle = () => {
      if (disabled) return;
      if (!isControlled) setInternal(!isChecked);
      onCheckedChange?.(!isChecked);
    };

    const box = (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        id={boxId}
        aria-checked={isChecked}
        data-state={isChecked ? "checked" : "unchecked"}
        disabled={disabled}
        onClick={toggle}
        className={cn(checkboxVariants({ color, size, shape }), className)}
        {...props}
      >
        <svg
          viewBox="0 0 12 10"
          fill="none"
          width={checkSizes[size ?? "md"]}
          height={checkSizes[size ?? "md"]}
          aria-hidden="true"
        >
          <motion.path
            d="M1 5.3 4.2 8.5 11 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: isChecked ? 1 : 0, opacity: isChecked ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </svg>
      </button>
    );

    if (!label) return box;

    return (
      <div className="flex items-center gap-2.5">
        {box}
        <label
          htmlFor={boxId}
          className={cn(
            "text-sm font-medium text-foreground leading-none cursor-pointer select-none",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
