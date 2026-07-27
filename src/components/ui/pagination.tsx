/**
 * @registry-slug pagination
 * @registry-name Pagination
 * @registry-description A standard Pagination component.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-file src/components/ui/button.tsx
 */
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

export type PaginationColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type PaginationShape = "default" | "square" | "rounded" | "sharp";
export type PaginationSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type PaginationVariant = "solid" | "outline" | "ghost" | "link" | "glass" | "neon";
export type PaginationSize = "sm" | "md" | "lg";

interface PaginationContextValue {
  color: PaginationColor;
  shape: PaginationShape;
  spacing: PaginationSpacing;
  variant: PaginationVariant;
  size: PaginationSize;
}

const PaginationContext = React.createContext<PaginationContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
  variant: "outline",
  size: "md",
});

export interface PaginationProps extends React.ComponentProps<"nav"> {
  color?: PaginationColor;
  shape?: PaginationShape;
  spacing?: PaginationSpacing;
  variant?: PaginationVariant;
  size?: PaginationSize;
}

const Pagination = ({ className, color = "default", shape = "default", spacing = "default", variant = "outline", size = "md", ...props }: PaginationProps) => (
  <PaginationContext.Provider value={{ color, shape, spacing, variant, size }}>
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  </PaginationContext.Provider>
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  const { spacing } = React.useContext(PaginationContext);
  return (
    <ul
      ref={ref}
      className={cn(
        "flex flex-row items-center",
        spacing === "2x" ? "gap-0.5" : spacing === "6x" || spacing === "8x" ? "gap-2" : "gap-1",
        className
      )}
      {...props}
    />
  )
})
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<"a">

const glassActiveMap: Record<PaginationColor, string> = {
  default: "bg-black/10 dark:bg-white/10 border-black/20 dark:border-white/20 shadow-xl backdrop-blur-md",
  blue: "bg-blue-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400 shadow-xl backdrop-blur-md",
  emerald: "bg-emerald-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-xl backdrop-blur-md",
  rose: "bg-rose-500/20 border-rose-500/30 text-rose-600 dark:text-rose-400 shadow-xl backdrop-blur-md",
  amber: "bg-amber-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-xl backdrop-blur-md",
  violet: "bg-violet-500/20 border-violet-500/30 text-violet-600 dark:text-violet-400 shadow-xl backdrop-blur-md",
  indigo: "bg-indigo-500/20 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 shadow-xl backdrop-blur-md",
  sky: "bg-sky-500/20 border-sky-500/30 text-sky-600 dark:text-sky-400 shadow-xl backdrop-blur-md",
  slate: "bg-slate-500/20 border-slate-500/30 text-slate-600 dark:text-slate-400 shadow-xl backdrop-blur-md",
  orange: "bg-orange-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400 shadow-xl backdrop-blur-md",
};

const neonActiveMap: Record<PaginationColor, string> = {
  default: "shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
  blue: "shadow-[0_0_15px_rgba(37,99,235,0.6)]",
  emerald: "shadow-[0_0_15px_rgba(16,185,129,0.6)]",
  rose: "shadow-[0_0_15px_rgba(225,29,72,0.6)]",
  amber: "shadow-[0_0_15px_rgba(245,158,11,0.6)]",
  violet: "shadow-[0_0_15px_rgba(124,58,237,0.6)]",
  indigo: "shadow-[0_0_15px_rgba(79,70,229,0.6)]",
  sky: "shadow-[0_0_15px_rgba(2,132,199,0.6)]",
  slate: "shadow-[0_0_15px_rgba(71,85,105,0.6)]",
  orange: "shadow-[0_0_15px_rgba(234,88,12,0.6)]",
};

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => {
  const { color, shape, spacing, variant, size } = React.useContext(PaginationContext);

  let baseVariant: "solid" | "outline" | "ghost" | "link" = "ghost";
  let extraClasses = "";

  if (isActive) {
    if (variant === "solid" || variant === "outline" || variant === "ghost" || variant === "link") {
      baseVariant = variant;
    } else if (variant === "glass") {
      baseVariant = "ghost";
      extraClasses = glassActiveMap[color];
    } else if (variant === "neon") {
      baseVariant = "solid";
      extraClasses = neonActiveMap[color];
    }
  } else {
    baseVariant = "ghost";
    if (variant === "glass") {
      extraClasses = "hover:bg-white/10 dark:hover:bg-white/5 backdrop-blur-sm";
    }
  }

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: baseVariant,
          color: isActive ? color : "default",
          shape,
          spacing,
          size,
        }),
        extraClasses,
        className
      )}
      {...props}
    />
  )
}
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  const { spacing, size } = React.useContext(PaginationContext);
  
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center text-muted-foreground",
        sizeClasses[size] || "h-9 w-9",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
