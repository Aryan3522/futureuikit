/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * @registry-slug slide-up-reveal
 * @registry-name Slide Up Reveal
 * @registry-description A premium futuristic reveal component that feels like physically lifting a landscape cloth to reveal an OS underneath.
 * @registry-category ui
 * @registry-type components:ui
 */

export type SlideUpRevealColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type SlideUpRevealShape = "default" | "square" | "rounded" | "sharp" | "arc" | "wave" | "curtain" | "silk" | "holographic" | "squircle" | "rectangle";
export type SlideUpRevealSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type SlideUpRevealVariant = "default" | "cyberpunk" | "aurora" | "space" | "neon";

export interface SlideUpRevealProps {
  revealedContent?: React.ReactNode;
  landscapeImage?: string;
  color?: SlideUpRevealColor;
  shape?: SlideUpRevealShape;
  spacing?: SlideUpRevealSpacing;
  className?: string;
  onComplete?: () => void;
  // Kept for backwards compatibility if needed
  variant?: SlideUpRevealVariant;
}

const colorThemeMap: Record<SlideUpRevealColor, { glowRgb: string; gradientTailwind: string }> = {
  default: { glowRgb: "255, 255, 255", gradientTailwind: "from-white/50 via-white/20 to-transparent" },
  blue: { glowRgb: "59, 130, 246", gradientTailwind: "from-blue-500/50 via-blue-500/20 to-transparent" },
  emerald: { glowRgb: "16, 185, 129", gradientTailwind: "from-emerald-500/50 via-emerald-500/20 to-transparent" },
  rose: { glowRgb: "244, 63, 94", gradientTailwind: "from-rose-500/50 via-rose-500/20 to-transparent" },
  amber: { glowRgb: "245, 158, 11", gradientTailwind: "from-amber-500/50 via-amber-500/20 to-transparent" },
  violet: { glowRgb: "139, 92, 246", gradientTailwind: "from-violet-500/50 via-violet-500/20 to-transparent" },
  indigo: { glowRgb: "99, 102, 241", gradientTailwind: "from-indigo-500/50 via-indigo-500/20 to-transparent" },
  sky: { glowRgb: "14, 165, 233", gradientTailwind: "from-sky-500/50 via-sky-500/20 to-transparent" },
  slate: { glowRgb: "100, 116, 139", gradientTailwind: "from-slate-500/50 via-slate-500/20 to-transparent" },
  orange: { glowRgb: "249, 115, 22", gradientTailwind: "from-orange-500/50 via-orange-500/20 to-transparent" },
};

const defaultImages: Record<SlideUpRevealColor, string> = {
  default: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=2000",
  blue: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000",
  emerald: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=2000",
  rose: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=2000",
  amber: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=2000",
  violet: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2000",
  indigo: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2000",
  sky: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000",
  slate: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=2000",
  orange: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=2000",
};

function resolveClothShape(shape: SlideUpRevealShape) {
  if (shape === "default") return "squircle";
  if (shape === "square" || shape === "sharp") return "rectangle";
  if (shape === "rounded") return "rounded";
  return shape;
}

