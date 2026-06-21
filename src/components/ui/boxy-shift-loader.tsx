/**
 * @registry-slug boxy-shift
 * @registry-name Boxy Loader
 * @registry-description A Future UI Boxy Loader component.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client";
import React from "react";
import { cn } from "@/lib/utils";

export type BoxyLoaderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type BoxyLoaderShape = "default" | "square" | "rounded" | "sharp";
export type BoxyLoaderSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface BoxyShiftLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: BoxyLoaderColor;
  shape?: BoxyLoaderShape;
  spacing?: BoxyLoaderSpacing;
}

const colorThemeMap: Record<BoxyLoaderColor, { main: string; secondary: string }> = {
  default: { main: "currentColor", secondary: "currentColor" }, // Uses currentColor with mask
  blue: { main: "#3b82f6", secondary: "#60a5fa" },
  emerald: { main: "#10b981", secondary: "#34d399" },
  rose: { main: "#f43f5e", secondary: "#fb7185" },
  amber: { main: "#f59e0b", secondary: "#fbbf24" },
  violet: { main: "#8b5cf6", secondary: "#a78bfa" },
  indigo: { main: "#6366f1", secondary: "#818cf8" },
  sky: { main: "#0ea5e9", secondary: "#38bdf8" },
  slate: { main: "#64748b", secondary: "#94a3b8" },
  orange: { main: "#f97316", secondary: "#fb923c" },
};

export const BoxyShiftLoader: React.FC<BoxyShiftLoaderProps> = React.memo(({ 
  className,
  color = "default",
  shape = "default",
  spacing = "default",
  ...props 
}) => {
  const activeColor = colorThemeMap[color];
  
  let rx = "8";
  if (shape === "square") rx = "0";
  if (shape === "sharp") rx = "2";
  if (shape === "rounded") rx = "4";
  if (shape === "default") rx = "8";

  let scale = "scale-[1]";
  if (spacing === "2x") scale = "scale-[0.5]";
  if (spacing === "4x") scale = "scale-[0.75]";
  if (spacing === "6x") scale = "scale-[1.25]";
  if (spacing === "8x") scale = "scale-[1.5]";

  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-full min-h-[inherit]", scale, className)} {...props}>
      <style>{`
        .pl3-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pl3 {
          display: block;
          width: 8em;
          height: 8em;
        }
        .pl3__rect {
          animation: pl3 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .pl3__rect-g {
          transform-origin: 64px 64px;
        }
        @keyframes pl3 {
          from { transform: translate(64px, 0); width: 64px; height: 64px; }
          25% { transform: translate(0, 0); width: 128px; height: 32px; }
          50% { transform: translate(0, 0); width: 64px; height: 64px; }
          75% { transform: translate(0, 0); width: 32px; height: 128px; }
          to { transform: translate(0, 64px); width: 64px; height: 64px; }
        }
      `}</style>
      <div className="pl3-container">
        <svg className="pl3" viewBox="0 0 128 128" width="128" height="128">
          <defs>
            <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
            <mask id="pl-mask">
              <rect x="0" y="0" width="128" height="128" fill="url(#pl-grad)" />
            </mask>
          </defs>
          <g fill={activeColor.main} className={color === "default" ? "text-foreground" : ""}>
            <rect className="pl3__rect" rx={rx} ry={rx} width="64" height="64" transform="translate(64,0)" />
            <g className="pl3__rect-g" transform="scale(-1,-1)">
              <rect className="pl3__rect" rx={rx} ry={rx} width="64" height="64" transform="translate(64,0)" />
            </g>
          </g>
          <g fill={activeColor.secondary} mask="url(#pl-mask)" className={color === "default" ? "text-muted-foreground" : "opacity-80"}>
            <rect className="pl3__rect" rx={rx} ry={rx} width="64" height="64" transform="translate(64,0)" />
            <g className="pl3__rect-g" transform="scale(-1,-1)">
              <rect className="pl3__rect" rx={rx} ry={rx} width="64" height="64" transform="translate(64,0)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
});
BoxyShiftLoader.displayName = "BoxyShiftLoader";
