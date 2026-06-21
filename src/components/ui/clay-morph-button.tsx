"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * @registry-slug clay-morph-button
 * @registry-name Clay Morphism Button
 * @registry-description A premium, modern Claymorphism button with soft 3D extrusion, inner highlights, and tactile press effects.
 * @registry-category ui
 * @registry-type components:ui
 */

export type ClayMorphButtonVariant =
  | "primary"
  | "ghost"
  | "outline"
  | "soft"
  | "elevated"
  | "gradient"
  | "glass";

export type ClayMorphButtonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ClayMorphButtonShape = "default" | "square" | "rounded" | "sharp";
export type ClayMorphButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface ClayMorphButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ClayMorphButtonVariant;
  color?: ClayMorphButtonColor;
  spacing?: ClayMorphButtonSpacing;
  shape?: ClayMorphButtonShape;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  elevation?: "flat" | "medium" | "elevated" | "floating";
  glow?: boolean;
}

const colorMap: Record<ClayMorphButtonColor, string> = {
  default: "bg-foreground text-background",
  blue: "bg-blue-600 text-white",
  emerald: "bg-emerald-500 text-white",
  rose: "bg-rose-500 text-white",
  amber: "bg-amber-500 text-zinc-950",
  violet: "bg-violet-600 text-white",
  indigo: "bg-indigo-600 text-white",
  sky: "bg-sky-500 text-zinc-950",
  slate: "bg-slate-600 text-white",
  orange: "bg-orange-500 text-white",
};

const gradientColorMap: Record<ClayMorphButtonColor, string> = {
  default: "bg-gradient-to-br from-foreground/80 to-foreground text-background dark:from-background dark:to-background/80 dark:text-foreground",
  blue: "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
  emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
  rose: "bg-gradient-to-br from-rose-400 to-rose-600 text-white",
  amber: "bg-gradient-to-br from-amber-400 to-amber-600 text-zinc-950",
  violet: "bg-gradient-to-br from-violet-400 to-violet-600 text-white",
  indigo: "bg-gradient-to-br from-indigo-400 to-indigo-600 text-white",
  sky: "bg-gradient-to-br from-sky-400 to-sky-600 text-zinc-950",
  slate: "bg-gradient-to-br from-slate-400 to-slate-600 text-white",
  orange: "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
};

const getShapeClass = (shape: ClayMorphButtonShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[2px]";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-3xl"; // A bit more rounded for claymorphism by default
  }
};

const getSpacingStyles = (spacing: ClayMorphButtonSpacing) => {
  switch (spacing) {
    case "2x": return "px-3 py-1.5 text-xs";
    case "4x": return "px-4 py-2 text-sm";
    case "6x": return "px-6 py-3 text-base";
    case "8x": return "px-8 py-4 text-lg";
    default: return "px-5 py-2.5 text-sm";
  }
};

const getIconSize = (spacing: ClayMorphButtonSpacing) => {
  switch (spacing) {
    case "2x": return "[&>svg]:w-3.5 [&>svg]:h-3.5";
    case "4x": return "[&>svg]:w-4 [&>svg]:h-4";
    case "6x": return "[&>svg]:w-5 [&>svg]:h-5";
    case "8x": return "[&>svg]:w-6 [&>svg]:h-6";
    default: return "[&>svg]:w-4 [&>svg]:h-4";
  }
};

const getElevationStyles = (elevation: ClayMorphButtonProps["elevation"]) => {
  switch (elevation) {
    case "flat":
      return "shadow-[inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_2px_4px_8px_rgba(255,255,255,0.1),inset_-2px_-4px_8px_rgba(0,0,0,0.3)]";
    case "medium":
      return "shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.8),inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.03),inset_2px_4px_8px_rgba(255,255,255,0.1),inset_-2px_-4px_8px_rgba(0,0,0,0.3)]";
    case "elevated":
      return "shadow-[8px_8px_16px_rgba(0,0,0,0.08),-8px_-8px_16px_rgba(255,255,255,0.9),inset_2px_4px_8px_rgba(255,255,255,0.5),inset_-2px_-4px_8px_rgba(0,0,0,0.15)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.6),-8px_-8px_16px_rgba(255,255,255,0.05),inset_2px_4px_8px_rgba(255,255,255,0.15),inset_-2px_-4px_8px_rgba(0,0,0,0.4)]";
    case "floating":
      return "shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,1),inset_2px_4px_8px_rgba(255,255,255,0.6),inset_-2px_-4px_8px_rgba(0,0,0,0.1)] dark:shadow-[12px_12px_24px_rgba(0,0,0,0.7),-12px_-12px_24px_rgba(255,255,255,0.06),inset_2px_4px_8px_rgba(255,255,255,0.2),inset_-2px_-4px_8px_rgba(0,0,0,0.5)]";
    default:
      return "";
  }
};

