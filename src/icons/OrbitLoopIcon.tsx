"use client";

import React from"react";
import { motion, SVGMotionProps } from"framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
 animated?: boolean;
 animate?: boolean;
 size?: number | string;
}



export const OrbitLoopIcon: React.FC<IconProps> = React.memo(
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
 <motion.circle cx="12"cy="12"r="5"initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.53, delay: 0.27, ease:"easeOut"} : {}} />
 <motion.circle cx="12"cy="12"r="6"strokeDasharray="10 12"initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 3.84, ease:"linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 2.89, ease:"linear", repeat: Infinity } }} style={{ transformOrigin:"12px 12px"}} />
 <motion.path d="M 18.36 14.92 A 7 7 0 0 1 6.24 15.98"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.82, ease:"easeInOut"} : {}} />
 <motion.circle cx="12"cy="12"r="11"strokeDasharray="8 7"initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 3.52, ease:"linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 4.56, ease:"linear", repeat: Infinity } }} style={{ transformOrigin:"12px 12px"}} />
 <motion.circle cx="12"cy="12"r="4"strokeDasharray="9 9"initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 3.42, ease:"linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 2.70, ease:"linear", repeat: Infinity } }} style={{ transformOrigin:"12px 12px"}} />
 <motion.path d="M 2.06 13.09 A 10 10 0 0 1 13.55 2.12"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.00, ease:"easeInOut"} : {}} />
 </motion.svg>
 );
 }
);

OrbitLoopIcon.displayName ="OrbitLoopIcon";
