"use client";

import React from "react";
import { motion, SVGMotionProps } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  animated?: boolean;
  animate?: boolean;
  size?: number | string;
}

let hasAnimated = false;

export const Abstract115Icon: React.FC<IconProps> = React.memo(
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
        <motion.line x1="15" y1="8" x2="16" y2="2" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.50, delay: 0.48, ease: "easeOut" } : {}} />
        <motion.polyline points="15,9 20,9 4,9 4,4 4,12" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.33, delay: 0.07, ease: "easeInOut" } : {}} />
        <motion.line x1="13" y1="18" x2="14" y2="21" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.80, delay: 0.31, ease: "easeOut" } : {}} />
        <motion.polyline points="7,9 7,13 6,13" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.47, delay: 0.23, ease: "easeInOut" } : {}} />
        <motion.polyline points="18,12 18,17 18,5 6,5 6,10" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.37, delay: 0.22, ease: "easeInOut" } : {}} />
        <motion.polyline points="5,15 13,15 17,15" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.11, delay: 0.16, ease: "easeInOut" } : {}} />
      </motion.svg>
    );
  }
);

Abstract115Icon.displayName = "Abstract115Icon";
