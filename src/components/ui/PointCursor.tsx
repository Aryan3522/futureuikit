/**
 * @registry-slug point-cursor
 * @registry-name Point Cursor
 * @registry-description A Future UI Point Cursor component.
 * @registry-category ui
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

export type PointCursorColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type PointCursorShape = "default" | "square" | "rounded" | "sharp";
export type PointCursorSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface PointCursorProps {
  children: React.ReactNode;
  className?: string;
  dotColor?: string;
  ringColor?: string;
  dotSize?: number;
  ringSize?: number;
  color?: PointCursorColor;
  shape?: PointCursorShape;
  spacing?: PointCursorSpacing;
}

const colorThemeMap: Record<PointCursorColor, { hex: string; hexRing: string }> = {
  default: { hex: "hsl(var(--foreground))", hexRing: "hsl(var(--foreground) / 0.4)" },
  blue: { hex: "#2563eb", hexRing: "rgba(37,99,235,0.4)" },
  emerald: { hex: "#16a34a", hexRing: "rgba(22,163,74,0.4)" },
  rose: { hex: "#e11d48", hexRing: "rgba(225,29,72,0.4)" },
  amber: { hex: "#d97706", hexRing: "rgba(217,119,6,0.4)" },
  violet: { hex: "#7c3aed", hexRing: "rgba(124,58,237,0.4)" },
  indigo: { hex: "#4f46e5", hexRing: "rgba(79,70,229,0.4)" },
  sky: { hex: "#0284c7", hexRing: "rgba(2,132,199,0.4)" },
  slate: { hex: "#475569", hexRing: "rgba(71,85,105,0.4)" },
  orange: { hex: "#ea580c", hexRing: "rgba(234,88,12,0.4)" },
};

const getShapeClass = (shape: PointCursorShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-md";
    case "default": return "rounded-full";
  }
};

const getSpacingValue = (spacing: PointCursorSpacing, defaultRing: number) => {
  if (defaultRing !== 30) return defaultRing;
  switch (spacing) {
    case "2x": return 20;
    case "4x": return 30;
    case "6x": return 40;
    case "8x": return 50;
    default: return 30;
  }
};

export const PointCursor: React.FC<PointCursorProps> = React.memo(({
          children,
          className,
          dotColor,
          ringColor,
          dotSize = 6,
          ringSize = 30,
          color = "default",
          shape = "default",
          spacing = "default"
        }) => {
          const { theme } = useTheme();
          const [mounted, setMounted] = useState(false);
          const [isVisible, setIsVisible] = useState(false);
          const [isHovering, setIsHovering] = useState(false);
          const containerRef = useRef<HTMLDivElement>(null);

          const activeTheme = colorThemeMap[color];
          const shapeClass = getShapeClass(shape);
          const actualRingSize = getSpacingValue(spacing, ringSize);

          // Set mounted state for Portal using rAF to avoid ESLint cascading render warning
          useEffect(() => {
            const handle = requestAnimationFrame(() => {
              setMounted(true);
            });
            return () => cancelAnimationFrame(handle);
          }, []);

          // Use provided colors or fall back to theme-based defaults
          const activeDotColor = dotColor || activeTheme.hex;
          const activeRingColor = ringColor || activeTheme.hexRing;

          // Helper to ensure animatable colors (Framer Motion doesn't like "transparent" keyword)
          const getTransparentColor = (color: string) => {
            if (color.includes("var(--foreground)")) return "hsl(var(--foreground) / 0)";
            if (color === "#ffffff") return "rgba(255, 255, 255, 0)";
            if (color === "#000000") return "rgba(0, 0, 0, 0)";
            if (color.startsWith("rgba")) return color.replace(/,[\d.]+\)$/, ", 0)");
            if (color.startsWith("#")) {
              return color + "00";
            }
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
                  className={cn("fixed border border-solid", shapeClass)}
                  animate={{
                    width: isHovering ? 0 : actualRingSize,
                    height: isHovering ? 0 : actualRingSize,
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
                  className={cn("fixed", shapeClass)}
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
