"use client";

import React from"react";
import { motion, SVGMotionProps } from"framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
 animated?: boolean;
 animate?: boolean;
 size?: number | string;
}



export const FluxFractalIcon: React.FC<IconProps> = React.memo(
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
 <motion.line x1="16"y1="10"x2="5"y2="18"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.68, delay: 0.15, ease:"easeOut"} : {}} />
 <motion.line x1="17"y1="9"x2="2"y2="9"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.61, delay: 0.05, ease:"easeOut"} : {}} />
 <motion.polyline points="11,10 11,20 11,4"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.01, delay: 0.02, ease:"easeInOut"} : {}} />
 <motion.line x1="5"y1="10"x2="16"y2="15"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.87, delay: 0.16, ease:"easeOut"} : {}} />
 <motion.line x1="11"y1="3"x2="3"y2="7"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.64, delay: 0.03, ease:"easeOut"} : {}} />
 <motion.polyline points="17,11 17,10 4,10 6,10 6,13"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.92, delay: 0.26, ease:"easeInOut"} : {}} />
 </motion.svg>
 );
 }
);

FluxFractalIcon.displayName ="FluxFractalIcon";
