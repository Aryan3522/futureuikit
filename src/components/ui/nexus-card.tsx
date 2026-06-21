/**
 * @registry-slug nexus-card
 * @registry-name Nexus Card
 * @registry-description A Future UI Nexus Card component.
 * @registry-category ui
 * @registry-type Cards
 * @registry-dependency framer-motion
 */
"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type NexusCardColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type NexusCardShape = "default" | "square" | "rounded" | "sharp";
export type NexusCardSpacing = "default" | "2x" | "4x" | "6x" | "8x";

const colorThemeMap: Record<NexusCardColor, { spotlightColor: string; borderGradientCenter: string }> = {
  default: { spotlightColor: "var(--foreground)", borderGradientCenter: "var(--foreground)" }, 
  blue: { spotlightColor: "rgba(59, 130, 246, 0.2)", borderGradientCenter: "rgba(59, 130, 246, 0.6)" },
  emerald: { spotlightColor: "rgba(16, 185, 129, 0.2)", borderGradientCenter: "rgba(16, 185, 129, 0.6)" },
  rose: { spotlightColor: "rgba(244, 63, 94, 0.2)", borderGradientCenter: "rgba(244, 63, 94, 0.6)" },
  amber: { spotlightColor: "rgba(245, 158, 11, 0.2)", borderGradientCenter: "rgba(245, 158, 11, 0.6)" },
  violet: { spotlightColor: "rgba(139, 92, 246, 0.2)", borderGradientCenter: "rgba(139, 92, 246, 0.6)" },
  indigo: { spotlightColor: "rgba(99, 102, 241, 0.2)", borderGradientCenter: "rgba(99, 102, 241, 0.6)" },
  sky: { spotlightColor: "rgba(14, 165, 233, 0.2)", borderGradientCenter: "rgba(14, 165, 233, 0.6)" },
  slate: { spotlightColor: "rgba(100, 116, 139, 0.2)", borderGradientCenter: "rgba(100, 116, 139, 0.6)" },
  orange: { spotlightColor: "rgba(249, 115, 22, 0.2)", borderGradientCenter: "rgba(249, 115, 22, 0.6)" },
};

const getShapeClass = (shape: NexusCardShape, element: "outer" | "inner" = "outer") => {
  if (element === "inner") {
    switch (shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-[2px]";
      case "rounded": return "rounded-[14px]";
      case "default": return "rounded-[23px]";
    }
  }
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[4px]";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-3xl";
  }
};

const getSpacingClass = (spacing: NexusCardSpacing) => {
  switch (spacing) {
    case "2x": return "p-2 sm:p-3";
    case "4x": return "p-4 sm:p-5";
    case "6x": return "p-8 sm:p-10";
    case "8x": return "p-10 sm:p-12";
    default: return "p-6 sm:p-8";
  }
};

