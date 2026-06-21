"use client"

/**
 * @registry-slug hover-card
 * @registry-name Hover Card
 * @registry-description A standard Hover Card component.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

export type HoverCardColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type HoverCardShape = "default" | "square" | "rounded" | "sharp";
export type HoverCardSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface HoverCardContextValue {
  color: HoverCardColor;
  shape: HoverCardShape;
  spacing: HoverCardSpacing;
}

const HoverCardContext = React.createContext<HoverCardContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface HoverCardProps extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> {
  color?: HoverCardColor;
  shape?: HoverCardShape;
  spacing?: HoverCardSpacing;
}

const HoverCard: React.FC<HoverCardProps> = ({ color = "default", shape = "default", spacing = "default", children, ...props }) => {
  return (
    <HoverCardContext.Provider value={{ color, shape, spacing }}>
      <HoverCardPrimitive.Root {...props}>{children}</HoverCardPrimitive.Root>
    </HoverCardContext.Provider>
  );
};

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
  const { shape, spacing } = React.useContext(HoverCardContext);

  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 border border-border bg-background text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
        shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
        spacing === "2x" ? "p-2" : spacing === "6x" || spacing === "8x" ? "p-6" : "p-4",
        className
      )}
      {...props}
    />
  )
})
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
