"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconProps } from "./GithubIcon";

let hasAnimated = false;

export const LoaderIcon: React.FC<IconProps> = React.memo(
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
        animate={animate ? { rotate: 360 } : {}}
        transition={animate ? { repeat: Infinity, ease: "linear", duration: 1.5 } : {}}
        {...props}
      >
        <motion.path
          d="M21 12a9 9 0 1 1-6.219-8.56"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 1, ease: "easeInOut" } : {}}
        />
      </motion.svg>
    );
  }
);

LoaderIcon.displayName = "LoaderIcon";
