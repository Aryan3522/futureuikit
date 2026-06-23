/**
 * @registry-slug dock
 * @registry-name Dock
 * @registry-description A Future UI Dock component.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */

"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type DockVariant = "solid" | "outline" | "ghost" | "link";
export type DockTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone" | "macos";
export type DockColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type DockShape = "default" | "square" | "rounded" | "sharp";
export type DockSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type DockLayout = "horizontal" | "vertical";

export interface DockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  variant?: DockVariant;
  theme?: DockTheme;
  color?: DockColor;
  shape?: DockShape;
  spacing?: DockSpacing;
  layout?: DockLayout;
  magnification?: number;
  distance?: number;
  disableMagnification?: boolean;
}

const DockContext = createContext<{
  mouseX: import("framer-motion").MotionValue<number>;
  mouseY: import("framer-motion").MotionValue<number>;
  magnification: number;
  distance: number;
  disableMagnification: boolean;
  variant: DockVariant;
  theme: DockTheme;
  color: DockColor;
  shape: DockShape;
  spacing: DockSpacing;
  layout: DockLayout;
} | null>(null);

const colorThemeMap: Record<DockColor, { text: string; hoverBg: string; hoverText: string; bgIndicator: string; shadowIndicator: string; activeBg: string; solidBg: string; outlineBorder: string }> = {
  default: { text: "text-foreground", hoverBg: "hover:bg-muted/80", hoverText: "hover:text-foreground", bgIndicator: "bg-foreground", shadowIndicator: "shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_rgba(255,255,255,0.5)]", activeBg: "bg-muted", solidBg: "bg-foreground text-background hover:bg-foreground/90", outlineBorder: "border-foreground" },
  blue: { text: "text-blue-600 dark:text-blue-500", hoverBg: "hover:bg-blue-600/10 dark:hover:bg-blue-500/10", hoverText: "hover:text-blue-600 dark:hover:text-blue-500", bgIndicator: "bg-blue-600 dark:bg-blue-500", shadowIndicator: "shadow-[0_0_8px_rgba(37,99,235,0.8)] dark:shadow-[0_0_8px_rgba(59,130,246,0.8)]", activeBg: "bg-blue-600/10 dark:bg-blue-500/10", solidBg: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600", outlineBorder: "border-blue-600 dark:border-blue-500" },
  emerald: { text: "text-emerald-600 dark:text-emerald-500", hoverBg: "hover:bg-emerald-600/10 dark:hover:bg-emerald-500/10", hoverText: "hover:text-emerald-600 dark:hover:text-emerald-500", bgIndicator: "bg-emerald-600 dark:bg-emerald-500", shadowIndicator: "shadow-[0_0_8px_rgba(22,163,74,0.8)] dark:shadow-[0_0_8px_rgba(34,197,94,0.8)]", activeBg: "bg-emerald-600/10 dark:bg-emerald-500/10", solidBg: "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600", outlineBorder: "border-emerald-600 dark:border-emerald-500" },
  rose: { text: "text-rose-600 dark:text-rose-500", hoverBg: "hover:bg-rose-600/10 dark:hover:bg-rose-500/10", hoverText: "hover:text-rose-600 dark:hover:text-rose-500", bgIndicator: "bg-rose-600 dark:bg-rose-500", shadowIndicator: "shadow-[0_0_8px_rgba(225,29,72,0.8)] dark:shadow-[0_0_8px_rgba(244,63,94,0.8)]", activeBg: "bg-rose-600/10 dark:bg-rose-500/10", solidBg: "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600", outlineBorder: "border-rose-600 dark:border-rose-500" },
  amber: { text: "text-amber-600 dark:text-amber-500", hoverBg: "hover:bg-amber-600/10 dark:hover:bg-amber-500/10", hoverText: "hover:text-amber-600 dark:hover:text-amber-500", bgIndicator: "bg-amber-600 dark:bg-amber-500", shadowIndicator: "shadow-[0_0_8px_rgba(217,119,6,0.8)] dark:shadow-[0_0_8px_rgba(245,158,11,0.8)]", activeBg: "bg-amber-600/10 dark:bg-amber-500/10", solidBg: "bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600", outlineBorder: "border-amber-600 dark:border-amber-500" },
  violet: { text: "text-violet-600 dark:text-violet-500", hoverBg: "hover:bg-violet-600/10 dark:hover:bg-violet-500/10", hoverText: "hover:text-violet-600 dark:hover:text-violet-500", bgIndicator: "bg-violet-600 dark:bg-violet-500", shadowIndicator: "shadow-[0_0_8px_rgba(124,58,237,0.8)] dark:shadow-[0_0_8px_rgba(139,92,246,0.8)]", activeBg: "bg-violet-600/10 dark:bg-violet-500/10", solidBg: "bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600", outlineBorder: "border-violet-600 dark:border-violet-500" },
  indigo: { text: "text-indigo-600 dark:text-indigo-500", hoverBg: "hover:bg-indigo-600/10 dark:hover:bg-indigo-500/10", hoverText: "hover:text-indigo-600 dark:hover:text-indigo-500", bgIndicator: "bg-indigo-600 dark:bg-indigo-500", shadowIndicator: "shadow-[0_0_8px_rgba(79,70,229,0.8)] dark:shadow-[0_0_8px_rgba(99,102,241,0.8)]", activeBg: "bg-indigo-600/10 dark:bg-indigo-500/10", solidBg: "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600", outlineBorder: "border-indigo-600 dark:border-indigo-500" },
  sky: { text: "text-sky-600 dark:text-sky-500", hoverBg: "hover:bg-sky-600/10 dark:hover:bg-sky-500/10", hoverText: "hover:text-sky-600 dark:hover:text-sky-500", bgIndicator: "bg-sky-600 dark:bg-sky-500", shadowIndicator: "shadow-[0_0_8px_rgba(2,132,199,0.8)] dark:shadow-[0_0_8px_rgba(14,165,233,0.8)]", activeBg: "bg-sky-600/10 dark:bg-sky-500/10", solidBg: "bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600", outlineBorder: "border-sky-600 dark:border-sky-500" },
  slate: { text: "text-slate-600 dark:text-slate-400", hoverBg: "hover:bg-slate-600/10 dark:hover:bg-slate-500/10", hoverText: "hover:text-slate-600 dark:hover:text-slate-400", bgIndicator: "bg-slate-600 dark:bg-slate-500", shadowIndicator: "shadow-[0_0_8px_rgba(71,85,105,0.8)] dark:shadow-[0_0_8px_rgba(100,116,139,0.8)]", activeBg: "bg-slate-600/10 dark:bg-slate-500/10", solidBg: "bg-slate-600 text-white hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600", outlineBorder: "border-slate-600 dark:border-slate-500" },
  orange: { text: "text-orange-600 dark:text-orange-500", hoverBg: "hover:bg-orange-600/10 dark:hover:bg-orange-500/10", hoverText: "hover:text-orange-600 dark:hover:text-orange-500", bgIndicator: "bg-orange-600 dark:bg-orange-500", shadowIndicator: "shadow-[0_0_8px_rgba(234,88,12,0.8)] dark:shadow-[0_0_8px_rgba(249,115,22,0.8)]", activeBg: "bg-orange-600/10 dark:bg-orange-500/10", solidBg: "bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600", outlineBorder: "border-orange-600 dark:border-orange-500" },
};

const getShapeClass = (shape: DockShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-2xl";
  }
};

