/* eslint-disable react-hooks/static-components */
"use client";

/**
 * @registry-slug components-grid
 * @registry-name Components Grid
 * @registry-description A responsive grid layout for displaying component cards with preview thumbnails.
 * @registry-category ui
 * @registry-type components:ui
 */

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";
import { ComponentItem } from "@/types";
import { getRegistryPreview } from "@/registry/ComponentRenderer";
import { cn } from "@/lib/utils";
import { DotBackground } from "./dot-background";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";

export type ComponentsGridColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ComponentsGridVariant = "default" | "elevated" | "bordered" | "minimal" | "interactive";
export type ComponentsGridShape = "default" | "square" | "rounded" | "sharp";
export type ComponentsGridSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface ComponentsGridProps {
  items: ComponentItem[];
  variant?: ComponentsGridVariant;
  color?: ComponentsGridColor;
  shape?: ComponentsGridShape;
  spacing?: ComponentsGridSpacing;
}

const colorMap: Record<ComponentsGridColor, string> = {
  default: "text-primary hover:text-primary",
  blue: "text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400",
  emerald: "text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400",
  rose: "text-rose-600 dark:text-rose-500 hover:text-rose-700 dark:hover:text-rose-400",
  amber: "text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400",
  violet: "text-violet-600 dark:text-violet-500 hover:text-violet-700 dark:hover:text-violet-400",
  indigo: "text-indigo-600 dark:text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-400",
  sky: "text-sky-600 dark:text-sky-500 hover:text-sky-700 dark:hover:text-sky-400",
  slate: "text-slate-600 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-400",
  orange: "text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400",
};

const borderMap: Record<ComponentsGridColor, string> = {
  default: "border-border/60 group-hover:border-foreground/20",
  blue: "border-blue-500/30 group-hover:border-blue-500/50",
  emerald: "border-emerald-500/30 group-hover:border-emerald-500/50",
  rose: "border-rose-500/30 group-hover:border-rose-500/50",
  amber: "border-amber-500/30 group-hover:border-amber-500/50",
  violet: "border-violet-500/30 group-hover:border-violet-500/50",
  indigo: "border-indigo-500/30 group-hover:border-indigo-500/50",
  sky: "border-sky-500/30 group-hover:border-sky-500/50",
  slate: "border-slate-500/30 group-hover:border-slate-500/50",
  orange: "border-orange-500/30 group-hover:border-orange-500/50",
};

const bgMap: Record<ComponentsGridColor, string> = {
  default: "from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20",
  blue: "from-blue-500/5 to-blue-500/10 group-hover:from-blue-500/10 group-hover:to-blue-500/20",
  emerald: "from-emerald-500/5 to-emerald-500/10 group-hover:from-emerald-500/10 group-hover:to-emerald-500/20",
  rose: "from-rose-500/5 to-rose-500/10 group-hover:from-rose-500/10 group-hover:to-rose-500/20",
  amber: "from-amber-500/5 to-amber-500/10 group-hover:from-amber-500/10 group-hover:to-amber-500/20",
  violet: "from-violet-500/5 to-violet-500/10 group-hover:from-violet-500/10 group-hover:to-violet-500/20",
  indigo: "from-indigo-500/5 to-indigo-500/10 group-hover:from-indigo-500/10 group-hover:to-indigo-500/20",
  sky: "from-sky-500/5 to-sky-500/10 group-hover:from-sky-500/10 group-hover:to-sky-500/20",
  slate: "from-slate-500/5 to-slate-500/10 group-hover:from-slate-500/10 group-hover:to-slate-500/20",
  orange: "from-orange-500/5 to-orange-500/10 group-hover:from-orange-500/10 group-hover:to-orange-500/20",
};

const badgeColorMap: Record<ComponentsGridColor, string> = {
  default: "border-primary/40 text-primary",
  blue: "border-blue-500/40 text-blue-600 dark:text-blue-500",
  emerald: "border-emerald-500/40 text-emerald-600 dark:text-emerald-500",
  rose: "border-rose-500/40 text-rose-600 dark:text-rose-500",
  amber: "border-amber-500/40 text-amber-600 dark:text-amber-500",
  violet: "border-violet-500/40 text-violet-600 dark:text-violet-500",
  indigo: "border-indigo-500/40 text-indigo-600 dark:text-indigo-500",
  sky: "border-sky-500/40 text-sky-600 dark:text-sky-500",
  slate: "border-slate-500/40 text-slate-600 dark:text-slate-400",
  orange: "border-orange-500/40 text-orange-600 dark:text-orange-500",
};

const shapeMap: Record<ComponentsGridShape, string> = {
  default: "rounded-2xl sm:rounded-3xl",
  square: "rounded-none",
  rounded: "rounded-xl sm:rounded-2xl",
  sharp: "rounded-lg",
};

const spacingMap: Record<ComponentsGridSpacing, { gap: string; cardPad: string; headerPad: string; contentPad: string }> = {
  "2x": { gap: "gap-3 md:gap-4", cardPad: "p-3", headerPad: "p-3 pb-1.5", contentPad: "p-3 pt-0" },
  "4x": { gap: "gap-5 md:gap-6", cardPad: "p-4", headerPad: "p-4 pb-2", contentPad: "p-4 pt-0" },
  "6x": { gap: "gap-8 md:gap-10", cardPad: "p-6", headerPad: "p-6 pb-3", contentPad: "p-6 pt-0" },
  "8x": { gap: "gap-10 md:gap-12", cardPad: "p-7", headerPad: "p-7 pb-4", contentPad: "p-7 pt-0" },
  default: { gap: "gap-6 md:gap-8", cardPad: "p-5", headerPad: "p-5 pb-2", contentPad: "p-5 pt-0" },
};

