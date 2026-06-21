/**
 * @registry-slug sidebar-button
 * @registry-name Sidebar Button
 * @registry-description A Future UI Sidebar Button component.
 * @registry-category ui
 */
"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export type SidebarButtonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type SidebarButtonShape = "default" | "square" | "rounded" | "sharp";
export type SidebarButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface SidebarButtonProps extends Omit<HTMLMotionProps<"button">, "color"> {
  label: string;
  isActive?: boolean;
  isCategory?: boolean;
  color?: SidebarButtonColor;
  shape?: SidebarButtonShape;
  spacing?: SidebarButtonSpacing;
}

export const SidebarButton: React.FC<SidebarButtonProps> = React.memo(({
  label,
  isActive,
  isCategory = false,
  color = "default",
  shape = "default",
  spacing = "default",
  className,
  ...props
}) => {

  const getColorClasses = () => {
    if (!isActive) return "text-muted-foreground hover:bg-accent hover:text-foreground";
    
    switch (color) {
      case "blue": return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500 font-bold italic";
      case "emerald": return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500 font-bold italic";
      case "rose": return "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-500 font-bold italic";
      case "amber": return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500 font-bold italic";
      case "violet": return "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-500 font-bold italic";
      case "indigo": return "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-500 font-bold italic";
      case "sky": return "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-500 font-bold italic";
      case "slate": return "bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-500 font-bold italic";
      case "orange": return "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-500 font-bold italic";
      default: return "bg-accent text-accent-foreground font-bold italic";
    }
  };

  const getShapeClasses = () => {
    switch (shape) {
      case "square": return "rounded-none";
      case "rounded": return "rounded-xl";
      case "sharp": return "rounded-[2px]";
      default: return "rounded-lg";
    }
  };

  const getSpacingClasses = () => {
    switch (spacing) {
      case "2x": return "py-1 px-2 text-xs";
      case "4x": return "py-2 px-3 text-sm";
      case "6x": return "py-3 px-4 text-base";
      case "8x": return "py-4 px-5 text-lg";
      default: return "py-2 px-3 text-sm";
    }
  };

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
        "w-full text-left transition-colors relative group flex items-center justify-between",
        getShapeClasses(),
        getSpacingClasses(),
        getColorClasses(),
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
