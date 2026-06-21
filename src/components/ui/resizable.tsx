"use client"

/**
 * @registry-slug resizable
 * @registry-name Resizable
 * @registry-description A standard Resizable component.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

export type ResizableColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ResizableShape = "default" | "square" | "rounded" | "sharp";
export type ResizableSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface ResizableContextValue {
  color: ResizableColor;
  shape: ResizableShape;
  spacing: ResizableSpacing;
}

const ResizableContext = React.createContext<ResizableContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface ResizablePanelGroupProps extends React.ComponentProps<typeof ResizablePrimitive.PanelGroup> {
  color?: ResizableColor;
  shape?: ResizableShape;
  spacing?: ResizableSpacing;
}

const ResizablePanelGroup = ({
  className,
  color = "default",
  shape = "default",
  spacing = "default",
  ...props
}: ResizablePanelGroupProps) => (
  <ResizableContext.Provider value={{ color, shape, spacing }}>
    <ResizablePrimitive.PanelGroup
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col border border-border",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-xl" : "rounded-md",
        className
      )}
      {...props}
    />
  </ResizableContext.Provider>
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => {
  const { color, shape, spacing } = React.useContext(ResizableContext);

  const getFocusClasses = () => {
    switch (color) {
      case "blue": return "focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 bg-blue-100 dark:bg-blue-900";
      case "emerald": return "focus-visible:ring-emerald-500 bg-emerald-100 dark:bg-emerald-900";
      case "rose": return "focus-visible:ring-rose-500 bg-rose-100 dark:bg-rose-900";
      case "amber": return "focus-visible:ring-amber-500 bg-amber-100 dark:bg-amber-900";
      case "violet": return "focus-visible:ring-violet-600 dark:focus-visible:ring-violet-500 bg-violet-100 dark:bg-violet-900";
      case "indigo": return "focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-500 bg-indigo-100 dark:bg-indigo-900";
      case "sky": return "focus-visible:ring-sky-500 bg-sky-100 dark:bg-sky-900";
      case "slate": return "focus-visible:ring-slate-600 dark:focus-visible:ring-slate-500 bg-slate-100 dark:bg-slate-900";
      case "orange": return "focus-visible:ring-orange-500 bg-orange-100 dark:bg-orange-900";
      default: return "focus-visible:ring-ring bg-muted";
    }
  };

  const thickness = spacing === "2x" ? "w-px data-[panel-group-direction=vertical]:h-px" : spacing === "6x" || spacing === "8x" ? "w-1 data-[panel-group-direction=vertical]:h-1" : "w-px data-[panel-group-direction=vertical]:h-px";

  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        "relative flex items-center justify-center bg-muted after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        thickness,
        getFocusClasses().split(' ').filter(c => c.startsWith('focus-visible:')).join(' '),
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className={cn(
          "z-10 flex h-4 w-3 items-center justify-center border border-border",
          shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[1px]" : "rounded-sm",
          getFocusClasses().split(' ').filter(c => c.startsWith('bg-')).join(' ')
        )}>
          <GripVertical className="h-2.5 w-2.5 text-zinc-500" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
