import React from "react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GlowyButton } from "@/components/ui/glowy-button";
import { Sparkles, Cpu, Shield, Activity } from "lucide-react";
import { AnimatedTerminal } from "@/components/home/animated-terminal";
import { InteractiveFuture } from "@/components/home/interactive-future";
import { HeroSection } from "@/components/home/hero-section";
import { ComponentsMarquee } from "@/components/home/components-marquee";
import { LazyShowcase } from "@/components/home/lazy-showcase";
import { JourneyChapter, JourneyProgress } from "@/components/home/journey-chapter";
import { Journey3DLazy } from "@/components/home/journey-3d-lazy";
import { TiltPanel } from "@/components/home/tilt-panel";
import { Stats } from "@/components/ui/stats";
import { FAQ } from "@/components/ui/faq";
import { registryMeta } from "@/data/registryMeta";
import { Agentation } from "agentation";

// Resolved at build time on the server — never shipped to the client.
const COMPONENT_COUNT = Object.keys(registryMeta).length;

const FAQ_ITEMS = [
  {
    question: "What exactly is Future UI?",
    answer:
      "A component universe for Next.js and React 19. Instead of installing a package, the CLI copies each component's full source into your project — you own every line and can change anything.",
  },
  {
    question: "Can I really build a whole website with it?",
    answer:
      "Yes. Beyond primitives (inputs, tables, tabs, dialogs) it ships complete sections — navbars, pricing, bento grids, stats, testimonials, FAQs, CTAs — plus dashboards pieces like sidebars, steppers and date pickers, and 300+ animated icons.",
  },
  {
    question: "How do I install a component?",
    answer:
      "Run `npx futureuikit init` once to set up the theme, then `npx futureuikit add <name>` for any component. Dependencies are detected and installed automatically.",
  },
  {
    question: "Will it slow my site down?",
    answer:
      "No — you only ever ship the components you actually add. There is no runtime library; the source lives in your repo and is tree-shaken and bundled by your own build.",
  },
  {
    question: "Is it free?",
    answer: "MIT licensed. Free for personal and commercial use, no attribution required.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body-md overflow-clip selection:bg-secondary/30 relative">
      {process.env.NODE_ENV === "development" && <Agentation />}
      <Journey3DLazy />
      <JourneyProgress />
      <main className="relative z-10">
        {/* 00 — ARRIVAL */}
        <HeroSection componentCount={COMPONENT_COUNT} />

        {/* 01 — THE RITUAL: one command */}
        <section data-journey="ritual" className="py-32 px-6 relative bg-foreground/2 border-y border-border">
          <div className="max-w-5xl mx-auto">
            <JourneyChapter
              number="01"
              eyebrow="The Ritual"
              title={<>ONE COMMAND. <span className="text-primary">FULL OWNERSHIP.</span></>}
              description="No package to install, no black box to fight. The CLI writes real source files into your project — every component becomes your code."
            />
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

        {/* 02 — THE ARSENAL: live component showcase (heavy 3D — lazy loaded) */}
        <section data-journey="arsenal" className="relative">
          <div className="max-w-7xl mx-auto px-6 pt-32">
            <JourneyChapter
              number="02"
              eyebrow="The Arsenal"
              title={<>NOT SCREENSHOTS. <span className="text-primary">LIVE MACHINES.</span></>}
              description="Everything below is running in your browser right now — 3D showcases, workflow builders, AI chat. Scroll through the gallery."
            />
          </div>
          <LazyShowcase />
        </section>

        {/* 03 — THE NUMBERS */}
        <section data-journey="numbers" className="py-32 px-6 max-w-6xl mx-auto">
          <JourneyChapter
            number="03"
            eyebrow="The Numbers"
            title={<>BUILT TO <span className="text-primary">SCALE.</span></>}
            align="center"
          />
          <Stats
            color="violet"
            variant="divided"
            items={[
              { label: "Components", value: COMPONENT_COUNT, suffix: "+" },
              { label: "Animated icons", value: 300, suffix: "+" },
              { label: "Color themes", value: 10 },
              { label: "Runtime deps shipped", value: 0 },
            ]}
          />
        </section>

        {/* 04 — THE CRAFT (Bento Grid) */}
        <section data-journey="craft" className="py-32 px-6 max-w-7xl mx-auto border-t border-border/50">
          <JourneyChapter
            number="04"
            eyebrow="The Craft"
            title={<>THE FUTURE UI <span className="text-primary">ECOSYSTEM.</span></>}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Card: Refractive Interface */}
            <TiltPanel className="md:col-span-8 rounded-2xl"><GlassPanel variant="heavy" className="h-full p-10 flex flex-col justify-between group overflow-hidden relative min-h-100">
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
            </GlassPanel></TiltPanel>

            {/* Small Card 1: Neural Core */}
            <TiltPanel className="md:col-span-4 rounded-2xl"><GlassPanel variant="heavy" className="h-full p-10 space-y-6 hover:border-secondary/50 transition-colors duration-500 min-h-100 flex flex-col justify-center">
              <Cpu className="w-8 h-8 text-primary" />
              <h3 className="font-display text-2xl">React 19 Ready</h3>
              <p className="font-display text-muted-foreground">
                Built for the future. Fully compatible with Next.js App Router, Server Components, and React 19 concurrent features.
              </p>
            </GlassPanel></TiltPanel>

            {/* Small Card 2: Encrypted Flow */}
            <TiltPanel className="md:col-span-4 rounded-2xl"><GlassPanel variant="heavy" className="h-full p-10 space-y-6 hover:border-secondary/50 transition-colors duration-500 min-h-100 flex flex-col justify-center">
              <Shield className="w-8 h-8 text-primary" />
              <h3 className="font-display text-2xl">Accessible Foundation</h3>
              <p className="font-display text-muted-foreground">
                Built on top of Radix UI primitives. Ensures your application is fully accessible, keyboard navigable, and perfectly structured.
              </p>
            </GlassPanel></TiltPanel>

            {/* Medium Card: Global Telemetry */}
            <TiltPanel className="md:col-span-8 rounded-2xl"><GlassPanel variant="heavy" className="h-full p-10 flex flex-col md:flex-row items-center gap-10 min-h-100">
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
            </GlassPanel></TiltPanel>
          </div>
        </section>

        {/* 05 — THE PEOPLE */}
        <section data-journey="people" className="relative border-t border-border/50">
          <div className="max-w-6xl mx-auto px-6 pt-32 -mb-8">
            <JourneyChapter
              number="05"
              eyebrow="The People"
              title={<>BUILDERS <span className="text-primary">TALK.</span></>}
              align="center"
            />
          </div>
          <ComponentsMarquee />
        </section>

        {/* 06 — THE ANSWERS */}
        <section data-journey="answers" className="py-32 px-6 max-w-3xl mx-auto">
          <JourneyChapter
            number="06"
            eyebrow="The Answers"
            title={<>EVERYTHING YOU&apos;D <span className="text-primary">ASK.</span></>}
            align="center"
          />
          <FAQ items={FAQ_ITEMS} color="violet" variant="card" />
        </section>

        {/* 07 — THE BEGINNING */}
        <section data-journey="beginning" className="py-40 px-6 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-secondary/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <span className="font-mono-label text-xs uppercase tracking-[0.3em] text-violet-400">07 — The Beginning</span>
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
