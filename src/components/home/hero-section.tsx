import React from"react";
import Link from"next/link";
import { HeroParallaxGlow } from"./hero-parallax-glow";
import { GlowyButton } from"@/components/ui/glowy-button";

export function HeroSection() {
 return (
 <section
 aria-label="Hero"
 className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden"
 >
 {/* Scroll-driven parallax glow — isolated client boundary */}
 <HeroParallaxGlow />

 {/* Decorative grid — pure CSS, zero JS */}
 <div
 className="absolute inset-0 z-0 pointer-events-none"
 aria-hidden="true"
 style={{
 backgroundImage:
"linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
 backgroundSize:"80px 80px",
 opacity: 0.4,
 }}
 />

 {/* Hero content — Server-rendered. CSS animations = visible immediately without JS */}
 <div className="relative z-10 text-center max-w-3xl w-full flex flex-col items-center gap-6">

 {/* Badge */}
 <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm font-mono-label text-xs text-foreground/60 uppercase tracking-[0.18em]">
 <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"aria-hidden="true"/>
 Core Architecture v4.0
 </div>

 {/* H1 — The LCP element. Server-rendered, CSS animated, painted immediately */}
 <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.02]">
 BUILDING{""}
 <span className="text-primary">
 THE FUTURE.
 </span>
 </h1>

 {/* Subtext */}
 <p className="hero-sub font-display text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
 A modern, high-performance UI component library built for Next.js and
 React 19. Engineered with Framer Motion and Tailwind CSS for the next
 era of web design.
 </p>

 {/* CTAs */}
 <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center w-full px-4 sm:px-0">
 <Link href="/components"className="w-full sm:w-auto">
 <GlowyButton
 asDiv
 variant="primary"
 className="h-14 px-10 text-sm font-label-caps tracking-widest stellar-violet-glow w-full"
 >
 BROWSE COMPONENTS
 </GlowyButton>
 </Link>
 <Link
 href="/docs"
 className="h-14 w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-white/20 text-foreground font-label-caps text-sm tracking-widest px-10 rounded-full hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-300"
 >
 <span className="pl-[0.1em]">DOCUMENTATION</span>
 </Link>
 </div>

 {/* Stats row */}
 <div className="hero-stats flex flex-wrap items-center justify-center gap-x-10 gap-y-3 pt-4 text-center">
 {[
 { value:"55+", label:"Components"},
 { value:"React 19", label:"Support"},
 { value:"MIT", label:"License"},
 ].map(({ value, label }) => (
 <div key={label} className="flex flex-col items-center gap-0.5">
 <span className="font-display text-2xl font-semibold text-foreground">
 {value}
 </span>
 <span className="font-mono-label text-[10px] uppercase tracking-widest text-muted-foreground">
 {label}
 </span>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
