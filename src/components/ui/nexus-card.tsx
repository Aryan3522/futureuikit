/**
 * @registry-slug nexus-card
 * @registry-name Nexus Card
 * @registry-type Cards
 * @registry-dependency framer-motion
 */
"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NexusCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  tilt?: boolean;
  spotlight?: boolean;
  noise?: boolean;
  animatedBorder?: boolean;
  spotlightColor?: string;
  borderGradient?: string;
  containerColor?: string;
}

export const NexusCard: React.FC<NexusCardProps> = ({
  children,
  className,
  tilt = true,
  spotlight = true,
  noise = true,
  animatedBorder = true,
  spotlightColor = "hsl(var(--primary) / 0.15)",
  borderGradient = "conic-gradient(from 0deg at 50% 50%, transparent 0%, hsl(var(--primary) / 0.5) 25%, transparent 50%)",
  containerColor = "hsl(var(--card))",
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position values for tilt and spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth 3D tilt
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Transform raw mouse values into rotation degrees (-5deg to +5deg)
  const rotateX = useMotionTemplate`${springY}deg`;
  const rotateY = useMotionTemplate`${springX}deg`;

  // Raw mouse coordinates for the spotlight effect
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    if (tilt) {
      // Calculate rotation based on cursor position relative to center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Map mouse position to a rotation range (-5 to 5 degrees)
      const rotateXValue = -((y - centerY) / centerY) * 5;
      const rotateYValue = ((x - centerX) / centerX) * 5;
      
      mouseX.set(rotateYValue);
      mouseY.set(rotateXValue);
    }

    if (spotlight) {
      setSpotlightPos({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tilt) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // SVG Noise Texture Data URI
  const noiseUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ perspective: "1000px" }}
      className="relative flex group"
    >
      <motion.div
        style={{
          rotateX: tilt ? rotateX : 0,
          rotateY: tilt ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative w-full rounded-3xl p-[1px] transition-transform duration-200 ease-linear",
          className
        )}
        {...props}
      >
        {/* Animated Border Layer */}
        {animatedBorder && (
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
            <motion.div 
              className="absolute inset-[-100%] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: borderGradient }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* Main Card Content Container */}
        <div 
          className="relative h-full w-full rounded-[23px] overflow-hidden z-10"
          style={{ backgroundColor: containerColor }}
        >
          {/* Noise Overlay */}
          {noise && (
            <div 
              className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url("${noiseUrl}")`, backgroundSize: "100px 100px" }}
            />
          )}

          {/* Mouse-tracking Spotlight Glow */}
          {spotlight && (
            <div
              className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${spotlightColor}, transparent 40%)`,
              }}
            />
          )}

          {/* Glossy Top Highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none" />

          {/* The Content */}
          <div className="relative z-20 h-full p-6 sm:p-8" style={{ transform: "translateZ(30px)" }}>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
