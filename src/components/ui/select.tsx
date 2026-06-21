/* eslint-disable */
"use client";

/**
 * @registry-slug select
 * @registry-name Select
 * @registry-description A Future UI Select component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency class-variance-authority
 * @registry-dependency lucide-react
 * @registry-dependency @radix-ui/react-popover
 * @registry-dependency @radix-ui/react-slot
 * @registry-dependency @tanstack/react-virtual
 * @registry-dependency cmdk
 */

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronDown, Loader2, X, Search } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

// --- Types ---
export type SelectColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type SelectShape = "default" | "square" | "rounded" | "sharp";
export type SelectSpacing = "default" | "2x" | "4x" | "6x" | "8x";

// --- Contexts ---

type SelectContextValue = {
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  multiSelect: boolean;
  searchable: boolean;
  disabled: boolean;
  variant: "default" | "soft" | "floating" | "glass" | "minimal";
  color: SelectColor;
  shape: SelectShape;
  spacing: SelectSpacing;
  container?: HTMLElement | null;
  onClear?: () => void;
  creatable?: boolean;
  onCreate?: (val: string) => void;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a SelectProvider");
  }
  return context;
};

// --- Components ---

export interface SelectProps {
  children: React.ReactNode;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  multiSelect?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  variant?: "default" | "soft" | "floating" | "glass" | "minimal";
  color?: SelectColor;
  shape?: SelectShape;
  spacing?: SelectSpacing;
  container?: HTMLElement | null;
  creatable?: boolean;
  onCreate?: (val: string) => void;
}

export const Select = React.memo(function Select({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  multiSelect = false,
  searchable = true,
  disabled = false,
  variant = "default",
  color = "default",
  shape = "default",
  spacing = "default",
  container,
  creatable = false,
  onCreate,
}: SelectProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  
  const setOpen = React.useCallback((newOpen: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(newOpen);
    if (onOpenChange) onOpenChange(newOpen);
  }, [controlledOpen, onOpenChange]);

  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
    defaultValue !== undefined ? defaultValue : multiSelect ? [] : ""
  );
  
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  
  const handleValueChange = React.useCallback((val: string | string[]) => {
    if (controlledValue === undefined) setUncontrolledValue(val);
    if (onValueChange) onValueChange(val);
  }, [controlledValue, onValueChange]);

  const handleClear = React.useCallback(() => {
    handleValueChange(multiSelect ? [] : "");
  }, [handleValueChange, multiSelect]);

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open,
        setOpen,
        multiSelect,
        searchable,
        disabled,
        variant,
        color,
        shape,
        spacing,
        container,
        onClear: handleClear,
        creatable,
        onCreate,
      }}
    >
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        {children}
      </PopoverPrimitive.Root>
    </SelectContext.Provider>
  );
});
Select.displayName = "Select";

const selectTriggerVariants = cva(
  "flex items-center justify-between w-full transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default: "border border-border bg-background hover:bg-accent focus-visible:ring-1 shadow-sm",
        soft: "border-transparent bg-muted hover:bg-accent focus-visible:ring-1",
        floating: "border border-border/50 bg-background hover:shadow-md focus-visible:ring-1 shadow-sm",
        glass: "border border-border/20 bg-background/30 backdrop-blur-md hover:bg-white/40 dark:hover:bg-zinc-950/40 focus-visible:ring-1 shadow-sm",
        minimal: "border-b border-border bg-transparent hover:border-foreground/40 focus-visible:border-foreground px-0 shadow-none",
      },
      color: {
        default: "focus-visible:ring-ring focus-visible:border-foreground",
        blue: "focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 focus-visible:border-blue-600 dark:focus-visible:border-blue-500",
        emerald: "focus-visible:ring-emerald-500 focus-visible:border-emerald-500",
        rose: "focus-visible:ring-rose-500 focus-visible:border-rose-500",
        amber: "focus-visible:ring-amber-500 focus-visible:border-amber-500",
        violet: "focus-visible:ring-violet-600 dark:focus-visible:ring-violet-500 focus-visible:border-violet-600 dark:focus-visible:border-violet-500",
        indigo: "focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-500 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500",
        sky: "focus-visible:ring-sky-500 focus-visible:border-sky-500",
        slate: "focus-visible:ring-slate-600 dark:focus-visible:ring-slate-500 focus-visible:border-slate-600 dark:focus-visible:border-slate-500",
        orange: "focus-visible:ring-orange-500 focus-visible:border-orange-500",
      },
      shape: {
        default: "rounded-xl",
        square: "rounded-none",
        rounded: "rounded-full",
        sharp: "rounded-[2px]",
      },
      spacing: {
        default: "h-10 px-4 text-sm",
        "2x": "h-8 px-3 text-xs",
        "4x": "h-10 px-4 text-sm",
        "6x": "h-12 px-5 text-base",
        "8x": "h-14 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
      shape: "default",
      spacing: "default",
    },
  }
);

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
  renderValue?: (val: string | string[]) => React.ReactNode;
}

