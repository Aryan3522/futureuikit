"use client";

import React, { useState } from "react";
import { BasicLoader } from "@/components/ui/basic-loader";
import { BoxyRotateLoader } from "@/components/ui/boxy-rotate-loader";
import { BoxyBounceLoader } from "@/components/ui/boxy-bounce-loader";
import { BoxyShiftLoader } from "@/components/ui/boxy-shift-loader";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";

export const BasicLoaderPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [variant, setVariant] = useState<"modern" | "clean" | "minimal">("modern");
  return (
    <PreviewContainer
      title="Basic Loader"
      description="Versatile spinning or pulsing loaders."
      variants={["modern", "clean", "minimal"]}
      activeVariant={variant}
      onVariantChange={setVariant} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="flex flex-col gap-4 items-center justify-center min-h-75">
        <BasicLoader
          variant={variant}
          color={variant === "clean" ? "emerald" : variant === "minimal" ? "amber" : "blue"}
          text={variant === "clean" ? "Clean Dots..." : variant === "minimal" ? "Minimal..." : "Modern Rings..."}
        />
      </div>
    </PreviewContainer>
  );
};

export const BoxyRotatePreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Boxy Rotate Loader" description="A minimal 3D rotating box loader." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <BoxyRotateLoader />
    </PreviewContainer>
  );
};

export const BoxyBouncePreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Boxy Bounce Loader" description="A playful bouncing box loader." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <BoxyBounceLoader />
    </PreviewContainer>
  );
};

export const BoxyShiftPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Boxy Shift Loader" description="An elegant shifting box loader." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <BoxyShiftLoader />
    </PreviewContainer>
  );
};
