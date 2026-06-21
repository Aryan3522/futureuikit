"use client";

import React, { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { componentsList } from "@/data/component-library-data";
import { registry } from "@/data/registryData";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

// Dynamic import for react-force-graph-2d as it needs window
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export type GraphifyColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type GraphifyShape = "default" | "square" | "rounded" | "sharp";
export type GraphifySpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface GraphifyProps {
  color?: GraphifyColor;
  shape?: GraphifyShape;
  spacing?: GraphifySpacing;
}

interface Node {
  id: string;
  name: string;
  val: number;
  color: string;
  type: "root" | "category" | "component" | "dependency";
}

interface Link {
  source: string;
  target: string;
}

const colorThemeMap: Record<GraphifyColor, { hex: string; bgSoft: string; border: string; text: string }> = {
  default: { hex: "#00afaf", bgSoft: "bg-primary/10", border: "border-primary/20", text: "text-primary" },
  blue: { hex: "#2563eb", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", border: "border-blue-600/20 dark:border-blue-500/20", text: "text-blue-600 dark:text-blue-500" },
  emerald: { hex: "#10b981", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", border: "border-emerald-600/20 dark:border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-500" },
  rose: { hex: "#f43f5e", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", border: "border-rose-600/20 dark:border-rose-500/20", text: "text-rose-600 dark:text-rose-500" },
  amber: { hex: "#f59e0b", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", border: "border-amber-600/20 dark:border-amber-500/20", text: "text-amber-600 dark:text-amber-500" },
  violet: { hex: "#8b5cf6", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", border: "border-violet-600/20 dark:border-violet-500/20", text: "text-violet-600 dark:text-violet-500" },
  indigo: { hex: "#6366f1", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", border: "border-indigo-600/20 dark:border-indigo-500/20", text: "text-indigo-600 dark:text-indigo-500" },
  sky: { hex: "#0ea5e9", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", border: "border-sky-600/20 dark:border-sky-500/20", text: "text-sky-600 dark:text-sky-500" },
  slate: { hex: "#64748b", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", border: "border-slate-600/20 dark:border-slate-500/20", text: "text-slate-600 dark:text-slate-400" },
  orange: { hex: "#f97316", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", border: "border-orange-600/20 dark:border-orange-500/20", text: "text-orange-600 dark:text-orange-500" },
};

const getShapeClass = (shape: GraphifyShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-[2rem]";
  }
};

const getLabelShapeClass = (shape: GraphifyShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-full";
    case "default": return "rounded-full";
  }
};

const getSpacingClass = (spacing: GraphifySpacing) => {
  switch (spacing) {
    case "2x": return "p-2";
    case "4x": return "p-4";
    case "6x": return "p-6";
    case "8x": return "p-8";
    default: return "p-4";
  }
};

export const Graphify: React.FC<GraphifyProps> = React.memo(({ color = "default", shape = "default", spacing = "default" }) => {
          const { theme } = useTheme() as { theme: string };
          const [mounted, setMounted] = useState(false);

          const activeTheme = colorThemeMap[color];
          const shapeClass = getShapeClass(shape);
          const labelShapeClass = getLabelShapeClass(shape);
          const spacingClass = getSpacingClass(spacing);

          useEffect(() => {
            setTimeout(() => setMounted(true), 0);
          }, []);

          const graphData = useMemo(() => {
            const nodes: Node[] = [];
            const links: Link[] = [];

            // Root node
            nodes.push({
              id: "future-ui",
              name: "FUTURE UI",
              val: 20,
              color: activeTheme.hex,
              type: "root",
            });

            const categories = Array.from(new Set(componentsList.map((c) => c.type)));
            const dependencies = new Set<string>();

            categories.forEach((cat) => {
              nodes.push({
                id: `cat-${cat}`,
                name: cat,
                val: 12,
                color: "#2563eb",
                type: "category",
              });
              links.push({ source: "future-ui", target: `cat-${cat}` });
            });

            componentsList.forEach((comp) => {
              nodes.push({
                id: comp.slug,
                name: comp.title,
                val: 8,
                color: "#10b981",
                type: "component",
              });
              links.push({ source: `cat-${comp.type}`, target: comp.slug });

              // Add dependencies from registry
              const regComp = registry[comp.slug];
              if (regComp && regComp.dependencies) {
                regComp.dependencies.forEach((dep) => {
                  dependencies.add(dep);
                  links.push({ source: comp.slug, target: `dep-${dep}` });
                });
              }
            });

            dependencies.forEach((dep) => {
              nodes.push({
                id: `dep-${dep}`,
                name: dep,
                val: 5,
                color: "#f59e0b",
                type: "dependency",
              });
            });

            return { nodes, links };
          }, [activeTheme.hex]);

          if (!mounted) return null;

          return (
            <div className="w-full h-[calc(100vh-64px)] bg-background relative overflow-hidden">
              <ForceGraph2D
                graphData={graphData}
                nodeLabel="name"
                nodeVal={(node: any) => node.val}
                nodeColor={(node: any) => node.color}
                linkColor={() => (theme === "dark" ? "#444" : "#ccc")}
                backgroundColor={theme === "dark" ? "#000" : "#fff"}
                nodeCanvasObject={(node: any, ctx: any, globalScale: any) => {
                  const label = node.name;
                  const fontSize = 12 / globalScale;
                  ctx.font = `${fontSize}px Inter, sans-serif`;
                  const textWidth = ctx.measureText(label).width;
                  const bckgDimensions = [textWidth, fontSize].map(
                    (n) => n + fontSize * 0.2
                  );

                  ctx.fillStyle = node.color;
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, node.val / 2, 0, 2 * Math.PI, false);
                  ctx.fill();

                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = theme === "dark" ? "#fff" : "#000";
                  ctx.fillText(label, node.x, node.y + node.val + 2);
                }}
                onNodeClick={(node: any) => {
                  if (node.type === "component") {
                    const comp = componentsList.find((c) => c.slug === node.id);
                    if (comp) {
                      window.location.href = `/components/${comp.type.toLowerCase()}/${comp.slug}/${comp.id}`;
                    }
                  }
                }}
              />
              <div className={cn("absolute bottom-8 left-8 z-10 bg-card/80 backdrop-blur-md border border-border shadow-xl", shapeClass, spacingClass)}>
                <h3 className="text-lg font-bold italic mb-2 tracking-tight uppercase">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                    <span className="text-xs font-medium uppercase tracking-wider">Root Library</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#2563eb]" />
                    <span className="text-xs font-medium uppercase tracking-wider">Category</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                    <span className="text-xs font-medium uppercase tracking-wider">Component</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                    <span className="text-xs font-medium uppercase tracking-wider">Dependency</span>
                  </div>
                </div>
              </div>
              
              <div className={cn("absolute top-8 left-1/2 -translate-x-1/2 z-10 px-6 py-3 backdrop-blur-md border text-xs font-bold uppercase tracking-[0.2em] shadow-2xl", labelShapeClass, activeTheme.bgSoft, activeTheme.border, activeTheme.text)}>
                Interactive Component Graph
              </div>
            </div>
          );
        });
Graphify.displayName = "Graphify";
