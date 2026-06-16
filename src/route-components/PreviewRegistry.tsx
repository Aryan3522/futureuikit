"use client";

import React from "react";
import { GithubIcon, LinkedinIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PreviewContainer } from "./preview-engine/PreviewContainer";
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
  SearchPreview,
  SearchInputPreview,
  IconsPreview,
} from "./previews";

/**
 * Registry of all component previews.
 * Previews are extracted into category-based files in ./previews/
 */
export const PreviewRegistry: PreviewRegistryMap = {
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

  // Search
  search: SearchPreview,
  "search-input": SearchInputPreview,

  // Icons
  icons: IconsPreview,

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
};
