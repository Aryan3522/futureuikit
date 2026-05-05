/**
 * @registry-slug infinite-slider
 * @registry-name Infinite Carousel Slider
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";

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
 * Optimized for buttery smooth performance and instant image loading.
 */
export const CarouselSlider: React.FC<CarouselSliderProps> = ({ 
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
        "group relative w-full max-w-5xl mx-auto h-[400px] md:h-125 overflow-hidden rounded-3xl bg-black shadow-2xl", 
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Background Preloading Layer (Hidden) */}
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
          {/* Main Slide Image */}
          <div className="relative w-full h-full">
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
            {/* Optimized Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent z-10" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12 text-white pointer-events-none">
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

      {/* Dots Pagination */}
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
                  className="absolute inset-0 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
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
