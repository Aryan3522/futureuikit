"use client";

import React from "react";
import { motion, SVGMotionProps } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  animated?: boolean;
  animate?: boolean;
  size?: number | string;
}

let hasAnimated = false;

export const Circular001Icon: React.FC<IconProps> = React.memo(
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
        <motion.circle cx="12" cy="12" r="7" strokeDasharray="9 9" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.65, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 4.76, ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />
        <motion.circle cx="12" cy="12" r="6" strokeDasharray="8 7" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.69, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 2.76, ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />
        <motion.circle cx="12" cy="12" r="2" initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.97, delay: 0.09, ease: "easeOut" } : {}} />
        <motion.path d="M 11.28 15.93 A 4 4 0 0 1 10.82 8.18" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.70, ease: "easeInOut" } : {}} />
        <motion.circle cx="12" cy="12" r="5" strokeDasharray="8 6" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.48, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 4.90, ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />
        <motion.circle cx="12" cy="12" r="7" strokeDasharray="8 8" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.89, ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 4.38, ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />
      </motion.svg>
    );
  }
);

Circular001Icon.displayName = "Circular001Icon";