function generateClothPath(shape: string, w: number, h: number, dragY: number): string {
  if (w === 0 || h === 0) return `M 0 0 L 2000 0 L 2000 2000 Z`;

  // dragY is negative when dragging up. Lift is positive magnitude.
  const lift = Math.max(0, -dragY);
  const progress = Math.min(1, lift / (h * 0.6)); // Normalized progress 0 to 1

  // The TOP edge must NEVER move. It is permanently attached to Y = 0.
  let d = `M 0 0 L ${w} 0 `;

  if (shape === "rectangle") {
    const sideLift = lift * 0.1;
    const centerLift = lift;
    const rightY = h - sideLift;
    const leftY = h - sideLift;
    const cpy = h - centerLift; 
    d += `L ${w} ${rightY} Q ${w/2} ${cpy} 0 ${leftY} Z`;
  }
  else if (shape === "arc") {
    const sideLift = 0;
    const rightY = h - sideLift;
    const leftY = h - sideLift;
    const cpy = h - lift * 2.5; 
    d += `L ${w} ${rightY} Q ${w/2} ${cpy} 0 ${leftY} Z`;
  }
  else if (shape === "rounded") {
    const sideLift = lift * 0.3;
    const centerLift = lift;
    const rightY = h - sideLift;
    const leftY = h - sideLift;
    const cpy = h - (centerLift * 1.3); 
    d += `L ${w} ${rightY} Q ${w/2} ${cpy} 0 ${leftY} Z`;
  }
  else if (shape === "squircle") {
    const sideLift = lift * 0.15;
    const rightY = h - sideLift;
    const leftY = h - sideLift;
    const cp1x = w * 0.8;
    const cp1y = h - lift * 1.5;
    const cp2x = w * 0.2;
    const cp2y = h - lift * 1.5;
    d += `L ${w} ${rightY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, 0 ${leftY} Z`;
  }
  else if (shape === "silk") {
    const sideLiftR = lift * 0.3;
    const sideLiftL = lift * 0.05;
    const rightY = h - sideLiftR;
    const leftY = h - sideLiftL;
    const cp1x = w * 0.6;
    const cp1y = h - lift * 0.7;
    const cp2x = w * 0.3;
    const cp2y = h - lift * 1.8;
    d += `L ${w} ${rightY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, 0 ${leftY} Z`;
  }
  else if (shape === "wave") {
    const sideLift = lift * 0.15;
    const points = [];
    const waves = 5;
    for (let i = 0; i <= 30; i++) {
       const px = w - (w * (i / 30)); 
       const normalizedX = px / w;
       // Sine wave amplitude increases with lift
       const amp = 35 * progress * Math.sin(normalizedX * Math.PI * waves);
       const centerFactor = Math.sin(normalizedX * Math.PI);
       const baseLift = sideLift + (lift - sideLift) * centerFactor;
       const py = h - baseLift + amp;
       points.push(`${px} ${py}`);
    }
    d += `L ${w} ${h - sideLift} ` + points.map((p, i) => i === 0 ? '' : `L ${p}`).join(' ') + ` L 0 ${h - sideLift} Z`;
  }
  else if (shape === "curtain") {
    const points = [];
    const folds = 4;
    for (let i = 0; i <= 40; i++) {
       const px = w - (w * (i / 40)); 
       const normalizedX = px / w;
       const centerFactor = Math.sin(normalizedX * Math.PI);
       const baseLift = lift * centerFactor;
       
       // Scalloped edges (absolute value of sine)
       const foldAmp = 30 * progress * Math.abs(Math.sin(normalizedX * Math.PI * folds));
       const py = h - baseLift + foldAmp;
       points.push(`${px} ${py}`);
    }
    d += `L ${w} ${h} ` + points.map((p, i) => i === 0 ? '' : `L ${p}`).join(' ') + ` L 0 ${h} Z`;
  }
  else if (shape === "holographic") {
    const sideLift = lift * 0.2;
    const points = [];
    for (let i = 0; i <= 30; i++) {
       const px = w - (w * (i / 30)); 
       const normalizedX = px / w;
       const centerFactor = Math.sin(normalizedX * Math.PI);
       const baseLift = sideLift + (lift - sideLift) * centerFactor;
       
       // Glitch logic (pseudo-random deterministic offset)
       const glitch = (Math.sin(progress * 150 + i * 17) * 25 * progress) + (Math.cos(progress * 80 + i * 7) * 15 * progress);
       const py = h - baseLift + glitch;
       points.push(`${px} ${py}`);
    }
    d += `L ${w} ${h - sideLift} ` + points.map((p, i) => i === 0 ? '' : `L ${p}`).join(' ') + ` L 0 ${h - sideLift} Z`;
  }

  return d;
}

const getSpacingClass = (spacing: SlideUpRevealSpacing) => {
  switch(spacing) {
    case "2x": return "p-4 gap-4";
    case "4x": return "p-6 gap-6";
    case "6x": return "p-12 gap-10";
    case "8x": return "p-16 gap-12";
    default: return "p-8 gap-8";
  }
}

