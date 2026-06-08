"use client";

import React, { useRef } from"react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from"framer-motion";
import { GlassPanel } from"@/components/ui/glass-panel";
import { rawComponentsList } from"@/data/component-library-data";
import { Sparkles, Terminal, Box, Circle, Triangle, Hexagon, Star, Shield, Layout, Palette } from"lucide-react";
import Link from"next/link";

// Icons for variety
const icons = [Sparkles, Terminal, Box, Circle, Triangle, Hexagon, Star, Shield, Layout, Palette];

// Duplicate list for seamless infinite scroll
const marqueeComponents = [...rawComponentsList.slice(0, 8), ...rawComponentsList.slice(0, 8), ...rawComponentsList.slice(0, 8)];

const MarqueeRow = ({ items, reverse = false, speed = 40 }: { items: typeof rawComponentsList, reverse?: boolean, speed?: number }) => {
 const baseX = useMotionValue(0);

 useAnimationFrame((time, delta) => {
 let moveBy = reverse ? speed * (delta / 1000) : -speed * (delta / 1000);
 let x = baseX.get() + moveBy;
 
 // Reset loop
 // Approximate width of 8 items + gaps: each item is ~320px wide + 24px gap = ~344px. 8 items = ~2752px.
 // When it reaches -2752 (or positive if reverse), snap back.
 const loopWidth = 2752; 
 
 if (x <= -loopWidth) {
 x += loopWidth;
 } else if (x >= 0 && reverse) {
 x -= loopWidth;
 }
 
 baseX.set(x);
 });

 return (
 <div className="flex gap-6 relative"style={{ width:"fit-content"}}>
 <motion.div className="flex gap-6"style={{ x: baseX }}>
 {items.map((item, index) => {
 const Icon = icons[index % icons.length];
 return (
 <Link key={`${item.id}-${index}`} href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}>
 <GlassPanel 
 variant="mantle"
 className="w-[320px] p-6 h-full hover:border-primary/50 transition-colors duration-300 flex flex-col justify-between shrink-0 cursor-pointer"
 glow="subtle"
 >
 <div className="space-y-4">
 <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
 <Icon className="w-5 h-5 text-secondary"/>
 </div>
 <div>
 <h4 className="font-display text-xl font-medium text-foreground">{item.title}</h4>
 <p className="font-mono-label text-xs text-muted-foreground uppercase tracking-widest mt-1">
 {item.category}
 </p>
 </div>
 <p className="text-muted-foreground text-sm line-clamp-2">
 {item.description}
 </p>
 </div>
 </GlassPanel>
 </Link>
 );
 })}
 </motion.div>
 </div>
 );
};

export function ComponentsMarquee() {
 return (
 <section className="py-24 relative overflow-hidden bg-background">
 <div className="absolute inset-0 bg-secondary/5 blur-[120px] rounded-full w-[500px] h-[500px] -left-64 top-1/2 -translate-y-1/2 pointer-events-none"/>
 
 <div className="max-w-7xl mx-auto px-6 mb-12">
 <span className="font-mono-label text-xs text-muted-foreground uppercase tracking-widest">Library</span>
 <h2 className="font-display text-4xl md:text-5xl font-light mt-2">PREMIUM COMPONENTS</h2>
 </div>

 <div className="relative w-full overflow-hidden flex flex-col gap-6">
 {/* Row 1 */}
 <div className="w-full relative flex">
 <MarqueeRow items={marqueeComponents} speed={60} />
 </div>
 
 {/* Row 2 */}
 <div className="w-full relative flex">
 <MarqueeRow items={marqueeComponents.slice(4).concat(marqueeComponents.slice(0, 4))} reverse speed={50} />
 </div>
 
 {/* Gradient Overlays for smooth fade out at edges */}
 <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none"/>
 <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none"/>
 </div>
 </section>
 );
}
