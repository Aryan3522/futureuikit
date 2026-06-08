"use client";

import React, { useState } from"react";
import { motion, SVGMotionProps } from"framer-motion";
import { cn } from"@/lib/utils";

type IconProps = React.SVGAttributes<SVGSVGElement> & {
 className?: string;
 size?: number | string;
 animated?: boolean;
};

export const AnimatedCodeIcon = React.forwardRef<SVGSVGElement, IconProps>(
 ({ className, size = 24, animated, ...props }, ref) => {
 const [isHovered, setIsHovered] = useState(false);

 return (
 <motion.svg
 ref={ref}
 xmlns="http://www.w3.org/2000/svg"
 width={size}
 height={size}
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={cn("overflow-visible", className)}
 onMouseEnter={() => setIsHovered(true)}
 onMouseLeave={() => setIsHovered(false)}
 {...(props as any)}
 >
 <motion.polyline
 points="16 18 22 12 16 6"
 initial={{ pathLength: 0 }}
 animate={{ pathLength: 1 }}
 transition={{ duration: 0.5, ease:"easeOut"}}
 />
 <motion.polyline
 points="8 6 2 12 8 18"
 initial={{ pathLength: 0 }}
 animate={{ pathLength: 1 }}
 transition={{ duration: 0.5, delay: 0.2, ease:"easeOut"}}
 />
 <motion.line
 x1="14"
 y1="4"
 x2="10"
 y2="20"
 initial={{ pathLength: 1, rotate: 0 }}
 animate={isHovered ? { rotate: [-5, 5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
 transition={{ duration: 0.4, ease:"easeInOut"}}
 className="opacity-70"
 />
 </motion.svg>
 );
 }
);
AnimatedCodeIcon.displayName ="AnimatedCodeIcon";
