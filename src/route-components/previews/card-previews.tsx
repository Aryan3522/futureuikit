"use client";

import React from "react";
import { BasicCard } from "@/components/ui/basic-card";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { GlassPanel } from "@/components/ui/glass-panel";
import { HoverGlareCard } from "@/components/ui/hover-glare-card";
import { ExpandingFlexCard } from "@/components/ui/expanding-flex-card";
import { NexusCard } from "@/components/ui/nexus-card";
import { Button } from "@/components/ui/button";
import { DotBackground } from "@/components/ui/dot-background";
import { cn } from "@/lib/utils";
import { PreviewContainer } from "../preview-engine/PreviewContainer";

export const BasicCardPreview: React.FC = () => {
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
    >
      <div className="w-full flex items-center justify-center p-8">
        <BasicCard variant={variant} />
      </div>
    </PreviewContainer>
  );
};

export const StandardCardPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "outline" | "ghost" | "glass">("default");

  return (
    <PreviewContainer
      title="Standard Card"
      description="A base structural card component."
      variants={["default", "outline", "ghost", "glass"]}
      activeVariant={variant}
      onVariantChange={setVariant as any}
    >
      <Card className="w-full max-w-md mx-auto" variant={variant}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-left">
            Card Content inside the default card.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Action</Button>
        </CardFooter>
      </Card>
    </PreviewContainer>
  );
};

export const GlassPanelPreview: React.FC = () => {
  return (
    <PreviewContainer title="Glass Panel" description="A premium glassmorphic panel with heavy blur and luminous shadows.">
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75 relative">
        <DotBackground dotColor="currentColor" maskOpacity={0.1} />
        <div className="relative z-10 w-full max-w-lg">
          <GlassPanel variant="heavy" glow="subtle" className="p-8">
            <h2 className="text-xl font-bold mb-4">Glassmorphism</h2>
            <p className="text-muted-foreground">This panel uses heavy background blur with subtle border highlights to create a premium frosted glass effect.</p>
          </GlassPanel>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const HoverGlareCardPreview: React.FC = () => {
  const [layout, setLayout] = React.useState<"default" | "media" | "content" | "stats" | "compact" | "feature">("default");
  const [styleVariant, setStyleVariant] = React.useState<"default" | "glass" | "solid" | "ghost">("glass");
  const [glow, setGlow] = React.useState<"none" | "primary" | "secondary" | "white">("primary");
  return (
    <PreviewContainer
      title="Hover Glare Card"
      description="A highly composable premium card with a signature diagonal glare sweep. Supports multiple real-world layouts."
      variants={["default", "media", "content", "stats", "compact", "feature"]}
      activeVariant={layout}
      onVariantChange={setLayout as any}
      extraControls={
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full mt-2">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Style & Glow</span>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
              {(["default", "glass", "solid", "ghost"] as const).map(v => (
                <button key={v} onClick={() => setStyleVariant(v)} className={cn("px-3 py-1 text-xs font-medium rounded-md capitalize transition-all", styleVariant === v ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{v}</button>
              ))}
            </div>
            <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-muted-foreground mx-2">Glow:</span>
              {(["none", "primary", "secondary", "white"] as const).map(g => (
                <button key={g} onClick={() => setGlow(g)} className={cn("px-2 py-1 text-xs font-medium rounded-md capitalize transition-all", glow === g ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{g}</button>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="flex items-center justify-center w-full h-full p-4 sm:p-8 min-h-100">
        <HoverGlareCard
          layout={layout}
          variant={styleVariant}
          glow={glow}
        />
      </div>
    </PreviewContainer>
  );
};

export const ExpandingCardPreview: React.FC = () => {
  return (
    <PreviewContainer title="Expanding Flex Card" description="A beautiful, interactive expanding flex layout.">
      <ExpandingFlexCard
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
  const [variant, setVariant] = React.useState<"default" | "glass" | "solid" | "neon">("default");

  return (
    <PreviewContainer
      title="Nexus Card"
      description="A premium 3D parallax card with reactive spotlight."
      variants={["default", "glass", "solid", "neon"]}
      activeVariant={variant}
      onVariantChange={setVariant as any}
    >
      <div className="flex items-center justify-center w-full h-full p-4 sm:p-8">
        <NexusCard className="w-80 h-96" variant={variant}>
          <h2 className="text-2xl font-bold text-foreground mb-2">Nexus Design</h2>
          <p className="text-muted-foreground">Hover over this card to experience the premium tactile feel, reactive spotlight, and 3D parallax tilt.</p>
        </NexusCard>
      </div>
    </PreviewContainer>
  );
};
