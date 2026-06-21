/**
 * @registry-slug pagination
 * @registry-name Pagination
 * @registry-description A standard Pagination component.
 * @registry-category ui
 * @registry-type components:ui
 */
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

export type PaginationColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type PaginationShape = "default" | "square" | "rounded" | "sharp";
export type PaginationSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface PaginationContextValue {
  color: PaginationColor;
  shape: PaginationShape;
  spacing: PaginationSpacing;
}

const PaginationContext = React.createContext<PaginationContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface PaginationProps extends React.ComponentProps<"nav"> {
  color?: PaginationColor;
  shape?: PaginationShape;
  spacing?: PaginationSpacing;
}

const Pagination = ({ className, color = "default", shape = "default", spacing = "default", ...props }: PaginationProps) => (
  <PaginationContext.Provider value={{ color, shape, spacing }}>
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

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => {
  const { color, shape, spacing } = React.useContext(PaginationContext);
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          color: isActive ? color : "default",
          shape,
          spacing,
        }),
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
  const { spacing } = React.useContext(PaginationContext);
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center text-muted-foreground",
        spacing === "2x" ? "h-6 w-6" : spacing === "6x" || spacing === "8x" ? "h-12 w-12" : "h-9 w-9",
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
