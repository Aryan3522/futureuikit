"use client";

/**
 * @registry-slug components-grid
 * @registry-name Components Grid
 * @registry-description A responsive grid layout for displaying component cards with preview thumbnails.
 * @registry-category ui
 * @registry-type components:ui
 */

import React from "react";
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

interface ComponentsGridProps {
  items: ComponentItem[];
  color?: ComponentsGridColor;
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
  blue: "group-hover:border-blue-500/50",
  emerald: "group-hover:border-emerald-500/50",
  rose: "group-hover:border-rose-500/50",
  amber: "group-hover:border-amber-500/50",
  violet: "group-hover:border-violet-500/50",
  indigo: "group-hover:border-indigo-500/50",
  sky: "group-hover:border-sky-500/50",
  slate: "group-hover:border-slate-500/50",
  orange: "group-hover:border-orange-500/50",
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

const ComponentsGrid: React.FC<ComponentsGridProps> = ({ items, color = "default" }) => {
  if (!items || items.length === 0) return null;

  const sortedItems = [...items].sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full">
      {sortedItems.map((item, idx) => {
        const Preview = getRegistryPreview(item.slug);

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group"
          >
            <Card className={cn("flex flex-col border shadow-sm hover:shadow-2xl transition-all duration-500 backdrop-blur-xl bg-card/40 dark:bg-card/20 overflow-hidden rounded-4xl", borderMap[color])}>
              {/* Preview Area (The "Container" to fix) */}
              <div className="relative w-full min-h-55 flex-1 overflow-hidden bg-muted/10 group/preview flex">
                {/* 1. Component Background - Always Full Bleed */}
                <div className="absolute inset-0 z-0">
                  {item.type.toLowerCase().includes("background") && Preview ? (
                    <Preview />
                  ) : (
                    <DotBackground 
                      dotColor="var(--primary)" 
                      maskOpacity={0.08}
                      className={cn("bg-linear-to-br transition-all duration-500", bgMap[color])}
                    />
                  )}
                </div>
                
                {/* 2. Component Content (For non-background components) */}
                {!item.type.toLowerCase().includes("background") && (
                  <div className="relative z-10 w-full flex items-center justify-center p-8 sm:p-10 select-none pointer-events-none">
                    {Preview ? <Preview /> : <div className="text-[10px] font-bold opacity-20 uppercase italic">Preview Soon</div>}
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/20 backdrop-blur-[2px]">
                  <Link
                    href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                  >
                    <Button variant="outline" className="rounded-full shadow-lg">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Content Area */}
              <CardHeader className="p-5 pb-2">
                <div className="flex justify-between items-center mb-1.5">
                  <Badge variant="outline" className="text-[9px] uppercase tracking-widest font-bold py-0 h-4">
                    {item.type}
                  </Badge>
                </div>
                <CardTitle className={cn("text-lg font-bold italic transition-colors truncate", colorMap[color])}>
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 pt-0 mt-auto">
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
      })}
    </div>
  );
};

export default ComponentsGrid;
