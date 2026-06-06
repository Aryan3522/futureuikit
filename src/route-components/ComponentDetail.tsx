"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { componentsList, registry } from "@/data/component-library-data";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, ChevronRight, Sparkles, Box, Menu, X, Terminal, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentRenderer } from "@/registry/ComponentRenderer";
import Link from "next/link";

const ComponentLivePreview: React.FC<{ id: string | number; slug: string }> = ({ slug }) => {
  return <ComponentRenderer slug={slug} />;
};

const HighlightText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className="font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded-md text-[13px] font-medium mx-0.5 whitespace-nowrap">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default function ComponentDetail({ type, slug, id }: { type: string; slug: string; id: string }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedManual, setCopiedManual] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const [previewTab, setPreviewTab] = useState<"preview" | "code">("preview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeSyntaxStyle = React.useMemo(() => {
    const theme = JSON.parse(JSON.stringify(isDark ? vscDarkPlus : vs));
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
    setIsDark(document.documentElement.classList.contains("dark"));

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id], div[id]");
      let currentSection = "overview";
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
          currentSection = section.getAttribute("id") || currentSection;
        }
      });
      
      setActiveSection(currentSection);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const component = componentsList.find(
    (item) => item.id === Number(id) && item.type.toLowerCase() === type && item.slug === slug
  );

  if (!component) notFound();

  const registryComponent = (registry as any)[slug];
  const reusableCode = registryComponent?.files[0]?.content || "";
  const cliCommand = `npx futureuikit add ${slug}`;
  const importCommand = `import { ${component.title.replace(/[^a-zA-Z]/g, '')} } from "@/components/ui/${slug}"`;

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "installation", label: "Installation" },
    { id: "import", label: "Import" },
    { id: "usage", label: "Usage" },
    ...(component.details?.length ? [{ id: "features", label: "Features" }] : []),
    ...(component.usage?.length ? [{ id: "notes", label: "Notes" }] : []),
  ];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setSidebarOpen(false);
    }
  };

  return (
    <div className="w-full relative selection:bg-primary/30 min-h-screen">
      
      <div className="flex items-start gap-8 lg:gap-12 relative z-10 min-w-0">
        
        

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
          
          <div className="space-y-20 min-w-0">
            
            {/* Component Hero & Preview (Side by Side) */}
            <section id="overview" className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[400px_1fr] gap-10 xl:gap-14 min-w-0">
              
              {/* Left Column (Metadata) */}
              <div className="space-y-10 min-w-0 pt-2">
                <div className="space-y-6">

                  
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                      {component.title}
                    </h1>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {component.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 bg-muted border border-border/50 rounded-md font-mono text-[11px] font-semibold tracking-wide text-foreground uppercase">
                      {component.category}
                    </span>
                    {component.isNew && (
                      <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary rounded-md font-mono text-[11px] font-semibold tracking-wide uppercase">
                        New Release
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-border/40">
                  <div id="installation" className="space-y-3 min-w-0">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">Installation</h3>
                    <div className="relative group rounded-lg border border-border/50 bg-muted/30 overflow-hidden flex flex-col transition-colors hover:bg-muted/40">
                      <div className="px-4 py-3 flex items-center justify-between gap-4 font-mono text-sm">
                        <div className="flex items-center gap-3 text-muted-foreground overflow-x-auto scrollbar-hide">
                          <span className="select-none">$</span>
                          <span className="text-foreground whitespace-nowrap">{cliCommand}</span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(cliCommand);
                            setCopiedCli(true);
                            setTimeout(() => setCopiedCli(false), 1500);
                          }}
                          className="p-2 rounded-md bg-background/50 hover:bg-background border border-border/50 transition-all flex items-center justify-center shrink-0 text-foreground"
                        >
                          {copiedCli ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div id="import" className="space-y-3 min-w-0">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">Import</h3>
                    <div className="relative group rounded-lg border border-border/50 bg-muted/30 overflow-hidden flex flex-col transition-colors hover:bg-muted/40">
                      <div className="px-4 py-3 flex items-center justify-between gap-4 font-mono text-sm">
                        <div className="flex items-center gap-3 text-foreground overflow-x-auto scrollbar-hide">
                          <span className="whitespace-nowrap">{importCommand}</span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(importCommand);
                            setCopiedImport(true);
                            setTimeout(() => setCopiedImport(false), 1500);
                          }}
                          className="p-2 rounded-md bg-background/50 hover:bg-background border border-border/50 transition-all flex items-center justify-center shrink-0 text-foreground"
                        >
                          {copiedImport ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>


                </div>
              </div>

              {/* Right Column (Live Component Preview & Code Tab) */}
              <div className="lg:sticky lg:top-48 h-[500px] lg:h-[calc(100vh-220px)] lg:max-h-[700px] flex flex-col min-w-0">
                
                {/* Tabs Header */}
                <div className="flex items-center gap-6 border-b border-border/40 mb-4 px-2">
                  <button
                    onClick={() => setPreviewTab("preview")}
                    className={cn(
                      "text-sm font-semibold transition-colors relative pb-3 -mb-[1px]",
                      previewTab === "preview" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Preview
                    {previewTab === "preview" && (
                      <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-foreground rounded-t-full" />
                    )}
                  </button>
                  <button
                    onClick={() => setPreviewTab("code")}
                    className={cn(
                      "text-sm font-semibold transition-colors relative pb-3 -mb-[1px]",
                      previewTab === "code" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Code
                    {previewTab === "code" && (
                      <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-foreground rounded-t-full" />
                    )}
                  </button>
                </div>

                {/* Tab Content */}
                <div className="w-full flex-1 flex flex-col overflow-hidden">
                  {previewTab === "preview" ? (
                    <div className="w-full h-full max-w-full relative flex virtual-screen-wrapper">
                      <style dangerouslySetInnerHTML={{ __html: `
                        .virtual-screen-wrapper > div {
                          background: transparent !important;
                        }
                        .virtual-screen-wrapper > div > div.flex-1 {
                          padding: 0 !important;
                          display: flex !important;
                          align-items: stretch !important;
                          justify-content: stretch !important;
                        }
                        .virtual-screen-wrapper > div > div.flex-1 > div {
                          width: 100% !important;
                          max-width: 100% !important;
                          height: 100% !important;
                          max-height: 100% !important;
                          aspect-ratio: auto !important;
                          margin: 0 !important;
                        }
                      `}} />
                      <ComponentLivePreview id={id} slug={slug} />
                    </div>
                  ) : (
                    <div className="relative group rounded-xl border border-border/50 bg-zinc-950 overflow-hidden flex flex-col h-full shadow-sm w-full">
                      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-white/5">
                        <Terminal size={14} className="text-zinc-400" />
                        <div className="flex-1 text-xs text-zinc-400 font-medium font-sans select-none truncate">
                          {slug}.tsx
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(reusableCode);
                            setCopiedManual(true);
                            setTimeout(() => setCopiedManual(false), 1500);
                          }}
                          className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white transition-all shadow-sm border border-white/10 flex items-center gap-1.5 text-xs font-medium"
                        >
                          {copiedManual ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          {copiedManual ? "Copied" : "Copy"}
                        </button>
                      </div>
                      
                      <div className="overflow-auto flex-1 scrollbar-hide w-full bg-zinc-950">
                        <SyntaxHighlighter
                          language="tsx"
                          style={activeSyntaxStyle}
                          customStyle={{
                            margin: 0,
                            padding: "1.5rem",
                            backgroundColor: "transparent",
                            fontSize: "0.85rem",
                            lineHeight: "1.6",
                          }}
                        >
                          {reusableCode}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Usage Section */}
            <section id="usage" className="space-y-6 min-w-0 pt-8 border-t border-border/40">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Usage</h2>
                <p className="text-muted-foreground">Implement the component in your project.</p>
              </div>
              <div className="relative group rounded-xl border border-border/50 bg-zinc-950 overflow-hidden flex flex-col w-full min-w-0 shadow-sm">
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-white/5 justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-zinc-400" />
                    <span className="text-xs text-zinc-400 font-medium font-sans select-none">Example Implementation</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(component.codes?.next || reusableCode);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 1500);
                    }}
                    className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white transition-all shadow-sm border border-white/10 flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    {copiedCode ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="overflow-x-auto w-full bg-zinc-950">
                  <SyntaxHighlighter
                    language="tsx"
                    style={activeSyntaxStyle}
                    customStyle={{
                      margin: 0,
                      padding: "1.5rem",
                      backgroundColor: "transparent",
                      fontSize: "0.85rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {component.codes?.next || reusableCode || "No example provided."}
                  </SyntaxHighlighter>
                </div>
              </div>
            </section>

            {/* Features & Notes */}
            {(component.details?.length > 0 || component.usage?.length > 0) && (
              <section className="space-y-10 min-w-0 pt-8 border-t border-border/40">
                
                {component.details?.length > 0 && (
                  <div id="features" className="space-y-6 min-w-0">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">Features</h2>
                      <p className="text-muted-foreground">Key capabilities and highlights.</p>
                    </div>
                    <div className="bg-card border border-border/50 p-6 md:p-8 rounded-xl shadow-sm w-full">
                      <div className="flex items-center gap-3 text-foreground font-semibold mb-6">
                        <Sparkles size={18} className="text-primary" /> Key Capabilities
                      </div>
                      <ul className="space-y-4">
                        {component.details.map((detail: string, i: number) => (
                          <li key={i} className="text-muted-foreground flex items-start gap-3">
                            <span className="text-primary/60 mt-1 text-xs">◆</span>
                            <span className="leading-relaxed text-sm"><HighlightText text={detail} /></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {component.usage?.length > 0 && (
                  <div id="notes" className="space-y-6 min-w-0 pt-4">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">Notes</h2>
                      <p className="text-muted-foreground">Important implementation details to consider.</p>
                    </div>
                    <div className="bg-card border border-border/50 p-6 md:p-8 rounded-xl shadow-sm w-full">
                      <div className="flex items-center gap-3 text-foreground font-semibold mb-6">
                        <Box size={18} className="text-primary" /> Implementation Details
                      </div>
                      <ul className="space-y-4">
                        {component.usage.map((useCase: string, i: number) => (
                          <li key={i} className="text-muted-foreground flex items-start gap-3">
                            <span className="text-primary/60 mt-1 text-xs">◆</span>
                            <span className="leading-relaxed text-sm"><HighlightText text={useCase} /></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </section>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
