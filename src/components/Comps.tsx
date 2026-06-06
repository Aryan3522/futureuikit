"use client";

import React, { useState, useMemo, useEffect } from "react";
import { componentsList } from "@/data/component-library-data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check, Copy, ArrowRight, Layers, Sparkles, Droplets, Grid, List, Link as LinkIcon, ChevronRight, PackageCheck, Code2 } from "lucide-react";
import { Search } from "@/components/ui/search";

const TOP_PICKS = ["nexus-card", "glass-panel", "glowy", "cinematic-error", "browser-window", "noir-hero-3d"];

const CATEGORIES_SECTION = [
  { id: "layout", label: "Layout", icon: Layers, description: "Structural foundations built for responsive fluidity and cinematic compositions. 12-column precision." },
  { id: "interactions", label: "Interactions", icon: Sparkles, description: "200ms easing curves and gesture-first logic for weightless feedback and natural state transitions." },
  { id: "visuals", label: "Visuals", icon: Droplets, description: "Refractive shaders and frosted layers that interact with light and depth in real-time environments." }
];

const SIDEBAR_NAV = [
  {
    title: "LIBRARY",
    links: [
      { id: "components", label: "Components Directory" }
    ]
  },
  {
    title: "INTRODUCTION",
    links: [
      { id: "getting-started", label: "Getting Started" },
      { id: "installation", label: "Installation" },
      { id: "philosophy", label: "Core Philosophy" },
    ]
  },
  {
    title: "SYSTEM",
    links: [
      { id: "theming", label: "Theming" },
      { id: "typography", label: "Typography" },
      { id: "colors", label: "Color Palette" },
    ]
  }
];

type ViewMode = "list" | "grid" | "links";

