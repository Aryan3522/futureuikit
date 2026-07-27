/**
 * @registry-slug switch
 * @registry-name Switch
 * @registry-description A spring-animated toggle switch with colors, sizes, shapes, and label support.
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

export type SwitchColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const switchVariants = cva(
  "relative inline-flex shrink-0 items-center border border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer bg-muted",
  {
    variants: {
      color: {
        default: "data-[state=checked]:bg-foreground focus-visible:ring-ring/40",
        blue: "data-[state=checked]:bg-blue-600 focus-visible:ring-blue-600",
        emerald: "data-[state=checked]:bg-emerald-500 focus-visible:ring-emerald-500",
        rose: "data-[state=checked]:bg-rose-500 focus-visible:ring-rose-500",
        amber: "data-[state=checked]:bg-amber-500 focus-visible:ring-amber-500",
        violet: "data-[state=checked]:bg-violet-600 focus-visible:ring-violet-600",
        indigo: "data-[state=checked]:bg-indigo-600 focus-visible:ring-indigo-600",
        sky: "data-[state=checked]:bg-sky-500 focus-visible:ring-sky-500",
        slate: "data-[state=checked]:bg-slate-600 focus-visible:ring-slate-600",
        orange: "data-[state=checked]:bg-orange-500 focus-visible:ring-orange-500",
      },
      size: {
        sm: "h-5 w-9 px-0.5",
        md: "h-6 w-11 px-0.5",
        lg: "h-7 w-[52px] px-1",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-full",
        sharp: "rounded-[3px]",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
      shape: "default",
    },
  }
);

const thumbSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-5 w-5",
} as const;

const thumbShapes = {
  default: "rounded-full",
  square: "rounded-none",
  rounded: "rounded-full",
  sharp: "rounded-[2px]",
} as const;

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onChange">,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Optional label rendered next to the switch; clicking it toggles. */
  label?: React.ReactNode;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, color, size, shape, checked, defaultChecked, onCheckedChange, label, disabled, id, ...props }, ref) => {
    const [internal, setInternal] = React.useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internal;
    const autoId = React.useId();
    const switchId = id ?? autoId;

    const toggle = () => {
      if (disabled) return;
      if (!isControlled) setInternal(!isChecked);
      onCheckedChange?.(!isChecked);
    };

    const control = (
      <button
        ref={ref}
        type="button"
        role="switch"
        id={switchId}
        aria-checked={isChecked}
        data-state={isChecked ? "checked" : "unchecked"}
        disabled={disabled}
        onClick={toggle}
        className={cn(switchVariants({ color, size, shape }), isChecked && "justify-end", className)}
        {...props}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className={cn(
            "block bg-background shadow-sm shadow-black/20",
            thumbSizes[size ?? "md"],
            thumbShapes[shape ?? "default"]
          )}
        />
      </button>
    );

    if (!label) return control;

    return (
      <div className="flex items-center gap-2.5">
        {control}
        <label
          htmlFor={switchId}
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
Switch.displayName = "Switch";

export { Switch, switchVariants };
