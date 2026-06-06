"use client";

/**
 * @registry-slug macos-browser
 * @registry-name macOS Browser
 * @registry-description A premium, highly interactive macOS Safari-style browser window component with a functional Home Screen and Favourites.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  X,
  Minus,
  Maximize2,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Plus,
  Lock,
  Search,
  Sidebar,
  Share,
  LayoutGrid,
  Trash2,
} from "lucide-react";

type WindowState = "default" | "maximized" | "minimized";

export interface TabData {
  id: string;
  title: string;
  url: string;
  content?: React.ReactNode;
}

export interface FavouriteData {
  id: string;
  title: string;
  url: string;
  icon?: React.ReactNode;
}

export interface MacOsBrowserProps {
  /** Initial tabs to render */
  initialTabs?: TabData[];
  /** React children to render in the default active tab if initialTabs is not provided */
  children?: React.ReactNode;
  /** Initial URL for the default tab if initialTabs is not provided */
  url?: string;
  /** Title for the default tab if initialTabs is not provided */
  title?: string;
  /** The default search engine to simulate when a non-url query is typed */
  searchEngine?: "google" | "brave" | "duckduckgo" | "bing" | "safari";
  /** If true, renders the window inline within the DOM rather than a detached portal */
  inline?: boolean;
  className?: string;
  contentClassName?: string;
  onClose?: () => void;
}

const DEFAULT_TAB: TabData = {
  id: "tab-1",
  title: "Start Page",
  url: "",
};

const INITIAL_FAVOURITES: FavouriteData[] = [
  { id: "fav-1", title: "Apple", url: "https://apple.com" },
  { id: "fav-2", title: "Future UI", url: "https://futureuikit.com" },
  { id: "fav-3", title: "GitHub", url: "https://github.com" },
  { id: "fav-4", title: "Vercel", url: "https://vercel.com" },
];

