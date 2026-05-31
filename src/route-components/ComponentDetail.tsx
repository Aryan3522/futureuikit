"use client";

import React, { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { componentsList, registry } from "@/data/component-library-data";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, Code, ChevronLeft, Moon, Sun, ArrowDown } from "lucide-react";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewRegistry } from "./PreviewRegistry";
import { DotBackground } from "@/components/ui/dot-background";

const ComponentLivePreview: React.FC<{ id: string | number; slug: string }> = ({ slug }) => {
  const Preview = PreviewRegistry[slug];
  if (!Preview) return <div className="text-center select-text opacity-50">Live Preview for {slug}</div>;
  return <Preview />;
};

export default function ComponentDetail({ type, slug, id }: { type: string; slug: string; id: string }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();

  const activeSyntaxStyle = React.useMemo(() => {
    const theme = JSON.parse(JSON.stringify(isDark ? vscDarkPlus : vs));
    
    // Remove background properties from pre and code blocks to avoid React 
    // shorthand/non-shorthand conflict errors during theme switching.
    // The background will be consistently handled by customStyle instead.
    const keysToClean = ['pre[class*="language-"]', 'code[class*="language-"]'];
    keysToClean.forEach(key => {
      if (theme[key]) {
        delete theme[key].background;
        delete theme[key].backgroundColor;
      }
    });

    return theme;
  }, [isDark]);

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const component = componentsList.find(
    (item) => item.id === Number(id) && item.type.toLowerCase() === type && item.slug === slug
  );

  if (!component) notFound();

  const registryComponent = (registry as any)[slug];
  const reusableCode = registryComponent?.files[0]?.content || "";
  const cliCommand = `npx futureuikit add ${slug}`;

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary/30 font-sans overflow-x-hidden">
      {slug === "scroll-progress" && <ScrollProgress />}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-background/80 backdrop-blur-md border-b border-border/10 flex items-center justify-between px-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full border border-border/20 hover:bg-muted/50 transition-colors flex items-center justify-center"
          title="Go Back"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "p-2 rounded-full border transition-all duration-300",
              showCode 
                ? "bg-foreground text-background border-foreground" 
                : "border-border/20 hover:bg-muted/50"
            )}
            title="Toggle Code"
          >
            <Code size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border/20 hover:bg-muted/50 transition-colors"
            title="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="min-h-[100dvh] pt-16 w-full flex border-b border-border/10">
        
        {/* Code Panel (Slides from left) */}
        <AnimatePresence initial={false}>
          {showCode && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.8 }}
              className="border-r border-border/10 bg-background flex flex-col md:max-w-[45vw] shrink-0 min-h-[calc(100dvh-4rem)] self-stretch sticky top-16"
            >
              <div className="flex-1 overflow-y-auto p-6 md:p-10 pt-8 custom-scrollbar flex flex-col gap-6 max-h-[calc(100dvh-4rem)]">
                <h2 className="text-2xl font-light tracking-tight text-foreground/90">Manual Source</h2>
                
                <div className="relative group rounded-2xl border border-border/20 bg-muted/30 overflow-hidden flex-1 flex flex-col">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(reusableCode);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 1500);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    {copiedCode ? <Check size={16} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={16} />}
                  </button>
                  <SyntaxHighlighter
                    language="javascript"
                    style={activeSyntaxStyle}
                    customStyle={{
                      margin: 0,
                      padding: "2rem",
                      backgroundColor: "transparent",
                      fontSize: "0.85rem",
                      lineHeight: "1.7",
                      flex: 1,
                    }}
                  >
                    {reusableCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview Container */}
        <motion.div 
          layout
          transition={{ type: "spring", bounce: 0, duration: 0.8 }}
          className="flex-1 min-h-[calc(100dvh-4rem)] relative bg-background flex items-center justify-center mt-8"
        >
          {!component.type.toLowerCase().includes("background") && (
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <DotBackground dotColor="currentColor" maskOpacity={0.05} />
            </div>
          )}

          {/* <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 pointer-events-none">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-9xl font-black tracking-tighter uppercase opacity-5"
            >
              {component.title}
            </motion.h1>
          </div> */}

          <div className="relative z-10 w-full h-full flex items-center justify-center">
             <ComponentLivePreview id={id} slug={slug} />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40 mix-blend-difference"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold rotate-90 mb-4 select-none">Scroll</span>
            <ArrowDown size={16} className="animate-bounce" />
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic Detailed Guide Section */}
      <div className="w-full px-6 md:px-16 py-16 md:py-24 flex flex-col gap-16 md:gap-24 overflow-hidden">
        
        {/* Component Intro */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 text-primary">
            <div className="h-[1px] w-12 bg-primary/50" />
            <span className="text-sm uppercase tracking-widest font-medium">Overview</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            Meet <span className="font-semibold">{component.title}</span>
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground/80 leading-relaxed font-light">
            {component.description}
          </p>
        </motion.section>

        {/* CLI Quick Install */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 text-primary">
            <div className="h-[1px] w-12 bg-primary/50" />
            <span className="text-sm uppercase tracking-widest font-medium">Quick Install via CLI</span>
          </div>
          <div className="relative group rounded-2xl border border-border/20 bg-muted/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-4 font-mono text-base md:text-xl text-foreground/90">
              <span className="text-primary/60 font-bold select-none">$</span>
              <span className="selection:bg-primary/30">{cliCommand}</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(cliCommand);
                setCopiedCli(true);
                setTimeout(() => setCopiedCli(false), 1500);
              }}
              className="p-3 rounded-xl bg-background border border-border/20 hover:bg-muted/30 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              {copiedCli ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              <span className="text-sm font-medium">{copiedCli ? "Copied" : "Copy Command"}</span>
            </button>
          </div>
        </motion.section>

        {/* Step-by-Step Guide */}
        <section className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 text-primary"
          >
            <div className="h-[1px] w-12 bg-primary/50" />
            <span className="text-sm uppercase tracking-widest font-medium">Implementation Steps</span>
          </motion.div>

          <div className="relative border-l border-border/10 pl-8 md:pl-12 space-y-24 py-4 ml-2 md:ml-4">
            {[
              `Installation: Open your terminal and run \`npx futureuikit add ${slug}\`. The CLI will automatically resolve dependencies, create the necessary files in your \`components/ui\` directory, and configure Tailwind or Framer Motion if required.`,
              `Importing: Import the component into your application file using the standard alias path. For example: \`import { ${component.title.replace(/[^a-zA-Z]/g, '')} } from "@/components/ui/${slug}"\`.`,
              `Basic Integration: Place the component directly within your JSX layout. By default, it operates completely standalone. Ensure you are using it within a Client Component (\`"use client"\`) if the component utilizes Framer Motion or React Hooks.`,
              ...component.usage,
              `Advanced Customization: Because Future UI components are copied directly into your codebase, you have 100% control over the source code. You can easily open \`src/components/ui/${slug}.tsx\` to adjust physics (spring configurations), rewrite logic, add new variants using \`cva\`, or tweak the core aesthetic to match your brand exactly.`,
              `Accessibility: Our components prioritize a11y. Standard attributes like \`aria-label\`, \`tabIndex\`, and native keyboard navigation (where applicable) are usually preserved. You can pass any standard HTML attributes down to the root element.`,
            ].map((step, i) => {
              // Parse step assuming format "Action: description"
              const splitIndex = step.indexOf(":");
              const hasColon = splitIndex !== -1;
              const action = hasColon ? step.slice(0, splitIndex).trim() : `Step 0${i + 1}`;
              const description = hasColon ? step.slice(splitIndex + 1).trim() : step;

              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  {/* Glowing Timeline Node */}
                  <div className="absolute -left-[37px] md:-left-[53px] top-3 w-3 h-3 rounded-full bg-background border-2 border-primary/40 group-hover:border-primary group-hover:scale-150 transition-all duration-500 z-10" />
                  
                  {/* Step Number Watermark */}
                  <div className="absolute -top-12 -left-8 md:-left-12 text-7xl md:text-9xl font-black text-foreground opacity-10 dark:opacity-5 pointer-events-none select-none transition-opacity duration-500 group-hover:opacity-20 dark:group-hover:opacity-10">
                    0{i + 1}
                  </div>

                  <div className="space-y-3 relative z-10 pt-1">
                    <h4 className="text-xl md:text-2xl font-medium tracking-tight">
                      {action}
                    </h4>
                    <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed font-light">
                      {description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
