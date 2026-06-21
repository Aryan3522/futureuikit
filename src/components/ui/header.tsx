/**
 * @registry-slug header
 * @registry-name Header
 * @registry-description A Future UI Header component.
 * @registry-category ui
 * @registry-dependency framer-motion lucide-react
 */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import {
  Menu,
  X,
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { SearchInput } from "./search-input";
import { GithubIcon, LinkedinIcon, SunIcon, MoonIcon, ChevronRightIcon } from "@/icons";
import { componentsList } from "@/data/component-library-data";

export type HeaderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type HeaderShape = "default" | "square" | "rounded" | "sharp";
export type HeaderSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  color?: HeaderColor;
  shape?: HeaderShape;
  spacing?: HeaderSpacing;
}

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
];

const colorThemeMap: Record<HeaderColor, { text: string; border: string; bgSoft: string }> = {
  default: { text: "text-primary", border: "border-primary", bgSoft: "bg-primary/10" },
  blue: { text: "text-blue-600 dark:text-blue-500", border: "border-blue-600 dark:border-blue-500", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10" },
  emerald: { text: "text-emerald-600 dark:text-emerald-500", border: "border-emerald-600 dark:border-emerald-500", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10" },
  rose: { text: "text-rose-600 dark:text-rose-500", border: "border-rose-600 dark:border-rose-500", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10" },
  amber: { text: "text-amber-600 dark:text-amber-500", border: "border-amber-600 dark:border-amber-500", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10" },
  violet: { text: "text-violet-600 dark:text-violet-500", border: "border-violet-600 dark:border-violet-500", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10" },
  indigo: { text: "text-indigo-600 dark:text-indigo-500", border: "border-indigo-600 dark:border-indigo-500", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10" },
  sky: { text: "text-sky-600 dark:text-sky-500", border: "border-sky-600 dark:border-sky-500", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10" },
  slate: { text: "text-slate-600 dark:text-slate-400", border: "border-slate-600 dark:border-slate-500", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10" },
  orange: { text: "text-orange-600 dark:text-orange-500", border: "border-orange-600 dark:border-orange-500", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10" },
};

const getShapeClass = (shape: HeaderShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-lg";
    case "default": return "rounded-full"; // Icons/buttons default
  }
};

const getMobileNavShapeClass = (shape: HeaderShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-l-md";
    case "rounded": return "rounded-l-2xl";
    case "default": return "rounded-none";
  }
};

const getSpacingClass = (spacing: HeaderSpacing) => {
  switch (spacing) {
    case "2x": return "h-12 px-2 @md:px-4";
    case "4x": return "h-14 px-4 @md:px-6";
    case "6x": return "h-16 px-6 @md:px-8";
    case "8x": return "h-20 px-8 @md:px-10";
    default: return "h-14 px-4 @md:px-6";
  }
};

const getHeightClass = (spacing: HeaderSpacing) => {
  switch (spacing) {
    case "2x": return "h-12";
    case "4x": return "h-14";
    case "6x": return "h-16";
    case "8x": return "h-20";
    default: return "h-14";
  }
};

export const Header = React.memo(React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, color = "default", shape = "default", spacing = "default", ...props }, ref) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme() as {
    theme: string;
    toggleTheme: () => void;
  };
  const pathname = usePathname();

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  const activeTheme = colorThemeMap[color];
  const shapeClass = getShapeClass(shape);
  const mobileNavShapeClass = getMobileNavShapeClass(shape);
  const spacingClass = getSpacingClass(spacing);
  const heightClass = getHeightClass(spacing);

  return (
    <>
      {/* Spacer to prevent content jump due to fixed header */}
      <div className={cn("w-full shrink-0", heightClass)} />
      <header
        ref={ref}
        {...props}
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
          "bg-background/80 backdrop-blur-md border-b border-border/40 flex justify-center",
          heightClass,
          className
        )}
      >
        <div className={cn("w-full max-w-7xl mx-auto flex justify-between items-center h-full", spacingClass)}>
          {/* Left: Logo */}
          <div className="flex items-center gap-2 flex-1">
            <Link href="/" className="flex items-center shrink-0 group gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                <Image
                  src="/Logo.webp"
                  alt="Future UI Logo"
                  width={32}
                  height={32}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display text-xl font-bold tracking-tighter text-foreground hidden @sm:block">FUTURE_UI</span>
            </Link>
          </div>

        {/* Center: Links (Desktop) */}
        <nav className="hidden @lg:flex justify-center items-center gap-8">
          {navItems.map((item) => {
            const isActive = mounted && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-display text-base transition-all duration-300",
                  isActive
                    ? cn(activeTheme.text, "border-b py-1", activeTheme.border)
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions & Mobile Toggle */}
        <div className="flex items-center gap-3 justify-end shrink-0 flex-1">
          <div className="hidden @sm:block">
            <SearchInput
              data={componentsList}
              variant="default"
              shape={shape}
              className="w-full max-w-30 @sm:max-w-40 @lg:max-w-50"
            />
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={cn(
              "w-9 h-9 shrink-0 flex items-center justify-center",
              "bg-background",
              "ring-1 ring-border",
              "hover:bg-muted",
              "text-muted-foreground",
              "hover:text-foreground",
              "transition-all duration-200",
              shapeClass
            )}
          >
            {!mounted ? (
              <div className="w-4 h-4" />
            ) : theme === "dark" ? (
              <SunIcon animate className="w-4 h-4" />
            ) : (
              <MoonIcon animate className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className={cn(
              "@lg:hidden w-9 h-9 shrink-0 flex items-center justify-center",
              "bg-background",
              "ring-1 ring-border",
              "hover:bg-muted",
              "text-muted-foreground",
              "hover:text-foreground",
              "transition-all duration-200",
              shapeClass
            )}
          >
            {isOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
        </div>
      </header>
      
      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] @lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn("fixed inset-y-0 left-0 w-72 bg-background/95 backdrop-blur-[60px] border-r border-border/10 z-[60] @lg:hidden flex flex-col p-6", mobileNavShapeClass)}
            >
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center shrink-0 group gap-2" onClick={() => setIsOpen(false)}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <Image src="/Logo.webp" alt="Future UI Logo" width={32} height={32} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-display text-xl font-bold tracking-tighter text-foreground">FUTURE_UI</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className={cn(
                    "w-9 h-9 flex items-center justify-center",
                    "bg-background",
                    "ring-1 ring-border",
                    "hover:bg-muted",
                    "text-muted-foreground",
                    "hover:text-foreground",
                    "transition-all duration-200",
                    shapeClass
                  )}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-2 flex-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-4 text-lg font-black italic uppercase transition-all",
                      shapeClass,
                      pathname === item.href
                        ? cn(activeTheme.bgSoft, activeTheme.text)
                        : "hover:bg-white/5 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <ChevronRightIcon className="w-5 h-5" />
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
                <span className="text-sm font-bold text-muted-foreground uppercase italic tracking-widest text-center">
                  Socials
                </span>
                <div className="flex items-center justify-center gap-4">
                  <Link href="https://github.com/Aryan3522/future-ui" target="_blank">
                    <Button variant="outline"  className={shapeClass}>
                      <GithubIcon animate className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="https://www.linkedin.com/in/aryan-hooda-code/" target="_blank">
                    <Button variant="outline"  className={shapeClass}>
                      <LinkedinIcon animate className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}));
Header.displayName = "Header";
