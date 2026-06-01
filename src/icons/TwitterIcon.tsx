"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconProps } from "./GithubIcon";

let hasAnimated = false;

export const TwitterIcon: React.FC<IconProps> = React.memo(
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
          d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 1.5, ease: "easeInOut" } : {}}
        />
      </motion.svg>
    );
  }
);

TwitterIcon.displayName = "TwitterIcon";
