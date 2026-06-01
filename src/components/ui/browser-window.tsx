"use client";

/**
 * @registry-slug browser-window
 * @registry-name Browser Window
 * @registry-dependency framer-motion
 */

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BrowserWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  contentClassName?: string;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  title?: React.ReactNode;
}

type WindowState = "default" | "maximized" | "minimized";

/**
 * BrowserWindow Component
 * 
 * Professional-grade window component.
 * DESIGN: Always-Portaled to guarantee it sits on top of all headers and modals.
 * PERFORMANCE: State-preserving (never remounts).
 */
export const BrowserWindow = React.memo(React.forwardRef<HTMLDivElement, BrowserWindowProps>(
  ({ className, contentClassName, children, scrollRef, title, ...props }, ref) => {
    const [windowState, setWindowState] = React.useState<WindowState>("default");
    const [mounted, setMounted] = React.useState(false);
    const [rect, setRect] = React.useState<{ top: number; left: number; width: number; height: number } | null>(null);
    const [maximizedScroll, setMaximizedScroll] = React.useState({ x: 0, y: 0 });
    
    const placeholderRef = React.useRef<HTMLDivElement>(null);
    const uniqueId = React.useId();

    const isMaximized = windowState === "maximized";

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
      if (!isMaximized) return;
      let animationFrame: number;
      const startTime = Date.now();
      const syncResize = () => {
        window.dispatchEvent(new Event("resize"));
        if (Date.now() - startTime < 800) animationFrame = requestAnimationFrame(syncResize);
      };
      animationFrame = requestAnimationFrame(syncResize);
      return () => cancelAnimationFrame(animationFrame);
    }, [isMaximized]);

    if (!mounted) return null;

    // macOS fluid spring animation
    const transition = {
      type: "spring",
      mass: 0.5,
      stiffness: 350,
      damping: 32,
      restDelta: 0.001
    };

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      setWindowState("default");
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
          top: rect?.top ?? 0,
          left: rect?.left ?? 0,
          width: rect?.width ?? 0,
          height: rect?.height ?? 0,
          borderRadius: 16,
          margin: 0,
        }}
        transition={transition}
        className={cn(
          "flex flex-col bg-background border border-border/40 overflow-hidden transform-gpu",
          "shadow-none" 
        )}
        style={{
          position: "absolute",
          pointerEvents: "auto",
        }}
        {...props}
      >
        {/* Header */}
        <div className="w-full h-10 shrink-0 bg-muted/80 backdrop-blur-md border-b border-border/40 flex items-center px-4 gap-2 z-50 select-none">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={handleClose}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] border border-black/5 hover:brightness-110 transition-all cursor-pointer group flex items-center justify-center"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[10px] text-black/50 font-bold">×</span>
            </button>
            <button 
              onClick={handleMinimize}
              className="w-3.5 h-3.5 rounded-full bg-[#febc2e] border border-black/5 hover:brightness-110 transition-all cursor-pointer group flex items-center justify-center"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[12px] text-black/50 font-bold leading-none mb-1">−</span>
            </button>
            <button 
              onClick={handleMaximize}
              className="w-3.5 h-3.5 rounded-full bg-[#28c840] border border-black/5 hover:brightness-110 transition-all cursor-pointer group flex items-center justify-center"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black/50 font-bold">
                {isMaximized ? "⧉" : "＋"}
              </span>
            </button>
          </div>
          {title ? (
            <div className="flex-1 text-center pr-12">
              <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.3em]">{title}</span>
            </div>
          ) : (
            <div className="flex-1" />
          )}
        </div>
        
        {/* Content Area */}
        <motion.div 
          layout
          className={cn("relative flex-1 w-full h-full overflow-hidden @container", contentClassName)}
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            {children}
          </div>
        </motion.div>
      </motion.div>
    );

    return (
      <>
        {/* Placeholder: Occupies the actual space in the layout */}
        <div 
          ref={placeholderRef}
          className={cn("w-full h-full rounded-2xl", className)}
        />

        {/* Portal: The window is ALWAYS rendered at the body root to stay on top of everything */}
        {mounted && rect && createPortal(
          <div 
            className="pointer-events-none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              // Escapes all local stacking contexts effectively 
              zIndex: isMaximized ? 2147483647 : 2147483646,
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
