"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";
import { ComponentItem } from "@/types";
import { PreviewRegistry } from "@/route-components/PreviewRegistry";
import { DotBackground } from "./dot-background";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";

interface ComponentsGridProps {
  items: ComponentItem[];
}

const ComponentsGrid: React.FC<ComponentsGridProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  const sortedItems = [...items].sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full">
      {sortedItems.map((item, idx) => {
        const Preview = PreviewRegistry[item.slug];

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group h-full"
          >
            <Card className="h-full flex flex-col border border-border/40 shadow-sm hover:shadow-2xl transition-all duration-500 backdrop-blur-xl bg-card/40 dark:bg-card/20 overflow-hidden rounded-4xl">
              {/* Preview Area (The "Container" to fix) */}
              <div className="relative w-full min-h-50 overflow-hidden bg-muted/10 flex items-center justify-center">
                <DotBackground 
                  dotColor="var(--primary)" 
                  maskOpacity={0.08}
                  className="bg-linear-to-br from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-500 min-h-50 flex items-center justify-center"
                >
                  <div className="w-full relative z-10 select-none pointer-events-none scale-[0.8] origin-center flex items-center justify-center">
                    {Preview ? <Preview /> : <div className="text-[10px] font-bold opacity-20 uppercase italic">Preview Soon</div>}
                  </div>
                </DotBackground>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/20 backdrop-blur-[2px]">
                  <Link
                    href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                  >
                    <Button size="sm" variant="secondary" className="rounded-full shadow-lg">
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
                <CardTitle className="text-lg font-bold italic group-hover:text-primary transition-colors truncate">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 pt-0 mt-auto">
                <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>
                
                <Link 
                  href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-primary hover:underline"
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
