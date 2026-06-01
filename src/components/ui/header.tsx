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
            <header
              className={cn(
                "fixed top-0 left-0 right-0 z-100 w-full h-16 border-b duration-300",
                "bg-background/80 backdrop-blur-xl border-border/80 shadow-sm",
              )}
            >
              <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between gap-4">
                {/* Left: Logo & Search */}
                <div className="flex items-center gap-3 md:gap-6 lg:w-[30%] shrink-0">
                  <Link href="/" className="flex items-center shrink-0 group">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                      <Image
                        src="/Logo.webp"
                        alt="Future UI Logo"
                        width={36}
                        height={36}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <SearchInput data={componentsList} className="w-full max-w-30 sm:max-w-50 lg:max-w-70" />
                </div>

                {/* Center: Links (Desktop) */}
                <nav className="hidden lg:flex flex-1 justify-center items-center gap-2">
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

                {/* Right: Actions & Mobile Toggle */}
                <div className="flex items-center gap-3 md:gap-6 lg:w-[30%] justify-end shrink-0">
                  <Link
                    href="https://github.com/Aryan3522/future-ui"
                    target="_blank"
                    className="hidden sm:block shrink-0"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full w-10 h-10 shrink-0 hover:bg-primary/10 transition-all duration-300 flex items-center justify-center p-0"
                    >
                      <GithubIcon animate className="w-5 h-5" />
                    </Button>
                  </Link>

                  <Link
                    href="https://www.linkedin.com/in/aryan-hooda-code/"
                    target="_blank"
                    className="hidden sm:block shrink-0"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full w-10 h-10 shrink-0 hover:bg-primary/10 transition-all duration-300 flex items-center justify-center p-0"
                    >
                      <LinkedinIcon animate className="w-5 h-5" />
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full w-10 h-10 shrink-0 hover:bg-primary/10 transition-all duration-300 flex items-center justify-center p-0"
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
                    className="lg:hidden rounded-full w-10 h-10 shrink-0 hover:bg-primary/10 transition-all duration-300 flex items-center justify-center p-0"
                  >
                    {isOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </Button>
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
                            <ChevronRightIcon className="w-5 h-5" />
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
                            <GithubIcon animate className="w-4 h-4" /> GitHub
                          </Button>
                        </Link>
                        <Link
                          href="https://www.linkedin.com/in/aryan-hooda-code/"
                          target="_blank"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full gap-2 font-bold italic"
                          >
                            <LinkedinIcon animate className="w-4 h-4" /> LinkedIn
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>
          );
        });
Header.displayName = "Header";
