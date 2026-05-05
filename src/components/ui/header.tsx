"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import {
  Sun,
  Moon,
  Menu,
  X,
  Search as SearchIcon,
  ChevronRight,
  Square,
  MousePointerClick,
  Type,
  Loader2,
  GalleryHorizontal,
  Navigation,
  MessageSquare,
  Compass,
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { componentsList } from "@/data/component-library-data";

const GithubIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-4.5-2-7-2" />
  </svg>
);

const getComponentIcon = (type: string, slug: string) => {
  const t = type.toLowerCase();
  const s = slug.toLowerCase();
  if (s.includes("button")) return <MousePointerClick className="w-4 h-4" />;
  if (s.includes("card")) return <Square className="w-4 h-4" />;
  if (s.includes("text") || s.includes("typography"))
    return <Type className="w-4 h-4" />;
  if (s.includes("loader") || s.includes("spinner"))
    return <Loader2 className="w-4 h-4" />;
  if (s.includes("carousel") || s.includes("slider"))
    return <GalleryHorizontal className="w-4 h-4" />;
  if (s.includes("menu") || s.includes("nav"))
    return <Navigation className="w-4 h-4" />;
  if (s.includes("error") || s.includes("feedback") || s.includes("toast"))
    return <MessageSquare className="w-4 h-4" />;

  switch (t) {
    case "button":
      return <MousePointerClick className="w-4 h-4" />;
    case "cards":
      return <Square className="w-4 h-4" />;
    case "typography":
      return <Type className="w-4 h-4" />;
    case "loader":
      return <Loader2 className="w-4 h-4" />;
    case "carousel":
      return <GalleryHorizontal className="w-4 h-4" />;
    case "navigation":
      return <Navigation className="w-4 h-4" />;
    case "feedback":
      return <MessageSquare className="w-4 h-4" />;
    default:
      return <Compass className="w-4 h-4" />;
  }
};

const SearchBar = ({
  mobile = false,
  onClose = () => {},
}: {
  mobile?: boolean;
  onClose?: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return componentsList
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q),
      )
      .slice(0, 5);
  }, [query]);

  return (
    <div className={cn("relative w-full", !mobile && "w-48 lg:w-64")}>
      <div className="relative group">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={mobile ? "Search components..." : "Search... (Ctrl+K)"}
          className={cn(
            "w-full pl-10 pr-4 py-2 bg-muted/40 border border-border/50 rounded-full text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
            mobile && "py-3 bg-muted/50 rounded-xl",
          )}
        />
        {!mobile && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded-sm border border-border bg-background text-[10px] text-muted-foreground font-mono pointer-events-none">
            <span className="text-[8px]">⌘</span>K
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className={cn(
                "absolute top-full mt-2 left-0 right-0 z-50 bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl",
                mobile ? "max-h-75" : "w-75 lg:w-100",
              )}
            >
              <div className="p-2 flex flex-col">
                <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Recommendations
                </div>
                {results.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      router.push(
                        `/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`,
                      );
                      setIsOpen(false);
                      setQuery("");
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted transition-colors text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {getComponentIcon(item.type, item.slug)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold italic truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-tight">
                        {item.type}
                      </span>
                    </div>
                    <ChevronRight className="ml-auto w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))}
                <Link
                  href="/components"
                  onClick={() => {
                    setIsOpen(false);
                    onClose();
                  }}
                  className="mt-1 px-3 py-2 text-center text-xs font-bold text-primary hover:underline italic"
                >
                  View all components
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

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
        "fixed top-0 left-0 right-0 z-100 w-full h-16 border-b transition-colors duration-300",
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
            // Using logic that avoids triggering the lint if possible
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
          <SearchBar />

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
