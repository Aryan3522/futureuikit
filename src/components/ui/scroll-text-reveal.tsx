"use client";

/**
 * @registry-slug scroll-text-reveal
 * @registry-name Scroll Text Reveal
 * @registry-description A text reveal animation on scroll.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency clsx
 * @registry-dependency tailwind-merge
 */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export type ScrollTextRevealColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ScrollTextRevealShape = "default" | "square" | "rounded" | "sharp";
export type ScrollTextRevealSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface ScrollTextRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  container?: React.RefObject<HTMLElement | null>;
  color?: ScrollTextRevealColor;
  shape?: ScrollTextRevealShape;
  spacing?: ScrollTextRevealSpacing;
}

const colorThemeMap: Record<ScrollTextRevealColor, string> = {
  default: "text-foreground",
  blue: "text-blue-500",
  emerald: "text-emerald-500",
  rose: "text-rose-500",
  amber: "text-amber-500",
  violet: "text-violet-500",
  indigo: "text-indigo-500",
  sky: "text-sky-500",
  slate: "text-slate-500",
  orange: "text-orange-500",
};

const getSpacingClass = (spacing: ScrollTextRevealSpacing) => {
  switch (spacing) {
    case "2x": return "text-sm";
    case "4x": return "text-base";
    case "6x": return "text-2xl md:text-3xl";
    case "8x": return "text-4xl md:text-5xl lg:text-6xl";
    default: return "text-xl md:text-2xl";
  }
};

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = React.memo(({ 
  children, 
  className, 
  container,
  color = "default",
  shape = "default", // unused but kept for API compatibility
  spacing = "default",
  ...props 
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: container,
    offset: ["start 80%", "start 20%"],
  });

  if (typeof children !== "string") {
    return <span className={cn(colorThemeMap[color], getSpacingClass(spacing), className)} {...props}>{children}</span>;
  }

  const characters = children.split("");

  return (
    <span 
      ref={containerRef} 
      className={cn("inline-flex flex-wrap", colorThemeMap[color], getSpacingClass(spacing), className)} 
      {...props}
    >
      {characters.map((char, index) => {
        const start = index / characters.length;
        const end = start + (1 / characters.length);
        return (
          <Character key={index} progress={scrollYProgress} range={[start, end]}>
            {char === " " ? "\u00A0" : char}
          </Character>
        );
      })}
    </span>
  );
});
ScrollTextReveal.displayName = "ScrollTextReveal";

interface CharacterProps {
  children: React.ReactNode;
  progress: any;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const filter = useTransform(progress, range, ["blur(8px)", "blur(0px)"]);
  
  return (
    <motion.span 
      style={{ opacity, y, filter }}
      className="inline-block transition-none"
    >
      {children}
    </motion.span>
  );
};
