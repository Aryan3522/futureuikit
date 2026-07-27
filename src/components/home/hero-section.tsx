import React from "react";
import Link from "next/link";
import { HeroParallaxGlow } from "./hero-parallax-glow";
import { GlowyButton } from "@/components/ui/glowy-button";
import { CopyCommand } from "./copy-command";
import { Magnetic } from "./magnetic";

export function HeroSection({ componentCount = 116 }: { componentCount?: number }) {
  return (
    <section
      aria-label="Hero"
      data-journey="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-6 overflow-hidden"
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
          backgroundSize: "80px 80px",
          opacity: 0.4,
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

      {/* The persistent Journey3D canvas (mounted at page level) provides the
          3D centerpiece behind this section. */}

      {/* Vignette so the text always stays readable over the 3D */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 52%, hsl(var(--background) / 0.55) 0%, transparent 70%)",
        }}
      />

      {/* Hero content — Server-rendered. CSS animations = visible immediately without JS */}
      <div className="relative z-10 text-center max-w-3xl w-full flex flex-col items-center gap-6">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm font-mono-label text-xs text-foreground/60 uppercase tracking-[0.18em]">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" aria-hidden="true" />
          {componentCount}+ components · one command
        </div>

        {/* H1 — The LCP element. Server-rendered, CSS animated, painted immediately */}
        <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.02]">
          BUILDING{" "}
          <span className="text-primary">THE FUTURE.</span>
        </h1>

        {/* Subtext */}
        <p className="hero-sub font-display text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
          A component universe for Next.js and React 19. Copy the source, own
          every line, and ship complete websites — landing pages, dashboards,
          forms, and motion — without leaving your terminal.
        </p>

        {/* Install command */}
        <div className="hero-ctas">
          <CopyCommand command="npx futureuikit init" />
        </div>

        {/* CTAs — magnetic on hover */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center w-full px-4 sm:px-0">
          <Magnetic className="w-full sm:w-auto">
            <Link href="/components" className="block w-full">
              <GlowyButton
                asDiv
                className="h-14 px-10 text-sm font-label-caps tracking-widest stellar-violet-glow w-full"
              >
                START THE JOURNEY
              </GlowyButton>
            </Link>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <Link
              href="/docs"
              className="h-14 w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-white/20 text-foreground font-label-caps text-sm tracking-widest px-10 rounded-full hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-300"
            >
              <span className="pl-[0.1em]">DOCUMENTATION</span>
            </Link>
          </Magnetic>
        </div>

        {/* Stats row */}
        <div className="hero-stats flex flex-wrap items-center justify-center gap-x-10 gap-y-3 pt-4 text-center">
          {[
            { value: `${componentCount}+`, label: "Components" },
            { value: "300+", label: "Icons" },
            { value: "React 19", label: "Ready" },
            { value: "MIT", label: "License" },
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

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground/60"
        aria-hidden="true"
      >
        <span className="font-mono-label text-[10px] uppercase tracking-[0.3em]">Scroll to begin</span>
        <span className="block h-8 w-px bg-gradient-to-b from-muted-foreground/60 to-transparent motion-safe:animate-pulse" />
      </div>
    </section>
  );
}
