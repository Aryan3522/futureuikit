/**
 * @registry-slug dot-background
 * @registry-name Dot Background
 */
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DotBackgroundProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  dotColor?: string;
  maskOpacity?: number;
  children?: React.ReactNode;
}

export const DotBackground: React.FC<DotBackgroundProps> = React.memo(({
          className,
          dotSize = 1,
          gap = 20,
          dotColor = "currentColor",
          maskOpacity = 1,
          children,
        }) => {
          return (
            <div
              className={cn(
                "relative w-full h-full overflow-hidden bg-background flex items-center justify-center",
                className
              )}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
                  backgroundSize: `${gap}px ${gap}px`,
                  maskImage: `radial-gradient(ellipse at center, black, transparent 80%)`,
                  WebkitMaskImage: `radial-gradient(ellipse at center, black, transparent 80%)`,
                  opacity: maskOpacity,
                }}
              />
              
              <div className="relative z-10 w-full">
                {children}
              </div>
            </div>
          );
        });
DotBackground.displayName = "DotBackground";
