/**
 * @registry-slug sidebar-button
 * @registry-name Sidebar Button
 * @registry-description A Future UI Sidebar Button component.
 * @registry-category ui
 * @registry-dependency class-variance-authority
 */
"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type SidebarButtonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type SidebarButtonShape = "default" | "square" | "rounded" | "sharp";
export type SidebarButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type SidebarButtonSize = "default" | "sm" | "md" | "lg" | "xl";
export type SidebarButtonVariant = "solid" | "outline" | "ghost" | "link";

const sidebarButtonVariants = cva(
  "w-full text-left transition-colors relative group flex items-center justify-between outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        outline: "border bg-transparent",
        ghost: "border-transparent bg-transparent",
        link: "border-transparent bg-transparent underline-offset-4 hover:underline",
      },
      color: {
        default: "",
        blue: "",
        emerald: "",
        rose: "",
        amber: "",
        violet: "",
        indigo: "",
        sky: "",
        slate: "",
        orange: "",
      },
      shape: {
        default: "rounded-lg",
        square: "rounded-none",
        rounded: "rounded-xl",
        sharp: "rounded-[2px]",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
      spacing: {
        default: "py-2 px-3",
        "2x": "py-1 px-2",
        "4x": "py-2 px-3",
        "6x": "py-3 px-4",
        "8x": "py-4 px-5",
      },
      isActive: {
        true: "font-bold italic",
        false: "text-muted-foreground hover:bg-accent hover:text-foreground",
      },
    },
    compoundVariants: [
      // SOLID ACTIVE
      { variant: "solid", color: "default", isActive: true, className: "bg-accent text-accent-foreground" },
      { variant: "solid", color: "blue", isActive: true, className: "bg-blue-600 text-white dark:bg-blue-500" },
      { variant: "solid", color: "emerald", isActive: true, className: "bg-emerald-500 text-white dark:bg-emerald-600" },
      { variant: "solid", color: "rose", isActive: true, className: "bg-rose-500 text-white dark:bg-rose-600" },
      { variant: "solid", color: "amber", isActive: true, className: "bg-amber-500 text-white dark:bg-amber-600" },
      { variant: "solid", color: "violet", isActive: true, className: "bg-violet-600 text-white dark:bg-violet-500" },
      { variant: "solid", color: "indigo", isActive: true, className: "bg-indigo-600 text-white dark:bg-indigo-500" },
      { variant: "solid", color: "sky", isActive: true, className: "bg-sky-500 text-white dark:bg-sky-600" },
      { variant: "solid", color: "slate", isActive: true, className: "bg-slate-600 text-white dark:bg-slate-500" },
      { variant: "solid", color: "orange", isActive: true, className: "bg-orange-500 text-white dark:bg-orange-600" },
      
      // OUTLINE ACTIVE
      { variant: "outline", color: "default", isActive: true, className: "border-border bg-accent text-accent-foreground" },
      { variant: "outline", color: "blue", isActive: true, className: "border-blue-600 text-blue-600 bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:bg-blue-950" },
      { variant: "outline", color: "emerald", isActive: true, className: "border-emerald-500 text-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:text-emerald-500 dark:bg-emerald-950" },
      { variant: "outline", color: "rose", isActive: true, className: "border-rose-500 text-rose-600 bg-rose-50 dark:border-rose-500 dark:text-rose-500 dark:bg-rose-950" },
      { variant: "outline", color: "amber", isActive: true, className: "border-amber-500 text-amber-600 bg-amber-50 dark:border-amber-500 dark:text-amber-500 dark:bg-amber-950" },
      { variant: "outline", color: "violet", isActive: true, className: "border-violet-600 text-violet-600 bg-violet-50 dark:border-violet-500 dark:text-violet-500 dark:bg-violet-950" },
      { variant: "outline", color: "indigo", isActive: true, className: "border-indigo-600 text-indigo-600 bg-indigo-50 dark:border-indigo-500 dark:text-indigo-500 dark:bg-indigo-950" },
      { variant: "outline", color: "sky", isActive: true, className: "border-sky-500 text-sky-600 bg-sky-50 dark:border-sky-500 dark:text-sky-500 dark:bg-sky-950" },
      { variant: "outline", color: "slate", isActive: true, className: "border-slate-600 text-slate-600 bg-slate-50 dark:border-slate-500 dark:text-slate-500 dark:bg-slate-950" },
      { variant: "outline", color: "orange", isActive: true, className: "border-orange-500 text-orange-600 bg-orange-50 dark:border-orange-500 dark:text-orange-500 dark:bg-orange-950" },
      
      // GHOST ACTIVE
      { variant: "ghost", color: "default", isActive: true, className: "bg-accent text-accent-foreground" },
      { variant: "ghost", color: "blue", isActive: true, className: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500" },
      { variant: "ghost", color: "emerald", isActive: true, className: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500" },
      { variant: "ghost", color: "rose", isActive: true, className: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-500" },
      { variant: "ghost", color: "amber", isActive: true, className: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500" },
      { variant: "ghost", color: "violet", isActive: true, className: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-500" },
      { variant: "ghost", color: "indigo", isActive: true, className: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-500" },
      { variant: "ghost", color: "sky", isActive: true, className: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-500" },
      { variant: "ghost", color: "slate", isActive: true, className: "bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-500" },
      { variant: "ghost", color: "orange", isActive: true, className: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-500" },

      // LINK ACTIVE
      { variant: "link", color: "default", isActive: true, className: "text-foreground" },
      { variant: "link", color: "blue", isActive: true, className: "text-blue-600 dark:text-blue-500" },
      { variant: "link", color: "emerald", isActive: true, className: "text-emerald-600 dark:text-emerald-500" },
      { variant: "link", color: "rose", isActive: true, className: "text-rose-600 dark:text-rose-500" },
      { variant: "link", color: "amber", isActive: true, className: "text-amber-600 dark:text-amber-500" },
      { variant: "link", color: "violet", isActive: true, className: "text-violet-600 dark:text-violet-500" },
      { variant: "link", color: "indigo", isActive: true, className: "text-indigo-600 dark:text-indigo-500" },
      { variant: "link", color: "sky", isActive: true, className: "text-sky-600 dark:text-sky-500" },
      { variant: "link", color: "slate", isActive: true, className: "text-slate-600 dark:text-slate-500" },
      { variant: "link", color: "orange", isActive: true, className: "text-orange-600 dark:text-orange-500" },
    ],
    defaultVariants: {
      variant: "ghost",
      color: "default",
      shape: "default",
      size: "default",
      spacing: "default",
      isActive: false,
    },
  }
);

export interface SidebarButtonProps extends Omit<HTMLMotionProps<"button">, "color">, VariantProps<typeof sidebarButtonVariants> {
  label: string;
  isCategory?: boolean;
}

export const SidebarButton: React.FC<SidebarButtonProps> = React.memo(({
  label,
  isActive = false,
  isCategory = false,
  variant = "ghost",
  color = "default",
  shape = "default",
  size = "default",
  spacing = "default",
  className,
  ...props
}) => {

  const getIndicatorColor = () => {
    switch (color) {
      case "blue": return "bg-blue-600 dark:bg-blue-500";
      case "emerald": return "bg-emerald-600 dark:bg-emerald-500";
      case "rose": return "bg-rose-600 dark:bg-rose-500";
      case "amber": return "bg-amber-500 dark:bg-amber-400";
      case "violet": return "bg-violet-600 dark:bg-violet-500";
      case "indigo": return "bg-indigo-600 dark:bg-indigo-500";
      case "sky": return "bg-sky-500 dark:bg-sky-400";
      case "slate": return "bg-slate-600 dark:bg-slate-500";
      case "orange": return "bg-orange-500 dark:bg-orange-400";
      default: return "bg-foreground";
    }
  };

  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        sidebarButtonVariants({ variant, color, shape, size, spacing, isActive }),
        className
      )}
      {...(props as any)}
    >
      <span className={cn(isCategory && "pl-4 text-xs font-semibold tracking-wider uppercase opacity-70")}>{label}</span>
      {isActive && <div className={cn("w-1.5 h-1.5 rounded-full", getIndicatorColor())} />}
    </motion.button>
  );
});

SidebarButton.displayName = "SidebarButton";
