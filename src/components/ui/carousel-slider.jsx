"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

/**
 * CarouselSlider Component
 * 
 * Upgraded with Framer Motion for premium feel.
 */
export const CarouselSlider = ({ 
  slides = [], 
  className, 
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  pauseOnHover = true,
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

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div 
      className={cn(
        "group relative w-full max-w-5xl mx-auto h-[500px] overflow-hidden rounded-[2rem] bg-black", 
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
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
            scale: { duration: 0.6 },
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%), url("${slides[currentIndex].image}")` 
          }}
        >
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-white">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col gap-4 max-w-3xl"
            >
              <motion.span 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={cn(
                  "inline-block self-start px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]",
                  slides[currentIndex].tagBg || "bg-primary"
                )}
              >
                {slides[currentIndex].tag}
              </motion.span>
              
              <h2 className="text-4xl md:text-7xl font-black leading-[0.95] italic tracking-tighter uppercase">
                {slides[currentIndex].title}
              </h2>
              
              <div className="flex items-center gap-3 text-sm md:text-base text-white/70 font-bold italic tracking-wide uppercase">
                <MapPin size={18} className="text-primary" />
                {slides[currentIndex].location}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {showArrows && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-6 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="pointer-events-auto p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white transition-colors"
          >
            <ChevronLeft size={28} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="pointer-events-auto p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white transition-colors"
          >
            <ChevronRight size={28} />
          </motion.button>
        </div>
      )}

      {/* Dots Pagination */}
      {showDots && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className="relative h-2 rounded-full transition-all duration-300 overflow-hidden bg-white/20"
              style={{ width: currentIndex === idx ? "40px" : "8px" }}
            >
              {currentIndex === idx && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/5 z-20 overflow-hidden">
         <motion.div 
           key={currentIndex}
           initial={{ width: "0%" }}
           animate={{ width: "100%" }}
           transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
           className="h-full bg-primary/50"
         />
      </div>
    </div>
  );
};