export const SelectTrigger = React.memo(React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
          ({ className, placeholder = "Select an option...", renderValue, children, ...props }, ref) => {
            const { open, value, disabled, variant, color, shape, spacing, multiSelect, onValueChange } = useSelectContext();

            const handleRemoveItem = (e: React.MouseEvent, itemToRemove: string) => {
              e.stopPropagation();
              e.preventDefault();
              if (Array.isArray(value)) {
                onValueChange(value.filter((i) => i !== itemToRemove));
              }
            };

            const displayValue = React.useMemo(() => {
              if (renderValue) return renderValue(value);
              
              if (multiSelect && Array.isArray(value)) {
                if (value.length === 0) return <span className="text-muted-foreground">{placeholder}</span>;
                return (
                  <div className="flex flex-wrap items-center gap-1 overflow-hidden">
                    {value.map((v) => (
                      <span
                        key={v}
                        className={cn(
                          "inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium",
                          color === "default" ? "bg-muted text-foreground" :
                          color === "blue" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                          color === "emerald" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                          color === "rose" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" :
                          color === "amber" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                          color === "violet" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" :
                          color === "indigo" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" :
                          color === "sky" ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400" :
                          color === "slate" ? "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400" :
                          "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                          shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-full" : "rounded"
                        )}
                      >
                        {v}
                        <span
                          role="button"
                          tabIndex={0}
                          className="rounded-full hover:bg-black/10 dark:hover:bg-white/10 outline-none p-0.5"
                          onClick={(e) => handleRemoveItem(e, v)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleRemoveItem(e as any, v);
                            }
                          }}
                        >
                          <X className="h-3 w-3" />
                        </span>
                      </span>
                    ))}
                  </div>
                );
              }

              if (!value || value.length === 0) {
                return <span className="text-muted-foreground">{placeholder}</span>;
              }
              return <span className="text-foreground">{value}</span>;
            }, [value, multiSelect, placeholder, renderValue, color, shape]);

            return (
              <PopoverPrimitive.Trigger asChild>
                <button
                  ref={ref}
                  disabled={disabled}
                  className={cn(selectTriggerVariants({ variant, color, shape, spacing: variant === "minimal" ? "default" : spacing }), className)}
                  aria-expanded={open}
                  {...props}
                >
                  <span className="truncate flex-1 text-left">{displayValue}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      open && "rotate-180"
                    )}
                  />
                </button>
              </PopoverPrimitive.Trigger>
            );
          }
        ));
SelectTrigger.displayName = "SelectTrigger";

const selectContentVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden border shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        soft: "bg-background border-transparent shadow-lg",
        floating: "bg-background border-border/50 shadow-xl",
        glass: "bg-background/70 backdrop-blur-xl border-border/20 shadow-xl",
        minimal: "bg-background border-border shadow-sm",
      },
      shape: {
        default: "rounded-xl",
        square: "rounded-none",
        rounded: "rounded-3xl",
        sharp: "rounded-[2px]",
      }
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  }
);

export const SelectContent = React.memo(React.forwardRef<
          React.ElementRef<typeof PopoverPrimitive.Content>,
          React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
        >(({ className, children, sideOffset = 4, ...props }, ref) => {
          const { container, variant, shape } = useSelectContext();

          return (
            <PopoverPrimitive.Portal container={container}>
              <PopoverPrimitive.Content
                ref={ref}
                sideOffset={sideOffset}
                className={cn(
                  selectContentVariants({ variant, shape }),
                  "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                  "w-[var(--radix-popover-trigger-width)]",
                  className
                )}
                {...props}
              >
                <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden bg-transparent">
                  {children}
                </CommandPrimitive>
              </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
          );
        }));
