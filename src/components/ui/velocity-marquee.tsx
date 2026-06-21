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

export type VelocityMarqueeColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type VelocityMarqueeShape = "default" | "square" | "rounded" | "sharp";
export type VelocityMarqueeSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface VelocityMarqueeProps {
  items: any[];
  containerRef?: React.RefObject<HTMLElement | null>;
  color?: VelocityMarqueeColor;
  shape?: VelocityMarqueeShape;
  spacing?: VelocityMarqueeSpacing;
}

const VelocityMarquee = ({ 
  items = [], 
  containerRef,
  color = "default",
  shape = "default",
  spacing = "default"
}: VelocityMarqueeProps) => {
  return (
    <section className="relative w-full py-12 bg-background overflow-hidden">
      {/* Full width interactive marquee */}
      <MarqueeTrack 
        items={items} 
        baseVelocity={-0.05} 
        containerRef={containerRef}
        color={color}
        shape={shape}
        spacing={spacing}
        renderItem={(project: any, i: number, skewX: any, rotateZ: any) => (
          <GlowingCard key={`a-${project.name}-${i}`} item={project} skewX={skewX} rotateZ={rotateZ} color={color} shape={shape} spacing={spacing} />
        )} 
      />
      <MarqueeTrack 
        items={[...items].reverse()} 
        baseVelocity={0.05} 
        containerRef={containerRef}
        color={color}
        shape={shape}
        spacing={spacing}
        renderItem={(project: any, i: number, skewX: any, rotateZ: any) => (
          <GlowingCard key={`b-${project.name}-${i}`} item={project} skewX={skewX} rotateZ={rotateZ} color={color} shape={shape} spacing={spacing} />
        )} 
      />
      
    </section>
  );
};

export default VelocityMarquee;
