/**
 * @component AnimatedIcons
 * @description A collection of premium, animated SVG icons using Framer Motion.
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type IconProps = React.SVGAttributes<SVGSVGElement> & {
  className?: string;
  size?: number | string;
};

// ==========================================
// Animated Search Icon
// ==========================================
export const AnimatedSearchIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 24, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("overflow-visible", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...(props as any)}
      >
        <motion.circle
          cx="11"
          cy="11"
          r="8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.line
          x1="21"
          y1="21"
          x2="16.65"
          y2="16.65"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        />
        {/* Hover Glint Effect */}
        <motion.circle
          cx="11"
          cy="11"
          r="8"
          stroke="currentColor"
          strokeWidth="4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHovered ? { opacity: [0, 0.2, 0], scale: [1, 1.2, 1.3] } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="blur-sm pointer-events-none"
        />
      </motion.svg>
    );
  }
);
AnimatedSearchIcon.displayName = "AnimatedSearchIcon";

// ==========================================
// Animated Loading Icon (Spinner)
// ==========================================
export const AnimatedLoadingIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 24, ...props }, ref) => {
    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("overflow-visible", className)}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
        {...(props as any)}
      >
        {/* Back track */}
        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
        {/* Animated swoosh */}
        <motion.path
          d="M12 2a10 10 0 0 1 10 10"
          initial={{ pathLength: 0.2, opacity: 0.8 }}
          animate={{ pathLength: [0.2, 0.7, 0.2], rotate: [0, 180, 360] }}
          transition={{
            pathLength: { duration: 1.5, ease: "easeInOut", repeat: Infinity },
            rotate: { duration: 2, ease: "linear", repeat: Infinity },
          }}
        />
      </motion.svg>
    );
  }
);
AnimatedLoadingIcon.displayName = "AnimatedLoadingIcon";

// ==========================================
// Animated Code Icon
// ==========================================
export const AnimatedCodeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 24, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("overflow-visible", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...(props as any)}
      >
        <motion.polyline
          points="16 18 22 12 16 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.polyline
          points="8 6 2 12 8 18"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        />
        {/* Subtle sliding line in the middle on hover */}
        <motion.line
          x1="14"
          y1="4"
          x2="10"
          y2="20"
          initial={{ pathLength: 1, rotate: 0 }}
          animate={isHovered ? { rotate: [-5, 5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          className="opacity-70"
        />
      </motion.svg>
    );
  }
);
AnimatedCodeIcon.displayName = "AnimatedCodeIcon";

// ==========================================
// Animated Arrow Icon (8-Directions)
// ==========================================
export type ArrowDirection = "up" | "down" | "left" | "right" | "up-right" | "up-left" | "down-right" | "down-left";

export type AnimatedArrowIconProps = IconProps & {
  direction?: ArrowDirection;
};

const directionMap: Record<ArrowDirection, number> = {
  up: -90,
  down: 90,
  left: 180,
  right: 0,
  "up-right": -45,
  "up-left": -135,
  "down-right": 45,
  "down-left": 135,
};

export const AnimatedArrowIcon = React.forwardRef<SVGSVGElement, AnimatedArrowIconProps>(
  ({ className, size = 24, direction = "right", ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const angle = directionMap[direction];

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("overflow-visible", className)}
        animate={{ rotate: angle }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...(props as any)}
      >
        <motion.g
          animate={isHovered ? { x: 3 } : { x: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <motion.polyline
            points="12 5 19 12 12 19"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          />
        </motion.g>
      </motion.svg>
    );
  }
);
AnimatedArrowIcon.displayName = "AnimatedArrowIcon";

// Explicit Direction Wrappers for Easy Drop-In Replacement
export const AnimatedArrowRight = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => <AnimatedArrowIcon ref={ref} {...props} direction="right" />);
AnimatedArrowRight.displayName = "AnimatedArrowRight";

export const AnimatedArrowLeft = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => <AnimatedArrowIcon ref={ref} {...props} direction="left" />);
AnimatedArrowLeft.displayName = "AnimatedArrowLeft";

export const AnimatedArrowUp = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => <AnimatedArrowIcon ref={ref} {...props} direction="up" />);
AnimatedArrowUp.displayName = "AnimatedArrowUp";

export const AnimatedArrowDown = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => <AnimatedArrowIcon ref={ref} {...props} direction="down" />);
AnimatedArrowDown.displayName = "AnimatedArrowDown";

export const AnimatedArrowUpRight = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => <AnimatedArrowIcon ref={ref} {...props} direction="up-right" />);
AnimatedArrowUpRight.displayName = "AnimatedArrowUpRight";

export const AnimatedArrowUpLeft = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => <AnimatedArrowIcon ref={ref} {...props} direction="up-left" />);
AnimatedArrowUpLeft.displayName = "AnimatedArrowUpLeft";

export const AnimatedArrowDownRight = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => <AnimatedArrowIcon ref={ref} {...props} direction="down-right" />);
AnimatedArrowDownRight.displayName = "AnimatedArrowDownRight";

export const AnimatedArrowDownLeft = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => <AnimatedArrowIcon ref={ref} {...props} direction="down-left" />);
AnimatedArrowDownLeft.displayName = "AnimatedArrowDownLeft";
