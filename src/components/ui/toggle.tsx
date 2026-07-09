"use client";

/**
 * @registry-slug toggle
 * @registry-name Toggle
 * @registry-description A Future UI Premium Toggle component (Switch) with CVA architecture.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency class-variance-authority
 * @registry-dependency lucide-react
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToggleVariant = "solid" | "outline" | "ghost" | "glass" | "elevated" | "soft";
export type ToggleColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ToggleShape = "default" | "square" | "rounded" | "sharp";
export type ToggleSize = "default" | "sm" | "md" | "lg" | "xl";
export type ToggleSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export const toggleVariants = cva(
  "peer relative inline-flex shrink-0 cursor-pointer items-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]",
        outline: "bg-transparent border-2 data-[state=unchecked]:border-muted-foreground/30",
        ghost: "bg-transparent border-transparent shadow-none data-[state=unchecked]:bg-transparent",
        glass: "backdrop-blur-xl border data-[state=unchecked]:bg-black/5 data-[state=unchecked]:border-black/10 dark:data-[state=unchecked]:bg-white/5 dark:data-[state=unchecked]:border-white/10",
        elevated: "bg-background border-border shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] data-[state=unchecked]:bg-muted/50",
        soft: "border-transparent data-[state=unchecked]:bg-muted",
      },
      color: {
        default: "", blue: "", emerald: "", rose: "", amber: "", violet: "", indigo: "", sky: "", slate: "", orange: "",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-md",
        sharp: "rounded-[2px]",
      },
      spacing: {
        default: "p-[2px]",
        "2x": "p-[1px]",
        "4x": "p-[2px]",
        "6x": "p-[3px]",
        "8x": "p-[4px]",
      },
      size: {
        default: "h-6 w-11",
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-12",
        xl: "h-8 w-14",
      }
    },
    compoundVariants: [
      // SOLID
      { variant: "solid", className: "data-[state=unchecked]:bg-muted" },
      { variant: "solid", color: "default", className: "data-[state=checked]:bg-foreground data-[state=checked]:shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:data-[state=checked]:shadow-[0_0_15px_rgba(255,255,255,0.3)]" },
      { variant: "solid", color: "blue", className: "data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500 data-[state=checked]:shadow-[0_0_15px_rgba(37,99,235,0.4)]" },
      { variant: "solid", color: "emerald", className: "data-[state=checked]:bg-emerald-600 dark:data-[state=checked]:bg-emerald-500 data-[state=checked]:shadow-[0_0_15px_rgba(16,185,129,0.4)]" },
      { variant: "solid", color: "rose", className: "data-[state=checked]:bg-rose-600 dark:data-[state=checked]:bg-rose-500 data-[state=checked]:shadow-[0_0_15px_rgba(244,63,94,0.4)]" },
      { variant: "solid", color: "amber", className: "data-[state=checked]:bg-amber-500 dark:data-[state=checked]:bg-amber-400 data-[state=checked]:shadow-[0_0_15px_rgba(245,158,11,0.4)]" },
      { variant: "solid", color: "violet", className: "data-[state=checked]:bg-violet-600 dark:data-[state=checked]:bg-violet-500 data-[state=checked]:shadow-[0_0_15px_rgba(124,58,237,0.4)]" },
      { variant: "solid", color: "indigo", className: "data-[state=checked]:bg-indigo-600 dark:data-[state=checked]:bg-indigo-500 data-[state=checked]:shadow-[0_0_15px_rgba(79,70,229,0.4)]" },
      { variant: "solid", color: "sky", className: "data-[state=checked]:bg-sky-500 dark:data-[state=checked]:bg-sky-400 data-[state=checked]:shadow-[0_0_15px_rgba(14,165,233,0.4)]" },
      { variant: "solid", color: "slate", className: "data-[state=checked]:bg-slate-600 dark:data-[state=checked]:bg-slate-500 data-[state=checked]:shadow-[0_0_15px_rgba(71,85,105,0.4)]" },
      { variant: "solid", color: "orange", className: "data-[state=checked]:bg-orange-500 dark:data-[state=checked]:bg-orange-400 data-[state=checked]:shadow-[0_0_15px_rgba(249,115,22,0.4)]" },

      // OUTLINE
      { variant: "outline", color: "default", className: "data-[state=checked]:border-foreground" },
      { variant: "outline", color: "blue", className: "data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-500" },
      { variant: "outline", color: "emerald", className: "data-[state=checked]:border-emerald-600 dark:data-[state=checked]:border-emerald-500" },
      { variant: "outline", color: "rose", className: "data-[state=checked]:border-rose-600 dark:data-[state=checked]:border-rose-500" },
      { variant: "outline", color: "amber", className: "data-[state=checked]:border-amber-500 dark:data-[state=checked]:border-amber-400" },
      { variant: "outline", color: "violet", className: "data-[state=checked]:border-violet-600 dark:data-[state=checked]:border-violet-500" },
      { variant: "outline", color: "indigo", className: "data-[state=checked]:border-indigo-600 dark:data-[state=checked]:border-indigo-500" },
      { variant: "outline", color: "sky", className: "data-[state=checked]:border-sky-500 dark:data-[state=checked]:border-sky-400" },
      { variant: "outline", color: "slate", className: "data-[state=checked]:border-slate-600 dark:data-[state=checked]:border-slate-500" },
      { variant: "outline", color: "orange", className: "data-[state=checked]:border-orange-500 dark:data-[state=checked]:border-orange-400" },

      // GHOST
      { variant: "ghost", className: "data-[state=unchecked]:bg-muted/30" },
      { variant: "ghost", color: "default", className: "data-[state=checked]:bg-foreground/10" },
      { variant: "ghost", color: "blue", className: "data-[state=checked]:bg-blue-500/10" },
      { variant: "ghost", color: "emerald", className: "data-[state=checked]:bg-emerald-500/10" },
      { variant: "ghost", color: "rose", className: "data-[state=checked]:bg-rose-500/10" },
      { variant: "ghost", color: "amber", className: "data-[state=checked]:bg-amber-500/10" },
      { variant: "ghost", color: "violet", className: "data-[state=checked]:bg-violet-500/10" },
      { variant: "ghost", color: "indigo", className: "data-[state=checked]:bg-indigo-500/10" },
      { variant: "ghost", color: "sky", className: "data-[state=checked]:bg-sky-500/10" },
      { variant: "ghost", color: "slate", className: "data-[state=checked]:bg-slate-500/10" },
      { variant: "ghost", color: "orange", className: "data-[state=checked]:bg-orange-500/10" },

      // GLASS
      { variant: "glass", color: "default", className: "data-[state=checked]:bg-foreground/20 dark:data-[state=checked]:bg-foreground/30 data-[state=checked]:border-foreground/30 dark:data-[state=checked]:border-foreground/30" },
      { variant: "glass", color: "blue", className: "data-[state=checked]:bg-blue-500/20 data-[state=checked]:border-blue-500/30 dark:data-[state=checked]:bg-blue-500/30 dark:data-[state=checked]:border-blue-500/40" },
      { variant: "glass", color: "emerald", className: "data-[state=checked]:bg-emerald-500/20 data-[state=checked]:border-emerald-500/30 dark:data-[state=checked]:bg-emerald-500/30 dark:data-[state=checked]:border-emerald-500/40" },
      { variant: "glass", color: "rose", className: "data-[state=checked]:bg-rose-500/20 data-[state=checked]:border-rose-500/30 dark:data-[state=checked]:bg-rose-500/30 dark:data-[state=checked]:border-rose-500/40" },
      { variant: "glass", color: "amber", className: "data-[state=checked]:bg-amber-500/20 data-[state=checked]:border-amber-500/30 dark:data-[state=checked]:bg-amber-500/30 dark:data-[state=checked]:border-amber-500/40" },
      { variant: "glass", color: "violet", className: "data-[state=checked]:bg-violet-500/20 data-[state=checked]:border-violet-500/30 dark:data-[state=checked]:bg-violet-500/30 dark:data-[state=checked]:border-violet-500/40" },
      { variant: "glass", color: "indigo", className: "data-[state=checked]:bg-indigo-500/20 data-[state=checked]:border-indigo-500/30 dark:data-[state=checked]:bg-indigo-500/30 dark:data-[state=checked]:border-indigo-500/40" },
      { variant: "glass", color: "sky", className: "data-[state=checked]:bg-sky-500/20 data-[state=checked]:border-sky-500/30 dark:data-[state=checked]:bg-sky-500/30 dark:data-[state=checked]:border-sky-500/40" },
      { variant: "glass", color: "slate", className: "data-[state=checked]:bg-slate-500/20 data-[state=checked]:border-slate-500/30 dark:data-[state=checked]:bg-slate-500/30 dark:data-[state=checked]:border-slate-500/40" },
      { variant: "glass", color: "orange", className: "data-[state=checked]:bg-orange-500/20 data-[state=checked]:border-orange-500/30 dark:data-[state=checked]:bg-orange-500/30 dark:data-[state=checked]:border-orange-500/40" },

      // ELEVATED
      { variant: "elevated", color: "default", className: "data-[state=checked]:bg-foreground/5 dark:data-[state=checked]:bg-foreground/10" },
      { variant: "elevated", color: "blue", className: "data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-900/30" },
      { variant: "elevated", color: "emerald", className: "data-[state=checked]:bg-emerald-50 dark:data-[state=checked]:bg-emerald-900/30" },
      { variant: "elevated", color: "rose", className: "data-[state=checked]:bg-rose-50 dark:data-[state=checked]:bg-rose-900/30" },
      { variant: "elevated", color: "amber", className: "data-[state=checked]:bg-amber-50 dark:data-[state=checked]:bg-amber-900/30" },
      { variant: "elevated", color: "violet", className: "data-[state=checked]:bg-violet-50 dark:data-[state=checked]:bg-violet-900/30" },
      { variant: "elevated", color: "indigo", className: "data-[state=checked]:bg-indigo-50 dark:data-[state=checked]:bg-indigo-900/30" },
      { variant: "elevated", color: "sky", className: "data-[state=checked]:bg-sky-50 dark:data-[state=checked]:bg-sky-900/30" },
      { variant: "elevated", color: "slate", className: "data-[state=checked]:bg-slate-50 dark:data-[state=checked]:bg-slate-900/30" },
      { variant: "elevated", color: "orange", className: "data-[state=checked]:bg-orange-50 dark:data-[state=checked]:bg-orange-900/30" },

      // SOFT
      { variant: "soft", color: "default", className: "data-[state=checked]:bg-muted-foreground/20" },
      { variant: "soft", color: "blue", className: "data-[state=checked]:bg-blue-100 dark:data-[state=checked]:bg-blue-900/50" },
      { variant: "soft", color: "emerald", className: "data-[state=checked]:bg-emerald-100 dark:data-[state=checked]:bg-emerald-900/50" },
      { variant: "soft", color: "rose", className: "data-[state=checked]:bg-rose-100 dark:data-[state=checked]:bg-rose-900/50" },
      { variant: "soft", color: "amber", className: "data-[state=checked]:bg-amber-100 dark:data-[state=checked]:bg-amber-900/50" },
      { variant: "soft", color: "violet", className: "data-[state=checked]:bg-violet-100 dark:data-[state=checked]:bg-violet-900/50" },
      { variant: "soft", color: "indigo", className: "data-[state=checked]:bg-indigo-100 dark:data-[state=checked]:bg-indigo-900/50" },
      { variant: "soft", color: "sky", className: "data-[state=checked]:bg-sky-100 dark:data-[state=checked]:bg-sky-900/50" },
      { variant: "soft", color: "slate", className: "data-[state=checked]:bg-slate-100 dark:data-[state=checked]:bg-slate-900/50" },
      { variant: "soft", color: "orange", className: "data-[state=checked]:bg-orange-100 dark:data-[state=checked]:bg-orange-900/50" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      shape: "default",
      spacing: "default",
      size: "default"
    }
  }
);

const thumbVariants = cva(
  "pointer-events-none flex items-center justify-center shadow-sm ring-0 transition-all overflow-hidden relative",
  {
    variants: {
      variant: {
        solid: "bg-background shadow-[0_2px_5px_rgba(0,0,0,0.2)]",
        outline: "data-[state=unchecked]:bg-muted-foreground/50 data-[state=checked]:bg-foreground shadow-sm",
        ghost: "data-[state=unchecked]:bg-muted-foreground/50 data-[state=checked]:bg-foreground",
        glass: "bg-white dark:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-black/5 dark:border-white/10",
        elevated: "bg-foreground shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
        soft: "bg-background shadow-sm border border-black/5 dark:border-white/5",
      },
      color: {
        default: "", blue: "", emerald: "", rose: "", amber: "", violet: "", indigo: "", sky: "", slate: "", orange: "",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-sm",
        sharp: "rounded-[2px]",
      },
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-7 w-7",
      }
    },
    compoundVariants: [
      // Color compound for OUTLINE, GHOST, ELEVATED thumbs
      { variant: ["outline", "ghost", "elevated"], color: "default", className: "data-[state=checked]:bg-foreground" },
      { variant: ["outline", "ghost", "elevated"], color: "blue", className: "data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500" },
      { variant: ["outline", "ghost", "elevated"], color: "emerald", className: "data-[state=checked]:bg-emerald-600 dark:data-[state=checked]:bg-emerald-500" },
      { variant: ["outline", "ghost", "elevated"], color: "rose", className: "data-[state=checked]:bg-rose-600 dark:data-[state=checked]:bg-rose-500" },
      { variant: ["outline", "ghost", "elevated"], color: "amber", className: "data-[state=checked]:bg-amber-500 dark:data-[state=checked]:bg-amber-400" },
      { variant: ["outline", "ghost", "elevated"], color: "violet", className: "data-[state=checked]:bg-violet-600 dark:data-[state=checked]:bg-violet-500" },
      { variant: ["outline", "ghost", "elevated"], color: "indigo", className: "data-[state=checked]:bg-indigo-600 dark:data-[state=checked]:bg-indigo-500" },
      { variant: ["outline", "ghost", "elevated"], color: "sky", className: "data-[state=checked]:bg-sky-500 dark:data-[state=checked]:bg-sky-400" },
      { variant: ["outline", "ghost", "elevated"], color: "slate", className: "data-[state=checked]:bg-slate-600 dark:data-[state=checked]:bg-slate-500" },
      { variant: ["outline", "ghost", "elevated"], color: "orange", className: "data-[state=checked]:bg-orange-500 dark:data-[state=checked]:bg-orange-400" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      shape: "default",
      size: "default"
    }
  }
);

export interface ToggleProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange" | "color"> {
  variant?: ToggleVariant;
  color?: ToggleColor;
  shape?: ToggleShape;
  size?: ToggleSize;
  spacing?: ToggleSpacing;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  helperText?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  loading?: boolean;
  readOnly?: boolean;
}

export const Toggle = React.memo(React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ 
    className, 
    variant = "solid", 
    color = "default",
    shape = "default", 
    size = "default",
    spacing = "default",
    checked, 
    defaultChecked = false, 
    onCheckedChange, 
    disabled, 
    loading, 
    readOnly, 
    label, 
    description, 
    helperText, 
    checkedIcon, 
    uncheckedIcon, 
    onClick,
    id,
    ...props 
  }, ref) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : uncontrolledChecked;
    
    const uniqueId = React.useId();
    const toggleId = id || `toggle-${uniqueId}`;

    const handleToggle = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || readOnly || loading) return;
        
        const newState = !isChecked;
        if (!isControlled) {
          setUncontrolledChecked(newState);
        }
        onCheckedChange?.(newState);
        onClick?.(e);
      },
      [disabled, readOnly, loading, isChecked, isControlled, onCheckedChange, onClick]
    );

    const activeIcon = isChecked ? checkedIcon : uncheckedIcon;

    const buttonElement = (
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-readonly={readOnly}
        disabled={disabled || loading}
        data-state={isChecked ? "checked" : "unchecked"}
        ref={ref}
        id={toggleId}
        onClick={handleToggle}
        className={cn(toggleVariants({ variant, color, shape, size, spacing }), className)}
        style={{
          justifyContent: isChecked ? "flex-end" : "flex-start",
        }}
        {...props}
      >
        <motion.span
          layout
          whileTap={!disabled && !readOnly && !loading ? { scale: 0.85 } : {}}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 40,
            mass: 1,
          }}
          data-state={isChecked ? "checked" : "unchecked"}
          className={cn(thumbVariants({ variant, color, shape, size }), "z-10")}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-muted-foreground mix-blend-difference"
              >
                <Loader2 className="h-3/4 w-3/4 animate-spin" />
              </motion.div>
            ) : activeIcon ? (
              <motion.div
                key={isChecked ? "checked-icon" : "unchecked-icon"}
                initial={{ opacity: 0, scale: 0.5, rotate: isChecked ? -45 : 45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: isChecked ? 45 : -45 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  isChecked ? "text-background dark:text-foreground" : "text-background dark:text-foreground"
                )}
              >
                <div className="h-3/4 w-3/4 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full mix-blend-difference">
                  {activeIcon}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.span>
      </button>
    );

    if (!label && !description && !helperText) {
      return buttonElement;
    }

    return (
      <div className="flex items-start gap-3">
        <div className="flex h-6 items-center">
          {buttonElement}
        </div>
        <div className="flex flex-col gap-1">
          {label && (
            <label
              htmlFor={toggleId}
              className={cn(
                "text-sm font-medium leading-none cursor-pointer select-none text-foreground",
                disabled || loading ? "opacity-50 cursor-not-allowed" : ""
              )}
              onClick={() => {
                if (!disabled && !readOnly && !loading) {
                  document.getElementById(toggleId)?.click();
                }
              }}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground leading-snug">
              {description}
            </p>
          )}
          {helperText && (
            <p className="text-xs text-muted-foreground mt-1">
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
));
Toggle.displayName = "Toggle";