export const ClayMorphButton = React.forwardRef<
  HTMLButtonElement,
  ClayMorphButtonProps
>(
  (
    {
      variant = "primary",
      color = "default",
      spacing = "default",
      shape = "default",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      elevation = "medium",
      glow = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...filteredProps } = props as any;

    const baseStyles = cn(
      "relative inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer outline-none select-none",
      "font-semibold tracking-wide",
      fullWidth && "w-full",
      getShapeClass(shape),
      getSpacingStyles(spacing),
      disabled && "opacity-50 cursor-not-allowed grayscale",
      className
    );

    const variantStyles = {
      primary: cn(colorMap[color], getElevationStyles(elevation)),
      ghost: cn(
        "bg-transparent text-muted-foreground hover:bg-accent",
        "shadow-none active:shadow-[inset_2px_4px_8px_rgba(0,0,0,0.05)] dark:active:shadow-[inset_2px_4px_8px_rgba(0,0,0,0.3)]"
      ),
      outline: cn(
        "bg-transparent border-2 border-border text-muted-foreground",
        "hover:bg-accent",
        "shadow-[4px_4px_10px_rgba(0,0,0,0.02),-4px_-4px_10px_rgba(255,255,255,0.5)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(255,255,255,0.02)]"
      ),
      soft: cn(
        colorMap[color],
        "bg-opacity-20 dark:bg-opacity-20 text-current",
        "shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.6),inset_2px_4px_8px_rgba(255,255,255,0.8),inset_-2px_-4px_8px_rgba(0,0,0,0.02)]",
        "dark:shadow-[4px_4px_10px_rgba(0,0,0,0.4),-4px_-4px_10px_rgba(255,255,255,0.02),inset_2px_4px_8px_rgba(255,255,255,0.05),inset_-2px_-4px_8px_rgba(0,0,0,0.2)]"
      ),
      elevated: cn(colorMap[color], getElevationStyles("elevated")),
      gradient: cn(gradientColorMap[color], getElevationStyles(elevation)),
      glass: cn(
        "bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/40 dark:border-white/10 text-zinc-900 dark:text-white",
        getElevationStyles(elevation)
      ),
    };

    const getGlowStyles = () => {
      if (!glow) return "";
      return "after:absolute after:inset-0 after:z-[-1] after:blur-xl after:opacity-40 after:bg-inherit hover:after:opacity-60 transition-all";
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={
          !disabled
            ? {
                scale: 0.96,
                boxShadow:
                  "inset 4px 6px 10px rgba(0,0,0,0.15), inset -4px -6px 10px rgba(255,255,255,0.4)",
              }
            : {}
        }
        className={cn(baseStyles, variantStyles[variant], getGlowStyles())}
        disabled={disabled || loading}
        {...filteredProps}
      >
        {/* Soft Inner Glow Layer for true Claymorphism feel */}
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-gradient-to-br from-white/20 to-transparent mix-blend-overlay" />

        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}

          {!loading && icon && iconPosition === "left" && (
            <span
              className={cn(
                "shrink-0 inline-flex items-center justify-center",
                getIconSize(spacing)
              )}
            >
              {icon}
            </span>
          )}

          {children && <span className="truncate">{children}</span>}

          {!loading && icon && iconPosition === "right" && (
            <span
              className={cn(
                "shrink-0 inline-flex items-center justify-center",
                getIconSize(spacing)
              )}
            >
              {icon}
            </span>
          )}
        </div>
      </motion.button>
    );
  }
);

ClayMorphButton.displayName = "ClayMorphButton";
