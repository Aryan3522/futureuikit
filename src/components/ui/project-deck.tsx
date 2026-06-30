/* eslint-disable @next/next/no-img-element */
/**
 * @registry-slug project-deck
 * @registry-name Project Deck
 * @registry-description A 3D stacked deck of project cards with hover fan-out and flip animation.
 * @registry-category ui
 * @registry-type components:ui
 */

'use client';
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProjectDeckColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ProjectDeckShape = "default" | "square" | "rounded" | "sharp";
export type ProjectDeckSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  media: string;        // video or image path
  type: 'image' | 'video';
  tags: string[];
  accent: string;       // Tailwind gradient e.g. 'from-blue-500 to-violet-500'
}

export interface ProjectDeckProps {
  projects: Project[];
  className?: string;
  color?: ProjectDeckColor;
  shape?: ProjectDeckShape;
  spacing?: ProjectDeckSpacing;
}

const colorThemeMap: Record<ProjectDeckColor, { bgFront: string; bgBack: string; buttonBg: string; buttonText: string; buttonHover: string; borderBack: string; tagBg: string; tagText: string; tagBorder: string }> = {
  default: { bgFront: "bg-black text-white", bgBack: "bg-foreground text-background", buttonBg: "bg-white", buttonText: "text-black", buttonHover: "hover:bg-accent", borderBack: "border-border", tagBg: "bg-zinc-900", tagText: "text-muted-foreground", tagBorder: "border-border" },
  blue: { bgFront: "bg-blue-950 text-blue-50", bgBack: "bg-blue-900 text-white", buttonBg: "bg-blue-500", buttonText: "text-white", buttonHover: "hover:bg-blue-600", borderBack: "border-blue-800", tagBg: "bg-blue-900", tagText: "text-blue-300", tagBorder: "border-blue-800" },
  emerald: { bgFront: "bg-emerald-950 text-emerald-50", bgBack: "bg-emerald-900 text-white", buttonBg: "bg-emerald-500", buttonText: "text-white", buttonHover: "hover:bg-emerald-600", borderBack: "border-emerald-800", tagBg: "bg-emerald-900", tagText: "text-emerald-300", tagBorder: "border-emerald-800" },
  rose: { bgFront: "bg-rose-950 text-rose-50", bgBack: "bg-rose-900 text-white", buttonBg: "bg-rose-500", buttonText: "text-white", buttonHover: "hover:bg-rose-600", borderBack: "border-rose-800", tagBg: "bg-rose-900", tagText: "text-rose-300", tagBorder: "border-rose-800" },
  amber: { bgFront: "bg-amber-950 text-amber-50", bgBack: "bg-amber-900 text-white", buttonBg: "bg-amber-500", buttonText: "text-amber-950", buttonHover: "hover:bg-amber-600", borderBack: "border-amber-800", tagBg: "bg-amber-900", tagText: "text-amber-300", tagBorder: "border-amber-800" },
  violet: { bgFront: "bg-violet-950 text-violet-50", bgBack: "bg-violet-900 text-white", buttonBg: "bg-violet-500", buttonText: "text-white", buttonHover: "hover:bg-violet-600", borderBack: "border-violet-800", tagBg: "bg-violet-900", tagText: "text-violet-300", tagBorder: "border-violet-800" },
  indigo: { bgFront: "bg-indigo-950 text-indigo-50", bgBack: "bg-indigo-900 text-white", buttonBg: "bg-indigo-500", buttonText: "text-white", buttonHover: "hover:bg-indigo-600", borderBack: "border-indigo-800", tagBg: "bg-indigo-900", tagText: "text-indigo-300", tagBorder: "border-indigo-800" },
  sky: { bgFront: "bg-sky-950 text-sky-50", bgBack: "bg-sky-900 text-white", buttonBg: "bg-sky-500", buttonText: "text-sky-950", buttonHover: "hover:bg-sky-600", borderBack: "border-sky-800", tagBg: "bg-sky-900", tagText: "text-sky-300", tagBorder: "border-sky-800" },
  slate: { bgFront: "bg-slate-900 text-slate-50", bgBack: "bg-slate-800 text-white", buttonBg: "bg-slate-200", buttonText: "text-slate-900", buttonHover: "hover:bg-slate-300", borderBack: "border-slate-700", tagBg: "bg-slate-800", tagText: "text-slate-300", tagBorder: "border-slate-700" },
  orange: { bgFront: "bg-orange-950 text-orange-50", bgBack: "bg-orange-900 text-white", buttonBg: "bg-orange-500", buttonText: "text-white", buttonHover: "hover:bg-orange-600", borderBack: "border-orange-800", tagBg: "bg-orange-900", tagText: "text-orange-300", tagBorder: "border-orange-800" },
};

