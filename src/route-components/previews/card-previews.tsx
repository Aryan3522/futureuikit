"use client";

import React from "react";
import { BasicCard } from "@/components/ui/basic-card";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CardAvatar,
  CardBadge,
  CardMedia,
  CardStat,
  CardAction,
  CardSeparator,
  type CardVariant,
  type CardTheme,
  type CardShape,
  type CardSpacing,
  type CardLayout
} from "@/components/ui/card";
import { GlassPanel } from "@/components/ui/glass-panel";
import { HoverGlareCard } from "@/components/ui/hover-glare-card";
import { ExpandingFlexCard } from "@/components/ui/expanding-flex-card";
import { NexusCard } from "@/components/ui/nexus-card";
import { Button } from "@/components/ui/button";
import { DotBackground } from "@/components/ui/dot-background";
import { cn } from "@/lib/utils";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";
import { Sparkles } from "lucide-react";

export const BasicCardPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
  const [variant, setVariant] = React.useState<
    "default" | "elevated" | "interactive" | "feature" | "stats" | "content" | "compact" | "media"
  >("default");

  return (
    <PreviewContainer
      title="Basic Card"
      description="A premium composable card system. Each variant is purpose-built for a specific UI context."
      variants={["default", "elevated", "interactive", "feature", "stats", "content", "compact", "media"]}
      activeVariant={variant}
      onVariantChange={setVariant} 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setPreviewShape(s)}
                  className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)}
                  className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      <div className="w-full flex items-center justify-center p-8">
        <BasicCard variant={variant} color={previewColor} shape={previewShape} spacing={previewSpacing} />
      </div>
    </PreviewContainer>
  );
};

