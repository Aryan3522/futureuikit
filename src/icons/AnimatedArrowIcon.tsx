"use client";

import React, { useState } from "react";
import { motion, SVGMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type IconProps = React.SVGAttributes<SVGSVGElement> & {
  className?: string;
  size?: number | string;
};

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