const getShapeClass = (shape: ProjectDeckShape, element: "card" | "button" | "tag" | "nav" = "card") => {
  if (element === "button") {
    switch(shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-sm";
      case "rounded": return "rounded-lg";
      case "default": return "rounded-xl";
    }
  }
  if (element === "tag") {
    switch(shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-[2px]";
      case "rounded": return "rounded-md";
      case "default": return "rounded";
    }
  }
  if (element === "nav") {
    switch(shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-md";
      case "rounded": return "rounded-2xl";
      case "default": return "rounded-full";
    }
  }
  switch(shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-[2rem]";
  }
};

const getSpacingClass = (spacing: ProjectDeckSpacing, element: "container" | "inner" | "button" = "container") => {
  if (element === "inner") {
     switch (spacing) {
       case "2x": return "p-2 md:p-3 gap-2";
       case "4x": return "p-4 md:p-5 gap-4";
       case "6x": return "p-8 md:p-10 gap-8";
       case "8x": return "p-10 md:p-12 gap-10";
       default: return "p-6 md:p-8 gap-6";
     }
  }
  if (element === "button") {
     switch (spacing) {
       case "2x": return "py-1.5 px-3 text-[9px]";
       case "4x": return "py-2 px-4 text-[10px]";
       case "6x": return "py-5 px-8 text-xs";
       case "8x": return "py-6 px-10 text-sm";
       default: return "py-4 text-[10px]";
     }
  }
  switch (spacing) {
    case "2x": return "py-4 md:py-8 lg:py-12";
    case "4x": return "py-8 md:py-16 lg:py-24";
    case "6x": return "py-16 md:py-32 lg:py-40";
    case "8x": return "py-24 md:py-40 lg:py-48";
    default: return "py-12 md:py-24 lg:py-32";
  }
};

