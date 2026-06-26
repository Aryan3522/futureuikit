"use client";

import React from "react";
import dynamic from "next/dynamic";
import { GithubIcon, LinkedinIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, type ContextMenuShape, type ContextMenuSpacing } from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import VelocityMarquee from "@/components/ui/velocity-marquee";
import { PreviewContainer, DEFAULT_COLORS } from "./preview-engine/PreviewContainer";
import { MigratedPreviews } from "./previews/migrated-previews";
import type { PreviewRegistryMap } from "./preview-engine/preview-types";
import {
  ToastPreview,
  ModalPreview,
  DrawerPreview,
  TogglePreview,
  ErrorPagePreview,
  CinematicErrorPreview,
  CalendarPreview,
  CalculatorPreview,
  DynamicFormPreview,
  SelectPreview,
  FileUploadPreview,
  FormBuilderPreview,
  OTPVerificationPreview,
  PremiumOtpInputPreview,
  FilterBuilderPreview,
  HeaderPreview,
  NavMenuPreview,
  SidebarButtonPreview,
  AccordionPreview,
  DockPreview,
  CommandPalettePreview,
  GlobalBreadcrumbPreview,
  ComponentPageSidebarPreview,
  BasicLoaderPreview,
  BoxyRotatePreview,
  BoxyBouncePreview,
  BoxyShiftPreview,
  BasicCardPreview,
  StandardCardPreview,
  GlassPanelPreview,
  HoverGlareCardPreview,
  ExpandingCardPreview,
  NexusCardPreview,
  FooterPreview,
  PremiumUploadButtonPreview,
  InfiniteSliderPreview,
  NoirHero3DPreview,
  PrimaryButtonPreview,
  GlowyButtonPreview,
  SkeuomorphicButtonPreview,
  ClayMorphButtonPreview,
  MinimalButtonPreview,
  TextSystemPreview,
  DotBackgroundPreview,
  ParticlesPreview,
  PerspectiveGridPreview,
  PointCursorPreview,
  KanbanPreview,
  WorkflowPreview,
  RichTextEditorPreview,
  AIChatPreview,
  AutomotiveCarouselPreview,
  ScifiHelmetPreview,
  BmwM4Preview,
  BrowserWindowPreview,
  TerminalPreview,
  CursorGlowButtonPreview,
  ScrollTextRevealPreview,
  SlideUpRevealPreview,
  SearchPreview,
  SearchInputPreview,
  IconsPreview,
} from "./previews";

/**
 * Registry of all component previews.
 * Previews are extracted into category-based files in ./previews/
 */
