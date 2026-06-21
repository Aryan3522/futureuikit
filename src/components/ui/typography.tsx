/**
 * @registry-slug text-system
 * @registry-name Typography System
 * @registry-description A Future UI Typography System component.
 * @registry-category ui
 * @registry-dependency class-variance-authority
 */
"use client";
import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type TypographyColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type TypographyShape = "default" | "square" | "rounded" | "sharp";
export type TypographySpacing = "default" | "2x" | "4x" | "6x" | "8x";

const colorThemeMap: Record<TypographyColor, string> = {
  default: "text-foreground",
  blue: "text-blue-600 dark:text-blue-500",
  emerald: "text-emerald-600 dark:text-emerald-500",
  rose: "text-rose-600 dark:text-rose-500",
  amber: "text-amber-600 dark:text-amber-500",
  violet: "text-violet-600 dark:text-violet-500",
  indigo: "text-indigo-600 dark:text-indigo-500",
  sky: "text-sky-600 dark:text-sky-500",
  slate: "text-slate-600 dark:text-slate-500",
  orange: "text-orange-600 dark:text-orange-500",
};

const getShapeClass = (shape: TypographyShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-md";
    case "default": return "rounded";
  }
};

const getSpacingClass = (spacing: TypographySpacing, baseClass: string) => {
  // We just pass through spacing for manual overrides, or use it for margin-bottom
  switch (spacing) {
    case "2x": return "mb-2";
    case "4x": return "mb-4";
    case "6x": return "mb-6";
    case "8x": return "mb-8";
    default: return "";
  }
};

const headingVariants = cva(
  "font-bold tracking-tight",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-extrabold lg:text-5xl",
        h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold",
        h4: "scroll-m-20 text-xl font-semibold",
        h5: "text-lg font-semibold",
        h6: "text-base font-semibold",
      },
    },
    defaultVariants: {
      variant: "h1",
    },
  }
);

const textVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "leading-7 [&:not(:first-child)]:mt-6",
        lead: "text-xl",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm",
        blockquote: "mt-6 border-l-2 pl-6 italic",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  as?: any;
  color?: TypographyColor;
  spacing?: TypographySpacing;
}

export const Heading: React.FC<HeadingProps> = React.memo(({ 
  className, 
  variant, 
  as: Tag = "h1", 
  color = "default",
  spacing = "default",
  ...props 
}) => {
  const activeTheme = colorThemeMap[color];
  const spacingClass = getSpacingClass(spacing, "");
  return (
    <Tag
      className={cn(headingVariants({ variant }), activeTheme, spacingClass, className)}
      {...props}
    />
  );
});
Heading.displayName = "Heading";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "lead" | "large" | "small" | "muted" | "blockquote";
  as?: any;
  color?: TypographyColor;
  spacing?: TypographySpacing;
}

export const Text: React.FC<TextProps> = React.memo(({ 
  className, 
  variant, 
  as: Tag = "p", 
  color = "default",
  spacing = "default",
  ...props 
}) => {
  const isMuted = variant === "muted" || variant === "lead";
  const activeTheme = color === "default" && isMuted ? "text-muted-foreground" : colorThemeMap[color];
  const spacingClass = getSpacingClass(spacing, "");
  return (
    <Tag
      className={cn(textVariants({ variant }), activeTheme, spacingClass, className)}
      {...props}
    />
  );
});
Text.displayName = "Text";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  color?: TypographyColor;
  spacing?: TypographySpacing;
}

export const Label: React.FC<LabelProps> = React.memo(({ 
  className, 
  color = "default",
  spacing = "default",
  ...props 
}) => {
  const activeTheme = colorThemeMap[color];
  const spacingClass = getSpacingClass(spacing, "");
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        activeTheme,
        spacingClass,
        className
      )}
      {...props}
    />
  );
});
Label.displayName = "Label";

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  color?: TypographyColor;
  shape?: TypographyShape;
  spacing?: TypographySpacing;
}

export const Code: React.FC<CodeProps> = React.memo(({ 
  className, 
  color = "default",
  shape = "default",
  spacing = "default",
  ...props 
}) => {
  const activeTheme = color === "default" ? "text-foreground" : colorThemeMap[color];
  const shapeClass = getShapeClass(shape);
  const spacingClass = getSpacingClass(spacing, "");
  return (
    <code
      className={cn(
        "relative bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        shapeClass,
        activeTheme,
        spacingClass,
        className
      )}
      {...props}
    />
  );
});
Code.displayName = "Code";
