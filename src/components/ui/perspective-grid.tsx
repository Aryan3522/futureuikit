import React from "react";
import { cn } from "@/lib/utils";

export interface PerspectiveGridProps {
  className?: string;
  gridLineGap?: number;
  showOverlay?: boolean;
  fadeRadius?: number;
}

export function PerspectiveGrid({
  className,
  gridLineGap = 60,
  showOverlay = true,
  fadeRadius = 80,
}: PerspectiveGridProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-transparent",
        "[--fade-stop:theme(colors.background)]",
        className
      )}
      style={{
        perspective: "2000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* GRID (single element using gradients) */}
      <div
        className="absolute w-[80rem] aspect-square origin-center"
        style={{
          left: "50%",
          top: "50%",
          transform:
            "translate(-50%, -50%) rotateX(30deg) rotateY(-5deg) rotateZ(20deg) scale(2)",
          transformStyle: "preserve-3d",

          backgroundImage: `
            repeating-linear-gradient(
              to right,
              rgba(156,163,175,0.35) 0px,
              rgba(156,163,175,0.35) 1px,
              transparent 1px,
              transparent ${gridLineGap}px
            ),
            repeating-linear-gradient(
              to bottom,
              rgba(156,163,175,0.35) 0px,
              rgba(156,163,175,0.35) 1px,
              transparent 1px,
              transparent ${gridLineGap}px
            )
          `,
        }}
      />

      {/* OVERLAY FADE */}
      {showOverlay && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle, transparent 25%, var(--fade-stop) ${fadeRadius}%)`,
          }}
        />
      )}
    </div>
  );
}

export default React.memo(PerspectiveGrid);
