/**
 * @registry-slug tabs
 * @registry-name Tabs
 * @registry-description Animated tabs with a sliding indicator, multiple variants, colors, and shapes.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type TabsColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type TabsVariant = "solid" | "pill" | "underline" | "ghost";

const indicatorColorMap: Record<TabsColor, { solid: string; underline: string; text: string }> = {
  default: { solid: "bg-background shadow-sm ring-1 ring-black/5 dark:ring-white/10", underline: "bg-foreground", text: "text-foreground" },
  blue: { solid: "bg-blue-600", underline: "bg-blue-600", text: "text-white" },
  emerald: { solid: "bg-emerald-500", underline: "bg-emerald-500", text: "text-white" },
  rose: { solid: "bg-rose-500", underline: "bg-rose-500", text: "text-white" },
  amber: { solid: "bg-amber-500", underline: "bg-amber-500", text: "text-white" },
  violet: { solid: "bg-violet-600", underline: "bg-violet-600", text: "text-white" },
  indigo: { solid: "bg-indigo-600", underline: "bg-indigo-600", text: "text-white" },
  sky: { solid: "bg-sky-500", underline: "bg-sky-500", text: "text-white" },
  slate: { solid: "bg-slate-600", underline: "bg-slate-600", text: "text-white" },
  orange: { solid: "bg-orange-500", underline: "bg-orange-500", text: "text-white" },
};

const tabsListVariants = cva("relative inline-flex items-center", {
  variants: {
    variant: {
      solid: "gap-1 p-1 bg-muted/50 border border-border/50",
      pill: "gap-1 p-1 bg-muted/50 border border-border/50",
      underline: "gap-4 border-b border-border w-full",
      ghost: "gap-1",
    },
    shape: {
      default: "rounded-xl",
      square: "rounded-none",
      rounded: "rounded-full",
      sharp: "rounded-[2px]",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  compoundVariants: [
    { variant: "underline", className: "rounded-none p-0 bg-transparent" },
    { variant: "ghost", className: "bg-transparent border-transparent p-0" },
  ],
  defaultVariants: { variant: "solid", shape: "default", size: "md" },
});

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  variant: TabsVariant;
  color: TabsColor;
  shape: NonNullable<VariantProps<typeof tabsListVariants>["shape"]>;
  size: NonNullable<VariantProps<typeof tabsListVariants>["size"]>;
  id: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs>");
  return ctx;
};

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  color?: TabsColor;
  shape?: TabsContextValue["shape"];
  size?: TabsContextValue["size"];
}

const Tabs = ({
  value: controlled,
  defaultValue,
  onValueChange,
  variant = "solid",
  color = "default",
  shape = "default",
  size = "md",
  className,
  children,
  ...props
}: TabsProps) => {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const value = controlled !== undefined ? controlled : internal;
  const id = React.useId();

  const setValue = (v: string) => {
    if (controlled === undefined) setInternal(v);
    onValueChange?.(v);
  };

  const ctx = React.useMemo(
    () => ({ value, setValue, variant, color, shape, size, id }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, variant, color, shape, size, id]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div className={cn("flex flex-col gap-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { variant, shape, size } = useTabs();
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(tabsListVariants({ variant, shape, size }), className)}
        {...props}
      />
    );
  }
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "value"> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const ctx = useTabs();
    const active = ctx.value === value;
    const palette = indicatorColorMap[ctx.color];
    const isUnderline = ctx.variant === "underline";

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={active}
        aria-controls={`${ctx.id}-panel-${value}`}
        id={`${ctx.id}-tab-${value}`}
        onClick={() => ctx.setValue(value)}
        className={cn(
          "relative font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 whitespace-nowrap",
          isUnderline ? "px-1 pb-2.5" : "px-4 py-1.5",
          !isUnderline &&
            (ctx.shape === "rounded" ? "rounded-full" : ctx.shape === "square" ? "rounded-none" : ctx.shape === "sharp" ? "rounded-[2px]" : "rounded-lg"),
          active
            ? isUnderline || ctx.variant === "ghost"
              ? "text-foreground"
              : ctx.color === "default"
                ? "text-foreground"
                : palette.text
            : "text-muted-foreground hover:text-foreground",
          className
        )}
        {...props}
      >
        {active && !isUnderline && ctx.variant !== "ghost" && (
          <motion.span
            layoutId={`${ctx.id}-indicator`}
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
            className={cn(
              "absolute inset-0 -z-10",
              palette.solid,
              ctx.shape === "rounded" ? "rounded-full" : ctx.shape === "square" ? "rounded-none" : ctx.shape === "sharp" ? "rounded-[2px]" : "rounded-lg"
            )}
          />
        )}
        {active && (isUnderline || ctx.variant === "ghost") && (
          <motion.span
            layoutId={`${ctx.id}-indicator`}
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
            className={cn(
              "absolute left-0 right-0 h-0.5 rounded-full",
              isUnderline ? "-bottom-px" : "bottom-0",
              palette.underline
            )}
          />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Keep unmounted panels in the DOM (hidden) instead of unmounting them. */
  forceMount?: boolean;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, forceMount, children, ...props }, ref) => {
    const ctx = useTabs();
    const active = ctx.value === value;

    if (!active && !forceMount) {
      return null;
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          ref={ref}
          role="tabpanel"
          id={`${ctx.id}-panel-${value}`}
          aria-labelledby={`${ctx.id}-tab-${value}`}
          hidden={!active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn("focus-visible:outline-none", className)}
          {...(props as React.ComponentProps<typeof motion.div>)}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
