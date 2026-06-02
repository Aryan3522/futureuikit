/**
 * @registry-slug cinematic-error
 * @registry-name Cinematic Error
 * @registry-description A Future UI Cinematic Error component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CinematicErrorProps {
  errorCode?: string;
  title?: string;
  description?: string;
  onBack?: () => void;
  className?: string;
}

export const CinematicError: React.FC<CinematicErrorProps> = React.memo(({
          errorCode = "404",
          title = "Lost in the void",
          description = "The reality you are looking for has collapsed or never existed in this timeline.",
          onBack,
          className,
        }) => {
          const containerRef = useRef<HTMLDivElement>(null);
          
          // Mouse tracking
          const mouseX = useMotionValue(0);
          const mouseY = useMotionValue(0);

          // Smooth springs for fluid cinematic movement
          const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
          const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

          // Transforms for parallax
          const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
          const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);
          const textX = useTransform(smoothX, [-1, 1], [-20, 20]);
          const textY = useTransform(smoothY, [-1, 1], [-20, 20]);
          const glowX = useTransform(smoothX, [-1, 1], [-60, 60]);
          const glowY = useTransform(smoothY, [-1, 1], [-60, 60]);
          
          const handleMouseMove = (e: React.MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width * 2 - 1;
            const y = (e.clientY - top) / height * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
          };

          const handleMouseLeave = () => {
            mouseX.set(0);
            mouseY.set(0);
          };

          return (
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "relative w-full h-full flex items-center justify-center overflow-hidden bg-background",
                className
              )}
              style={{ perspective: "1000px" }}
            >
              {/* Cinematic Spotlight Background */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div 
                  className="absolute inset-0 opacity-40 dark:opacity-20 transition-opacity duration-1000"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 50%)",
                    x: glowX,
                    y: glowY,
                  }}
                />
                <div className="absolute inset-0 bg-background/80 backdrop-blur-[80px]" />
              </div>

              {/* Main Content with 3D Tilt */}
              <motion.div
                style={{ rotateX, rotateY }}
                className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full"
              >
                <motion.div
                  style={{ x: textX, y: textY }}
                  className="relative"
                >
                  {/* Main Error Code */}
                  <h1 className="text-[140px] md:text-[280px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-foreground via-foreground/80 to-transparent opacity-90 drop-shadow-2xl select-none">
                    {errorCode}
                  </h1>
                  {/* Glowing Reflection */}
                  <h1 className="absolute top-0 left-0 w-full text-center text-[140px] md:text-[280px] font-black leading-none tracking-tighter text-primary blur-[60px] opacity-30 select-none -z-10 mix-blend-screen pointer-events-none">
                    {errorCode}
                  </h1>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 flex flex-col items-center gap-6 max-w-md relative z-20"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                      {title}
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {description}
                    </p>
                  </div>
                  
                  <button
                    onClick={onBack}
                    className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-primary/10 px-8 text-sm font-semibold text-primary border border-primary/20 backdrop-blur-md transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95 cursor-pointer shadow-xl shadow-primary/10"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                    <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    Return Home
                  </button>
                </motion.div>
              </motion.div>
              
              {/* Grit / Noise Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Tailwind keyframes for shimmer */}
              <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
            </div>
          );
        });
CinematicError.displayName = "CinematicError";
