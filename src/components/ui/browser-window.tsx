"use client";

/**
 * @registry-slug browser-window
 * @registry-name Browser Window
 * @registry-description A Future UI Browser Window component.
 * @registry-category ui
 * @registry-dependency framer-motion
 */

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { HTMLMotionProps } from "framer-motion";

export type BrowserWindowColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type BrowserWindowShape = "default" | "square" | "rounded" | "sharp";
export type BrowserWindowSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type BrowserWindowSize = "sm" | "md" | "lg";
export type BrowserWindowVariant = "solid" | "outline" | "ghost" | "link";

export interface BrowserWindowProps extends Omit<HTMLMotionProps<"div">, "title" | "color"> {
  children: React.ReactNode;
  contentClassName?: string;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  title?: React.ReactNode;
  headerAction?: React.ReactNode;
  color?: BrowserWindowColor;
  shape?: BrowserWindowShape;
  spacing?: BrowserWindowSpacing;
  size?: BrowserWindowSize;
  variant?: BrowserWindowVariant;
}

type WindowState = "default" | "maximized" | "minimized";

const colorThemeMap: Record<BrowserWindowColor, { border: string; header: string; ring: string }> = {
  default: { border: "border-black/10 dark:border-white/10", header: "bg-[#f3f4f6]/80 dark:bg-muted/80", ring: "ring-black/5 dark:ring-white/5" },
  blue: { border: "border-blue-500/20", header: "bg-blue-500/10", ring: "ring-blue-500/10" },
  emerald: { border: "border-emerald-500/20", header: "bg-emerald-500/10", ring: "ring-emerald-500/10" },
  rose: { border: "border-rose-500/20", header: "bg-rose-500/10", ring: "ring-rose-500/10" },
  amber: { border: "border-amber-500/20", header: "bg-amber-500/10", ring: "ring-amber-500/10" },
  violet: { border: "border-violet-500/20", header: "bg-violet-500/10", ring: "ring-violet-500/10" },
  indigo: { border: "border-indigo-500/20", header: "bg-indigo-500/10", ring: "ring-indigo-500/10" },
  sky: { border: "border-sky-500/20", header: "bg-sky-500/10", ring: "ring-sky-500/10" },
  slate: { border: "border-slate-500/20", header: "bg-slate-500/10", ring: "ring-slate-500/10" },
  orange: { border: "border-orange-500/20", header: "bg-orange-500/10", ring: "ring-orange-500/10" },
};

const getBorderRadius = (shape: BrowserWindowShape) => {
  switch (shape) {
    case "square": return 0;
    case "sharp": return 4;
    case "rounded": return 12;
    case "default": return 16;
  }
};

const getSpacingClass = (spacing: BrowserWindowSpacing) => {
  switch (spacing) {
    case "2x": return "p-2";
    case "4x": return "p-4";
    case "6x": return "p-6";
    case "8x": return "p-8";
    default: return "";
  }
};

/**
 * BrowserWindow Component
 * 
 * Professional-grade window component.
 * DESIGN: Always-Portaled to guarantee it sits on top of all headers and modals.
 * PERFORMANCE: State-preserving (never remounts).
 */
