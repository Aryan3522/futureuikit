"use client";

import React from "react";
import { Footer } from "@/components/ui/footer";
import { PremiumUploadButton } from "@/components/ui/premium-upload-button";
import { CarouselSlider } from "@/components/ui/carousel-slider";
import { NoirHero3D } from "@/components/ui/noir-hero-3d";
import { PrimaryButton } from "@/components/ui/primary-button";
import { GlowyButton } from "@/components/ui/glowy-button";
import { ClayMorphButton } from "@/components/ui/clay-morph-button";
import { MinimalButton } from "@/components/ui/minimal-button";
import { SkeuomorphicButton } from "@/components/ui/SkeuomorphicButton";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";
import { Play, Rocket, Settings, Check, Download, Send, Bell, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const FooterPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    return (
      <PreviewContainer 
        title="Footer" 
        description="A minimal, modern footer component for Future UI." 
        isVirtualScreen={true}
        align="start" 
        colors={DEFAULT_COLORS} 
        activeColor={previewColor} 
        onColorChange={setPreviewColor} 
        extraControls={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full mt-2">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "square", "rounded", "sharp"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setPreviewShape(s)}
                    className={cn(
                      "px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300",
                      previewShape === s
                        ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full mt-2">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "2x", "4x", "6x", "8x"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setPreviewSpacing(s)}
                    className={cn(
                      "px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300",
                      previewSpacing === s
                        ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </>
        }
      >
        <div className="w-full flex items-end min-h-100 mt-auto">
          <Footer color={previewColor} shape={previewShape} spacing={previewSpacing} />
        </div>
      </PreviewContainer>
    );
  };

export const PremiumUploadButtonPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [variant, setVariant] = React.useState<"clean" | "modern" | "minimal" | "enterprise" | "windows" | "futuristic" | "apple" | "ai">("modern");
  return (
    <PreviewContainer 
      title="Premium Upload Button" 
      description="A premium, highly interactive file upload button with various design variants." 
      isVirtualScreen={true}
      variants={["clean", "modern", "minimal", "enterprise", "windows", "futuristic", "apple", "ai"]}
      activeVariant={variant}
      onVariantChange={setVariant} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="w-full flex items-center justify-center p-4 min-h-100">
        <PremiumUploadButton variant={variant} color={previewColor} />
      </div>
    </PreviewContainer>
  );
};

export const InfiniteSliderPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
    const [previewTheme, setPreviewTheme] = React.useState<any>("modern");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
    const [previewAnimation, setPreviewAnimation] = React.useState<any>("slide");

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
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Animation</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["translation", "jumping", "superposition", "fading", "carousel", "flip", "vertical", "slide", "scale"] as const).map(a => (
              <button key={a} onClick={() => setPreviewAnimation(a)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewAnimation === a ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{a}</button>
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
              <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg uppercase transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <PreviewContainer title="Carousel Slider" description="An expansive interactive image slider." contentClassName="p-0 border-none" colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant} extraControls={extraControls}>
      <CarouselSlider
        slides={[
          {
            id: 1,
            tag: "EXPLORE",
            title: "EXOTIC ADVENTURE",
            location: "Bali, Indonesia",
            image:
              "https://images.unsplash.com/photo-1556206079-747a7a424d3d?ixlib=rb-4.0.3&q=80",
          },
          {
            id: 2,
            tag: "CITY",
            title: "URBAN EXPLORER",
            location: "Tokyo, Japan",
            image:
              "https://images.unsplash.com/photo-1571900670723-a317a66e3fb7?ixlib=rb-4.0.3&q=80",
          },
          {
            id: 3,
            tag: "NATURE",
            title: "MOUNTAIN RETREAT",
            location: "Swiss Alps",
            image:
              "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80",
          },
        ]} 
        color={previewColor} 
        variant={previewVariant}
        theme={previewTheme}
        shape={previewShape}
        spacing={previewSpacing}
        animation={previewAnimation}
      />
    </PreviewContainer>
  );
};

export const NoirHero3DPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Noir Hero 3D" description="A premium 3D geometric centerpiece built with React Three Fiber." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <div className="w-full h-full min-h-125 bg-black rounded-xl overflow-hidden relative">
        <NoirHero3D className="w-full h-full" />
      </div>
    </PreviewContainer>
  );
};

