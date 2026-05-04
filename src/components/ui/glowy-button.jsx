"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const GlowyButton = React.forwardRef(
  ({ 
    className, 
    children, 
    variant = "primary", // primary, success, warning, danger, info, secondary
    mode = "modern",    // modern, clean, minimal
    icon: Icon = ArrowRight,
    showIcon = true,
    color,
    glowColor,
    disabled,
    ...props 
  }, ref) => {
    
    const intentColors = {
      primary: { base: "#00afaf", glow: "rgba(0, 175, 175, 0.5)" },
      success: { base: "#10b981", glow: "rgba(16, 185, 129, 0.5)" },
      warning: { base: "#f59e0b", glow: "rgba(245, 158, 11, 0.5)" },
      danger: { base: "#ef4444", glow: "rgba(239, 68, 68, 0.5)" },
      info: { base: "#06b6d4", glow: "rgba(6, 182, 212, 0.5)" },
      secondary: { base: "#64748b", glow: "rgba(100, 116, 139, 0.5)" },
    };

    const styleOptions = ["modern", "clean", "minimal"];
    const intents = Object.keys(intentColors);
    
    let finalIntent = variant;
    let finalMode = mode;

    if (styleOptions.includes(variant)) {
      finalMode = variant;
      finalIntent = intents.includes(mode) ? mode : "primary";
    }

    const theme = intentColors[finalIntent] || intentColors.primary;
    const finalColor = color || theme.base;
    const finalGlow = glowColor || theme.glow;

    return (
      <div className={cn("relative select-none inline-block group", className)}>
        <style>{`
          .glowy-btn-${finalIntent} {
            --h: 48px;
            --color: ${finalColor};
            --glow: ${finalGlow};
            position: relative;
            min-width: 140px;
            height: var(--h);
            padding: 0 1.5rem;
            border-radius: 8px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            border: none;
            font-family: inherit;
            font-weight: 600;
            color: white;
            background: rgb(15 23 42 / 0.9);
            box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
            overflow: hidden;
            cursor: pointer;
            transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
            z-index: 2;
          }

          .glowy-btn-${finalIntent}::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent);
            transform: translateX(-100%);
            transition: transform 600ms ease;
            z-index: 1;
          }

          .glowy-btn-${finalIntent}:hover {
            background: rgb(15 23 42 / 1);
            box-shadow: 0 0 20px var(--glow),
                        inset 0 0 12px -5px var(--color),
                        0 0 0 1px rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
          }

          .glowy-btn-${finalIntent}:hover::before {
            transform: translateX(100%);
          }

          .glowy-btn-${finalIntent}:active {
            transform: translateY(0);
            box-shadow: 0 0 10px var(--glow),
                        inset 0 0 8px -5px var(--color);
          }

          .glowy-btn-${finalIntent}:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
            box-shadow: none;
          }

          /* Mode overrides */
          .glowy-btn-${finalIntent}.mode-minimal {
            background: transparent;
            box-shadow: 0 0 0 1px var(--color);
            color: var(--color);
          }
          .glowy-btn-${finalIntent}.mode-minimal:hover {
            background: var(--color);
            color: white;
          }

          .glowy-btn-${finalIntent}.mode-clean {
            background: var(--color);
            box-shadow: none;
          }
          .glowy-btn-${finalIntent}.mode-clean:hover {
            filter: brightness(1.1);
          }
        `}</style>
        <button 
          ref={ref} 
          disabled={disabled}
          className={cn(
            `glowy-btn-${finalIntent}`,
            finalMode !== "modern" && `mode-${finalMode}`
          )} 
          {...props}
        >
          <span className="relative z-10 whitespace-nowrap">{children}</span>
          {showIcon && Icon && (
            <motion.div 
              className="relative z-10 flex items-center justify-center"
              animate={disabled ? {} : { x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon size={18} />
            </motion.div>
          )}
        </button>
      </div>
    );
  }
);

GlowyButton.displayName = "GlowyButton";
