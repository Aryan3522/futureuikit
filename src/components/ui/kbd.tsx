/**
 * @registry-slug kbd
 * @registry-name Kbd
 * @registry-description A keyboard-key chip for shortcuts, with sizes and key-combo grouping.
 * @registry-category utility
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-is-new
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kbdVariants = cva(
  "inline-flex select-none items-center justify-center rounded-md border border-border bg-muted/60 font-mono font-semibold text-muted-foreground shadow-[inset_0_-1px_0_rgba(0,0,0,0.15)] dark:shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]",
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 px-1 text-[10px]",
        md: "h-6 min-w-6 px-1.5 text-xs",
        lg: "h-7 min-w-7 px-2 text-sm",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ className, size, ...props }, ref) => (
  <kbd ref={ref} className={cn(kbdVariants({ size }), className)} {...props} />
));
Kbd.displayName = "Kbd";

export interface KbdGroupProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Keys of the combo, e.g. ["⌘", "K"]. */
  keys: string[];
  size?: KbdProps["size"];
  separator?: React.ReactNode;
}

const KbdGroup = ({ className, keys, size = "md", separator = "+", ...props }: KbdGroupProps) => (
  <span className={cn("inline-flex items-center gap-1", className)} {...props}>
    {keys.map((key, i) => (
      <React.Fragment key={`${key}-${i}`}>
        {i > 0 && <span className="text-[10px] text-muted-foreground/60">{separator}</span>}
        <Kbd size={size}>{key}</Kbd>
      </React.Fragment>
    ))}
  </span>
);

export { Kbd, KbdGroup, kbdVariants };
