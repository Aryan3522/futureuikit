"use client";

import React from"react";
import { motion } from"framer-motion";
import { IconProps } from"./GithubIcon";



export const ChevronRightIcon: React.FC<IconProps> = React.memo(
 ({ size, width, height, animate = false, ...props }) => {
 const resolvedSize = size ?? 24;
 const shouldAnimate = animate;

 

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
 d="m9 18 6-6-6-6"
 initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
 animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
 transition={shouldAnimate ? { duration: 0.8, ease:"easeOut"} : {}}
 />
 </motion.svg>
 );
 }
);

ChevronRightIcon.displayName ="ChevronRightIcon";
