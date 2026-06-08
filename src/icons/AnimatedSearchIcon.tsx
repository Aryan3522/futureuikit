"use client";

import React, { useState } from "react";
import { motion, SVGMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type IconProps = React.SVGAttributes<SVGSVGElement> & {
  className?: string;
  size?: number | string;
};

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
