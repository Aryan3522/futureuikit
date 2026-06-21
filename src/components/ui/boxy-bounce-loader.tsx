/**
 * @registry-slug boxy-bounce
 * @registry-name Bouncy Loader
 * @registry-description A Future UI Bouncy Loader component.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client";
import React from "react";
import { cn } from "@/lib/utils";

export type BoxyLoaderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type BoxyLoaderShape = "default" | "square" | "rounded" | "sharp";
export type BoxyLoaderSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface BoxyBounceLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
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

export const BoxyBounceLoader: React.FC<BoxyBounceLoaderProps> = React.memo(({ 
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
        .pl2-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pl2 {
          display: block;
          width: 8em;
          height: 8em;
        }
        .pl2__rect, .pl2__rect-g {
          animation: pl2-a 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .pl2__rect { animation-name: pl2-b; }
        .pl2__rect-g .pl2__rect { transform-origin: 20px 128px; }
        .pl2__rect-g:first-child, .pl2__rect-g:first-child .pl2__rect { animation-delay: -0.25s; }
        .pl2__rect-g:nth-child(2), .pl2__rect-g:nth-child(2) .pl2__rect { animation-delay: -0.125s; }
        .pl2__rect-g:nth-child(2) .pl2__rect { transform-origin: 64px 128px; }
        .pl2__rect-g:nth-child(3) .pl2__rect { transform-origin: 108px 128px; }
        @keyframes pl2-a {
          from, 25%, 66.67%, to { transform: translateY(0); }
          50% { animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0); transform: translateY(-80px); }
        }
        @keyframes pl2-b {
          from, to { animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0); width: 40px; height: 24px; transform: rotate(180deg) translateX(0); }
          33.33% { animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1); width: 20px; height: 64px; transform: rotate(180deg) translateX(10px); }
          66.67% { animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1); width: 28px; height: 44px; transform: rotate(180deg) translateX(6px); }
        }
      `}</style>
      <div className="pl2-container">
        <svg className="pl2" viewBox="0 0 128 128" width="128" height="128">
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
            <g className="pl2__rect-g"><rect className="pl2__rect" rx={rx} ry={rx} x="0" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx={rx} ry={rx} x="44" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx={rx} ry={rx} x="88" y="128" width="40" height="24" transform="rotate(180)" /></g>
          </g>
          <g fill={activeColor.secondary} mask="url(#pl-mask)" className={color === "default" ? "text-muted-foreground" : "opacity-80"}>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx={rx} ry={rx} x="0" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx={rx} ry={rx} x="44" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx={rx} ry={rx} x="88" y="128" width="40" height="24" transform="rotate(180)" /></g>
          </g>
        </svg>
      </div>
    </div>
  );
});
BoxyBounceLoader.displayName = "BoxyBounceLoader";