export const MacOsBrowser = React.memo(
  React.forwardRef<HTMLDivElement, MacOsBrowserProps>(
    (
      {
        initialTabs,
        children,
        url = "",
        title = "Start Page",
        searchEngine = "google",
        inline = false,
        className,
        contentClassName,
        onClose,
        ...props
      },
      ref
    ) => {
      // ─────────────────────────────────────────────────────────────────────────────
      // BROWSER STATE
      // ─────────────────────────────────────────────────────────────────────────────
      const [tabs, setTabs] = React.useState<TabData[]>(
        initialTabs ?? [{ id: "tab-1", title, url, content: children }]
      );
      const [activeTabId, setActiveTabId] = React.useState<string>(
        tabs[0]?.id || "tab-1"
      );
      const [history, setHistory] = React.useState<Record<string, string[]>>({});
      const [forwardHistory, setForwardHistory] = React.useState<Record<string, string[]>>({});
      const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
      const [urlInput, setUrlInput] = React.useState<string>("");
      const [isFocused, setIsFocused] = React.useState(false);

      const [favourites, setFavourites] = React.useState<FavouriteData[]>(INITIAL_FAVOURITES);
      const [isEditingFavs, setIsEditingFavs] = React.useState(false);

      const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

      // Sync URL input with active tab URL when switching tabs
      React.useEffect(() => {
        if (activeTab) {
          setUrlInput(activeTab.url);
        }
      }, [activeTab?.id, activeTab?.url]);

      // ─────────────────────────────────────────────────────────────────────────────
      // WINDOW STATE & RESIZE ENGINE
      // ─────────────────────────────────────────────────────────────────────────────
      const [windowState, setWindowState] = React.useState<WindowState>("default");
      const [mounted, setMounted] = React.useState(false);
      const [rect, setRect] = React.useState<{
        top: number;
        left: number;
        width: number;
        height: number;
      } | null>(null);
      const [customRect, setCustomRect] = React.useState<{
        top: number;
        left: number;
        width: number;
        height: number;
      } | null>(null);
      const [maximizedScroll, setMaximizedScroll] = React.useState({ x: 0, y: 0 });
      const [isInteracting, setIsInteracting] = React.useState(false);

      const placeholderRef = React.useRef<HTMLDivElement>(null);
      const interactionRef = React.useRef({
        startX: 0,
        startY: 0,
        startRect: { top: 0, left: 0, width: 0, height: 0 },
        type: "" as "drag" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | "",
      });

      const isMaximized = windowState === "maximized";
      const activeRect = customRect || rect;

      // Handle Escape Key and Body Overflow for Maximized State
      React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
          if (e.key === "Escape" && isMaximized) setWindowState("default");
        };
        if (isMaximized && !inline) {
          window.addEventListener("keydown", handleEsc);
          document.body.style.overflow = "hidden";
        }
        return () => {
          window.removeEventListener("keydown", handleEsc);
          document.body.style.overflow = "";
        };
      }, [isMaximized, inline]);

      React.useEffect(() => {
        setMounted(true);
      }, []);

      const updatePosition = React.useCallback(() => {
        if (placeholderRef.current && !inline) {
          const r = placeholderRef.current.getBoundingClientRect();
          setRect({
            top: r.top + window.scrollY,
            left: r.left + window.scrollX,
            width: r.width,
            height: r.height,
          });
        }
      }, [inline]);

      React.useLayoutEffect(() => {
        if (!mounted || inline) return;
        updatePosition();
        window.addEventListener("resize", updatePosition);
        const observer = new ResizeObserver(updatePosition);
        if (placeholderRef.current) observer.observe(placeholderRef.current);

        return () => {
          window.removeEventListener("resize", updatePosition);
          observer.disconnect();
        };
      }, [mounted, inline, updatePosition]);

      // Drag / Resize Logic
      const startInteraction = React.useCallback(
        (
          e: React.PointerEvent,
          type: "drag" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"
        ) => {
          if (inline || !activeRect || isMaximized || windowState === "minimized") return;

          e.preventDefault();
          e.stopPropagation();

          const currentRect = customRect ? { ...customRect } : { ...activeRect };
          if (!customRect) setCustomRect(currentRect);

          interactionRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            startRect: currentRect,
            type,
          };

          setIsInteracting(true);
          document.body.style.userSelect = "none";
          if (type === "drag") document.body.style.cursor = "grabbing";
        },
        [activeRect, customRect, isMaximized, windowState, inline]
      );

      React.useEffect(() => {
        if (!isInteracting) return;

        let animationFrameId: number;

        const handlePointerMove = (e: PointerEvent) => {
          animationFrameId = requestAnimationFrame(() => {
            const { startX, startY, startRect, type } = interactionRef.current;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            let newTop = startRect.top;
            let newLeft = startRect.left;
            let newWidth = startRect.width;
            let newHeight = startRect.height;

            const MIN_WIDTH = 400;
            const MIN_HEIGHT = 300;

            if (type === "drag") {
              newTop = Math.max(0, startRect.top + dy);
              newLeft = startRect.left + dx;
              const maxLeft = window.innerWidth - 100;
              if (newLeft > maxLeft) newLeft = maxLeft;
              if (newLeft + newWidth < 100) newLeft = 100 - newWidth;
            } else {
              if (type.includes("n")) {
                const maxDy = startRect.height - MIN_HEIGHT;
                const clampedDy = Math.min(dy, maxDy);
                newTop = startRect.top + clampedDy;
                newHeight = startRect.height - clampedDy;
              }
              if (type.includes("s")) {
                newHeight = Math.max(MIN_HEIGHT, startRect.height + dy);
              }
              if (type.includes("w")) {
                const maxDx = startRect.width - MIN_WIDTH;
                const clampedDx = Math.min(dx, maxDx);
                newLeft = startRect.left + clampedDx;
                newWidth = startRect.width - clampedDx;
              }
              if (type.includes("e")) {
                newWidth = Math.max(MIN_WIDTH, startRect.width + dx);
              }
            }

            setCustomRect({ top: newTop, left: newLeft, width: newWidth, height: newHeight });
          });
        };

        const handlePointerUp = () => {
          setIsInteracting(false);
          document.body.style.userSelect = "";
          document.body.style.cursor = "";
          cancelAnimationFrame(animationFrameId);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
        window.addEventListener("pointercancel", handlePointerUp);

        return () => {
          window.removeEventListener("pointermove", handlePointerMove);
          window.removeEventListener("pointerup", handlePointerUp);
          window.removeEventListener("pointercancel", handlePointerUp);
          cancelAnimationFrame(animationFrameId);
        };
      }, [isInteracting]);

      // ─────────────────────────────────────────────────────────────────────────────
      // BROWSER ACTIONS
      // ─────────────────────────────────────────────────────────────────────────────
      const handleAddTab = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const newTabId = `tab-${Date.now()}`;
        const newTab: TabData = { ...DEFAULT_TAB, id: newTabId };
        setTabs([...tabs, newTab]);
        setActiveTabId(newTabId);
      };

      const handleCloseTab = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (tabs.length === 1) return; // Prevent closing last tab
        const newTabs = tabs.filter((t) => t.id !== id);
        setTabs(newTabs);
        if (activeTabId === id) {
          setActiveTabId(newTabs[newTabs.length - 1].id);
        }
      };

      const executeNavigation = (targetUrl: string) => {
        if (!activeTab) return;

        let finalUrl = targetUrl.trim();
        if (!finalUrl) return;

        // Search engine logic
        if (!finalUrl.includes(".") && !finalUrl.startsWith("localhost")) {
          const query = encodeURIComponent(finalUrl);
          switch (searchEngine) {
            case "safari":
            case "google":
              finalUrl = `https://www.google.com/search?q=${query}&igu=1`;
              break;
            case "brave":
              finalUrl = `https://search.brave.com/search?q=${query}`;
              break;
            case "duckduckgo":
              finalUrl = `https://duckduckgo.com/?q=${query}`;
              break;
            case "bing":
              finalUrl = `https://www.bing.com/search?q=${query}`;
              break;
          }
        } else {
          if (!finalUrl.startsWith("http")) {
            finalUrl = `https://${finalUrl}`;
          }
          // specific bypass for Google since it's the most common test case and uses X-Frame-Options
          if (finalUrl.match(/^https?:\/\/(www\.)?google\.[a-z.]+\/?$/)) {
            finalUrl = "https://www.google.com/webhp?igu=1";
          } else if (finalUrl.includes("google.") && finalUrl.includes("/search")) {
            if (!finalUrl.includes("igu=1")) {
              finalUrl += (finalUrl.includes("?") ? "&" : "?") + "igu=1";
            }
          }
        }

        setUrlInput(finalUrl);

        // Record history
        setHistory((prev) => ({
          ...prev,
          [activeTabId]: [...(prev[activeTabId] || []), activeTab.url],
        }));
        setForwardHistory((prev) => ({
          ...prev,
          [activeTabId]: [], // Clear forward history
        }));

        setTabs((prev) =>
          prev.map((t) =>
            t.id === activeTabId
              ? { ...t, url: finalUrl, title: finalUrl }
              : t
          )
        );
      };

      const handleNavigate = (e: React.FormEvent) => {
        e.preventDefault();
        executeNavigation(urlInput);
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          executeNavigation(urlInput);
        }
      };

      const handleBack = () => {
        const tabHistory = history[activeTabId];
        if (tabHistory && tabHistory.length > 0) {
          const previousUrl = tabHistory[tabHistory.length - 1];
          setHistory((prev) => ({
            ...prev,
            [activeTabId]: tabHistory.slice(0, -1),
          }));
          setForwardHistory((prev) => ({
            ...prev,
            [activeTabId]: [...(prev[activeTabId] || []), activeTab.url],
          }));
          setTabs((prev) =>
            prev.map((t) =>
              t.id === activeTabId
                ? { ...t, url: previousUrl, title: previousUrl }
                : t
            )
          );
        }
      };

      const handleForward = () => {
        const tabForward = forwardHistory[activeTabId];
        if (tabForward && tabForward.length > 0) {
          const nextUrl = tabForward[tabForward.length - 1];
          setForwardHistory((prev) => ({
            ...prev,
            [activeTabId]: tabForward.slice(0, -1),
          }));
          setHistory((prev) => ({
            ...prev,
            [activeTabId]: [...(prev[activeTabId] || []), activeTab.url],
          }));
          setTabs((prev) =>
            prev.map((t) =>
              t.id === activeTabId
                ? { ...t, url: nextUrl, title: nextUrl }
                : t
            )
          );
        }
      };

      const handleShare = async () => {
        if (!activeTab) return;
        const shareData = {
          title: activeTab.title,
          url: activeTab.url || "https://future-ui.com",
        };
        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {}
        } else {
          navigator.clipboard.writeText(shareData.url);
        }
      };

      // Favourites Management
      const removeFavourite = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setFavourites((prev) => prev.filter((f) => f.id !== id));
      };

      const addFavourite = () => {
        const newFav: FavouriteData = {
          id: `fav-${Date.now()}`,
          title: "New Favourite",
          url: "https://example.com",
        };
        setFavourites([...favourites, newFav]);
      };

      // ─────────────────────────────────────────────────────────────────────────────
      // RENDERING
      // ─────────────────────────────────────────────────────────────────────────────
      if (!mounted) return null;

      const windowClasses = cn(
        "flex flex-col bg-white dark:bg-[#1e1e1e] overflow-hidden transform-gpu",
        "border border-black/10 dark:border-white/10 transition-shadow duration-300",
        inline && isMaximized
          ? "fixed inset-0 w-screen h-screen z-[2147483647] rounded-none shadow-2xl"
          : inline
          ? "relative w-full h-full rounded-xl shadow-xl ring-1 ring-black/5"
          : "rounded-xl",
        customRect && !inline
          ? "shadow-2xl shadow-black/30 dark:shadow-black/70 ring-1 ring-black/10 dark:ring-white/10"
          : !inline
          ? "shadow-2xl shadow-black/20 dark:shadow-black/50"
          : "",
        windowState === "minimized" && "opacity-0 scale-95 pointer-events-none"
      );

      const premiumSpring = { type: "spring" as const, stiffness: 400, damping: 40, mass: 0.8 };

      const windowElement = (
        <motion.div
          layout={inline}
          initial={false}
          animate={
            inline
              ? {} // Layout handles the transition for inline
              : isMaximized
              ? {
                  top: maximizedScroll.y,
                  left: maximizedScroll.x,
                  width: "100vw",
                  height: "100vh",
                  borderRadius: 0,
                  margin: 0,
                }
              : {
                  top: activeRect?.top ?? 0,
                  left: activeRect?.left ?? 0,
                  width: activeRect?.width ?? 0,
                  height: activeRect?.height ?? 0,
                  borderRadius: 12,
                  margin: 0,
                }
          }
          transition={isInteracting ? { type: "tween", duration: 0 } : premiumSpring}
          className={windowClasses}
          style={{
            position: inline ? (isMaximized ? "fixed" : "relative") : "absolute",
            pointerEvents: "auto",
          }}
          {...props}
        >
          {/* Resize Handles */}
          {!inline && !isMaximized && windowState !== "minimized" && (
            <>
              <div className="absolute top-0 left-0 w-full h-1.5 cursor-ns-resize z-[60]" onPointerDown={(e) => startInteraction(e, "n")} />
              <div className="absolute bottom-0 left-0 w-full h-1.5 cursor-ns-resize z-[60]" onPointerDown={(e) => startInteraction(e, "s")} />
              <div className="absolute top-0 left-0 w-1.5 h-full cursor-ew-resize z-[60]" onPointerDown={(e) => startInteraction(e, "w")} />
              <div className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize z-[60]" onPointerDown={(e) => startInteraction(e, "e")} />
              <div className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-[70]" onPointerDown={(e) => startInteraction(e, "nw")} />
              <div className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-[70]" onPointerDown={(e) => startInteraction(e, "ne")} />
              <div className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-[70]" onPointerDown={(e) => startInteraction(e, "sw")} />
              <div className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-[70]" onPointerDown={(e) => startInteraction(e, "se")} />
            </>
          )}

          {/* Safari macOS Header */}
          <div className="flex flex-col w-full shrink-0 bg-[#f5f5f7]/80 dark:bg-[#2b2b2d]/80 backdrop-blur-xl z-50 border-b border-black/5 dark:border-white/5">
            {/* Toolbar (Traffic Lights + Nav + Address Bar + Extensions) */}
            <div
              className="flex items-center px-4 h-14 gap-4"
              onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("input")) return;
                startInteraction(e, "drag");
              }}
              style={{ cursor: inline || isMaximized ? "default" : isInteracting && interactionRef.current.type === "drag" ? "grabbing" : "grab" }}
            >
              {/* Traffic Lights */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); onClose ? onClose() : setWindowState("default"); }}
                  className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10 hover:brightness-110 flex items-center justify-center group"
                >
                  <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" strokeWidth={3} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setWindowState(windowState === "minimized" ? "default" : "minimized"); }}
                  className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/10 hover:brightness-110 flex items-center justify-center group"
                >
                  <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" strokeWidth={3} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isMaximized) {
                      setMaximizedScroll({ x: window.scrollX, y: window.scrollY });
                      setWindowState("maximized");
                    } else {
                      setWindowState("default");
                    }
                  }}
                  className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10 hover:brightness-110 flex items-center justify-center group"
                >
                  <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" strokeWidth={3} />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-30"
                >
                  <Sidebar className="w-4 h-4 text-foreground/70" strokeWidth={2} />
                </button>
                <div className="flex gap-0.5">
                  <button 
                    onClick={handleBack}
                    disabled={!(history[activeTabId]?.length > 0)}
                    className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 text-foreground/70" strokeWidth={2} />
                  </button>
                  <button 
                    onClick={handleForward}
                    disabled={!(forwardHistory[activeTabId]?.length > 0)}
                    className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowRight className="w-4 h-4 text-foreground/70" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Address Bar (Centered) */}
              <div className="flex-1 max-w-xl mx-auto flex justify-center">
                <form
                  onSubmit={handleNavigate}
                  className={cn(
                    "flex items-center gap-2 h-8 px-3 rounded-md bg-white/60 dark:bg-black/30 border border-black/10 dark:border-white/10 transition-all w-full max-w-[400px] shadow-sm",
                    isFocused && "ring-4 ring-primary/20 border-primary/40 bg-white dark:bg-black/50 max-w-full"
                  )}
                >
                  {urlInput && !isFocused && urlInput.startsWith("https") ? (
                    <Lock className="w-3 h-3 text-foreground/50 shrink-0" strokeWidth={1.5} />
                  ) : !urlInput && !isFocused ? (
                    <Search className="w-3 h-3 text-foreground/50 shrink-0" strokeWidth={1.5} />
                  ) : null}
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search or enter website name"
                    className="flex-1 bg-transparent border-none outline-none text-[13px] text-center focus:text-left text-foreground placeholder:text-foreground/40 w-full"
                  />
                  {urlInput && !isFocused && (
                    <button type="button" onClick={() => executeNavigation(urlInput)} className="shrink-0 hover:bg-black/5 rounded p-0.5">
                      <RefreshCw className="w-3 h-3 text-foreground/50" strokeWidth={1.5} />
                    </button>
                  )}
                </form>
              </div>

              {/* Right Tools */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleShare}
                  className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <Share className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                </button>
                <button
                  onClick={handleAddTab}
                  className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                  <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Separate Tabs Row */}
            <div className="flex items-end px-3 h-10 gap-1 bg-transparent overflow-x-hidden -mb-px">
              <Reorder.Group
                axis="x"
                values={tabs}
                onReorder={setTabs}
                className="flex items-end h-full gap-[2px] w-full"
              >
                <AnimatePresence initial={false}>
                  {tabs.map((tab) => {
                    const isActive = tab.id === activeTabId;
                    return (
                      <Reorder.Item
                        key={tab.id}
                        value={tab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, width: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        className={cn(
                          "group relative flex items-center gap-2 h-[34px] px-3 min-w-[140px] max-w-[220px] rounded-t-lg text-[13px] font-medium transition-colors select-none cursor-default border border-b-0",
                          isActive
                            ? "bg-white dark:bg-[#1e1e1e] border-black/10 dark:border-white/10 text-foreground z-10"
                            : "bg-transparent border-transparent text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                        )}
                        onPointerDown={(e) => { e.stopPropagation(); setActiveTabId(tab.id); }}
                      >
                        <span className="truncate flex-1 text-center">
                          {tab.title || tab.url.replace(/^https?:\/\//, "") || "Start Page"}
                        </span>
                        <button
                          onPointerDown={(e) => handleCloseTab(e, tab.id)}
                          className={cn(
                            "absolute left-2 w-4 h-4 rounded-md flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 shrink-0 transition-opacity",
                            tabs.length === 1 ? "opacity-0 pointer-events-none" : "opacity-0 hover:opacity-100 group-hover:opacity-100"
                          )}
                        >
                          <X className="w-3 h-3" strokeWidth={2} />
                        </button>
                      </Reorder.Item>
                    );
                  })}
                </AnimatePresence>
              </Reorder.Group>
            </div>
          </div>

            {/* Content Area */}
            <div className="absolute inset-0 w-full h-full overflow-hidden mt-[104px] flex">
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    className="h-full border-r border-black/5 dark:border-white/5 bg-[#f5f5f5]/50 dark:bg-[#1e1e1e]/50 backdrop-blur-md overflow-hidden shrink-0 flex flex-col"
                  >
                    <div className="p-4 flex flex-col gap-4 w-[240px]">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-2">Bookmarks</div>
                      <div className="flex flex-col gap-1">
                        {favourites.map((fav) => (
                          <div 
                            key={`sidebar-${fav.id}`} 
                            className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors" 
                            onClick={() => executeNavigation(fav.url)}
                          >
                            <div className="w-6 h-6 flex items-center justify-center bg-white dark:bg-white/10 rounded shadow-sm overflow-hidden text-[10px]">
                              {fav.icon || fav.title.charAt(0)}
                            </div>
                            <span className="text-sm font-medium truncate">{fav.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="relative flex-1 h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 w-full h-full overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full"
                    style={{ colorScheme: "light dark" }}
                  >
                {activeTab.content ? (
                  activeTab.content
                ) : activeTab.url ? (
                  <iframe
                    src={activeTab.url}
                    className="w-full h-full border-none bg-white dark:bg-transparent"
                    title={activeTab.title}
                    sandbox="allow-scripts allow-same-origin"
                    style={{ colorScheme: "light dark" }}
                  />
                ) : (
                  /* MacOS Safari Home Screen */
                  <div className="w-full h-full min-h-full flex flex-col items-center p-8 sm:p-12 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:from-[#2a2a2c] dark:to-[#1e1e1e]">
                    <div className="w-full max-w-4xl space-y-12">
                      {/* Favourites Section */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold text-foreground/80 tracking-tight">Favorites</h2>
                          <button 
                            onClick={() => setIsEditingFavs(!isEditingFavs)}
                            className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            {isEditingFavs ? "Done" : "Edit"}
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 gap-y-8">
                          <AnimatePresence>
                            {favourites.map((fav) => (
                              <motion.div
                                key={fav.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative flex flex-col items-center gap-2 group cursor-pointer"
                                onClick={() => {
                                  if (!isEditingFavs) executeNavigation(fav.url);
                                }}
                              >
                                {isEditingFavs && (
                                  <button
                                    onClick={(e) => removeFavourite(fav.id, e)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center z-10 shadow-sm hover:scale-110 transition-transform"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                                  {fav.icon ? (
                                    fav.icon
                                  ) : (
                                    <img 
                                      src={`https://www.google.com/s2/favicons?domain=${fav.url}&sz=64`}
                                      alt={fav.title}
                                      className="w-10 h-10 rounded-md"
                                      onError={(e) => {
                                        (e.currentTarget as any).style.display = 'none';
                                        (e.currentTarget.nextElementSibling as any).style.display = 'block';
                                      }}
                                    />
                                  )}
                                  <span className="hidden text-2xl font-bold text-foreground/20 uppercase">
                                    {fav.title.charAt(0)}
                                  </span>
                                </div>
                                <span className="text-[11px] font-medium text-foreground/70 truncate w-full text-center px-1">
                                  {fav.title}
                                </span>
                              </motion.div>
                            ))}
                            
                            {/* Add Button */}
                            {isEditingFavs && (
                              <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative flex flex-col items-center gap-2 cursor-pointer"
                                onClick={addFavourite}
                              >
                                <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 border border-dashed border-black/20 dark:border-white/20 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                  <Plus className="w-6 h-6 text-foreground/50" />
                                </div>
                                <span className="text-[11px] font-medium text-foreground/50 truncate w-full text-center px-1">
                                  Add
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Privacy Report Section (Visual Mock) */}
                      <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 backdrop-blur-md">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                            <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-foreground mb-1">Privacy Report</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Your macOS Browser prevented <strong>42 trackers</strong> from profiling you across websites. Hide IP address is active.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </motion.div>
      );

      if (inline) {
        return (
          <div className={cn("w-full h-full relative", className)}>
            <AnimatePresence>
              {isMaximized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-2xl z-[2147483646]"
                  onClick={() => setWindowState("default")}
                />
              )}
            </AnimatePresence>
            {windowElement}
          </div>
        );
      }

      return (
        <>
          <div ref={placeholderRef} className={cn("w-full h-full rounded-2xl relative", className)}>
            {customRect && windowState === "default" && (
              <div className="absolute inset-0 border-2 border-dashed border-primary/40 rounded-2xl flex items-center justify-center bg-primary/5">
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest opacity-50 select-none">
                  Browser Detached
                </span>
              </div>
            )}
          </div>
          {mounted &&
            activeRect &&
            createPortal(
              <div
                className="pointer-events-none"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  zIndex: isMaximized || isInteracting || customRect ? 2147483647 : 50,
                  isolation: "isolate",
                }}
              >
                <AnimatePresence>
                  {isMaximized && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-black/60 backdrop-blur-2xl pointer-events-auto"
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                      }}
                      onClick={() => setWindowState("default")}
                    />
                  )}
                </AnimatePresence>
                {windowElement}
              </div>,
              document.body
            )}
        </>
      );
    }
  )
);

MacOsBrowser.displayName = "MacOsBrowser";
