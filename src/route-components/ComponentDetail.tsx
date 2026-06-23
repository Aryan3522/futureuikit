"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { componentsList, registry } from "@/data/component-library-data";
import { Check, Copy, Sparkles, Box, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentRenderer } from "@/registry/ComponentRenderer";
import { CodeBlock } from "@/components/shared/codeBlock";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BrowserWindow } from "@/components/ui/browser-window";

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
    const [copiedCode, setCopiedCode] = useState(false);
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
    const cliCommand = slug === "icons" ? "npm install futureuikit" : `npx futureuikit add ${slug}`;
    const importCommand = slug === "icons" ? `import { GithubIcon } from "futureuikit/icons"` : `import { ${component.title.replace(/[^a-zA-Z]/g, '')} } from "@/components/ui/${slug}"`;

    return (
        <div className="w-full relative selection:bg-primary/30 min-h-screen">
            {slug === "scroll-progress" && <ScrollProgress />}

            <div className="flex items-start gap-8 lg:gap-12 relative z-10 min-w-0">
                {/* Main Content Area */}
                <main className="flex-1 min-w-0 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden mx-auto w-full">

                    <div className="flex flex-col gap-12 min-w-0 w-full">

                        {/* Component Hero & Preview (Side by Side) */}
                        <section id="overview" className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[400px_1fr] gap-8 lg:gap-12 min-w-0 w-full">

                            {/* Left Column (Metadata) */}
                            <div className="flex flex-col gap-8 min-w-0 pt-2">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-4">
                                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                                            {component.title}
                                        </h1>

                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {component.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="px-3 py-1.5 bg-muted border border-border/50 rounded-lg font-mono text-[11px] font-semibold tracking-wide text-foreground uppercase">
                                            {component.category}
                                        </span>
                                        {component.isNew && (
                                            <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg font-mono text-[11px] font-semibold tracking-wide uppercase">
                                                New Release
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 pt-8 border-t border-border/40">
                                    <div id="installation" className="flex flex-col gap-4 min-w-0">
                                        <h3 className="text-sm font-semibold tracking-tight text-foreground">Installation</h3>
                                        <div className="relative group rounded-xl border border-border/50 bg-muted/30 overflow-hidden flex flex-col transition-colors hover:bg-muted/40">
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
                                                    className="p-2 rounded-lg bg-background/50 hover:bg-background border border-border/50 transition-all flex items-center justify-center shrink-0 text-foreground"
                                                >
                                                    {copiedCli ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="import" className="flex flex-col gap-4 min-w-0">
                                        <h3 className="text-sm font-semibold tracking-tight text-foreground">Import</h3>
                                        <div className="relative group rounded-xl border border-border/50 bg-muted/30 overflow-hidden flex flex-col transition-colors hover:bg-muted/40">
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
                                                    className="p-2 rounded-lg bg-background/50 hover:bg-background border border-border/50 transition-all flex items-center justify-center shrink-0 text-foreground"
                                                >
                                                    {copiedImport ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Right Column Wrapper */}
                            <div className="flex flex-col gap-6 min-w-0 h-full">
                                {/* Live Component Preview & Code Tab */}
                                <div className="min-h-[500px] flex-1 flex flex-col min-w-0">

                                    {/* Tabs Header */}
                                    <div className="flex items-center gap-8 border-b border-border/40 mb-6 px-2">
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
                                            <BrowserWindow
                                                title={`${slug}.tsx`}
                                                className="w-full h-full"
                                                headerAction={
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(reusableCode);
                                                            setCopiedCode(true);
                                                            setTimeout(() => setCopiedCode(false), 1500);
                                                        }}
                                                        className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
                                                    >
                                                        {copiedCode ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                                    </button>
                                                }
                                            >
                                                <CodeBlock
                                                    showHeader={false}
                                                    language="tsx"
                                                    code={reusableCode}
                                                    className="w-full h-full border-none rounded-none bg-transparent dark:bg-transparent shadow-none"
                                                />
                                            </BrowserWindow>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Portaled Variant Controls Container (Full Width) */}
                        <div id="preview-controls-container" className="w-full shrink-0 empty:hidden rounded-xl border border-border/50 bg-muted/10 shadow-sm relative z-20"></div>

                        {/* Usage Example Section */}
                        <section id="usage-example" className="flex flex-col gap-8 min-w-0 pt-12 border-t border-border/40">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold tracking-tight text-foreground">Usage Example</h2>
                                <p className="text-muted-foreground">A basic implementation example to get you started.</p>
                            </div>
                            <CodeBlock
                                language="tsx"
                                filename="Example Implementation"
                                code={
                                    component.codes?.next ||
                                    reusableCode ||
                                    "No example provided."
                                }
                            />
                        </section>

                        {/* Features & Notes */}
                        {(component.details?.length > 0 || component.usage?.length > 0) && (
                            <section className="flex flex-col gap-12 min-w-0 pt-12 border-t border-border/40">

                                {component.details?.length > 0 && (
                                    <div id="features" className="flex flex-col gap-8 min-w-0">
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Features</h2>
                                            <p className="text-muted-foreground">Key capabilities and highlights.</p>
                                        </div>
                                        <div className="bg-card border border-border/50 p-6 rounded-xl shadow-sm w-full">
                                            <div className="flex items-center gap-3 text-foreground font-semibold mb-6">
                                                <Sparkles size={18} className="text-primary" /> Key Capabilities
                                            </div>
                                            <ul className="flex flex-col gap-4">
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
                                    <div id="notes" className="flex flex-col gap-8 min-w-0">
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Notes</h2>
                                            <p className="text-muted-foreground">Important implementation details to consider.</p>
                                        </div>
                                        <div className="bg-card border border-border/50 p-6 rounded-xl shadow-sm w-full">
                                            <div className="flex items-center gap-3 text-foreground font-semibold mb-6">
                                                <Box size={18} className="text-primary" /> Implementation Details
                                            </div>
                                            <ul className="flex flex-col gap-4">
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