export const PrimaryButtonPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Primary Button" description="Semantic primary buttons with micro-interactions." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <PrimaryButton color="blue">Primary</PrimaryButton>
          <PrimaryButton color="emerald">Success</PrimaryButton>
          <PrimaryButton color="amber">Warning</PrimaryButton>
          <PrimaryButton color="rose">Danger</PrimaryButton>
          <PrimaryButton color="sky">Info</PrimaryButton>
          <PrimaryButton color="slate">Secondary</PrimaryButton>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const GlowyButtonPreview: React.FC = () => {
  const [previewColor, setPreviewColor] = React.useState<any>("default");
  const [shape, setShape] = React.useState<"default" | "square" | "rounded" | "sharp">("default");
  const [spacing, setSpacing] = React.useState<"default" | "2x" | "4x" | "6x" | "8x">("default");

  return (
    <PreviewContainer 
      title="Glowy Button" 
      description="Buttons with a highly aesthetic background glow effect on hover." 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", shape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing / Size</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(sp => (
                <button key={sp} onClick={() => setSpacing(sp)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", spacing === sp ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{sp === "default" ? "default" : sp}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-[300px]">
        <GlowyButton color={previewColor} shape={shape} spacing={spacing}>Glowy Button</GlowyButton>
      </div>
    </PreviewContainer>
  );
};

export const SkeuomorphicButtonPreview: React.FC = () => {
  const [previewColor, setPreviewColor] = React.useState<any>("default");
  const [activeVariant, setActiveVariant] = React.useState<string>("primary");

  return (
    <PreviewContainer
      title="Skeuomorphic Button"
      description="A premium skeuomorphic button with realistic depth and tactile interactions."
      variants={["primary", "glass", "gradient", "elevated", "soft", "outline", "ghost"]}
      activeVariant={activeVariant}
      onVariantChange={setActiveVariant}
      isVirtualScreen={true} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-[400px]">
        <div className="flex flex-col items-center gap-10 w-full max-w-4xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-12 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex flex-wrap items-end justify-center gap-6 w-full">
            <SkeuomorphicButton variant={activeVariant as any} color="indigo">Extra Small</SkeuomorphicButton>
            <SkeuomorphicButton variant={activeVariant as any} color="indigo">Small Size</SkeuomorphicButton>
            <SkeuomorphicButton variant={activeVariant as any} color="indigo">Medium Default</SkeuomorphicButton>
          </div>
          
          <div className="flex flex-wrap items-end justify-center gap-8 w-full mt-2">
            <SkeuomorphicButton variant={activeVariant as any} color="indigo">Large Size</SkeuomorphicButton>
            <SkeuomorphicButton variant={activeVariant as any} color="indigo">Extra Large</SkeuomorphicButton>
          </div>

          <div className="w-full max-w-2xl h-px bg-zinc-200 dark:bg-zinc-800 my-2" />

          <div className="flex flex-wrap items-center justify-center gap-6 w-full">
             <SkeuomorphicButton variant={activeVariant as any} shape="rounded" color="indigo">Rounded (Default)</SkeuomorphicButton>
             <SkeuomorphicButton variant={activeVariant as any} shape="rounded" color="indigo">Pill Shape</SkeuomorphicButton>
             <SkeuomorphicButton variant={activeVariant as any} shape="rounded" color="indigo">Soft Rounded</SkeuomorphicButton>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 w-full mt-2">
             <SkeuomorphicButton variant={activeVariant as any} shape="square" color="indigo">Square</SkeuomorphicButton>
             <SkeuomorphicButton variant={activeVariant as any} shape="rounded" color="indigo" icon={<Star />} aria-label="Star XS" />
             <SkeuomorphicButton variant={activeVariant as any} shape="rounded" color="indigo" icon={<Star />} aria-label="Star SM" />
             <SkeuomorphicButton variant={activeVariant as any} shape="rounded" color="indigo" icon={<Star />} aria-label="Star MD" />
             <SkeuomorphicButton variant={activeVariant as any} shape="rounded" color="indigo" icon={<Star />} aria-label="Star LG" />
             <SkeuomorphicButton variant={activeVariant as any} shape="rounded" color="indigo" icon={<Star />} aria-label="Star XL" />
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const ClayMorphButtonPreview: React.FC = () => {
  const [previewColor, setPreviewColor] = React.useState<any>("default");
  const [previewVariant, setPreviewVariant] = React.useState<any>("primary");
  const [previewShape, setPreviewShape] = React.useState<any>("default");
  const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

  const extraControls = (
    <div className="flex flex-col gap-4 w-full mt-4 border-t border-border/50 pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["default", "square", "rounded", "sharp", "cut-two", "cut-all"] as const).map(s => (
            <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing / Size</span>
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
            <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg uppercase transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <PreviewContainer
      title="Clay Morphism Button"
      description="A premium, modern Claymorphism button with soft 3D extrusion, layered highlights, and bubbly tactile interactions."
      variants={["primary", "ghost", "outline", "soft", "elevated", "gradient", "glass"]}
      activeVariant={previewVariant}
      onVariantChange={setPreviewVariant}
      isVirtualScreen={true} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
      extraControls={extraControls}
    >
      <div className="w-full h-full flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center justify-center gap-10 w-full h-full border-0 border-y border-zinc-200 dark:border-zinc-800 rounded-none p-6 md:p-12 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-xl">
          <div className="flex flex-wrap items-center justify-center gap-8 w-full">
            <ClayMorphButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing}>Clay Morphism</ClayMorphButton>
            <ClayMorphButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing} icon={<Star />}>Left Icon</ClayMorphButton>
            <ClayMorphButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing} icon={<Star />} iconPosition="right">Tail Icon</ClayMorphButton>
            <ClayMorphButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing} icon={<Star />} iconOnly />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 w-full">
            <ClayMorphButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing} loading>Processing</ClayMorphButton>
            <ClayMorphButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing} disabled>Disabled</ClayMorphButton>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}
