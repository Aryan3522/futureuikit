"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Menu, X, Home, Compass, BookOpen, Code, type LucideIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Docs", href: "/docs", icon: BookOpen },
  { label: "Components", href: "/components", icon: Compass },
];

export const PillHeader: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme() as { theme: string; toggleTheme: () => void };
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <nav
        className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-background/70 backdrop-blur-xl border border-border/50 shadow-2xl max-w-full pointer-events-auto"
      >
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2 mr-2 md:mr-4 px-1 md:px-2">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black italic text-xs md:text-sm">
            F
          </div>
          <span className="font-black italic tracking-tighter text-sm md:text-base hidden xs:block">FUTURE UI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = mounted && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all relative",
                  isActive 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1 ml-auto md:ml-2">
          <Link href={process.env.NEXT_PUBLIC_GITHUB_REPO || "https://github.com/Aryan3522/future-ui"} target="_blank" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 md:w-9 md:h-9">
              <Code className="w-4 h-4" />
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-8 h-8 md:w-9 md:h-9"
          >
            {!mounted ? (
              <div className="w-4 h-4" />
            ) : theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-full w-8 h-8"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute top-16 left-4 right-4 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-3xl p-6 shadow-2xl md:hidden pointer-events-auto"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-5 py-4 rounded-2xl text-lg font-bold italic transition-all",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground shadow-lg scale-[1.02]"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <div className="h-[1px] bg-border/50 my-2" />
              <Link
                href={process.env.NEXT_PUBLIC_GITHUB_REPO || "https://github.com/Aryan3522/future-ui"}
                target="_blank"
                className="flex items-center gap-3 px-5 py-4 rounded-2xl text-lg font-bold italic text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <Code className="w-5 h-5" />
                GitHub Source
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
