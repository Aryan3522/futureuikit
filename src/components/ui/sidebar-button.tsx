/**
 * @registry-slug sidebar-button
 * @registry-name Sidebar Button
 * @registry-description A Future UI Sidebar Button component.
 * @registry-category ui
 */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isActive?: boolean;
  isCategory?: boolean;
}

export const SidebarButton: React.FC<SidebarButtonProps> = React.memo(({
          label,
          isActive,
          isCategory = false,
          className,
          ...props
        }) => {
          return (
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full text-left py-2 px-3 text-sm transition-colors relative group flex items-center justify-between rounded-lg",
                isActive 
                  ? "bg-primary/10 text-primary font-bold italic" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                className
              )}
              {...(props as any)}
            >
              <span className={cn(isCategory && "pl-4 text-xs font-semibold tracking-wider uppercase opacity-70")}>{label}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </motion.button>
          );
        });
SidebarButton.displayName = "SidebarButton";
