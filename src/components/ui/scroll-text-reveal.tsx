"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollTextRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  container?: React.RefObject<HTMLElement | null>;
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = React.memo(({ children, className, container, ...props }) => {
          const containerRef = useRef<HTMLSpanElement>(null);
          const { scrollYProgress } = useScroll({
            target: containerRef,
            container: container,
            offset: ["start 80%", "start 20%"],
          });

          if (typeof children !== "string") {
            return <span className={className} {...props}>{children}</span>;
          }

          const characters = children.split("");

          return (
            <span 
              ref={containerRef} 
              className={cn("inline-flex flex-wrap", className)} 
              {...props}
            >
              {characters.map((char, index) => {
                const start = index / characters.length;
                const end = start + (1 / characters.length);
                return (
                  <Character key={index} progress={scrollYProgress} range={[start, end]}>
                    {char === " " ? "\u00A0" : char}
                  </Character>
                );
              })}
            </span>
          );
        });
ScrollTextReveal.displayName = "ScrollTextReveal";

interface CharacterProps {
  children: React.ReactNode;
  progress: any;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const filter = useTransform(progress, range, ["blur(8px)", "blur(0px)"]);
  
  return (
    <motion.span 
      style={{ opacity, y, filter }}
      className="inline-block transition-none"
    >
      {children}
    </motion.span>
  );
};
