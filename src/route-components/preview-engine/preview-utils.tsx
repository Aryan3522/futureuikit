"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const headingVariants = cva(
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

export const textVariants = cva("text-foreground", {
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
});

interface HeadingProps {
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

export function Heading({
  className,
  variant = "h1",
  children,
}: HeadingProps) {
  const classes = cn(
    headingVariants({ variant }),
    className
  );

  switch (variant) {
    case "h1":
      return <h1 className={classes}>{children}</h1>;

    case "h2":
      return <h2 className={classes}>{children}</h2>;

    case "h3":
      return <h3 className={classes}>{children}</h3>;

    case "h4":
      return <h4 className={classes}>{children}</h4>;

    case "h5":
      return <h5 className={classes}>{children}</h5>;

    case "h6":
      return <h6 className={classes}>{children}</h6>;

    default:
      return <h1 className={classes}>{children}</h1>;
  }
}

interface TextProps {
  className?: string;
  variant?:
    | "default"
    | "lead"
    | "large"
    | "small"
    | "muted"
    | "blockquote";
  children: React.ReactNode;
}

export function Text({
  className,
  variant = "default",
  children,
}: TextProps) {
  if (variant === "blockquote") {
    return (
      <blockquote
        className={cn(
          textVariants({ variant }),
          className
        )}
      >
        {children}
      </blockquote>
    );
  }

  return (
    <p
      className={cn(
        textVariants({ variant }),
        className
      )}
    >
      {children}
    </p>
  );
}

interface LabelProps {
  className?: string;
  children: React.ReactNode;
}

export function Label({
  className,
  children,
}: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
    >
      {children}
    </label>
  );
}

interface CodeProps {
  className?: string;
  children: React.ReactNode;
}

export function Code({
  className,
  children,
}: CodeProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
    >
      {children}
    </code>
  );
}