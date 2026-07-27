/**
 * @registry-slug sidebar
 * @registry-name Sidebar
 * @registry-description A collapsible app-shell sidebar with animated width, grouped nav items, and badges.
 * @registry-category navigation
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const activeMap: Record<SidebarColor, string> = {
  default: "bg-foreground/10 text-foreground",
  blue: "bg-blue-600/10 text-blue-600 dark:text-blue-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  violet: "bg-violet-600/10 text-violet-600 dark:text-violet-400",
  indigo: "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  slate: "bg-slate-600/10 text-slate-600 dark:text-slate-400",
  orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  color: SidebarColor;
}

const SidebarContext = React.createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
  color: "default",
});

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  color?: SidebarColor;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Expanded width in px. */
  width?: number;
  /** Collapsed width in px. */
  collapsedWidth?: number;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      color = "default",
      collapsed: controlled,
      defaultCollapsed = false,
      onCollapsedChange,
      width = 256,
      collapsedWidth = 64,
      children,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState(defaultCollapsed);
    const collapsed = controlled !== undefined ? controlled : internal;

    const setCollapsed = (v: boolean) => {
      if (controlled === undefined) setInternal(v);
      onCollapsedChange?.(v);
    };

    return (
      <SidebarContext.Provider value={{ collapsed, setCollapsed, color }}>
        <motion.aside
          ref={ref}
          initial={false}
          animate={{ width: collapsed ? collapsedWidth : width }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className={cn(
            "flex h-full shrink-0 flex-col overflow-hidden border-r border-border/60 bg-background",
            className
          )}
          {...(props as React.ComponentProps<typeof motion.aside>)}
        >
          {children}
        </motion.aside>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { collapsed } = React.useContext(SidebarContext);
  return (
    <div className={cn("flex h-16 shrink-0 items-center gap-2.5 border-b border-border/60 px-4 font-bold tracking-tight text-foreground overflow-hidden", className)} {...props}>
      {React.Children.map(children, (child, i) =>
        i === 0 ? (
          child
        ) : (
          <AnimatePresence key={i}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="whitespace-nowrap"
              >
                {child}
              </motion.span>
            )}
          </AnimatePresence>
        )
      )}
    </div>
  );
};

const SidebarNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <nav className={cn("flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-2.5", className)} {...props} />
);

const SidebarSection = ({ className, title, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { title?: string }) => {
  const { collapsed } = React.useContext(SidebarContext);
  return (
    <div className={cn("flex flex-col gap-1 py-2", className)} {...props}>
      {title && !collapsed && (
        <span className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70 whitespace-nowrap">
          {title}
        </span>
      )}
      {children}
    </div>
  );
};

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, active, badge, children, ...props }, ref) => {
    const { collapsed, color } = React.useContext(SidebarContext);
    return (
      <button
        ref={ref}
        type="button"
        aria-current={active ? "page" : undefined}
        title={collapsed && typeof children === "string" ? children : undefined}
        className={cn(
          "relative flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 overflow-hidden whitespace-nowrap",
          active ? activeMap[color] : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          collapsed && "justify-center px-0",
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0 [&_svg]:size-[18px]">{icon}</span>}
        {!collapsed && <span className="flex-1 text-left truncate">{children}</span>}
        {!collapsed && badge && (
          <span className="ml-auto shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
            {badge}
          </span>
        )}
      </button>
    );
  }
);
SidebarItem.displayName = "SidebarItem";

const SidebarFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("shrink-0 border-t border-border/60 p-2.5", className)} {...props} />
);

const SidebarToggle = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { collapsed, setCollapsed } = React.useContext(SidebarContext);
  return (
    <button
      type="button"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        "flex h-10 w-full items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
      {...props}
    >
      {collapsed ? <PanelLeftOpen className="size-[18px]" /> : <PanelLeftClose className="size-[18px]" />}
    </button>
  );
};

export { Sidebar, SidebarHeader, SidebarNav, SidebarSection, SidebarItem, SidebarFooter, SidebarToggle };
