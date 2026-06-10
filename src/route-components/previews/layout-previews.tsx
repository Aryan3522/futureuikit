"use client";

import React from "react";
import { Footer } from "@/components/ui/footer";
import { PremiumUploadButton } from "@/components/ui/premium-upload-button";
import { CarouselSlider } from "@/components/ui/carousel-slider";
import { NoirHero3D } from "@/components/ui/noir-hero-3d";
import { PrimaryButton } from "@/components/ui/primary-button";
import { GlowyButton } from "@/components/ui/glowy-button";
import { PreviewContainer } from "../preview-engine/PreviewContainer";

export const FooterPreview: React.FC = () => {
  return (
    <PreviewContainer 
      title="Footer" 
      description="A minimal, modern footer component for Future UI." 
      isVirtualScreen={true}
      align="start"
    >
      <div className="w-full flex items-end min-h-100 mt-auto">
        <Footer />
      </div>
    </PreviewContainer>
  );
};

export const PremiumUploadButtonPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"clean" | "modern" | "minimal" | "enterprise" | "windows" | "futuristic" | "apple" | "ai">("modern");
  return (
    <PreviewContainer 
      title="Premium Upload Button" 
      description="A premium, highly interactive file upload button with various design variants." 
      isVirtualScreen={true}
      variants={["clean", "modern", "minimal", "enterprise", "windows", "futuristic", "apple", "ai"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="w-full flex items-center justify-center p-4 min-h-100">
        <PremiumUploadButton variant={variant} />
      </div>
    </PreviewContainer>
  );
};

export const InfiniteSliderPreview: React.FC = () => {
  return (
    <PreviewContainer title="Carousel Slider" description="An expansive interactive image slider." contentClassName="p-0 border-none">
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
        ]}
      />
    </PreviewContainer>
  );
};

export const NoirHero3DPreview: React.FC = () => {
  return (
    <PreviewContainer title="Noir Hero 3D" description="A premium 3D geometric centerpiece built with React Three Fiber.">
      <div className="w-full h-full min-h-125 bg-black rounded-xl overflow-hidden relative">
        <NoirHero3D className="w-full h-full" />
      </div>
    </PreviewContainer>
  );
};

export const PrimaryButtonPreview: React.FC = () => {
  return (
    <PreviewContainer title="Primary Button" description="Semantic primary buttons with micro-interactions.">
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <PrimaryButton variant="primary">Primary</PrimaryButton>
          <PrimaryButton variant="success">Success</PrimaryButton>
          <PrimaryButton variant="warning">Warning</PrimaryButton>
          <PrimaryButton variant="danger">Danger</PrimaryButton>
          <PrimaryButton variant="info">Info</PrimaryButton>
          <PrimaryButton variant="secondary">Secondary</PrimaryButton>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const GlowyButtonPreview: React.FC = () => {
  return (
    <PreviewContainer title="Glowy Button" description="Buttons with a highly aesthetic background glow effect on hover.">
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
        <div className="flex flex-wrap gap-6 items-center justify-center w-full">
          <GlowyButton variant="primary">Primary</GlowyButton>
          <GlowyButton variant="success">Success</GlowyButton>
          <GlowyButton variant="danger">Danger</GlowyButton>
        </div>
      </div>
    </PreviewContainer>
  );
};
