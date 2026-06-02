/**
 * @registry-slug basic
 * @registry-name Basic Loader
 * @registry-description A Future UI Basic Loader component.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BasicLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "modern" | "clean" | "minimal";
  color?: string;
  text?: string;
}

export const BasicLoader: React.FC<BasicLoaderProps> = React.memo(({ 
          className, 
          variant = "modern", 
          color = "#3b82f6", 
          text, 
          ...props 
        }) => {
          
          const getLoader = () => {
            switch (variant) {
              case "modern":
                return (
                  <div className="relative w-16 h-16">
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-solid border-transparent"
                      style={{ borderTopColor: color }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full border-4 border-solid border-transparent opacity-50"
                      style={{ borderBottomColor: color }}
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
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                );
              case "minimal":
                return (
                  <motion.div
                    className="w-8 h-8 rounded-full border-2 border-solid border-transparent"
                    style={{ borderTopColor: color }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                );
              default:
                return (
                  <div 
                    className="w-10 h-10 border-4 border-solid border-muted-foreground/20 rounded-full border-t-current animate-spin" 
                    style={{ color }}
                  />
                );
            }
          };

          return (
            <div className={cn("flex flex-col justify-center items-center w-full h-full min-h-[inherit]", className)} {...props}>
              {getLoader()}
              {text && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 text-sm font-medium text-muted-foreground tracking-wide animate-pulse text-center"
                >
                  {text}
                </motion.p>
              )}
            </div>
          );
        });
BasicLoader.displayName = "BasicLoader";
