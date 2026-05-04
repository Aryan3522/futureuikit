"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, useReducedMotion, MotionProps, Transition } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { componentsList } from "@/data/component-library-data";
import Link from "next/link";
import Image from "next/image";
import { ComponentItem } from "@/types";

const gpuStyle: React.CSSProperties = {
  willChange: "transform, opacity",
  backfaceVisibility: "hidden",
  transform: "translateZ(0)",
};

const ExploreComponents: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [mounted, setMounted] = useState(false);
  const reducedMotionHook = useReducedMotion();
  
  // Stabilize reduced motion for SSR/Hydration
  const reduced = mounted ? reducedMotionHook : false;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Seed (Daily Rotation)
  const getSeed = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  };

  // ✅ Deterministic Shuffle
  const seededShuffle = (array: ComponentItem[], seed: string): ComponentItem[] => {
    let shuffled = [...array];
    let random = seed
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = random % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      random = (random * 9301 + 49297) % 233280;
    }

    return shuffled;
  };

  const types = useMemo(() => [
    "all",
    ...Array.from(new Set(componentsList.map((c) => c.type.toLowerCase()))),
  ], []);

  // ✅ Apply stable rotation
  const filteredData = useMemo(() => {
    if (selectedType === "all") {
      const seed = getSeed();
      const shuffled = seededShuffle(componentsList, seed);
      return shuffled.slice(0, 3);
    }

    return componentsList.filter(
      (item) => item.type.toLowerCase() === selectedType,
    );
  }, [selectedType]);

  const hoverProps: MotionProps = reduced
    ? {}
    : {
        whileHover: {
          y: -4,
          scale: 1.01,
          transition: { duration: 0.12 },
        },
        whileTap: { scale: 0.98 },
      };

  const makeMotionProps = (delay = 0, opts: { y?: number; x?: number; once?: boolean } = {}): MotionProps & { style: React.CSSProperties } => {
    const mobileTransition: Transition = {
      type: "tween",
      duration: 0.28,
      delay,
      ease: "linear",
    };
    const desktopTransition: Transition = {
      type: "tween",
      duration: 0.48,
      delay,
      ease: [0.2, 0.8, 0.2, 1],
    };

    return {
      initial: { opacity: 0, scale: 0.92, y: opts.y ?? 12, x: opts.x ?? 0 },
      whileInView: { opacity: 1, scale: 1, y: 0, x: 0 },
      viewport: { once: opts.once ?? false, amount: 0.05 },
      transition: reduced ? mobileTransition : desktopTransition,
      style: gpuStyle,
    };
  };

  return (
    <section
      id="exploreComponents"
      className="py-6 md:py-12 px-0 md:px-4 relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div className="text-center mb-10 md:mb-16" style={gpuStyle}>
          <Badge className="mb-4 px-3 py-1.5 rounded-full uppercase tracking-widest text-[10px]">Library</Badge>

          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic tracking-tight">
            The Collection
          </h2>

          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-2">
            Explore our curated selection of high-performance components
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex items-center justify-start md:justify-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {types.map((type) => (
            <Button
              key={type}
              size="sm"
              variant={selectedType === type ? "default" : "secondary"}
              onClick={() => setSelectedType(type)}
              className="capitalize whitespace-nowrap rounded-full px-5 py-2 text-xs font-bold italic border border-border/50"
            >
              {type === "all" ? "All" : type}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              className="group h-full"
              {...makeMotionProps(0.0, { once: true })}
              {...hoverProps}
              transition={{ ...makeMotionProps(0.0, { once: true }).transition, delay: index * 0.05 } as any}
            >
              <Card className="h-full border border-border/40 shadow-sm hover:shadow-2xl transition-all duration-500 backdrop-blur-xl bg-card/40 dark:bg-card/20 overflow-hidden rounded-[2rem]">
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted/20">
                  <Image
                    src={item.previewImage}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                    <Link
                      href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                    >
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <CardHeader className="p-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg group-hover:text-primary transition">
                      {item.title}
                    </CardTitle>

                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-2">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex justify-between mt-4">
                    <Link
                      className="w-full"
                      href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                    >
                      <Button size="sm" variant="outline" className="w-full">
                        View Component
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreComponents;