const getItemShapeClass = (shape: DockShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-lg";
    case "default": return "rounded-full";
  }
};

const getThemeClass = (theme: DockTheme, variant: DockVariant) => {
  let base = "";
  
  if (theme === "modern") {
    base = "bg-background/40 backdrop-blur-2xl border border-border shadow-sm";
  } else if (theme === "clean") {
    base = "bg-background border border-border shadow-none";
  } else if (theme === "futuristic") {
    base = "bg-background/10 backdrop-blur-3xl border border-border/50 shadow-[0_0_15px_rgba(var(--primary),0.2)]";
  } else if (theme === "brutal") {
    base = "bg-background border-2 border-foreground shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]";
  } else if (theme === "halftone") {
    base = "bg-background border border-border relative before:absolute before:inset-0 before:opacity-10 before:bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] before:bg-[size:4px_4px] overflow-hidden";
  } else if (theme === "macos") {
    base = "bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]";
  } else {
    // default
    base = "bg-background border border-border shadow-sm";
  }

  if (variant === "ghost") {
    if (theme !== "macos") {
      base = "bg-transparent border-transparent shadow-none";
    }
  } else if (variant === "outline") {
    if (theme !== "modern" && theme !== "futuristic" && theme !== "halftone" && theme !== "macos") {
      base = base.replace(/bg-background/, "bg-transparent");
    }
  }

  return base;
};

