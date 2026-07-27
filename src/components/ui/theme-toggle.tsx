/**
 * @registry-slug theme-toggle
 * @registry-name Theme Toggle
 * @registry-description An animated dark/light mode toggle that flips the `dark` class and persists the choice.
 * @registry-category utility
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "fui-theme";

const toggleVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden border border-border/60 text-foreground transition-colors duration-300 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
  {
    variants: {
      size: {
        sm: "h-8 w-8 [&_svg]:size-4",
        md: "h-10 w-10 [&_svg]:size-[18px]",
        lg: "h-12 w-12 [&_svg]:size-5",
      },
      shape: {
        default: "rounded-xl",
        square: "rounded-none",
        rounded: "rounded-full",
        sharp: "rounded-[2px]",
      },
    },
    defaultVariants: { size: "md", shape: "default" },
  }
);

export interface ThemeToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  /** Called after the theme changes with the new mode. */
  onThemeChange?: (theme: "light" | "dark") => void;
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, size, shape, onThemeChange, onClick, ...props }, ref) => {
    const [mounted, setMounted] = React.useState(false);
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      const next = !isDark;
      setIsDark(next);
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        // Storage may be unavailable (private mode); the toggle still works for the session.
      }
      onThemeChange?.(next ? "dark" : "light");
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggle}
        className={cn(toggleVariants({ size, shape }), className)}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {mounted && (
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="flex items-center justify-center"
            >
              {isDark ? <Moon /> : <Sun />}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }
);
ThemeToggle.displayName = "ThemeToggle";

/**
 * Inline script snippet you can place in your root layout <head> to apply the
 * persisted theme before hydration and avoid a flash of the wrong theme.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export { ThemeToggle, themeInitScript };
