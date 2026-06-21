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

export type DockColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type DockShape = "default" | "square" | "rounded" | "sharp";
export type DockSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface DockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  /**
   * The visual style of the dock.
   * Default: "modern"
   */
  variant?: "modern" | "clean" | "interactive";
  /**
   * The maximum size the item will scale to when hovered.
   * Default: 60 (80 for interactive)
   */
  magnification?: number;
  /**
   * The radius around the cursor that affects nearby items.
   * Default: 140 (200 for interactive)
   */
  distance?: number;
  /**
   * Disable the magnification effect.
   * Default: false (true for clean)
   */
  disableMagnification?: boolean;
  color?: DockColor;
  shape?: DockShape;
  spacing?: DockSpacing;
}

const DockContext = createContext<{
  mouseX: import("framer-motion").MotionValue<number>;
  magnification: number;
  distance: number;
  disableMagnification: boolean;
  variant: "modern" | "clean" | "interactive";
  color: DockColor;
  shape: DockShape;
  spacing: DockSpacing;
} | null>(null);

const colorThemeMap: Record<DockColor, { text: string; hoverBg: string; hoverText: string; bgIndicator: string; shadowIndicator: string }> = {
  default: { text: "text-primary", hoverBg: "hover:bg-primary/10", hoverText: "hover:text-primary", bgIndicator: "bg-primary", shadowIndicator: "shadow-[0_0_8px_rgba(var(--primary),0.8)]" },
  blue: { text: "text-blue-600 dark:text-blue-500", hoverBg: "hover:bg-blue-600/10 dark:hover:bg-blue-500/10", hoverText: "hover:text-blue-600 dark:hover:text-blue-500", bgIndicator: "bg-blue-600 dark:bg-blue-500", shadowIndicator: "shadow-[0_0_8px_rgba(37,99,235,0.8)] dark:shadow-[0_0_8px_rgba(59,130,246,0.8)]" },
  emerald: { text: "text-emerald-600 dark:text-emerald-500", hoverBg: "hover:bg-emerald-600/10 dark:hover:bg-emerald-500/10", hoverText: "hover:text-emerald-600 dark:hover:text-emerald-500", bgIndicator: "bg-emerald-600 dark:bg-emerald-500", shadowIndicator: "shadow-[0_0_8px_rgba(22,163,74,0.8)] dark:shadow-[0_0_8px_rgba(34,197,94,0.8)]" },
  rose: { text: "text-rose-600 dark:text-rose-500", hoverBg: "hover:bg-rose-600/10 dark:hover:bg-rose-500/10", hoverText: "hover:text-rose-600 dark:hover:text-rose-500", bgIndicator: "bg-rose-600 dark:bg-rose-500", shadowIndicator: "shadow-[0_0_8px_rgba(225,29,72,0.8)] dark:shadow-[0_0_8px_rgba(244,63,94,0.8)]" },
  amber: { text: "text-amber-600 dark:text-amber-500", hoverBg: "hover:bg-amber-600/10 dark:hover:bg-amber-500/10", hoverText: "hover:text-amber-600 dark:hover:text-amber-500", bgIndicator: "bg-amber-600 dark:bg-amber-500", shadowIndicator: "shadow-[0_0_8px_rgba(217,119,6,0.8)] dark:shadow-[0_0_8px_rgba(245,158,11,0.8)]" },
  violet: { text: "text-violet-600 dark:text-violet-500", hoverBg: "hover:bg-violet-600/10 dark:hover:bg-violet-500/10", hoverText: "hover:text-violet-600 dark:hover:text-violet-500", bgIndicator: "bg-violet-600 dark:bg-violet-500", shadowIndicator: "shadow-[0_0_8px_rgba(124,58,237,0.8)] dark:shadow-[0_0_8px_rgba(139,92,246,0.8)]" },
  indigo: { text: "text-indigo-600 dark:text-indigo-500", hoverBg: "hover:bg-indigo-600/10 dark:hover:bg-indigo-500/10", hoverText: "hover:text-indigo-600 dark:hover:text-indigo-500", bgIndicator: "bg-indigo-600 dark:bg-indigo-500", shadowIndicator: "shadow-[0_0_8px_rgba(79,70,229,0.8)] dark:shadow-[0_0_8px_rgba(99,102,241,0.8)]" },
  sky: { text: "text-sky-600 dark:text-sky-500", hoverBg: "hover:bg-sky-600/10 dark:hover:bg-sky-500/10", hoverText: "hover:text-sky-600 dark:hover:text-sky-500", bgIndicator: "bg-sky-600 dark:bg-sky-500", shadowIndicator: "shadow-[0_0_8px_rgba(2,132,199,0.8)] dark:shadow-[0_0_8px_rgba(14,165,233,0.8)]" },
  slate: { text: "text-slate-600 dark:text-slate-400", hoverBg: "hover:bg-slate-600/10 dark:hover:bg-slate-500/10", hoverText: "hover:text-slate-600 dark:hover:text-slate-400", bgIndicator: "bg-slate-600 dark:bg-slate-500", shadowIndicator: "shadow-[0_0_8px_rgba(71,85,105,0.8)] dark:shadow-[0_0_8px_rgba(100,116,139,0.8)]" },
  orange: { text: "text-orange-600 dark:text-orange-500", hoverBg: "hover:bg-orange-600/10 dark:hover:bg-orange-500/10", hoverText: "hover:text-orange-600 dark:hover:text-orange-500", bgIndicator: "bg-orange-600 dark:bg-orange-500", shadowIndicator: "shadow-[0_0_8px_rgba(234,88,12,0.8)] dark:shadow-[0_0_8px_rgba(249,115,22,0.8)]" },
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

const getSpacingClass = (spacing: DockSpacing) => {
  switch (spacing) {
    case "2x": return "gap-1 px-1 py-1";
    case "4x": return "gap-2 px-2 py-2";
    case "6x": return "gap-3 px-3 py-3";
    case "8x": return "gap-4 px-4 py-4";
    default: return "gap-2 px-2 py-2";
  }
};

export const Dock = React.memo(React.forwardRef<HTMLDivElement, DockProps>(
          (
            {
              className,
              children,
              variant = "modern",
              magnification = 60,
              distance = 140,
              disableMagnification = false,
              color = "default",
              shape = "default",
              spacing = "default",
              ...props
            },
            ref
          ) => {
            const mouseX = useMotionValue(Infinity);

            const actualMagnification = magnification !== 60 ? magnification : (variant === "interactive" ? 80 : 60);
            const actualDistance = distance !== 140 ? distance : (variant === "interactive" ? 200 : 140);
            const actualDisableMagnification = disableMagnification || variant === "clean";
            const shapeClass = getShapeClass(shape);
            const spacingClass = getSpacingClass(spacing);

            return (
              <DockContext.Provider
                value={{ 
                  mouseX, 
                  magnification: actualMagnification, 
                  distance: actualDistance, 
                  disableMagnification: actualDisableMagnification,
                  variant,
                  color,
                  shape,
                  spacing
                }}
              >
                <motion.div
                  ref={ref}
                  onMouseMove={(e) => mouseX.set(e.pageX)}
                  onMouseLeave={() => mouseX.set(Infinity)}
                  className={cn(
                    "mx-auto flex h-14 items-center justify-center",
                    shapeClass,
                    spacingClass,
                    variant === "modern" && "bg-background/40 backdrop-blur-2xl border border-border shadow-sm",
                    variant === "clean" && "bg-background border border-border shadow-none",
                    variant === "interactive" && "bg-muted/80 backdrop-blur-xl border border-border shadow-md",
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
            { children, className, label, href, active, disabled, baseSize = 40, onClick, ...props },
            ref
          ) => {
            const dock = useContext(DockContext);
            const itemRef = useRef<HTMLDivElement>(null);
            const [isHovered, setIsHovered] = useState(false);

            const defaultMouseX = useMotionValue(Infinity);
            const mouseX = dock?.mouseX ?? defaultMouseX;
            const magnification = dock?.magnification ?? 60;
            const distance = dock?.distance ?? 140;
            const disableMagnification = dock?.disableMagnification ?? false;
            const variant = dock?.variant ?? "modern";
            const color = dock?.color ?? "default";
            const shape = dock?.shape ?? "default";

            const activeTheme = colorThemeMap[color];
            const itemShapeClass = getItemShapeClass(shape);

            // Calculate distance from center of item
            const val = useTransform(mouseX, (val) => {
              const bounds = itemRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
              return val - bounds.x - bounds.width / 2;
            });

            // Map distance to scale
            const widthSync = useTransform(
              val,
              [-distance, 0, distance],
              [baseSize, magnification, baseSize]
            );

            // Apply smooth spring physics
            const width = useSpring(widthSync, {
              mass: 0.1,
              stiffness: variant === "interactive" ? 200 : 150,
              damping: variant === "interactive" ? 10 : 12,
            });

            const content = (
              <div className={cn("flex h-full w-full items-center justify-center transition-all duration-300", isHovered && "")}>
                {children}
              </div>
            );

            const motionStyle = disableMagnification
              ? { width: baseSize, height: baseSize }
              : { width, height: width };

            const Container = motion.div;

            return (
              <div className="relative flex flex-col items-center justify-end h-full">
                <AnimatePresence>
                  {isHovered && !disabled && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: 0.2, duration: 0.2 } }}
                      exit={{ opacity: 0, y: 10, scale: 0.9, transition: { delay: 0, duration: 0.1 } }}
                      className="absolute -top-12 z-50 whitespace-nowrap rounded-lg bg-popover px-3 py-1.5 text-[11px] font-semibold text-popover-foreground border border-border tracking-wide pointer-events-none"
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
                    active ? activeTheme.text : "text-muted-foreground hover:text-foreground",
                    !active && variant === "clean" && "hover:bg-muted/80",
                    !active && variant === "interactive" && cn(activeTheme.hoverBg, activeTheme.hoverText),
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
                {active && (
                  <div className={cn("absolute -bottom-2.5 h-1 w-1 rounded-full", activeTheme.bgIndicator, activeTheme.shadowIndicator)} />
                )}
              </div>
            );
          }
        ));
DockItem.displayName = "DockItem";

export const DockDivider = React.memo(({ className }: { className?: string }) => {
          return (
            <div
              className={cn("w-[1px] h-3/5 bg-neutral-300 dark:bg-neutral-700 mx-2 self-center", className)}
            />
          );
        });
DockDivider.displayName = "DockDivider";
