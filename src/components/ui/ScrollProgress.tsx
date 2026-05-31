/**
 * ScrollProgress Component
 * 
 * A high-performance scroll progress indicator that tracks the user's 
 * scroll position and displays a progress bar at the top of the viewport.
 * Built with Framer Motion for smooth, spring-based animations.
 * 
 * @returns {JSX.Element} A motion-enhanced progress bar.
 */
/**
 * @registry-slug scroll-progress
 * @registry-name Scroll Progress
 * @registry-dependency framer-motion
 */
"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import React from "react";

export const ScrollProgress = React.memo(function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-120"
      style={{ scaleX }}
    />
  )
});
ScrollProgress.displayName = "ScrollProgress";