const getSpacingClass = (spacing: DockSpacing, layout: DockLayout) => {
  if (layout === "vertical") {
    switch (spacing) {
      case "2x": return "gap-1 px-1 py-1 w-12";
      case "4x": return "gap-2 px-2 py-2 w-14";
      case "6x": return "gap-3 px-3 py-3 w-16";
      case "8x": return "gap-4 px-4 py-4 w-20";
      default: return "gap-2 px-2 py-2 w-14";
    }
  } else {
    switch (spacing) {
      case "2x": return "gap-1 px-1 py-1 h-12";
      case "4x": return "gap-2 px-2 py-2 h-14";
      case "6x": return "gap-3 px-3 py-3 h-16";
      case "8x": return "gap-4 px-4 py-4 h-20";
      default: return "gap-2 px-2 py-2 h-14";
    }
  }
};

const getItemVariantClass = (variant: DockVariant, color: DockColor, isActive: boolean, theme: DockTheme) => {
  const c = colorThemeMap[color];
  const brutalClass = theme === "brutal" ? "border-2 border-transparent hover:border-foreground" : "border-2 border-transparent";
  const brutalActiveClass = theme === "brutal" ? "border-2 border-foreground shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)]" : "";
  
  let base = "";
  if (variant === "solid") {
    if (isActive) base = `${c.solidBg} ${theme === 'brutal' ? brutalActiveClass : ''}`;
    else base = `text-muted-foreground ${c.hoverBg} hover:text-foreground ${brutalClass}`;
  } else if (variant === "outline") {
    if (isActive) base = `border-2 ${c.outlineBorder} ${c.text} ${c.hoverBg} ${theme === 'brutal' ? brutalActiveClass : ''}`;
    else base = `text-muted-foreground ${c.hoverBg} hover:text-foreground ${brutalClass}`;
  } else if (variant === "link") {
    if (isActive) base = `underline underline-offset-4 decoration-2 ${c.text}`;
    else base = `text-muted-foreground hover:underline hover:underline-offset-4 hover:decoration-2 hover:text-foreground border-2 border-transparent`;
  } else {
    // ghost
    if (isActive) base = `${c.activeBg} ${c.text} ${theme === 'brutal' ? brutalActiveClass : ''}`;
    else base = `text-muted-foreground ${c.hoverBg} hover:text-foreground ${brutalClass}`;
  }

  // macOS specific overrides for active item indicator (usually a dot below, not a full background)
  if (theme === "macos") {
    base = `text-foreground hover:text-foreground border-2 border-transparent`;
  }

  return base;
};

export const Dock = React.memo(React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      variant = "ghost",
      theme = "modern",
      color = "default",
      shape = "default",
      spacing = "default",
      layout = "horizontal",
      magnification = 60,
      distance = 140,
      disableMagnification = false,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);
    const mouseY = useMotionValue(Infinity);

    const shapeClass = getShapeClass(shape);
    const spacingClass = getSpacingClass(spacing, layout);
    const themeClass = getThemeClass(theme, variant);

    return (
      <DockContext.Provider
        value={{ 
          mouseX, 
          mouseY,
          magnification, 
          distance, 
          disableMagnification,
          variant,
          theme,
          color,
          shape,
          spacing,
          layout
        }}
      >
        <motion.div
          ref={ref}
          onMouseMove={(e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
          }}
          onMouseLeave={() => {
            mouseX.set(Infinity);
            mouseY.set(Infinity);
          }}
          className={cn(
            "mx-auto flex items-end justify-center",
            layout === "vertical" ? "flex-col items-center justify-end" : "flex-row items-end justify-center pb-2",
            shapeClass,
            spacingClass,
            themeClass,
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  }
));
Dock.displayName = "Dock";

export interface DockItemProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  /**
   * Tooltip label shown on hover.
   */
  label: string;
  /**
   * Optional URL for rendering as a Link.
   */
  href?: string;
  /**
   * Visual active state indicator.
   */
  active?: boolean;
  /**
   * Disables interaction and dims the item.
   */
  disabled?: boolean;
  /**
   * Optional base size for the item. Default is 40.
   */
  baseSize?: number;
}

