"use client";

import React from"react";
import { motion } from"framer-motion";
import { IconProps } from"./GithubIcon";



export const YoutubeIcon: React.FC<IconProps> = React.memo(
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
 d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
 initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
 animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
 transition={shouldAnimate ? { duration: 1.5, ease:"easeInOut"} : {}}
 />
 <motion.polygon
 points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
 initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
 animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
 transition={shouldAnimate ? { type:"spring", stiffness: 200, delay: 0.8 } : {}}
 />
 </motion.svg>
 );
 }
);

YoutubeIcon.displayName ="YoutubeIcon";
