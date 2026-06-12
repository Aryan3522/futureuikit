"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";

import { AutomotiveCarousel } from "@/components/ui/automotive-carousel";
import { WorkflowBuilder, WorkflowCanvas, WorkflowToolbar, WorkflowMiniMap } from "@/components/ui/workflow-builder";
import { AIChat, ChatMessages, ChatInput, ChatPromptSuggestions } from "@/components/ui/ai-chat";
import { NexusCard } from "@/components/ui/nexus-card";
import { User } from "lucide-react";
import { GlowyButton } from "../ui/glowy-button";

const slides = [
  {
    id: 1,
    title: "THE VISION",
    description: "A masterclass in automotive engineering.",
    annotations: []
  },
  {
    id: 2,
    title: "",
    description: "",
    annotations: [
      { id: "dash-1", position: [0.17, 0.75, 0.65] as [number, number, number], label: "M-Sport Steering Handle" },
      { id: "dash-2", position: [-0.4, 0.95, 0.65] as [number, number, number], label: "14.9-inch Curved Screen" },
      { id: "dash-3", position: [-0.3, 0.65, 0.5] as [number, number, number], label: "Carbon Fiber Gear" },
      { id: "dash-4", position: [-0.9, 0.88, 0.65] as [number, number, number], label: "Carbon Trim Dashboard" }
    ]
  },
  {
    id: 3,
    title: "",
    description: "",
    annotations: [
      { id: "seat-1", position: [0.35, 0.65, -0.15] as [number, number, number], label: "Ergonomic Driver Seat" },
      { id: "seat-2", position: [-0.35, 0.65, -0.15] as [number, number, number], label: "Ventilated Passenger Seat" }
    ]
  },
  {
    id: 4,
    title: "Aerodynamic Perfection",
    description: "Aggressive rear stance featuring the signature LED Taillight Matrix, active aero spoiler, and performance-tuned sport exhaust.",
    annotations: []
  }
];

const showcaseItems = [
  {
    number: "01",
    title: "Automotive 3D",
    category: "THREE.JS / REACT",
    description: "Cinematic automotive showcase with interactive camera paths and premium lighting models.",
    id: "automotive-carousel",
    render: () => (
      <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 relative bg-black/20">
        <AutomotiveCarousel slides={slides} />
      </div>
    )
  },
  {
    number: "02",
    title: "Workflow Builder",
    category: "CANVAS / INTERACTIVE",
    description: "Enterprise-grade node-based builder with infinite canvas, bezier edges, and zoom/pan functionality.",
    id: "workflow-builder",
    render: () => (
      <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 relative bg-black/20">
        <WorkflowBuilder
          variant="glass"
          initialNodes={[
            { id: "1", type: "trigger", position: { x: 50, y: 150 }, data: { label: "Webhook" } },
            { id: "2", type: "agent", position: { x: 300, y: 150 }, data: { label: "AI Processor" } },
            { id: "3", type: "action", position: { x: 550, y: 150 }, data: { label: "Send Email" } }
          ]}
          initialEdges={[
            { id: "e1-2", source: "1", target: "2", animated: true },
            { id: "e2-3", source: "2", target: "3", animated: true }
          ]}
        >
          <WorkflowCanvas />
          <WorkflowToolbar />
          <WorkflowMiniMap />
        </WorkflowBuilder>
      </div>
    )
  },
  {
    number: "03",
    title: "Glowy Button",
    category: "NAVIGATION / UI",
    description: "Lightning-fast fuzzy search palette with keyboard shortcuts and customizable action sets.",
    id: "command-palette",
    render: () => (
      <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 relative bg-black/40 p-8 flex items-center justify-center">
        <div className="flex flex-wrap gap-6 items-center justify-center w-full">
          <GlowyButton variant="primary">Primary</GlowyButton>
          <GlowyButton variant="success">Success</GlowyButton>
          <GlowyButton variant="danger">Danger</GlowyButton>
        </div>
      </div>
    )
  },
  {
    number: "04",
    title: "AI Chat Interface",
    category: "APPLICATION / AI",
    description: "Production-ready chat system with streaming responses, markdown support, and file uploads.",
    id: "ai-chat",
    render: () => {
      const ChatDemo = () => {
        const [input, setInput] = useState("");
        return (
          <AIChat
            layout="chatgpt"
            inputVariant="standard"
            messages={[
              { id: "1", role: "assistant", content: "Hello! How can I help you today?" },
              { id: "2", role: "user", content: "Explain quantum computing in one sentence." },
              { id: "3", role: "assistant", content: "Quantum computing uses subatomic particles to perform complex calculations far faster than current computers." }
            ]}
            input={input}
            setInput={setInput}
            onSubmit={(e) => e.preventDefault()}
          >
            <ChatMessages />
            <ChatPromptSuggestions suggestions={["Hi", "Hola", "Write a poem"]} />
            <ChatInput />
          </AIChat>
        );
      };

      return (
        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 relative bg-black/20">
          <ChatDemo />
        </div>
      );
    }
  },
  {
    number: "05",
    title: "Nexus Card",
    category: "CARDS / MOTION",
    description: "Ultra-premium card with reactive 3D tilt, spotlight glow, and ambient border animations.",
    id: "nexus-card",
    render: () => (
      <div className="w-full h-full flex items-center justify-center p-8 bg-black/10 rounded-2xl overflow-hidden relative">
        <NexusCard className="w-80 h-96 flex flex-col justify-center text-center" variant="neon">
          <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 border border-white/5">
            <User className="w-8 h-8 text-secondary" />
          </div>
          <h4 className="text-xl font-display font-medium text-foreground">Aryan Hooda</h4>
          <p className="text-sm text-muted-foreground font-display">Lead Creative Designer</p>
          <div className="mt-4 flex justify-center gap-2">
            <Badge variant="secondary" className="bg-background/5 border-foreground/20 text-foreground">UI/UX</Badge>
            <Badge variant="secondary" className="bg-background/5 border-foreground/20 text-foreground">Motion</Badge>
          </div>
        </NexusCard>
      </div>
    )
  }
];

