"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconProps } from "./GithubIcon";

let hasAnimated = false;

export const MoonIcon: React.FC<IconProps> = React.memo(
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
        initial={shouldAnimate ? { rotate: 45, opacity: 0 } : { rotate: 0, opacity: 1 }}
        animate={shouldAnimate ? { rotate: 0, opacity: 1 } : { rotate: 0, opacity: 1 }}
        transition={shouldAnimate ? { duration: 0.8, type: "spring", stiffness: 100 } : {}}
        {...props}
      >
        <motion.path
          d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
          initial={shouldAnimate ? { pathLength: 0 } : { pathLength: 1 }}
          animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 1 }}
          transition={shouldAnimate ? { duration: 1, ease: "easeInOut" } : {}}
        />
      </motion.svg>
    );
  }
);

MoonIcon.displayName = "MoonIcon";