export const PreviewRegistry: PreviewRegistryMap = {
  ...MigratedPreviews,
  // Feedback
  toast: function ToastWrapper() {
    return (
      <PreviewContainer title="Toast Notifications" description="Customizable toast notification system.">
        <ToastPreview />
      </PreviewContainer>
    );
  },
  modal: ModalPreview,
  drawer: DrawerPreview,
  toggle: TogglePreview,
  "error-page": ErrorPagePreview,
  "cinematic-error": CinematicErrorPreview,

  // Forms
  calendar: CalendarPreview,
  calculator: CalculatorPreview,
  "dynamic-form": DynamicFormPreview,
  select: SelectPreview,
  "file-upload": FileUploadPreview,
  "form-builder": FormBuilderPreview,
  "otp-verification": OTPVerificationPreview,
  "otp-input": PremiumOtpInputPreview,
  "filter-builder": FilterBuilderPreview,

  // Navigation
  header: HeaderPreview,
  menu: NavMenuPreview,
  "sidebar-button": SidebarButtonPreview,
  accordion: AccordionPreview,
  dock: DockPreview,
  "command-palette": CommandPalettePreview,
  "global-breadcrumb": GlobalBreadcrumbPreview,
  "component-page-sidebar": ComponentPageSidebarPreview,

  // Loaders
  "basic-loader": BasicLoaderPreview,
  "boxy-rotate": BoxyRotatePreview,
  "boxy-bounce": BoxyBouncePreview,
  "boxy-shift": BoxyShiftPreview,

  // Cards
  "basic-card": BasicCardPreview,
  card: StandardCardPreview,
  "glass-panel": GlassPanelPreview,
  "hover-glare-card": HoverGlareCardPreview,
  "expanding-card": ExpandingCardPreview,
  "nexus-card": NexusCardPreview,

  // Layout & Buttons
  footer: FooterPreview,
  "premium-upload-button": PremiumUploadButtonPreview,
  "infinite-slider": InfiniteSliderPreview,
  "noir-hero-3d": NoirHero3DPreview,
  primary: PrimaryButtonPreview,
  glowy: GlowyButtonPreview,
  "skeuomorphic-button": SkeuomorphicButtonPreview,
  "clay-morph-button": ClayMorphButtonPreview,
  "minimal-button": MinimalButtonPreview,

  // Typography
  "text-system": TextSystemPreview,

  // Backgrounds & Cursor
  "dot-background": DotBackgroundPreview,
  particles: ParticlesPreview,
  "perspective-grid": PerspectiveGridPreview,
  "point-cursor": PointCursorPreview,

  // Advanced
  kanban: KanbanPreview,
  "workflow-builder": WorkflowPreview,
  "rich-text-editor": RichTextEditorPreview,
  "ai-chat": AIChatPreview,
  "automotive-carousel": AutomotiveCarouselPreview,
  "scifi-helmet": ScifiHelmetPreview,
  "bmw-m4": BmwM4Preview,
  "browser-window": BrowserWindowPreview,
  terminal: TerminalPreview,
  "cursor-glow-button": CursorGlowButtonPreview,
  "scroll-text-reveal": ScrollTextRevealPreview,
  "slide-up-reveal": SlideUpRevealPreview,

  // Search
  search: SearchPreview,
  "search-input": SearchInputPreview,

  icons: IconsPreview,

  "components-grid": function ComponentsGridPreview() {
    const [previewVariant, setPreviewVariant] = React.useState<any>("default");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<string>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<string>("default");
    const [rx, setRx] = React.useState(0);
    const [ry, setRy] = React.useState(0);
    const [gx, setGx] = React.useState(50);
    const [gy, setGy] = React.useState(50);
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (previewVariant !== "interactive" || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setRx((y - 0.5) * -8);
      setRy((x - 0.5) * 8);
      setGx(x * 100);
      setGy(y * 100);
    };

    const handleMouseLeave = () => {
      if (previewVariant !== "interactive") return;
      setRx(0); setRy(0); setGx(50); setGy(50);
    };

    const colorMap: Record<string, string> = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      blue: "bg-blue-600 text-white hover:bg-blue-700",
      emerald: "bg-emerald-600 text-white hover:bg-emerald-700",
      rose: "bg-rose-600 text-white hover:bg-rose-700",
      amber: "bg-amber-600 text-white hover:bg-amber-700",
      violet: "bg-violet-600 text-white hover:bg-violet-700",
      indigo: "bg-indigo-600 text-white hover:bg-indigo-700",
      sky: "bg-sky-600 text-white hover:bg-sky-700",
      slate: "bg-slate-600 text-white hover:bg-slate-700",
      orange: "bg-orange-600 text-white hover:bg-orange-700",
    };

    const bgMap: Record<string, string> = {
      default: "from-primary/5 to-primary/10",
      blue: "from-blue-500/5 to-blue-500/10",
      emerald: "from-emerald-500/5 to-emerald-500/10",
      rose: "from-rose-500/5 to-rose-500/10",
      amber: "from-amber-500/5 to-amber-500/10",
      violet: "from-violet-500/5 to-violet-500/10",
      indigo: "from-indigo-500/5 to-indigo-500/10",
      sky: "from-sky-500/5 to-sky-500/10",
      slate: "from-slate-500/5 to-slate-500/10",
      orange: "from-orange-500/5 to-orange-500/10",
    };

    const borderMap: Record<string, string> = {
      default: "border-border/60 hover:border-foreground/20",
      blue: "border-blue-500/30 hover:border-blue-500/50",
      emerald: "border-emerald-500/30 hover:border-emerald-500/50",
      rose: "border-rose-500/30 hover:border-rose-500/50",
      amber: "border-amber-500/30 hover:border-amber-500/50",
      violet: "border-violet-500/30 hover:border-violet-500/50",
      indigo: "border-indigo-500/30 hover:border-indigo-500/50",
      sky: "border-sky-500/30 hover:border-sky-500/50",
      slate: "border-slate-500/30 hover:border-slate-500/50",
      orange: "border-orange-500/30 hover:border-orange-500/50",
    };

    const variantCardMap: Record<string, string> = {
      default: "border shadow-sm hover:shadow-2xl backdrop-blur-xl bg-card/40 dark:bg-card/20",
      elevated: "border shadow-lg hover:shadow-3xl bg-card",
      bordered: "border-2 shadow-none bg-transparent",
      minimal: "border-0 shadow-none bg-transparent hover:bg-muted/10",
      interactive: "border shadow-sm hover:shadow-xl bg-card",
    };

    const variantBgMap: Record<string, string> = {
      default: "bg-linear-to-br transition-all duration-500",
      elevated: "bg-linear-to-br transition-all duration-500",
      bordered: "bg-muted/5",
      minimal: "bg-muted/5",
      interactive: "bg-linear-to-br transition-all duration-500",
    };

    const badgeColorMap: Record<string, string> = {
      default: "border-primary/40 text-primary",
      blue: "border-blue-500/40 text-blue-600 dark:text-blue-500",
      emerald: "border-emerald-500/40 text-emerald-600 dark:text-emerald-500",
      rose: "border-rose-500/40 text-rose-600 dark:text-rose-500",
      amber: "border-amber-500/40 text-amber-600 dark:text-amber-500",
      violet: "border-violet-500/40 text-violet-600 dark:text-violet-500",
      indigo: "border-indigo-500/40 text-indigo-600 dark:text-indigo-500",
      sky: "border-sky-500/40 text-sky-600 dark:text-sky-500",
      slate: "border-slate-500/40 text-slate-600 dark:text-slate-400",
      orange: "border-orange-500/40 text-orange-600 dark:text-orange-500",
    };

    const colorBorderVariants = ["default", "elevated", "bordered", "interactive"];
    const colorPreviewVariants = ["default", "elevated", "interactive"];

    const shapeMap: Record<string, string> = {
      default: "rounded-2xl sm:rounded-3xl",
      square: "rounded-none",
      rounded: "rounded-xl sm:rounded-2xl",
      sharp: "rounded-lg",
    };

    const spacingPadMap: Record<string, string> = {
      "2x": "p-3",
      "4x": "p-4",
      "6x": "p-6",
      "8x": "p-7",
      default: "p-5",
    };

    const variants = ["default", "elevated", "bordered", "minimal", "interactive"] as const;

    return (
      <PreviewContainer
        title="Components Grid"
        description="A responsive grid layout for displaying component cards with preview thumbnails, color themes, shape, and spacing variants."
        variants={variants}
        activeVariant={previewVariant}
        onVariantChange={setPreviewVariant}
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        extraControls={
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                  {s}
                </button>
              ))}
            </div>
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                  {s === "2x" ? "2X" : s === "4x" ? "4X" : s === "6x" ? "6X" : s === "8x" ? "8X" : s}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="w-full flex justify-center px-2 sm:px-4 md:px-6 py-6 md:py-10">
          <div className="w-full max-w-md">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={previewVariant === "interactive" ? { transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`, transition: 'transform 0.1s ease-out' } : undefined}
              className={cn("flex flex-col overflow-hidden transition-all duration-500 group", variantCardMap[previewVariant], shapeMap[previewShape], colorBorderVariants.includes(previewVariant) && borderMap[previewColor])}
            >
              <div className="relative w-full min-h-[200px] sm:min-h-[220px] flex-1 overflow-hidden bg-muted/10 flex items-center justify-center">
                <div className={cn("absolute inset-0 z-0 transition-all duration-500", variantBgMap[previewVariant], colorPreviewVariants.includes(previewVariant) && bgMap[previewColor])} />
                <div className="relative z-10">
                  <button className={cn("px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-black/10", colorMap[previewColor])}>
                    Click me
                  </button>
                </div>
                {previewVariant === "interactive" && (
                  <div
                    className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.12) 0%, transparent 60%)` }}
                  />
                )}
              </div>
              <div className={cn(spacingPadMap[previewSpacing], "pb-2")}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold h-4", badgeColorMap[previewColor])}>UI</span>
                </div>
                <h3 className="text-lg font-bold italic transition-colors truncate">Button</h3>
              </div>
              <div className={cn(spacingPadMap[previewSpacing], "pt-0 mt-auto")}>
                <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed mb-4">
                  A versatile button component with color themes, variants, and shape/spacing options for any interaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PreviewContainer>
    );
  },

  "velocity-marquee": function VelocityMarqueePreview() {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [color, setColor] = React.useState<string>("default");
    const [shape, setShape] = React.useState<string>("default");
    const [spacing, setSpacing] = React.useState<string>("default");
    const demoItems = [
      {
        name: "React",
        purpose: "UI Library",
        impact: 95,
        description: "The fundamental view layer allowing declarative component composition.",
        color: "from-cyan-500 to-blue-500",
      },
      {
        name: "Next.js",
        purpose: "React Framework",
        impact: 100,
        description: "Provides the overarching architecture, routing, and rendering strategies.",
        color: "from-neutral-700 to-neutral-500",
      },
      {
        name: "Tailwind CSS",
        purpose: "Styling Engine",
        impact: 90,
        description: "Utility-first CSS framework enabling rapid UI development without context switching.",
        color: "from-teal-400 to-cyan-500",
      },
      {
        name: "Framer Motion",
        purpose: "Animation Library",
        impact: 85,
        description: "Powers the fluid, physics-based animations and layout transitions throughout the site.",
        color: "from-fuchsia-500 to-purple-600",
      },
      {
        name: "Radix UI",
        purpose: "Accessible Primitives",
        impact: 80,
        description: "Unstyled, accessible components forming the foundation of complex interactive elements.",
        color: "from-indigo-500 to-blue-500",
      },
      {
        name: "Lucide",
        purpose: "Iconography",
        impact: 70,
        description: "Beautiful, consistent icons providing visual anchors for interactive elements.",
        color: "from-rose-400 to-red-500",
      },
    ];

    return (
      <PreviewContainer scrollRef={scrollRef} title="Velocity Marquee" description="An interactive marquee grid featuring glowing cards." isVirtualScreen={true} contentClassName="p-0 border-none"
        extraControls={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Color</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "blue", "emerald", "rose", "amber", "violet", "indigo", "sky", "slate", "orange"] as const).map(c => (
                  <button key={c} onClick={() => setColor(c)}
                    className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", color === c ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{c}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "square", "rounded", "sharp"] as const).map(s => (
                  <button key={s} onClick={() => setShape(s)}
                    className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", shape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                  <button key={s} onClick={() => setSpacing(s)}
                    className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", spacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
                ))}
              </div>
            </div>
          </>
        }
      >
        <div className="flex flex-col w-full min-h-[150vh] justify-center items-center relative overflow-hidden bg-background">
          <div className="absolute top-20 flex flex-col items-center text-muted-foreground opacity-50">
            <span className="animate-bounce">↓ Scroll the page to see physics animations ↓</span>
          </div>
          <VelocityMarquee items={demoItems} containerRef={scrollRef} color={color as any} shape={shape as any} spacing={spacing as any} />
        </div>
      </PreviewContainer>
    );
  },

  // Previews not yet moved (as per specific list)
  button: function StandardButtonPreview() {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
    const [previewSize, setPreviewSize] = React.useState<any>("md");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    return (
      <PreviewContainer 
        title="Standard Button" 
        description="The base button component matching Radix / shadcn spec with Future UI standard styling."
        colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} 
        variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}
        extraControls={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["sm", "md", "lg", "icon"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewSize(s)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSize === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "square", "rounded", "sharp"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewShape(s)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewSpacing(s)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
                ))}
              </div>
            </div>
          </>
        }
      >
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
          <div className="flex flex-wrap gap-8 items-center justify-center w-full">
            <Button variant={previewVariant} color={previewColor} size={previewSize} shape={previewShape} spacing={previewSpacing}>
              {previewSize === "icon" ? <GithubIcon className="w-4 h-4" /> : (
                <>
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </>
              )}
            </Button>
            <Button variant={previewVariant} color={previewColor} size={previewSize} shape={previewShape} spacing={previewSpacing}>
              {previewSize === "icon" ? <LinkedinIcon className="w-4 h-4" /> : "LinkedIn"}
            </Button>
            <Button variant={previewVariant} color={previewColor} size={previewSize} shape={previewShape} spacing={previewSpacing}>
              {previewSize === "icon" ? "A" : "Primary Action"}
            </Button>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "scroll-progress": function ScrollProgressPreview() {
    return (
      <PreviewContainer 
        title="Scroll Progress" 
        description="A minimal scroll progress indicator."
        isVirtualScreen={true}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center relative min-h-75">
          <p className="text-muted-foreground font-medium">
            Scroll down the main page to see the global scroll progress bar in action!
          </p>
        </div>
      </PreviewContainer>
    );
  },
  "puzzle-video": function PuzzleVideoPreview() {
    const PuzzleVideo = React.useMemo(() => dynamic(() => import('@/components/ui/puzzle-video').then(mod => mod.default || mod.PuzzleVideo), { ssr: false }), []);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [variant, setVariant] = React.useState<"jigsaw" | "jigsaw-uneven" | "glass">("jigsaw");
    const [aspectRatio, setAspectRatio] = React.useState<"landscape" | "portrait" | "square" | "video">("video");

    return (
      <PreviewContainer 
        scrollRef={scrollRef} 
        title="Puzzle Video" 
        description="A video player that shatters into a jigsaw puzzle based on scroll progress." 
        isVirtualScreen={true} 
        align="start" 
        contentClassName="p-0 border-none"
        extraControls={
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Options</span>
            <div className="flex flex-wrap items-center gap-4 w-full">
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["jigsaw", "jigsaw-uneven", "glass"] as const).map(v => (
                  <button key={v} onClick={() => setVariant(v)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", variant === v ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                    {v === "jigsaw-uneven" ? "Uneven" : v}
                  </button>
                ))}
              </div>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                <span className="text-[10px] uppercase font-bold text-muted-foreground mx-2">Aspect Ratio:</span>
                {(["video", "portrait", "square"] as const).map(a => (
                  <button key={a} onClick={() => setAspectRatio(a)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", aspectRatio === a ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                    {a === "video" ? "Landscape" : a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <div className="w-full relative bg-neutral-50 dark:bg-[#0a0a0a] overflow-x-hidden overflow-y-visible" style={{ minHeight: '1000px' }}>
          <div className="absolute top-20 left-0 w-full flex flex-col items-center text-muted-foreground opacity-50 z-10">
            <span className="animate-bounce">↓ Scroll down to assemble the puzzle ↓</span>
          </div>
          <div className="w-full" style={{ marginTop: '100vh', paddingBottom: '100vh' }}>
            <PuzzleVideo scrollContainer={scrollRef} src="/videos/video.mp4" rows={4} cols={3} position="center" variant={variant} aspectRatio={aspectRatio} />
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "context-menu": function ContextMenuPreview() {
    const [previewVariant, setPreviewVariant] = React.useState<any>("default");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<ContextMenuShape>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<ContextMenuSpacing>("default");
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [urlsChecked, setUrlsChecked] = React.useState(false);
    const [person, setPerson] = React.useState("pedro");

    const variants = ["default", "elevated", "bordered", "minimal", "premium"] as const;
    const shapes = ["default", "square", "rounded", "sharp"] as const;
    const spacings = ["default", "2x", "4x", "6x", "8x"] as const;

    return (
      <PreviewContainer
        title="Context Menu"
        description="A right-click context menu with layout variants, color themes, shape, and spacing controls."
        variants={variants}
        activeVariant={previewVariant}
        onVariantChange={setPreviewVariant}
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        extraControls={
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {shapes.map(s => (
                <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                  {s}
                </button>
              ))}
            </div>
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {spacings.map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                  {s === "2x" ? "2X" : s === "4x" ? "4X" : s === "6x" ? "6X" : s === "8x" ? "8X" : s}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="w-full flex items-center justify-center p-8 md:p-16">
          <ContextMenu variant={previewVariant} color={previewColor} shape={previewShape} spacing={previewSpacing}>
            <ContextMenuTrigger>
              <div className="w-80 h-48 border-2 border-dashed border-muted-foreground/30 rounded-2xl flex items-center justify-center text-muted-foreground text-sm font-medium select-none bg-muted/5 hover:bg-muted/10 transition-colors cursor-context-menu">
                Right-click here
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem inset={false}>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset={false} disabled>
                Forward
                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset={false}>
                Reload
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger inset={false}>More Tools</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>Save Page As… <ContextMenuShortcut>⌘S</ContextMenuShortcut></ContextMenuItem>
                  <ContextMenuItem>Create Shortcut…</ContextMenuItem>
                  <ContextMenuItem>Name Window…</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked={bookmarksChecked} onCheckedChange={setBookmarksChecked}>
                Show Bookmarks Bar
                <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked}>
                Show Full URLs
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuLabel inset={false}>People</ContextMenuLabel>
              <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
                <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </PreviewContainer>
    );
  },

  "project-deck": function ProjectDeckPreview() {
    const ProjectDeck = React.useMemo(() => dynamic(() => import('@/components/ui/project-deck'), { ssr: false }), []);
    
    const demoProjects = [
      {
        id: "01",
        title: "Neon Interface",
        category: "Web App",
        description: "A dark mode dashboard with vibrant neon accents and fluid animations.",
        url: "#",
        media: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
        type: "image" as const,
        tags: ["React", "Tailwind", "Framer Motion"],
        accent: "from-purple-500 to-fuchsia-500",
      },
      {
        id: "02",
        title: "Glacier System",
        category: "Design System",
        description: "A clean, frost-glass inspired component library for modern enterprise apps.",
        url: "#",
        media: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        type: "image" as const,
        tags: ["Next.js", "Radix UI", "CSS Modules"],
        accent: "from-blue-500 to-cyan-500",
      },
      {
        id: "03",
        title: "Volcanic Analytics",
        category: "Data Viz",
        description: "Real-time data visualization platform with fiery gradients and high contrast.",
        url: "#",
        media: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        type: "image" as const,
        tags: ["D3.js", "WebGL", "TypeScript"],
        accent: "from-orange-500 to-red-500",
      }
    ];

    return (
      <PreviewContainer title="Project Deck" description="A 3D stacked deck of project cards with hover fan-out and flip animation." isVirtualScreen={true} contentClassName="p-0 border-none bg-[#09090b]">
        <div className="w-full relative flex flex-col">
          <ProjectDeck projects={demoProjects} />
        </div>
      </PreviewContainer>
    );
  },
};
