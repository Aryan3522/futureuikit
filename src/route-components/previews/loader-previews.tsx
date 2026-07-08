"use client";

import React, { useState } from "react";
import { BasicLoader } from "@/components/ui/basic-loader";
import { BoxyRotateLoader } from "@/components/ui/boxy-rotate-loader";
import { BoxyBounceLoader } from "@/components/ui/boxy-bounce-loader";
import { BoxyShiftLoader } from "@/components/ui/boxy-shift-loader";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";
import { cn } from "@/lib/utils";

export const BasicLoaderPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewSize, setPreviewSize] = React.useState<any>("md");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [variant, setVariant] = useState<"modern" | "clean" | "minimal">("modern");
  return (
    <PreviewContainer
      title="Basic Loader"
      description="Versatile spinning or pulsing loaders."
      variants={["modern", "clean", "minimal"]}
      activeVariant={variant}
      onVariantChange={setVariant} 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["sm", "md", "lg"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSize(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSize === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}</button>
              ))}
            </div>
          </div>
          {variant === "clean" && (
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "square", "rounded", "sharp"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewShape(s)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}
        </>
      }
    >
      <div className="flex flex-col gap-4 items-center justify-center min-h-75">
        <BasicLoader
          variant={variant}
          color={previewColor}
          size={previewSize}
          shape={previewShape}
          text={variant === "clean" ? "Loading..." : variant === "minimal" ? "Please wait..." : "Processing..."}
        />
      </div>
    </PreviewContainer>
  );
};

export const BoxyRotatePreview: React.FC = () => {
  const [previewColor, setPreviewColor] = React.useState<any>("default");
  
  return (
    <PreviewContainer 
      title="Boxy Rotate Loader" 
      description="A minimal 3D rotating box loader." 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor}
    >
      <BoxyRotateLoader color={previewColor} />
    </PreviewContainer>
  );
};

export const BoxyBouncePreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("gradient");
    const [previewSize, setPreviewSize] = React.useState<any>("md");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
  return (
    <PreviewContainer 
      title="Boxy Bounce Loader" 
      description="A playful bouncing box loader." 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor} 
      variants={["gradient", "solid", "outline"]} 
      activeVariant={previewVariant} 
      onVariantChange={setPreviewVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["sm", "md", "lg"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSize(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSize === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}</button>
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
        </>
      }
    >
      <BoxyBounceLoader color={previewColor} variant={previewVariant} size={previewSize} shape={previewShape} />
    </PreviewContainer>
  );
};

export const BoxyShiftPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("gradient");
    const [previewSize, setPreviewSize] = React.useState<any>("md");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
  return (
    <PreviewContainer 
      title="Boxy Shift Loader" 
      description="An elegant shifting box loader." 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor} 
      variants={["gradient", "solid", "outline"]} 
      activeVariant={previewVariant} 
      onVariantChange={setPreviewVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["sm", "md", "lg"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSize(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSize === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}</button>
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
        </>
      }
    >
      <BoxyShiftLoader color={previewColor} variant={previewVariant} size={previewSize} shape={previewShape} />
    </PreviewContainer>
  );
};
