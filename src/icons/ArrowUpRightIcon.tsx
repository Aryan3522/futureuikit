"use client";

import React from"react";
import { motion } from"framer-motion";
import { IconProps } from"./GithubIcon";

let hasAnimated = false;

export const ArrowUpRightIcon: React.FC<IconProps> = React.memo(
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
 d="M7 17L17 7"
 initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
 animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
 transition={shouldAnimate ? { duration: 0.8, ease:"easeInOut"} : {}}
 />
 <motion.path
 d="M7 7h10v10"
 initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
 animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
 transition={shouldAnimate ? { duration: 0.6, delay: 0.4, ease:"easeOut"} : {}}
 />
 </motion.svg>
 );
 }
);

ArrowUpRightIcon.displayName ="ArrowUpRightIcon";
