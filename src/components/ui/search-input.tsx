/**
 * @registry-slug search-input
 * @registry-name Search Input
 * @registry-description A Future UI Search Input component.
 * @registry-category ui
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
import { cva, type VariantProps } from "class-variance-authority";

const searchInputVariants = cva(
  "w-full text-sm font-medium focus:outline-none transition-all",
  {
    variants: {
      variant: {
        default: "bg-background border border-border hover:border-foreground/20 transition-colors",
        minimal: "bg-transparent border-b border-border rounded-none bg-transparent shadow-none",
        glass: "bg-background/30 backdrop-blur-md border border-border/50 shadow-sm",
        pill: "bg-background border border-border shadow-sm",
      },
      color: {
        default: "focus:border-foreground focus:ring-1 focus:ring-foreground/20",
        blue: "focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600/20 dark:focus:ring-blue-500/20",
        emerald: "focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20",
        rose: "focus:border-rose-500 dark:focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20",
        amber: "focus:border-amber-500 dark:focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20",
        violet: "focus:border-violet-600 dark:focus:border-violet-500 focus:ring-1 focus:ring-violet-600/20",
        indigo: "focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-1 focus:ring-indigo-600/20",
        sky: "focus:border-sky-500 dark:focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20",
        slate: "focus:border-slate-600 dark:focus:border-slate-500 focus:ring-1 focus:ring-slate-600/20",
        orange: "focus:border-orange-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-3xl",
        sharp: "rounded-[2px]",
      },
      spacing: {
        default: "pl-10 pr-4 py-2 text-sm",
        "2x": "pl-8 pr-3 py-1 text-xs",
        "4x": "pl-10 pr-4 py-2 text-sm",
        "6x": "pl-12 pr-6 py-3 text-base",
        "8x": "pl-14 pr-8 py-4 text-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      color: "default",
      shape: "default",
      spacing: "default",
    },
  }
);

const dropdownVariants = cva(
  "absolute top-full left-0 z-50 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-background border border-border rounded-2xl shadow-xl mt-2",
        minimal: "bg-background border border-border rounded-none shadow-md mt-1",
        glass: "bg-background/40 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] mt-2",
        pill: "bg-background border border-border rounded-[2rem] shadow-xl mt-2 p-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

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

export interface SearchInputProps extends Omit<VariantProps<typeof searchInputVariants>, "color"> {
  data?: SearchItem[];
  mobile?: boolean;
  onClose?: () => void;
  className?: string;
  placeholder?: string;
  onItemSelect?: (item: SearchItem) => void;
  color?: "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
}

export const SearchInput: React.FC<SearchInputProps> = React.memo(({
          data = [],
          mobile = false,
          onClose = () => {},
          className,
          placeholder,
          onItemSelect,
          variant = "default",
          color = "default",
          shape = "default",
          spacing = "default",
        }) => {
          const [query, setQuery] = useState("");
          const [isOpen, setIsOpen] = useState(false);
          const [isMobileViewport, setIsMobileViewport] = useState(false);
          const inputRef = useRef<HTMLInputElement>(null);
          const router = useRouter();

          const activeColor = color;
          
          const iconColorMap = {
            default: "text-foreground group-hover:bg-muted",
            blue: "text-blue-600 dark:text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20",
            emerald: "text-emerald-600 dark:text-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20",
            rose: "text-rose-600 dark:text-rose-500 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20",
            amber: "text-amber-600 dark:text-amber-500 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/20",
            violet: "text-violet-600 dark:text-violet-500 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20",
            indigo: "text-indigo-600 dark:text-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20",
            sky: "text-sky-600 dark:text-sky-500 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20",
            slate: "text-slate-600 dark:text-slate-500 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/20",
            orange: "text-orange-600 dark:text-orange-500 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20",
          };
          
          const focusIconMap = {
            default: "group-focus-within:text-foreground",
            blue: "group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500",
            emerald: "group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-500",
            rose: "group-focus-within:text-rose-600 dark:group-focus-within:text-rose-500",
            amber: "group-focus-within:text-amber-600 dark:group-focus-within:text-amber-500",
            violet: "group-focus-within:text-violet-600 dark:group-focus-within:text-violet-500",
            indigo: "group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-500",
            sky: "group-focus-within:text-sky-600 dark:group-focus-within:text-sky-500",
            slate: "group-focus-within:text-slate-600 dark:group-focus-within:text-slate-500",
            orange: "group-focus-within:text-orange-600 dark:group-focus-within:text-orange-500",
          };

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
                <SearchIcon className={cn("absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors z-10 pointer-events-none", focusIconMap[activeColor])} />
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
                    searchInputVariants({ variant, color: activeColor, shape, spacing }),
                    "pl-10 text-foreground placeholder:text-muted-foreground",
                    variant === "glass" && "py-2.5 px-4 pl-10", // Slightly more breathing room for glass variant
                    activeMobile && "py-2.5 bg-background/50",
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
                        dropdownVariants({ variant }),
                        "w-full"
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
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-all", iconColorMap[activeColor])}>
                              {getComponentIcon(item.type, item.slug)}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-bold italic truncate text-foreground">
                                {item.title}
                              </span>
                              <span className="text-[10px] text-zinc-500 uppercase tracking-tight">
                                {item.type}
                              </span>
                            </div>
                            <ChevronRight className="ml-auto w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </motion.button>
                        ))}
                        <Link
                          href="/components"
                          onClick={() => {
                            setIsOpen(false);
                            onClose();
                          }}
                          className={cn("mt-1 px-3 py-2 text-center text-xs font-bold hover:underline italic", iconColorMap[activeColor].split(" ")[0])}
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
        });
SearchInput.displayName = "SearchInput";
