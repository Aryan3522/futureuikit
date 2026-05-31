/**
 * @registry-slug perspective-grid
 * @registry-name Perspective Grid
 */
import React from "react";
import { cn } from "@/lib/utils";

export interface PerspectiveGridProps {
  className?: string;
  gridLineGap?: number;
  showOverlay?: boolean;
  fadeRadius?: number;
}

export const PerspectiveGrid = React.memo(function PerspectiveGrid({
  className,
  gridLineGap = 60,
  showOverlay = true,
  fadeRadius = 80,
}: PerspectiveGridProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-background text-muted-foreground/30",
        "[--fade-stop:theme(colors.background)]",
        className
      )}
      style={{
        perspective: "2000px",
        transformStyle: "preserve-3d",
      }}
    >
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
              currentColor 0px,
              currentColor 1px,
              transparent 1px,
              transparent ${gridLineGap}px
            ),
            repeating-linear-gradient(
              to bottom,
              currentColor 0px,
              currentColor 1px,
              transparent 1px,
              transparent ${gridLineGap}px
            )
          `,
        }}
      />

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
});
PerspectiveGrid.displayName = "PerspectiveGrid";

export default React.memo(PerspectiveGrid);
