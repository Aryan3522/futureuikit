/**
 * @registry-slug scroll-progress
 * @registry-name Scroll Progress
 * @registry-description A high-performance scroll progress indicator with smooth spring-based animations powered by Framer Motion.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import React from "react";

export interface ScrollProgressProps {
  container?: React.RefObject<HTMLElement | null>;
}

export const ScrollProgress = React.memo(function ScrollProgress({ container }: ScrollProgressProps = {}) {
  const { scrollYProgress } = useScroll({ container })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-[9999]"
      style={{ scaleX }}
    />
  )
});
ScrollProgress.displayName = "ScrollProgress";