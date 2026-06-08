"use client";

import React from"react";
import { motion, SVGMotionProps } from"framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
 animated?: boolean;
 animate?: boolean;
 size?: number | string;
}

let hasAnimated = false;

export const StellarLensIcon: React.FC<IconProps> = React.memo(
 ({ size, width, height, animate, animated, strokeWidth, ...props }) => {
 const resolvedSize = size ?? 24;
 const isAnimatedProp = animated !== undefined ? animated : animate;
 const isAnimated = isAnimatedProp === true;
 
 const [shouldAnimate] = React.useState(() => isAnimated && !hasAnimated);

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
 strokeWidth={strokeWidth ??"1.5"}
 strokeLinecap="round"
 strokeLinejoin="round"
 {...props}
 >
 <motion.circle cx="12"cy="12"r="5"strokeDasharray="4 11"initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 4.25, ease:"linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 3.82, ease:"linear", repeat: Infinity } }} style={{ transformOrigin:"12px 12px"}} />
 <motion.circle cx="12"cy="12"r="6"initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.53, delay: 0.17, ease:"easeOut"} : {}} />
 <motion.circle cx="12"cy="12"r="10"initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.56, delay: 0.27, ease:"easeOut"} : {}} />
 <motion.path d="M 18.91 16.02 A 8 8 0 0 1 4.28 14.10"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.60, ease:"easeInOut"} : {}} />
 <motion.path d="M 7.04 19.51 A 9 9 0 0 1 10.70 3.09"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.18, ease:"easeInOut"} : {}} />
 <motion.circle cx="12"cy="12"r="7"initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 0.91, delay: 0.13, ease:"easeOut"} : {}} />
 </motion.svg>
 );
 }
);

StellarLensIcon.displayName ="StellarLensIcon";
