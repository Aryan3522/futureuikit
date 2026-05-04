"use client";

import React from "react";
import { PillHeader } from "@/components/ui/PillHeader";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Terminal, 
  Copy, 
  ShieldCheck, 
  Zap, 
  Package, 
  Cpu, 
  CheckCircle2
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface DocSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const DocSection: React.FC<DocSectionProps> = ({ title, icon: Icon, children }) => (
  <section className="mb-12">
    <div className="flex items-center gap-3 mb-6 border-b border-border/40 pb-4">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    </div>
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      {children}
    </div>
  </section>
);

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "bash" }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-[#1e1e1e] my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{language}</span>
        <button 
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          background: "transparent",
          padding: "1.25rem",
          fontSize: "0.9rem",
          lineHeight: "1.5",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PillHeader />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen size={14} /> Documentation
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Future UI <span className="text-primary">System</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build high-end, animated interfaces with React and Next.js.
          </p>
        </motion.div>

        {/* Introduction */}
        <DocSection title="Introduction" icon={Zap}>
          <p>
            Future UI is a collection of high-end, reusable components designed for modern web applications. 
            Built with <strong>React</strong>, <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong>, 
            our components are engineered for smooth performance and a premium aesthetic.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              "Copy-paste or CLI installation",
              "Modern, Clean, and Minimal variants",
              "Fully customizable color profiles",
              "Production-ready responsiveness",
              "Smooth Framer Motion animations",
              "Zero external heavy dependencies"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card/40 border border-border/50">
                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
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
          
          <h3 className="text-lg font-bold text-foreground mt-8 mb-2">1. Initialize the CLI</h3>
          <p className="text-sm mb-4">Run the following command in your project root to prepare your workspace:</p>
          <CodeBlock code="npx futureuikit init" />

          <h3 className="text-lg font-bold text-foreground mt-8 mb-2">2. Add Components</h3>
          <p className="text-sm mb-4">Install specific components by their slug. For example, to add the Primary Button:</p>
          <CodeBlock code="npx futureuikit add primary" />
          
          <div className="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <h4 className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
              <Package size={16} /> Manual Installation
            </h4>
            <p className="text-sm">
              Prefer manual control? You can click the <strong>Manual</strong> tab on any component page 
              to see the full source code. Simply copy it into your components directory.
            </p>
          </div>
        </DocSection>

        {/* Customization */}
        <DocSection title="Customization" icon={Cpu}>
          <p>
            Most Future UI components support a robust variant and color system. This allows you to match 
            the library to your brand identity with zero effort.
          </p>
          
          <h3 className="text-lg font-bold text-foreground mt-8 mb-2">Using Variants</h3>
          <p className="text-sm mb-4">Pass the <code>variant</code> prop to switch between Modern, Clean, or Minimal styles:</p>
          <CodeBlock 
            language="javascript"
            code={`<PrimaryButton variant="modern">Modern Style</PrimaryButton>
<PrimaryButton variant="clean">Clean Style</PrimaryButton>
<PrimaryButton variant="minimal">Minimal Style</PrimaryButton>`} 
          />

          <h3 className="text-lg font-bold text-foreground mt-8 mb-2">Custom Colors</h3>
          <p className="text-sm mb-4">Define any hex, RGB, or HSL color via the <code>color</code> prop:</p>
          <CodeBlock 
            language="javascript"
            code={`<PrimaryButton color="#6366f1">Indigo</PrimaryButton>
<BasicLoader color="rgb(16, 185, 129)" />`} 
          />
        </DocSection>

        {/* License & Privacy */}
        <DocSection title="License & Privacy" icon={ShieldCheck}>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
              <h4 className="text-green-500 font-bold mb-2 uppercase tracking-widest text-xs">Completely Free</h4>
              <p className="text-foreground font-medium mb-2">Future UI is 100% free for everyone.</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All components in this library are released under the MIT License. You are free to use them 
                in personal, educational, or commercial projects without any restrictions or attribution requirements.
              </p>
            </div>

            <div>
              <h4 className="text-foreground font-bold mb-2">Privacy Policy</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe in a &quot;Privacy by Design&quot; philosophy. Future UI does not track you, collect your data, 
                or use cookies. When you use the CLI, we only fetch the necessary component code from our public 
                registry. Your code stays yours, and your project remains private.
              </p>
            </div>
          </div>
        </DocSection>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            Built for the future of the web. © 2026 Future UI.
          </p>
        </div>
      </main>
    </div>
  );
}
