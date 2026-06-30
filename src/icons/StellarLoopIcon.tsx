"use client";

import React from"react";
import { motion, SVGMotionProps } from"framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
 animated?: boolean;
 animate?: boolean;
 size?: number | string;
}



export const StellarLoopIcon: React.FC<IconProps> = React.memo(
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
 <motion.path d="M 18.08 19.94 A 10 10 0 0 1 2.00 11.77"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.87, ease:"easeInOut"} : {}} />
 <motion.circle cx="12"cy="12"r="2"initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.77, delay: 0.09, ease:"easeOut"} : {}} />
 <motion.circle cx="12"cy="12"r="10"initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.86, delay: 0.24, ease:"easeOut"} : {}} />
 <motion.path d="M 7.16 19.59 A 9 9 0 0 1 5.87 5.41"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.81, ease:"easeInOut"} : {}} />
 <motion.path d="M 17.83 17.48 A 8 8 0 0 1 4.09 13.21"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.16, ease:"easeInOut"} : {}} />
 <motion.circle cx="12"cy="12"r="6"strokeDasharray="7 5"initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.32, ease:"linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 2.83, ease:"linear", repeat: Infinity } }} style={{ transformOrigin:"12px 12px"}} />
 </motion.svg>
 );
 }
);

StellarLoopIcon.displayName ="StellarLoopIcon";
