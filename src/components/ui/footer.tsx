/**
 * @registry-slug footer
 * @registry-name Footer
 * @registry-description A minimal, modern footer component with branding, navigation links, and external social links.
 * @registry-category ui
 * @registry-dependency next/link
 */
"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type FooterColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type FooterShape = "default" | "square" | "rounded" | "sharp";
export type FooterSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  color?: FooterColor;
  shape?: FooterShape;
  spacing?: FooterSpacing;
}

const colorThemeMap: Record<FooterColor, { hoverText: string; text: string }> = {
  default: { hoverText: "hover:text-foreground", text: "text-foreground" },
  blue: { hoverText: "hover:text-blue-600 dark:hover:text-blue-500", text: "text-blue-600 dark:text-blue-500" },
  emerald: { hoverText: "hover:text-emerald-600 dark:hover:text-emerald-500", text: "text-emerald-600 dark:text-emerald-500" },
  rose: { hoverText: "hover:text-rose-600 dark:hover:text-rose-500", text: "text-rose-600 dark:text-rose-500" },
  amber: { hoverText: "hover:text-amber-600 dark:hover:text-amber-500", text: "text-amber-600 dark:text-amber-500" },
  violet: { hoverText: "hover:text-violet-600 dark:hover:text-violet-500", text: "text-violet-600 dark:text-violet-500" },
  indigo: { hoverText: "hover:text-indigo-600 dark:hover:text-indigo-500", text: "text-indigo-600 dark:text-indigo-500" },
  sky: { hoverText: "hover:text-sky-600 dark:hover:text-sky-500", text: "text-sky-600 dark:text-sky-500" },
  slate: { hoverText: "hover:text-slate-600 dark:hover:text-slate-400", text: "text-slate-600 dark:text-slate-400" },
  orange: { hoverText: "hover:text-orange-600 dark:hover:text-orange-500", text: "text-orange-600 dark:text-orange-500" },
};

const getShapeClass = (shape: FooterShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-t-md";
    case "rounded": return "rounded-t-xl";
    case "default": return "rounded-none"; // Footers are typically full bleed
  }
};

const getSpacingClass = (spacing: FooterSpacing) => {
  switch (spacing) {
    case "2x": return "py-4 px-4 gap-2";
    case "4x": return "py-8 px-6 gap-4";
    case "6x": return "py-12 px-6 gap-6";
    case "8x": return "py-16 px-8 gap-8";
    default: return "py-12 px-6 gap-6";
  }
};

export const Footer = React.memo(React.forwardRef<HTMLElement, FooterProps>(
  ({ className, color = "default", shape = "default", spacing = "default", ...props }, ref) => {
    const activeTheme = colorThemeMap[color];
    const shapeClass = getShapeClass(shape);
    const spacingClass = getSpacingClass(spacing);

    return (
      <footer ref={ref} className={cn("w-full border-t border-white/5 bg-background relative z-10 mt-auto", shapeClass, className)} {...props}>
        <div className={cn("max-w-350 mx-auto flex flex-col md:flex-row justify-between items-center", spacingClass)}>
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className={cn("font-display text-xl font-bold tracking-tighter", activeTheme.text)}>FUTURE_UI</span>
            <span className="font-mono text-[13px] text-muted-foreground/60">© {new Date().getFullYear()} FUTURE UI. PRECISION ENGINEERED.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link className={cn("font-mono text-[13px] text-muted-foreground transition-colors opacity-80 hover:opacity-100", activeTheme.hoverText)} href="/privacy">Privacy</Link>
            <Link className={cn("font-mono text-[13px] text-muted-foreground transition-colors opacity-80 hover:opacity-100", activeTheme.hoverText)} href="/terms">Terms</Link>
            <a className={cn("font-mono text-[13px] text-muted-foreground transition-colors opacity-80 hover:opacity-100", activeTheme.hoverText)} href="https://github.com/Aryan3522/future-ui" target="_blank" rel="noopener noreferrer">Github</a>
            <a className={cn("font-mono text-[13px] text-muted-foreground transition-colors opacity-80 hover:opacity-100", activeTheme.hoverText)} href="#">Discord</a>
          </div>
        </div>
      </footer>
    );
  }
));

Footer.displayName = "Footer";
