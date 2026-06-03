"use client";

import React from "react";
import { motion, SVGMotionProps } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  animated?: boolean;
  animate?: boolean;
  size?: number | string;
}

let hasAnimated = false;

export const Circular008Icon: React.FC<IconProps> = React.memo(
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
        <motion.circle cx="12" cy="12" r="7" initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.84, delay: 0.19, ease: "easeOut" } : {}} />
        <motion.circle cx="12" cy="12" r="11" strokeDasharray="6 11" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.14, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 4.09, ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />
        <motion.circle cx="12" cy="12" r="5" strokeDasharray="7 11" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.82, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 2.27, ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />
        <motion.circle cx="12" cy="12" r="8" strokeDasharray="8 11" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 4.92, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 2.36, ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />
      </motion.svg>
    );
  }
);

Circular008Icon.displayName = "Circular008Icon";
