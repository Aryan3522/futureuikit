"use client";

import React from "react";
import { motion, SVGMotionProps } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  animated?: boolean;
  animate?: boolean;
  size?: number | string;
}

let hasAnimated = false;

export const Circular033Icon: React.FC<IconProps> = React.memo(
  ({ size, width, height, animate, animated, strokeWidth, ...props }) => {
    const resolvedSize = size ?? 24;
    const isAnimatedProp = animated !== undefined ? animated : animate;
    const isAnimated = isAnimatedProp === true;
    
    const [shouldAnimate] = React.useState(() => isAnimated && !hasAnimated);

    React.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated = true;
      }
    }, [shouldAnimate]);

    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? resolvedSize}
        height={height ?? resolvedSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth ?? "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <motion.circle cx="12" cy="12" r="7" initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.60, delay: 0.07, ease: "easeOut" } : {}} />
        <motion.path d="M 9.97 16.57 A 5 5 0 0 1 12.61 7.04" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.10, ease: "easeInOut" } : {}} />
        <motion.circle cx="12" cy="12" r="10" initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.73, delay: 0.29, ease: "easeOut" } : {}} />
        <motion.path d="M 13.07 16.88 A 5 5 0 0 1 8.65 15.71" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.81, ease: "easeInOut" } : {}} />
        <motion.circle cx="12" cy="12" r="11" strokeDasharray="5 4" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 4.10, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 3.31, ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />
      </motion.svg>
    );
  }
);

Circular033Icon.displayName = "Circular033Icon";