SelectContent.displayName = "SelectContent";

export const SelectSearch = React.memo(React.forwardRef<
          React.ElementRef<typeof CommandPrimitive.Input>,
          React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & { isLoading?: boolean }
        >(({ className, isLoading, ...props }, ref) => {
          const { searchable, spacing } = useSelectContext();

          if (!searchable) return null;

          return (
            <div className="flex items-center border-b border-border px-3" cmdk-input-wrapper="">
              <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground opacity-50" />
              <CommandPrimitive.Input
                ref={ref}
                className={cn(
                  "flex w-full bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                  spacing === "2x" && "py-2 text-xs",
                  (spacing === "6x" || spacing === "8x") && "py-4 text-base",
                  className
                )}
                {...props}
              />
              {isLoading && <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin text-muted-foreground" />}
            </div>
          );
        }));
SelectSearch.displayName = "SelectSearch";

export const SelectList = React.memo(React.forwardRef<
          React.ElementRef<typeof CommandPrimitive.List>,
          React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
        >(({ className, ...props }, ref) => (
          <CommandPrimitive.List
            ref={ref}
            className={cn("max-h-72 overflow-y-auto overflow-x-hidden custom-scrollbar p-1", className)}
            {...props}
          />
        )));
SelectList.displayName = "SelectList";

export const SelectGroup = React.memo(React.forwardRef<
          React.ElementRef<typeof CommandPrimitive.Group>,
          React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
        >(({ className, ...props }, ref) => (
          <CommandPrimitive.Group
            ref={ref}
            className={cn(
              "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground",
              className
            )}
            {...props}
          />
        )));
SelectGroup.displayName = "SelectGroup";

export const SelectEmpty = React.memo(React.forwardRef<
          React.ElementRef<typeof CommandPrimitive.Empty>,
          React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
        >(({ className, ...props }, ref) => (
          <CommandPrimitive.Empty
            ref={ref}
            className={cn("py-6 text-center text-sm text-muted-foreground", className)}
            {...props}
          />
        )));
SelectEmpty.displayName = "SelectEmpty";

export const SelectItem = React.memo(React.forwardRef<
          React.ElementRef<typeof CommandPrimitive.Item>,
          React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & { 
            value: string;
            label?: string;
          }
        >(({ className, children, value: itemValue, label, onSelect, ...props }, ref) => {
          const { value, onValueChange, multiSelect, setOpen, variant, color, shape } = useSelectContext();

          const isSelected = React.useMemo(() => {
            if (multiSelect && Array.isArray(value)) {
              return value.includes(itemValue);
            }
            return value === itemValue;
          }, [value, itemValue, multiSelect]);

          const handleSelect = React.useCallback(
            (currentValue: string) => {
              if (multiSelect && Array.isArray(value)) {
                if (isSelected) {
                  onValueChange(value.filter((v) => v !== currentValue));
                } else {
                  onValueChange([...value, currentValue]);
                }
              } else {
                onValueChange(currentValue);
                setOpen(false);
              }
              if (onSelect) onSelect(currentValue);
            },
            [multiSelect, value, isSelected, onValueChange, setOpen, onSelect]
          );

          // Get the dynamic color classes based on active `color` context
          const getColorClasses = () => {
            switch(color) {
              case "blue": return "data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-900 dark:data-[selected=true]:bg-blue-900/30 dark:data-[selected=true]:text-blue-100 hover:bg-blue-50 dark:hover:bg-blue-900/10";
              case "emerald": return "data-[selected=true]:bg-emerald-100 data-[selected=true]:text-emerald-900 dark:data-[selected=true]:bg-emerald-900/30 dark:data-[selected=true]:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/10";
              case "rose": return "data-[selected=true]:bg-rose-100 data-[selected=true]:text-rose-900 dark:data-[selected=true]:bg-rose-900/30 dark:data-[selected=true]:text-rose-100 hover:bg-rose-50 dark:hover:bg-rose-900/10";
              case "amber": return "data-[selected=true]:bg-amber-100 data-[selected=true]:text-amber-900 dark:data-[selected=true]:bg-amber-900/30 dark:data-[selected=true]:text-amber-100 hover:bg-amber-50 dark:hover:bg-amber-900/10";
              case "violet": return "data-[selected=true]:bg-violet-100 data-[selected=true]:text-violet-900 dark:data-[selected=true]:bg-violet-900/30 dark:data-[selected=true]:text-violet-100 hover:bg-violet-50 dark:hover:bg-violet-900/10";
              case "indigo": return "data-[selected=true]:bg-indigo-100 data-[selected=true]:text-indigo-900 dark:data-[selected=true]:bg-indigo-900/30 dark:data-[selected=true]:text-indigo-100 hover:bg-indigo-50 dark:hover:bg-indigo-900/10";
              case "sky": return "data-[selected=true]:bg-sky-100 data-[selected=true]:text-sky-900 dark:data-[selected=true]:bg-sky-900/30 dark:data-[selected=true]:text-sky-100 hover:bg-sky-50 dark:hover:bg-sky-900/10";
              case "slate": return "data-[selected=true]:bg-slate-100 data-[selected=true]:text-slate-900 dark:data-[selected=true]:bg-slate-900/30 dark:data-[selected=true]:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/10";
              case "orange": return "data-[selected=true]:bg-orange-100 data-[selected=true]:text-orange-900 dark:data-[selected=true]:bg-orange-900/30 dark:data-[selected=true]:text-orange-100 hover:bg-orange-50 dark:hover:bg-orange-900/10";
              default: return "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground hover:bg-muted";
            }
          };

          return (
            <CommandPrimitive.Item
              ref={ref}
              value={itemValue}
              keywords={label ? [label] : undefined}
              onSelect={handleSelect}
              className={cn(
                "relative flex cursor-pointer select-none items-center px-2 py-1.5 text-sm outline-none transition-colors data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-md",
                variant === "minimal" && "rounded-none",
                getColorClasses(),
                className
              )}
              {...props}
            >
              <span className="flex items-center flex-1 truncate text-foreground">
                {children || label || itemValue}
              </span>
              <span
                className={cn(
                  "ml-auto flex h-4 w-4 items-center justify-center shrink-0 transition-opacity text-current",
                  isSelected ? "opacity-100" : "opacity-0"
                )}
              >
                <Check className="h-4 w-4" />
              </span>
            </CommandPrimitive.Item>
          );
        }));
SelectItem.displayName = "SelectItem";

export const SelectSeparator = React.memo(React.forwardRef<
          React.ElementRef<typeof CommandPrimitive.Separator>,
          React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
        >(({ className, ...props }, ref) => (
          <CommandPrimitive.Separator
            ref={ref}
            className={cn("-mx-1 h-px bg-border", className)}
            {...props}
          />
        )));
SelectSeparator.displayName = "SelectSeparator";

export const SelectVirtualizer = React.memo(React.forwardRef<
          HTMLDivElement,
          {
            items: any[];
            renderItem: (item: any, index: number) => React.ReactNode;
            estimateSize?: number;
            className?: string;
          }
        >(({ items, renderItem, estimateSize = 36, className }, ref) => {
          const parentRef = React.useRef<HTMLDivElement>(null);
          
          // Expose ref if needed
          React.useImperativeHandle(ref, () => parentRef.current!);

          const virtualizer = useVirtualizer({
            count: items.length,
            getScrollElement: () => parentRef.current,
            estimateSize: () => estimateSize,
            overscan: 5,
          });

          return (
            <div
              ref={parentRef}
              className={cn("max-h-72 w-full overflow-y-auto custom-scrollbar", className)}
            >
              <div
                className="w-full relative"
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                }}
              >
                {virtualizer.getVirtualItems().map((virtualItem) => (
                  <div
                    key={virtualItem.key}
                    className="absolute top-0 left-0 w-full"
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    {renderItem(items[virtualItem.index], virtualItem.index)}
                  </div>
                ))}
              </div>
            </div>
          );
        }));
SelectVirtualizer.displayName = "SelectVirtualizer";