export const BrowserWindow = React.memo(React.forwardRef<HTMLDivElement, BrowserWindowProps>(
  ({ className, contentClassName, children, scrollRef, title, headerAction, color = "default", shape = "default", spacing = "default", size = "md", variant = "solid", ...props }, ref) => {
    const [windowState, setWindowState] = React.useState<WindowState>("default");
    const [mounted, setMounted] = React.useState(false);
    const [rect, setRect] = React.useState<{ top: number; left: number; width: number; height: number } | null>(null);
    const [customRect, setCustomRect] = React.useState<{ top: number; left: number; width: number; height: number } | null>(null);
    const [maximizedScroll, setMaximizedScroll] = React.useState({ x: 0, y: 0 });
    const [isInteracting, setIsInteracting] = React.useState(false);
    
    const placeholderRef = React.useRef<HTMLDivElement>(null);
    const interactionRef = React.useRef({
      startX: 0,
      startY: 0,
      startRect: { top: 0, left: 0, width: 0, height: 0 },
      type: "" as "drag" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | ""
    });

    const isMaximized = windowState === "maximized";
    const activeRect = customRect || rect;
    const activeTheme = colorThemeMap[color];
    const borderRadius = getBorderRadius(shape);

    const isOutline = variant === "outline";
    const isGhost = variant === "ghost";
    const isLink = variant === "link";
    const isSolid = variant === "solid";

    // Size Variables
    const headerHeight = size === "sm" ? "h-8" : size === "lg" ? "h-12" : "h-10";
    const dotSize = size === "sm" ? "w-2.5 h-2.5" : size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5";
    const titleTextSize = size === "sm" ? "text-[8px]" : size === "lg" ? "text-xs" : "text-[10px]";


    React.useEffect(() => {
      setMounted(true);
    }, []);

    // ─────────────────────────────────────────────────────────────────────────────
    // POSITION TRACKING: Maps the portaled window to the absolute document coordinates
    // ─────────────────────────────────────────────────────────────────────────────
    const updatePosition = React.useCallback(() => {
      if (placeholderRef.current) {
        const r = placeholderRef.current.getBoundingClientRect();
        setRect({
          top: r.top + window.scrollY,
          left: r.left + window.scrollX,
          width: r.width,
          height: r.height
        });
      }
    }, []);

    React.useLayoutEffect(() => {
      if (!mounted) return;
      
      updatePosition();
      
      window.addEventListener("resize", updatePosition);
      
      const observer = new ResizeObserver(updatePosition);
      if (placeholderRef.current) observer.observe(placeholderRef.current);

      return () => {
        window.removeEventListener("resize", updatePosition);
        observer.disconnect();
      };
    }, [mounted, updatePosition]);

    // Handle Escape Key
    React.useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMaximized) setWindowState("default");
      };
      if (isMaximized) {
        window.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
      }
      return () => {
        window.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
      };
    }, [isMaximized]);

    // RESIZE SYNC for 3D content
    React.useLayoutEffect(() => {
      if (!isMaximized && !isInteracting) return;
      let animationFrame: number;
      const startTime = Date.now();
      const syncResize = () => {
        window.dispatchEvent(new Event("resize"));
        if (Date.now() - startTime < 800) animationFrame = requestAnimationFrame(syncResize);
      };
      animationFrame = requestAnimationFrame(syncResize);
      return () => cancelAnimationFrame(animationFrame);
    }, [isMaximized, isInteracting]);

    // DRAG AND RESIZE LOGIC
    const startInteraction = React.useCallback((
      e: React.PointerEvent, 
      type: "drag" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"
    ) => {
      if (!activeRect || isMaximized || windowState === "minimized") return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const currentRect = customRect ? { ...customRect } : { ...activeRect };
      
      if (!customRect) {
        setCustomRect(currentRect);
      }

      interactionRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startRect: currentRect,
        type
      };
      
      setIsInteracting(true);
      document.body.style.userSelect = "none";
      if (type === "drag") {
        document.body.style.cursor = "grabbing";
      } else {
        document.body.style.cursor = e.currentTarget.getAttribute('style')?.includes('cursor') 
          ? (e.currentTarget as HTMLElement).style.cursor 
          : "auto";
      }
    }, [activeRect, customRect, isMaximized, windowState]);

    React.useEffect(() => {
      if (!isInteracting) return;
      
      let animationFrameId: number;

      const handlePointerMove = (e: PointerEvent) => {
        animationFrameId = requestAnimationFrame(() => {
          const { startX, startY, startRect, type } = interactionRef.current;
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;

          let newTop = startRect.top;
          let newLeft = startRect.left;
          let newWidth = startRect.width;
          let newHeight = startRect.height;

          const MIN_WIDTH = 320;
          const MIN_HEIGHT = 200;

          if (type === "drag") {
            newTop = Math.max(0, startRect.top + dy);
            newLeft = startRect.left + dx;
            // Ensure title bar is always grabbable
            const maxLeft = window.innerWidth - 50;
            if (newLeft > maxLeft) newLeft = maxLeft;
            if (newLeft + newWidth < 50) newLeft = 50 - newWidth;
          } else {
            if (type.includes("n")) {
              const maxDy = startRect.height - MIN_HEIGHT;
              const clampedDy = Math.min(dy, maxDy);
              newTop = startRect.top + clampedDy;
              newHeight = startRect.height - clampedDy;
            }
            if (type.includes("s")) {
              newHeight = Math.max(MIN_HEIGHT, startRect.height + dy);
            }
            if (type.includes("w")) {
              const maxDx = startRect.width - MIN_WIDTH;
              const clampedDx = Math.min(dx, maxDx);
              newLeft = startRect.left + clampedDx;
              newWidth = startRect.width - clampedDx;
            }
            if (type.includes("e")) {
              newWidth = Math.max(MIN_WIDTH, startRect.width + dx);
            }
          }

          setCustomRect({ top: newTop, left: newLeft, width: newWidth, height: newHeight });
        });
      };

      const handlePointerUp = () => {
        setIsInteracting(false);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        cancelAnimationFrame(animationFrameId);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
        cancelAnimationFrame(animationFrameId);
      };
    }, [isInteracting]);

    if (!mounted) return null;

    // macOS fluid spring animation
    const transition = {
      type: "spring" as const,
      mass: 0.5,
      stiffness: 350,
      damping: 32,
      restDelta: 0.001
    };

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      setWindowState("default");
      setCustomRect(null); // Snap back to layout placeholder
    };

    const handleMinimize = (e: React.MouseEvent) => {
      e.stopPropagation();
      setWindowState("minimized");
    };

    const handleMaximize = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isMaximized) {
        setMaximizedScroll({ x: window.scrollX, y: window.scrollY });
        setWindowState("maximized");
      } else {
        setWindowState("default");
      }
    };

    const windowElement = (
      <motion.div
        initial={false}
        animate={isMaximized ? {
          top: maximizedScroll.y,
          left: maximizedScroll.x,
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          margin: 0,
        } : {
          top: activeRect?.top ?? 0,
          left: activeRect?.left ?? 0,
          width: activeRect?.width ?? 0,
          height: activeRect?.height ?? 0,
          borderRadius: borderRadius,
          margin: 0,
        }}
        transition={isInteracting ? { type: "tween", duration: 0 } : transition}
        className={cn(
          "flex flex-col overflow-hidden transform-gpu transition-shadow duration-300",
          !isGhost && !isLink ? "border" : "border border-transparent",
          !isGhost && !isLink ? activeTheme.border : "",
          isSolid ? "bg-background" : "bg-transparent",
          customRect 
            ? cn("shadow-2xl shadow-black/20 dark:shadow-black/60 ring-1", activeTheme.ring)
            : !isGhost && !isLink ? "shadow-xl shadow-black/5 dark:shadow-black/40" : ""
        )}
        style={{
          position: "absolute",
          pointerEvents: "auto",
        }}
        {...props}
      >
        {/* Resize Handles */}
        {!isMaximized && windowState !== "minimized" && (
          <>
            <div className="absolute top-0 left-0 w-full h-1.5 cursor-ns-resize z-[60] bg-transparent" onPointerDown={(e) => startInteraction(e, "n")} />
            <div className="absolute bottom-0 left-0 w-full h-1.5 cursor-ns-resize z-[60] bg-transparent" onPointerDown={(e) => startInteraction(e, "s")} />
            <div className="absolute top-0 left-0 w-1.5 h-full cursor-ew-resize z-[60] bg-transparent" onPointerDown={(e) => startInteraction(e, "w")} />
            <div className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize z-[60] bg-transparent" onPointerDown={(e) => startInteraction(e, "e")} />
            <div className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-[70] bg-transparent" onPointerDown={(e) => startInteraction(e, "nw")} />
            <div className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-[70] bg-transparent" onPointerDown={(e) => startInteraction(e, "ne")} />
            <div className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-[70] bg-transparent" onPointerDown={(e) => startInteraction(e, "sw")} />
            <div className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-[70] bg-transparent" onPointerDown={(e) => startInteraction(e, "se")} />
          </>
        )}

        {/* Header */}
        <div 
          className={cn(
            "w-full shrink-0 flex items-center px-4 justify-between z-50 select-none transition-colors duration-300",
            headerHeight,
            !isGhost && !isLink ? "border-b backdrop-blur-md" : "border-b border-transparent",
            !isGhost && !isLink ? activeTheme.border : "",
            isSolid ? activeTheme.header : "bg-transparent"
          )}
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            startInteraction(e, "drag");
          }}
          onDoubleClick={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            handleMaximize(e as any);
          }}
          style={{ cursor: isMaximized ? "default" : (isInteracting && interactionRef.current.type === "drag" ? "grabbing" : "grab") }}
        >
          <div className="flex items-center gap-1.5 w-24">
            <button 
              onClick={handleClose}
              className={cn("rounded-full bg-[#ff5f57] border border-black/5 hover:brightness-110 transition-all cursor-pointer group flex items-center justify-center", dotSize)}
            >
              <span className="opacity-0 group-hover:opacity-100 text-[10px] text-black/50 font-bold">×</span>
            </button>
            <button 
              onClick={handleMinimize}
              className={cn("rounded-full bg-[#febc2e] border border-black/5 hover:brightness-110 transition-all cursor-pointer group flex items-center justify-center", dotSize)}
            >
              <span className="opacity-0 group-hover:opacity-100 text-[12px] text-black/50 font-bold leading-none mb-1">−</span>
            </button>
            <button 
              onClick={handleMaximize}
              className={cn("rounded-full bg-[#28c840] border border-black/5 hover:brightness-110 transition-all cursor-pointer group flex items-center justify-center", dotSize)}
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black/50 font-bold">
                {isMaximized ? "⧉" : "＋"}
              </span>
            </button>
          </div>
          
          {title ? (
            <div className="flex-1 text-center">
              <span className={cn(
                "font-bold text-muted-foreground/30 uppercase tracking-[0.3em] pointer-events-none transition-all duration-300",
                titleTextSize,
                isLink && "underline underline-offset-4 decoration-muted-foreground/30"
              )}>{title}</span>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          <div className="flex items-center justify-end w-24">
            {headerAction}
          </div>
        </div>
        
        {/* Content Area */}
        <motion.div 
          layout
          ref={scrollRef as any}
          className={cn("relative flex-1 w-full min-h-0 overflow-auto @container", getSpacingClass(spacing), contentClassName)}
          style={{ 
            pointerEvents: isInteracting ? "none" : "auto",
            transform: "translateZ(0)" // Scopes 'fixed' positioned descendants to this container
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    );

    return (
      <>
        {/* Placeholder: Occupies the actual space in the layout */}
        <div 
          ref={placeholderRef}
          className={cn("w-full h-full relative", className)}
          style={{ borderRadius }}
        >
          {customRect && windowState === "default" && (
            <div className="absolute inset-0 border-2 border-dashed border-border/40 flex items-center justify-center bg-muted/5" style={{ borderRadius }}>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-50 select-none">
                Window Detached
              </span>
            </div>
          )}
        </div>

        {/* Portal: The window is ALWAYS rendered at the body root to stay on top of everything */}
        {mounted && activeRect && createPortal(
          <div 
            className="pointer-events-none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: isMaximized || isInteracting || customRect ? 2147483647 : 10,
              isolation: "isolate"
            }}
          >
            {/* Backdrop */}
            <AnimatePresence>
              {isMaximized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/60 backdrop-blur-xl pointer-events-auto"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh"
                  }}
                  onClick={() => setWindowState("default")}
                />
              )}
            </AnimatePresence>
            
            {windowElement}
          </div>,
          document.body
        )}
      </>
    );
  }
));

BrowserWindow.displayName = "BrowserWindow";
