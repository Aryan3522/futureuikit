"use client";

import React, { useState, useMemo, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { componentsList } from "@/data/component-library-data";
import { registry } from "@/data/component-library-data";
import ComponentPageSidebar from "@/components/ui/ComponentPageSidebar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Code as CodeIcon, Copy, GalleryHorizontalEnd, ListCollapse, MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PillHeader } from "@/components/ui/PillHeader";
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

const Heading = ({ className, variant, as: Tag = "h1", ...props }) => (
  <Tag className={cn(headingVariants({ variant, className }))} {...props} />
);

const Text = ({ className, variant, as: Tag = "p", ...props }) => (
  <Tag className={cn(textVariants({ variant, className }))} {...props} />
);

const Label = ({ className, as: Tag = "label", ...props }) => (
  <Tag className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
);

const Code = ({ className, ...props }) => (
  <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)} {...props} />
);

const ComponentLivePreview = ({ id, slug }) => {
  switch (Number(id)) {
    case 1: // Primary Button
      return (
        <div className="flex flex-col gap-8 w-full max-w-4xl p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-items-center">
            <PrimaryButton variant="primary">Primary</PrimaryButton>
            <PrimaryButton variant="success">Success</PrimaryButton>
            <PrimaryButton variant="warning">Warning</PrimaryButton>
            <PrimaryButton variant="danger">Danger</PrimaryButton>
            <PrimaryButton variant="info">Info</PrimaryButton>
            <PrimaryButton variant="secondary">Secondary</PrimaryButton>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-items-center border-t border-border/20 pt-8">
            <PrimaryButton variant="primary" mode="modern">Modern</PrimaryButton>
            <PrimaryButton variant="success" mode="clean">Clean Success</PrimaryButton>
            <PrimaryButton variant="danger" mode="minimal">Minimal Danger</PrimaryButton>
            <PrimaryButton variant="primary" disabled>Disabled</PrimaryButton>
          </div>
        </div>
      );

    case 2: // Glowy Button
      return (
        <div className="flex flex-col gap-8 w-full max-w-5xl p-4">
          <div className="flex flex-wrap gap-6 items-center justify-center">
            <GlowyButton variant="primary">Primary</GlowyButton>
            <GlowyButton variant="success">Success</GlowyButton>
            <GlowyButton variant="warning">Warning</GlowyButton>
            <GlowyButton variant="danger">Danger</GlowyButton>
            <GlowyButton variant="info">Info</GlowyButton>
            <GlowyButton variant="secondary">Secondary</GlowyButton>
          </div>
          <div className="flex flex-wrap gap-6 items-center justify-center border-t border-border/20 pt-8">
            <GlowyButton variant="primary">Modern Glow</GlowyButton>
            <GlowyButton variant="success">Clean Glow</GlowyButton>
            <GlowyButton variant="danger">Minimal Glow</GlowyButton>
            <GlowyButton variant="primary" disabled>Disabled</GlowyButton>
          </div>
        </div>
      );

    case 3: // Basic Card
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 w-full justify-items-center">
          <BasicCard variant="modern" color="#6366f1" name="Aryan Hooda" title="Full Stack Developer" />
          <BasicCard variant="clean" color="#10b981" name="John Doe" title="Product Designer" />
          <BasicCard variant="minimal" color="#f59e0b" name="Sarah Smith" title="UI Engineer" />
        </div>
      );

    case 4: // Boxy Loader (boxy-rotate)
      return <ActualBoxyRotateLoader />;

    case 5: // Boxy Loader (boxy-bounce)
      return <ActualBoxyBounceLoader />;

    case 6: // Boxy Loader (boxy-shift)
      return <ActualBoxyShiftLoader />;

    case 7: // Typography System
      return (
        <div className="max-w-2xl w-full flex flex-col gap-8 p-4 select-text">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-blue-500">Semantic Headings</Label>
            <Heading variant="h1">Heading 1</Heading>
            <Heading variant="h2">Heading 2</Heading>
            <Heading variant="h3">Heading 3</Heading>
          </div>

          <div className="space-y-4">
            <Label className="text-xs uppercase tracking-widest text-blue-500">Text Variants</Label>
            <Text variant="lead">
              This is a lead paragraph. It{"'"}s designed to stand out and draw the reader in.
            </Text>
            <Text>
              This is the default body text. It follows standard leading and spacing rules for optimal readability across various devices and screen sizes.
            </Text>
            <Text variant="muted">
              This is muted text, perfect for secondary information or legal disclaimers.
            </Text>
            <Text variant="blockquote">
              {"\""}Typography is the craft of endowing human language with a durable visual form.{"\""}
            </Text>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-blue-500">Inline Elements</Label>
            <div className="flex items-center gap-4">
              <Label>A standard label</Label>
              <Code>npm install futureuikit</Code>
            </div>
          </div>
        </div>
      );

    case 8: // Carousel Slider
      return (
        <ActualCarouselSlider 
          slides={[
            { id: 1, tag: "EXPLORE", title: "EXOTIC ADVENTURE", location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1556206079-747a7a424d3d?ixlib=rb-4.0.3&q=80", tagBg: "bg-indigo-600" },
            { id: 2, tag: "CITY", title: "URBAN EXPLORER", location: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1571900670723-a317a66e3fb7?ixlib=rb-4.0.3&q=80", tagBg: "bg-emerald-600" },
            { id: 3, tag: "HISTORY", title: "MAJESTIC PARIS", location: "Paris, France", image: "https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&q=80", tagBg: "bg-amber-600" }
          ]} 
        />
      );

    case 9: // NavMenu
      return <ActualNavMenu />;

    case 10: // Error Page
      return <ActualErrorPage errorCode="404" errorText="ERROR" />;

    case 11: // Expanding Flex Card
      return (
        <ActualExpandingFlexCard 
          options={[
            { id: 1, main: "Forest", sub: "Majestic trees and silence", img: "https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg", icon: "🚶" },
            { id: 2, main: "Winter", sub: "The snowflakes' delicate fall", img: "https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg", icon: "❄️" },
            { id: 3, main: "Spring", sub: "Life blooming everywhere", img: "https://66.media.tumblr.com/5af3f8303456e376ceda1517553ba786/tumblr_o4986gakjh1qho82wo1_1280.jpg", icon: "🌲" },
            { id: 4, main: "Summer", sub: "Warm sunny days of joy", img: "https://66.media.tumblr.com/5516a22e0cdacaa85311ec3f8fd1e9ef/tumblr_o45jwvdsL11qho82wo1_1280.jpg", icon: "☀️" }
          ]}
        />
      );

    case 12: // Basic Loader
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 p-8 w-full max-w-2xl items-center justify-items-center">
          <BasicLoader variant="modern" color="#3b82f6" text="Modern..." />
          <BasicLoader variant="clean" color="#10b981" text="Clean..." />
          <BasicLoader variant="minimal" color="#f59e0b" text="Minimal..." />
        </div>
      );

    default:
      return (
        <div className="text-center select-text">
          Live Next.js Preview for {slug}
        </div>
      );
  }
};