export const nexusCardVariants = cva(
  "relative w-full p-[1px] transition-transform duration-200 ease-linear",
  {
    variants: {
      variant: {
        default: "",
        glass: "",
        solid: "",
        neon: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface NexusCardProps extends HTMLMotionProps<"div">, VariantProps<typeof nexusCardVariants> {
  children: React.ReactNode;
  tilt?: boolean;
  spotlight?: boolean;
  noise?: boolean;
  animatedBorder?: boolean;
  spotlightColor?: string;
  borderGradient?: string;
  containerColor?: string;
  color?: NexusCardColor;
  shape?: NexusCardShape;
  spacing?: NexusCardSpacing;
}

export const NexusCard: React.FC<NexusCardProps> = ({
  children,
  className,
  tilt = true,
  spotlight = true,
  noise = true,
  animatedBorder = true,
  spotlightColor,
  borderGradient,
  containerColor = "hsl(var(--card))",
  variant = "default",
  color = "default",
  shape = "default",
  spacing = "default",
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTheme = colorThemeMap[color];

  // Mouse position values for tilt and spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth 3D tilt
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Transform raw mouse values into rotation degrees (-5deg to +5deg)
  const rotateX = useMotionTemplate`${springY}deg`;
  const rotateY = useMotionTemplate`${springX}deg`;

  let currentContainerColor = containerColor;
  
  // Use user-provided string if present, else fallback to color map
  let defaultSpotlight = color === "default" ? "hsl(var(--primary) / 0.15)" : activeTheme.spotlightColor;
  let defaultBorder = color === "default" 
    ? "conic-gradient(from 0deg at 50% 50%, transparent 0%, hsl(var(--primary) / 0.5) 25%, transparent 50%)" 
    : `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${activeTheme.borderGradientCenter} 25%, transparent 50%)`;
  
  let currentSpotlightColor = spotlightColor || defaultSpotlight;
  let currentBorderGradient = borderGradient || defaultBorder;
  let currentNoise = noise;
  let currentAnimatedBorder = animatedBorder;

  if (variant === "glass") {
    currentContainerColor = "transparent";
    if (!borderGradient) {
      currentBorderGradient = color === "default" 
        ? "conic-gradient(from 0deg at 50% 50%, transparent 0%, rgba(255,255,255,0.2) 25%, transparent 50%)"
        : `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${activeTheme.borderGradientCenter} 25%, transparent 50%)`;
    }
  } else if (variant === "solid") {
    currentContainerColor = "hsl(var(--card))";
    currentNoise = false;
    currentAnimatedBorder = false;
  } else if (variant === "neon") {
    currentContainerColor = "hsl(var(--card))";
    if (!borderGradient) {
      currentBorderGradient = color === "default"
        ? "conic-gradient(from 0deg at 50% 50%, transparent 0%, #0ff 25%, #f0f 50%, transparent 75%)"
        : `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${activeTheme.borderGradientCenter} 25%, ${activeTheme.spotlightColor} 50%, transparent 75%)`;
    }
    if (!spotlightColor) {
      currentSpotlightColor = color === "default" ? "rgba(0, 255, 255, 0.2)" : activeTheme.spotlightColor;
    }
  }

  // Raw mouse coordinates for the spotlight effect
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    if (tilt) {
      // Calculate rotation based on cursor position relative to center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Map mouse position to a rotation range (-5 to 5 degrees)
      const rotateXValue = -((y - centerY) / centerY) * 5;
      const rotateYValue = ((x - centerX) / centerX) * 5;
      
      mouseX.set(rotateYValue);
      mouseY.set(rotateXValue);
    }

    if (spotlight) {
      setSpotlightPos({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tilt) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // SVG Noise Texture Data URI
  const noiseUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ perspective: "1000px" }}
      className="relative flex group"
    >
      <motion.div
        style={{
          rotateX: tilt ? rotateX : 0,
          rotateY: tilt ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={cn(nexusCardVariants({ variant }), getShapeClass(shape, "outer"), className)}
        {...props}
      >
        {/* Animated Border Layer */}
        {currentAnimatedBorder && (
          <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", getShapeClass(shape, "outer"))}>
            <motion.div 
              className="absolute inset-[-100%] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: currentBorderGradient }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* Main Card Content Container */}
        <div 
          className={cn("relative h-full w-full overflow-hidden z-10", variant === "glass" && "backdrop-blur-xl bg-background/20", getShapeClass(shape, "inner"))}
          style={{ backgroundColor: currentContainerColor }}
        >
          {/* Noise Overlay */}
          {currentNoise && (
            <div 
              className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url("${noiseUrl}")`, backgroundSize: "100px 100px" }}
            />
          )}

          {/* Mouse-tracking Spotlight Glow */}
          {spotlight && (
            <div
              className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${currentSpotlightColor}, transparent 40%)`,
              }}
            />
          )}

          {/* Glossy Top Highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none" />

          {/* The Content */}
          <div className={cn("relative z-20 h-full", getSpacingClass(spacing))} style={{ transform: "translateZ(30px)" }}>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
