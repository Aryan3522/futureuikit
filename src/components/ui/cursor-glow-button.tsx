"use client";

/**
 * @registry-slug cursor-glow-button
 * @registry-name Cursor Glow Button
 * @registry-description A Future UI Cursor Glow Button component.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency framer-motion
 */

import React, { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "border border-transparent",
        outline: "border shadow-sm bg-transparent",
        ghost: "bg-transparent border-transparent",
        link: "bg-transparent underline-offset-4 hover:underline border-transparent",
      },
      color: {
        default: "text-foreground border-border",
        blue: "text-blue-600 dark:text-blue-500 border-blue-200 dark:border-blue-800",
        emerald: "text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-800",
        rose: "text-rose-600 dark:text-rose-500 border-rose-200 dark:border-rose-800",
        amber: "text-amber-600 dark:text-amber-500 border-amber-200 dark:border-amber-800",
        violet: "text-violet-600 dark:text-violet-500 border-violet-200 dark:border-violet-800",
        indigo: "text-indigo-600 dark:text-indigo-500 border-indigo-200 dark:border-indigo-800",
        sky: "text-sky-600 dark:text-sky-500 border-sky-200 dark:border-sky-800",
        slate: "text-slate-600 dark:text-slate-500 border-slate-200 dark:border-slate-800",
        orange: "text-orange-600 dark:text-orange-500 border-orange-200 dark:border-orange-800",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-xl",
        sharp: "rounded-[2px]",
      },
      spacing: {
        default: "h-10 px-5 py-2 text-sm",
        "2x": "h-8 px-3 py-1 text-xs",
        "4x": "h-10 px-5 py-2 text-sm",
        "6x": "h-12 px-8 py-3 text-base",
        "8x": "h-14 px-10 py-4 text-lg",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "default",
        className: "bg-foreground text-background hover:bg-foreground/90 shadow-sm",
      },
      {
        variant: "solid",
        color: "blue",
        className: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
      },
      {
        variant: "solid",
        color: "emerald",
        className: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
      },
      {
        variant: "solid",
        color: "rose",
        className: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
      },
      {
        variant: "solid",
        color: "amber",
        className: "bg-amber-500 text-zinc-950 hover:bg-amber-600 shadow-sm",
      },
      {
        variant: "solid",
        color: "violet",
        className: "bg-violet-600 text-white hover:bg-violet-700 shadow-sm",
      },
      {
        variant: "solid",
        color: "indigo",
        className: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
      },
      {
        variant: "solid",
        color: "sky",
        className: "bg-sky-500 text-zinc-950 hover:bg-sky-600 shadow-sm",
      },
      {
        variant: "solid",
        color: "slate",
        className: "bg-slate-600 text-white hover:bg-slate-700 shadow-sm",
      },
      {
        variant: "solid",
        color: "orange",
        className: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm",
      },
      {
        variant: "outline",
        color: "default",
        className: "hover:bg-accent",
      },
      {
        variant: "outline",
        color: "blue",
        className: "hover:bg-blue-50 dark:hover:bg-blue-950",
      },
      {
        variant: "outline",
        color: "emerald",
        className: "hover:bg-emerald-50 dark:hover:bg-emerald-950",
      },
      {
        variant: "outline",
        color: "rose",
        className: "hover:bg-rose-50 dark:hover:bg-rose-950",
      },
      {
        variant: "outline",
        color: "amber",
        className: "hover:bg-amber-50 dark:hover:bg-amber-950",
      },
      {
        variant: "outline",
        color: "violet",
        className: "hover:bg-violet-50 dark:hover:bg-violet-950",
      },
      {
        variant: "outline",
        color: "indigo",
        className: "hover:bg-indigo-50 dark:hover:bg-indigo-950",
      },
      {
        variant: "outline",
        color: "sky",
        className: "hover:bg-sky-50 dark:hover:bg-sky-950",
      },
      {
        variant: "outline",
        color: "slate",
        className: "hover:bg-slate-50 dark:hover:bg-slate-950",
      },
      {
        variant: "outline",
        color: "orange",
        className: "hover:bg-orange-50 dark:hover:bg-orange-950",
      },
      {
        variant: "ghost",
        color: "default",
        className: "hover:bg-accent",
      },
      {
        variant: "ghost",
        color: "blue",
        className: "hover:bg-blue-50 dark:hover:bg-blue-950",
      },
      {
        variant: "ghost",
        color: "emerald",
        className: "hover:bg-emerald-50 dark:hover:bg-emerald-950",
      },
      {
        variant: "ghost",
        color: "rose",
        className: "hover:bg-rose-50 dark:hover:bg-rose-950",
      },
      {
        variant: "ghost",
        color: "amber",
        className: "hover:bg-amber-50 dark:hover:bg-amber-950",
      },
      {
        variant: "ghost",
        color: "violet",
        className: "hover:bg-violet-50 dark:hover:bg-violet-950",
      },
      {
        variant: "ghost",
        color: "indigo",
        className: "hover:bg-indigo-50 dark:hover:bg-indigo-950",
      },
      {
        variant: "ghost",
        color: "sky",
        className: "hover:bg-sky-50 dark:hover:bg-sky-950",
      },
      {
        variant: "ghost",
        color: "slate",
        className: "hover:bg-slate-50 dark:hover:bg-slate-950",
      },
      {
        variant: "ghost",
        color: "orange",
        className: "hover:bg-orange-50 dark:hover:bg-orange-950",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      shape: "default",
      spacing: "default",
    },
  }
);

