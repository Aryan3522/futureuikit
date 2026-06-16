"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BrowserWindow } from "@/components/ui/browser-window";
import { cn } from "@/lib/utils";

export interface PreviewContainerProps {
  title: string;
  description?: string;
  variants?: readonly string[];
  activeVariant?: string;
  onVariantChange?: (variant: any) => void;
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

  const controls = ((variants && variants.length > 0) || extraControls) && (
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
          align === "center" ? "items-center" : "items-start",
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
            <div
              className={cn(
                "w-full h-full flex flex-col relative",
                align === "center"
                  ? "items-center justify-center"
                  : "items-start justify-start"
              )}
            >
              {children}
            </div>
          </BrowserWindow>
        ) : (
          <div
            className={cn(
              "w-full h-full flex flex-col relative",
              align === "center"
                ? "items-center justify-center"
                : "items-start justify-start"
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewContainer;