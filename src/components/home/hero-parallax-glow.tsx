"use client";

import { motion, useScroll, useTransform } from"framer-motion";

export function HeroParallaxGlow() {
 const { scrollYProgress } = useScroll();
 const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
 const y = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

 return (
 <motion.div
 style={{ opacity, y }}
 className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
 aria-hidden="true"
 >
 <div className="w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-secondary/15 rounded-full blur-[120px] opacity-40"/>
 </motion.div>
 );
}
