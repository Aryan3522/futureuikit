/**
 * @registry-slug basic-card
 * @registry-name Basic Card
 * @registry-dependency framer-motion
 */
"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Stat {
  label: string;
  value: string;
}

export interface BasicCardProps extends HTMLMotionProps<"div"> {
  variant?: "modern" | "clean" | "minimal";
  color?: string;
  avatarText?: string;
  name?: string;
  title?: string;
  description?: string;
  stats?: Stat[];
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

/**
 * BasicCard Component
 * 
 * Variants:
 * - modern: Glassmorphism effect, subtle border, smooth animations.
 * - clean: Solid background, clear borders, simple layout.
 * - minimal: Border only, very light, focus on content.
 */
export const BasicCard: React.FC<BasicCardProps> = ({
  className,
  variant = "modern",
  color = "#6366f1",
  avatarText = "AH",
  name = "Aryan Hooda",
  title = "Full Stack Developer",
  description = "Building scalable web apps with React, Node.js & MongoDB. Passionate about clean UI and high-performance backend systems.",
  stats = [
    { label: "Projects", value: "24" },
    { label: "Years", value: "3+" },
    { label: "Followers", value: "1.2k" },
  ],
  primaryCtaText = "Connect",
  secondaryCtaText = "Profile",
  onPrimaryClick,
  onSecondaryClick,
  ...props
}) => {
  
  const getVariantStyles = () => {
    switch (variant) {
      case "modern":
        return "bg-card/40 backdrop-blur-xl border-white/10";
      case "clean":
        return "bg-card border-border";
      case "minimal":
        return "bg-transparent border-border/50";
      default:
        return "bg-card/60 backdrop-blur-md border-border/40";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "max-w-sm w-full rounded-2xl border p-6 transition-all duration-300 text-foreground",
        getVariantStyles(),
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4 mb-5">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-xl shrink-0"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
        >
          {avatarText}
        </motion.div>
        <div className="overflow-hidden">
          <h3 className="text-xl font-bold tracking-tight">{name}</h3>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground mb-6 line-clamp-3">
        {description}
      </p>

      {stats && stats.length > 0 && (
        <div className="flex justify-between mb-6 pt-4 border-t border-border/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <h4 className="text-lg font-bold">{stat.value}</h4>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-auto">
        {primaryCtaText && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrimaryClick}
            className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition-colors"
            style={{ background: color }}
          >
            {primaryCtaText}
          </motion.button>
        )}
        {secondaryCtaText && (
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--foreground), 0.05)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onSecondaryClick}
            className="flex-1 border border-border/40 rounded-xl py-2.5 text-sm font-bold text-foreground transition-colors"
          >
            {secondaryCtaText}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};