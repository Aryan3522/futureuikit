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

export type GlowyButtonVariant = "primary" | "success" | "warning" | "danger" | "info" | "secondary";

export interface GlowyButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: GlowyButtonVariant;
  icon?: LucideIcon;
  color?: string;
  glowColor?: string;
  /** Render as a div instead of a button (e.g. when wrapping inside a Link) */
  asDiv?: boolean;
}

export const GlowyButton = React.memo(
  React.forwardRef<HTMLButtonElement, GlowyButtonProps>(
    (
      {
        className,
        children,
        variant = "primary",
        icon: Icon = ArrowRight,
        color,
        glowColor,
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

      const intentColors: Record<GlowyButtonVariant, { base: string; glow: string; glass: string }> = {
        primary:   { base: "#00afaf", glow: "rgba(0, 175, 175, 0.5)",   glass: "rgba(0, 175, 175, 0.35)"   },
        success:   { base: "#10b981", glow: "rgba(16, 185, 129, 0.5)",  glass: "rgba(16, 185, 129, 0.35)"  },
        warning:   { base: "#f59e0b", glow: "rgba(245, 158, 11, 0.5)",  glass: "rgba(245, 158, 11, 0.35)"  },
        danger:    { base: "#ef4444", glow: "rgba(239, 68, 68, 0.5)",   glass: "rgba(239, 68, 68, 0.35)"   },
        info:      { base: "#06b6d4", glow: "rgba(6, 182, 212, 0.5)",   glass: "rgba(6, 182, 212, 0.35)"   },
        secondary: { base: "#64748b", glow: "rgba(100, 116, 139, 0.5)", glass: "rgba(100, 116, 139, 0.35)" },
      };

      const theme = intentColors[variant] || intentColors.primary;
      const finalColor = color || theme.base;
      const finalGlow = glowColor || theme.glow;
      const finalGlass = theme.glass;

      const sharedProps = {
        ref: internalRef as any,
        initial: "initial" as const,
        whileHover: (!disabled ? "hover" : "initial") as "hover" | "initial",
        whileTap: (!disabled ? "hover" : "initial") as "hover" | "initial",
        className: cn(
          "relative inline-flex items-center justify-center px-8 h-12 rounded-full font-bold overflow-hidden",
          "bg-background text-foreground border-2",
          "w-full md:w-auto",
          "whitespace-nowrap",
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
              initial: { width: "100%", height: "100%", right: "0px", top: "0px", borderRadius: "9999px" },
              hover:   { width: circleSize, height: "100%", right: "0px", top: "0px", borderRadius: "9999px" },
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