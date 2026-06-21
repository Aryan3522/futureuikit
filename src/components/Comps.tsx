"use client";

import React, { useState, useMemo, useEffect } from"react";
import { componentsList } from"@/data/component-library-data";
import Link from"next/link";
import { useSearchParams } from"next/navigation";
import { cn } from"@/lib/utils";
import { Check, Copy, ArrowRight, Layers, Sparkles, Droplets, Grid, List, Link as LinkIcon, ChevronRight, PackageCheck, Code2 } from"lucide-react";
import { Search } from"@/components/ui/search";
import { Badge } from"@/components/ui/badge";

type ViewMode ="list"|"grid"|"links";

export default function Comps() {
 const [copiedId, setCopiedId] = useState<string | null>(null);
 const [viewMode, setViewMode] = useState<ViewMode>("list");
 const [mounted, setMounted] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");

 const searchParams = useSearchParams();
 const activeTab = searchParams.get("tab") ??"components";

const selectedCategory = searchParams.get("category");

 useEffect(() => {
 const initTimeout = setTimeout(() => {
 setMounted(true);
 const savedMode = localStorage.getItem("future-ui-view-mode") as ViewMode;
 if (savedMode && ["list","grid","links"].includes(savedMode)) {
 setViewMode(savedMode);
 }
 }, 0);
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

 // Filter components by selected category (or show all)
 const displayedComponents = useMemo(() => {
 let filtered = componentsList;
 if (selectedCategory) {
 filtered = filtered.filter(c => c.type === selectedCategory);
 }
 if (searchQuery.trim() !=="") {
 const q = searchQuery.toLowerCase();
 filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q));
 }
 return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
 }, [selectedCategory, searchQuery]);

 return (
 <>
 {/* Noise Background */}
 <div 
 className="fixed inset-0 z-1 pointer-events-none opacity-5"
 style={{
 backgroundImage:'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
 }}
 />

 <div className="w-full relative z-10">
 {/* Main Content Canvas */}
 <div className="flex-1 min-w-0 w-full">
 
 {activeTab ==="getting-started"&& (
 <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <section className="relative">
 <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"/>
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
 <Sparkles size={12} className="text-primary"/> Introduction
 </div>
 <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Getting Started</h1>
 <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
 Future UI is a source-code-first component library for Next.js. Every component is yours to own, modify, and distribute — no npm dependency, no version lock-in, no abstraction layer between you and the DOM.
 </p>
 </section>

 {/* What is Future UI */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">What is Future UI?</h2>
 <p className="text-muted-foreground text-sm leading-relaxed">
 Future UI is not a package you install and forget. It is a CLI-driven collection of production-ready React components that land directly in your <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">src/components/ui/</code> folder as plain <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">.tsx</code> files. You get full control over every prop, every style, and every animation curve. No wrappers. No proprietary APIs. Just code you can edit immediately.
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
 {[
  { stat: componentsList.length + "+", label: "Components", desc: "And growing with every release" },
 { stat: "0", label: "Runtime Dependencies", desc: "All code compiles into your bundle" },
 { stat: "100%", label: "Source Ownership", desc: "Every file is yours to modify" },
 ].map((s) => (
 <div key={s.label} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl text-center">
 <div className="font-display text-3xl text-primary font-bold">{s.stat}</div>
 <div className="text-sm text-foreground font-medium mt-1">{s.label}</div>
 <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
 </div>
 ))}
 </div>
 </section>

 {/* Key Features */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Key Features</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {[
 { icon: "📝", title: "Source Code Ownership", desc: "Components are copied into your project as editable .tsx files. You control every line — no npm updates can break your UI, no abstraction hides implementation details." },
 { icon: "⚡", title: "Tailwind CSS v4 + CSS Variables", desc: "Every color, radius, and spacing token is a CSS custom property. Light and dark modes are driven by the same variable names with different HSL values — zero specificity battles." },
 { icon: "🎬", title: "Framer Motion 12", desc: "Animations use spring physics, layout animations, and gesture systems. GPU-composited properties only. 60fps is the floor, not the ceiling." },
 { icon: "📦", title: "CLI-First Distribution", desc: "No npm install. No package.json bloat. Run npx futureuikit add <component> and the source appears in your project. Dependencies are auto-resolved per component." },
 { icon: "🎨", title: "Semantic Design Tokens", desc: "Colors are named by role (background, foreground, primary, muted) not by value. Change one variable in globals.css and every component reflects the change." },
 { icon: "🌓", title: "Dark & Light Mode", desc: "Both themes are first-class citizens defined in the same CSS file. The .dark class toggles all variables simultaneously. No duplicated styles, no theme-specific overrides." },
 ].map((f) => (
 <div key={f.title} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-6 rounded-xl">
 <div className="text-xl mb-3">{f.icon}</div>
 <h3 className="font-display text-base text-foreground font-bold mb-2">{f.title}</h3>
 <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Tech Stack */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Tech Stack</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {[
 { name: "Next.js", version: "16+", role: "React framework with App Router" },
 { name: "React", version: "19", role: "UI runtime" },
 { name: "Tailwind CSS", version: "v4", role: "Utility-first CSS with @theme" },
 { name: "Framer Motion", version: "12", role: "Animation & gesture library" },
 { name: "TypeScript", version: "5+", role: "Type safety" },
 { name: "class-variance-authority", version: "-", role: "Component variant system" },
 { name: "clsx + tailwind-merge", version: "-", role: "Class name utilities" },
 { name: "Lucide React", version: "-", role: "Icon library" },
 ].map((t) => (
 <div key={t.name} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-4 rounded-xl">
 <div className="font-mono text-sm text-foreground font-bold">{t.name}</div>
 <div className="text-xs text-primary font-mono">{t.version}</div>
 <div className="text-xs text-muted-foreground mt-1">{t.role}</div>
 </div>
 ))}
 </div>
 </section>

 {/* Requirements */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Requirements</h2>
 <div className="space-y-3">
 {[
 { title: "Node.js 18+", desc: "Required to run the npx futureuikit CLI commands." },
 { title: "Next.js 14+ with App Router", desc: "Components are designed for the App Router directory structure and React Server Components compatibility." },
 { title: "Tailwind CSS v4", desc: "Uses the @theme inline directive and CSS variables. Not compatible with Tailwind v3 config-based theming." },
 { title: "@/* Path Alias", desc: "The CLI expects tsconfig.json to have a @/* alias pointing to your src/ directory for component placement." },
 { title: "Geist Sans + JetBrains Mono Fonts", desc: "Recommended fonts. Add via next/font in layout.tsx. Falls back to Inter / system-ui if not configured." },
 ].map((r) => (
 <div key={r.title} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-4 rounded-xl flex items-start gap-4">
 <div className="w-2 h-2 rounded-full bg-primary/60 mt-2 shrink-0"/>
 <div>
 <div className="text-sm text-foreground font-bold">{r.title}</div>
 <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Quick Start */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Quick Start</h2>
 <p className="text-muted-foreground text-sm -mt-4">Install any component in two commands.</p>
 <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
 <div className="bg-foreground/5 border-b border-foreground/10 px-4 py-3 flex items-center gap-2">
 <span className="font-mono text-xs text-muted-foreground">terminal</span>
 </div>
 <div className="p-5 font-mono text-sm space-y-3">
 <div className="flex justify-between items-center">
 <div className="flex items-center gap-4">
 <span className="text-primary">$</span>
 <span>npx futureuikit init</span>
 </div>
 <button onClick={() => copyText("npx futureuikit init","gs-init")} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
 {copiedId ==="gs-init"? <Check size={16} /> : <Copy size={16} />}
 </button>
 </div>
 <div className="text-muted-foreground text-xs"># Configures Tailwind, global CSS, utils, and path alias</div>
 <div className="flex justify-between items-center pt-2 border-t border-foreground/5">
 <div className="flex items-center gap-4">
 <span className="text-primary">$</span>
 <span>npx futureuikit add button card modal</span>
 </div>
 <button onClick={() => copyText("npx futureuikit add button card modal","gs-add")} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
 {copiedId ==="gs-add"? <Check size={16} /> : <Copy size={16} />}
 </button>
 </div>
 <div className="text-muted-foreground text-xs"># Adds components to src/components/ui/</div>
 </div>
 </div>
 </section>

 {/* Project Structure */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Project Structure</h2>
 <p className="text-muted-foreground text-sm -mt-4">After running <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">init</code> and adding a few components, your project will look like this:</p>
 <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
 <div className="p-5 font-mono text-xs text-foreground/80 leading-loose">
 <pre>{`your-project/
├── src/
│   ├── app/
│   │   ├── globals.css      # Theme variables + @theme block
│   │   ├── layout.tsx       # Font imports + providers
│   │   └── page.tsx         # Your app
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx   # Added via CLI
│   │       ├── card.tsx     # Added via CLI
│   │       └── modal.tsx    # Added via CLI
│   └── lib/
│       └── utils.ts         # cn() helper for class merging
├── tsconfig.json            # @/* alias configured
└── package.json`}</pre>
 </div>
 </div>
 </section>

 {/* First Steps */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">First Steps</h2>
 <div className="space-y-4">
 {[
 { step: "1", title: "Initialize", desc: "Run npx futureuikit init at your project root. This sets up globals.css with all design tokens, installs clsx + tailwind-merge, and configures your @/* path alias." },
 { step: "2", title: "Explore the Library", desc: "Browse the Components Directory tab to see every available component. Each component page shows a live preview, source code, and usage examples." },
 { step: "3", title: "Add a Component", desc: "Run npx futureuikit add <name> for each component you need. You can add multiple at once: npx futureuikit add button card badge toast." },
 { step: "4", title: "Import and Use", desc: "Import components from @/components/ui/. They work like any React component — no providers, no context wrappers, no setup." },
 { step: "5", title: "Customize", desc: "Open the .tsx file and edit directly. Change colors, sizes, animations — it is your code now. The theme variables in globals.css control all components globally." },
 ].map((s) => (
 <div key={s.step} className="flex items-start gap-4">
 <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-sm font-bold shrink-0">{s.step}</div>
 <div className="min-w-0">
 <h3 className="font-display text-base text-foreground font-bold mb-1">{s.title}</h3>
 <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Next Steps */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Next Steps</h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 {[
 { title: "Browse Components", desc: "Explore the full component library with live previews and code samples.", link: "/components", label: "Components →" },
 { title: "Learn Theming", desc: "Understand how CSS variables power light and dark mode across all components.", tab: "theming", label: "Theming →" },
 { title: "View Philosophy", desc: "Understand the design decisions behind the library architecture.", tab: "philosophy", label: "Philosophy →" },
 ].map((n) => (
 <Link key={n.title} href={n.link || `/components?tab=${n.tab}`} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl block hover:border-primary/30 transition-all duration-300 group">
 <h3 className="font-display text-sm text-foreground font-bold mb-1">{n.title}</h3>
 <p className="text-xs text-muted-foreground mb-3">{n.desc}</p>
 <span className="text-xs text-primary font-mono group-hover:underline">{n.label}</span>
 </Link>
 ))}
 </div>
 </section>
 </div>
 )}

 {activeTab ==="installation"&& (
 <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <section className="relative">
 <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"/>
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
 <PackageCheck size={12} className="text-primary"/> Deployment
 </div>
 <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Installation</h1>
 <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
 Future UI ships source code through a CLI — no npm package to install, no version lock-in, no dependency bloat. You own every line from the first command.
 </p>
 </section>

 {/* Quick Start */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Quick Start</h2>
 <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-8 rounded-xl">
 <p className="text-muted-foreground text-sm mb-6">Run these two commands to add any component to your Next.js project.</p>
 <div className="space-y-4">
 <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
 <div className="bg-foreground/5 border-b border-foreground/10 px-4 py-3 flex items-center gap-2">
 <span className="font-mono text-xs text-muted-foreground">terminal</span>
 </div>
 <div className="p-4 font-mono text-sm text-foreground/80 flex justify-between items-center">
 <div className="flex items-center gap-4">
 <span className="text-primary">$</span>
 <span>npx futureuikit init</span>
 </div>
 <button onClick={() => copyText("npx futureuikit init","qs-init")} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4">
 {copiedId ==="qs-init"? <Check size={16} /> : <Copy size={16} />}
 </button>
 </div>
 </div>
 <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
 <div className="bg-foreground/5 border-b border-foreground/10 px-4 py-3 flex items-center gap-2">
 <span className="font-mono text-xs text-muted-foreground">terminal</span>
 </div>
 <div className="p-4 font-mono text-sm text-foreground/80 flex justify-between items-center">
 <div className="flex items-center gap-4">
 <span className="text-primary">$</span>
 <span>npx futureuikit add &lt;component-name&gt;</span>
 </div>
 <button onClick={() => copyText("npx futureuikit add <component-name>","qs-add")} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4">
 {copiedId ==="qs-add"? <Check size={16} /> : <Copy size={16} />}
 </button>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Step by Step */}
 <section className="space-y-8">
 <h2 className="font-display text-2xl text-foreground">Step-by-Step Guide</h2>

 <div className="space-y-6">
 <div className="flex items-start gap-5">
 <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display text-lg font-bold shrink-0 mt-0.5">1</div>
 <div className="min-w-0">
 <h3 className="font-display text-xl text-foreground mb-2">Initialize Your Project</h3>
 <p className="text-muted-foreground text-sm leading-relaxed mb-4">
 Run the init command at the root of your Next.js project. This will configure the Tailwind CSS v4 <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">@theme</code> block, set up the global CSS file with all design tokens, install base utilities (<code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">clsx</code>, <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">tailwind-merge</code>), and create the <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">@/*</code> path alias if missing.
 </p>
 <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
 <div className="p-4 font-mono text-sm text-foreground/80 flex justify-between items-center">
 <div className="flex items-center gap-4">
 <span className="text-primary">$</span>
 <span>npx futureuikit init</span>
 </div>
 <button onClick={() => copyText("npx futureuikit init","inst-step1")} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4">
 {copiedId ==="inst-step1"? <Check size={16} /> : <Copy size={16} />}
 </button>
 </div>
 </div>
 </div>
 </div>

 <div className="flex items-start gap-5">
 <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display text-lg font-bold shrink-0 mt-0.5">2</div>
 <div className="min-w-0">
 <h3 className="font-display text-xl text-foreground mb-2">Add Individual Components</h3>
 <p className="text-muted-foreground text-sm leading-relaxed mb-4">
 Browse the <Link href="/components" className="text-primary underline underline-offset-2 hover:no-underline">component library</Link> and add what you need. Each component is installed as a standalone file at <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">src/components/ui/&lt;name&gt;.tsx</code>. The CLI resolves dependencies automatically — if a component requires <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">framer-motion</code>, it gets installed on the spot.
 </p>
 <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
 <div className="p-4 font-mono text-sm text-foreground/80 flex justify-between items-center">
 <div className="flex items-center gap-4">
 <span className="text-primary">$</span>
 <span>npx futureuikit add browser-window</span>
 </div>
 <button onClick={() => copyText("npx futureuikit add browser-window","inst-step2")} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4">
 {copiedId ==="inst-step2"? <Check size={16} /> : <Copy size={16} />}
 </button>
 </div>
 </div>
 <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden mt-3">
 <div className="p-4 font-mono text-sm text-foreground/80 flex justify-between items-center">
 <div className="flex items-center gap-4">
 <span className="text-primary">$</span>
 <span>npx futureuikit add button card modal toast</span>
 </div>
 <button onClick={() => copyText("npx futureuikit add button card modal toast","inst-step2b")} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4">
 {copiedId ==="inst-step2b"? <Check size={16} /> : <Copy size={16} />}
 </button>
 </div>
 </div>
 <p className="text-xs text-muted-foreground mt-2">You can add multiple components in a single command.</p>
 </div>
 </div>

 <div className="flex items-start gap-5">
 <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display text-lg font-bold shrink-0 mt-0.5">3</div>
 <div className="min-w-0">
 <h3 className="font-display text-xl text-foreground mb-2">Import &amp; Use</h3>
 <p className="text-muted-foreground text-sm leading-relaxed mb-4">
 Every component is a standard React export. Import it like any other local file and use it in your JSX. No context providers, no wrappers, no setup ceremony.
 </p>
 <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
 <div className="bg-foreground/5 border-b border-foreground/10 px-4 py-3 flex items-center gap-2">
 <span className="font-mono text-xs text-muted-foreground">app/page.tsx</span>
 </div>
 <div className="p-4 font-mono text-sm text-foreground/80">
 <pre>{`import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Modal } from "@/components/ui/modal"

export default function Page() {
  return (
    <Card>
      <Modal.Trigger>
        <Button variant="primary">
          Open Modal
        </Button>
      </Modal.Trigger>
      <Modal>
        <p>Content goes here</p>
      </Modal>
    </Card>
  )
}`}</pre>
 </div>
 <button onClick={() => copyText(`import { Button } from "@/components/ui/button"\nimport { Card } from "@/components/ui/card"\nimport { Modal } from "@/components/ui/modal"\n\nexport default function Page() {\n  return (\n    <Card>\n      <Modal.Trigger>\n        <Button variant="primary">\n          Open Modal\n        </Button>\n      </Modal.Trigger>\n      <Modal>\n        <p>Content goes here</p>\n      </Modal>\n    </Card>\n  )\n}`,"inst-import")} className=" absolute top-20 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
 {copiedId ==="inst-import"? <Check size={16} /> : <Copy size={16} />}
 </button>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CLI Reference */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">CLI Reference</h2>
 <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 rounded-xl overflow-hidden">
 <div className="space-y-0 divide-y divide-foreground/5">
 {[
 { cmd: "npx futureuikit init", desc: "Initialize the project — sets up Tailwind, globals.css, path alias, and base utilities." },
 { cmd: "npx futureuikit add <name>", desc: "Install a single component by its registry slug (e.g., button, card, modal)." },
 { cmd: "npx futureuikit add <a> <b> <c>", desc: "Install multiple components in one command." },
 { cmd: "npx futureuikit list", desc: "List all available components in the registry." },
 { cmd: "npx futureuikit --help", desc: "Show all CLI commands and flags." },
 ].map((c, i) => (
 <div key={i} className="p-5 flex items-start gap-4">
 <code className="text-xs text-primary font-mono bg-primary/5 px-2 py-1 rounded shrink-0 mt-0.5">{c.cmd}</code>
 <p className="text-xs text-muted-foreground">{c.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* What You Can Build */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">What You Can Build</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {[
 { icon: "🖥", title: "Interactive Dashboards", desc: "Data-rich admin panels with animated charts, modals, toggles, and slide-out navigation." },
 { icon: "🎬", title: "Landing Pages", desc: "Cinematic hero sections with 3D backgrounds, marquee testimonials, and scroll-driven animations." },
 { icon: "📱", title: "SaaS Interfaces", desc: "Form builders, filter panels, file uploaders, and feedback widgets with validation and state management." },
 { icon: "🎮", title: "Game UIs", desc: "HUD-style interfaces with glass panels, glitch text, health bars, and skill tree components." },
 { icon: "📄", title: "Documentation Sites", desc: "Typographic systems, code highlighters, tabbed interfaces, and responsive sidebars." },
 { icon: "🛒", title: "E-Commerce", desc: "Product cards with 3D previews, carousels, animated cart drawers, and checkout forms." },
 ].map((b) => (
 <div key={b.title} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl">
 <div className="text-xl mb-3">{b.icon}</div>
 <h3 className="font-display text-sm text-foreground font-bold mb-1">{b.title}</h3>
 <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Prerequisites */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Prerequisites</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl">
 <h4 className="font-mono text-xs text-foreground font-bold mb-2">Next.js 14+</h4>
 <p className="text-xs text-muted-foreground">App Router with the <code className="text-primary text-[10px] font-mono bg-foreground/5 px-1 rounded">@/*</code> path alias configured in <code className="text-primary text-[10px] font-mono bg-foreground/5 px-1 rounded">tsconfig.json</code>.</p>
 </div>
 <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl">
 <h4 className="font-mono text-xs text-foreground font-bold mb-2">Tailwind CSS v4</h4>
 <p className="text-xs text-muted-foreground">Uses the <code className="text-primary text-[10px] font-mono bg-foreground/5 px-1 rounded">@theme inline</code> directive and CSS variables for theming.</p>
 </div>
 <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl">
 <h4 className="font-mono text-xs text-foreground font-bold mb-2">Node.js 18+</h4>
 <p className="text-xs text-muted-foreground">Required to run the <code className="text-primary text-[10px] font-mono bg-foreground/5 px-1 rounded">npx futureuikit</code> CLI commands.</p>
 </div>
 </div>
 <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
 <div className="flex items-center gap-3 text-primary font-bold text-sm mb-2">
 <Code2 size={16} /> Path Alias Required
 </div>
 <p className="text-muted-foreground text-sm leading-relaxed">
 Ensure your <code className="text-foreground font-bold bg-foreground/10 px-1 py-0.5 rounded">tsconfig.json</code> has the <code className="text-primary">@/*</code> path alias configured pointing to your <code className="text-primary">src/</code> directory. The CLI relies on this to structure your components at <code className="text-foreground font-bold bg-foreground/10 px-1 py-0.5 rounded">src/components/ui/</code>.
 </p>
 </div>
 </section>
 </div>
 )}

 {activeTab ==="philosophy"&& (
 <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <section className="relative">
 <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"/>
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
 <Layers size={12} className="text-primary"/> Architecture
 </div>
 <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Core Philosophy</h1>
 <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
 Future UI is not a traditional dependency. It is a curated collection of source code that you copy, paste, and completely own. Every decision — from the CLI distribution model to the animation architecture — follows a set of strict principles.
 </p>
 </section>

 {/* Pillars */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Design Pillars</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {[
 { icon: "◈", title: "Zero Abstraction", desc: "When you use an npm package for UI, you are locked into the creator&apos;s API. With Future UI, you get the raw React and Tailwind code — no wrapper components, no proprietary abstractions, no breaking version upgrades. If a button needs a specific animation, you just edit the file directly." },
 { icon: "✦", title: "Spatial Aesthetics", desc: "Our design language relies on depth, lighting, and physics rather than flat colors. We use deep background blurs, sub-pixel borders, and GPU-accelerated motion curves. Every surface has weight, every transition has friction, every shadow has a light source." },
 { icon: "⚡", title: "Performance by Default", desc: "Components are compiled into your bundle at build time — no tree-shaking needed, no runtime overhead. Animations use GPU-composited properties (transform, opacity). CSS is purged by Tailwind JIT. The result: zero unused bytes in production." },
 { icon: "📦", title: "CLI-First Distribution", desc: "Instead of publishing to npm and waiting for downstream updates, Future UI ships source code via its CLI. You run a command, a file appears in your project. No version lock-in, no dependency hell, no migration guides. You own the code instantly." },
 { icon: "🎯", title: "Framer Motion Native", desc: "Motion is not an afterthought — it is baked into the component architecture from day one. Every animation uses Framer Motion's spring physics and gesture system. Layout animations, exit animations, drag, and scroll-linked motion are all first-class primitives." },
 { icon: "🎨", title: "Semantic Theming", desc: "Colors are defined as CSS custom properties mapped through Tailwind's @theme directive. Light and dark modes share the same token names with different HSL values. Change one variable and every component reflects the change — no overrides, no specificity battles." },
 ].map((p) => (
 <div key={p.title} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-8 rounded-xl group hover:border-primary/30 transition-all duration-300">
 <div className="text-2xl mb-4">{p.icon}</div>
 <h3 className="font-display text-xl text-foreground font-bold mb-3">{p.title}</h3>
 <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Principles List */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Core Principles</h2>
 <div className="space-y-4">
 {[
 { num: "01", title: "Copy, Don't Import", desc: "Every component is designed to be copied into your project. You get the source, not a black box. This means zero API surface lock-in and complete freedom to modify." },
 { num: "02", title: "Motion is Material", desc: "Animations are not decoration — they communicate state, direction, and hierarchy. Spring physics over linear transitions. GPU-composited properties only. 60fps as a minimum, not a target." },
 { num: "03", title: "Dark-First, Light-Always", desc: "The default palette centers on absolute black backgrounds and luminous accents. Light mode is a first-class citizen derived from the same token system, not an afterthought." },
 { num: "04", title: "CLI over Package Manager", desc: "npm packages version-lock your UI. The CLI gives you the source on demand. You stay on your schedule, not the library's release cycle." },
 { num: "05", title: "Minimal Runtime, Maximal DX", desc: "Tailwind JIT purges unused styles at build time. Framer Motion lazy-loads what it needs. TypeScript types are generated from component source, not hand-maintained." },
 ].map((pr) => (
 <div key={pr.num} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-6 rounded-xl flex gap-5">
 <span className="font-mono text-2xl font-bold text-primary shrink-0 leading-none mt-0.5">{pr.num}</span>
 <div>
 <h3 className="font-display text-lg text-foreground font-bold mb-1">{pr.title}</h3>
 <p className="text-muted-foreground text-sm leading-relaxed">{pr.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Architecture Diagram */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Architecture Overview</h2>
 <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-8 rounded-xl">
 <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
 {[
 { layer: "Components", items: "Button, Card, Modal, Form, Animation", desc: "Copy-paste React + Tailwind source files" },
 { layer: "System", items: "Typography, Theme tokens, Spacing, Radius", desc: "CSS variables + @theme inline directives" },
 { layer: "Motion", items: "Framer Motion, Spring physics, Layout animations", desc: "Declarative animation primitives" },
 { layer: "CLI", items: "npx futureuikit add <component>", desc: "Source distribution on demand" },
 ].map((a, i) => (
 <React.Fragment key={a.layer}>
 <div className="flex-1 text-center p-4">
 <div className="text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">{a.layer}</div>
 <div className="text-xs text-foreground font-medium mb-1">{a.items}</div>
 <div className="text-[10px] text-muted-foreground">{a.desc}</div>
 </div>
 {i < 3 && <div className="hidden md:flex items-center text-muted-foreground/30 px-2">→</div>}
 </React.Fragment>
 ))}
 </div>
 </div>
 </section>
 </div>
 )}

 {activeTab ==="theming"&& (
 <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <section className="relative">
 <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"/>
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
 <Droplets size={12} className="text-primary"/> Design System
 </div>
 <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Theming</h1>
 <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
 Tailwind CSS 4.0 natively handles theming via CSS variables. Future UI uses a precise set of variables to control everything from background depth to luminous highlights.
 </p>
 </section>

 {/* Color Tokens */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Color Tokens</h2>
  <p className="text-muted-foreground text-sm -mt-4">Every color is defined as a CSS variable in <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">globals.css</code> and mapped through Tailwind&apos;s <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">@theme inline</code> directive so you can use them as <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">bg-background</code>, <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">text-foreground</code>, etc.</p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {[
 { name: "background", var: "--color-background", cls: "bg-background", desc: "Page background — absolute black (dark) / white (light)" },
 { name: "foreground", var: "--color-foreground", cls: "text-foreground", desc: "Primary text color" },
 { name: "card", var: "--color-card", cls: "bg-card", desc: "Card surface background" },
 { name: "card-foreground", var: "--color-card-foreground", cls: "text-card-foreground", desc: "Card text color" },
 { name: "popover", var: "--color-popover", cls: "bg-popover", desc: "Dropdown / popover surface" },
 { name: "popover-foreground", var: "--color-popover-foreground", cls: "text-popover-foreground", desc: "Popover text color" },
 { name: "primary", var: "--color-primary", cls: "bg-primary text-primary-foreground", desc: "Accent color — violet (dark) / gray (light)" },
 { name: "secondary", var: "--color-secondary", cls: "bg-secondary text-secondary-foreground", desc: "Secondary accent — lavender (dark) / light gray (light)" },
 { name: "muted", var: "--color-muted", cls: "bg-muted", desc: "Subtle background for secondary surfaces" },
 { name: "muted-foreground", var: "--color-muted-foreground", cls: "text-muted-foreground", desc: "Secondary / subdued text" },
 { name: "accent", var: "--color-accent", cls: "bg-accent text-accent-foreground", desc: "Hover / interactive surface" },
 { name: "accent-foreground", var: "--color-accent-foreground", cls: "text-accent-foreground", desc: "Text on accent surfaces" },
 { name: "destructive", var: "--color-destructive", cls: "bg-destructive text-destructive-foreground", desc: "Error / destructive actions — red" },
 { name: "destructive-foreground", var: "--color-destructive-foreground", cls: "text-destructive-foreground", desc: "Text on destructive surfaces" },
 { name: "border", var: "--color-border", cls: "border-border", desc: "Default border color" },
 { name: "input", var: "--color-input", cls: "border-input", desc: "Form input border" },
 { name: "ring", var: "--color-ring", cls: "ring-ring", desc: "Focus ring color — matches primary" },
 ].map((t) => (
 <div key={t.name} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl flex items-start gap-4">
 <div className={"w-10 h-10 rounded-lg shrink-0 border border-border/50 " + t.cls} />
 <div className="min-w-0 flex-1">
 <div className="flex items-center gap-2 mb-1">
 <span className="font-mono text-sm font-bold text-foreground">{t.name}</span>
 <code className="text-[10px] text-muted-foreground font-mono bg-foreground/5 px-1.5 py-0.5 rounded">{t.var}</code>
 </div>
 <div className="flex items-center gap-2">
 <code className="text-[11px] text-primary font-mono">{t.cls}</code>
 <button onClick={() => copyText(t.cls, "theme-token-" + t.name)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
 {copiedId === "theme-token-" + t.name ? <Check size={12} /> : <Copy size={12} />}
 </button>
 </div>
 <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Light / Dark Values */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Light &amp; Dark Values</h2>
 <p className="text-muted-foreground text-sm -mt-4">The <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">:root</code> block holds light mode values; the <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">.dark</code> class overrides them. Toggle the theme to see the change.</p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-6 rounded-xl">
 <h3 className="font-mono text-sm text-foreground font-bold mb-4 flex items-center gap-2">
 <span className="w-3 h-3 rounded-full bg-amber-400"/> Light <code className="text-[10px] font-normal text-muted-foreground">:root</code>
 </h3>
 <div className="space-y-1.5 font-mono text-[11px] text-muted-foreground">
 <div><span className="text-foreground">--background</span>: 240 10% 100%</div>
 <div><span className="text-foreground">--foreground</span>: 240 10% 3.9%</div>
 <div><span className="text-foreground">--primary</span>: 239 84% 67%</div>
 <div><span className="text-foreground">--secondary</span>: 240 4.8% 95.9%</div>
 <div><span className="text-foreground">--muted</span>: 240 4.8% 95.9%</div>
 <div><span className="text-foreground">--muted-foreground</span>: 240 3.8% 46.1%</div>
 <div><span className="text-foreground">--border</span>: 240 5.9% 90%</div>
 <div><span className="text-foreground">--ring</span>: 239 84% 67%</div>
 </div>
 </div>
 <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-6 rounded-xl">
 <h3 className="font-mono text-sm text-foreground font-bold mb-4 flex items-center gap-2">
 <span className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600"/> Dark <code className="text-[10px] font-normal text-muted-foreground">.dark</code>
 </h3>
 <div className="space-y-1.5 font-mono text-[11px] text-muted-foreground">
 <div><span className="text-foreground">--background</span>: 0 0% 0%</div>
 <div><span className="text-foreground">--foreground</span>: 20 6% 90%</div>
 <div><span className="text-foreground">--primary</span>: 0 0% 78%</div>
 <div><span className="text-foreground">--secondary</span>: 258 100% 87%</div>
 <div><span className="text-foreground">--muted</span>: 0 0% 8%</div>
 <div><span className="text-foreground">--muted-foreground</span>: 20 5% 65%</div>
 <div><span className="text-foreground">--border</span>: 0 0% 20%</div>
 <div><span className="text-foreground">--ring</span>: 258 90% 66%</div>
 </div>
 </div>
 </div>
 </section>

 {/* Radius & Animations */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Radius &amp; Animation Tokens</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-6 rounded-xl">
 <h3 className="font-mono text-sm text-foreground font-bold mb-4">Border Radius</h3>
 <div className="space-y-3">
 {[
 { name: "--radius-lg", value: "0.5rem", demo: "rounded-lg", size: "lg" },
 { name: "--radius-md", value: "calc(0.5rem - 2px)", demo: "rounded-md", size: "md" },
 { name: "--radius-sm", value: "calc(0.5rem - 4px)", demo: "rounded-sm", size: "sm" },
 ].map((r) => (
 <div key={r.name} className="flex items-center gap-4">
 <div className={"w-12 h-12 bg-primary/20 border border-primary/30 " + r.demo} />
 <div>
 <div className="font-mono text-xs text-foreground">{r.name}</div>
 <div className="text-[11px] text-muted-foreground font-mono">{r.value}</div>
 <div className="text-[11px] text-muted-foreground font-mono">{r.demo}</div>
 </div>
 </div>
 ))}
 </div>
 </div>
 <div className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-6 rounded-xl">
 <h3 className="font-mono text-sm text-foreground font-bold mb-4">Keyframe Animations</h3>
 <div className="space-y-3 font-mono text-[11px] text-muted-foreground">
 {[
 { name: "accordion-down", css: "from { height: 0 } to { height: var(--radix-accordion-content-height) }" },
 { name: "accordion-up", css: "from { height: var(--radix-accordion-content-height) } to { height: 0 }" },
 { name: "marquee-x", css: "from { transform: translateX(0) } to { transform: translateX(calc(-100% - var(--gap))) }" },
 { name: "marquee-y", css: "from { transform: translateY(0) } to { transform: translateY(calc(-100% - var(--gap))) }" },
 { name: "hero-fade-up", css: "from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) }" },
 { name: "hero-fade-in", css: "from { opacity: 0 } to { opacity: 1 }" },
 ].map((a) => (
 <div key={a.name}>
 <code className="text-primary text-xs">{a.name}</code>
 <div className="pl-3 border-l border-border/30 mt-0.5">{a.css}</div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* Utility Classes */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Utility Classes</h2>
 <p className="text-muted-foreground text-sm -mt-4">Pre-built glass, glow, and noise utilities applied via className.</p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {[
 { name: "glass-mantle", cls: "glass-mantle", desc: "Subtle frosted surface — 3% white bg, 20px blur, white border." },
 { name: "glass-heavy", cls: "glass-heavy", desc: "Deeper frosted surface — 2% white bg, 40px blur, white border." },
 { name: "luminous-glow", cls: "luminous-glow", desc: "Soft violet box-shadow glow (15% opacity)." },
 { name: "noise-overlay", cls: "noise-overlay", desc: "CSS-only noise texture via repeating-linear-gradient." },
 ].map((u) => (
 <div key={u.name} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl">
 <h3 className="font-mono text-sm text-foreground font-bold mb-1">{u.name}</h3>
 <p className="text-muted-foreground text-xs mb-3">{u.desc}</p>
 <div className="p-3 bg-foreground/5 rounded border border-foreground/10 font-mono text-[11px] text-muted-foreground flex justify-between items-center">
 <span>{u.cls}</span>
 <button onClick={() => copyText(u.cls, "theme-util-" + u.name)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4">
 {copiedId === "theme-util-" + u.name ? <Check size={14} /> : <Copy size={14} />}
 </button>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* @theme Code Block */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">@theme Block</h2>
 <p className="text-muted-foreground text-sm -mt-4">Copy the full <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">@theme inline</code> block from <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">globals.css</code> to customize the theme in your project.</p>
 <div className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
 <div className="bg-foreground/5 border-b border-foreground/10 px-4 py-3 flex items-center gap-2">
 <span className="font-mono text-xs text-muted-foreground">globals.css</span>
 </div>
 <div className="p-6 font-mono text-sm text-foreground/80 overflow-x-auto flex justify-between items-start">
 <pre>
 <code className="text-primary">@theme</code> {` inline {\n --color-background: hsl(var(--background));\n --color-foreground: hsl(var(--foreground));\n --color-card: hsl(var(--card));\n --color-card-foreground: hsl(var(--card-foreground));\n --color-popover: hsl(var(--popover));\n --color-popover-foreground: hsl(var(--popover-foreground));\n --color-primary: hsl(var(--primary));\n --color-primary-foreground: hsl(var(--primary-foreground));\n --color-secondary: hsl(var(--secondary));\n --color-secondary-foreground: hsl(var(--secondary-foreground));\n --color-muted: hsl(var(--muted));\n --color-muted-foreground: hsl(var(--muted-foreground));\n --color-accent: hsl(var(--accent));\n --color-accent-foreground: hsl(var(--accent-foreground));\n --color-destructive: hsl(var(--destructive));\n --color-destructive-foreground: hsl(var(--destructive-foreground));\n --color-border: hsl(var(--border));\n --color-input: hsl(var(--input));\n --color-ring: hsl(var(--ring));\n --radius-lg: var(--radius);\n --radius-md: calc(var(--radius) - 2px);\n --radius-sm: calc(var(--radius) - 4px);\n}`}
 </pre>
 <button 
 onClick={() => copyText(`@theme inline {\n --color-background: hsl(var(--background));\n --color-foreground: hsl(var(--foreground));\n --color-card: hsl(var(--card));\n --color-card-foreground: hsl(var(--card-foreground));\n --color-popover: hsl(var(--popover));\n --color-popover-foreground: hsl(var(--popover-foreground));\n --color-primary: hsl(var(--primary));\n --color-primary-foreground: hsl(var(--primary-foreground));\n --color-secondary: hsl(var(--secondary));\n --color-secondary-foreground: hsl(var(--secondary-foreground));\n --color-muted: hsl(var(--muted));\n --color-muted-foreground: hsl(var(--muted-foreground));\n --color-accent: hsl(var(--accent));\n --color-accent-foreground: hsl(var(--accent-foreground));\n --color-destructive: hsl(var(--destructive));\n --color-destructive-foreground: hsl(var(--destructive-foreground));\n --color-border: hsl(var(--border));\n --color-input: hsl(var(--input));\n --color-ring: hsl(var(--ring));\n --radius-lg: var(--radius);\n --radius-md: calc(var(--radius) - 2px);\n --radius-sm: calc(var(--radius) - 4px);\n}`,"theme-block")}
 className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4 mt-1"
 >
 {copiedId ==="theme-block"? <Check size={16} /> : <Copy size={16} />}
 </button>
 </div>
 </div>
 </section>
 </div>
 )}

 {activeTab === "typography" && (
 <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <section className="relative">
 <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"/>
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
 <LinkIcon size={12} className="text-primary"/> Typography
 </div>
 <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Typography</h1>
 <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
 Our typographic scale is designed for legibility and cinematic impact. We blend geometric sans-serifs for headings with precise monospace fonts for technical data.
 </p>
 </section>

 {/* Font Families */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Font Families</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {[
 { title: "Display", font: "font-display", tag: "Aa", preview: "Geist Sans / Inter", desc: "Geometric sans-serif for large headers, hero sections, and cinematic impact.", cls: 'className="font-display"', id: "typo-font-1" },
 { title: "Body", font: "font-body-md", tag: "Aa", preview: "Inter / System UI", desc: "Clean sans-serif for paragraphs, descriptions, and general body copy.", cls: 'className="font-body-md"', id: "typo-font-2" },
 { title: "Monospace", font: "font-mono", tag: "{ }", preview: "JetBrains Mono", desc: "Monospace for code snippets, version numbers, tags, and technical labels.", cls: 'className="font-mono uppercase tracking-widest"', id: "typo-font-3" },
 ].map((f) => (
 <div key={f.id} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-8 rounded-xl">
 <div className={"text-5xl mb-4 " + f.font + " text-foreground"}>{f.tag}</div>
 <h3 className={"text-xl text-foreground mb-2 " + f.font}>{f.title}</h3>
 <p className="text-xs text-muted-foreground font-mono mb-1">{f.preview}</p>
 <p className="text-muted-foreground text-sm mb-6">{f.desc}</p>
 <div className="p-3 bg-foreground/5 rounded border border-foreground/10 font-mono text-[11px] text-muted-foreground flex justify-between items-center">
 <span>{f.cls}</span>
 <button onClick={() => copyText(f.cls, f.id)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4">
 {copiedId === f.id ? <Check size={14} /> : <Copy size={14} />}
 </button>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Heading Scale */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Heading Scale</h2>
 <p className="text-muted-foreground text-sm -mt-4">Use <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">{'<Heading variant="h1" />'}</code> or apply the classes directly.</p>
 <div className="space-y-4">
 {[
 { level: "h1", text: "Heading 1", cls: "scroll-m-20 text-4xl font-extrabold lg:text-5xl", size: "4xl / 5xl", weight: "Extra Bold", use: "Page titles, hero headlines" },
 { level: "h2", text: "Heading 2", cls: "scroll-m-20 text-3xl font-semibold pb-2 border-b", size: "3xl", weight: "Semi Bold", use: "Section headers" },
 { level: "h3", text: "Heading 3", cls: "scroll-m-20 text-2xl font-semibold", size: "2xl", weight: "Semi Bold", use: "Sub-section headers" },
 { level: "h4", text: "Heading 4", cls: "scroll-m-20 text-xl font-semibold", size: "xl", weight: "Semi Bold", use: "Card titles, group headers" },
 { level: "h5", text: "Heading 5", cls: "text-lg font-semibold", size: "lg", weight: "Semi Bold", use: "Minor headings" },
 { level: "h6", text: "Heading 6", cls: "text-base font-semibold", size: "base", weight: "Semi Bold", use: "Small labels" },
 ].map((h, i) => (
 <div key={h.level} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-6 rounded-xl">
 <div className="flex items-start justify-between gap-4 mb-3">
 <span className={"font-display " + h.cls + " text-foreground"}>{h.text}</span>
 <Badge variant="secondary" className="shrink-0 text-[10px]">{h.level}</Badge>
 </div>
 <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-mono mb-4">
 <span>Size: {h.size}</span>
 <span>Weight: {h.weight}</span>
 <span>{h.use}</span>
 </div>
 <div className="p-3 bg-foreground/5 rounded border border-foreground/10 font-mono text-[11px] text-muted-foreground flex justify-between items-center">
 <span>{h.cls}</span>
 <button onClick={() => copyText(h.cls, "typo-h-" + i)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4">
 {copiedId === "typo-h-" + i ? <Check size={14} /> : <Copy size={14} />}
 </button>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Text Variants */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Text Variants</h2>
 <p className="text-muted-foreground text-sm -mt-4">Use <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">{'<Text variant="lead" />'}</code> or apply the classes directly.</p>
 <div className="space-y-4">
 {[
 { label: "Lead", text: "A lead paragraph introduces content with authority — slightly larger and softer.", cls: "text-xl text-muted-foreground", desc: "Opening paragraphs, summaries" },
 { label: "Default", text: "The standard body text for readability across all surfaces and contexts.", cls: "leading-7 [&:not(:first-child)]:mt-6", desc: "Body copy, descriptions" },
 { label: "Large", text: "Large text adds emphasis without the weight of a heading.", cls: "text-lg font-semibold", desc: "Highlighted content" },
 { label: "Small", text: "Small print for auxiliary information and secondary metadata.", cls: "text-sm font-medium leading-none", desc: "Footnotes, timestamps" },
 { label: "Muted", text: "Muted text recedes into the background for less prominent information.", cls: "text-sm text-muted-foreground", desc: "Captions, secondary info" },
 { label: "Blockquote", text: "A block quotation pulls quoted content into focus with visual distinction.", cls: "border-l-2 pl-6 italic", desc: "Quotes, callouts" },
 ].map((t, i) => (
 <div key={t.label} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-6 rounded-xl">
 <div className="mb-3">
 <Badge variant="secondary" className="text-[10px] mb-3">{t.label}</Badge>
 {t.label === "Blockquote" ? (
 <blockquote className={t.cls + " text-foreground"}>{t.text}</blockquote>
 ) : (
 <p className={t.cls + " text-foreground"}>{t.text}</p>
 )}
 </div>
 <p className="text-xs text-muted-foreground mb-4">{t.desc}</p>
 <div className="p-3 bg-foreground/5 rounded border border-foreground/10 font-mono text-[11px] text-muted-foreground flex justify-between items-center">
 <span>{t.cls}</span>
 <button onClick={() => copyText(t.cls, "typo-t-" + i)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4">
 {copiedId === "typo-t-" + i ? <Check size={14} /> : <Copy size={14} />}
 </button>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Special Elements */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Special Elements</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {[
 { title: "Label", preview: <label className="text-sm font-medium leading-none text-foreground">Input Label</label>, cls: "text-sm font-medium leading-none", desc: "Form labels and accessible input annotations." },
 { title: "Code", preview: <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">npm install futureuikit</code>, cls: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", desc: "Inline code snippets, terminal commands, and technical terms." },
 ].map((e, i) => (
 <div key={e.title} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-8 rounded-xl">
 <h3 className="font-display text-xl text-foreground mb-4">{e.title}</h3>
 <div className="mb-6">{e.preview}</div>
 <p className="text-muted-foreground text-sm mb-6">{e.desc}</p>
 <div className="p-3 bg-foreground/5 rounded border border-foreground/10 font-mono text-[11px] text-muted-foreground flex justify-between items-center">
 <span>{e.cls}</span>
 <button onClick={() => copyText(e.cls, "typo-e-" + i)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none ml-4">
 {copiedId === "typo-e-" + i ? <Check size={14} /> : <Copy size={14} />}
 </button>
 </div>
 </div>
 ))}
 </div>
 </section>
 </div>
 )}

 {activeTab ==="colors"&& (
 <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <section className="relative">
 <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"/>
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold uppercase tracking-widest border border-foreground/10 mb-6">
 <Sparkles size={12} className="text-primary"/> Palette
 </div>
 <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-6 text-foreground uppercase">Color Palette</h1>
 <p className="font-body-lg text-xl text-muted-foreground leading-relaxed">
 A semantic color system built on CSS custom properties. Every token maps to both light and dark values through the <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">:root</code> and <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">.dark</code> class.
 </p>
 </section>

 {/* Semantic Colors */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Semantic Tokens</h2>
 <p className="text-muted-foreground text-sm -mt-4">Each token is defined as an HSL variable and exposed through Tailwind&apos;s <code className="text-primary text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">@theme inline</code> block.</p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {[
 { name: "background", var: "--background", cls: "bg-background", hex: "hsl(240 10% 100% / 0 0% 0%)", desc: "Page background — white in light, absolute black in dark" },
 { name: "foreground", var: "--foreground", cls: "text-foreground", hex: "hsl(240 10% 3.9% / 20 6% 90%)", desc: "Primary text — near-black (light) / off-white (dark)" },
 { name: "primary", var: "--primary", cls: "bg-primary text-primary-foreground", hex: "hsl(239 84% 67% / 0 0% 78%)", desc: "Accent — vivid violet (light) / light gray (dark)" },
 { name: "secondary", var: "--secondary", cls: "bg-secondary text-secondary-foreground", hex: "hsl(240 4.8% 95.9% / 258 100% 87%)", desc: "Subtle accent — light gray (light) / lavender (dark)" },
 { name: "muted", var: "--muted", cls: "bg-muted text-muted-foreground", hex: "hsl(240 4.8% 95.9% / 0 0% 8%)", desc: "Muted surface — light gray (light) / near-black (dark)" },
 { name: "muted-foreground", var: "--muted-foreground", cls: "text-muted-foreground", hex: "hsl(240 3.8% 46.1% / 20 5% 65%)", desc: "Subdued text — medium gray (light) / warm gray (dark)" },
 { name: "accent", var: "--accent", cls: "bg-accent text-accent-foreground", hex: "hsl(240 4.8% 95.9% / 0 0% 8%)", desc: "Interactive hover surface" },
 { name: "destructive", var: "--destructive", cls: "bg-destructive text-destructive-foreground", hex: "hsl(0 84.2% 60.2% / 0 62.8% 30.6%)", desc: "Error / danger — red" },
 { name: "border", var: "--border", cls: "border-border", hex: "hsl(240 5.9% 90% / 0 0% 20%)", desc: "Default border — light gray (light) / dark gray (dark)" },
 { name: "input", var: "--input", cls: "border-input", hex: "hsl(240 5.9% 90% / 0 0% 20%)", desc: "Form input border" },
 { name: "ring", var: "--ring", cls: "ring-ring", hex: "hsl(239 84% 67% / 258 90% 66%)", desc: "Focus ring — matches primary" },
 ].map((c) => (
 <div key={c.name} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl flex items-start gap-4">
 <div className={"w-12 h-12 rounded-xl shrink-0 border border-border/50 " + c.cls} />
 <div className="min-w-0 flex-1">
 <div className="flex items-center gap-2 mb-1">
 <span className="font-mono text-sm font-bold text-foreground">{c.name}</span>
 <code className="text-[10px] text-muted-foreground font-mono bg-foreground/5 px-1.5 py-0.5 rounded">{c.var}</code>
 </div>
 <div className="flex items-center gap-2">
 <code className="text-[11px] text-primary font-mono">{c.cls}</code>
 <button onClick={() => copyText(c.cls, "color-token-" + c.name)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
 {copiedId === "color-token-" + c.name ? <Check size={12} /> : <Copy size={12} />}
 </button>
 </div>
 <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Light vs Dark */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Light vs Dark Values</h2>
 <p className="text-muted-foreground text-sm -mt-4">The same variable name resolves to different HSL values depending on the active theme.</p>
 <div className="overflow-x-auto">
 <table className="w-full text-left font-mono text-xs border-collapse">
 <thead>
 <tr className="border-b border-foreground/10">
 <th className="py-3 pr-4 text-foreground font-bold">Variable</th>
 <th className="py-3 pr-4 text-amber-600 font-medium">Light (:root)</th>
 <th className="py-3 pr-4 text-zinc-400 font-medium">Dark (.dark)</th>
 <th className="py-3 pr-4 text-muted-foreground font-medium">Role</th>
 </tr>
 </thead>
 <tbody className="text-muted-foreground">
 {[
 { var: "--background", light: "240 10% 100%", dark: "0 0% 0%", role: "Page background" },
 { var: "--foreground", light: "240 10% 3.9%", dark: "20 6% 90%", role: "Primary text" },
 { var: "--primary", light: "239 84% 67%", dark: "0 0% 78%", role: "Accent" },
 { var: "--secondary", light: "240 4.8% 95.9%", dark: "258 100% 87%", role: "Subtle accent" },
 { var: "--muted", light: "240 4.8% 95.9%", dark: "0 0% 8%", role: "Muted surface" },
 { var: "--muted-foreground", light: "240 3.8% 46.1%", dark: "20 5% 65%", role: "Subdued text" },
 { var: "--accent", light: "240 4.8% 95.9%", dark: "0 0% 8%", role: "Hover surface" },
 { var: "--destructive", light: "0 84.2% 60.2%", dark: "0 62.8% 30.6%", role: "Error" },
 { var: "--border", light: "240 5.9% 90%", dark: "0 0% 20%", role: "Border" },
 { var: "--ring", light: "239 84% 67%", dark: "258 90% 66%", role: "Focus ring" },
 ].map((row, i) => (
 <tr key={row.var} className={"border-b border-foreground/5 " + (i % 2 === 0 ? "bg-foreground/[0.01]" : "")}>
 <td className="py-2.5 pr-4 text-foreground font-medium">{row.var}</td>
 <td className="py-2.5 pr-4 text-amber-600/80">{row.light}</td>
 <td className="py-2.5 pr-4 text-zinc-400/80">{row.dark}</td>
 <td className="py-2.5 text-muted-foreground">{row.role}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </section>

 {/* Usage Patterns */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Usage Patterns</h2>
 <p className="text-muted-foreground text-sm -mt-4">Apply colors to different CSS properties using the Tailwind utility pattern.</p>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {[
 { pattern: "bg-{token}", eg: "bg-background", desc: "Background fill" },
 { pattern: "text-{token}", eg: "text-foreground", desc: "Text color" },
 { pattern: "border-{token}", eg: "border-border", desc: "Border color" },
 { pattern: "ring-{token}", eg: "ring-ring", desc: "Focus ring" },
 ].map((p) => (
 <div key={p.pattern} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl">
 <code className="text-sm text-primary font-mono font-bold">{p.pattern}</code>
 <div className="mt-2 font-mono text-xs text-foreground">{p.eg}</div>
 <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Opacity Modifiers */}
 <section className="space-y-6">
 <h2 className="font-display text-2xl text-foreground">Opacity Modifiers</h2>
 <p className="text-muted-foreground text-sm -mt-4">Append a slash and percentage to any color utility for opacity control.</p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {[
 { eg: "bg-background/50", desc: "50% opaque background" },
 { eg: "text-foreground/80", desc: "80% opaque text" },
 { eg: "border-border/20", desc: "20% opaque border" },
 { eg: "bg-primary/10", desc: "10% opaque primary as a tint" },
 ].map((o) => (
 <div key={o.eg} className="bg-foreground/[0.03] backdrop-blur-[40px] border border-foreground/10 p-5 rounded-xl flex items-center gap-4">
 <div className={"w-10 h-10 rounded-lg border border-border/30 shrink-0 " + o.eg} />
 <div>
 <code className="text-xs text-primary font-mono">{o.eg}</code>
 <p className="text-xs text-muted-foreground mt-0.5">{o.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </section>
 </div>
 )}

  {activeTab ==="components"&& (
  <div className="max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
  {/* Hero Section */}
  <section className="relative">
  <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"/>
  <h1 className="font-display text-5xl md:text-[72px] leading-[1.1] font-light tracking-[-0.04em] mb-4 text-foreground uppercase">The Library</h1>
  <p className="font-body-lg text-lg text-muted-foreground max-w-2xl leading-relaxed">
 Explore a meticulously engineered ecosystem of high-fidelity primitives. Designed for performance, built for clarity, and optimized for the next generation of spatial interfaces.
 </p>
 <div className="mt-8 flex flex-wrap items-center gap-4">
 <Badge variant="secondary"className="font-mono font-bold tracking-widest text-[10px] px-3 py-1">
 v0.2.5 STABLE
 </Badge>
 <Badge variant="secondary"className="font-mono font-bold tracking-widest text-[10px] px-3 py-1">
 TYPESCRIPT NATIVE
 </Badge>
 </div>
 </section>

  {/* Quick Start */}
  <section>
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
 onClick={() => copyText("npx futureuikit init","comp-init")}
 className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none"
 >
 {copiedId ==="comp-init"? <Check size={20} /> : <Copy size={20} />}
 </button>
 </div>
 <div className="absolute inset-0 bg-linear-to-r from-[#571bc1]/0 via-[#571bc1]/5 to-[#571bc1]/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>
 </div>
 </section>

  {/* Component List */}
 <section>
 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-foreground/5 pb-6 gap-6">
 <div className="w-full md:w-auto">
 <h2 className="font-display text-4xl font-light text-foreground uppercase tracking-tight mb-3">
 {selectedCategory ? selectedCategory :"Core Primitives"}
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
 className={cn("p-1.5 rounded-md transition-all", viewMode ==="list"?"bg-foreground/10 text-foreground shadow-sm":"text-muted-foreground hover:text-foreground/80 hover:bg-foreground/5")}
 title="List View"
 >
 <List size={16} />
 </button>
 <button 
 onClick={() => handleViewModeChange("grid")}
 className={cn("p-1.5 rounded-md transition-all", viewMode ==="grid"?"bg-foreground/10 text-foreground shadow-sm":"text-muted-foreground hover:text-foreground/80 hover:bg-foreground/5")}
 title="Grid View"
 >
 <Grid size={16} />
 </button>
 <button 
 onClick={() => handleViewModeChange("links")}
 className={cn("p-1.5 rounded-md transition-all", viewMode ==="links"?"bg-foreground/10 text-foreground shadow-sm":"text-muted-foreground hover:text-foreground/80 hover:bg-foreground/5")}
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
 {viewMode ==="list"&& (
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
 ?"bg-[#ffb4ab]/20 text-[#ffb4ab] border-[#ffb4ab]/20"
 :"bg-primary/20 text-primary border-[#d0bcff]/20"
 )}>
 {item.isNew ?"NEW":"STABLE"}
 </span>
 </div>
 <p className="text-muted-foreground text-sm line-clamp-1 max-w-xl">{item.description}</p>
 </div>
 </div>
 <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground/80 transition-colors shrink-0 ml-4 group-hover:translate-x-1"/>
 </div>
 </Link>
 ))}
 </div>
 )}

 {viewMode ==="grid"&& (
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
 ?"bg-[#ffb4ab]/20 text-[#ffb4ab] border-[#ffb4ab]/20"
 :"bg-primary/20 text-primary border-[#d0bcff]/20"
 )}>
 {item.isNew ?"NEW":"STABLE"}
 </span>
 </div>
 <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{item.description}</p>
 </div>
 <div className="flex justify-end mt-4">
 <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground/80 transition-colors shrink-0 group-hover:translate-x-1"/>
 </div>
 </Link>
 ))}
 </div>
 )}

 {viewMode ==="links"&& (
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
 <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary"/>
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
  </div>
  )}
  </div>
  </div>
  </>
  );
}
