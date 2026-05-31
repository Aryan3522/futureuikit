/**
 * @registry-slug search-input
 * @registry-name Search Input
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, ChevronRight, Square, MousePointerClick, Type, Loader2, GalleryHorizontal, Navigation, MessageSquare, Compass, Rows3 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface SearchItem {
  id: string | number;
  title: string;
  type: string;
  slug: string;
  description: string;
}

const getComponentIcon = (type: string, slug: string) => {
  const t = type.toLowerCase();
  const s = slug.toLowerCase();
  if (s.includes("button")) return <MousePointerClick className="w-4 h-4" />;
  if (s.includes("card")) return <Square className="w-4 h-4" />;
  if (s.includes("accordion")) return <Rows3 className="w-4 h-4" />;
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

export interface SearchInputProps {
  data?: SearchItem[];
  mobile?: boolean;
  onClose?: () => void;
  className?: string;
  placeholder?: string;
  onItemSelect?: (item: SearchItem) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  data = [],
  mobile = false,
  onClose = () => {},
  className,
  placeholder,
  onItemSelect,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    
    checkViewport();
    window.addEventListener("resize", checkViewport);

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
    return () => {
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return data
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q),
      )
      .slice(0, 5);
  }, [query, data]);

  const activeMobile = mobile || isMobileViewport;

  return (
    <div className={cn("relative w-full", !activeMobile && "min-w-40 lg:min-w-60", className)}>
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
          placeholder={placeholder || (activeMobile ? "Search..." : "Search... (Ctrl+K)")}
          className={cn(
            "w-full pl-10 pr-4 py-2 bg-muted/40 border border-border/50 rounded-full text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
            activeMobile && "py-2 bg-muted/50",
          )}
        />
        {!activeMobile && (
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
                "absolute top-full mt-2 left-0 z-50 bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl",
                activeMobile ? "-right-25 w-70 sm:right-0 sm:w-full" : "w-75 lg:w-100",
              )}
            >
              <div className="p-2 flex flex-col">
                <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Recommendations
                </div>
                {results.map((item) => (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (onItemSelect) {
                        onItemSelect(item);
                      } else {
                        router.push(
                          `/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`,
                        );
                      }
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
                  </motion.button>
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