export const StandardCardPreview: React.FC = () => {
  const [previewColor, setPreviewColor] = React.useState<any>("default");
  const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [stylingVariant, setStylingVariant] = React.useState<CardVariant>("solid");
  const [layout, setLayout] = React.useState<CardLayout>("default");
  const [theme, setTheme] = React.useState<CardTheme>("default");
  const [shape, setShape] = React.useState<CardShape>("default");
  const [spacing, setSpacing] = React.useState<CardSpacing>("default");
  const [shadow, setShadow] = React.useState<"default" | "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl">("default");

  const renderCardContent = () => {
    const cardProps = { variant: stylingVariant, color: previewColor, theme, shape, spacing, shadow, layout };
    switch (layout) {
      case "media":
        return (
          <Card className="w-full max-w-md mx-auto" {...cardProps}>
            <CardMedia src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" aspectRatio="video" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Media Card</CardTitle>
                <CardBadge tone="success">New</CardBadge>
              </div>
              <CardDescription>Card with image header</CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>A beautiful card with a media header image.</CardDescription>
            </CardContent>
            <CardFooter>
              <CardAction tone="primary" className="w-full">Action</CardAction>
            </CardFooter>
          </Card>
        );
      case "content":
        return (
          <Card className="w-full max-w-md mx-auto" {...cardProps}>
            <CardHeader>
              <CardBadge tone="info" className="w-fit">Article</CardBadge>
              <CardTitle>Content Card</CardTitle>
              <CardDescription>By Author • 5 min read</CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>Content description for the article style card layout.</CardDescription>
            </CardContent>
            <CardFooter>
              <CardAction tone="link">Read more →</CardAction>
            </CardFooter>
          </Card>
        );
      case "stats":
        return (
          <Card className="w-full max-w-md mx-auto" {...cardProps}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CardBadge tone="success">+12%</CardBadge>
            </CardHeader>
            <CardContent>
              <CardStat value="$24,592" label="Active users this month" trend="up" trendValue="14%" />
            </CardContent>
          </Card>
        );
      case "compact":
        return (
          <Card className="w-full max-w-md mx-auto" {...cardProps}>
            <CardAvatar initials="AH" size="sm" />
            <div className="flex flex-col flex-1">
              <CardTitle className="text-sm">Aryan Hooda</CardTitle>
              <CardDescription className="text-xs">Full Stack Developer</CardDescription>
            </div>
            <CardAction tone="ghost">View</CardAction>
          </Card>
        );
      case "feature":
        return (
          <Card className="w-full max-w-md mx-auto" {...cardProps}>
            <div className={cn("w-12 h-12 flex items-center justify-center rounded-full", previewColor === "default" ? "bg-primary/10 text-primary" : "text-blue-600 bg-blue-600/10")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Feature Card</CardTitle>
              <CardDescription>Centered layout with icon for feature highlights.</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <CardAction tone="secondary" className="w-full">Learn more</CardAction>
            </CardContent>
          </Card>
        );
      case "interactive":
        return (
          <Card className="w-full max-w-md mx-auto" {...cardProps}>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Clickable card with hover and scale effects.</CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>Click or tap to interact with this card.</CardDescription>
            </CardContent>
            <CardFooter>
              <CardAction tone="primary" className="w-full">Action</CardAction>
            </CardFooter>
          </Card>
        );
      default:
        return (
          <Card className="w-full max-w-md mx-auto" {...cardProps}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardAvatar initials="AH" size="md" />
                  <div className="flex flex-col">
                    <CardTitle>Aryan Hooda</CardTitle>
                    <CardDescription className="text-xs">Full Stack Developer</CardDescription>
                  </div>
                </div>
                <CardBadge tone="success">Available</CardBadge>
              </div>
            </CardHeader>
            <CardSeparator />
            <CardContent>
              <CardDescription>Building scalable web apps with React, Node.js & MongoDB.</CardDescription>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2">
                <CardStat value="24" label="Projects" />
                <CardStat value="3+" label="Years" />
                <CardStat value="12" label="Clients" />
              </div>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-3">
              <CardAction tone="primary" className="w-full flex-1">Connect</CardAction>
              <CardAction tone="secondary" className="w-full flex-1">View Profile</CardAction>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <PreviewContainer
      title="Standard Card"
      description="A base structural card component with layout variants."
      variants={["default", "elevated", "interactive", "feature", "stats", "content", "compact", "media"] as CardLayout[]}
      activeVariant={layout}
      onVariantChange={setLayout as any}
      colors={DEFAULT_COLORS}
      activeColor={previewColor}
      onColorChange={setPreviewColor}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Style</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["solid", "outline", "ghost", "link"] as CardVariant[]).map(v => (
                <button key={v} onClick={() => setStylingVariant(v)}
                  className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", stylingVariant === v ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{v}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Theme</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "modern", "clean", "futuristic", "brutal", "halftone"] as CardTheme[]).map(t => (
                <button key={t} onClick={() => setTheme(t)}
                  className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", theme === t ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{t}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as CardShape[]).map(s => (
                <button key={s} onClick={() => setShape(s)}
                  className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", shape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as CardSpacing[]).map(s => (
                <button key={s} onClick={() => setSpacing(s)}
                  className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", spacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shadow</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"] as const).map(s => (
                <button key={s} onClick={() => setShadow(s)}
                  className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", shadow === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      {renderCardContent()}
    </PreviewContainer>
  );
};

export const GlassPanelPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
  const [variant, setVariant] = React.useState<"mantle" | "heavy" | "subtle" | "frost">("heavy");
  const [glow, setGlow] = React.useState<"none" | "subtle" | "luminous">("subtle");

  return (
    <PreviewContainer 
      title="Glass Panel" 
      description="A premium glassmorphic panel with heavy blur and luminous shadows."
      contentClassName="bg-transparent p-0 relative border-none"
      isVirtualScreen={false}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Blur Variant</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["subtle", "mantle", "heavy", "frost"] as const).map(v => (
                <button key={v} onClick={() => setVariant(v)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", variant === v ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{v}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Glow Effect</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["none", "subtle", "luminous"] as const).map(g => (
                <button key={g} onClick={() => setGlow(g)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", glow === g ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{g}</button>
              ))}
            </div>
          </div>
        </>
      } colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-12 min-h-[400px] relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-colors-muted-foreground)_1px,_transparent_1px)] bg-[size:16px_16px] dark:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_1px)]">
        {/* Colorful Blobs to show off the glass blur effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/30 rounded-full blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 translate-x-1/4 translate-y-1/4 w-56 h-56 bg-purple-500/30 rounded-full blur-3xl mix-blend-screen pointer-events-none" />

        <div className="relative z-10 w-full max-w-lg">
          <GlassPanel variant={variant} glow={glow} className="p-8 md:p-12 text-center flex flex-col items-center" color={previewColor}>
            <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md mb-6 flex items-center justify-center border border-white/20">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">Glassmorphism</h2>
            <p className="text-foreground/80 leading-relaxed font-medium">This panel uses background blur with translucent overlays to create a premium frosted glass effect.</p>
          </GlassPanel>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const HoverGlareCardPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [layout, setLayout] = React.useState<"default" | "media" | "content" | "stats" | "compact" | "feature">("default");
  const [styleVariant, setStyleVariant] = React.useState<"default" | "glass" | "solid" | "ghost">("glass");
  const [glow, setGlow] = React.useState<"none" | "primary" | "secondary" | "white">("primary");
  const [previewShape, setPreviewShape] = React.useState<any>("default");
  const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
  return (
    <PreviewContainer
      title="Hover Glare Card"
      description="A highly composable premium card with a signature diagonal glare sweep. Supports multiple real-world layouts."
      variants={["default", "media", "content", "stats", "compact", "feature"]}
      activeVariant={layout}
      onVariantChange={setLayout as any}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Style</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "glass", "solid", "ghost"] as const).map(v => (
                <button key={v} onClick={() => setStyleVariant(v)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", styleVariant === v ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{v}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Glow</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["none", "primary", "secondary", "white"] as const).map(g => (
                <button key={g} onClick={() => setGlow(g)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", glow === g ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{g}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
              ))}
            </div>
          </div>
        </>
      } colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="flex items-center justify-center w-full h-full p-4 sm:p-8 min-h-100">
        <HoverGlareCard
          layout={layout}
          variant={styleVariant}
          glow={glow} color={previewColor}
          shape={previewShape}
          spacing={previewSpacing}
        />
      </div>
    </PreviewContainer>
  );
};

export const ExpandingCardPreview: React.FC = () => {
  const [previewColor, setPreviewColor] = React.useState<any>("default");
  const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [previewTheme, setPreviewTheme] = React.useState<any>("default");
  const [previewShape, setPreviewShape] = React.useState<any>("default");
  const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

  const extraControls = (
    <div className="flex flex-col gap-4 w-full mt-4 border-t border-border/50 pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Theme</span>
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["default", "modern", "clean", "futuristic", "brutal", "halftone"] as const).map(t => (
            <button key={t} onClick={() => setPreviewTheme(t)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewTheme === t ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["default", "square", "rounded", "sharp"] as const).map(s => (
            <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
            <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <PreviewContainer 
      title="Expanding Flex Card" 
      description="A beautiful, interactive expanding flex layout." 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor} 
      variants={["solid", "outline", "ghost", "link"]} 
      activeVariant={previewVariant} 
      onVariantChange={setPreviewVariant}
      extraControls={extraControls}
    >
      <ExpandingFlexCard
        color={previewColor}
        variant={previewVariant}
        theme={previewTheme}
        shape={previewShape}
        spacing={previewSpacing}
        options={[
          {
            id: 1,
            main: "Forest",
            sub: "Majestic trees",
            img: "https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
            icon: "🚶",
          },
          {
            id: 2,
            main: "Winter",
            sub: "Delicate fall",
            img: "https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg",
            icon: "❄️",
          },
          {
            id: 3,
            main: "Ocean",
            sub: "Deep blue",
            img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
            icon: "🌊",
          },
          {
            id: 4,
            main: "Desert",
            sub: "Golden sands",
            img: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?ixlib=rb-4.0.3&q=80",
            icon: "☀️",
          },
        ]}
      />
    </PreviewContainer>
  );
};

export const NexusCardPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [variant, setVariant] = React.useState<"default" | "glass" | "solid" | "neon">("default");

  return (
    <PreviewContainer
      title="Nexus Card"
      description="A premium 3D parallax card with reactive spotlight."
      variants={["default", "glass", "solid", "neon"]}
      activeVariant={variant}
      onVariantChange={setVariant as any} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="flex items-center justify-center w-full h-full p-4 sm:p-8">
        <NexusCard className="w-80 h-96" variant={variant} color={previewColor}>
          <h2 className="text-2xl font-bold text-foreground mb-2">Nexus Design</h2>
          <p className="text-muted-foreground">Hover over this card to experience the premium tactile feel, reactive spotlight, and 3D parallax tilt.</p>
        </NexusCard>
      </div>
    </PreviewContainer>
  );
};
