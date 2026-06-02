"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header } from "@/components/ui/header";
import dynamic from "next/dynamic";
const NoirHero3D = dynamic(
  () =>
    import("@/components/ui/noir-hero-3d").then(
      (mod) => mod.NoirHero3D
    ),
  {
    ssr: false,
    loading: () => <BasicLoader />,
  }
);
import { GlassPanel } from "@/components/ui/glass-panel";
import { GlowyButton } from "@/components/ui/glowy-button";
import { Target, Zap, Sparkles, Cpu, Shield, Activity, Terminal, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BasicLoader } from "@/components/ui/basic-loader";

// --- Animated Terminal Simulator ---
const TERMINAL_STEPS = Object.freeze([
  {
    type: "command",
    text: "npx futureuikit init",
  },
  {
    type: "output",
    text: "✓ Future UI initialized. Global CSS and tailwind.config updated.",
  },
  {
    type: "command",
    text: "npx futureuikit add browser-window",
  },
  {
    type: "output",
    text: "✓ Browser Window added to src/components/ui/browser-window.tsx",
  },
  {
    type: "command",
    text: "npx futureuikit add noir-hero-3d",
  },
  {
    type: "output",
    text: "✓ Noir Hero 3D added. Installed dependencies: three, @react-three/fiber",
  },
  {
    type: "command",
    text: "npm run dev",
  },
  {
    type: "output",
    text: "▲ Next.js 16.2.6 (Turbopack)\n- Local: http://localhost:3000\n- Ready in 143ms",
  },
] as const);

const AnimatedTerminal = React.memo(() => {
  const [lines, setLines] = React.useState<
    { type: string; text: string }[]
  >([]);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [typedCommand, setTypedCommand] = React.useState("");

  useEffect(() => {
    if (currentStep >= TERMINAL_STEPS.length) {
      const timeout = setTimeout(() => {
        setLines([]);
        setCurrentStep(0);
        setTypedCommand("");
      }, 5000);

      return () => clearTimeout(timeout);
    }

    const step = TERMINAL_STEPS[currentStep];

    if (step.type === "command") {
      if (typedCommand.length < step.text.length) {
        const timeout = setTimeout(() => {
          setTypedCommand(
            step.text.slice(0, typedCommand.length + 1)
          );
        }, Math.random() * 40 + 30);

        return () => clearTimeout(timeout);
      }

      const timeout = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          {
            type: "command",
            text: step.text,
          },
        ]);

        setTypedCommand("");
        setCurrentStep((prev) => prev + 1);
      }, 400);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setLines((prev) => [
        ...prev,
        {
          type: "output",
          text: step.text,
        },
      ]);

      setCurrentStep((prev) => prev + 1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentStep, typedCommand]);

  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight;
    }
  }, [lines, typedCommand]);

  const renderOutputLine = (text: string) => {
    if (text.startsWith("✓")) {
      return (
        <>
          <span className="text-[#00ffcc] mr-2">✓</span>
          <span className="text-[#a1a1aa]">
            {text.substring(1)}
          </span>
        </>
      );
    }

    if (text.startsWith("▲")) {
      return (
        <>
          <span className="text-white font-bold mr-2">▲</span>
          <span className="text-[#a1a1aa]">
            {text.substring(1)}
          </span>
        </>
      );
    }

    return (
      <span className="text-[#a1a1aa]">
        {text}
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-[#0a0a0a] rounded-xl overflow-y-auto overflow-x-hidden flex flex-col font-mono text-xs md:text-sm p-6 gap-3 text-left items-start scrollbar-hide shadow-inner"
    >
      {lines.map((line, i) => (
        <div key={i} className="flex gap-4 w-full">
          {line.type === "command" && (
            <span className="text-[#8b5cf6] font-bold shrink-0">
              $
            </span>
          )}

          <div
            className={cn(
              "whitespace-pre-wrap leading-relaxed",
              line.type === "command" && "text-white"
            )}
          >
            {line.type === "command"
              ? line.text
              : renderOutputLine(line.text)}
          </div>
        </div>
      ))}

      {currentStep < TERMINAL_STEPS.length &&
        TERMINAL_STEPS[currentStep].type ===
        "command" && (
          <div className="flex gap-4 w-full">
            <span className="text-[#8b5cf6] font-bold shrink-0">
              $
            </span>

            <span className="text-white">
              {typedCommand}
              <span className="inline-block w-2 h-4 bg-[#8b5cf6] animate-pulse ml-1 align-middle" />
            </span>
          </div>
        )}
    </div>
  );
});

