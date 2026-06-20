"use client";

import React from "react";
import dynamic from "next/dynamic";
import { GithubIcon, LinkedinIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import VelocityMarquee from "@/components/ui/velocity-marquee";
import { PreviewContainer } from "./preview-engine/PreviewContainer";
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
  basic: BasicLoaderPreview,
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

  "velocity-marquee": function VelocityMarqueePreview() {
    const scrollRef = React.useRef<HTMLDivElement>(null);
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
      <PreviewContainer scrollRef={scrollRef} title="Velocity Marquee" description="An interactive marquee grid featuring glowing cards." isVirtualScreen={true} contentClassName="p-0 border-none">
        <div className="flex flex-col w-full min-h-[150vh] justify-center items-center relative overflow-hidden bg-neutral-50 dark:bg-[#0a0a0a]">
          <div className="absolute top-20 flex flex-col items-center text-muted-foreground opacity-50">
            <span className="animate-bounce">↓ Scroll the page to see physics animations ↓</span>
          </div>
          <VelocityMarquee items={demoItems} containerRef={scrollRef} />
        </div>
      </PreviewContainer>
    );
  },

  // Previews not yet moved (as per specific list)
  badge: function BadgePreview() {
    return (
      <PreviewContainer title="Badge" description="A small status descriptor for UI elements.">
        <div className="flex flex-wrap gap-8 items-center justify-center w-full">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </PreviewContainer>
    );
  },
  button: function StandardButtonPreview() {
    return (
      <PreviewContainer title="Standard Button" description="The base button component matching Radix / shadcn spec.">
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
          <div className="flex flex-wrap gap-8 items-center justify-center w-full">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">
              <GithubIcon className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="default" className="bg-[#0077b5] text-white hover:bg-[#0077b5]/90">
              <LinkedinIcon className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
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
