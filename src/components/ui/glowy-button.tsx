/**
 * @registry-slug glowy
 * @registry-name Glowy Button
 * @registry-description A Future UI Glowy Button component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type GlowyButtonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type GlowyButtonShape = "default" | "square" | "rounded" | "sharp";
export type GlowyButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface GlowyButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "color"> {
  color?: GlowyButtonColor;
  shape?: GlowyButtonShape;
  spacing?: GlowyButtonSpacing;
  icon?: LucideIcon;
  customColor?: string; // Optional custom override
  customGlowColor?: string; // Optional custom override
  /** Render as a div instead of a button (e.g. when wrapping inside a Link) */
  asDiv?: boolean;
}

export const GlowyButton = React.memo(
  React.forwardRef<HTMLButtonElement, GlowyButtonProps>(
    (
      {
        className,
        children,
        icon: Icon = ArrowRight,
        color = "default",
        shape = "default",
        spacing = "default",
        customColor,
        customGlowColor,
        disabled,
        asDiv,
        ...props
      },
      ref
    ) => {
      const internalRef = React.useRef<HTMLElement>(null);

      React.useImperativeHandle(ref, () => internalRef.current as HTMLButtonElement);

      const [circleSize, setCircleSize] = React.useState(44);

      React.useEffect(() => {
        if (!internalRef.current) return;
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            setCircleSize((entry.target as HTMLElement).clientHeight);
          }
        });
        observer.observe(internalRef.current);
        return () => observer.disconnect();
      }, []);

      const intentColors: Record<GlowyButtonColor, { base: string; glow: string; glass: string }> = {
        default:   { base: "#27272a", glow: "rgba(39, 39, 42, 0.5)",   glass: "rgba(39, 39, 42, 0.35)"   }, // zinc-800
        blue:      { base: "#2563eb", glow: "rgba(37, 99, 235, 0.5)",  glass: "rgba(37, 99, 235, 0.35)"  },
        emerald:   { base: "#10b981", glow: "rgba(16, 185, 129, 0.5)", glass: "rgba(16, 185, 129, 0.35)" },
        rose:      { base: "#f43f5e", glow: "rgba(244, 63, 94, 0.5)",  glass: "rgba(244, 63, 94, 0.35)"  },
        amber:     { base: "#f59e0b", glow: "rgba(245, 158, 11, 0.5)", glass: "rgba(245, 158, 11, 0.35)" },
        violet:    { base: "#7c3aed", glow: "rgba(124, 58, 237, 0.5)", glass: "rgba(124, 58, 237, 0.35)" },
        indigo:    { base: "#4f46e5", glow: "rgba(79, 70, 229, 0.5)",  glass: "rgba(79, 70, 229, 0.35)"  },
        sky:       { base: "#0ea5e9", glow: "rgba(14, 165, 233, 0.5)", glass: "rgba(14, 165, 233, 0.35)" },
        slate:     { base: "#475569", glow: "rgba(71, 85, 105, 0.5)",  glass: "rgba(71, 85, 105, 0.35)"  },
        orange:    { base: "#f97316", glow: "rgba(249, 115, 22, 0.5)", glass: "rgba(249, 115, 22, 0.35)" },
      };

      const theme = intentColors[color] || intentColors.default;
      const finalColor = customColor || theme.base;
      const finalGlow = customGlowColor || theme.glow;
      const finalGlass = theme.glass;

      const getShapeClass = (s: GlowyButtonShape) => {
        switch (s) {
          case "square": return "rounded-none";
          case "sharp": return "rounded-[2px]";
          case "rounded": return "rounded-xl";
          case "default": return "rounded-full";
        }
      };

      const getSpacingStyles = (s: GlowyButtonSpacing) => {
        switch (s) {
          case "2x": return "h-8 px-4 text-xs";
          case "4x": return "h-10 px-6 text-sm";
          case "6x": return "h-12 px-8 text-base";
          case "8x": return "h-14 px-10 text-lg";
          default: return "h-11 px-7 text-sm";
        }
      };

      const getRadiusValue = (s: GlowyButtonShape) => {
        switch (s) {
          case "square": return "0px";
          case "sharp": return "2px";
          case "rounded": return "12px"; // xl
          case "default": return "9999px"; // full
        }
      };

      const borderRadius = getRadiusValue(shape);

      const sharedProps = {
        ref: internalRef as any,
        initial: "initial" as const,
        whileHover: (!disabled ? "hover" : "initial") as "hover" | "initial",
        whileTap: (!disabled ? "hover" : "initial") as "hover" | "initial",
        className: cn(
          "relative inline-flex items-center justify-center font-bold overflow-hidden",
          "bg-background text-foreground border-2",
          "w-full md:w-auto",
          "whitespace-nowrap",
          getShapeClass(shape),
          getSpacingStyles(spacing),
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className
        ),
        style: {
          borderColor: finalColor,
          boxShadow: `0 0 20px ${finalGlow}`,
        },
      };

      const inner = (
        <>
          <motion.div
            variants={{ initial: { x: 0 }, hover: { x: -8 } }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative z-30 flex items-center justify-center pointer-events-none truncate w-full"
          >
            <span className="truncate pl-[0.1em]">{children as React.ReactNode}</span>
          </motion.div>

          <motion.div
            variants={{
              initial: { width: "100%", height: "100%", right: "0px", top: "0px", borderRadius: borderRadius },
              hover:   { width: circleSize, height: "100%", right: "0px", top: "0px", borderRadius: borderRadius },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.8 }}
            className="absolute z-20 flex items-center justify-center backdrop-blur-md pointer-events-none m-0 p-0"
            style={{ backgroundColor: finalGlass }}
          >
            <motion.div
              variants={{ initial: { opacity: 0, scale: 0.8, x: -10, rotate: -45 }, hover: { opacity: 1, scale: 1, x: 0, rotate: 0 } }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.05 }}
              className="flex items-center justify-center text-foreground"
            >
              <Icon size={18} />
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
            <motion.div
              className="absolute top-[-50%] left-[-50%] h-[200%] w-[200%] z-0"
              variants={{
                initial: { x: "-100%", y: "-100%", rotate: 45 },
                hover:   { x: "100%",  y: "100%",  rotate: 45 },
              }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], repeat: Infinity, repeatDelay: 0.4 }}
              style={{
                background: `linear-gradient(90deg, transparent 35%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.15) 52%, rgba(255,255,255,0) 60%, transparent 65%)`,
              }}
            />
          </div>
        </>
      );

      if (asDiv) {
        return (
          <motion.div {...(sharedProps as React.ComponentProps<typeof motion.div>)}>
            {inner}
          </motion.div>
        );
      }

      return (
        <motion.button
          {...(sharedProps as React.ComponentProps<typeof motion.button>)}
          disabled={disabled}
          {...(props as React.ComponentProps<typeof motion.button>)}
        >
          {inner}
        </motion.button>
      );
    }
  )
);

GlowyButton.displayName = "GlowyButton";