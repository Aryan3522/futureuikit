"use client";

import React from "react";
import { motion, SVGMotionProps } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  animated?: boolean;
  animate?: boolean;
  size?: number | string;
}

let hasAnimated = false;

export const Circular014Icon: React.FC<IconProps> = React.memo(
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
        <motion.path d="M 8.52 21.38 A 10 10 0 0 1 3.29 7.09" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.77, ease: "easeInOut" } : {}} />
        <motion.circle cx="12" cy="12" r="6" initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.79, delay: 0.15, ease: "easeOut" } : {}} />
        <motion.path d="M 7.44 20.90 A 10 10 0 0 1 4.07 5.91" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.07, ease: "easeInOut" } : {}} />
        <motion.circle cx="12" cy="12" r="11" strokeDasharray="12 8" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.05, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 4.56, ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />
        <motion.circle cx="12" cy="12" r="10" strokeDasharray="9 12" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.73, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 3.48, ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />
      </motion.svg>
    );
  }
);

Circular014Icon.displayName = "Circular014Icon";
