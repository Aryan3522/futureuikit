/**
 * @registry-slug search
 * @registry-name Search
 * @registry-description A Future UI Search component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const searchVariants = cva(
  "relative flex items-center transition-colors",
  {
    variants: {
      variant: {
        standard: "bg-background border border-border",
        compact: "bg-muted border border-transparent focus-within:bg-background focus-within:border-border",
        floating: "bg-background/60 backdrop-blur-xl border border-border/40 shadow-lg hover:shadow-xl",
        command: "bg-muted/50 border-b border-border/50 focus-within:bg-background",
        icon: "bg-transparent hover:bg-muted",
      },
      color: {
        default: "focus-within:ring-foreground/20 focus-within:border-foreground",
        blue: "focus-within:ring-blue-600/20 focus-within:border-blue-600 dark:focus-within:ring-blue-500/20 dark:focus-within:border-blue-500",
        emerald: "focus-within:ring-emerald-500/20 focus-within:border-emerald-500",
        rose: "focus-within:ring-rose-500/20 focus-within:border-rose-500",
        amber: "focus-within:ring-amber-500/20 focus-within:border-amber-500",
        violet: "focus-within:ring-violet-600/20 focus-within:border-violet-600 dark:focus-within:ring-violet-500/20 dark:focus-within:border-violet-500",
        indigo: "focus-within:ring-indigo-600/20 focus-within:border-indigo-600 dark:focus-within:ring-indigo-500/20 dark:focus-within:border-indigo-500",
        sky: "focus-within:ring-sky-500/20 focus-within:border-sky-500",
        slate: "focus-within:ring-slate-600/20 focus-within:border-slate-600 dark:focus-within:ring-slate-500/20 dark:focus-within:border-slate-500",
        orange: "focus-within:ring-orange-500/20 focus-within:border-orange-500",
      },
      shape: {
        default: "rounded-xl",
        square: "rounded-none",
        rounded: "rounded-full",
        sharp: "rounded-[2px]",
      },
      spacing: {
        default: "h-10 text-sm",
        "2x": "h-8 text-xs",
        "4x": "h-10 text-sm",
        "6x": "h-12 text-base",
        "8x": "h-14 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto inline-flex",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      }
    },
    defaultVariants: {
      variant: "standard",
      color: "default",
      shape: "default",
      spacing: "default",
      fullWidth: true,
      disabled: false,
    },
  }
);

const inputVariants = cva(
  "w-full bg-transparent border-none outline-none placeholder:text-muted-foreground text-foreground",
  {
    variants: {
      spacing: {
        default: "pr-14",
        "2x": "pr-12",
        "4x": "pr-14",
        "6x": "pr-16",
        "8x": "pr-20",
      }
    },
    defaultVariants: {
      spacing: "default",
    }
  }
);

const iconWrapperVariants = cva(
  "flex items-center justify-center shrink-0 text-muted-foreground transition-colors",
  {
    variants: {
      spacing: {
        default: "w-10",
        "2x": "w-8",
        "4x": "w-10",
        "6x": "w-12",
        "8x": "w-14",
      }
    },
    defaultVariants: {
      spacing: "default",
    }
  }
);

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onSubmit" | "disabled" | "color">,
    VariantProps<typeof searchVariants> {
  onSearch?: (value: string) => void;
  animated?: boolean;
  clearable?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  inputVariant?: "standard" | "compact" | "floating" | "command";
  children?: React.ReactNode;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      variant,
      color,
      shape,
      spacing,
      fullWidth,
      disabled,
      loading,
      animated = true,
      clearable = true,
      icon,
      inputVariant = "standard",
      children,
      value,
      defaultValue,
      onChange,
      onSearch,
      onFocus,
      onBlur,
      autoFocus,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(variant !== "icon");
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const isControlled = value !== undefined;
    const currentValue = (isControlled ? value : internalValue) as string;

    useEffect(() => {
      if (variant !== "icon") {
        setIsExpanded(true);
      } else if (!isFocused && !currentValue) {
        setIsExpanded(false);
      }
    }, [variant, isFocused, currentValue]);

    const handleContainerClick = () => {
      if (variant === "icon" && !isExpanded) {
        setIsExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        inputRef.current?.focus();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue("");
      const event = {
        target: { value: "" }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
      onSearch?.("");
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(currentValue);
      } else if (e.key === "Escape") {
        if (currentValue && clearable) {
          handleClear(e as any);
        } else {
          inputRef.current?.blur();
        }
      }
      props.onKeyDown?.(e);
    };

    // Determine icon size based on component spacing
    const iconSize = spacing === "6x" || spacing === "8x" ? 20 : spacing === "2x" ? 14 : 16;
    const defaultIcon = <SearchIcon size={iconSize} />;

    const isOverlayVariant = variant === "icon" && (inputVariant === "floating" || inputVariant === "command");
    const isInlineVariant = variant === "icon" && (inputVariant === "standard" || inputVariant === "compact");

    // Dynamic variant mapping for inline expansion
    const effectiveVariant = (isInlineVariant && isExpanded) ? inputVariant : variant;

    // Resolve color focus text based on color palette
    const getFocusIconColor = () => {
      if (!isFocused) return "";
      switch (color) {
        case "blue": return "text-blue-600 dark:text-blue-500";
        case "emerald": return "text-emerald-600 dark:text-emerald-500";
        case "rose": return "text-rose-600 dark:text-rose-500";
        case "amber": return "text-amber-600 dark:text-amber-500";
        case "violet": return "text-violet-600 dark:text-violet-500";
        case "indigo": return "text-indigo-600 dark:text-indigo-500";
        case "sky": return "text-sky-600 dark:text-sky-500";
        case "slate": return "text-slate-600 dark:text-slate-500";
        case "orange": return "text-orange-600 dark:text-orange-500";
        default: return "text-foreground";
      }
    };

    if (isOverlayVariant) {
      return (
        <>
          <button 
            type="button"
            onClick={() => {
              setIsExpanded(true);
              setTimeout(() => inputRef.current?.focus(), 100);
            }}
            className={cn(
              "flex items-center justify-center bg-transparent hover:bg-muted transition-colors",
              shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-full" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
              spacing === "2x" ? "w-8 h-8" : spacing === "6x" || spacing === "8x" ? "w-12 h-12" : "w-10 h-10",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none",
              className
            )}
          >
            <div className={cn(iconWrapperVariants({ spacing }))}>
               {icon || defaultIcon}
            </div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <div className={cn("fixed inset-0 z-100 flex justify-center", inputVariant === "command" ? "items-start pt-[10vh]" : "items-start pt-[20vh]")}>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsExpanded(false)}
                  className={cn("absolute inset-0 bg-background/80 backdrop-blur-sm", inputVariant === "command" && "bg-background/95")}
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: inputVariant === "command" ? 1 : 0.95, y: inputVariant === "command" ? -20 : -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: inputVariant === "command" ? 1 : 0.95, y: inputVariant === "command" ? -20 : -20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={cn("relative w-full px-4 z-10", inputVariant === "command" ? "max-w-3xl" : "max-w-2xl")}
                >
                  <div className={cn(
                    searchVariants({ variant: inputVariant, spacing: "6x", color, shape, fullWidth: true }),
                    inputVariant === "floating" && "shadow-2xl",
                    inputVariant === "command" && "border rounded-xl shadow-2xl overflow-hidden focus-within:ring-0", // Command palette style has its own focus
                  )}>
                    <div className={cn(iconWrapperVariants({ spacing: "6x" }), "text-muted-foreground")}>
                       {loading ? <Loader2 className="animate-spin" size={20} /> : (icon || <SearchIcon size={20} />)}
                    </div>
                    
                    <input
                       ref={inputRef}
                       value={currentValue}
                       onChange={handleChange}
                       onKeyDown={(e) => {
                         if (e.key === "Enter") onSearch?.(currentValue);
                         if (e.key === "Escape") setIsExpanded(false);
                         props.onKeyDown?.(e);
                       }}
                       className={cn(
                         inputVariants({ spacing: "6x" }), 
                         inputVariant === "command" && "font-mono h-16",
                         "pr-12"
                       )}
                       placeholder={placeholder}
                       disabled={disabled === true}
                       autoFocus
                       {...(props as any)}
                    />
                    
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={16} />
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                  {children}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      );
    }

    return (
      <motion.div
        layout={animated}
        initial={false}
        animate={{
          width: fullWidth && effectiveVariant !== "icon" ? "100%" : isExpanded ? (spacing === "6x" || spacing === "8x" ? 400 : spacing === "2x" ? 240 : 320) : (spacing === "6x" || spacing === "8x" ? 48 : spacing === "2x" ? 32 : 40),
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn(
          searchVariants({ variant: effectiveVariant, spacing, color, shape, fullWidth: fullWidth && effectiveVariant !== "icon", disabled }),
          isFocused && "ring-1", // trigger the color ring
          !isExpanded && effectiveVariant === "icon" && "cursor-pointer justify-center overflow-hidden border-transparent",
          className
        )}
        onClick={handleContainerClick}
      >
        <div className={cn(iconWrapperVariants({ spacing }), getFocusIconColor())}>
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 size={iconSize} className="animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {icon || defaultIcon}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.input
              ref={inputRef}
              initial={animated && isInlineVariant ? { opacity: 0, width: 0 } : false}
              animate={{ opacity: 1, width: "100%" }}
              exit={animated && isInlineVariant ? { opacity: 0, width: 0 } : undefined}
              transition={{ duration: 0.2 }}
              type="text"
              value={currentValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={(e) => {
                setIsFocused(true);
                onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                onBlur?.(e);
              }}
              disabled={disabled === true}
              placeholder={placeholder}
              autoFocus={autoFocus}
              className={cn(
                inputVariants({ spacing }),
                effectiveVariant === "command" && "font-mono"
              )}
              {...(props as any)}
            />
          )}
        </AnimatePresence>

        {effectiveVariant === "command" && !currentValue && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] text-muted-foreground font-mono pointer-events-none">
            <span className="text-[10px]">⌘</span>K
          </div>
        )}

        <AnimatePresence>
          {clearable && currentValue && isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
              type="button"
            >
              <X size={iconSize === 20 ? 14 : 12} />
            </motion.button>
          )}
        </AnimatePresence>
        {children}
      </motion.div>
    );
  }
);

Search.displayName = "Search";
