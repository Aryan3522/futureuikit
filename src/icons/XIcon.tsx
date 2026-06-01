"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconProps } from "./GithubIcon";

let hasAnimated = false;

export const XIcon: React.FC<IconProps> = React.memo(
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
        {...props}
      >
        <motion.path
          d="M4 4l11.733 16h4.267l-11.733-16z"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 1, ease: "easeInOut" } : {}}
        />
        <motion.path
          d="M4 20l6.768-6.768m2.464-2.464l6.768-6.768"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 1, delay: 0.3, ease: "easeInOut" } : {}}
        />
      </motion.svg>
    );
  }
);

XIcon.displayName = "XIcon";
