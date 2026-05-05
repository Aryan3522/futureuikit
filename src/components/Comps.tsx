"use client";

import React, { useState, useMemo } from "react";
import { componentsList } from "@/data/component-library-data";
import { DotBackground } from "@/components/ui/dot-background";
import { SidebarButton } from "@/components/ui/sidebar-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, Code2, Rocket, Layers, Cpu, Settings2, PackageCheck } from "lucide-react";

type Tab = "getting-started" | "docs" | "installation" | "components";

const Comps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("components");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => 
    ["All", ...Array.from(new Set(componentsList.map((l) => l.type)))],
    []
  );

  const filteredComponents = useMemo(() => 
    selectedCategory === "All"
      ? componentsList
      : componentsList.filter((item) => item.type === selectedCategory),
    [selectedCategory]
  );

  // Split components into 3 lists for the 3-column layout
  const componentColumns = useMemo(() => {
    const cols: typeof componentsList[] = [[], [], []];
    filteredComponents.forEach((item, i) => {
      cols[i % 3].push(item);
    });
    return cols;
  }, [filteredComponents]);

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <DotBackground dotColor="var(--primary)" maskOpacity={0.02} />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 md:px-8 flex gap-12 pt-24 pb-20">
        {/* Sticky Sidebar */}
        <aside className="hidden md:block w-56 shrink-0 h-fit sticky top-16 overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-hide py-10">
          <div className="space-y-8">
            <div className="space-y-1">
              <h4 className="text-[10px] uppercase tracking-widest font-black text-foreground/40 mb-3 px-2">Resources</h4>
              <SidebarButton 
                label="Getting Started" 
                isActive={activeTab === "getting-started"} 
                onClick={() => setActiveTab("getting-started")} 
              />
              <SidebarButton 
                label="Documentation" 
                isActive={activeTab === "docs"} 
                onClick={() => setActiveTab("docs")} 
              />
              <SidebarButton 
                label="Installation" 
                isActive={activeTab === "installation"} 
                onClick={() => setActiveTab("installation")} 
              />
            </div>

            <div className="space-y-1">
              <h4 className="text-[10px] uppercase tracking-widest font-black text-foreground/40 mb-3 px-2">Categories</h4>
              {categories.map((cat) => (
                <SidebarButton 
                  key={cat}
                  label={cat} 
                  isCategory
                  isActive={activeTab === "components" && selectedCategory === cat} 
                  onClick={() => {
                    setActiveTab("components");
                    setSelectedCategory(cat);
                  }} 
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {activeTab === "getting-started" && (
            <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                  <Rocket size={12} /> Introduction
                </div>
                <h1 className="text-5xl font-black italic tracking-tighter uppercase text-foreground">Getting Started</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Future UI is an enterprise-grade design system and component library engineered for high-performance React 19 and Next.js 15+ applications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold italic uppercase tracking-tight text-lg">
                    <Layers size={20} /> Philosophy
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We believe in <strong>full ownership</strong>. Unlike traditional UI libraries that ship as bloated npm packages, Future UI utilizes a CLI-first architecture. You download the source code, allowing for infinite customization without versioning conflicts.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold italic uppercase tracking-tight text-lg">
                    <Cpu size={20} /> Technology Stack
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Built on top of <strong>Tailwind CSS 4.0</strong> and <strong>Framer Motion 12</strong>, our components leverage modern browser features for smooth GPU-accelerated animations and high-efficiency styling.
                  </p>
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-border/50">
                <h2 className="text-2xl font-black italic tracking-tight uppercase">Core Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Zero-Bundle Bloat (Copy/CLI based)",
                    "Native TypeScript Integration",
                    "GPU-Accelerated Animations",
                    "Tailwind CSS 4.0 Utilities",
                    "Semantic UI Logic",
                    "Accessible (Radix UI Primitives)"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80 bg-muted/20 p-3 rounded-xl border border-border/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "docs" && (
            <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                  <Code2 size={12} /> Architectural Guide
                </div>
                <h1 className="text-5xl font-black italic tracking-tighter uppercase text-foreground">Documentation</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Understand the structural integrity and customization patterns of the Future UI ecosystem.
                </p>
              </div>

              <div className="space-y-8">
                <section className="space-y-4">
                  <h2 className="text-2xl font-black italic tracking-tight uppercase flex items-center gap-2">
                    <Settings2 size={24} className="text-primary" /> The Utils Pattern
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Most components rely on a centralized <code className="text-primary bg-primary/5 px-1.5 py-0.5 rounded font-bold">cn()</code> utility. This helper merges Tailwind classes intelligently using <code className="italic">clsx</code> and <code className="italic">tailwind-merge</code>.
                  </p>
                  <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 font-mono text-xs overflow-x-auto shadow-2xl">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-800">
                      <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">lib/utils.ts</span>
                    </div>
                    <pre className="text-zinc-300">
                      {`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
                    </pre>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm space-y-2">
                    <h3 className="font-bold italic uppercase tracking-tighter text-primary">Customization</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">Since you own the source code, you can easily change semantic colors, animation timings, or layouts directly in the component file.</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm space-y-2">
                    <h3 className="font-bold italic uppercase tracking-tighter text-primary">Type Safety</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">Every component is strictly typed with TypeScript, providing autocompletion for all variants and props in your IDE.</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm space-y-2">
                    <h3 className="font-bold italic uppercase tracking-tighter text-primary">Performance</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">We prioritize performance by minimizing dependencies and using CSS variables for high-frequency style updates.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "installation" && (
            <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                  <PackageCheck size={12} /> Deployment
                </div>
                <h1 className="text-5xl font-black italic tracking-tighter uppercase text-foreground">Installation</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Streamlined integration patterns to get your project running in minutes.
                </p>
              </div>

              <div className="space-y-10">
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black italic">1</div>
                    <h2 className="text-2xl font-black italic tracking-tight uppercase">Automated Setup (Recommended)</h2>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    The easiest way to install components and their dependencies is via our smart CLI tool. It automatically handles folder structures and path aliases.
                  </p>
                  <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 font-mono text-sm shadow-xl">
                    <div className="flex gap-1.5 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                    </div>
                    <code className="text-zinc-300">
                      <span className="text-primary font-bold">npx</span> futureuikit add <span className="text-amber-500">glowy-button</span>
                    </code>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black italic">2</div>
                    <h2 className="text-2xl font-black italic tracking-tight uppercase">Manual Integration</h2>
                  </div>
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>If you prefer total manual control:</p>
                    <ol className="list-decimal pl-5 space-y-3">
                      <li>Copy the component source code from the detail page.</li>
                      <li>Create a new file in your project (e.g., <code className="text-primary bg-primary/5 px-1 py-0.5 rounded">components/ui/button.tsx</code>).</li>
                      <li>Ensure you have the required dependencies installed (usually <code className="italic">framer-motion</code> and <code className="italic">lucide-react</code>).</li>
                    </ol>
                  </div>
                </section>

                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">Enterprise Prerequisite</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ensure your <code className="text-foreground font-bold">tsconfig.json</code> or <code className="text-foreground font-bold">jsconfig.json</code> has the <code className="text-primary">@/*</code> path alias configured. The CLI will attempt to do this for you, but it&apos;s recommended to verify for complex monorepo setups.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "components" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-black italic tracking-tighter uppercase text-primary mb-2">
                    {selectedCategory === "All" ? "Components" : selectedCategory}
                  </h1>
                  <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                    Browse the complete list of high-quality UI elements. Simple, clean, and fully customizable for professional development.
                  </p>
                </div>
                <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest bg-muted/30 px-3 py-1 rounded-full border border-border/50">
                  {filteredComponents.length} Results
                </span>
              </div>

              {/* Three Column Component List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 pt-8 border-t border-border/50">
                {componentColumns.map((column, colIdx) => (
                  <div key={colIdx} className="space-y-6">
                    {column.map((item) => (
                      <Link 
                        key={item.id}
                        href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                        className="group block"
                      >
                        <div className="flex items-center justify-between py-1 border-b border-transparent group-hover:border-primary/20 transition-all">
                          <span className="text-base font-medium text-foreground/80 group-hover:text-primary group-hover:translate-x-1 transition-all flex items-center gap-2">
                            {item.title}
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                          <span className="text-[10px] uppercase font-bold text-muted-foreground/40 group-hover:text-primary/40 transition-colors">
                            {item.type}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              
              {filteredComponents.length === 0 && (
                <div className="py-20 text-center border rounded-3xl border-dashed border-border/50 bg-muted/5">
                  <p className="text-muted-foreground italic uppercase tracking-widest text-sm font-bold opacity-30">No components found in this category.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Comps;
