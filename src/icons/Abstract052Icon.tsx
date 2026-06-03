"use client";

import React from "react";
import { motion, SVGMotionProps } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  animated?: boolean;
  animate?: boolean;
  size?: number | string;
}

let hasAnimated = false;

export const Abstract052Icon: React.FC<IconProps> = React.memo(
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
        <motion.polyline points="7,10 11,10 20,10" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.21, delay: 0.19, ease: "easeInOut" } : {}} />
        <motion.polyline points="17,9 14,9 13,9" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.45, delay: 0.15, ease: "easeInOut" } : {}} />
        <motion.polyline points="11,12 11,10 11,11 11,15" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.10, delay: 0.01, ease: "easeInOut" } : {}} />
      </motion.svg>
    );
  }
);

Abstract052Icon.displayName = "Abstract052Icon";
