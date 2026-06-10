"use client";

import React, { useState } from "react";
import { BasicLoader } from "@/components/ui/basic-loader";
import { BoxyRotateLoader } from "@/components/ui/boxy-rotate-loader";
import { BoxyBounceLoader } from "@/components/ui/boxy-bounce-loader";
import { BoxyShiftLoader } from "@/components/ui/boxy-shift-loader";
import { PreviewContainer } from "../preview-engine/PreviewContainer";

export const BasicLoaderPreview: React.FC = () => {
  const [variant, setVariant] = useState<"modern" | "clean" | "minimal">("modern");
  return (
    <PreviewContainer
      title="Basic Loader"
      description="Versatile spinning or pulsing loaders."
      variants={["modern", "clean", "minimal"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="flex flex-col gap-4 items-center justify-center min-h-75">
        <BasicLoader
          variant={variant}
          color={variant === "clean" ? "#10b981" : variant === "minimal" ? "#f59e0b" : "#3b82f6"}
          text={variant === "clean" ? "Clean Dots..." : variant === "minimal" ? "Minimal..." : "Modern Rings..."}
        />
      </div>
    </PreviewContainer>
  );
};

export const BoxyRotatePreview: React.FC = () => {
  return (
    <PreviewContainer title="Boxy Rotate Loader" description="A minimal 3D rotating box loader.">
      <BoxyRotateLoader />
    </PreviewContainer>
  );
};

export const BoxyBouncePreview: React.FC = () => {
  return (
    <PreviewContainer title="Boxy Bounce Loader" description="A playful bouncing box loader.">
      <BoxyBounceLoader />
    </PreviewContainer>
  );
};

export const BoxyShiftPreview: React.FC = () => {
  return (
    <PreviewContainer title="Boxy Shift Loader" description="An elegant shifting box loader.">
      <BoxyShiftLoader />
    </PreviewContainer>
  );
};
