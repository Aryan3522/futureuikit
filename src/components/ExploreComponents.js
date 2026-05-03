"use client";

import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Code2 } from "lucide-react";
import { componentsList } from "@/data/component-library-data";
import Link from "next/link";

const gpuStyle = {
  willChange: "transform, opacity",
  backfaceVisibility: "hidden",
  transform: "translateZ(0)",
};

const ExploreComponents = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Seed (Daily Rotation)
  const getSeed = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  };

  // ✅ Deterministic Shuffle
  const seededShuffle = (array, seed) => {
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

  const types = [
    "all",
    ...new Set(componentsList.map((c) => c.type.toLowerCase())),
  ];

  // ✅ Apply rotation only for homepage/all view
  const filteredData = useMemo(() => {
    if (selectedType === "all" && mounted) {
      const seed = getSeed();
      const shuffled = seededShuffle(componentsList, seed);
      return shuffled.slice(0, 3); // 👈 limit to 3
    }

    if (selectedType === "all" && !mounted) {
      return componentsList.slice(0, 3);
    }

    return componentsList.filter(
      (item) => item.type.toLowerCase() === selectedType,
    );
  }, [selectedType, mounted]);

  const hoverProps = reduced
    ? {}
    : {
        whileHover: {
          y: -4,
          scale: 1.01,
          transition: { duration: 0.12 },
        },
        whileTap: { scale: 0.98 },
      };

  const makeMotionProps = (delay = 0, opts = {}) => {
    const mobileTransition = {
      type: "tween",
      duration: 0.28,
      delay,
      ease: "linear",
    };
    const desktopTransition = {
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
      className="py-8 px-4 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div className="text-center mb-8" style={gpuStyle}>
          <Badge className="mb-4 px-3 py-1.5">Explore</Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Components
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse reusable UI components and discover implementation patterns
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {types.map((type) => (
            <Button
              key={type}
              size="sm"
              variant={selectedType === type ? "default" : "secondary"}
              onClick={() => setSelectedType(type)}
              className="capitalize"
            >
              {type === "all" ? "All" : type}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              className="group"
              style={gpuStyle}
              transition={{ delay: index * 0.05 }}
              {...makeMotionProps(0.0, { once: true })}
              {...hoverProps}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md bg-white/60 dark:bg-black/60 overflow-hidden">
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img
                    src={item.previewImage}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
