"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

/** Click-to-copy install command pill for the hero. */
export function CopyCommand({ command = "npx futureuikit init", className }: { command?: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — leave the command visible for manual copy.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy command: ${command}`}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 font-mono text-xs sm:text-sm text-foreground/80 transition-all duration-300 hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
    >
      <Terminal className="size-3.5 text-violet-400" aria-hidden="true" />
      <span className="select-all">{command}</span>
      <span className="relative flex size-4 items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-emerald-400"
            >
              <Check className="size-3.5" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Copy className="size-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
