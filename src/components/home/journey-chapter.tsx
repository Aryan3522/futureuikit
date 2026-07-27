"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Chapter heading for the homepage journey — an oversized ghost number, a
 * tracked eyebrow, and a reveal-on-scroll headline. Pure DOM + one spring;
 * effectively free on low-end devices.
 */
export function JourneyChapter({
  number,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mb-14 flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-14 select-none font-mono text-[8rem] md:text-[11rem] font-black leading-none text-foreground/[0.04]",
          align === "center" ? "left-1/2 -translate-x-1/2" : "-left-4"
        )}
      >
        {number}
      </span>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative font-mono-label text-xs uppercase tracking-[0.3em] text-violet-400"
      >
        {number} — {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
        className="relative font-display text-4xl md:text-5xl font-light tracking-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          className={cn("relative font-display text-muted-foreground max-w-xl leading-relaxed", align === "center" && "mx-auto")}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/** Thin scroll-progress line fixed to the viewport edge. */
export function JourneyProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 bottom-0 z-40 hidden lg:block w-px bg-border/30" aria-hidden="true">
      <div
        className="w-px bg-gradient-to-b from-violet-500 to-sky-500 origin-top transition-transform duration-150 ease-out h-full"
        style={{ transform: `scaleY(${progress})` }}
      />
    </div>
  );
}
