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
  "relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-xl",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-2xl px-8",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CursorGlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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
              variant,
              size,
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
                  buttonVariants({ variant, size, className }), 
                  "group relative overflow-hidden",
                  "border border-border/40 hover:border-transparent transition-all duration-300",
                  variant === "default" ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
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