export interface CursorGlowButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  glowColor?: string;
  glowSize?: number;
  glowOpacity?: number;
  borderWidth?: string;
}

export const CursorGlowButton = React.memo(React.forwardRef<HTMLButtonElement, CursorGlowButtonProps>(
          (
            {
              className,
              variant = "solid",
              color = "default",
              shape = "default",
              spacing = "default",
              children,
              glowColor = "rgba(120, 119, 198, 0.5)", // Improved glow color for better cross-theme visibility
              glowSize = 160,
              glowOpacity = 1,
              borderWidth = "2px",
              onMouseMove,
              onMouseLeave,
              onMouseEnter,
              ...props
            },
            ref
          ) => {
            const mouseX = useMotionValue(0);
            const mouseY = useMotionValue(0);
            const [isHovered, setIsHovered] = useState(false);
            const [isMounted, setIsMounted] = React.useState(false);

            React.useEffect(() => {
              setIsMounted(true);
            }, []);

            // Main border glow
            const glowBackground = useMotionTemplate`radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 100%)`;
            
            // Subtler inner fill glow
            const innerGlowBackground = useMotionTemplate`radial-gradient(${glowSize * 1.5}px circle at ${mouseX}px ${mouseY}px, ${glowColor.replace(/[\d.]+\)$/g, '0.15)')}, transparent 100%)`;

            function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
              const { left, top } = e.currentTarget.getBoundingClientRect();
              mouseX.set(e.clientX - left);
              mouseY.set(e.clientY - top);
              if (onMouseMove) onMouseMove(e);
            }

            return (
              <motion.button
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={(e: any) => {
                  setIsHovered(true);
                  if (onMouseEnter) onMouseEnter(e);
                }}
                onMouseLeave={(e: any) => {
                  setIsHovered(false);
                  if (onMouseLeave) onMouseLeave(e);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  buttonVariants({ variant, color, shape, spacing, className }), 
                  "group relative overflow-hidden transition-all duration-300",
                  variant === "solid" && "hover:border-transparent"
                )}
                {...(props as any)}
              >
                {/* Border Glow overlay */}
                {isMounted && (
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-[inherit]"
                    animate={{ opacity: isHovered ? glowOpacity : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      background: glowBackground,
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      padding: borderWidth,
                    }}
                  />
                )}

                {/* Inner Fill Glow overlay */}
                {isMounted && (
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-[inherit]"
                    animate={{ opacity: isHovered ? glowOpacity : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      background: innerGlowBackground,
                    }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-center gap-2">
                  {children}
                </div>
              </motion.button>
            );
          }
        ));

CursorGlowButton.displayName = "CursorGlowButton";
