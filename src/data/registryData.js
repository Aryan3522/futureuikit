export const registry = {
  primary: {
    name: "Primary Button",
    type: "components:ui",
    files: [
      {
        name: "primary-button.jsx",
        content: `"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const PrimaryButton = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";`,
      },
    ],
  },
  glowy: {
    name: "Glowy Button",
    type: "components:ui",
    files: [
      {
        name: "glowy-button.jsx",
        content: `"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const GlowyButton = React.forwardRef(
  ({ className, children, icon, ...props }, ref) => {
    return (
      <div className={cn("relative select-none inline-block", className)}>
        <style>{\`
          .glowy-btn-custom {
            --h: 60px;
            --color: #00afaf;
            --text-color: rgb(210 210 240);
            position: relative;
            min-width: 180px;
            height: var(--h);
            padding: 0 4.25rem 0 2.5rem;
            border-radius: var(--h);
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border: none;
            font-family: inherit;
            color: var(--text-color);
            background: rgb(4 8 20 / 0.8);
            box-shadow: 0 0 0 1px rgb(200 200 220 / 0.22);
            overflow: hidden;
            cursor: pointer;
            transition: all 500ms ease;
            z-index: 2;
          }
          .glowy-btn-custom::before {
            content: "";
            position: absolute;
            inset: 0;
            background: rgb(200 200 220 / 0.1);
            box-shadow: inset 0 0px 24px 0 rgb(170 230 250 / 0.12);
            border-radius: var(--h);
            z-index: 1;
            transition: transform 500ms ease, box-shadow 500ms ease;
          }
          .glowy-btn-custom .btn-text {
            transition: transform 500ms ease;
            z-index: 2;
            white-space: nowrap;
          }
          .glowy-btn-custom .btn-icon {
            position: absolute;
            right: 1.25rem;
            width: 20px;
            height: 20px;
            opacity: 0;
            transform: translateX(15px);
            transition: all 500ms ease;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .glowy-btn-custom:hover {
            box-shadow: 0 0 20px var(--color),
              inset 0 0 26px -10px var(--color),
              0 0 0 1px rgb(200 200 220 / 0.22);
          }
          .glowy-btn-custom:hover::before {
            transform: translateX(calc(100% - var(--h)));
            box-shadow: inset 0 0px 0px 0 transparent;
          }
          .glowy-btn-custom:hover .btn-text {
            transform: translateX(-15px);
          }
          .glowy-btn-custom:hover .btn-icon {
            opacity: 1;
            transform: translateX(0);
            color: var(--color);
          }
        \`}</style>
        <button ref={ref} className="glowy-btn-custom" {...props}>
          <span className="btn-text">{children}</span>
          <div className="btn-icon">
            {icon || (
              <svg viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z" fill="currentColor"/>
              </svg>
            )}
          </div>
        </button>
      </div>
    );
  }
);
GlowyButton.displayName = "GlowyButton";`,
      },
    ],
  },
  "basic-card": {
    name: "Basic Card",
    type: "components:ui",
    files: [
      {
        name: "basic-card.jsx",
        content: `"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BasicCard = ({
  className,
  avatarText = "AH",
  name = "Aryan Hooda",
  title = "Full Stack Developer",
  description = "Building scalable web apps with React, Node.js & MongoDB. Passionate about clean UI and high-performance backend systems.",
  stats = [
    { label: "Projects", value: "24" },
    { label: "Years", value: "3+" },
    { label: "Followers", value: "1.2k" },
  ],
  primaryCtaText = "Connect",
  secondaryCtaText = "Profile",
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <div
      className={cn(
        "max-w-sm w-full rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-6 shadow-lg hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 text-foreground",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
          {avatarText}
        </div>
        <div className="overflow-hidden text-ellipsis">
          <h3 className="text-lg font-bold whitespace-nowrap">{name}</h3>
          <p className="text-xs text-muted-foreground whitespace-nowrap">{title}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
        {description}
      </p>
      {stats && stats.length > 0 && (
        <div className="flex justify-between mb-4 border-t border-border/20 pt-3 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-bold">{stat.value}</h4>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        {primaryCtaText && (
          <button
            onClick={onPrimaryClick}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white rounded-md py-2 text-sm font-medium hover:opacity-90 transition active:scale-95"
          >
            {primaryCtaText}
          </button>
        )}
        {secondaryCtaText && (
          <button
            onClick={onSecondaryClick}
            className="flex-1 bg-muted/50 border border-border/40 hover:bg-muted text-foreground rounded-md py-2 text-sm font-medium transition active:scale-95"
          >
            {secondaryCtaText}
          </button>
        )}
      </div>
    </div>
  );
};`,
      },
    ],
  },
  "boxy-rotate": {
    name: "Rotating Loader",
    type: "components:ui",
    files: [
      {
        name: "boxy-rotate-loader.jsx",
        content: `"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BoxyRotateLoader = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)} {...props}>
      <style>{\`
        .pl1-container {
          --hue: 223;
          --bg: hsl(var(--hue), 90%, 90%);
          --fg: hsl(var(--hue), 90%, 10%);
          --primary: hsl(var(--hue), 90%, 50%);
          --trans-dur: 0.3s;
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
      \`}</style>
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
          <g fill="hsl(223, 90%, 50%)">
            <g className="pl1__g">
              <g transform="translate(20,20) rotate(0,44,44)">
                <g className="pl1__rect-g">
                  <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                  <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
                </g>
                <g className="pl1__rect-g" transform="rotate(180,44,44)">
                  <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                  <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
                </g>
              </g>
            </g>
          </g>
          <g fill="hsl(343,90%,50%)" mask="url(#pl-mask)">
            <g className="pl1__g">
              <g transform="translate(20,20) rotate(0,44,44)">
                <g className="pl1__rect-g">
                  <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                  <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
                </g>
                <g className="pl1__rect-g" transform="rotate(180,44,44)">
                  <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                  <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};`,
      },
    ],
  },
  "boxy-bounce": {
    name: "Bouncy Loader",
    type: "components:ui",
    files: [
      {
        name: "boxy-bounce-loader.jsx",
        content: `"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BoxyBounceLoader = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)} {...props}>
      <style>{\`
        .pl2-container {
          --hue: 223;
          --bg: hsl(var(--hue), 90%, 90%);
          --fg: hsl(var(--hue), 90%, 10%);
          --primary: hsl(var(--hue), 90%, 50%);
          --trans-dur: 0.3s;
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
      \`}</style>
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
          <g fill="hsl(223, 90%, 50%)">
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="0" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="44" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="88" y="128" width="40" height="24" transform="rotate(180)" /></g>
          </g>
          <g fill="hsl(283,90%,50%)" mask="url(#pl-mask)">
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="0" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="44" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="88" y="128" width="40" height="24" transform="rotate(180)" /></g>
          </g>
        </svg>
      </div>
    </div>
  );
};`,
      },
    ],
  },
  "boxy-shift": {
    name: "Boxy Loader",
    type: "components:ui",
    files: [
      {
        name: "boxy-shift-loader.jsx",
        content: `"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BoxyShiftLoader = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)} {...props}>
      <style>{\`
        .pl3-container {
          --hue: 223;
          --bg: hsl(var(--hue), 90%, 90%);
          --fg: hsl(var(--hue), 90%, 10%);
          --primary: hsl(var(--hue), 90%, 50%);
          --trans-dur: 0.3s;
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
      \`}</style>
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
          <g fill="hsl(223, 90%, 50%)">
            <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)" />
            <g className="pl3__rect-g" transform="scale(-1,-1)">
              <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)" />
            </g>
          </g>
          <g fill="hsl(163,90%,50%)" mask="url(#pl-mask)">
            <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)" />
            <g className="pl3__rect-g" transform="scale(-1,-1)">
              <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};`,
      },
    ],
  },
  "text-system": {
    name: "Typography System",
    type: "components:ui",
    files: [
      {
        name: "typography.jsx",
        content: `"use client";
import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Heading Component
 * Best practices: Semantic level (h1-h6) should match visual weight by default but can be decoupled.
 */
const headingVariants = cva(
  "font-bold tracking-tight text-foreground",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-extrabold lg:text-5xl",
        h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold",
        h4: "scroll-m-20 text-xl font-semibold",
        h5: "text-lg font-semibold",
        h6: "text-base font-semibold",
      },
    },
    defaultVariants: {
      variant: "h1",
    },
  }
);

export const Heading = ({ className, variant, as: Tag = "h1", ...props }) => {
  return (
    <Tag
      className={cn(headingVariants({ variant, className }))}
      {...props}
    />
  );
};

/**
 * Text Component
 * Best practices: Use for body text, leads, and muted descriptions.
 */
const textVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        default: "leading-7 [&:not(:first-child)]:mt-6",
        lead: "text-xl text-muted-foreground",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-muted-foreground",
        blockquote: "mt-6 border-l-2 pl-6 italic",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Text = ({ className, variant, as: Tag = "p", ...props }) => {
  return (
    <Tag
      className={cn(textVariants({ variant, className }))}
      {...props}
    />
  );
};

/**
 * Label Component
 * Best practices: For form labels, tags, or small UI indicators.
 */
export const Label = ({ className, as: Tag = "label", ...props }) => {
  return (
    <Tag
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
};

/**
 * Code Component
 * Best practices: For inline code snippets or technical references.
 */
export const Code = ({ className, ...props }) => {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    />
  );
};"`,
      },
    ],
  },
  "infinite-slider": {
    name: "Infinite Carousel Slider",
    type: "components:ui",
    files: [
      {
        name: "carousel-slider.jsx",
        content: `"use client";
import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export const CarouselSlider = ({ 
  slides = [], 
  className, 
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  pauseOnHover = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length || isPaused) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval, isPaused, nextSlide]);

  if (!slides.length) return null;

  return (
    <div 
      className={cn(
        "group relative w-full max-w-4xl mx-auto h-[450px] overflow-hidden rounded-2xl bg-black shadow-2xl", 
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id || idx}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center",
            currentIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
          style={{ backgroundImage: \\\`linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%), url("\\\${slide.image}")\\\` }}
        >
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <div className={cn(
              "flex flex-col gap-3 transition-all duration-700 delay-300",
              currentIndex === idx ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <span className={cn(
                "inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                slide.tagBg || "bg-blue-600"
              )}>
                {slide.tag}
              </span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight max-w-2xl italic">
                {slide.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-white/70 font-medium">
                <MapPin size={16} className="text-white/50" />
                {slide.location}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Pagination */}
      {showDots && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-1.5 transition-all duration-300 rounded-full",
                currentIndex === idx ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      )}

      {/* Progress Bar (optional visual flair) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
         <div 
           key={currentIndex}
           className="h-full bg-white/50 animate-progress"
           style={{ animationDuration: \\\`\\\${autoPlayInterval}ms\\\` }}
         />
      </div>

      <style>{\`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation-name: progress;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      \`}</style>
    </div>
  );
};"`,
      },
    ],
  },
  menu: {
    name: "NavMenu",
    type: "components:ui",
    files: [
      {
        name: "nav-menu.jsx",
        content: `"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const NavMenu = ({ items = [], className }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const defaultItems = [
    { title: "Cat", icon: "🐱" },
    { title: "Cookie", icon: "🍪" },
    { title: "Bird", icon: "🐦" },
    { title: "Fly", icon: "🪰" },
    { title: "Gem", icon: "💎" },
    { title: "Cheers", icon: "🍻" },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <div className={cn("relative flex flex-col items-center justify-center min-h-[300px] w-full", className)}>
      <style>{\`
        .circular-nav {
          position: relative;
          width: 250px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .nav-toggler {
          position: absolute;
          width: 40px;
          height: 5px;
          border-radius: 2.5px;
          background: rgba(230, 239, 250, 0.9);
          cursor: pointer;
          z-index: 10;
          transition: background 0.5s, transform 0.5s;
        }
        .nav-toggler::before,
        .nav-toggler::after {
          content: "";
          position: absolute;
          width: 40px;
          height: 5px;
          border-radius: 2.5px;
          background: rgba(230, 239, 250, 0.9);
          transition: transform 0.5s, top 0.5s;
        }
        .nav-toggler::before { top: 10px; }
        .nav-toggler::after { top: -10px; }

        .toggler-wrapper {
          position: absolute;
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 20;
        }

        .circular-nav.open .nav-toggler { background: transparent; }
        .circular-nav.open .nav-toggler::before { transform: rotate(45deg); top: 0; }
        .circular-nav.open .nav-toggler::after { transform: rotate(-45deg); top: 0; }
        
        .circ-item {
          position: absolute;
          width: 60px;
          height: 60px;
          background: rgba(230, 230, 250, 0.7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          opacity: 0;
          transition: transform 0.5s ease, opacity 0.5s ease;
          pointer-events: none;
          cursor: pointer;
        }
        .circular-nav.open .circ-item { opacity: 1; pointer-events: auto; }
        .circular-nav.open .circ-item:nth-child(2) { transform: rotate(0deg) translate(-100px) rotate(0deg); }
        .circular-nav.open .circ-item:nth-child(3) { transform: rotate(60deg) translate(-100px) rotate(60deg); }
        .circular-nav.open .circ-item:nth-child(4) { transform: rotate(120deg) translate(-100px) rotate(120deg); }
        .circular-nav.open .circ-item:nth-child(5) { transform: rotate(180deg) translate(-100px) rotate(180deg); }
        .circular-nav.open .circ-item:nth-child(6) { transform: rotate(240deg) translate(-100px) rotate(240deg); }
        .circular-nav.open .circ-item:nth-child(7) { transform: rotate(300deg) translate(-100px) rotate(300deg); }
        
        .circ-item:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      \`}</style>
      <div className={cn("circular-nav", menuOpen && "open")}>
        <div className="toggler-wrapper" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="nav-toggler"></div>
        </div>
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="circ-item"
            title={item.title}
            onClick={() => {
              setMenuOpen(false);
              if (item.onClick) item.onClick();
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};`,
      },
    ],
  },
  "error-page": {
    name: "Error Page",
    type: "components:ui",
    files: [
      {
        name: "error-page.jsx",
        content: `"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const ErrorPage = ({ className, errorCode = "404", errorText = "ERROR" }) => {
  return (
    <div className={cn("text-center max-w-md", className)}>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
        .error-neon-container {
          font-family: 'Monoton', cursive;
          text-align: center;
          text-transform: uppercase;
          font-size: 60px;
          color: red;
          text-shadow: 0 0 80px red, 0 0 30px FireBrick, 0 0 6px DarkRed;
          line-height: 1;
          cursor: pointer;
        }
        .error-neon-container p { margin: 10px; }
        .neon-error {
          color: #fff;
          text-shadow: 0 0 80px #ffffff, 0 0 30px #008000, 0 0 6px #0000ff;
        }
        .neon-error span { animation: upper 6s linear infinite; }
        .neon-code span:nth-of-type(2) { animation: lower 9s linear infinite; }
        .neon-code span:nth-of-type(1) { text-shadow: none; opacity: 0.4; }
        .error-neon-container:hover .neon-error {
          text-shadow: 0 0 200px #ffffff, 0 0 80px #008000, 0 0 6px #0000ff;
        }
        .error-neon-container:hover .neon-code {
          text-shadow: 0 0 100px red, 0 0 40px FireBrick, 0 0 8px DarkRed;
        }
        @keyframes upper {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 0.99;
            text-shadow: 0 0 80px #ffffff, 0 0 30px #008000, 0 0 6px #0000ff;
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.4; text-shadow: none; }
        }
        @keyframes lower {
          0%, 12%, 18.999%, 23%, 31.999%, 37%, 44.999%, 46%, 49.999%, 51%, 58.999%, 61%, 68.999%, 71%, 85.999%, 96%, 100% {
            opacity: 0.99;
            text-shadow: 0 0 80px red, 0 0 30px FireBrick, 0 0 6px DarkRed;
          }
          19%, 22.99%, 32%, 36.999%, 45%, 45.999%, 50%, 50.99%, 59%, 60.999%, 69%, 70.999%, 86%, 95.999% { opacity: 0.4; text-shadow: none; }
        }
      \`}</style>
      <div className="error-neon-container">
        <p className="neon-error">
          {errorText.split("").map((char, i) => (
            <React.Fragment key={i}>
              {i === 1 ? <span>{char}</span> : char}
            </React.Fragment>
          ))}
        </p>
        <p className="neon-code">
          {errorCode.split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </p>
      </div>
    </div>
  );
};`,
      },
    ],
  },
  "expanding-card": {
    name: "Expanding Flex Card",
    type: "components:ui",
    files: [
      {
        name: "expanding-flex-card.jsx",
        content: `"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const ExpandingFlexCard = ({ options = [], className }) => {
  const [activeOption, setActiveOption] = useState(options[0]?.id);

  if (!options.length) return null;

  // Limit to 8 cards
  const displayOptions = options.slice(0, 8);

  return (
    <div className={cn("flex gap-3 w-full max-w-4xl h-[400px] overflow-hidden px-4 py-8 items-center justify-center", className)}>
      <style>{\`
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
          border-radius: 100px;
        }
        .expanding-card.open {
          flex: 4;
          border-radius: 24px;
        }
        .card-content {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease 0.2s;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          padding: 12px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          pointer-events: none;
        }
        .expanding-card.open .card-content {
          opacity: 1;
          transform: translateY(0);
        }
        .card-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 20px;
        }
        .card-info {
          display: flex;
          flex-col;
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
        
        /* Icon visibility for closed state */
        .closed-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .expanding-card.open .closed-icon {
          opacity: 0;
        }
      \`}</style>
      {displayOptions.map((opt) => (
        <div
          key={opt.id}
          onClick={() => setActiveOption(opt.id)}
          className={cn(
            "expanding-card",
            activeOption === opt.id ? "open" : "closed"
          )}
          style={{ backgroundImage: \\\`linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("\\\${opt.img}")\\\` }}
        >
          <div className="closed-icon">{opt.icon}</div>
          
          <div className="card-content">
            <div className="card-icon-wrapper">
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
  );
};`,
      },
    ],
  },
  basic: {
    name: "Basic Loader",
    type: "components:ui",
    files: [
      {
        name: "basic-loader.jsx",
        content: `"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BasicLoader = ({ className, text = "Loading, please wait...", ...props }) => {
  return (
    <div className={cn("flex flex-col justify-center items-center gap-4", className)} {...props}>
      <style>{\`
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 6px solid #ccc;
          border-top-color: #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      \`}</style>
      <div className="loading-spinner"></div>
      {text && <p className="text-base text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );
};`,
      },
    ],
  },
};
