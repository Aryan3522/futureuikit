/**
 * @registry-slug dock
 * @registry-name Dock
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
}

const DockContext = createContext<{
  mouseX: import("framer-motion").MotionValue<number>;
  magnification: number;
  distance: number;
  disableMagnification: boolean;
  variant: "modern" | "clean" | "interactive";
} | null>(null);

export const Dock = React.memo(React.forwardRef<HTMLDivElement, DockProps>(
          (
            {
              className,
              children,
              variant = "modern",
              magnification = 60,
              distance = 140,
              disableMagnification = false,
              ...props
            },
            ref
          ) => {
            const mouseX = useMotionValue(Infinity);

            const actualMagnification = magnification !== 60 ? magnification : (variant === "interactive" ? 80 : 60);
            const actualDistance = distance !== 140 ? distance : (variant === "interactive" ? 200 : 140);
            const actualDisableMagnification = disableMagnification || variant === "clean";

            return (
              <DockContext.Provider
                value={{ 
                  mouseX, 
                  magnification: actualMagnification, 
                  distance: actualDistance, 
                  disableMagnification: actualDisableMagnification,
                  variant
                }}
              >
                <motion.div
                  ref={ref}
                  onMouseMove={(e) => mouseX.set(e.pageX)}
                  onMouseLeave={() => mouseX.set(Infinity)}
                  className={cn(
                    "mx-auto flex h-16 items-end gap-3 rounded-2xl px-3 pb-2 pt-2",
                    variant === "modern" && "bg-background/40 backdrop-blur-2xl border border-border",
                    variant === "clean" && "bg-background border border-border shadow-none",
                    variant === "interactive" && "bg-muted/80 backdrop-blur-xl border border-border",
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
                    "relative flex aspect-square shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    !active && variant === "clean" && "hover:bg-muted/80",
                    !active && variant === "interactive" && "hover:bg-primary/10 hover:text-primary",
                    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
                    className
                  )}
                >
                  {href ? (
                    <Link href={href} className="w-full h-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full" onClick={onClick as any} {...(props as any)}>
                      {content}
                    </Link>
                  ) : (
                    <button className="w-full h-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full" onClick={onClick as any} disabled={disabled} {...(props as any)}>
                      {content}
                    </button>
                  )}
                </Container>
                {active && (
                  <div className="absolute -bottom-2.5 h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
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
