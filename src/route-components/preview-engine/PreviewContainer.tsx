"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BrowserWindow } from "@/components/ui/browser-window";
import { cn } from "@/lib/utils";

export const DEFAULT_COLORS = [
  { name: "default", class: "bg-black dark:bg-white" },
  { name: "blue", class: "bg-blue-500" },
  { name: "emerald", class: "bg-emerald-500" },
  { name: "rose", class: "bg-rose-500" },
  { name: "amber", class: "bg-amber-500" },
  { name: "violet", class: "bg-violet-500" },
  { name: "indigo", class: "bg-indigo-500" },
  { name: "sky", class: "bg-sky-500" },
  { name: "slate", class: "bg-slate-500" },
  { name: "orange", class: "bg-orange-500" },
] as const;

export interface PreviewContainerProps {
  title: string;
  description?: string;
  variants?: readonly string[];
  activeVariant?: string;
  onVariantChange?: (variant: any) => void;
  colors?: readonly { name: string; class: string }[];
  activeColor?: string;
  onColorChange?: (color: any) => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  isVirtualScreen?: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  canvasClassName?: string;
  extraControls?: React.ReactNode;
  align?: "center" | "start";
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({
  title,
  description,
  variants,
  activeVariant,
  onVariantChange,
  colors,
  activeColor,
  onColorChange,
  children,
  className,
  contentClassName,
  isVirtualScreen = true,
  scrollRef,
  canvasClassName,
  extraControls,
  align = "center",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const controls = ((variants && variants.length > 0) || (colors && colors.length > 0) || extraControls) && (
    <div className="flex flex-col gap-6 w-full shrink-0 relative z-10 p-6 bg-transparent">
      {variants && variants.length > 0 && onVariantChange && (
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
            Layout Variant
          </span>

          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => onVariantChange(variant)}
                className={cn(
                  "px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap",
                  activeVariant === variant
                    ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
      )}

      {colors && colors.length > 0 && onColorChange && (
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full mt-2">
          <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
            Color Theme
          </span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => onColorChange(c.name)}
                className={cn(
                  "w-6 h-6 rounded-full transition-all duration-300 relative",
                  c.class,
                  activeColor === c.name
                    ? "ring-2 ring-offset-2 ring-background scale-110"
                    : "opacity-50 hover:opacity-100 hover:scale-105",
                  c.name === "default" && "border border-border bg-foreground"
                )}
                title={c.name}
              />
            ))}
          </div>
        </div>
      )}

      {extraControls && (
        <div className="w-full flex flex-col gap-6">
          {extraControls}
        </div>
      )}
    </div>
  );

  const controlsContainer = typeof document !== "undefined" ? document.getElementById("preview-controls-container") : null;

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col overflow-y-auto bg-background",
        className
      )}
    >
      {/* Portal the controls out if a container exists, otherwise render inline */}
      {controls && mounted && controlsContainer
        ? createPortal(controls, controlsContainer)
        : controls}

      <div
        className={cn(
          "flex justify-center flex-1 w-full relative px-2 sm:px-4 pb-4 sm:pb-8 pt-2 sm:pt-4 overflow-y-auto",
          contentClassName
        )}
      >
        {isVirtualScreen ? (
          <BrowserWindow
            title={title}
            className="w-full h-full mx-auto"
            contentClassName={cn("flex flex-col", canvasClassName)}
            scrollRef={scrollRef}
          >
            <div className="w-full h-full flex flex-col relative">
              <div
                className={cn(
                  "w-full flex flex-col",
                  align === "center" ? "flex-1 items-center justify-center" : "items-start justify-start"
                )}
              >
                {children}
              </div>
            </div>
          </BrowserWindow>
        ) : (
          <div className="w-full h-full flex flex-col relative">
            <div
              className={cn(
                "w-full flex flex-col",
                align === "center" ? "flex-1 items-center justify-center" : "items-start justify-start"
              )}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewContainer;