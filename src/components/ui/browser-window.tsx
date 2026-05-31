"use client";

/**
 * @registry-slug browser-window
 * @registry-name Browser Window
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BrowserWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  contentClassName?: string;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

export const BrowserWindow = React.memo(React.forwardRef<HTMLDivElement, BrowserWindowProps>(
          ({ className, contentClassName, children, scrollRef, ...props }, ref) => {
            return (
              <div 
                ref={ref}
                className={cn(
                  "w-full h-full relative flex flex-col shadow-sm rounded-2xl overflow-hidden bg-background border border-border/40", 
                  className
                )} 
                {...props}
              >
                {/* Mock Window Header */}
                <div className="w-full h-10 shrink-0 bg-muted border-b border-border/40 flex items-center px-4 gap-1.5 z-50">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                
                {/* Canvas */}
                <div 
                  ref={scrollRef} 
                  className={cn("relative flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar p-1", contentClassName)}
                >
                  <div className="w-full min-h-full flex flex-col items-center justify-center">
                    {children}
                  </div>
                </div>
              </div>
            );
          }
        ));
BrowserWindow.displayName = "BrowserWindow";
