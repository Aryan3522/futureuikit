/**
 * @registry-slug breadcrumb
 * @registry-name Breadcrumb
 * @registry-description A standalone breadcrumb trail with separators, colors, and collapse support.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency lucide-react
 * @registry-is-new
 */

import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type BreadcrumbColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const activeColorMap: Record<BreadcrumbColor, string> = {
  default: "text-foreground",
  blue: "text-blue-600 dark:text-blue-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  rose: "text-rose-600 dark:text-rose-400",
  amber: "text-amber-600 dark:text-amber-400",
  violet: "text-violet-600 dark:text-violet-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  sky: "text-sky-600 dark:text-sky-400",
  slate: "text-slate-600 dark:text-slate-400",
  orange: "text-orange-600 dark:text-orange-400",
};

const breadcrumbVariants = cva("flex flex-wrap items-center break-words text-muted-foreground", {
  variants: {
    size: {
      sm: "gap-1 text-xs",
      md: "gap-1.5 text-sm",
      lg: "gap-2 text-base",
    },
  },
  defaultVariants: { size: "md" },
});

interface BreadcrumbContextValue {
  color: BreadcrumbColor;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({ color: "default" });

export interface BreadcrumbProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof breadcrumbVariants> {
  color?: BreadcrumbColor;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, size, color = "default", children, ...props }, ref) => (
    <BreadcrumbContext.Provider value={{ color }}>
      <nav ref={ref} aria-label="Breadcrumb" {...props}>
        <ol className={cn(breadcrumbVariants({ size }), className)}>{children}</ol>
      </nav>
    </BreadcrumbContext.Provider>
  )
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render as a child component (e.g. next/link) instead of an anchor. */
  asChild?: boolean;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const classes = cn("transition-colors duration-200 hover:text-foreground", className);
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(classes, (children as React.ReactElement<{ className?: string }>).props.className),
      });
    }
    return (
      <a ref={ref} className={classes} {...props}>
        {children}
      </a>
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    const { color } = React.useContext(BreadcrumbContext);
    return (
      <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("font-medium", activeColorMap[color], className)}
        {...props}
      />
    );
  }
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ className, children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5 opacity-60", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-6 w-6 items-center justify-center [&>svg]:size-4", className)}
    {...props}
  >
    <MoreHorizontal />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
