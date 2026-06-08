"use client";

import React, { useState, useEffect, useCallback, useRef } from"react";
import { motion, AnimatePresence, useMotionValue, useTransform } from"framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from"lucide-react";
import { GlassPanel } from"@/components/ui/glass-panel";

const testimonialsData = [
 {
 id: 1,
 quote:"Future UI completely transformed our development workflow. We replaced 4 different libraries with this single ecosystem.",
 author:"Elena Rodriguez",
 role:"Lead Engineer @ TechNova",
 avatar:"ER",
 rating: 5,
 },
 {
 id: 2,
 quote:"The attention to detail in the micro-animations is unmatched. Our users immediately noticed the premium feel.",
 author:"Marcus Chen",
 role:"Product Designer @ Nexus",
 avatar:"MC",
 rating: 5,
 },
 {
 id: 3,
 quote:"Finally, a component library that treats Framer Motion as a first-class citizen rather than an afterthought.",
 author:"Sarah Jenkins",
 role:"Frontend Architect",
 avatar:"SJ",
 rating: 5,
 },
 {
 id: 4,
 quote:"The CLI distribution model is brilliant. I get exactly the code I need without the bloat of traditional npm packages.",
 author:"David Kim",
 role:"Indie Developer",
 avatar:"DK",
 rating: 5,
 }
];

export function Testimonials() {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [direction, setDirection] = useState(0);
 const [isHovered, setIsHovered] = useState(false);
 const containerRef = useRef<HTMLDivElement>(null);

 // Mouse position for subtle parallax glare on the active card
 const mouseX = useMotionValue(0);
 const mouseY = useMotionValue(0);

 const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
 if (!containerRef.current) return;
 const rect = containerRef.current.getBoundingClientRect();
 mouseX.set(e.clientX - rect.left);
 mouseY.set(e.clientY - rect.top);
 };

 const nextSlide = useCallback(() => {
 setDirection(1);
 setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
 }, []);

 const prevSlide = useCallback(() => {
 setDirection(-1);
 setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
 }, []);

 useEffect(() => {
 if (isHovered) return;
 const timer = setInterval(() => {
 nextSlide();
 }, 6000);
 return () => clearInterval(timer);
 }, [isHovered, nextSlide]);

 const handleDragEnd = (e: any, { offset, velocity }: any) => {
 const swipe = offset.x;
 if (swipe < -50) {
 nextSlide();
 } else if (swipe > 50) {
 prevSlide();
 }
 };

 // 3D variants
 const variants = {
 enter: (direction: number) => ({
 x: direction > 0 ?"50%":"-50%",
 opacity: 0,
 scale: 0.8,
 rotateY: direction > 0 ? 45 : -45,
 filter:"blur(12px)",
 z: -100
 }),
 center: {
 zIndex: 1,
 x: 0,
 opacity: 1,
 scale: 1,
 rotateY: 0,
 filter:"blur(0px)",
 z: 0
 },
 exit: (direction: number) => ({
 zIndex: 0,
 x: direction < 0 ?"50%":"-50%",
 opacity: 0,
 scale: 0.8,
 rotateY: direction < 0 ? 45 : -45,
 filter:"blur(12px)",
 z: -100
 }),
 };

 // Glare effect transforms
 const background = useTransform(
 [mouseX, mouseY],
 ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
 );

 return (
 <section className="py-32 relative overflow-hidden bg-background">
 {/* Abstract Background Elements */}
 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"/>
 <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3"/>

 <div className="max-w-7xl mx-auto px-6 relative z-10">
 
 <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
 <div>
 <span className="font-mono-label text-xs text-secondary uppercase tracking-widest flex items-center gap-2">
 <span className="w-8 h-px bg-secondary/50"/> Testimonials
 </span>
 <h2 className="font-display text-4xl md:text-6xl font-light mt-4 tracking-tight">
 COMMUNITY <span className="font-serif italic text-muted-foreground">VOICES</span>
 </h2>
 </div>
 <div className="flex gap-3">
 <button 
 onClick={prevSlide}
 className="w-12 h-12 rounded-full bg-foreground/5 border border-white/10 flex items-center justify-center hover:bg-foreground/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
 aria-label="Previous testimonial"
 >
 <ChevronLeft className="w-5 h-5"/>
 </button>
 <button 
 onClick={nextSlide}
 className="w-12 h-12 rounded-full bg-foreground/5 border border-white/10 flex items-center justify-center hover:bg-foreground/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
 aria-label="Next testimonial"
 >
 <ChevronRight className="w-5 h-5"/>
 </button>
 </div>
 </div>

 <div 
 className="relative h-[400px] max-w-5xl mx-auto"
 style={{ perspective:"1500px"}}
 onMouseEnter={() => setIsHovered(true)}
 onMouseLeave={() => setIsHovered(false)}
 onMouseMove={handleMouseMove}
 ref={containerRef}
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
 x: { type:"spring", stiffness: 300, damping: 30 },
 opacity: { duration: 0.4 },
 scale: { duration: 0.4 },
 rotateY: { type:"spring", stiffness: 200, damping: 30 },
 z: { duration: 0.4 }
 }}
 drag="x"
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={0.2}
 onDragEnd={handleDragEnd}
 className="absolute inset-0 cursor-grab active:cursor-grabbing"
 style={{ transformStyle:"preserve-3d"}}
 >
 <GlassPanel
 variant="heavy"
 className="w-full h-full rounded-[2rem] p-8 md:p-14 flex flex-col justify-between relative overflow-hidden"
 style={{
 background: isHovered ? background : undefined,
 }}
 >
 {/* Inner Border Glow */}
 <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none"/>
 
 {/* Quote Icon Parallax */}
 <motion.div 
 className="absolute -top-10 -right-10 text-primary/10 pointer-events-none"
 animate={{ 
 rotate: isHovered ? 10 : 0,
 scale: isHovered ? 1.1 : 1
 }}
 transition={{ type:"spring", stiffness: 200, damping: 20 }}
 >
 <Quote className="w-64 h-64 rotate-12"/>
 </motion.div>
 
 <div className="relative z-10 flex-1">
 <div className="flex gap-1 mb-8">
 {[...Array(testimonialsData[currentIndex].rating)].map((_, i) => (
 <Star key={i} className="w-5 h-5 text-secondary fill-secondary"/>
 ))}
 </div>

 <p className="font-display text-2xl md:text-4xl font-light leading-snug text-foreground max-w-3xl">
