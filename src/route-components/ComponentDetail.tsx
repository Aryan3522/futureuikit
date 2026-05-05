"use client";

import React, { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { componentsList, registry } from "@/data/component-library-data";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Code as CodeIcon, Copy, GalleryHorizontalEnd, ListCollapse, ChevronLeft } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { GlowyButton } from "@/components/ui/glowy-button";
import { PrimaryButton } from "@/components/ui/primary-button";
import { BasicCard } from "@/components/ui/basic-card";
import { BasicLoader } from "@/components/ui/basic-loader";
import { CarouselSlider as ActualCarouselSlider } from "@/components/ui/carousel-slider";
import { NavMenu as ActualNavMenu } from "@/components/ui/nav-menu";
import { ErrorPage as ActualErrorPage } from "@/components/ui/error-page";
import { ExpandingFlexCard as ActualExpandingFlexCard } from "@/components/ui/expanding-flex-card";
import { BoxyRotateLoader as ActualBoxyRotateLoader } from "@/components/ui/boxy-rotate-loader";
import { BoxyBounceLoader as ActualBoxyBounceLoader } from "@/components/ui/boxy-bounce-loader";
import { BoxyShiftLoader as ActualBoxyShiftLoader } from "@/components/ui/boxy-shift-loader";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold",
      h4: "scroll-m-20 text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
    },
  },
  defaultVariants: { variant: "h1" },
});

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
    },
  },
  defaultVariants: { variant: "default" },
});

const Heading: React.FC<{ className?: string; variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; as?: any; children: React.ReactNode }> = ({ className, variant, as: Tag = "h1", ...props }) => (
  <Tag className={cn(headingVariants({ variant, className }))} {...props} />
);

const Text: React.FC<{ className?: string; variant?: "default" | "lead" | "large" | "small" | "muted" | "blockquote"; as?: any; children: React.ReactNode }> = ({ className, variant, as: Tag = "p", ...props }) => (
  <Tag className={cn(textVariants({ variant, className }))} {...props} />
);

const Label: React.FC<{ className?: string; as?: any; children: React.ReactNode }> = ({ className, as: Tag = "label", ...props }) => (
  <Tag className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
);

const Code: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, ...props }) => (
  <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)} {...props} />
);

import { PreviewRegistry } from "./PreviewRegistry";
import { DotBackground } from "@/components/ui/dot-background";

const ComponentLivePreview: React.FC<{ id: string | number; slug: string }> = ({ slug }) => {
  const Preview = PreviewRegistry[slug];

  if (!Preview) {
    return (
      <div className="text-center select-text">
        Live Next.js Preview for {slug}
      </div>
    );
  }

  return <Preview />;
};

interface ComponentDetailProps {
  type: string;
  slug: string;
  id: string;
}

