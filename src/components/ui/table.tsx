/**
 * @registry-slug table
 * @registry-name Table
 * @registry-description Clean, composable table primitives with striped, bordered, and hoverable styles.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-is-new
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type TableColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const tableVariants = cva("w-full caption-bottom text-sm", {
  variants: {
    variant: {
      default: "",
      striped: "[&_tbody_tr:nth-child(odd)]:bg-muted/40",
      bordered: "[&_th]:border [&_td]:border [&_th]:border-border/60 [&_td]:border-border/60",
      minimal: "[&_thead_tr]:border-b-0 [&_tbody_tr]:border-b-0",
    },
    size: {
      sm: "[&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2 text-xs",
      md: "[&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3",
      lg: "[&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4 text-base",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

const headerAccentMap: Record<TableColor, string> = {
  default: "",
  blue: "[&_th]:text-blue-600 dark:[&_th]:text-blue-400",
  emerald: "[&_th]:text-emerald-600 dark:[&_th]:text-emerald-400",
  rose: "[&_th]:text-rose-600 dark:[&_th]:text-rose-400",
  amber: "[&_th]:text-amber-600 dark:[&_th]:text-amber-400",
  violet: "[&_th]:text-violet-600 dark:[&_th]:text-violet-400",
  indigo: "[&_th]:text-indigo-600 dark:[&_th]:text-indigo-400",
  sky: "[&_th]:text-sky-600 dark:[&_th]:text-sky-400",
  slate: "[&_th]:text-slate-600 dark:[&_th]:text-slate-400",
  orange: "[&_th]:text-orange-600 dark:[&_th]:text-orange-400",
};

export interface TableProps
  extends Omit<React.TableHTMLAttributes<HTMLTableElement>, "color">,
    VariantProps<typeof tableVariants> {
  color?: TableColor;
  /** Highlight rows on hover. */
  hoverable?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, color = "default", hoverable, ...props }, ref) => (
    <div className="relative w-full overflow-x-auto rounded-xl border border-border/60">
      <table
        ref={ref}
        className={cn(
          tableVariants({ variant, size }),
          headerAccentMap[color],
          hoverable && "[&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-muted/60",
          className
        )}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b [&_tr]:border-border/60 bg-muted/30", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t border-border/60 bg-muted/30 font-medium", className)} {...props} />
  )
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("border-b border-border/60", className)} {...props} />
  )
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn("text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-xs whitespace-nowrap", className)}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("align-middle text-foreground", className)} {...props} />
  )
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-3 text-xs text-muted-foreground", className)} {...props} />
  )
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption };
