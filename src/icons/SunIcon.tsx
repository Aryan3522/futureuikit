"use client";

import React, { useId } from "react";
import { motion, SVGMotionProps } from "framer-motion";
import { IconProps } from "./GithubIcon";

let hasAnimated = false;

export const SunIcon: React.FC<IconProps> = React.memo(
  ({ size, width, height, animate = false, ...props }) => {
    const resolvedSize = size ?? 24;
    const [shouldAnimate] = React.useState(() => animate && !hasAnimated);

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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldAnimate ? { rotate: -45 } : { rotate: 0 }}
        animate={shouldAnimate ? { rotate: 0 } : { rotate: 0 }}
        transition={shouldAnimate ? { duration: 1, type: "spring", stiffness: 100 } : {}}
        {...props}
      >
        <motion.circle 
          cx="12" cy="12" r="4" 
          initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 0.5 } : {}}
        />
        <motion.path 
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 0.8, delay: 0.2, ease: "easeOut" } : {}}
        />
      </motion.svg>
    );
  }
);

SunIcon.displayName = "SunIcon";
