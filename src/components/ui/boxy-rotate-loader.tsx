/**
 * @registry-slug boxy-rotate
 * @registry-name Rotating Loader
 * @registry-description A Future UI Rotating Loader component.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client";
import React from "react";
import { cn } from "@/lib/utils";

export type BoxyLoaderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type BoxyLoaderShape = "default" | "square" | "rounded" | "sharp";
export type BoxyLoaderSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface BoxyRotateLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
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

export const BoxyRotateLoader: React.FC<BoxyRotateLoaderProps> = React.memo(({ 
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
        .pl1-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pl1 {
          display: block;
          width: 8em;
          height: 8em;
        }
        .pl1__g, .pl1__rect {
          animation: pl1-a 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .pl1__g { transform-origin: 64px 64px; }
        .pl1__rect:first-child { animation-name: pl1-b; }
        .pl1__rect:nth-child(2) { animation-name: pl1-c; }
        @keyframes pl1-a {
          from { transform: rotate(0); }
          80%, to { animation-timing-function: steps(1, start); transform: rotate(90deg); }
        }
        @keyframes pl1-b {
          from { animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0); width: 40px; height: 40px; }
          20% { animation-timing-function: steps(1, start); width: 40px; height: 0; }
          60% { animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1); width: 0; height: 40px; }
          80%, to { width: 40px; height: 40px; }
        }
        @keyframes pl1-c {
          from { animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0); width: 40px; height: 40px; transform: translate(0, 48px); }
          20% { animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1); width: 40px; height: 88px; transform: translate(0, 0); }
          40% { animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0); width: 40px; height: 40px; transform: translate(0, 0); }
          60% { animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1); width: 88px; height: 40px; transform: translate(0, 0); }
          80%, to { width: 40px; height: 40px; transform: translate(48px, 0); }
        }
      `}</style>
      <div className="pl1-container">
        <svg className="pl1" viewBox="0 0 128 128" width="128" height="128">
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
            <g className="pl1__g">
              <g transform="translate(20,20) rotate(0,44,44)">
                <g className="pl1__rect-g">
                  <rect className="pl1__rect" rx={rx} ry={rx} width="40" height="40" />
                  <rect className="pl1__rect" rx={rx} ry={rx} width="40" height="40" transform="translate(0,48)" />
                </g>
                <g className="pl1__rect-g" transform="rotate(180,44,44)">
                  <rect className="pl1__rect" rx={rx} ry={rx} width="40" height="40" />
                  <rect className="pl1__rect" rx={rx} ry={rx} width="40" height="40" transform="translate(0,48)" />
                </g>
              </g>
            </g>
          </g>
          <g fill={activeColor.secondary} mask="url(#pl-mask)" className={color === "default" ? "text-muted-foreground" : "opacity-80"}>
            <g className="pl1__g">
              <g transform="translate(20,20) rotate(0,44,44)">
                <g className="pl1__rect-g">
                  <rect className="pl1__rect" rx={rx} ry={rx} width="40" height="40" />
                  <rect className="pl1__rect" rx={rx} ry={rx} width="40" height="40" transform="translate(0,48)" />
                </g>
                <g className="pl1__rect-g" transform="rotate(180,44,44)">
                  <rect className="pl1__rect" rx={rx} ry={rx} width="40" height="40" />
                  <rect className="pl1__rect" rx={rx} ry={rx} width="40" height="40" transform="translate(0,48)" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
});
BoxyRotateLoader.displayName = "BoxyRotateLoader";
