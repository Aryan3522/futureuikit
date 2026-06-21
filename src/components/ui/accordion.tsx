/**
 * @registry-slug accordion
 * @registry-name Accordion
 * @registry-description A Future UI Accordion component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/icons";
import { cva, type VariantProps } from "class-variance-authority";

export type AccordionColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type AccordionShape = "default" | "square" | "rounded" | "sharp";
export type AccordionSpacing = "default" | "2x" | "4x" | "6x" | "8x";

const accordionItemVariants = cva(
  "flex w-full items-center justify-between text-left transition-all",
  {
    variants: {
      color: {
        default: "hover:text-foreground hover:bg-accent/50",
        blue: "hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20",
        emerald: "hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
        rose: "hover:text-rose-600 dark:hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20",
        amber: "hover:text-amber-600 dark:hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20",
        violet: "hover:text-violet-600 dark:hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20",
        indigo: "hover:text-indigo-600 dark:hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
        sky: "hover:text-sky-600 dark:hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20",
        slate: "hover:text-slate-600 dark:hover:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/20",
        orange: "hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20",
      },
      shape: {
        default: "rounded-lg",
        square: "rounded-none",
        rounded: "rounded-xl",
        sharp: "rounded-[2px]",
      },
      spacing: {
        default: "py-4 px-4",
        "2x": "py-2 px-2 text-xs",
        "4x": "py-4 px-4 text-sm",
        "6x": "py-5 px-5 text-base",
        "8x": "py-6 px-6 text-lg",
      }
    },
    defaultVariants: {
      color: "default",
      shape: "default",
      spacing: "default",
    }
  }
);

export interface AccordionItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, VariantProps<typeof accordionItemVariants> {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
  color?: AccordionColor;
  shape?: AccordionShape;
  spacing?: AccordionSpacing;
}

export const AccordionItem: React.FC<AccordionItemProps> = React.memo(({
          title,
          children,
          isOpen,
          onClick,
          className,
          color,
          shape,
          spacing,
        }) => {
          return (
            <div className={cn("border-b border-border last:border-none", className)}>
              <motion.button
                whileTap={{ scale: 0.99 }}
                onClick={onClick}
                className={cn(accordionItemVariants({ color, shape, spacing }))}
              >
                <span className={cn("font-medium tracking-tight text-foreground", spacing === "2x" ? "text-xs" : spacing === "6x" || spacing === "8x" ? "text-base" : "text-sm")}>{title}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDownIcon animate className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </motion.button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={cn("pb-4 text-muted-foreground leading-relaxed", spacing === "2x" ? "text-xs px-2" : spacing === "6x" || spacing === "8x" ? "text-base px-5" : "text-sm px-4")}>
                      {children}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        });
AccordionItem.displayName = "AccordionItem";

export interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
  allowMultiple?: boolean;
  className?: string;
  color?: AccordionColor;
  shape?: AccordionShape;
  spacing?: AccordionSpacing;
}

export const Accordion: React.FC<AccordionProps> = React.memo(({
          items,
          allowMultiple = false,
          className,
          color = "default",
          shape = "default",
          spacing = "default",
        }) => {
          const [openIndices, setOpenIndices] = useState<number[]>([0]);

          const handleToggle = (index: number) => {
            if (allowMultiple) {
              setOpenIndices((prev) =>
                prev.includes(index)
                  ? prev.filter((i) => i !== index)
                  : [...prev, index]
              );
            } else {
              setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
            }
          };

          return (
            <div className={cn("w-full border border-border", shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl", className)}>
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  isOpen={openIndices.includes(index)}
                  onClick={() => handleToggle(index)}
                  color={color}
                  shape={shape}
                  spacing={spacing}
                >
                  {item.content}
                </AccordionItem>
              ))}
            </div>
          );
        });
Accordion.displayName = "Accordion";
