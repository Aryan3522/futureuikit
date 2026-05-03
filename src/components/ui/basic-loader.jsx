"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * BasicLoader Component
 * 
 * Variants:
 * - modern: Sleek, multi-ring animation.
 * - clean: Simple pulsing dot or circle.
 * - minimal: Bare minimum indicator.
 */
export const BasicLoader = ({ 
  className, 
  variant = "modern", 
  color = "#3b82f6", 
  text = "Loading, please wait...", 
  ...props 
}) => {
  
  const getLoader = () => {
    switch (variant) {
      case "modern":
        return (
          <div className="relative w-16 h-16">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-t-transparent"
              style={{ borderColor: `${color} transparent transparent transparent` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-b-transparent opacity-50"
              style={{ borderColor: `transparent transparent ${color} transparent` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        );
      case "clean":
        return (
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        );
      case "minimal":
        return (
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-t-transparent"
            style={{ borderColor: `${color} transparent transparent transparent` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        );
      default:
        return <div className="loading-spinner" />;
    }
  };

  return (
    <div className={cn("flex flex-col justify-center items-center gap-6 p-8", className)} {...props}>
      {getLoader()}
      {text && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-muted-foreground tracking-wide animate-pulse"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};