const ComponentDetail = ({ type, slug, id }) => {
  const [copied, setCopied] = useState(false);
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

  const registryComponent = registry[slug];
  const reusableCode = registryComponent?.files[0]?.content || "";
  const cliCommand = `npx futureuikit add ${slug}`;
  const htmlCode = component?.codes?.html || "";
  const cssCode = component?.codes?.css || "";
  const nextUsage = component?.codes?.next || component?.codes?.react || "";

  const availableCodes = [];
  if (cliCommand) availableCodes.push({ key: "cli", label: "CLI", code: cliCommand, lang: "bash" });
  if (reusableCode) availableCodes.push({ key: "manual", label: "Manual", code: reusableCode, lang: "javascript" });
  if (nextUsage) availableCodes.push({ key: "usage", label: "Usage", code: nextUsage, lang: "javascript" });
  if (htmlCode) availableCodes.push({ key: "html", label: "HTML", code: htmlCode, lang: "html" });
  if (cssCode) availableCodes.push({ key: "css", label: "CSS", code: cssCode, lang: "css" });

  const [activeCode, setActiveCode] = useState(availableCodes[0]?.key || "cli");

  const activeCodeData = availableCodes.find(c => c.key === activeCode) || availableCodes[0];

  const codeToShow = activeCodeData?.code || "";
  const langToShow = activeCodeData?.lang || "javascript";

  return (
    <div className="select-none min-h-screen flex justify-center text-foreground pt-16 md:pt-24">
      <PillHeader />
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
            <p className="text-muted-foreground text-base md:text-lg">
              {component.description}
            </p>
          </div>

          <section className="mb-4">
            <div className="rounded-xl overflow-hidden border border-border bg-card/40 backdrop-blur-md p-2 md:p-6 shadow-sm">
              <div className="flex justify-center items-center rounded-lg overflow-hidden bg-card/30 backdrop-blur-lg border border-border/40 w-full min-h-[300px] md:min-h-[450px] mb-4 relative select-text shadow-inner">
                <div className="w-full h-full flex items-center justify-center p-4">
                  <ComponentLivePreview id={id} slug={slug} />
                </div>
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
                    style={vscDarkPlus}
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
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
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
