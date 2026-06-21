"use client";

/**
 * @registry-slug toggle
 * @registry-name Toggle
 * @registry-description A Future UI Toggle component (Switch).
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

export const toggleVariants = cva(
  "peer relative inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=unchecked]:bg-muted data-[state=off]:bg-muted",
        soft: "data-[state=unchecked]:bg-muted data-[state=off]:bg-muted",
        elevated: "data-[state=unchecked]:bg-muted data-[state=off]:bg-muted shadow-md border border-border/10",
        glass: "data-[state=unchecked]:bg-muted/20 data-[state=off]:bg-muted/20 backdrop-blur-md border border-border/10",
        modern: "data-[state=unchecked]:bg-muted data-[state=off]:bg-muted border border-border",
        enterprise: "data-[state=unchecked]:bg-muted data-[state=off]:bg-muted",
        neon: "data-[state=unchecked]:bg-muted data-[state=off]:bg-muted border border-border",
        scenic: "border border-border/10 overflow-hidden shadow-inner",
      },
      color: {
        default: "data-[state=checked]:bg-foreground data-[state=on]:bg-foreground data-[state=checked]:shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:data-[state=checked]:shadow-[0_0_15px_rgba(255,255,255,0.3)] data-[state=on]:shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:data-[state=on]:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
        blue: "data-[state=checked]:bg-blue-600 data-[state=on]:bg-blue-600 data-[state=checked]:shadow-[0_0_15px_rgba(37,99,235,0.4)] data-[state=on]:shadow-[0_0_15px_rgba(37,99,235,0.4)]",
        emerald: "data-[state=checked]:bg-emerald-500 data-[state=on]:bg-emerald-500 data-[state=checked]:shadow-[0_0_15px_rgba(16,185,129,0.4)] data-[state=on]:shadow-[0_0_15px_rgba(16,185,129,0.4)]",
        rose: "data-[state=checked]:bg-rose-500 data-[state=on]:bg-rose-500 data-[state=checked]:shadow-[0_0_15px_rgba(244,63,94,0.4)] data-[state=on]:shadow-[0_0_15px_rgba(244,63,94,0.4)]",
        amber: "data-[state=checked]:bg-amber-500 data-[state=on]:bg-amber-500 data-[state=checked]:shadow-[0_0_15px_rgba(245,158,11,0.4)] data-[state=on]:shadow-[0_0_15px_rgba(245,158,11,0.4)]",
        violet: "data-[state=checked]:bg-violet-600 data-[state=on]:bg-violet-600 data-[state=checked]:shadow-[0_0_15px_rgba(124,58,237,0.4)] data-[state=on]:shadow-[0_0_15px_rgba(124,58,237,0.4)]",
        indigo: "data-[state=checked]:bg-indigo-600 data-[state=on]:bg-indigo-600 data-[state=checked]:shadow-[0_0_15px_rgba(79,70,229,0.4)] data-[state=on]:shadow-[0_0_15px_rgba(79,70,229,0.4)]",
        sky: "data-[state=checked]:bg-sky-500 data-[state=on]:bg-sky-500 data-[state=checked]:shadow-[0_0_15px_rgba(14,165,233,0.4)] data-[state=on]:shadow-[0_0_15px_rgba(14,165,233,0.4)]",
        slate: "data-[state=checked]:bg-slate-600 data-[state=on]:bg-slate-600 data-[state=checked]:shadow-[0_0_15px_rgba(71,85,105,0.4)] data-[state=on]:shadow-[0_0_15px_rgba(71,85,105,0.4)]",
        orange: "data-[state=checked]:bg-orange-500 data-[state=on]:bg-orange-500 data-[state=checked]:shadow-[0_0_15px_rgba(249,115,22,0.4)] data-[state=on]:shadow-[0_0_15px_rgba(249,115,22,0.4)]",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
        squircle: "rounded-[10px]",
        square: "rounded-none",
        sharp: "rounded-[2px]",
        default: "rounded-full",
      },
      spacing: {
        default: "h-6 w-11 p-[2px]",
        "2x": "h-5 w-9 p-[2px]",
        "4x": "h-6 w-11 p-[2px]",
        "6x": "h-7 w-12 p-[2px]",
        "8x": "h-8 w-14 p-[3px]",
      }
    },
    defaultVariants: {
      variant: "default",
      color: "default",
      shape: "default",
      spacing: "default",
    }
  }
);

const thumbVariants = cva(
  "pointer-events-none flex items-center justify-center shadow-sm ring-0 transition-all overflow-hidden relative bg-background",
  {
    variants: {
      variant: {
        default: "",
        soft: "",
        elevated: "shadow-md",
        glass: "shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
        modern: "",
        enterprise: "",
        neon: "shadow-[0_0_10px_rgba(255,255,255,0.5)]",
        scenic: "bg-background/90 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
      },
      shape: {
        rounded: "rounded-[4px]",
        pill: "rounded-full",
        squircle: "rounded-[8px]",
        square: "rounded-none",
        sharp: "rounded-[2px]",
        default: "rounded-full",
      },
      spacing: {
        default: "h-5 w-5",
        "2x": "h-4 w-4",
        "4x": "h-5 w-5",
        "6x": "h-6 w-6",
        "8x": "h-[26px] w-[26px]",
      }
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
      spacing: "default",
    }
  }
);

export interface ToggleProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange" | "color">,
    VariantProps<typeof toggleVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  helperText?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  checkedImage?: string;
  uncheckedImage?: string;
  loading?: boolean;
  readOnly?: boolean;
}

export const Toggle = React.memo(React.forwardRef<HTMLButtonElement, ToggleProps>(
          ({ 
            className, 
            variant = "default", 
            color = "default",
            spacing = "default", 
            shape = "default", 
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
            checkedImage,
            uncheckedImage,
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
                className={cn(toggleVariants({ variant, color, spacing, shape }), className)}
                style={{
                  justifyContent: isChecked ? "flex-end" : "flex-start",
                }}
                {...props}
              >
                {variant === "scenic" && (
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <AnimatePresence initial={false}>
                      {!isChecked ? (
                        <motion.div
                          key="unchecked-bg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-red-500 bg-cover bg-center"
                          style={{ backgroundImage: uncheckedImage ? `url(${uncheckedImage})` : undefined }}
                        />
                      ) : (
                        <motion.div
                          key="checked-bg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-emerald-500 bg-cover bg-center"
                          style={{ backgroundImage: checkedImage ? `url(${checkedImage})` : undefined }}
                        />
                      )}
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                  </div>
                )}
                <motion.span
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 40,
                    mass: 1,
                  }}
                  data-state={isChecked ? "checked" : "unchecked"}
                  className={cn(thumbVariants({ variant, spacing, shape }), "z-10")}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center text-muted-foreground"
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
                          isChecked ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        <div className="h-3/4 w-3/4 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
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
                <div className="flex h-5 items-center mt-0.5">
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
