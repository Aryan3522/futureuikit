"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Star } from "lucide-react";

const testimonialsData = [
  {
    id: 1,
    quote: "Future UI completely transformed our development workflow. We replaced 4 different libraries with this single ecosystem.",
    author: "Elena Rodriguez",
    role: "Lead Engineer @ TechNova",
    avatar: "ER",
    rating: 5,
  },
  {
    id: 2,
    quote: "The attention to detail in the micro-animations is unmatched. Our users immediately noticed the premium feel.",
    author: "Marcus Chen",
    role: "Product Designer @ Nexus",
    avatar: "MC",
    rating: 5,
  },
  {
    id: 3,
    quote: "Finally, a component library that treats Framer Motion as a first-class citizen rather than an afterthought.",
    author: "Sarah Jenkins",
    role: "Frontend Architect",
    avatar: "SJ",
    rating: 5,
  },
  {
    id: 4,
    quote: "The CLI distribution model is brilliant. I get exactly the code I need without the bloat of traditional npm packages.",
    author: "David Kim",
    role: "Indie Developer",
    avatar: "DK",
    rating: 5,
  }
];

// Duplicate list for seamless infinite scroll (repeating enough times to fill large screens)
const marqueeComponents = [...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData];

const MarqueeRow = ({ items, reverse = false, speed = 40 }: { items: typeof testimonialsData, reverse?: boolean, speed?: number }) => {
  const baseX = useMotionValue(0);

  useAnimationFrame((time, delta) => {
    let moveBy = reverse ? speed * (delta / 1000) : -speed * (delta / 1000);
    let x = baseX.get() + moveBy;

    // Reset loop
    // Approximate width of 4 items + gaps: each item is ~320px wide + 24px gap = 344px. 4 items = 1376px.
    const loopWidth = 1376;

    if (x <= -loopWidth) {
      x += loopWidth;
    } else if (x >= 0 && reverse) {
      x -= loopWidth;
    }

    baseX.set(x);
  });

  return (
    <div className="flex gap-6 relative" style={{ width: "fit-content" }}>
      <motion.div className="flex gap-6" style={{ x: baseX }}>
        {items.map((item, index) => {
          return (
            <div key={`${item.id}-${index}`}>
              <GlassPanel
                variant="mantle"
                className="w-[320px] p-6 h-full flex flex-col justify-between shrink-0"
                glow="subtle"
              >
                <div className="flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                    ))}
                  </div>
                  <p className="font-display text-lg font-light leading-snug text-foreground flex-1 mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[1px]">
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-display text-sm font-bold">
                        {item.avatar}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-sm">{item.author}</h4>
                      <p className="text-secondary text-[10px] font-mono-label mt-0.5">{item.role}</p>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export function ComponentsMarquee() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-secondary/5 blur-[120px] rounded-full w-[500px] h-[500px] -left-64 top-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <span className="font-mono-label text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-px bg-secondary/50" /> Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light mt-2">COMMUNITY VOICES</h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex flex-col gap-6">
            {/* Row 1 */}
            <div className="w-full relative flex">
              <MarqueeRow items={marqueeComponents} speed={60} />
            </div>

            {/* Row 2 */}
            <div className="w-full relative flex">
              {/* Start Row 2 slightly shifted by reversing and giving different slice start if desired, or just same items */}
              <MarqueeRow items={marqueeComponents.slice(2).concat(marqueeComponents.slice(0, 2))} reverse speed={50} />
            </div>
          </div>

          {/* Premium Fade Masks - Aligned with container boundaries */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