const variantMap: Record<ComponentsGridVariant, { card: string; previewBg: string; hoverOverlay: string; hideHover: boolean; colorBorder: boolean; colorPreview: boolean; interactive: boolean }> = {
  default: {
    card: "border shadow-sm hover:shadow-2xl backdrop-blur-xl bg-card/40 dark:bg-card/20",
    previewBg: "bg-linear-to-br transition-all duration-500",
    hoverOverlay: "bg-background/20 backdrop-blur-[2px]",
    hideHover: false,
    colorBorder: true,
    colorPreview: true,
    interactive: false,
  },
  elevated: {
    card: "border shadow-lg hover:shadow-3xl bg-card",
    previewBg: "bg-linear-to-br transition-all duration-500",
    hoverOverlay: "bg-gradient-to-t from-background/40 to-transparent",
    hideHover: false,
    colorBorder: true,
    colorPreview: true,
    interactive: false,
  },
  bordered: {
    card: "border-2 shadow-none bg-transparent",
    previewBg: "bg-muted/5",
    hoverOverlay: "bg-background/20 backdrop-blur-[2px]",
    hideHover: false,
    colorBorder: true,
    colorPreview: false,
    interactive: false,
  },
  minimal: {
    card: "border-0 shadow-none bg-transparent hover:bg-muted/10",
    previewBg: "bg-muted/5",
    hoverOverlay: "",
    hideHover: true,
    colorBorder: false,
    colorPreview: false,
    interactive: false,
  },
  interactive: {
    card: "border shadow-sm hover:shadow-xl bg-card",
    previewBg: "bg-linear-to-br transition-all duration-500",
    hoverOverlay: "bg-background/10 backdrop-blur-[2px]",
    hideHover: false,
    colorBorder: true,
    colorPreview: true,
    interactive: true,
  },
};

const ComponentsGrid: React.FC<ComponentsGridProps> = ({ items, variant = "default", color = "default", shape = "default", spacing = "default" }) => {
  if (!items || items.length === 0) return null;

  const sortedItems = [...items].sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  const isSingle = items.length === 1;
  const sp = spacingMap[spacing];

  return (
    <div className={cn("grid w-full", sp.gap, isSingle ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}>
      {sortedItems.map((item, idx) => (
        <GridCardItem key={item.id} item={item} idx={idx} variant={variant} color={color} shape={shape} spacing={sp} />
      ))}
    </div>
  );
};

interface GridCardItemProps {
  item: ComponentItem;
  idx: number;
  variant: ComponentsGridVariant;
  color: ComponentsGridColor;
  shape: ComponentsGridShape;
  spacing: { gap: string; cardPad: string; headerPad: string; contentPad: string };
}

const GridCardItem: React.FC<GridCardItemProps> = ({ item, idx, variant, color, shape, spacing }) => {
  const Preview = getRegistryPreview(item.slug);
  const shapeClass = shapeMap[shape];
  const v = variantMap[variant];
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!v.interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -8);
    setRotateY((x - 0.5) * 8);
    setGlowX(x * 100);
    setGlowY(y * 100);
  };

  const handleMouseLeave = () => {
    if (!v.interactive) return;
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="group"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={v.interactive ? {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      } : undefined}
    >
      <Card className={cn("flex flex-col overflow-hidden transition-all duration-500", v.card, shapeClass, v.colorBorder && borderMap[color])}>
        {/* Preview Area */}
        <div className="relative w-full min-h-[200px] sm:min-h-[220px] lg:min-h-[260px] flex-1 overflow-hidden bg-muted/10 group/preview flex">
          {/* 1. Component Background - Always Full Bleed */}
          <div className="absolute inset-0 z-0">
            {item.type.toLowerCase().includes("background") && Preview ? (
              <Preview />
            ) : (
              <DotBackground 
                dotColor="var(--primary)" 
                maskOpacity={0.08}
                className={cn(v.previewBg, v.colorPreview && bgMap[color])}
              />
            )}
          </div>

          {/* 2. Component Content (For non-background components) */}
          {!item.type.toLowerCase().includes("background") && (
            <div className="relative z-10 w-full flex items-center justify-center p-8 sm:p-10 select-none pointer-events-none">
              {Preview ? <Preview /> : <div className="text-[10px] font-bold opacity-20 uppercase italic">Preview Soon</div>}
            </div>
          )}

          {/* Interactive Shimmer */}
          {v.interactive && (
            <div
              className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
              }}
            />
          )}

          {/* Hover Overlay */}
          {!v.hideHover && (
            <div className={cn("absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300", v.hoverOverlay)}>
              <Link href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}>
                <Button variant="outline" className="rounded-full shadow-lg">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Content Area */}
        <CardHeader className={cn(spacing.headerPad)}>
          <div className="flex justify-between items-center mb-1.5">
            <Badge variant="outline" className={cn("text-[9px] uppercase tracking-widest font-bold py-0 h-4", badgeColorMap[color])}>
              {item.type}
            </Badge>
          </div>
          <CardTitle className={cn("text-lg font-bold italic transition-colors truncate", colorMap[color])}>
            {item.title}
          </CardTitle>
        </CardHeader>

        <CardContent className={cn(spacing.contentPad, "mt-auto")}>
          <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
          <Link 
            href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
            className={cn("flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider hover:underline", colorMap[color])}
          >
            Get Component
            <ArrowUpRight size={12} />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ComponentsGrid;
