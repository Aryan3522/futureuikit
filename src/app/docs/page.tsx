"use client";

import React from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { 
  BookOpen, 
  Terminal, 
  Copy, 
  ShieldCheck, 
  Zap, 
  Package, 
  Cpu, 
  CheckCircle2,
} from "lucide-react";
import { CodeBlock } from "@/components/shared/codeBlock";

interface DocSectionProps {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}

const DocSection: React.FC<DocSectionProps> = ({ title, icon: Icon, children }) => (
  <GlassPanel variant="heavy" className="p-8 md:p-10 mb-8 relative overflow-hidden group">
    <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all duration-1000 pointer-events-none"></div>
    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5 relative z-10">
      <div className="p-3 rounded-xl glass-mantle text-primary border border-white/10">
        <Icon size={24} />
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-light">{title}</h2>
    </div>
    <div className="space-y-6 text-muted-foreground leading-relaxed relative z-10">
      {children}
    </div>
  </GlassPanel>
);

export default function DocsPage() {
  return (
    <div className="w-full relative selection:bg-primary/30">
      {/* Background glow similar to homepage */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-200 max-h-200 bg-secondary/10 rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none" />

      <main className="w-full relative z-10">
        {/* Header */}
        <div 
          className="mb-20 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono-label text-[10px] text-foreground/70 mb-6 uppercase tracking-[0.2em]">
            <BookOpen size={12} className="text-primary" /> Documentation
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] luminous-text mb-6">
            FUTURE UI <br className="hidden md:block" /> <span className="text-primary">SYSTEM.</span>
          </h1>
          <p className="font-display text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Everything you need to build high-end, animated interfaces with React and Next.js. Engineered for the next era of web design.
          </p>
        </div>

        {/* Introduction */}
        <DocSection title="Introduction" icon={Zap}>
          <p>
            Future UI is a collection of high-end, reusable components designed for modern web applications. 
            Built with <span className="text-foreground">React 19</span>, <span className="text-foreground">Tailwind CSS 4</span>, and <span className="text-foreground">Framer Motion</span>, 
            our components are engineered for smooth performance and a premium aesthetic.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              "Copy-paste or CLI installation",
              "Modern, Clean, and Minimal variants",
              "Fully customizable color profiles",
              "Production-ready responsiveness",
              "Smooth Framer Motion animations",
              "Zero external heavy dependencies"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl glass-mantle border border-white/5 hover:border-white/10 transition-colors">
                <CheckCircle2 size={16} className="text-[#00ffcc] shrink-0" />
                <span className="text-sm font-display tracking-wide">{feature}</span>
              </div>
            ))}
          </div>
        </DocSection>

        {/* Installation */}
        <DocSection title="Installation" icon={Terminal}>
          <p>
            The easiest way to add components to your project is using our dedicated CLI. 
            It handles the heavy lifting, creating the necessary files and utilities for you.
          </p>
          
          <h3 className="font-display text-xl text-foreground mt-10 mb-3">1. Initialize the CLI</h3>
          <p className="text-sm mb-4">Run the following command in your project root to prepare your workspace:</p>
          <CodeBlock code="npx futureuikit init" />

          <h3 className="font-display text-xl text-foreground mt-10 mb-3">2. Add Components</h3>
          <p className="text-sm mb-4">Install specific components by their slug. For example, to add the Primary Button:</p>
          <CodeBlock code="npx futureuikit add primary" />
          
          <div className="mt-8 p-5 rounded-xl bg-secondary/5 border border-secondary/20 flex flex-col sm:flex-row gap-4 items-start">
            <div className="p-2 rounded-lg bg-secondary/10 shrink-0">
              <Package size={20} className="text-secondary" />
            </div>
            <div>
              <h4 className="font-display text-lg text-secondary mb-2">Manual Installation</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Prefer manual control? You can click the <span className="text-foreground">Manual</span> tab on any component page 
                to see the full source code. Simply copy it into your components directory.
              </p>
            </div>
          </div>
        </DocSection>

        {/* Customization */}
        <DocSection title="Customization" icon={Cpu}>
          <p>
            Most Future UI components support a robust variant and color system. This allows you to match 
            the library to your brand identity with zero effort.
          </p>
          
          <h3 className="font-display text-xl text-foreground mt-10 mb-3">Using Variants</h3>
          <p className="text-sm mb-4">Pass the <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[11px] text-foreground">variant</code> prop to switch between Modern, Clean, or Minimal styles:</p>
          <CodeBlock 
            language="javascript"
            code={`<PrimaryButton variant="modern">Modern Style</PrimaryButton>
<PrimaryButton variant="clean">Clean Style</PrimaryButton>
<PrimaryButton variant="minimal">Minimal Style</PrimaryButton>`} 
          />

          <h3 className="font-display text-xl text-foreground mt-10 mb-3">Custom Colors</h3>
          <p className="text-sm mb-4">Define any hex, RGB, or HSL color via the <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[11px] text-foreground">color</code> prop:</p>
          <CodeBlock 
            language="javascript"
            code={`<PrimaryButton color="#6366f1">Indigo</PrimaryButton>
<BasicLoader color="rgb(16, 185, 129)" />`} 
          />
        </DocSection>

        {/* Feedback & Toasts */}
        <DocSection title="Feedback & Toasts" icon={Zap}>
          <p>
            Future UI includes a powerful, flexible toast notification system built with Radix UI and Framer Motion. 
            It supports multiple positions, auto-dismissal, and custom actions.
          </p>
          
          <h3 className="font-display text-xl text-foreground mt-10 mb-3">1. Add the Toaster to your Layout</h3>
          <p className="text-sm mb-4">To use toasts, you must first add the <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[11px] text-foreground">Toaster</code> component to your root layout (or app entry point):</p>
          <CodeBlock 
            language="javascript"
            code={`// app/layout.tsx
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}`} 
          />

          <h3 className="font-display text-xl text-foreground mt-10 mb-3">2. Use the hook</h3>
          <p className="text-sm mb-4">Trigger toasts from any component using the <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[11px] text-foreground">useToast</code> hook:</p>
          <CodeBlock 
            language="javascript"
            code={`import { useToast } from "@/hooks/use-toast";

export default function MyComponent() {
  const { toast } = useToast();

  return (
    <button
      onClick={() => {
        toast({
          title: "Success!",
          description: "Your changes have been saved.",
          position: "bottom-right",
        });
      }}
    >
      Show Toast
    </button>
  );
}`} 
          />
        </DocSection>

        {/* License & Privacy */}
        <DocSection title="License & Privacy" icon={ShieldCheck}>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/20 transition-colors">
              <h4 className="font-mono-label text-[10px] text-emerald-500 mb-3 uppercase tracking-widest">Completely Free</h4>
              <p className="font-display text-xl text-foreground mb-3">Future UI is 100% free for everyone.</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All components in this library are released under the MIT License. You are free to use them 
                in personal, educational, or commercial projects without any restrictions or attribution requirements.
              </p>
            </div>

            <div className="p-6">
              <h4 className="font-display text-xl text-foreground mb-3">Privacy Policy</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe in a &quot;Privacy by Design&quot; philosophy. Future UI does not track you, collect your data, 
                or use cookies. When you use the CLI, we only fetch the necessary component code from our public 
                registry. Your code stays yours, and your project remains private.
              </p>
            </div>
          </div>
        </DocSection>
      </main>

      
    </div>
  );
}