export function ShowcaseHorizontal() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!trackRef.current) {
        console.log("TRACK NOT FOUND");
        return;
      }

      console.log(
        "track scrollWidth",
        trackRef.current.scrollWidth
      );

      console.log(
        "track offsetWidth",
        trackRef.current.offsetWidth
      );

      console.log(
        "viewport",
        window.innerWidth
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const trackRef = useRef<HTMLDivElement>(null);

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(showcaseItems.length - 1) * 100}%`]);

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-background z-20">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-background">

        <div className="absolute inset-0 bg-secondary/5 blur-[150px] rounded-full w-[600px] h-[600px] -left-1/4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
        <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full w-[600px] h-[600px] -right-1/4 top-1/4 pointer-events-none opacity-30" />

        <motion.div ref={trackRef} style={{ x }} className="flex h-full items-center w-full">
          {showcaseItems.map((item) => (
            <div
              key={item.id}
              className="w-full h-screen shrink-0 flex items-center justify-center px-6 md:px-12 lg:px-24 relative"
            >
              <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                <div className="lg:col-span-5 space-y-8 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-20%" }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-5xl md:text-7xl font-black text-secondary/10 select-none">
                        {item.number}
                      </span>
                      <Badge variant="default" className="bg-secondary/10 text-secondary border-secondary/20 font-mono-label text-xs py-1.5 px-4">
                        {item.category}
                      </Badge>
                    </div>

                    <h3 className="font-display text-4xl md:text-6xl font-light tracking-tight mb-6">{item.title}</h3>
                    <p className="font-display text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                <div className="lg:col-span-7 h-[500px] md:h-[650px] w-full max-w-full z-10">
                  <GlassPanel
                    variant="heavy"
                    className="w-full h-full p-2 relative group overflow-hidden"
                    glow="subtle"
                  >
                    <item.render />

                    <div className="absolute top-6 right-6 z-50 pointer-events-none">
                      <div className="bg-background/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                        <span className="text-[10px] font-mono-label uppercase tracking-widest text-muted-foreground">LIVE_INSTANCE</span>
                      </div>
                    </div>
                  </GlassPanel>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
          {showcaseItems.map((_, i) => (
            <ProgressDot
              key={i}
              index={i}
              total={showcaseItems.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgressDot({
  index,
  total,
  scrollYProgress
}: {
  index: number;
  total: number;
  scrollYProgress: any
}) {
  const createSafeRange = (start: number, end: number, buffer: number) => {
    const range = [
      Math.max(0, start - buffer),
      Math.max(0, start),
      Math.min(1, end),
      Math.min(1, end + buffer)
    ];
    return range.sort((a, b) => a - b);
  };

  const start = index / total;
  const end = (index + 1) / total;

  const widthRange = [start, end];
  const opacityRange = createSafeRange(start, end, 0.05);

  const width = useTransform(scrollYProgress, widthRange, [12, 40]);
  const opacity = useTransform(scrollYProgress, opacityRange, [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      className="h-1 rounded-full bg-secondary"
      style={{ width, opacity }}
    />
  );
}