export const MinimalButtonPreview: React.FC = () => {
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
          {(["default", "square", "rounded", "sharp", "cut-tl-br", "cut-tr-bl", "cut-all"] as const).map(s => (
            <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing / Size</span>
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
            <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg uppercase transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <PreviewContainer
      title="Minimal Button"
      description="An ultra-clean, premium button inspired by modern trends. Focuses on typography, precise spacing, and subtle interactions."
      variants={["solid", "outline", "ghost", "soft", "link"]}
      activeVariant={previewVariant}
      onVariantChange={setPreviewVariant}
      isVirtualScreen={true} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
      extraControls={extraControls}
    >
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-[400px]">
        <div className="flex flex-col items-center gap-10 w-full max-w-4xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-12 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-xl">
          <div className="flex flex-wrap items-center justify-center gap-8 w-full">
            <MinimalButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing} theme={previewTheme}>Minimal Button</MinimalButton>
            <MinimalButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing} theme={previewTheme} icon={<Star />}>Left Icon</MinimalButton>
            <MinimalButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing} theme={previewTheme} icon={<Star />} iconPosition="right">Tail Icon</MinimalButton>
          </div>
          
          <div className="w-full max-w-2xl h-px bg-zinc-200 dark:bg-zinc-800 my-2" />

          <div className="flex flex-wrap items-center justify-center gap-8 w-full">
            <MinimalButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing} theme={previewTheme} loading>Processing</MinimalButton>
            <MinimalButton variant={previewVariant as any} color={previewColor} shape={previewShape} spacing={previewSpacing} theme={previewTheme} disabled>Disabled State</MinimalButton>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};
