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

export type CinematicErrorColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CinematicErrorShape = "default" | "square" | "rounded" | "sharp";
export type CinematicErrorSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface CinematicErrorProps {
  errorCode?: string;
  title?: string;
  description?: string;
  onBack?: () => void;
  className?: string;
  color?: CinematicErrorColor;
  shape?: CinematicErrorShape;
  spacing?: CinematicErrorSpacing;
}

const colorThemeMap: Record<CinematicErrorColor, { radial: string; text: string; bgSoft: string; border: string; bgHover: string; textHover: string; shadow: string }> = {
  default: { radial: "var(--primary)", text: "text-primary", bgSoft: "bg-primary/10", border: "border-primary/20", bgHover: "hover:bg-primary", textHover: "hover:text-primary-foreground", shadow: "shadow-primary/10" },
  blue: { radial: "#2563eb", text: "text-blue-600 dark:text-blue-500", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", border: "border-blue-600/20 dark:border-blue-500/20", bgHover: "hover:bg-blue-600 dark:hover:bg-blue-500", textHover: "hover:text-white", shadow: "shadow-blue-600/10 dark:shadow-blue-500/10" },
  emerald: { radial: "#16a34a", text: "text-emerald-600 dark:text-emerald-500", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", border: "border-emerald-600/20 dark:border-emerald-500/20", bgHover: "hover:bg-emerald-600 dark:hover:bg-emerald-500", textHover: "hover:text-white", shadow: "shadow-emerald-600/10 dark:shadow-emerald-500/10" },
  rose: { radial: "#e11d48", text: "text-rose-600 dark:text-rose-500", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", border: "border-rose-600/20 dark:border-rose-500/20", bgHover: "hover:bg-rose-600 dark:hover:bg-rose-500", textHover: "hover:text-white", shadow: "shadow-rose-600/10 dark:shadow-rose-500/10" },
  amber: { radial: "#d97706", text: "text-amber-600 dark:text-amber-500", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", border: "border-amber-600/20 dark:border-amber-500/20", bgHover: "hover:bg-amber-600 dark:hover:bg-amber-500", textHover: "hover:text-white", shadow: "shadow-amber-600/10 dark:shadow-amber-500/10" },
  violet: { radial: "#7c3aed", text: "text-violet-600 dark:text-violet-500", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", border: "border-violet-600/20 dark:border-violet-500/20", bgHover: "hover:bg-violet-600 dark:hover:bg-violet-500", textHover: "hover:text-white", shadow: "shadow-violet-600/10 dark:shadow-violet-500/10" },
  indigo: { radial: "#4f46e5", text: "text-indigo-600 dark:text-indigo-500", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", border: "border-indigo-600/20 dark:border-indigo-500/20", bgHover: "hover:bg-indigo-600 dark:hover:bg-indigo-500", textHover: "hover:text-white", shadow: "shadow-indigo-600/10 dark:shadow-indigo-500/10" },
  sky: { radial: "#0284c7", text: "text-sky-600 dark:text-sky-500", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", border: "border-sky-600/20 dark:border-sky-500/20", bgHover: "hover:bg-sky-600 dark:hover:bg-sky-500", textHover: "hover:text-white", shadow: "shadow-sky-600/10 dark:shadow-sky-500/10" },
  slate: { radial: "#475569", text: "text-slate-600 dark:text-slate-400", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", border: "border-slate-600/20 dark:border-slate-500/20", bgHover: "hover:bg-slate-600 dark:hover:bg-slate-500", textHover: "hover:text-white", shadow: "shadow-slate-600/10 dark:shadow-slate-500/10" },
  orange: { radial: "#ea580c", text: "text-orange-600 dark:text-orange-500", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", border: "border-orange-600/20 dark:border-orange-500/20", bgHover: "hover:bg-orange-600 dark:hover:bg-orange-500", textHover: "hover:text-white", shadow: "shadow-orange-600/10 dark:shadow-orange-500/10" },
};

const getShapeClass = (shape: CinematicErrorShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-full";
  }
};

const getSpacingClass = (spacing: CinematicErrorSpacing) => {
  switch (spacing) {
    case "2x": return "mt-4 gap-4";
    case "4x": return "mt-6 gap-5";
    case "6x": return "mt-8 gap-6";
    case "8x": return "mt-12 gap-8";
    default: return "mt-8 gap-6";
  }
};

export const CinematicError: React.FC<CinematicErrorProps> = React.memo(({
          errorCode = "404",
          title = "Lost in the void",
          description = "The reality you are looking for has collapsed or never existed in this timeline.",
          onBack,
          className,
          color = "default",
          shape = "default",
          spacing = "default",
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

          const activeTheme = colorThemeMap[color];
          const shapeClass = getShapeClass(shape);
          const spacingClass = getSpacingClass(spacing);

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
                    background: `radial-gradient(circle at 50% 50%, ${activeTheme.radial} 0%, transparent 50%)`,
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
                  <h1 className="text-[140px] md:text-[280px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/80 to-transparent opacity-90 drop-shadow-2xl select-none">
                    {errorCode}
                  </h1>
                  {/* Glowing Reflection */}
                  <h1 className={cn("absolute top-0 left-0 w-full text-center text-[140px] md:text-[280px] font-black leading-none tracking-tighter blur-[60px] opacity-30 select-none -z-10 mix-blend-screen pointer-events-none", activeTheme.text)}>
                    {errorCode}
                  </h1>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("flex flex-col items-center max-w-md relative z-20", spacingClass)}
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
                    className={cn("group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden px-8 text-sm font-semibold border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xl", 
                      activeTheme.bgSoft, activeTheme.text, activeTheme.border, activeTheme.bgHover, activeTheme.textHover, activeTheme.shadow, shapeClass
                    )}
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
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