const ComponentDetail: React.FC<ComponentDetailProps> = ({ type, slug, id }) => {
  const [copied, setCopied] = useState(false);
  const [activeCode, setActiveCode] = useState<string>("cli");
  const router = useRouter();

  const component = componentsList.find(
    (item) =>
      item.id === Number(id) &&
      item.type.toLowerCase() === type &&
      item.slug === slug
  );

  if (!component) {
    notFound();
  }

  const registryComponent = (registry as any)[slug];
  const reusableCode = registryComponent?.files[0]?.content || "";
  const cliCommand = `npx futureuikit add ${slug}`;
  const htmlCode = component?.codes?.html || "";
  const cssCode = component?.codes?.css || "";
  const nextUsage = component?.codes?.next || component?.codes?.react || "";

  const availableCodes: { key: string; label: string; code: string; lang: string }[] = [];
  if (cliCommand) availableCodes.push({ key: "cli", label: "CLI", code: cliCommand, lang: "bash" });
  if (reusableCode) availableCodes.push({ key: "manual", label: "Manual", code: reusableCode, lang: "javascript" });
  if (nextUsage) availableCodes.push({ key: "usage", label: "Usage", code: nextUsage, lang: "javascript" });
  if (htmlCode) availableCodes.push({ key: "html", label: "HTML", code: htmlCode, lang: "html" });
  if (cssCode) availableCodes.push({ key: "css", label: "CSS", code: cssCode, lang: "css" });

  const activeCodeData = availableCodes.find(c => c.key === activeCode) || availableCodes[0];

  const codeToShow = activeCodeData?.code || "";
  const langToShow = activeCodeData?.lang || "javascript";

  return (
    <div className="select-none min-h-screen flex justify-center text-foreground pt-16 md:pt-24">
      <Header />
      <div className="relative flex-1 w-full max-w-5xl transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="mb-4 rounded-xl border border-border bg-card/40 backdrop-blur p-4 md:p-6 shadow-sm">
            <div className="mb-4 pb-4 border-b flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="h-9 w-9 shrink-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight line-clamp-1">
                {component.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {component.description}
            </p>
          </div>

          <section className="mb-8">
            <div className="rounded-xl overflow-hidden border border-border bg-card/40 backdrop-blur-md p-2 md:p-6 shadow-sm">
              {/* Header Label for Preview */}
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Live Interactive Preview</span>
              </div>

              <div className="relative w-full min-h-[300px] sm:min-h-[450px] flex-1 mb-8 overflow-hidden rounded-2xl border border-border/40 shadow-inner group bg-muted/20 flex">
                {/* 1. Component Background - Always Full Bleed */}
                <div className="absolute inset-0 z-0">
                  {component.type.toLowerCase().includes("background") ? (
                    <ComponentLivePreview id={id} slug={slug} />
                  ) : (
                    <DotBackground 
                      dotColor="var(--primary)" 
                      maskOpacity={0.05}
                      className="bg-linear-to-br from-muted/50 to-muted/20 absolute inset-0"
                    />
                  )}
                </div>

                {/* 2. Component Content (For non-background components) */}
                {!component.type.toLowerCase().includes("background") && (
                  <div className="relative z-10 w-full flex items-center justify-center p-8 sm:p-20 select-text">
                    <ComponentLivePreview id={id} slug={slug} />
                  </div>
                )}
              </div>

              {/* Code Section */}
              <div className="relative rounded-lg border border-border/50 bg-card/10 backdrop-blur-md p-3 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <CodeIcon size={24} className="text-primary" />
                    <span className="text-sm uppercase tracking-wider">Source</span>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
                      {availableCodes.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setActiveCode(item.key)}
                          className={`whitespace-nowrap px-3 py-1.5 rounded-md text-[10px] md:text-xs font-medium transition ${activeCode === item.key
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-muted text-muted-foreground hover:bg-muted/70"
                            }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Copy */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(codeToShow);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      className="shrink-0 text-xs p-2 rounded-md bg-muted hover:bg-muted/90 transition border border-border/50"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                <div className="rounded-lg bg-[#1e1e1e] border border-zinc-800 backdrop-blur-md overflow-hidden">
                  <SyntaxHighlighter
                    className="select-text cursor-text max-h-[500px] overflow-auto overflow-x-hidden rounded-lg"
                    language={langToShow}
                    style={vscDarkPlus as any}
                    customStyle={{
                      background: "transparent",
                      padding: "1rem",
                      borderRadius: "0.75rem",
                      fontSize: "0.95rem",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      border: "none",
                    }}
                    codeTagProps={{
                      style: {
                        whiteSpace: "pre-wrap" as const,
                        wordBreak: "break-word" as const,
                      },
                    }}
                  >
                    {codeToShow}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-1 md:mb-2">
            <div className="rounded-md border border-border bg-card/40 backdrop-blur p-2 md:p-6 shadow">
              <div className="flex gap-2 items-center text-2xl font-semibold mb-2 pb-2 border-b">
                <ListCollapse className="text-red-600" /> Details
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {component.details}
              </p>
            </div>
          </section>

          <section className="mb-1 md:mb-2">
            <div className="rounded-md border border-border bg-card/40 backdrop-blur p-2 md:p-6 shadow">
              <div className="flex gap-2 items-center text-2xl font-semibold mb-2 pb-2 border-b">
                <GalleryHorizontalEnd className="text-blue-600" /> How to Use?
              </div>
              <ul className="space-y-3 list-decimal pl-5 text-muted-foreground">
                {component.usage.map((step, i) => (
                  <li key={i} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetail;
