"use client";

import React from "react";
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
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col overflow-y-auto bg-background",
        className
      )}
    >
      {((variants && variants.length > 0) || extraControls) && (
        <div className="flex flex-col gap-3 w-full shrink-0 relative z-10 px-4 py-4 md:px-8 md:py-6 bg-transparent">
          {variants &&
            variants.length > 0 &&
            onVariantChange && (
              <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground">
                  Layout Variant
                </span>

                <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
                  {variants.map((variant) => (
                    <button
                      key={variant}
                      onClick={() =>
                        onVariantChange(variant)
                      }
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap",
                        activeVariant === variant
                          ? "bg-background shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {extraControls && (
            <div className="w-full flex flex-col gap-3">
              {extraControls}
            </div>
          )}
        </div>
      )}

      <div
        className={cn(
          "flex justify-center flex-1 w-full relative px-2 sm:px-4 pb-4 sm:pb-8 pt-2 sm:pt-4 overflow-y-auto",
          align === "center"
            ? "items-center"
            : "items-start",
          contentClassName
        )}
      >
        {isVirtualScreen ? (
          <BrowserWindow
            title={title}
            className="w-full h-full mx-auto"
            contentClassName={cn(
              "flex flex-col",
              canvasClassName
            )}
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