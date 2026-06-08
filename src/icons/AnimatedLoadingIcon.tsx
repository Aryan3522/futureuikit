"use client";

import React from "react";
import { motion, SVGMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type IconProps = React.SVGAttributes<SVGSVGElement> & {
  className?: string;
  size?: number | string;
};

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
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("overflow-visible", className)}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        {...(props as any)}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          strokeWidth="2.5"
          initial={{ pathLength: 0.1, pathOffset: 0 }}
          animate={{
            pathLength: [0.1, 0.6, 0.1],
            pathOffset: [0, 0.4, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.svg>
    );
  }
);
AnimatedLoadingIcon.displayName = "AnimatedLoadingIcon";
