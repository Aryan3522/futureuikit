"use client";

import React from"react";
import { motion } from"framer-motion";
import { IconProps } from"./GithubIcon";

let hasAnimated = false;

export const InstagramIcon: React.FC<IconProps> = React.memo(
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
 <motion.rect
 x="2"
 y="2"
 width="20"
 height="20"
 rx="5"
 ry="5"
 initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
 animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
 transition={shouldAnimate ? { duration: 1.5, ease:"easeInOut"} : {}}
 />
 <motion.path
 d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
 initial={shouldAnimate ? { pathLength: 0, opacity: 0, rotate: -45 } : { pathLength: 1, opacity: 1, rotate: 0 }}
 animate={shouldAnimate ? { pathLength: 1, opacity: 1, rotate: 0 } : { pathLength: 1, opacity: 1, rotate: 0 }}
 transition={shouldAnimate ? { duration: 1.2, delay: 0.5, ease:"easeOut"} : {}}
 />
 <motion.line
 x1="17.5"
 y1="6.5"
 x2="17.51"
 y2="6.5"
 initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
 animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
 transition={shouldAnimate ? { type:"spring", stiffness: 300, delay: 1.2 } : {}}
 />
 </motion.svg>
 );
 }
);

InstagramIcon.displayName ="InstagramIcon";
