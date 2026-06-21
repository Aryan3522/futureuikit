/**
 * @registry-slug infinite-slider
 * @registry-name Infinite Carousel Slider
 * @registry-description A Future UI Infinite Carousel Slider component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";

export type CarouselSliderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CarouselSliderShape = "default" | "square" | "rounded" | "sharp";
export type CarouselSliderSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface CarouselSlide {
  id: string | number;
  image: string;
  title: string;
  tag: string;
  location: string;
  tagBg?: string;
}

export interface CarouselSliderProps {
  slides?: CarouselSlide[];
  className?: string;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  pauseOnHover?: boolean;
  variant?: string;
  color?: CarouselSliderColor;
  shape?: CarouselSliderShape;
  spacing?: CarouselSliderSpacing;
}

const colorThemeMap: Record<CarouselSliderColor, { bg: string; text: string; tagBg: string }> = {
  default: { bg: "bg-primary", text: "text-primary", tagBg: "bg-primary text-primary-foreground" },
  blue: { bg: "bg-blue-600 dark:bg-blue-500", text: "text-blue-600 dark:text-blue-500", tagBg: "bg-blue-600 text-white" },
  emerald: { bg: "bg-emerald-600 dark:bg-emerald-500", text: "text-emerald-600 dark:text-emerald-500", tagBg: "bg-emerald-600 text-white" },
  rose: { bg: "bg-rose-600 dark:bg-rose-500", text: "text-rose-600 dark:text-rose-500", tagBg: "bg-rose-600 text-white" },
  amber: { bg: "bg-amber-600 dark:bg-amber-500", text: "text-amber-600 dark:text-amber-500", tagBg: "bg-amber-600 text-white" },
  violet: { bg: "bg-violet-600 dark:bg-violet-500", text: "text-violet-600 dark:text-violet-500", tagBg: "bg-violet-600 text-white" },
  indigo: { bg: "bg-indigo-600 dark:bg-indigo-500", text: "text-indigo-600 dark:text-indigo-500", tagBg: "bg-indigo-600 text-white" },
  sky: { bg: "bg-sky-600 dark:bg-sky-500", text: "text-sky-600 dark:text-sky-500", tagBg: "bg-sky-600 text-white" },
  slate: { bg: "bg-slate-600 dark:bg-slate-500", text: "text-slate-600 dark:text-slate-400", tagBg: "bg-slate-600 text-white" },
  orange: { bg: "bg-orange-600 dark:bg-orange-500", text: "text-orange-600 dark:text-orange-500", tagBg: "bg-orange-600 text-white" },
};

const getShapeClass = (shape: CarouselSliderShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-lg sm:rounded-xl";
    case "rounded": return "rounded-2xl sm:rounded-3xl";
    case "default": return "rounded-3xl sm:rounded-[2.5rem]";
  }
};

const getSpacingClass = (spacing: CarouselSliderSpacing) => {
  switch (spacing) {
    case "2x": return "p-4 md:p-6";
    case "4x": return "p-6 md:p-8";
    case "6x": return "p-8 md:p-12";
    case "8x": return "p-10 md:p-16";
    default: return "p-8 md:p-12";
  }
};

const getHeightClass = (spacing: CarouselSliderSpacing) => {
  switch (spacing) {
    case "2x": return "h-[300px] md:h-[400px]";
    case "4x": return "h-[350px] md:h-[450px]";
    case "6x": return "h-[400px] md:h-[500px]";
    case "8x": return "h-[450px] md:h-[600px]";
    default: return "h-[400px] md:h-[500px]"; // Adjusted to md:h-[500px] instead of md:h-125 for valid tailwind class
  }
};

export const CarouselSlider: React.FC<CarouselSliderProps> = React.memo(({ 
          slides = [], 
          className, 
          autoPlayInterval = 5000,
          showArrows = true,
          showDots = true,
          pauseOnHover = true,
          variant = "modern",
          color = "default",
          shape = "default",
          spacing = "default",
        }) => {
          const [currentIndex, setCurrentIndex] = useState(0);
          const [isPaused, setIsPaused] = useState(false);
          const [direction, setDirection] = useState(0);

          const activeTheme = colorThemeMap[color];
          const shapeClass = getShapeClass(shape);
          const spacingClass = getSpacingClass(spacing);
          const heightClass = getHeightClass(spacing);

          const nextSlide = useCallback(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % slides.length);
          }, [slides.length]);

          const prevSlide = useCallback(() => {
            setDirection(-1);
            setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
          }, [slides.length]);

          useEffect(() => {
            if (!slides.length || isPaused) return;
            const interval = setInterval(nextSlide, autoPlayInterval);
            return () => clearInterval(interval);
          }, [slides.length, autoPlayInterval, isPaused, nextSlide]);

          if (!slides.length) return null;

          const variants: Variants = {
            enter: (direction: number) => ({
              x: direction > 0 ? "100%" : "-100%",
              opacity: 0,
              scale: 1.1,
              filter: "blur(10px)",
            }),
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            },
            exit: (direction: number) => ({
              zIndex: 0,
              x: direction < 0 ? "30%" : "-30%",
              opacity: 0,
              scale: 0.9,
              filter: "blur(5px)",
            }),
          };

          return (
            <div 
              className={cn(
                "group relative w-full max-w-5xl mx-auto overflow-hidden bg-black shadow-2xl", 
                shapeClass,
                heightClass,
                className
              )}
              onMouseEnter={() => pauseOnHover && setIsPaused(true)}
              onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            >
              <div className="hidden">
                {slides.map((slide) => (
                  <Image 
                    key={`preload-${slide.id}`} 
                    src={slide.image} 
                    alt="preload" 
                    width={1200} 
                    height={800} 
                    priority 
                  />
                ))}
              </div>

              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    filter: { duration: 0.4 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={slides[currentIndex].image}
                      alt={slides[currentIndex].title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                  </div>

                  <div className={cn("absolute inset-0 z-20 flex flex-col justify-end text-white pointer-events-none", spacingClass)}>
                    <motion.div
                      initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                      className="flex flex-col gap-3 max-w-2xl"
                    >
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className={cn(
                          "inline-block self-start px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          slides[currentIndex].tagBg || activeTheme.tagBg
                        )}
                      >
                        {slides[currentIndex].tag}
                      </motion.span>
                      
                      <h2 className="text-3xl md:text-6xl font-black leading-tight italic tracking-tighter uppercase">
                        {slides[currentIndex].title}
                      </h2>
                      
                      <div className="flex items-center gap-2 text-xs md:text-sm text-white/80 font-bold italic tracking-wide uppercase">
                        <MapPin size={16} className={activeTheme.text} />
                        {slides[currentIndex].location}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {showArrows && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-4 pointer-events-none">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevSlide}
                    className="pointer-events-auto p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white transition-all duration-300"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextSlide}
                    className="pointer-events-auto p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white transition-all duration-300"
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
              )}

              {showDots && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === currentIndex) return;
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className="relative h-1.5 rounded-full transition-all duration-300 overflow-hidden bg-white/20"
                      style={{ width: currentIndex === idx ? "32px" : "6px" }}
                    >
                      {currentIndex === idx && (
                        <motion.div
                          layoutId="activeDot"
                          className={cn("absolute inset-0", activeTheme.bg)}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
                 <motion.div 
                   key={currentIndex}
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
                   className={cn("h-full", activeTheme.bg)}
                 />
              </div>
            </div>
          );
        });
CarouselSlider.displayName = "CarouselSlider";