export const DockItem = React.memo(React.forwardRef<HTMLDivElement, DockItemProps>(
  (
    { children, className, label, href, active = false, disabled, baseSize = 40, onClick, ...props },
    ref
  ) => {
    const dock = useContext(DockContext);
    const itemRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const defaultMouseValue = useMotionValue(Infinity);
    const mouseX = dock?.mouseX ?? defaultMouseValue;
    const mouseY = dock?.mouseY ?? defaultMouseValue;
    const magnification = dock?.magnification ?? 60;
    const distance = dock?.distance ?? 140;
    const disableMagnification = dock?.disableMagnification ?? false;
    const variant = dock?.variant ?? "ghost";
    const theme = dock?.theme ?? "modern";
    const color = dock?.color ?? "default";
    const shape = dock?.shape ?? "default";
    const layout = dock?.layout ?? "horizontal";

    const activeTheme = colorThemeMap[color];
    const itemShapeClass = getItemShapeClass(shape);
    const variantClass = getItemVariantClass(variant, color, active, theme);

    // Calculate distance from center of item
    const val = useTransform(layout === "vertical" ? mouseY : mouseX, (val) => {
      const bounds = itemRef.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
      if (layout === "vertical") {
        return val - bounds.y - bounds.height / 2;
      }
      return val - bounds.x - bounds.width / 2;
    });

    // Map distance to scale
    const sizeSync = useTransform(
      val,
      [-distance, 0, distance],
      [baseSize, magnification, baseSize]
    );

    // Futuristic theme push effect
    const pushSync = useTransform(
      val,
      [-distance, 0, distance],
      [0, theme === "futuristic" ? -15 : theme === "macos" ? -6 : 0, 0]
    );

    // Apply smooth spring physics
    const size = useSpring(sizeSync, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });

    const push = useSpring(pushSync, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });

    const content = (
      <div className="flex h-full w-full items-center justify-center transition-all duration-300">
        {children}
      </div>
    );

    const motionStyle = disableMagnification
      ? { width: baseSize, height: baseSize }
      : { width: size, height: size, ...(layout === "vertical" ? { x: push } : { y: push }) };

    const Container = motion.div;

    const tooltipPos = layout === "vertical" 
      ? "left-full ml-4 top-1/2 -translate-y-1/2" 
      : "bottom-full mb-4 left-1/2 -translate-x-1/2";

    const tooltipInitY = layout === "vertical" ? 0 : 10;
    const tooltipInitX = layout === "vertical" ? -10 : 0;

    return (
      <div className="relative flex flex-col items-center justify-end h-full">
        <AnimatePresence>
          {isHovered && !disabled && (
            <motion.div
              initial={{ opacity: 0, x: tooltipInitX, y: tooltipInitY, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1, transition: { delay: 0.2, duration: 0.2 } }}
              exit={{ opacity: 0, x: tooltipInitX, y: tooltipInitY, scale: 0.9, transition: { delay: 0, duration: 0.1 } }}
              className={cn(
                "absolute z-50 whitespace-nowrap rounded-lg bg-popover px-3 py-1.5 text-[11px] font-semibold text-popover-foreground border border-border tracking-wide pointer-events-none",
                tooltipPos
              )}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>

        <Container
          ref={itemRef}
          style={motionStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "relative flex aspect-square shrink-0 items-center justify-center transition-all duration-300 ease-out",
            itemShapeClass,
            variantClass,
            disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
            className
          )}
        >
          {href ? (
            <Link href={href} className={cn("w-full h-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", itemShapeClass)} onClick={onClick as any} {...(props as any)}>
              {content}
            </Link>
          ) : (
            <button className={cn("w-full h-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", itemShapeClass)} onClick={onClick as any} disabled={disabled} {...(props as any)}>
              {content}
            </button>
          )}
        </Container>
        {active && variant !== "solid" && theme !== "macos" && (
          <div className={cn(
            "absolute rounded-full",
            layout === "vertical" ? "-left-2 top-1/2 -translate-y-1/2 h-1 w-1" : "-bottom-2 left-1/2 -translate-x-1/2 h-1 w-1", 
            activeTheme.bgIndicator, 
            activeTheme.shadowIndicator
          )} />
        )}
        {active && theme === "macos" && (
          <div className={cn(
            "absolute rounded-full shadow-sm",
            activeTheme.bgIndicator,
            layout === "vertical" ? "-left-1 top-1/2 -translate-y-1/2 h-1 w-1" : "-bottom-1 left-1/2 -translate-x-1/2 h-1 w-1", 
          )} />
        )}
      </div>
    );
  }
));
DockItem.displayName = "DockItem";

export const DockDivider = React.memo(({ className }: { className?: string }) => {
  const dock = useContext(DockContext);
  const layout = dock?.layout ?? "horizontal";

  return (
    <div
      className={cn(
        "bg-neutral-300 dark:bg-neutral-700 mx-2 self-center",
        layout === "vertical" ? "h-[1px] w-3/5 my-2 mx-auto" : "w-[1px] h-3/5 mb-1",
        className
      )}
    />
  );
});
DockDivider.displayName = "DockDivider";

