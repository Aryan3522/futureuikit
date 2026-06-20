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
}

const ProjectDeck: React.FC<ProjectDeckProps> = ({ projects, className }) => {
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

  return (
    <section
      className={cn("py-12 md:py-24 lg:py-32 overflow-hidden relative w-full", className)}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Deck */}
        <div className="relative w-full max-w-5xl mx-auto h-[65vh] min-h-[400px] max-h-[600px] flex items-center justify-center perspective-[1200px]">
          {/* Prev button */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 -rotate-90 mb-12 whitespace-nowrap">
              Previous
            </span>
            <button onClick={prevCard}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-2xl z-20"
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
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[2rem] bg-zinc-900 text-white flex flex-col justify-center items-center shadow-2xl border border-zinc-800 overflow-hidden">
                      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                      <div className="relative z-10 text-center px-6">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">
                          Project {project.id}
                        </span>
                        <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter mb-4">
                          {project.title}
                        </h3>
                        <div className={cn(`h-px w-12 mx-auto bg-gradient-to-r`, project.accent)} />
                      </div>
                      <div className="absolute top-8 left-8 font-mono text-[10px] text-zinc-600">{project.id}</div>
                      <div className="absolute bottom-8 right-8 font-mono text-[10px] text-zinc-600 transform rotate-180">{project.id}</div>
                    </div>

                    {/* Card Front (revealed on flip) */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[2rem] bg-black text-white shadow-2xl border border-zinc-800 overflow-hidden flex flex-col">
                      {/* Media */}
                      <div className="relative h-1/2 w-full overflow-hidden bg-zinc-900">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">
                          {project.category}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-6 md:p-8 flex flex-col flex-grow bg-black">
                        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">{project.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6 flex-grow">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((t) => (
                            <span key={t}
                              className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                            >{t}</span>
                          ))}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); window.open(project.url, '_blank', 'noopener,noreferrer'); }}
                          className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors rounded-xl"
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
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 rotate-90 mb-12 whitespace-nowrap">
              Next Project
            </span>
            <button onClick={nextCard}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-2xl z-20"
            >
              <ArrowRight />
            </button>
          </div>

          {/* Mobile nav */}
          <div className="absolute bottom-[20px] w-full flex justify-center gap-4 md:hidden z-20">
            <button onClick={prevCard}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-2xl"
            ><ArrowLeft size={16} /></button>
            <button onClick={nextCard}
              className="px-6 py-3 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 shadow-2xl"
            >Next <ArrowRight size={14} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDeck;
