"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { SearchInput } from "./search-input";
import { GithubIcon } from "./github-icon";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
];

export const Header: React.FC = () => {
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-100 w-full h-16 border-b duration-300",
        "bg-background/80 backdrop-blur-xl border-border/80 shadow-sm",
      )}
    >
      <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center overflow-hidden transition-transform">
            <Image
              src="/Logo.webp"
              alt="Future UI Logo"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden sm:block text-xl font-black italic tracking-tighter uppercase">
            <span className="text-primary">Future</span> UI
          </span>
        </Link>

        {/* Middle: Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = mounted && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-[13px] font-bold italic uppercase tracking-widest transition-all duration-300",
                  isActive
                    ? "text-primary scale-105"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search, Actions, Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <SearchInput />

          <div className="flex items-center gap-1 md:gap-2">
            <Link
              href="https://github.com/Aryan3522/future-ui"
              target="_blank"
              className="hidden sm:block"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-9 h-9"
              >
                <GithubIcon className="w-5 h-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9"
            >
              {!mounted ? (
                <div className="w-5 h-5" />
              ) : theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden rounded-full w-9 h-9"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border lg:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {/* Mobile Links */}
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-4 rounded-xl text-lg font-black italic uppercase transition-all",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between px-4 pt-4 border-t border-border/50">
                <span className="text-sm font-bold text-muted-foreground uppercase italic tracking-widest">
                  Socials
                </span>
                <Link
                  href="https://github.com/Aryan3522/future-ui"
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full gap-2 font-bold italic"
                  >
                    <GithubIcon className="w-4 h-4" /> GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
