"use client";

import React from"react";
import { motion, SVGMotionProps } from"framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
 animated?: boolean;
 animate?: boolean;
 size?: number | string;
}

let hasAnimated = false;

export const AeroRingIcon: React.FC<IconProps> = React.memo(
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
 <motion.circle cx="12"cy="12"r="11"strokeDasharray="5 4"initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.85, ease:"linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 4.88, ease:"linear", repeat: Infinity } }} style={{ transformOrigin:"12px 12px"}} />
 <motion.path d="M 8.33 15.39 A 5 5 0 0 1 11.19 7.07"initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: 1.16, ease:"easeInOut"} : {}} />
 <motion.circle cx="12"cy="12"r="7"strokeDasharray="4 4"initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.36, ease:"linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 4.22, ease:"linear", repeat: Infinity } }} style={{ transformOrigin:"12px 12px"}} />
 <motion.circle cx="12"cy="12"r="8"strokeDasharray="5 6"initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: 2.60, ease:"linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: 3.78, ease:"linear", repeat: Infinity } }} style={{ transformOrigin:"12px 12px"}} />
 </motion.svg>
 );
 }
);

AeroRingIcon.displayName ="AeroRingIcon";
