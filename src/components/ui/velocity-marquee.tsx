/**
 * @registry-slug velocity-marquee
 * @registry-name Velocity Marquee
 * @registry-description An interactive marquee grid of glowing cards.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-file src/components/ui/marquee-track.tsx
 */
"use client";

import React from "react";
import MarqueeTrack, { GlowingCard } from "./marquee-track";

const VelocityMarquee = ({ 
  items = [], 
  containerRef 
}: { 
  items: any[];
  containerRef?: React.RefObject<HTMLElement | null>;
}) => {
  return (
    <section className="relative w-full py-12 bg-neutral-50 dark:bg-[#0a0a0a] overflow-hidden">
      {/* Full width interactive marquee */}
      <MarqueeTrack 
        items={items} 
        baseVelocity={-0.05} 
        containerRef={containerRef}
        renderItem={(project: any, i: number, skewX: any, rotateZ: any) => (
          <GlowingCard key={`a-${project.name}-${i}`} item={project} skewX={skewX} rotateZ={rotateZ} />
        )} 
      />
      <MarqueeTrack 
        items={[...items].reverse()} 
        baseVelocity={0.05} 
        containerRef={containerRef}
        renderItem={(project: any, i: number, skewX: any, rotateZ: any) => (
          <GlowingCard key={`b-${project.name}-${i}`} item={project} skewX={skewX} rotateZ={rotateZ} />
        )} 
      />
      
    </section>
  );
};

export default VelocityMarquee;
