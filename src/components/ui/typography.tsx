/**
 * @registry-slug text-system
 * @registry-name Typography System
 * @registry-dependency class-variance-authority
 */
"use client";
import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "font-bold tracking-tight text-foreground",
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
  "text-foreground",
  {
    variants: {
      variant: {
        default: "leading-7 [&:not(:first-child)]:mt-6",
        lead: "text-xl text-muted-foreground",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-muted-foreground",
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
}

export const Heading: React.FC<HeadingProps> = React.memo(({ className, variant, as: Tag = "h1", ...props }) => {
          return (
            <Tag
              className={cn(headingVariants({ variant, className }))}
              {...props}
            />
          );
        });
Heading.displayName = "Heading";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "lead" | "large" | "small" | "muted" | "blockquote";
  as?: any;
}

export const Text: React.FC<TextProps> = React.memo(({ className, variant, as: Tag = "p", ...props }) => {
          return (
            <Tag
              className={cn(textVariants({ variant, className }))}
              {...props}
            />
          );
        });
Text.displayName = "Text";

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = React.memo(({ className, ...props }) => (
          <label
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              className
            )}
            {...props}
          />
        ));
Label.displayName = "Label";

export const Code: React.FC<React.HTMLAttributes<HTMLElement>> = React.memo(({ className, ...props }) => (
          <code
            className={cn(
              "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
              className
            )}
            {...props}
          />
        ));
Code.displayName = "Code";
