"use client";

import React from"react";
import { motion } from"framer-motion";
import { IconProps } from"./GithubIcon";



export const LinkedinIcon: React.FC<IconProps> = React.memo(
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
 d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
 initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
 animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
 transition={shouldAnimate ? { duration: 1.2, ease:"easeOut"} : {}}
 />
 <motion.rect
 x="2"
 y="9"
 width="4"
 height="12"
 initial={shouldAnimate ? { scaleY: 0, originY: 1 } : { scaleY: 1 }}
 animate={shouldAnimate ? { scaleY: 1 } : { scaleY: 1 }}
 transition={shouldAnimate ? { duration: 0.8, delay: 0.3 } : {}}
 />
 <motion.circle
 cx="4"
 cy="4"
 r="2"
 initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
 animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
 transition={shouldAnimate ? { type:"spring", stiffness: 300, delay: 0.8 } : {}}
 />
 </motion.svg>
 );
 }
);

LinkedinIcon.displayName ="LinkedinIcon";
