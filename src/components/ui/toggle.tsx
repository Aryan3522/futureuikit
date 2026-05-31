"use client";

/**
 * @registry-slug toggle
 * @registry-name Toggle
 * @registry-dependency framer-motion
 * @registry-dependency class-variance-authority
 * @registry-dependency lucide-react
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "peer relative inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        soft: "data-[state=checked]:bg-primary/20 data-[state=unchecked]:bg-secondary",
        elevated: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input shadow-md border border-border/10",
        glass: "data-[state=checked]:bg-primary/40 data-[state=unchecked]:bg-foreground/5 backdrop-blur-md border border-foreground/10",
        modern: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted border border-border",
        enterprise: "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300 dark:data-[state=unchecked]:bg-slate-700",
        neon: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary data-[state=checked]:shadow-[0_0_15px_rgba(var(--primary),0.5)] border border-primary/20",
        scenic: "border border-border/10 overflow-hidden shadow-inner",
      },
      size: {
        sm: "h-5 w-9 p-[2px]",
        md: "h-6 w-11 p-[2px]",
        lg: "h-7 w-12 p-[2px]",
        xl: "h-8 w-14 p-[3px]",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
        squircle: "rounded-[10px]",
        square: "rounded-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "pill",
    }
  }
);

const thumbVariants = cva(
  "pointer-events-none flex items-center justify-center shadow-sm ring-0 transition-all overflow-hidden relative",
  {
    variants: {
      variant: {
        default: "bg-background",
        soft: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground",
        elevated: "bg-background shadow-md",
        glass: "bg-background shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
        modern: "bg-background",
        enterprise: "bg-white",
        neon: "bg-background shadow-[0_0_10px_rgba(255,255,255,0.5)]",
        scenic: "bg-white/90 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-[26px] w-[26px]",
      },
      shape: {
        rounded: "rounded-[4px]",
        pill: "rounded-full",
        squircle: "rounded-[8px]",
        square: "rounded-[2px]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "pill",
    }
  }
);

export interface ToggleProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange">,
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
            size = "md", 
            shape = "pill", 
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
                className={cn(toggleVariants({ variant, size, shape }), className)}
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
                  className={cn(thumbVariants({ variant, size, shape }), "z-10")}
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
                          isChecked ? "text-primary" : "text-muted-foreground"
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
                        "text-sm font-medium leading-none cursor-pointer select-none",
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
                    <p className="text-xs text-muted-foreground/80 mt-1">
                      {helperText}
                    </p>
                  )}
                </div>
              </div>
            );
          }
        ));
Toggle.displayName = "Toggle";
