"use client";

/**
 * @registry-slug select
 * @registry-name Select
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
  size: "sm" | "md" | "lg";
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
  size?: "sm" | "md" | "lg";
  container?: HTMLElement | null;
  creatable?: boolean;
  onCreate?: (val: string) => void;
}

export function Select({
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
  size = "md",
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
        size,
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
}

const selectTriggerVariants = cva(
  "flex items-center justify-between w-full transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default: "border border-border bg-background hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg shadow-sm",
        soft: "border-transparent bg-muted/50 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring rounded-xl",
        floating: "border border-border/50 bg-background hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring rounded-2xl shadow-sm",
        glass: "border border-white/20 bg-background/30 backdrop-blur-md hover:bg-background/40 focus-visible:ring-2 focus-visible:ring-ring rounded-xl shadow-sm dark:bg-black/20 dark:border-white/10",
        minimal: "border-b border-border bg-transparent hover:border-foreground/50 focus-visible:border-primary rounded-none px-0 shadow-none",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
  renderValue?: (val: string | string[]) => React.ReactNode;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, placeholder = "Select an option...", renderValue, children, ...props }, ref) => {
    const { open, value, disabled, variant, size, multiSelect, onValueChange } = useSelectContext();

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
                className="inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {v}
                <span
                  role="button"
                  tabIndex={0}
                  className="rounded-full hover:bg-background/50 focus:bg-background/50 outline-none"
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
      return value;
    }, [value, multiSelect, placeholder, renderValue]);

    return (
      <PopoverPrimitive.Trigger asChild>
        <button
          ref={ref}
          disabled={disabled}
          className={cn(selectTriggerVariants({ variant, size }), className)}
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
);
SelectTrigger.displayName = "SelectTrigger";

const selectContentVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden rounded-md border text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-popover border-border",
        soft: "bg-popover border-transparent shadow-lg rounded-xl",
        floating: "bg-popover border-border/50 shadow-xl rounded-2xl",
        glass: "bg-background/70 backdrop-blur-xl border-white/20 shadow-xl rounded-xl dark:bg-black/50 dark:border-white/10",
        minimal: "bg-popover border-border rounded-none shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, children, sideOffset = 4, ...props }, ref) => {
  const { container, variant, size } = useSelectContext();

  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          selectContentVariants({ variant }),
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
});
SelectContent.displayName = "SelectContent";

export const SelectSearch = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & { isLoading?: boolean }
>(({ className, isLoading, ...props }, ref) => {
  const { searchable, size } = useSelectContext();

  if (!searchable) return null;

  return (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          size === "sm" && "py-2 text-xs",
          size === "lg" && "py-4 text-base",
          className
        )}
        {...props}
      />
      {isLoading && <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin text-muted-foreground" />}
    </div>
  );
});
SelectSearch.displayName = "SelectSearch";

export const SelectList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-72 overflow-y-auto overflow-x-hidden custom-scrollbar", className)}
    {...props}
  />
));
SelectList.displayName = "SelectList";

export const SelectGroup = React.forwardRef<
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
));
SelectGroup.displayName = "SelectGroup";

export const SelectEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
));
SelectEmpty.displayName = "SelectEmpty";

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & { 
    value: string;
    label?: string;
  }
>(({ className, children, value: itemValue, label, onSelect, ...props }, ref) => {
  const { value, onValueChange, multiSelect, setOpen, variant } = useSelectContext();

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

  return (
    <CommandPrimitive.Item
      ref={ref}
      value={itemValue}
      keywords={label ? [label] : undefined}
      onSelect={handleSelect}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        variant === "default" && "aria-selected:bg-accent aria-selected:text-accent-foreground",
        variant === "soft" && "aria-selected:bg-muted/80",
        variant === "floating" && "aria-selected:bg-accent/50 aria-selected:font-medium",
        variant === "glass" && "aria-selected:bg-white/10 dark:aria-selected:bg-white/5",
        variant === "minimal" && "aria-selected:bg-transparent aria-selected:font-bold aria-selected:text-foreground hover:bg-muted",
        className
      )}
      {...props}
    >
      <span className="flex items-center flex-1 truncate">
        {children || label || itemValue}
      </span>
      <span
        className={cn(
          "ml-auto flex h-4 w-4 items-center justify-center shrink-0 transition-opacity",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      >
        <Check className="h-4 w-4" />
      </span>
    </CommandPrimitive.Item>
  );
});
SelectItem.displayName = "SelectItem";

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

export const SelectVirtualizer = React.forwardRef<
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
});
SelectVirtualizer.displayName = "SelectVirtualizer";
