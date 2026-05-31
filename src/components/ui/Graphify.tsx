"use client";

import React, { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { componentsList } from "@/data/component-library-data";
import { registry } from "@/data/registryData";
import { useTheme } from "@/contexts/ThemeContext";

// Dynamic import for react-force-graph-2d as it needs window
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

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

export const Graphify: React.FC = React.memo(() => {
          const { theme } = useTheme() as { theme: string };
          const [mounted, setMounted] = useState(false);

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
              color: "#00afaf",
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
          }, []);

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
              <div className="absolute bottom-8 left-8 z-10 p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border shadow-xl">
                <h3 className="text-lg font-bold italic mb-2 tracking-tight uppercase">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#00afaf]" />
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
              
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-2xl">
                Interactive Component Graph
              </div>
            </div>
          );
        });
Graphify.displayName = "Graphify";