const ProjectDeck: React.FC<ProjectDeckProps> = ({ 
  projects, 
  className,
  color = "default",
  shape = "default",
  spacing = "default" 
}) => {
  const [flipped, setFlipped] = useState(false);
  const [isHoveringStack, setIsHoveringStack] = useState(false);
  const [cards, setCards] = useState<number[]>(projects.map((_, i) => i));

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const textX = useTransform(springX, [-1000, 1000], [-100, 100]);
  const textY = useTransform(springY, [-1000, 1000], [-100, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const nextCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlipped(false);
    setCards((prev) => { const n = [...prev]; const t = n.shift(); if (t !== undefined) n.push(t); return n; });
  };

  const prevCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlipped(false);
    setCards((prev) => { const n = [...prev]; const b = n.pop(); if (b !== undefined) n.unshift(b); return n; });
  };

  if (!projects || projects.length === 0) return null;

  const activeTheme = colorThemeMap[color];

  return (
    <section
      className={cn("overflow-hidden relative w-full", getSpacingClass(spacing, "container"), className)}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Deck */}
        <div className="relative w-full max-w-5xl mx-auto h-[65vh] min-h-[400px] max-h-[600px] flex items-center justify-center perspective-[1200px]">
          {/* Prev button */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground -rotate-90 mb-12 whitespace-nowrap">
              Previous
            </span>
            <button onClick={prevCard}
              className={cn("w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform shadow-2xl z-20", getShapeClass(shape, "nav"), color === "default" ? "bg-white text-black" : cn(activeTheme.buttonBg, activeTheme.buttonText, activeTheme.buttonHover))}
            >
              <ArrowLeft />
            </button>
          </div>

          {/* Cards */}
          <div
            className="relative w-full max-w-[400px] md:max-w-[500px] h-full flex items-center justify-center"
            onMouseEnter={() => setIsHoveringStack(true)}
            onMouseLeave={() => setIsHoveringStack(false)}
          >
            {cards.map((projectIndex, stackIndex) => {
              const project = projects[projectIndex];
              const isTop = stackIndex === 0;

              const maxStack = 3;
              const cappedIndex = Math.min(stackIndex, maxStack);

              let scale = 1 - cappedIndex * 0.05;
              let yOffset = cappedIndex * 30;
              let xOffset = 0;
              let rotateZ = 0;
              const opacity = stackIndex >= maxStack ? 0 : 1 - stackIndex * 0.25;
              const zIndex = projects.length - stackIndex;

              if (isHoveringStack && !flipped) {
                if (stackIndex < maxStack) {
                  const multiplier = stackIndex % 2 === 0 ? stackIndex / 2 : -(stackIndex + 1) / 2;
                  xOffset = multiplier * 50;
                  yOffset = Math.abs(multiplier) * 15;
                  rotateZ = multiplier * 6;
                  scale = 1 - stackIndex * 0.02;
                } else {
                  xOffset = 0;
                  yOffset = maxStack * 30;
                  rotateZ = 0;
                  scale = 1 - maxStack * 0.05;
                }
              }

              return (
                <motion.div
                  key={project.id}
                  layout
                  onClick={() => {
                    if (isTop) setFlipped(!flipped);
                    else if (!isTop) nextCard();
                  }}
                  initial={false}
                  animate={{ scale, y: yOffset, x: xOffset, rotateZ, opacity, zIndex }}
                  transition={{ type: 'spring', stiffness: 400, damping: 40, mass: 0.8 }}
                  className="absolute w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] aspect-[3/4] max-h-[100%] cursor-pointer"
                  style={{ perspective: 1500 }}
                >
                  {/* Flip container */}
                  <div
                    className="w-full h-full relative [transform-style:preserve-3d]"
                    style={{
                      willChange: 'transform',
                      transform: isTop && flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                  >
                    {/* Card Back (shown when face-down) */}
                    <div className={cn("absolute inset-0 w-full h-full [backface-visibility:hidden] flex flex-col justify-center items-center shadow-2xl border overflow-hidden", activeTheme.bgBack, activeTheme.borderBack, getShapeClass(shape, "card"))}>
                      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                      <div className="relative z-10 text-center px-6">
                        <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">
                          Project {project.id}
                        </span>
                        <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter mb-4">
                          {project.title}
                        </h3>
                        <div className={cn(`h-px w-12 mx-auto bg-gradient-to-r`, project.accent)} />
                      </div>
                      <div className="absolute top-8 left-8 font-mono text-[10px] text-white/50">{project.id}</div>
                      <div className="absolute bottom-8 right-8 font-mono text-[10px] text-white/50 transform rotate-180">{project.id}</div>
                    </div>

                    {/* Card Front (revealed on flip) */}
                    <div className={cn("absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl border overflow-hidden flex flex-col", activeTheme.bgFront, activeTheme.borderBack, getShapeClass(shape, "card"))}>
                      {/* Media */}
                      <div className="relative h-1/2 w-full overflow-hidden bg-zinc-900/50">
                        {project.type === 'video' && isTop && flipped ? (
                          <video src={project.media} poster={project.media.replace(/\.mp4$/i, '-poster.jpg')}
                            muted loop playsInline autoPlay preload="metadata"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img src={project.type === 'video' ? project.media.replace(/\.mp4$/i, '-poster.jpg') : project.media}
                            alt={project.title} loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">
                          {project.category}
                        </div>
                      </div>

                      {/* Details */}
                      <div className={cn("flex flex-col flex-grow", getSpacingClass(spacing, "inner"))}>
                        <h3 className="font-display text-2xl uppercase tracking-tight mb-0">{project.title}</h3>
                        <p className={cn("text-sm leading-relaxed font-light flex-grow", color === "default" ? "text-muted-foreground" : "opacity-80")}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto pb-4">
                          {project.tags.map((t) => (
                            <span key={t}
                              className={cn("text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-1 border", getShapeClass(shape, "tag"), activeTheme.tagBg, activeTheme.tagText, activeTheme.tagBorder)}
                            >{t}</span>
                          ))}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); window.open(project.url, '_blank', 'noopener,noreferrer'); }}
                          className={cn("flex items-center justify-center gap-2 w-full font-bold uppercase tracking-[0.2em] transition-colors", getShapeClass(shape, "button"), getSpacingClass(spacing, "button"), activeTheme.buttonBg, activeTheme.buttonText, activeTheme.buttonHover)}
                        >
                          Launch Project <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Next button */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground rotate-90 mb-12 whitespace-nowrap">
              Next Project
            </span>
            <button onClick={nextCard}
              className={cn("w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform shadow-2xl z-20", getShapeClass(shape, "nav"), color === "default" ? "bg-white text-black" : cn(activeTheme.buttonBg, activeTheme.buttonText, activeTheme.buttonHover))}
            >
              <ArrowRight />
            </button>
          </div>

          {/* Mobile nav */}
          <div className="absolute bottom-[20px] w-full flex justify-center gap-4 md:hidden z-20">
            <button onClick={prevCard}
              className={cn("w-12 h-12 flex items-center justify-center shadow-2xl", getShapeClass(shape, "nav"), color === "default" ? "bg-black text-white" : cn(activeTheme.buttonBg, activeTheme.buttonText))}
            ><ArrowLeft size={16} /></button>
            <button onClick={nextCard}
              className={cn("px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 shadow-2xl", getShapeClass(shape, "nav"), color === "default" ? "bg-black text-white" : cn(activeTheme.buttonBg, activeTheme.buttonText))}
            >Next <ArrowRight size={14} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDeck;

