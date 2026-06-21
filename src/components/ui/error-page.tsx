/**
 * @registry-slug error-page
 * @registry-name Error Page
 * @registry-description A Future UI Error Page component.
 * @registry-category ui
 */
"use client";
import React, { useId } from "react";
import { cn } from "@/lib/utils";

export type ErrorPageColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ErrorPageShape = "default" | "square" | "rounded" | "sharp";
export type ErrorPageSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface ErrorPageProps {
  className?: string;
  errorCode?: string;
  errorText?: string;
  color?: ErrorPageColor;
  shape?: ErrorPageShape;
  spacing?: ErrorPageSpacing;
}

const colorThemeMap: Record<ErrorPageColor, { main: string; glow1: string; glow2: string; glow3: string }> = {
  default: { main: "white", glow1: "white", glow2: "lightgray", glow3: "gray" },
  blue: { main: "#3b82f6", glow1: "#3b82f6", glow2: "#2563eb", glow3: "#1d4ed8" },
  emerald: { main: "#10b981", glow1: "#10b981", glow2: "#059669", glow3: "#047857" },
  rose: { main: "#f43f5e", glow1: "#f43f5e", glow2: "#e11d48", glow3: "#be123c" },
  amber: { main: "#f59e0b", glow1: "#f59e0b", glow2: "#d97706", glow3: "#b45309" },
  violet: { main: "#8b5cf6", glow1: "#8b5cf6", glow2: "#7c3aed", glow3: "#6d28d9" },
  indigo: { main: "#6366f1", glow1: "#6366f1", glow2: "#4f46e5", glow3: "#4338ca" },
  sky: { main: "#0ea5e9", glow1: "#0ea5e9", glow2: "#0284c7", glow3: "#0369a1" },
  slate: { main: "#64748b", glow1: "#64748b", glow2: "#475569", glow3: "#334155" },
  orange: { main: "#f97316", glow1: "#f97316", glow2: "#ea580c", glow3: "#c2410c" },
};

const getShapeClass = (shape: ErrorPageShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-3xl";
  }
};

const getSpacingClass = (spacing: ErrorPageSpacing) => {
  switch (spacing) {
    case "2x": return "p-4 gap-2";
    case "4x": return "p-8 gap-4";
    case "6x": return "p-12 gap-6";
    case "8x": return "p-16 gap-8";
    default: return "p-8 gap-4"; // Default
  }
};

export const ErrorPage: React.FC<ErrorPageProps> = React.memo(({ 
          className, 
          errorCode = "404", 
          errorText = "ERROR",
          color = "default",
          shape = "default",
          spacing = "default"
        }) => {
          const activeTheme = colorThemeMap[color];
          const shapeClass = getShapeClass(shape);
          const spacingClass = getSpacingClass(spacing);
          const id = useId().replace(/:/g, "");

          return (
            <div className={cn("w-full h-full flex flex-col items-center justify-center text-center", shapeClass, spacingClass, className)}>
              <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
        .error-neon-container-${id} {
          font-family: 'Monoton', cursive;
          text-align: center;
          text-transform: uppercase;
          font-size: 60px;
          color: ${activeTheme.main};
          text-shadow: 0 0 80px ${activeTheme.glow1}, 0 0 30px ${activeTheme.glow2}, 0 0 6px ${activeTheme.glow3};
          line-height: 1;
          cursor: pointer;
        }
        .error-neon-container-${id} p { margin: 10px; }
        .neon-error-${id} {
          color: #fff;
          text-shadow: 0 0 80px #ffffff, 0 0 30px #aaaaaa, 0 0 6px #555555;
        }
        .neon-error-${id} span { animation: upper-${id} 6s linear infinite; }
        .neon-error-${id} span:nth-of-type(2) { animation: lower-${id} 9s linear infinite; }
        .neon-error-${id} span:nth-of-type(1) { text-shadow: none; opacity: 0.4; }
        .error-neon-container-${id}:hover .neon-error-${id} {
          text-shadow: 0 0 200px #ffffff, 0 0 80px #aaaaaa, 0 0 6px #555555;
        }
        .error-neon-container-${id}:hover .neon-code-${id} {
          text-shadow: 0 0 100px ${activeTheme.glow1}, 0 0 40px ${activeTheme.glow2}, 0 0 8px ${activeTheme.glow3};
        }
        @keyframes upper-${id} {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 0.99;
            text-shadow: 0 0 80px #ffffff, 0 0 30px #aaaaaa, 0 0 6px #555555;
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.4; text-shadow: none; }
        }
        @keyframes lower-${id} {
          0%, 12%, 18.999%, 23%, 31.999%, 37%, 44.999%, 46%, 49.999%, 51%, 58.999%, 61%, 68.999%, 71%, 85.999%, 96%, 100% {
            opacity: 0.99;
            text-shadow: 0 0 80px ${activeTheme.glow1}, 0 0 30px ${activeTheme.glow2}, 0 0 6px ${activeTheme.glow3};
          }
          19%, 22.99%, 32%, 36.999%, 45%, 45.999%, 50%, 50.99%, 59%, 60.999%, 69%, 70.999%, 86%, 95.999% { opacity: 0.4; text-shadow: none; }
        }
      `}</style>
              <div className={`error-neon-container-${id}`}>
                <div className={`neon-error-${id} flex justify-center`}>
                  {errorText.split("").map((char, i) => (
                    <React.Fragment key={i}>
                      {i === 1 ? <span>{char}</span> : char}
                    </React.Fragment>
                  ))}
                </div>
                <div className={`neon-code-${id} flex justify-center`}>
                  {errorCode.split("").map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        });
ErrorPage.displayName = "ErrorPage";
