"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionTemplate,
} from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Custom wrap function to replace @motionone/utils
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export type MarqueeTrackColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type MarqueeTrackShape = "default" | "square" | "rounded" | "sharp";
export type MarqueeTrackSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface MarqueeTrackProps {
  items?: any[];
  renderItem?: (item: any, index: number, skewX: any, rotateZ: any) => React.ReactNode;
  children?: React.ReactNode;
  baseVelocity?: number;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
  color?: MarqueeTrackColor;
  shape?: MarqueeTrackShape;
  spacing?: MarqueeTrackSpacing;
}

const colorThemeMap: Record<MarqueeTrackColor, { gradient: string; stop1: string; stop2: string; bg: string }> = {
  default: { gradient: "from-foreground to-foreground/50", stop1: "currentColor", stop2: "gray", bg: "bg-foreground/[0.02] border-foreground/10" },
  blue: { gradient: "from-blue-500 to-indigo-500", stop1: "#3b82f6", stop2: "#6366f1", bg: "bg-blue-950/20 border-blue-900/50" },
  emerald: { gradient: "from-emerald-500 to-teal-500", stop1: "#10b981", stop2: "#14b8a6", bg: "bg-emerald-950/20 border-emerald-900/50" },
  rose: { gradient: "from-rose-500 to-pink-500", stop1: "#f43f5e", stop2: "#ec4899", bg: "bg-rose-950/20 border-rose-900/50" },
  amber: { gradient: "from-amber-500 to-orange-500", stop1: "#f59e0b", stop2: "#f97316", bg: "bg-amber-950/20 border-amber-900/50" },
  violet: { gradient: "from-violet-500 to-purple-500", stop1: "#8b5cf6", stop2: "#a855f7", bg: "bg-violet-950/20 border-violet-900/50" },
  indigo: { gradient: "from-indigo-500 to-blue-500", stop1: "#6366f1", stop2: "#3b82f6", bg: "bg-indigo-950/20 border-indigo-900/50" },
  sky: { gradient: "from-sky-500 to-cyan-500", stop1: "#0ea5e9", stop2: "#06b6d4", bg: "bg-sky-950/20 border-sky-900/50" },
  slate: { gradient: "from-slate-500 to-gray-500", stop1: "#64748b", stop2: "#6b7280", bg: "bg-slate-900/20 border-slate-800/50" },
  orange: { gradient: "from-orange-500 to-amber-500", stop1: "#f97316", stop2: "#f59e0b", bg: "bg-orange-950/20 border-orange-900/50" },
};

const getShapeClass = (shape: MarqueeTrackShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-2xl";
  }
};

const getSpacingClass = (spacing: MarqueeTrackSpacing, element: "padding" | "width" = "padding") => {
  if (element === "width") {
    switch (spacing) {
      case "2x": return "w-[200px]";
      case "4x": return "w-[250px]";
      case "6x": return "w-[450px]";
      case "8x": return "w-[550px]";
      default: return "w-[350px]";
    }
  }
  switch (spacing) {
    case "2x": return "p-3 sm:p-4";
    case "4x": return "p-4 sm:p-5";
    case "6x": return "p-8 sm:p-10";
    case "8x": return "p-10 sm:p-12";
    default: return "p-6 sm:p-8";
  }
};

const MarqueeTrack = ({ 
  items = [], 
  renderItem, 
  children, 
  baseVelocity = -2, 
  className = "", 
  containerRef,
  color = "default",
  shape = "default",
  spacing = "default" 
}: MarqueeTrackProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll(containerRef ? { container: containerRef } : undefined);
  const scrollVelocity = useVelocity(scrollY);

  // Premium soft spring for inertial scroll feel
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 150,
  });

  // Map the velocity to a speed multiplier factor
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Calculate premium skew and rotation physics based on scroll velocity
  const skewX = useTransform(smoothVelocity, [-2000, 2000], [-30, 30]);
  const rotateZ = useTransform(smoothVelocity, [-2000, 2000], [-15, 15]);

  /**
   * This wrap calculation ensures we wrap perfectly from 0 to -50%.
   * The actual track length will be 2x the children array length. So 50% is exactly 1 set of items.
   */
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 16);

    /**
     * Change direction dynamically based on scroll direction if it's significant.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  // Allow standard children rendering if renderItem is not provided
  const renderContent = () => {
    if (items && items.length > 0) {
      return items.map((item: any, i: number) => {
        if (renderItem) {
          return renderItem(item, i, skewX, rotateZ);
        }
        return <GlowingCard key={i} item={item} skewX={skewX} rotateZ={rotateZ} color={color} shape={shape} spacing={spacing} />;
      });
    }

    // For standard children, wrap them in a motion.div to apply the physics automatically
    return (
      <motion.div style={{ skewX, rotateZ }} className="flex shrink-0">
        {children}
      </motion.div>
    );
  };

  if (!renderItem && !children) return null;

  return (
    <div className={cn("relative flex w-full overflow-hidden py-10", className)}>
      {/* Edge Gradients for smooth fading */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

      <motion.div className="flex shrink-0 gap-6 w-max" style={{ x }}>
        {/* We render 4 identical groups. This guarantees that at 50% translation, the wrap is pixel-perfect and seamless. */}
        {[1, 2, 3, 4].map((groupKey) => (
          <div key={groupKey} className="flex shrink-0 gap-6">
            {renderContent()}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const GlowingCard = ({ item, skewX, rotateZ, color = "default", shape = "default", spacing = "default" }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const activeTheme = colorThemeMap[color as MarqueeTrackColor] || colorThemeMap.default;

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const gradientClass = item.color || activeTheme.gradient;

  return (
    <motion.div
      style={{ skewX, rotateZ }}
      className={cn("relative flex flex-col group border overflow-hidden shrink-0", activeTheme.bg, getShapeClass(shape), getSpacingClass(spacing, "width"))}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={cn("pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100", getShapeClass(shape))}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.08),
              transparent 40%
            )
          `,
        }}
      />

      <div className={cn("relative z-10 flex flex-col h-full backdrop-blur-md", getSpacingClass(spacing, "padding"))}>
        <div className="flex justify-between items-start mb-6 gap-2">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              {item.name || item.title}
            </h3>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {item.purpose || item.subtitle}
            </span>
          </div>

          {/* Circular Impact Indicator */}
          {(item.impact || item.score) && (
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-foreground/5"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <motion.path
                  initial={{ strokeDasharray: "0, 100" }}
                  whileInView={{ strokeDasharray: `${item.impact || item.score}, 100` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className={cn("text-transparent bg-clip-text bg-gradient-to-r", gradientClass)}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={`url(#gradient-${color})`}
                  strokeWidth="3"
                />
                <defs>
                  <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={activeTheme.stop1} />
                    <stop offset="100%" stopColor={activeTheme.stop2} />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute text-xs font-bold text-foreground">
                {item.impact || item.score}
              </span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground flex-grow leading-relaxed">
          {item.description}
        </p>

        {/* Animated Progress Bar */}
        <div className="mt-6 w-full h-1 bg-foreground/5 rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full bg-gradient-to-r", gradientClass)}
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MarqueeTrack;
