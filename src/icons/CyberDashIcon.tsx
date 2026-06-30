"use client";

import React from"react";
import { motion, SVGMotionProps } from"framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
 animated?: boolean;
 animate?: boolean;
 size?: number | string;
}



export const CyberDashIcon: React.FC<IconProps> = React.memo(
 ({ size, width, height, animate, animated, strokeWidth, ...props }) => {
 const resolvedSize = size ?? 24;
 const isAnimatedProp = animated !== undefined ? animated : animate;
 const isAnimated = isAnimatedProp === true;
 
 const shouldAnimate = isAnimated;

 

 return (
 <motion.svg
 xmlns="http://www.w3.org/2000/svg"
 width={width ?? resolvedSize}
 height={height ?? resolvedSize}
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth={strokeWidth ??"1.5"}
 strokeLinecap="round"
 strokeLinejoin="round"
 {...props}
 >
 <motion.line x1="2"y1="13"x2="7"y2="5"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.54, delay: 0.19, ease:"easeOut"} : {}} />
 <motion.polyline points="6,15 6,14 6,12"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.16, delay: 0.14, ease:"easeInOut"} : {}} />
 <motion.line x1="9"y1="2"x2="15"y2="20"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.90, delay: 0.21, ease:"easeOut"} : {}} />
 <motion.line x1="21"y1="17"x2="4"y2="19"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.08, delay: 0.05, ease:"easeOut"} : {}} />
 <motion.line x1="10"y1="22"x2="5"y2="14"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.99, delay: 0.31, ease:"easeOut"} : {}} />
 <motion.polyline points="7,15 7,20 19,20 19,11"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.18, delay: 0.10, ease:"easeInOut"} : {}} />
 </motion.svg>
 );
 }
);

CyberDashIcon.displayName ="CyberDashIcon";
