"use client";

import React from"react";
import { motion, SVGMotionProps } from"framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
 animated?: boolean;
 animate?: boolean;
 size?: number | string;
}



export const PlasmaLoopIcon: React.FC<IconProps> = React.memo(
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
 <motion.path d="M 14.35 16.41 A 5 5 0 0 1 7.53 14.23"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.93, ease:"easeInOut"} : {}} />
 <motion.path d="M 18.83 16.17 A 8 8 0 0 1 5.84 17.10"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.99, ease:"easeInOut"} : {}} />
 <motion.circle cx="12"cy="12"r="8"strokeDasharray="6 9"initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 3.00, ease:"linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 2.72, ease:"linear", repeat: Infinity } }} style={{ transformOrigin:"12px 12px"}} />
 <motion.circle cx="12"cy="12"r="9"initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.77, delay: 0.07, ease:"easeOut"} : {}} />
 <motion.circle cx="12"cy="12"r="4"strokeDasharray="10 11"initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 3.50, ease:"linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 4.26, ease:"linear", repeat: Infinity } }} style={{ transformOrigin:"12px 12px"}} />
 </motion.svg>
 );
 }
);

PlasmaLoopIcon.displayName ="PlasmaLoopIcon";
