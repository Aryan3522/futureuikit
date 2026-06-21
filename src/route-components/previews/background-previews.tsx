"use client";

import React from "react";
import { DotBackground } from "@/components/ui/dot-background";
import { Particles } from "@/components/ui/particles";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { PointCursor } from "@/components/ui/PointCursor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";

export const DotBackgroundPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Dot Background" description="A clean, dot-matrix style background component." contentClassName="p-0 border-none" colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <DotBackground dotColor="#6366f1" maskOpacity={0.5}>
        <div className="flex items-center justify-center w-full h-full min-h-100">
          <h3 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase opacity-50 text-foreground">
            Premium Dotted Grid
          </h3>
        </div>
      </DotBackground>
    </PreviewContainer>
  );
};

export const ParticlesPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Particles" description="A dynamic particle system for beautiful backgrounds." contentClassName="bg-slate-950 dark:bg-background p-0 border-none" colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <div className="w-full h-full relative overflow-hidden min-h-100">
        <Particles quantity={150} color="#3b82f6" />
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <h3 className="text-2xl font-bold text-white dark:text-foreground italic tracking-tighter uppercase">
            Dynamic Particle System
          </h3>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const PerspectiveGridPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Perspective Grid" description="A 3D perspective grid horizon background." contentClassName="bg-slate-950 dark:bg-background p-0 border-none" colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <div className="w-full h-full relative overflow-hidden min-h-100">
        <PerspectiveGrid gridLineGap={50} />
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <h3 className="text-2xl font-bold text-white dark:text-foreground italic tracking-tighter uppercase">
            Perspective Horizon
          </h3>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const PointCursorPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Point Cursor" description="A custom interactive cursor." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <PointCursor className="rounded-xl overflow-hidden border border-border bg-muted/10 w-full h-full">
        <div className="flex flex-col items-center justify-center w-full h-full min-h-75 sm:min-h-100 p-8 text-center space-y-8 relative overflow-hidden">
          {/* Decorative background to make it feel like a "playground" */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <DotBackground dotColor="currentColor" gap={20} />
          </div>

          <div className="space-y-3 relative z-10">
            <Badge variant="secondary" className="mb-2">
              Isolated Custom Cursor
            </Badge>
            <h3 className="text-2xl font-bold tracking-tight">
              Interactive Playground
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              The custom cursor is only active inside this box. Hover over the
              elements to test the{" "}
              <span className="text-primary font-bold italic">Dot-to-Ring</span>{" "}
              transformation.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Button className="rounded-full px-8 shadow-lg shadow-primary/20" color={previewColor} variant={previewVariant}>
              Hover Me
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 bg-background/50 backdrop-blur-sm" color={previewColor}
            >
              Try This One
            </Button>
            <a
              href="#"
              className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors py-2 px-4"
              onClick={(e) => e.preventDefault()}
            >
              Interactive Link
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md relative z-10 mx-auto">
            <div className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm clickable">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                Custom Box
              </span>
              <p className="text-xs mt-1">Has &apos;clickable&apos; class</p>
            </div>
            <div className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                Standard Box
              </span>
              <p className="text-xs mt-1">Normal behavior</p>
            </div>
          </div>
        </div>
      </PointCursor>
    </PreviewContainer>
  );
};