AnimatedTerminal.displayName = "AnimatedTerminal";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div className="min-h-screen bg-background text-foreground font-body-md overflow-x-hidden selection:bg-secondary/30 relative">
      <Header />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 px-6">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute inset-0 z-0 overflow-hidden opacity-60 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[80vw] h-[80vw] max-w-200 max-h-200 bg-secondary/20 rounded-full blur-[150px] opacity-30 mix-blend-screen" />
          </motion.div>

          {/* 3D Centerpiece */}
          <div id="hero-3d-container" className="relative z-10 w-full max-w-125 mx-auto aspect-square mb-8 transition-transform duration-100 ease-out hidden md:block">
            <NoirHero3D className="w-full h-full drop-shadow-[0_0_50px_rgba(139,92,246,0.3)]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 text-center space-y-6 max-w-2xl"
          >
            <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 font-mono-label text-xs text-foreground/70 mb-4 animate-pulse uppercase tracking-[0.2em]">
              Core Architecture v4.0
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight leading-[1.05] luminous-text">
              BUILDING <br /> <span className="text-primary">THE FUTURE.</span>
            </h1>

            <p className="font-display text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A modern, high-performance UI component library built for Next.js and React 19. Engineered with Framer Motion and Tailwind CSS for the next era of web design.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center pt-8 w-full md:w-auto px-4 md:px-0">
              <Link href="/components" className="w-full md:w-auto">
                <GlowyButton variant="primary" className="h-14 px-10 text-sm font-label-caps tracking-widest stellar-violet-glow w-full">
                  BROWSE COMPONENTS
                </GlowyButton>
              </Link>
              <Link href="/docs" className="w-full md:w-auto">
                <button className="h-14 w-full bg-white/5 border border-white/10 backdrop-blur-md text-foreground font-label-caps text-sm tracking-widest px-10 rounded-full hover:bg-white/10 transition-all duration-300">
                  DOCUMENTATION
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

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
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
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
              READY TO BUILD THE <span className="text-secondary italic">FUTURE</span>?
            </h2>
            <p className="font-display text-lg text-muted-foreground max-w-xl mx-auto">
              Stop building boring websites. Start using Future UI to create stunning, interactive, and highly performant web applications today.
            </p>
            <div className="pt-8">
              <Link href="/components">
                <GlowyButton variant="primary" className="h-16 px-12 text-sm font-label-caps tracking-[0.2em] luminous-glow">
                  GET STARTED
                </GlowyButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full py-16 px-6 border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded flex items-center justify-center overflow-hidden">
                <Image src="/Logo.webp" alt="Future UI" width={24} height={24} className="w-full h-full object-cover" />
              </div>
              <span className="font-display text-sm font-bold tracking-widest text-foreground">FUTURE_UI</span>
            </div>
            <p className="font-mono-label text-[10px] text-muted-foreground">© 2026 FUTURE_UI PRECISION SYSTEMS</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/components" className="font-mono-label text-xs text-muted-foreground hover:text-primary transition-colors">Components</Link>
            <Link href="/docs" className="font-mono-label text-xs text-muted-foreground hover:text-primary transition-colors">Laboratory</Link>
            <Link href="/docs" className="font-mono-label text-xs text-muted-foreground hover:text-primary transition-colors">Telemetry</Link>
            <Link href="https://github.com/Aryan3522/future-ui" target="_blank" className="font-mono-label text-xs text-muted-foreground hover:text-primary transition-colors">GitHub</Link>
          </div>

          <div className="flex gap-4">
            <Link
              href="/docs"
              className="w-10 h-10 rounded-full glass-mantle flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-white/5"
            >
              <Terminal className="w-4 h-4" />
            </Link>
            <Link
              href="/components"
              className="w-10 h-10 rounded-full glass-mantle flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-white/5"
            >
              <Globe className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
