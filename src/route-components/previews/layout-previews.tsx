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

export const FooterPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer 
      title="Footer" 
      description="A minimal, modern footer component for Future UI." 
      isVirtualScreen={true}
      align="start" colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}
    >
      <div className="w-full flex items-end min-h-100 mt-auto">
        <Footer />
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
  return (
    <PreviewContainer title="Carousel Slider" description="An expansive interactive image slider." contentClassName="p-0 border-none" colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <CarouselSlider
        slides={[
          {
            id: 1,
            tag: "EXPLORE",
            title: "EXOTIC ADVENTURE",
            location: "Bali, Indonesia",
            image:
              "https://images.unsplash.com/photo-1556206079-747a7a424d3d?ixlib=rb-4.0.3&q=80",
            tagBg: "bg-indigo-600",
          },
          {
            id: 2,
            tag: "CITY",
            title: "URBAN EXPLORER",
            location: "Tokyo, Japan",
            image:
              "https://images.unsplash.com/photo-1571900670723-a317a66e3fb7?ixlib=rb-4.0.3&q=80",
            tagBg: "bg-emerald-600",
          },
          {
            id: 3,
            tag: "NATURE",
            title: "MOUNTAIN RETREAT",
            location: "Swiss Alps",
            image:
              "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80",
            tagBg: "bg-amber-600",
          },
        ]} color={previewColor} variant={previewVariant}
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
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Glowy Button" description="Buttons with a highly aesthetic background glow effect on hover." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
        <div className="flex flex-wrap gap-6 items-center justify-center w-full">
          <GlowyButton color="blue">Primary</GlowyButton>
          <GlowyButton color="emerald">Success</GlowyButton>
          <GlowyButton color="rose">Danger</GlowyButton>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const SkeuomorphicButtonPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
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
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [activeVariant, setActiveVariant] = React.useState<string>("primary");

  return (
    <PreviewContainer
      title="Clay Morphism Button"
      description="A premium, modern Claymorphism button with soft 3D extrusion, layered highlights, and bubbly tactile interactions."
      variants={["primary", "secondary", "success", "danger", "warning", "info", "neutral", "ghost", "outline", "soft", "elevated", "gradient", "glass"]}
      activeVariant={activeVariant}
      onVariantChange={setActiveVariant}
      isVirtualScreen={true} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-[400px]">
        <div className="flex flex-col items-center gap-10 w-full max-w-4xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-12 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex flex-wrap items-end justify-center gap-6 w-full">
            <ClayMorphButton variant={activeVariant as any} color="blue">Extra Small</ClayMorphButton>
            <ClayMorphButton variant={activeVariant as any} color="blue">Small Size</ClayMorphButton>
            <ClayMorphButton variant={activeVariant as any} color="blue">Medium Default</ClayMorphButton>
          </div>
          
          <div className="flex flex-wrap items-end justify-center gap-8 w-full mt-2">
            <ClayMorphButton variant={activeVariant as any} color="blue">Large Size</ClayMorphButton>
            <ClayMorphButton variant={activeVariant as any} color="blue">Extra Large</ClayMorphButton>
          </div>

          <div className="w-full max-w-2xl h-px bg-zinc-200 dark:bg-zinc-800 my-2" />

          <div className="flex flex-wrap items-center justify-center gap-6 w-full">
             <ClayMorphButton variant={activeVariant as any} shape="rounded" color="blue">Rounded</ClayMorphButton>
             <ClayMorphButton variant={activeVariant as any} shape="rounded" color="blue">Soft Rounded</ClayMorphButton>
             <ClayMorphButton variant={activeVariant as any} shape="rounded" color="blue">Pill Shape</ClayMorphButton>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 w-full mt-2">
             <ClayMorphButton variant={activeVariant as any} shape="square" color="blue">Square</ClayMorphButton>
             <ClayMorphButton variant={activeVariant as any} shape="rounded" color="blue" icon={<Star />} aria-label="Star XS" />
             <ClayMorphButton variant={activeVariant as any} shape="rounded" color="blue" icon={<Star />} aria-label="Star SM" />
             <ClayMorphButton variant={activeVariant as any} shape="rounded" color="blue" icon={<Star />} aria-label="Star MD" />
             <ClayMorphButton variant={activeVariant as any} shape="rounded" color="blue" icon={<Star />} aria-label="Star LG" />
             <ClayMorphButton variant={activeVariant as any} shape="rounded" color="blue" icon={<Star />} aria-label="Star XL" />
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};


export const MinimalButtonPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [activeVariant, setActiveVariant] = React.useState<string>("primary");

  return (
    <PreviewContainer
      title="Minimal Button"
      description="An ultra-clean, premium button inspired by Vercel and Linear. Focuses on typography, precise spacing, and subtle interactions."
      variants={["primary", "secondary", "ghost", "outline", "soft", "text", "elevated", "success", "danger", "warning"]}
      activeVariant={activeVariant}
      onVariantChange={setActiveVariant}
      isVirtualScreen={true} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-[400px]">
        <div className="flex flex-col items-center gap-10 w-full max-w-4xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-12 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
          
          <div className="text-center space-y-2 mb-2 w-full">
            <h3 className="text-xl font-bold capitalize text-zinc-900 dark:text-white">{activeVariant} Variant</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Responsive Sizes & Shapes</p>
          </div>

          {/* Sizes Showcase */}
          <div className="flex flex-wrap items-end justify-center gap-6 w-full">
            <MinimalButton variant={activeVariant as any} color="slate">Extra Small</MinimalButton>
            <MinimalButton variant={activeVariant as any} color="slate">Small Size</MinimalButton>
            <MinimalButton variant={activeVariant as any} color="slate">Medium Default</MinimalButton>
          </div>
          
          <div className="flex flex-wrap items-end justify-center gap-8 w-full mt-2">
            <MinimalButton variant={activeVariant as any} color="slate">Large Size</MinimalButton>
            <MinimalButton variant={activeVariant as any} color="slate">Extra Large</MinimalButton>
          </div>

          <div className="w-full max-w-2xl h-px bg-zinc-200 dark:bg-zinc-800 my-2" />

          {/* Shapes Showcase */}
          <div className="flex flex-wrap items-center justify-center gap-6 w-full">
             <MinimalButton variant={activeVariant as any} shape="rounded" color="slate">Rounded</MinimalButton>
             <MinimalButton variant={activeVariant as any} shape="rounded" color="slate">Soft Rounded</MinimalButton>
             <MinimalButton variant={activeVariant as any} shape="rounded" color="slate">Pill Shape</MinimalButton>
             <MinimalButton variant={activeVariant as any} shape="rounded" color="slate">Squircle</MinimalButton>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 w-full mt-2">
             <MinimalButton variant={activeVariant as any} shape="square" color="slate">Square</MinimalButton>
             <MinimalButton variant={activeVariant as any} shape="rounded" color="slate">Stadium</MinimalButton>
             <MinimalButton variant={activeVariant as any} shape="sharp" color="slate">Cut Corners</MinimalButton>
          </div>

          {/* Icons & Circles Showcase */}
          <div className="flex flex-wrap items-center justify-center gap-6 w-full mt-2">
             <MinimalButton variant={activeVariant as any} shape="rounded" color="slate" icon={<Star />} aria-label="Star XS" />
             <MinimalButton variant={activeVariant as any} shape="rounded" color="slate" icon={<Star />} aria-label="Star SM" />
             <MinimalButton variant={activeVariant as any} shape="rounded" color="slate" icon={<Star />} aria-label="Star MD" />
             <MinimalButton variant={activeVariant as any} shape="rounded" color="slate" icon={<Star />} aria-label="Star LG" />
             <MinimalButton variant={activeVariant as any} shape="rounded" color="slate" icon={<Star />} aria-label="Star XL" />
          </div>

          {/* Loading & Disabled */}
          <div className="w-full max-w-2xl h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
          <div className="flex flex-wrap items-center justify-center gap-6 w-full">
            <MinimalButton variant={activeVariant as any} loading color="slate">Loading State</MinimalButton>
            <MinimalButton variant={activeVariant as any} disabled color="slate">Disabled State</MinimalButton>
            <MinimalButton variant={activeVariant as any} icon={<Star />} iconPosition="right" color="slate">Icon Right</MinimalButton>
          </div>

        </div>
      </div>
    </PreviewContainer>
  );
};
