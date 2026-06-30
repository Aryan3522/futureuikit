"use client";

import React from"react";
import { motion, SVGMotionProps } from"framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
 animated?: boolean;
 animate?: boolean;
 size?: number | string;
}



export const QuantumPulseIcon: React.FC<IconProps> = React.memo(
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
 <motion.polyline points="8,15 8,10 8,8 8,8"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.61, delay: 0.13, ease:"easeInOut"} : {}} />
 <motion.polyline points="14,5 6,5 12,5 12,13 4,13"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.96, delay: 0.13, ease:"easeInOut"} : {}} />
 <motion.rect x="4"y="9"width="8"height="8"rx="2"initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.90, delay: 0.14, ease:"backOut"} : {}} />
 <motion.polyline points="15,20 5,20 5,20"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.97, delay: 0.07, ease:"easeInOut"} : {}} />
 </motion.svg>
 );
 }
);

QuantumPulseIcon.displayName ="QuantumPulseIcon";
