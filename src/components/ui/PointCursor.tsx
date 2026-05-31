/**
 * @registry-slug point-cursor
 * @registry-name Point Cursor
 * @registry-dependency framer-motion
 * @registry-dependency clsx
 * @registry-dependency tailwind-merge
 * 
 * PointCursor Component
 * 
 * A high-performance, ultra-precise interactive custom cursor system built with Framer Motion.
 * It features a pixel-perfect center dot and a buttery-smooth trailing ring.
 * 
 * This component acts as a scoped wrapper:
 * - The custom cursor appears ONLY when the mouse is inside this container.
 * - The system cursor is hidden ONLY when inside this container.
 * - Interactions (hovers) are detected correctly based on the system pointer position.
 * 
 * @param {React.ReactNode} children - The content to be wrapped by the custom cursor.
 * @param {string} [dotColor] - The color of the central cursor dot.
 * @param {string} [ringColor] - The color of the outer trailing ring.
 * @returns {JSX.Element} A wrapper component with an integrated custom cursor.
 */

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface PointCursorProps {
  children: React.ReactNode;
  className?: string;
  dotColor?: string;
  ringColor?: string;
  dotSize?: number;
  ringSize?: number;
}

export const PointCursor: React.FC<PointCursorProps> = React.memo(({
          children,
          className,
          dotColor,
          ringColor,
          dotSize = 6,
          ringSize = 30,
        }) => {
          const { theme } = useTheme();
          const [mounted, setMounted] = useState(false);
          const [isVisible, setIsVisible] = useState(false);
          const [isHovering, setIsHovering] = useState(false);
          const containerRef = useRef<HTMLDivElement>(null);

          // Set mounted state for Portal using rAF to avoid ESLint cascading render warning
          useEffect(() => {
            const handle = requestAnimationFrame(() => {
              setMounted(true);
            });
            return () => cancelAnimationFrame(handle);
          }, []);

          // Use provided colors or fall back to theme-based defaults
          const activeDotColor = dotColor || "hsl(var(--foreground))";
          const activeRingColor = ringColor || "hsl(var(--foreground) / 0.4)";

          // Helper to ensure animatable colors (Framer Motion doesn't like "transparent" keyword)
          const getTransparentColor = (color: string) => {
            if (color.includes("var(--foreground)")) return "hsl(var(--foreground) / 0)";
            if (color === "#ffffff") return "rgba(255, 255, 255, 0)";
            if (color === "#000000") return "rgba(0, 0, 0, 0)";
            if (color.startsWith("rgba")) return color.replace(/,[\d.]+\)$/, ", 0)");
            return "hsl(var(--foreground) / 0)";
          };

          const transparentDotColor = getTransparentColor(activeDotColor);

          // 1. Position Values
          const mouseX = useMotionValue(-100);
          const mouseY = useMotionValue(-100);

          // 2. Physics - Ring only (trailing effect)
          const ringSpringConfig = { stiffness: 250, damping: 25, mass: 0.5 };
          const ringX = useSpring(mouseX, ringSpringConfig);
          const ringY = useSpring(mouseY, ringSpringConfig);

          const handleMouseMove = useCallback((e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            if (!target) return;

            const isInteractive =
              target.tagName === "A" ||
              target.tagName === "BUTTON" ||
              target.closest("a") ||
              target.closest("button") ||
              target.classList.contains("clickable") ||
              target.style.cursor === "pointer" ||
              (!target.classList.contains("cursor-none") && window.getComputedStyle(target).cursor === "pointer");

            setIsHovering(!!isInteractive);
          }, [mouseX, mouseY]);

          useEffect(() => {
            if (isVisible) {
              window.addEventListener("mousemove", handleMouseMove, { passive: true });
            }
            return () => window.removeEventListener("mousemove", handleMouseMove);
          }, [isVisible, handleMouseMove]);

          const onMouseEnter = (e: React.MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);
          };

          const onMouseMoveWrapper = (e: React.MouseEvent) => {
            if (!isVisible) {
              mouseX.set(e.clientX);
              mouseY.set(e.clientY);
              setIsVisible(true);
            }
          };

          const onMouseLeave = () => {
            setIsVisible(false);
            setIsHovering(false);
          };

          const cursorUI = mounted && isVisible && createPortal(
            <>
              <style dangerouslySetInnerHTML={{ __html: `
        * { cursor: none !important; }
        a, button, [role="button"], .clickable { cursor: none !important; }
      `}} />
              
              <div 
                className="fixed inset-0 pointer-events-none z-9999999 overflow-hidden"
                style={{ isolation: "isolate" }}
              >
                {/* Trailing Ring */}
                <motion.div
                  className="fixed rounded-full border border-solid"
                  animate={{
                    width: isHovering ? 0 : ringSize,
                    height: isHovering ? 0 : ringSize,
                    opacity: isHovering ? 0 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    left: ringX,
                    top: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                    borderColor: activeRingColor,
                  }}
                />

                {/* Center Dot */}
                <motion.div
                  className="fixed rounded-full"
                  animate={{
                    width: isHovering ? 40 : dotSize,
                    height: isHovering ? 40 : dotSize,
                    backgroundColor: isHovering ? transparentDotColor : activeDotColor,
                    border: isHovering ? `1.5px solid ${activeDotColor}` : "0px solid transparent",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{
                    left: mouseX,
                    top: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    boxShadow: isHovering ? `0 0 15px ${activeDotColor}44` : "none",
                  }}
                />
              </div>
            </>,
            document.body
          );

          return (
            <div
              ref={containerRef}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onMouseMove={onMouseMoveWrapper}
              className={cn(
                "relative w-full h-full",
                isVisible && "cursor-none",
                className
              )}
              style={isVisible ? { cursor: 'none' } : undefined}
            >
              {cursorUI}
              {children}
            </div>
          );
        });
PointCursor.displayName = "PointCursor";
