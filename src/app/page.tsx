import React from "react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GlowyButton } from "@/components/ui/glowy-button";
import { Sparkles, Cpu, Shield, Activity, Terminal, Globe } from "lucide-react";
import { AnimatedTerminal } from "@/components/home/animated-terminal";
import { InteractiveFuture } from "@/components/home/interactive-future";
import { HeroSection } from "@/components/home/hero-section";
import { ComponentsMarquee } from "@/components/home/components-marquee";
import { ShowcaseHorizontal } from "@/components/home/showcase-horizontal";
import { Agentation } from "agentation";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body-md overflow-clip selection:bg-secondary/30 relative">
      {process.env.NODE_ENV === "development" && <Agentation />}
      <main className="relative z-10">
        <HeroSection />

        <ShowcaseHorizontal />
        <ComponentsMarquee />

        {/* TECHNICAL STRATUM (Bento Grid) */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <span className="font-mono-label text-xs text-muted-foreground uppercase tracking-widest">Features</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-2">FUTURE UI ECOSYSTEM</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Card: Refractive Interface */}
            <GlassPanel variant="heavy" className="md:col-span-8 p-10 flex flex-col justify-between group overflow-hidden relative min-h-100">
              <div className="space-y-4 relative z-10">
                <Sparkles className="w-8 h-8 text-secondary" />
                <h3 className="font-display text-2xl">Premium Aesthetics</h3>
                <p className="font-display text-muted-foreground max-w-md">
                  Every Future UI component is meticulously crafted with high-end glassmorphism, dynamic glowing effects, and seamless micro-animations.
                </p>
              </div>

              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-1000"></div>

              <div className="relative z-10 mt-12 flex gap-2">
                <span className="font-mono-label text-[10px] border border-white/10 px-2 py-1 rounded text-muted-foreground">TAILWIND_V4</span>
                <span className="font-mono-label text-[10px] border border-white/10 px-2 py-1 rounded text-muted-foreground">FRAMER_MOTION</span>
              </div>
            </GlassPanel>

            {/* Small Card 1: Neural Core */}
            <GlassPanel variant="heavy" className="md:col-span-4 p-10 space-y-6 hover:border-secondary/50 transition-colors duration-500 min-h-100 flex flex-col justify-center">
              <Cpu className="w-8 h-8 text-primary" />
              <h3 className="font-display text-2xl">React 19 Ready</h3>
              <p className="font-display text-muted-foreground">
                Built for the future. Fully compatible with Next.js App Router, Server Components, and React 19 concurrent features.
              </p>
            </GlassPanel>

            {/* Small Card 2: Encrypted Flow */}
            <GlassPanel variant="heavy" className="md:col-span-4 p-10 space-y-6 hover:border-secondary/50 transition-colors duration-500 min-h-100 flex flex-col justify-center">
              <Shield className="w-8 h-8 text-primary" />
              <h3 className="font-display text-2xl">Accessible Foundation</h3>
              <p className="font-display text-muted-foreground">
                Built on top of Radix UI primitives. Ensures your application is fully accessible, keyboard navigable, and perfectly structured.
              </p>
            </GlassPanel>

            {/* Medium Card: Global Telemetry */}
            <GlassPanel variant="heavy" className="md:col-span-8 p-10 flex flex-col md:flex-row items-center gap-10 min-h-100">
              <div className="flex-1 space-y-4">
                <Activity className="w-8 h-8 text-secondary" />
                <h3 className="font-display text-2xl">CLI Distribution</h3>
                <p className="font-display text-muted-foreground">
                  No bloated npm packages. Install exactly what you need directly into your codebase using the custom futureuikit CLI.
                </p>
                <Link href="/components" className="inline-block mt-4">
                  <span className="text-xs font-label-caps text-primary border-b border-white/10 pb-1 hover:border-primary transition-all tracking-widest uppercase">
                    VIEW COMPONENTS
                  </span>
                </Link>
              </div>
              <div className="w-full md:w-64 h-40 glass-mantle rounded-xl flex items-center justify-center overflow-hidden border border-white/5">
                <div className="w-full h-full opacity-30 flex items-end gap-1 px-4 py-4">
                  <div className="bg-primary w-full h-[20%] rounded-t-sm animate-pulse"></div>
                  <div className="bg-secondary w-full h-[60%] rounded-t-sm"></div>
                  <div className="bg-primary w-full h-[40%] rounded-t-sm animate-pulse" style={{ animationDelay: '200ms' }}></div>
                  <div className="bg-primary w-full h-[80%] rounded-t-sm"></div>
                  <div className="bg-secondary w-full h-[30%] rounded-t-sm animate-pulse" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </section>

        {/* CODE PREVIEW */}
        <section className="py-32 px-6 bg-foreground/2 border-y border-border relative">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                  <div className="w-3 h-3 rounded-full bg-muted"></div>
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
                </div>
                <span className="font-mono-label text-xs text-muted-foreground ml-2">terminal</span>
              </div>
              <span className="font-mono-label text-xs text-muted-foreground">bash</span>
            </div>
            <GlassPanel variant="heavy" className="p-1 h-75">
              <AnimatedTerminal />
            </GlassPanel>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-40 px-6 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-secondary/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
              READY TO BUILD THE{" "}
              <InteractiveFuture />
              ?
            </h2>
            <p className="font-display text-lg text-muted-foreground max-w-xl mx-auto">
              Stop building boring websites. Start using Future UI to create stunning, interactive, and highly performant web applications today.
            </p>
            <div className="pt-8">
              <Link href="/components" className="w-full sm:w-auto">
                <GlowyButton asDiv className="h-16 px-12 text-sm font-label-caps tracking-[0.2em] luminous-glow">
                  GET STARTED
                </GlowyButton>
              </Link>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
}