const DefaultRevealedContent = ({ color, spacing }: { color: SlideUpRevealColor, spacing: SlideUpRevealSpacing }) => {
  const activeTheme = colorThemeMap[color];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className={cn("relative z-10 flex flex-col items-center max-w-xl text-center", getSpacingClass(spacing))}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-4xl md:text-6xl font-light tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            SYSTEM ONLINE
          </h1>
          <div className={cn("h-[1px] w-24 bg-gradient-to-r", activeTheme.gradientTailwind)} />
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm tracking-widest hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">ENTER</span>
          <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r", activeTheme.gradientTailwind)} />
        </motion.button>
      </div>
    </div>
  );
};

const TripleChevronIcon = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col items-center justify-center gap-1.5", className)}>
    <svg width="40" height="14" viewBox="0 0 32 12" fill="none" className="opacity-30">
      <path d="M2 10L16 2L30 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <svg width="40" height="14" viewBox="0 0 32 12" fill="none" className="opacity-60">
      <path d="M2 10L16 2L30 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <svg width="40" height="14" viewBox="0 0 32 12" fill="none" className="opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
      <path d="M2 10L16 2L30 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export function SlideUpReveal({ 
  revealedContent,
  landscapeImage,
  color = "default",
  shape = "default",
  spacing = "default",
  variant, // Kept for backwards compatibility
  className,
  onComplete
}: SlideUpRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  
  // Timeline State: "idle" | "dragging" | "flashing" | "revealed"
  const [phase, setPhase] = useState<"idle" | "dragging" | "flashing" | "revealed">("idle");
  
  const widthMv = useMotionValue(0);
  const heightMv = useMotionValue(0);

  const activeColor: SlideUpRevealColor = variant === "cyberpunk" ? "blue" :
                                          variant === "aurora" ? "emerald" :
                                          variant === "space" ? "indigo" :
                                          variant === "neon" ? "rose" : color;

  const finalImage = landscapeImage || defaultImages[activeColor] || defaultImages.default;
  const { glowRgb } = colorThemeMap[activeColor];
  const actualClothShape = resolveClothShape(shape);

  const clipId = React.useId().replace(/:/g, "-");

  const y = useMotionValue(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        widthMv.set(entry.contentRect.width);
        heightMv.set(entry.contentRect.height);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [widthMv, heightMv]);

  const clipPathD = useTransform(() => {
    return generateClothPath(actualClothShape, widthMv.get(), heightMv.get(), y.get());
  });

  // Lighting System Evolution
  const coreGlowOpacity = useTransform(() => {
    const h = heightMv.get() || 1000;
    const progress = Math.min(1, Math.max(0, -y.get() / (h * 0.6)));
    return progress * 1; // Peaks at 100%
  });

  const coreGlowScale = useTransform(() => {
    const h = heightMv.get() || 1000;
    const progress = Math.min(1, Math.max(0, -y.get() / (h * 0.6)));
    return 0.5 + progress * 2.0; // Grows from 0.5 to 2.5
  });
  
  const coreGlowY = useTransform(() => {
    const dragY = y.get();
    return dragY * 0.15; // Follows the lift slightly
  });

  const rayOpacity = useTransform(() => {
    const h = heightMv.get() || 1000;
    const progress = Math.min(1, Math.max(0, -y.get() / (h * 0.6)));
    return progress > 0.3 ? (progress - 0.3) * 1.5 : 0; 
  });

  const chevronOpacity = useTransform(y, [0, -100], [1, 0]);

  const handleDragStart = () => {
    if (phase === "idle") setPhase("dragging");
  };

  const handleDragEnd = async (event: any, info: any) => {
    const currentY = y.get();
    const h = heightMv.get() || 800;
    const threshold = h * 0.45;
    const velocity = info.velocity.y;

    if (currentY < -threshold || velocity < -800) {
      triggerCompletion();
    } else {
      animate(y, 0, { type: "spring", stiffness: 300, damping: 25, mass: 1 });
      setPhase("idle");
    }
  };

  const triggerCompletion = async () => {
    if (phase === "flashing" || phase === "revealed") return;
    setPhase("flashing");

    const h = heightMv.get() || 800;

    // 1. Cloth violently rips up and disappears
    animate(y, -h * 2, { 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      mass: 0.5
    });

    // 2. Cinematic Flash
    setTimeout(() => {
      // Flash covers the screen
      const flash = document.getElementById(`flash-${clipId}`);
      if (flash) {
        flash.style.opacity = "1";
      }
      
      // 3. Let flash linger, then fade to revealed content
      setTimeout(() => {
        setPhase("revealed");
        if (flash) flash.style.opacity = "0";
        onComplete?.();
      }, 300);
    }, 150);
  };

  const isCompleted = phase === "revealed";

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full h-full overflow-hidden bg-black select-none touch-none", className)}
    >
      {/* Revealed Content Layer (ONLY shown after flash) */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            {revealedContent || <DefaultRevealedContent color={activeColor} spacing={spacing} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Flash Layer (Handled manually via element ID for exact timeline sync) */}
      <div 
        id={`flash-${clipId}`}
        className="absolute inset-0 z-50 bg-white pointer-events-none opacity-0 transition-opacity duration-300"
      />

      {/* Physics Layers: ONLY shown while dragging/idle */}
      {!isCompleted && (
        <>
          {/* Energy Reactor Lighting System */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-end justify-center">
            {/* Core Bloom */}
            <motion.div
              style={{
                width: "80%",
                height: "60%",
                y: coreGlowY,
                scale: coreGlowScale,
                opacity: coreGlowOpacity,
                background: `radial-gradient(ellipse at bottom center, rgba(${glowRgb}, 0.9) 0%, rgba(${glowRgb}, 0.3) 40%, transparent 70%)`,
                filter: "blur(60px)",
                mixBlendMode: "screen",
                transformOrigin: "bottom center"
              }}
            />
            {/* Volumetric Rays */}
            <motion.div
              className="absolute inset-0 origin-bottom"
              style={{
                opacity: rayOpacity,
                background: `
                  linear-gradient(95deg, transparent 35%, rgba(${glowRgb}, 0.15) 45%, rgba(${glowRgb}, 0.25) 50%, rgba(${glowRgb}, 0.15) 55%, transparent 65%),
                  linear-gradient(265deg, transparent 35%, rgba(${glowRgb}, 0.1) 45%, rgba(${glowRgb}, 0.2) 50%, rgba(${glowRgb}, 0.1) 55%, transparent 65%)
                `,
                filter: "blur(10px)",
                mixBlendMode: "screen"
              }}
            />
          </div>

          {/* The Cloth (Image) */}
          <svg width="0" height="0" className="absolute pointer-events-none">
            <defs>
              <clipPath id={`cloth-clip-${clipId}`}>
                <motion.path d={clipPathD} />
              </clipPath>
            </defs>
          </svg>

          <motion.div
            className="absolute inset-0 z-20 pointer-events-none bg-zinc-900"
            style={{ 
              clipPath: `url(#cloth-clip-${clipId})`,
              WebkitClipPath: `url(#cloth-clip-${clipId})`
            }}
          >
            {imageError ? (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950" />
            ) : (
              <img 
                src={finalImage} 
                alt="Landscape Cloth" 
                onError={() => setImageError(true)}
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none brightness-75"
              />
            )}
            {/* Gradient overlay to ensure chevron visibility on bright backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80" />
          </motion.div>

          {/* Drag Target Area (Bottom 25%) */}
          <motion.div
            drag="y"
            dragConstraints={{ top: -3000, bottom: 0 }}
            dragElastic={0.05}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ y }}
            className="absolute inset-x-0 bottom-0 h-[25%] z-30 cursor-grab active:cursor-grabbing flex items-center justify-center pb-8"
          >
            {/* Chevrons strictly styled as per requirements: No background, no button styling */}
            <motion.div 
              className="text-white relative pointer-events-none"
              style={{ opacity: chevronOpacity }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <TripleChevronIcon />
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
}

