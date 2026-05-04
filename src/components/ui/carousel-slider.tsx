/**
 * @registry-slug infinite-slider
 * @registry-name Infinite Carousel Slider
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

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
}

/**
 * CarouselSlider Component
 * 
 * Upgraded with Framer Motion for premium feel.
 */
export const CarouselSlider: React.FC<CarouselSliderProps> = ({ 
  slides = [], 
  className, 
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  pauseOnHover = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant = "modern"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

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
      scale: 1.05,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "50%" : "-50%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const gpuStyle: React.CSSProperties = {
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform: "translateZ(0)",
  };

  return (
    <div 
      className={cn(
        "group relative w-full max-w-5xl mx-auto h-[500px] overflow-hidden rounded-3xl bg-black shadow-2xl", 
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.3 },
            scale: { duration: 0.5, ease: "easeOut" },
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            ...gpuStyle,
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%), url("${slides[currentIndex].image}")` 
          }}
        >
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white pointer-events-none">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-col gap-3 max-w-2xl"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={cn(
                  "inline-block self-start px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                  slides[currentIndex].tagBg || "bg-primary"
                )}
              >
                {slides[currentIndex].tag}
              </motion.span>
              
              <h2 className="text-3xl md:text-6xl font-black leading-tight italic tracking-tighter uppercase">
                {slides[currentIndex].title}
              </h2>
              
              <div className="flex items-center gap-2 text-xs md:text-sm text-white/80 font-bold italic tracking-wide uppercase">
                <MapPin size={16} className="text-primary" />
                {slides[currentIndex].location}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {showArrows && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-4 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="pointer-events-auto p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40 transition-colors"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="pointer-events-auto p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40 transition-colors"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      )}

      {/* Dots Pagination */}
      {showDots && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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
                  className="absolute inset-0 bg-primary"
                  transition={{ type: "tween", duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
         <motion.div 
           key={currentIndex}
           initial={{ width: "0%" }}
           animate={{ width: "100%" }}
           transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
           className="h-full bg-primary"
         />
      </div>
    </div>
  );
};