export default function Comps() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("components");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const initTimeout = setTimeout(() => {
      setMounted(true);
      const savedMode = localStorage.getItem("future-ui-view-mode") as ViewMode;
      if (savedMode && ["list", "grid", "links"].includes(savedMode)) {
        setViewMode(savedMode);
      }
    }, 0);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.01,
        y: (e.clientY - window.innerHeight / 2) * 0.01
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem("future-ui-view-mode", mode);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Extract unique categories from componentsList
  const componentCategories = useMemo(() => {
    return Array.from(new Set(componentsList.map((l) => l.type))).sort();
  }, []);

  const topPicksComponents = useMemo(() => {
    return componentsList.filter(c => TOP_PICKS.includes(c.slug));
  }, []);

  const newArrivalsComponents = useMemo(() => {
    return componentsList.filter(c => c.isNew);
  }, []);

  // Filter components by selected category (or show all)
  const displayedComponents = useMemo(() => {
    let filtered = componentsList;
    if (selectedCategory) {
      filtered = filtered.filter(c => c.type === selectedCategory);
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q));
    }
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }, [selectedCategory, searchQuery]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    const category = searchParams.get("category");
    if (tab) setActiveTab(tab);
    if (category) setSelectedCategory(category);
    else setSelectedCategory(null);
  }, [searchParams]);

  return (
    <>
      {/* Noise Background */}
      <div 
        className="fixed inset-0 z-1 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }}
      />

      <div className="w-full relative z-10">
        {/* Main Content Canvas */}
        <div className="flex-1 min-w-0 w-full">
          
          {activeTab === "getting-started" && (
            <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="relative">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
                  <Sparkles size={12} className="text-primary" /> Introduction
                </div>
                <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Getting Started</h1>
                <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
                  Future UI is an enterprise-grade design system and component library engineered for high-performance React 19 and Next.js 16+ applications. Built on absolute control and cinematic aesthetics.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-foreground/3 backdrop-blur-2xl border border-foreground/10 p-8 rounded-xl group hover:border-[#8b5cf6]/50 transition-all duration-300">
                  <div className="flex items-center gap-3 text-foreground font-bold uppercase tracking-tight text-lg mb-4">
                    <Layers size={20} className="text-primary" /> Ownership First
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We believe in full ownership. Unlike traditional UI libraries that ship as bloated npm packages, Future UI utilizes a CLI-first architecture. You download the source code, allowing for infinite customization without versioning conflicts.
                  </p>
                </div>
                <div className="bg-foreground/3 backdrop-blur-2xl border border-foreground/10 p-8 rounded-xl group hover:border-[#8b5cf6]/50 transition-all duration-300">
                  <div className="flex items-center gap-3 text-foreground font-bold uppercase tracking-tight text-lg mb-4">
                    <Droplets size={20} className="text-primary" /> Modern Tech Stack
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Built natively on top of <strong>Tailwind CSS 4.0</strong> and <strong>Framer Motion 12</strong>, our components leverage the absolute latest browser features for smooth GPU-accelerated animations and high-efficiency styling.
                  </p>
                </div>
              </div>

              <section className="space-y-6 pt-12 border-t border-foreground/10">
                <h2 className="font-display text-3xl font-light text-foreground uppercase">Quick Setup</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  The fastest way to get started is using our CLI. It handles all dependencies, configures your tailwind setup, and places the components directly in your workspace.
                </p>
                
                <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
                  <div className="bg-foreground/5 border-b border-foreground/10 px-4 py-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ffb4ab]/40"></div>
                    <div className="w-3 h-3 rounded-full bg-[#571bc1]/40"></div>
                    <div className="w-3 h-3 rounded-full bg-[#c6c6c6]/40"></div>
                    <span className="ml-4 font-mono text-xs text-muted-foreground">terminal</span>
                  </div>
                  <div className="p-6 font-mono text-sm text-foreground/80 overflow-x-auto flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-primary">$</span>
                        <span>npx futureuikit init</span>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="opacity-0">$</span>
                        <span># Configures tailwind, utils, and global css</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => copyText("npx futureuikit init", "gs-init")}
                      className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4"
                    >
                      {copiedId === "gs-init" ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "installation" && (
            <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="relative">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
                  <PackageCheck size={12} className="text-primary" /> Deployment
                </div>
                <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Installation</h1>
                <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
                  Streamlined integration patterns to get your project running in minutes. We recommend using the CLI for automated path alias resolution and dependency management.
                </p>
              </section>

              <div className="space-y-12">
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-primary font-display text-xl">1</div>
                    <h2 className="font-display text-2xl text-foreground uppercase">Initialize Project</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-14">
                    Run the init command at the root of your Next.js project. This will configure <code className="text-foreground/80 bg-foreground/5 px-1.5 py-0.5 rounded">tailwind.config.js</code>, setup the global CSS file, and install required base utilities like <code className="text-foreground/80 bg-foreground/5 px-1.5 py-0.5 rounded">clsx</code> and <code className="text-foreground/80 bg-foreground/5 px-1.5 py-0.5 rounded">tailwind-merge</code>.
                  </p>
                  <div className="ml-14 bg-card border border-foreground/10 rounded-xl overflow-hidden">
                    <div className="bg-foreground/5 border-b border-foreground/10 px-4 py-3 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ffb4ab]/40"></div>
                      <div className="w-3 h-3 rounded-full bg-[#571bc1]/40"></div>
                      <div className="w-3 h-3 rounded-full bg-[#c6c6c6]/40"></div>
                    </div>
                    <div className="p-6 font-mono text-sm text-foreground/80 overflow-x-auto flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-primary">$</span>
                        <span>npx futureuikit init</span>
                      </div>
                      <button 
                        onClick={() => copyText("npx futureuikit init", "inst-init")}
                        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4"
                      >
                        {copiedId === "inst-init" ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-primary font-display text-xl">2</div>
                    <h2 className="font-display text-2xl text-foreground uppercase">Add Components</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-14">
                    Once initialized, you can add individual components to your project. The CLI will automatically install specific dependencies like <code className="text-foreground/80 bg-foreground/5 px-1.5 py-0.5 rounded">framer-motion</code> only when required.
                  </p>
                  <div className="ml-14 bg-card border border-foreground/10 rounded-xl overflow-hidden">
                    <div className="bg-foreground/5 border-b border-foreground/10 px-4 py-3 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ffb4ab]/40"></div>
                      <div className="w-3 h-3 rounded-full bg-[#571bc1]/40"></div>
                      <div className="w-3 h-3 rounded-full bg-[#c6c6c6]/40"></div>
                    </div>
                    <div className="p-6 font-mono text-sm text-foreground/80 overflow-x-auto flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-primary">$</span>
                        <span>npx futureuikit add browser-window</span>
                      </div>
                      <button 
                        onClick={() => copyText("npx futureuikit add browser-window", "inst-add")}
                        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4"
                      >
                        {copiedId === "inst-add" ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </section>

                <div className="ml-14 bg-primary/5 border border-primary/20 p-6 rounded-xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-tight text-sm mb-2">
                    <Code2 size={16} /> Enterprise Prerequisite
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Ensure your <code className="text-foreground font-bold bg-foreground/10 px-1 py-0.5 rounded">tsconfig.json</code> has the <code className="text-primary">@/*</code> path alias configured. The CLI relies on this alias to structure your <code className="text-foreground font-bold bg-foreground/10 px-1 py-0.5 rounded">components/ui/</code> directory perfectly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "philosophy" && (
            <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="relative">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
                  <Layers size={12} className="text-primary" /> Architecture
                </div>
                <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Core Philosophy</h1>
                <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
                  Future UI is not a traditional dependency. It is a curated collection of source code that you copy, paste, and completely own.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-8 rounded-xl group hover:border-[#8b5cf6]/50 transition-all duration-300">
                  <div className="flex items-center gap-3 text-foreground font-bold uppercase tracking-tight text-lg mb-4">
                    <Droplets size={20} className="text-primary" /> Zero Abstraction
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    When you use an npm package for UI, you are locked into the creator&apos;s API. With Future UI, you get the raw React and Tailwind code. If a button needs a specific animation, you just edit the file directly.
                  </p>
                </div>
                <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-8 rounded-xl group hover:border-[#8b5cf6]/50 transition-all duration-300">
                  <div className="flex items-center gap-3 text-foreground font-bold uppercase tracking-tight text-lg mb-4">
                    <Sparkles size={20} className="text-primary" /> Spatial Aesthetics
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our design language relies on depth, lighting, and physics rather than flat colors. We use deep background blurs, sub-pixel borders, and GPU-accelerated motion curves.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "theming" && (
            <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="relative">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
                  <Droplets size={12} className="text-primary" /> Design System
                </div>
                <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Theming</h1>
                <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
                  Tailwind CSS 4.0 natively handles theming via CSS variables. Future UI uses a precise set of variables to control everything from background depth to luminous highlights.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="font-display text-2xl text-foreground uppercase">Global Variables</h2>
                <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
                  <div className="bg-foreground/5 border-b border-foreground/10 px-4 py-3 flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">globals.css</span>
                  </div>
                  <div className="p-6 font-mono text-sm text-foreground/80 overflow-x-auto flex justify-between items-start">
                    <pre>
                      <code className="text-primary">@theme</code> {`{\n  --color-background: #000000;\n  --color-foreground: #e5e2e1;\n  --color-primary: #8b5cf6;\n  --color-surface: rgba(255, 255, 255, 0.03);\n}`}
                    </pre>
                    <button 
                      onClick={() => copyText(`@theme {\n  --color-background: #000000;\n  --color-foreground: #e5e2e1;\n  --color-primary: #8b5cf6;\n  --color-surface: rgba(255, 255, 255, 0.03);\n}`, "theme-vars")}
                      className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4 mt-1"
                    >
                      {copiedId === "theme-vars" ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "typography" && (
            <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="relative">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
                  <LinkIcon size={12} className="text-primary" /> Typography
                </div>
                <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Typography</h1>
                <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
                  Our typographic scale is designed for legibility and cinematic impact. We blend geometric sans-serifs for headings with precise monospace fonts for technical data.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-8 rounded-xl">
                  <h3 className="font-display text-4xl text-foreground mb-4">Display</h3>
                  <p className="text-muted-foreground text-sm mb-6">Used for large headers, hero sections, and cinematic impact. (e.g., Geist or Inter)</p>
                  <div className="p-4 bg-foreground/5 rounded border border-foreground/10 font-mono text-xs text-muted-foreground flex justify-between items-center">
                    <span className="font-display"></span>
                    <button 
                      onClick={() => copyText('className="font-display"', "typo-1")}
                      className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4"
                    >
                      {copiedId === "typo-1" ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-8 rounded-xl">
                  <h3 className="font-mono text-xl text-foreground tracking-widest uppercase mb-4">Monospace</h3>
                  <p className="text-muted-foreground text-sm mb-6">Used for code snippets, tags, version numbers, and technical labels. (e.g., JetBrains Mono)</p>
                  <div className="p-4 bg-foreground/5 rounded border border-foreground/10 font-mono text-xs text-muted-foreground flex justify-between items-center">
                    <span className="font-mono uppercase tracking-widest"></span>
                    <button 
                      onClick={() => copyText('className="font-mono uppercase tracking-widest"', "typo-2")}
                      className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4"
                    >
                      {copiedId === "typo-2" ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "colors" && (
            <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="relative">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
                  <Sparkles size={12} className="text-primary" /> Palette
                </div>
                <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Color Palette</h1>
                <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
                  A foundational dark theme based on absolute black, utilizing transparent whites for depth, and sharp luminous accents to draw focus.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-background border border-foreground/20 p-6 rounded-xl flex flex-col justify-end h-40">
                  <span className="font-bold text-foreground">Absolute Black</span>
                  <span className="font-mono text-xs text-muted-foreground">#000000</span>
                </div>
                <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/20 p-6 rounded-xl flex flex-col justify-end h-40">
                  <span className="font-bold text-foreground">Glass Surface</span>
                  <span className="font-mono text-xs text-muted-foreground">rgba(255,255,255,0.03)</span>
                </div>
                <div className="bg-foreground/10 border border-foreground/20 p-6 rounded-xl flex flex-col justify-end h-40">
                  <span className="font-bold text-foreground">Soft Border</span>
                  <span className="font-mono text-xs text-muted-foreground">rgba(255,255,255,0.1)</span>
                </div>
                <div className="bg-[#8b5cf6] border border-[#8b5cf6] p-6 rounded-xl flex flex-col justify-end h-40">
                  <span className="font-bold text-foreground">Luminous Violet</span>
                  <span className="font-mono text-xs text-foreground/70">#8b5cf6</span>
                </div>
                <div className="bg-[#571bc1] border border-[#571bc1] p-6 rounded-xl flex flex-col justify-end h-40">
                  <span className="font-bold text-foreground">Deep Purple</span>
                  <span className="font-mono text-xs text-foreground/70">#571bc1</span>
                </div>
                <div className="bg-[#ffb4ab] border border-[#ffb4ab] p-6 rounded-xl flex flex-col justify-end h-40">
                  <span className="font-bold text-black">Neon Peach</span>
                  <span className="font-mono text-xs text-black/70">#ffb4ab</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "components" && (
            <>
              {/* Hero Section */}
          <section className="mb-32 relative">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-4 text-foreground uppercase">The Library</h1>
            <p className="font-body-lg text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Explore a meticulously engineered ecosystem of high-fidelity primitives. Designed for performance, built for clarity, and optimized for the next generation of spatial interfaces.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="px-3 py-1 bg-[#353535]/50 border border-foreground/10 rounded-full font-mono text-[10px] font-bold tracking-widest text-foreground/80 uppercase">v0.2.5 STABLE</span>
              <span className="px-3 py-1 bg-[#353535]/50 border border-foreground/10 rounded-full font-mono text-[10px] font-bold tracking-widest text-foreground/80 uppercase">TYPESCRIPT NATIVE</span>
            </div>
          </section>

          {/* Quick Start */}
          <section className="mb-32">
            <div className="bg-foreground/3 backdrop-blur-2xl border border-foreground/10 p-8 rounded-xl relative overflow-hidden group">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[13px] text-muted-foreground">Quick Installation</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ffb4ab]/40"></div>
                  <div className="w-3 h-3 rounded-full bg-[#571bc1]/40"></div>
                  <div className="w-3 h-3 rounded-full bg-[#c6c6c6]/40"></div>
                </div>
              </div>
              <div className="font-mono bg-card/40 p-6 rounded-lg border border-foreground/5 flex items-center justify-between overflow-x-auto">
                <code className="text-primary text-sm whitespace-nowrap mr-4">$ npx futureuikit init</code>
                <button 
                  onClick={() => copyText("npx futureuikit init", "comp-init")}
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none"
                >
                  {copiedId === "comp-init" ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-[#571bc1]/0 via-[#571bc1]/5 to-[#571bc1]/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </section>

          {/* Categories Grid */}
          <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES_SECTION.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="bg-foreground/3 backdrop-blur-2xl border border-foreground/10 p-8 rounded-xl group transition-all duration-300 hover:border-[#8b5cf6]/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-background border border-foreground/10 mb-8 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                    <Icon className="w-6 h-6 text-foreground/80" />
                  </div>
                  <h3 className="font-display text-2xl mb-4 text-foreground">{cat.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cat.description}</p>
                </div>
              );
            })}
          </section>

          {/* Component List */}
          <section>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-foreground/5 pb-6 gap-6">
              <div className="w-full md:w-auto">
                <h2 className="font-display text-4xl font-light text-foreground uppercase tracking-tight mb-3">
                  {selectedCategory ? selectedCategory : "Core Primitives"}
                </h2>
                <p className="text-muted-foreground max-w-lg leading-relaxed">The atomic building blocks of the Future UI ecosystem. Refined for extreme performance and aesthetics.</p>
              </div>
              
              <div className="flex flex-col items-start sm:items-end gap-4 w-full md:w-auto shrink-0">
                <div className="flex items-center justify-between sm:justify-end w-full gap-3 sm:self-end bg-foreground/5 sm:bg-transparent border border-foreground/10 sm:border-transparent p-3 sm:p-0 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></div>
                    <span className="font-mono text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                      Total Components
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-md shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                    {displayedComponents.length}
                  </span>
                </div>

                <div className="flex flex-row items-center gap-2 sm:gap-3 w-full">
                  <div className="relative group flex-1 sm:flex-none sm:w-75 min-w-0">
                    <Search
                      variant="standard"
                      size="md"
                      placeholder="Search components..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      clearable
                      fullWidth
                      className="bg-foreground/2 hover:bg-foreground/4 focus-within:bg-foreground/5 backdrop-blur-xl border-foreground/10 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] focus-within:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                    />
                    <div className="absolute right-2.5 inset-y-0 hidden sm:flex items-center pointer-events-none">
                      <kbd className="inline-flex h-5 items-center gap-1 rounded border border-foreground/10 bg-foreground/5 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                    </div>
                  </div>

                  <div className="flex gap-1 bg-foreground/3 p-1 rounded-xl border border-foreground/10 shrink-0 backdrop-blur-md">
                  <button 
                    onClick={() => handleViewModeChange("list")}
                    className={cn("p-1.5 rounded-md transition-all", viewMode === "list" ? "bg-foreground/10 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground/80 hover:bg-foreground/5")}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                  <button 
                    onClick={() => handleViewModeChange("grid")}
                    className={cn("p-1.5 rounded-md transition-all", viewMode === "grid" ? "bg-foreground/10 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground/80 hover:bg-foreground/5")}
                    title="Grid View"
                  >
                    <Grid size={16} />
                  </button>
                  <button 
                    onClick={() => handleViewModeChange("links")}
                    className={cn("p-1.5 rounded-md transition-all", viewMode === "links" ? "bg-foreground/10 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground/80 hover:bg-foreground/5")}
                    title="Links View"
                  >
                    <LinkIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

            {/* Display Components Based on View Mode */}
            {mounted && (
              <>
                {viewMode === "list" && (
                  <div className="space-y-4">
                    {displayedComponents.map((item, idx) => (
                      <Link 
                        key={idx}
                        href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                        className="block bg-foreground/3 backdrop-blur-2xl border border-foreground/10 p-6 rounded-xl hover:bg-foreground/5 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-display text-xl text-foreground group-hover:text-foreground transition-colors font-semibold tracking-tight">{item.title}</h4>
                                <span className={cn(
                                  "px-2 py-0.5 text-[10px] font-mono font-bold border rounded tracking-widest uppercase",
                                  item.isNew 
                                    ? "bg-[#ffb4ab]/20 text-[#ffb4ab] border-[#ffb4ab]/20" 
                                    : "bg-primary/20 text-primary border-[#d0bcff]/20"
                                )}>
                                  {item.isNew ? "NEW" : "STABLE"}
                                </span>
                              </div>
                              <p className="text-muted-foreground text-sm line-clamp-1 max-w-xl">{item.description}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground/80 transition-colors shrink-0 ml-4 group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {viewMode === "grid" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedComponents.map((item, idx) => (
                      <Link 
                        key={idx}
                        href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                        className="flex flex-col justify-between bg-foreground/3 backdrop-blur-2xl border border-foreground/10 p-6 rounded-xl hover:bg-foreground/5 transition-all cursor-pointer group h-50"
                      >
                        <div>
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="font-display text-xl text-foreground group-hover:text-foreground transition-colors font-semibold tracking-tight">{item.title}</h4>
                            <span className={cn(
                              "px-2 py-0.5 text-[10px] font-mono font-bold border rounded tracking-widest uppercase shrink-0",
                              item.isNew 
                                ? "bg-[#ffb4ab]/20 text-[#ffb4ab] border-[#ffb4ab]/20" 
                                : "bg-primary/20 text-primary border-[#d0bcff]/20"
                            )}>
                              {item.isNew ? "NEW" : "STABLE"}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{item.description}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                           <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground/80 transition-colors shrink-0 group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {viewMode === "links" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4">
                    {displayedComponents.map((item, idx) => (
                      <Link 
                        key={idx}
                        href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                        className="group block"
                      >
                        <div className="flex items-center justify-between py-2 border-b border-foreground/5 group-hover:border-[#571bc1]/50 transition-all">
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all flex items-center gap-2">
                            {item.title}
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                          </span>
                          <span className="text-[10px] uppercase font-bold text-muted-foreground group-hover:text-foreground/80 transition-colors">
                            {item.type}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {displayedComponents.length === 0 && (
                  <div className="py-20 text-center border rounded-3xl border-dashed border-foreground/10 bg-foreground/1">
                    <p className="text-muted-foreground italic uppercase tracking-widest text-sm font-bold opacity-30">No components found in this category.</p>
                  </div>
                )}
              </>
            )}
          </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}
