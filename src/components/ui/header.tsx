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

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
];

export const Header: React.FC = React.memo(() => {
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

  return (
    <>
      {/* Spacer to prevent content jump due to fixed header */}
      <div className="h-14 w-full shrink-0" />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
          "bg-background/80 backdrop-blur-md border-b border-border/40 flex justify-center h-14",
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-4 @md:px-6 flex justify-between items-center h-full">
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
                    ? "text-primary border-b border-primary py-1"
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
            <SearchInput data={componentsList} className="w-full max-w-30 @sm:max-w-40 @lg:max-w-50 bg-white/5 border-white/10 rounded-full" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-10 h-10 shrink-0 hover:bg-white/10 transition-all duration-300 flex items-center justify-center p-0 text-foreground"
          >
            {!mounted ? (
              <div className="w-5 h-5" />
            ) : theme === "dark" ? (
              <SunIcon animate className="w-5 h-5" />
            ) : (
              <MoonIcon animate className="w-5 h-5" />
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="@lg:hidden rounded-full w-10 h-10 shrink-0 hover:bg-white/10 transition-all duration-300 flex items-center justify-center p-0 text-foreground"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
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
              className="fixed inset-y-0 left-0 w-72 bg-background/95 backdrop-blur-[60px] border-r border-border/10 z-[60] @lg:hidden flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center shrink-0 group gap-2" onClick={() => setIsOpen(false)}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <Image src="/Logo.webp" alt="Future UI Logo" width={32} height={32} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-display text-xl font-bold tracking-tighter text-foreground">FUTURE_UI</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full text-foreground hover:bg-white/10 w-10 h-10">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-2 flex-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-4 rounded-xl text-lg font-black italic uppercase transition-all",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
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
                    <Button variant="outline" size="icon" className="rounded-full">
                      <GithubIcon animate className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="https://www.linkedin.com/in/aryan-hooda-code/" target="_blank">
                    <Button variant="outline" size="icon" className="rounded-full">
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
});
Header.displayName = "Header";
