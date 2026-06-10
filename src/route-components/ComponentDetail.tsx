"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { componentsList, registry } from "@/data/component-library-data";
import { Check, Copy, Sparkles, Box, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentRenderer } from "@/registry/ComponentRenderer";
import { CodeBlock } from "@/components/shared/codeBlock";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

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
    const [copiedCli, setCopiedCli] = useState(false);
    const [copiedImport, setCopiedImport] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");
    const [previewTab, setPreviewTab] = useState<"preview" | "code">("preview");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {

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
    const importCommand = `import { ${component.title.replace(/[^a-zA-Z]/g, '')} } from"@/components/ui/${slug}"`;

    return (
        <div className="w-full relative selection:bg-primary/30 min-h-screen">
            {slug === "scroll-progress" && <ScrollProgress />}

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
                                                <div className="flex items-center gap-3 text-muted-foreground overflow-x-auto">
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
                                                <div className="flex items-center gap-3 text-foreground overflow-x-auto">
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
                            <div className="lg:sticky lg:top-48 h-125 lg:h-[calc(100vh-220px)] lg:max-h-175 flex flex-col min-w-0">

                                {/* Tabs Header */}
                                <div className="flex items-center gap-6 border-b border-border/40 mb-4 px-2">
                                    <button
                                        onClick={() => setPreviewTab("preview")}
                                        className={cn(
                                            "text-sm font-semibold transition-colors relative pb-3 -mb-px",
                                            previewTab === "preview" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        Preview
                                        {previewTab === "preview" && (
                                            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-foreground rounded-t-full" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setPreviewTab("code")}
                                        className={cn(
                                            "text-sm font-semibold transition-colors relative pb-3 -mb-px",
                                            previewTab === "code" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        Code
                                        {previewTab === "code" && (
                                            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-foreground rounded-t-full" />
                                        )}
                                    </button>
                                </div>

                                {/* Tab Content */}
                                <div className="w-full flex-1 flex flex-col overflow-hidden">
                                    {previewTab === "preview" ? (
                                        <div className="w-full h-full max-w-full relative flex virtual-screen-wrapper">
                                            <style dangerouslySetInnerHTML={{
                                                __html: `
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
                                        <CodeBlock
                                            language="tsx"
                                            filename={`${slug}.tsx`}
                                            code={reusableCode}
                                        />
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Usage Section */}
                        <CodeBlock
                            language="tsx"
                            filename="Example Implementation"
                            code={
                                component.codes?.next ||
                                reusableCode ||
                                "No example provided."
                            }
                        />

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