"{testimonialsData[currentIndex].quote}"
 </p>
 </div>

 <div className="flex items-center gap-5 relative z-10 mt-10">
 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
 <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-display text-xl font-bold">
 {testimonialsData[currentIndex].avatar}
 </div>
 </div>
 <div>
 <h4 className="font-display font-medium text-xl">{testimonialsData[currentIndex].author}</h4>
 <p className="text-secondary text-sm font-mono-label mt-1">{testimonialsData[currentIndex].role}</p>
 </div>
 </div>
 </GlassPanel>
 </motion.div>
 </AnimatePresence>

 {/* Interactive Progress Indicators */}
 <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
 {testimonialsData.map((_, idx) => (
 <button
 key={idx}
 onClick={() => {
 setDirection(idx > currentIndex ? 1 : -1);
 setCurrentIndex(idx);
 }}
 className="relative h-2 rounded-full overflow-hidden transition-all duration-500 bg-white/10"
 style={{ width: currentIndex === idx ?"40px":"8px"}}
 aria-label={`Go to slide ${idx + 1}`}
 >
 {currentIndex === idx && (
 <motion.div
 layoutId="activeTestimonial"
 className="absolute inset-0 bg-secondary"
 transition={{ type:"spring", stiffness: 300, damping: 30 }}
 />
 )}
 </button>
 ))}
 </div>
 </div>

 </div>
 </section>
 );
}
