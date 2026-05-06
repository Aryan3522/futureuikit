/**
 * @registry-slug sidebar-button
 * @registry-name Sidebar Button
 */
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isActive?: boolean;
  isCategory?: boolean;
}

/**
 * A clean, plain-text button for sidebar navigation.
 * Features an active state indicator and category indentation.
 */
export const SidebarButton: React.FC<SidebarButtonProps> = ({
  label,
  isActive,
  isCategory = false,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "w-full text-left py-2 text-sm transition-colors relative group flex items-center justify-between",
        isActive 
          ? "text-primary font-bold italic" 
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      <span className={cn(isCategory && "pl-4")}>{label}</span>
      {isActive && <div className="w-1 h-1 rounded-full bg-primary" />}
    </button>
  );
};
