/**
 * @registry-slug global-breadcrumb
 * @registry-name Global Breadcrumb
 * @registry-description A dynamic breadcrumb navigation component that generates navigation paths based on the current route, category, and component hierarchy.
 * @registry-category ui
 * @registry-dependency @radix-ui/react-slot
 * @registry-dependency lucide-react
 * @registry-dependency next/navigation
 * @registry-dependency next/link
 */
"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { componentsList } from "@/data/component-library-data";
import { getCategoryUrl, cn } from "@/lib/utils";

export type BreadcrumbColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type BreadcrumbShape = "default" | "square" | "rounded" | "sharp";
export type BreadcrumbSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface BreadcrumbContextValue {
  color: BreadcrumbColor;
  shape: BreadcrumbShape;
  spacing: BreadcrumbSpacing;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode;
  color?: BreadcrumbColor;
  shape?: BreadcrumbShape;
  spacing?: BreadcrumbSpacing;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ color = "default", shape = "default", spacing = "default", separator, ...props }, ref) => (
    <BreadcrumbContext.Provider value={{ color, shape, spacing }}>
      <nav ref={ref} aria-label="breadcrumb" {...props} />
    </BreadcrumbContext.Provider>
  )
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => {
  const { spacing } = React.useContext(BreadcrumbContext);
  return (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center break-words text-muted-foreground",
        spacing === "2x" ? "gap-1 text-xs" : spacing === "6x" || spacing === "8x" ? "gap-3 text-base" : "gap-1.5 sm:gap-2.5 text-sm",
        className
      )}
      {...props}
    />
  )
})
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => {
  const { spacing } = React.useContext(BreadcrumbContext);
  return (
    <li
      ref={ref}
      className={cn(
        "inline-flex items-center",
        spacing === "2x" ? "gap-0.5" : spacing === "6x" || spacing === "8x" ? "gap-2" : "gap-1.5",
        className
      )}
      {...props}
    />
  )
})
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const { color, shape } = React.useContext(BreadcrumbContext);
  const Comp = asChild ? Slot : "a"

  const getColorClasses = () => {
    switch (color) {
      case "blue": return "hover:text-blue-600 dark:hover:text-blue-500 focus-visible:ring-blue-600";
      case "emerald": return "hover:text-emerald-500 focus-visible:ring-emerald-500";
      case "rose": return "hover:text-rose-500 focus-visible:ring-rose-500";
      case "amber": return "hover:text-amber-500 focus-visible:ring-amber-500";
      case "violet": return "hover:text-violet-600 dark:hover:text-violet-500 focus-visible:ring-violet-600";
      case "indigo": return "hover:text-indigo-600 dark:hover:text-indigo-500 focus-visible:ring-indigo-600";
      case "sky": return "hover:text-sky-500 focus-visible:ring-sky-500";
      case "slate": return "hover:text-slate-600 dark:hover:text-slate-500 focus-visible:ring-slate-600";
      case "orange": return "hover:text-orange-500 focus-visible:ring-orange-500";
      default: return "hover:text-foreground focus-visible:ring-ring";
    }
  };

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-sm",
        getColorClasses(),
        className
      )}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => {
  const { color } = React.useContext(BreadcrumbContext);
  
  const getColorClasses = () => {
    switch (color) {
      case "blue": return "text-blue-900 dark:text-blue-100";
      case "emerald": return "text-emerald-900 dark:text-emerald-100";
      case "rose": return "text-rose-900 dark:text-rose-100";
      case "amber": return "text-amber-900 dark:text-amber-100";
      case "violet": return "text-violet-900 dark:text-violet-100";
      case "indigo": return "text-indigo-900 dark:text-indigo-100";
      case "sky": return "text-sky-900 dark:text-sky-100";
      case "slate": return "text-slate-900 dark:text-slate-100";
      case "orange": return "text-orange-900 dark:text-orange-100";
      default: return "text-foreground";
    }
  };

  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal", getColorClasses(), className)}
      {...props}
    />
  )
})
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => {
  const { spacing } = React.useContext(BreadcrumbContext);
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn(
        "opacity-50",
        spacing === "2x" ? "[&>svg]:w-3 [&>svg]:h-3" : spacing === "6x" || spacing === "8x" ? "[&>svg]:w-4 [&>svg]:h-4" : "[&>svg]:w-3.5 [&>svg]:h-3.5",
        className
      )}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  const { spacing } = React.useContext(BreadcrumbContext);
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center",
        spacing === "2x" ? "h-6 w-6" : spacing === "6x" || spacing === "8x" ? "h-10 w-10" : "h-9 w-9",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  )
}
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export interface GlobalBreadcrumbProps {
  color?: BreadcrumbColor;
  shape?: BreadcrumbShape;
  spacing?: BreadcrumbSpacing;
}

function BreadcrumbInner({ color, shape, spacing }: GlobalBreadcrumbProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!pathname.startsWith("/docs") && !pathname.startsWith("/components")) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const crumbs: React.ReactNode[] = [];

  crumbs.push(
    <BreadcrumbItem key="docs-item">
      <BreadcrumbLink asChild>
        <Link href="/docs">Docs</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );

  if (segments[0] === "components") {
    crumbs.push(
      <BreadcrumbSeparator key="sep-1" />
    );
    crumbs.push(
      <BreadcrumbItem key="components-item">
        <BreadcrumbLink asChild>
          <Link href="/components">Components</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    );

    if (segments.length >= 3) {
      const slug = segments[2];
      const component = componentsList.find(c => c.slug === slug);
      
      const exactCategory = component ? component.type : segments[1];

      crumbs.push(
        <BreadcrumbSeparator key="sep-2" />
      );
      crumbs.push(
        <BreadcrumbItem key="category-item">
          <BreadcrumbLink asChild>
            <Link href={getCategoryUrl(exactCategory)} className="capitalize">
              {exactCategory}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
      
      crumbs.push(
        <BreadcrumbSeparator key="sep-3" />
      );
      crumbs.push(
        <BreadcrumbItem key="name-item">
          <BreadcrumbPage>
            {component ? component.title : slug.replace(/-/g, " ")}
          </BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      const categoryParam = searchParams.get("category");
      if (categoryParam) {
        crumbs.push(
          <BreadcrumbSeparator key="sep-cat-param" />
        );
        crumbs.push(
          <BreadcrumbItem key="cat-param-item">
            <BreadcrumbPage className="capitalize">{categoryParam}</BreadcrumbPage>
          </BreadcrumbItem>
        );
      }
    }
  }

  return (
    <Breadcrumb className="mb-8 overflow-x-auto scrollbar-hide" color={color} shape={shape} spacing={spacing}>
      <BreadcrumbList className="flex-nowrap whitespace-nowrap">
        {crumbs}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function GlobalBreadcrumb(props: GlobalBreadcrumbProps) {
  return (
    <Suspense fallback={null}>
      <BreadcrumbInner {...props} />
    </Suspense>
  );
}
