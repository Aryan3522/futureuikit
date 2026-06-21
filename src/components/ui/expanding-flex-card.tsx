/**
 * @registry-slug expanding-card
 * @registry-name Expanding Flex Card
 * @registry-description A Future UI Expanding Flex Card component.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type ExpandingCardColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ExpandingCardShape = "default" | "square" | "rounded" | "sharp";
export type ExpandingCardSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface ExpandingCardOption {
  id: string | number;
  img: string;
  icon: React.ReactNode;
  main: string;
  sub: string;
}

export interface ExpandingFlexCardProps {
  options?: ExpandingCardOption[];
  className?: string;
  color?: ExpandingCardColor;
  shape?: ExpandingCardShape;
  spacing?: ExpandingCardSpacing;
}

const colorThemeMap: Record<ExpandingCardColor, { bg: string; text: string; iconBg: string; iconText: string; gradient: string }> = {
  default: { bg: "bg-white/70 dark:bg-black/50 border-white/50 dark:border-white/10", text: "text-slate-900 dark:text-white", iconBg: "bg-white dark:bg-white", iconText: "text-slate-900 dark:text-black", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" },
  blue: { bg: "bg-blue-600/80 dark:bg-blue-900/80 border-blue-500/50 dark:border-blue-700/50", text: "text-white", iconBg: "bg-blue-500", iconText: "text-white", gradient: "from-blue-500/10 via-blue-500/40 to-blue-600/90 dark:from-blue-900/10 dark:via-blue-900/40 dark:to-blue-900/90" },
  emerald: { bg: "bg-emerald-600/80 dark:bg-emerald-900/80 border-emerald-500/50 dark:border-emerald-700/50", text: "text-white", iconBg: "bg-emerald-500", iconText: "text-white", gradient: "from-emerald-500/10 via-emerald-500/40 to-emerald-600/90 dark:from-emerald-900/10 dark:via-emerald-900/40 dark:to-emerald-900/90" },
  rose: { bg: "bg-rose-600/80 dark:bg-rose-900/80 border-rose-500/50 dark:border-rose-700/50", text: "text-white", iconBg: "bg-rose-500", iconText: "text-white", gradient: "from-rose-500/10 via-rose-500/40 to-rose-600/90 dark:from-rose-900/10 dark:via-rose-900/40 dark:to-rose-900/90" },
  amber: { bg: "bg-amber-500/80 dark:bg-amber-900/80 border-amber-400/50 dark:border-amber-700/50", text: "text-white", iconBg: "bg-amber-400", iconText: "text-slate-900", gradient: "from-amber-500/10 via-amber-500/40 to-amber-600/90 dark:from-amber-900/10 dark:via-amber-900/40 dark:to-amber-900/90" },
  violet: { bg: "bg-violet-600/80 dark:bg-violet-900/80 border-violet-500/50 dark:border-violet-700/50", text: "text-white", iconBg: "bg-violet-500", iconText: "text-white", gradient: "from-violet-500/10 via-violet-500/40 to-violet-600/90 dark:from-violet-900/10 dark:via-violet-900/40 dark:to-violet-900/90" },
  indigo: { bg: "bg-indigo-600/80 dark:bg-indigo-900/80 border-indigo-500/50 dark:border-indigo-700/50", text: "text-white", iconBg: "bg-indigo-500", iconText: "text-white", gradient: "from-indigo-500/10 via-indigo-500/40 to-indigo-600/90 dark:from-indigo-900/10 dark:via-indigo-900/40 dark:to-indigo-900/90" },
  sky: { bg: "bg-sky-500/80 dark:bg-sky-900/80 border-sky-400/50 dark:border-sky-700/50", text: "text-white", iconBg: "bg-sky-400", iconText: "text-slate-900", gradient: "from-sky-500/10 via-sky-500/40 to-sky-600/90 dark:from-sky-900/10 dark:via-sky-900/40 dark:to-sky-900/90" },
  slate: { bg: "bg-slate-600/80 dark:bg-slate-900/80 border-slate-500/50 dark:border-slate-700/50", text: "text-white", iconBg: "bg-slate-500", iconText: "text-white", gradient: "from-slate-500/10 via-slate-500/40 to-slate-600/90 dark:from-slate-900/10 dark:via-slate-900/40 dark:to-slate-900/90" },
  orange: { bg: "bg-orange-500/80 dark:bg-orange-900/80 border-orange-400/50 dark:border-orange-700/50", text: "text-white", iconBg: "bg-orange-400", iconText: "text-slate-900", gradient: "from-orange-500/10 via-orange-500/40 to-orange-600/90 dark:from-orange-900/10 dark:via-orange-900/40 dark:to-orange-900/90" }
};

const getShapeClass = (shape: ExpandingCardShape, state: "open" | "closed" | "mobile" | "content" | "icon") => {
  if (state === "icon") {
    switch (shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-sm";
      case "rounded": return "rounded-xl";
      case "default": return "rounded-2xl";
    }
  }
  if (state === "content") {
    switch (shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-sm";
      case "rounded": return "rounded-xl";
      case "default": return "rounded-2xl";
    }
  }
  if (state === "closed") {
    switch (shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-[4px]";
      case "rounded": return "rounded-3xl";
      case "default": return "rounded-full";
    }
  }
  // open / mobile
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[4px]";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-[24px]";
  }
};

const getSpacingClass = (spacing: ExpandingCardSpacing, element: "container" | "content" | "bottomOffset") => {
  if (element === "bottomOffset") {
    switch(spacing) {
      case "2x": return "bottom-2 left-2 right-2";
      case "4x": return "bottom-4 left-4 right-4";
      case "6x": return "bottom-6 left-6 right-6";
      case "8x": return "bottom-8 left-8 right-8";
      default: return "bottom-5 left-5 right-5";
    }
  }
  if (element === "content") {
    switch (spacing) {
      case "2x": return "p-2 gap-2";
      case "4x": return "p-3 gap-2.5";
      case "6x": return "p-5 gap-4";
      case "8x": return "p-6 gap-5";
      default: return "p-4 gap-3";
    }
  }
  // container
  switch (spacing) {
    case "2x": return "gap-1";
    case "4x": return "gap-2";
    case "6x": return "gap-4";
    case "8x": return "gap-6";
    default: return "gap-3";
  }
};

export const ExpandingFlexCard: React.FC<ExpandingFlexCardProps> = React.memo(({ 
  options = [], 
  className,
  color = "default",
  shape = "default",
  spacing = "default"
}) => {
  const [activeOption, setActiveOption] = useState<string | number | undefined>(options[0]?.id);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTheme = colorThemeMap[color];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!options.length) return null;

  // Limit to 8 cards
  const displayOptions = options.slice(0, 8);

  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4 py-8", className)} ref={containerRef}>
      <style>{`
        .expanding-card {
          position: relative;
          background-size: cover;
          background-position: center;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          overflow: hidden;
          height: 100%;
          min-width: 60px;
        }
        .expanding-card.closed {
          flex: 0.5;
        }
        .expanding-card.open {
          flex: 4;
        }
        .card-content {
          position: absolute;
          display: flex;
          align-items: center;
          backdrop-filter: blur(12px);
          pointer-events: none;
          z-index: 20;
          border-width: 1px;
        }
        
        .card-icon-wrapper {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 20px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .card-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .card-title {
          font-weight: 700;
          font-size: 16px;
          line-height: 1.2;
          white-space: nowrap;
        }
        .card-label {
          font-size: 12px;
          opacity: 0.8;
          white-space: nowrap;
        }
        
        /* Desktop/Tablet Specific */
        .closed-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 20;
        }
        
        @media (min-width: 768px) {
          .desktop-only-content {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease 0.2s;
          }
          .expanding-card.open .desktop-only-content {
            opacity: 1;
            transform: translateY(0);
          }
          .expanding-card.open .closed-icon {
            opacity: 0;
          }
        }

        /* Mobile Specific Carousel Fixes */
        .mobile-card {
          height: 400px;
          position: relative;
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }
      `}</style>

      {isMobile ? (
        <div className="relative w-full">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 w-[calc(100%+2rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {displayOptions.map((opt) => (
              <div
                key={opt.id}
                className={cn("mobile-card snap-center shrink-0 w-[85%] sm:w-[60%]", getShapeClass(shape, "mobile"))}
                style={{ backgroundImage: `url("${opt.img}")` }}
              >
                <div className={cn("absolute inset-0 bg-linear-to-b pointer-events-none z-10", activeTheme.gradient)} />
                <div className={cn("card-content opacity-100 transform-none shadow-lg", getShapeClass(shape, "content"), getSpacingClass(spacing, "content"), getSpacingClass(spacing, "bottomOffset"), activeTheme.bg, activeTheme.text)}>
                  <div className={cn("card-icon-wrapper", getShapeClass(shape, "icon"), activeTheme.iconBg, activeTheme.iconText)}>
                    {opt.icon}
                  </div>
                  <div className="card-info flex flex-col">
                    <div className="card-title">{opt.main}</div>
                    <div className="card-label">{opt.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={cn("flex h-[28rem] items-center justify-center", getSpacingClass(spacing, "container"))}>
          {displayOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setActiveOption(opt.id)}
              className={cn(
                "expanding-card",
                activeOption === opt.id ? "open" : "closed",
                activeOption === opt.id ? getShapeClass(shape, "open") : getShapeClass(shape, "closed")
              )}
              style={{ backgroundImage: `url("${opt.img}")` }}
            >
              <div className={cn("absolute inset-0 bg-linear-to-b pointer-events-none z-10", activeTheme.gradient)} />
              
              <div className={cn("closed-icon drop-shadow-sm dark:drop-shadow-md", color === "default" ? "text-slate-900 dark:text-white" : "text-white")}>{opt.icon}</div>
              
              <div className={cn("card-content desktop-only-content shadow-lg", getShapeClass(shape, "content"), getSpacingClass(spacing, "content"), getSpacingClass(spacing, "bottomOffset"), activeTheme.bg, activeTheme.text)}>
                <div className={cn("card-icon-wrapper", getShapeClass(shape, "icon"), activeTheme.iconBg, activeTheme.iconText)}>
                  {opt.icon}
                </div>
                <div className="card-info flex flex-col">
                  <div className="card-title">{opt.main}</div>
                  <div className="card-label">{opt.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
ExpandingFlexCard.displayName = "ExpandingFlexCard";
