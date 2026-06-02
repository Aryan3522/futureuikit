/**
 * @registry-slug search
 * @registry-name Search
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
        standard: "bg-background border border-border/60 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20",
        compact: "bg-muted/40 border border-transparent rounded-lg focus-within:bg-background focus-within:border-border/60 focus-within:shadow-sm",
        floating: "bg-background/60 backdrop-blur-xl border border-border/40 rounded-full shadow-lg hover:shadow-xl focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.12)] focus-within:border-border",
        command: "bg-muted/30 border-b border-border/50 rounded-none focus-within:bg-background",
        icon: "bg-transparent hover:bg-muted/50 rounded-full",
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
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
      size: "md",
      fullWidth: true,
      disabled: false,
    },
  }
);

const inputVariants = cva(
  "w-full bg-transparent border-none outline-none placeholder:text-muted-foreground",
  {
    variants: {
      size: {
        sm: "pr-12",
        md: "pr-14",
        lg: "pr-16",
      }
    },
    defaultVariants: {
      size: "md",
    }
  }
);

const iconWrapperVariants = cva(
  "flex items-center justify-center shrink-0 text-muted-foreground transition-colors",
  {
    variants: {
      size: {
        sm: "w-8",
        md: "w-10",
        lg: "w-12",
      }
    },
    defaultVariants: {
      size: "md",
    }
  }
);

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onSubmit" | "disabled">,
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
      size,
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

    // Determine icon size based on component size
    const iconSize = size === "lg" ? 20 : size === "sm" ? 14 : 16;
    const defaultIcon = <SearchIcon size={iconSize} />;

    const isOverlayVariant = variant === "icon" && (inputVariant === "floating" || inputVariant === "command");
    const isInlineVariant = variant === "icon" && (inputVariant === "standard" || inputVariant === "compact");

    // Dynamic variant mapping for inline expansion
    const effectiveVariant = (isInlineVariant && isExpanded) ? inputVariant : variant;

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
              "flex items-center justify-center rounded-full bg-transparent hover:bg-muted/50 transition-colors",
              size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none",
              className
            )}
          >
            <div className={cn(iconWrapperVariants({ size }))}>
               {icon || defaultIcon}
            </div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <div className={cn("fixed inset-0 z-[100] flex justify-center", inputVariant === "command" ? "items-start pt-[10vh]" : "items-start pt-[20vh]")}>
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
                    searchVariants({ variant: inputVariant, size: "lg", fullWidth: true }),
                    inputVariant === "floating" && "shadow-2xl",
                    inputVariant === "command" && "border rounded-xl shadow-2xl overflow-hidden" // Command palette style
                  )}>
                    <div className={iconWrapperVariants({ size: "lg" })}>
                       {loading ? <Loader2 className="animate-spin text-primary" size={20} /> : (icon || <SearchIcon size={20} />)}
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
                         inputVariants({ size: "lg" }), 
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
          width: fullWidth && effectiveVariant !== "icon" ? "100%" : isExpanded ? (size === "lg" ? 400 : size === "sm" ? 240 : 320) : (size === "lg" ? 48 : size === "sm" ? 32 : 40),
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn(
          searchVariants({ variant: effectiveVariant, size, fullWidth: fullWidth && effectiveVariant !== "icon", disabled }),
          isFocused && "ring-primary/20",
          !isExpanded && effectiveVariant === "icon" && "cursor-pointer justify-center overflow-hidden",
          className
        )}
        onClick={handleContainerClick}
      >
        <div className={cn(iconWrapperVariants({ size }), isFocused && "text-primary")}>
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 size={iconSize} className="animate-spin text-primary" />
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
                inputVariants({ size }),
                effectiveVariant === "command" && "font-mono"
              )}
              {...(props as any)}
            />
          )}
        </AnimatePresence>

        {effectiveVariant === "command" && !currentValue && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border/50 bg-muted/50 text-[10px] text-muted-foreground font-mono pointer-events-none">
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
