/**
 * @registry-slug accordion
 * @registry-name Accordion
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = React.memo(({
          title,
          children,
          isOpen,
          onClick,
          className,
        }) => {
          return (
            <div className={cn("border-b border-border/50 last:border-none", className)}>
              <motion.button
                whileTap={{ scale: 0.99 }}
                onClick={onClick}
                className="flex w-full items-center justify-between py-4 text-left transition-all hover:text-primary rounded-lg px-2 -mx-2 hover:bg-muted/50"
              >
                <span className="text-sm font-medium tracking-tight">{title}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
                    <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
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
}

export const Accordion: React.FC<AccordionProps> = React.memo(({
          items,
          allowMultiple = false,
          className,
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
            <div className={cn("w-full max-w-2xl mx-auto", className)}>
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  isOpen={openIndices.includes(index)}
                  onClick={() => handleToggle(index)}
                >
                  {item.content}
                </AccordionItem>
              ))}
            </div>
          );
        });
Accordion.displayName = "Accordion";
