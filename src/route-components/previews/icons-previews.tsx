"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon, 
  InstagramIcon, 
  DiscordIcon, 
  YoutubeIcon, 
  XIcon, 
  ChevronUpIcon, 
  ChevronDownIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  SunIcon, 
  MoonIcon, 
  SearchIcon, 
  LoaderIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  ArrowUpRightIcon, 
  ArrowUpLeftIcon, 
  ArrowDownRightIcon, 
  ArrowDownLeftIcon 
} from "@/icons";
import * as PremiumIcons from "@/icons";
import { Search as SearchComponent } from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import { PreviewContainer } from "../preview-engine/PreviewContainer";
import { X, Check, Copy, Search, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const ContinuousIcon = ({ renderFn }: { renderFn: () => React.ReactNode }) => {
  const [k, setK] = useState(0);
  useEffect(() => {
    const int = setInterval(() => setK(k => k + 1), 2500);
    return () => clearInterval(int);
  }, []);
  return <div key={k} className="flex items-center justify-center w-full h-full">{renderFn()}</div>;
};

export const IconsPreview: React.FC = () => {
  const [animate, setAnimate] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const _STATIC_ICONS = [
    {
      name: "GithubIcon",
      label: "GitHub",
      description: "The official GitHub logo as a clean, scalable SVG React component.",
      tags: ["social", "developer", "git", "github"],
      render: (props: any) => <GithubIcon animate={animate} {...props} />,
    },
    {
      name: "LinkedinIcon",
      label: "LinkedIn",
      description: "The official LinkedIn logo as a clean, scalable SVG React component.",
      tags: ["social", "professional", "network", "linkedin"],
      render: (props: any) => <LinkedinIcon animate={animate} {...props} />,
    },
    {
      name: "TwitterIcon",
      label: "Twitter",
      description: "The classic Twitter bird logo with premium hover and entry animations.",
      tags: ["social", "classic", "twitter", "bird"],
      render: (props: any) => <TwitterIcon animate={animate} {...props} />,
    },
    {
      name: "InstagramIcon",
      label: "Instagram",
      description: "Modern Instagram camera icon with smooth path drawing and spring effects.",
      tags: ["social", "photo", "instagram", "meta"],
      render: (props: any) => <InstagramIcon animate={animate} {...props} />,
    },
    {
      name: "DiscordIcon",
      label: "Discord",
      description: "The Discord gaming logo with reactive hover physics and blinking effects.",
      tags: ["social", "gaming", "discord", "chat"],
      render: (props: any) => <DiscordIcon animate={animate} {...props} />,
    },
    {
      name: "YoutubeIcon",
      label: "YouTube",
      description: "Premium YouTube icon with interactive play-button micro-animations.",
      tags: ["social", "video", "youtube", "google"],
      render: (props: any) => <YoutubeIcon animate={animate} {...props} />,
    },
    {
      name: "XIcon",
      label: "X (Twitter)",
      description: "The new X brand logo with high-speed rotation and path drawing motion.",
      tags: ["social", "x", "twitter", "modern"],
      render: (props: any) => <XIcon animate={animate} {...props} />,
    },
    {
      name: "ChevronUpIcon",
      label: "Chevron Up",
      description: "A smoothly animated upward-pointing chevron for menus and accordions.",
      tags: ["ui", "arrow", "chevron", "up", "direction"],
      render: (props: any) => <ChevronUpIcon animate={animate} {...props} />,
    },
    {
      name: "ChevronDownIcon",
      label: "Chevron Down",
      description: "A smoothly animated downward-pointing chevron for dropdowns and expansible content.",
      tags: ["ui", "arrow", "chevron", "down", "direction"],
      render: (props: any) => <ChevronDownIcon animate={animate} {...props} />,
    },
    {
      name: "ChevronLeftIcon",
      label: "Chevron Left",
      description: "A smoothly animated left-pointing chevron for back buttons and pagination.",
      tags: ["ui", "arrow", "chevron", "left", "direction"],
      render: (props: any) => <ChevronLeftIcon animate={animate} {...props} />,
    },
    {
      name: "ChevronRightIcon",
      label: "Chevron Right",
      description: "A smoothly animated right-pointing chevron for forward buttons and navigation.",
      tags: ["ui", "arrow", "chevron", "right", "direction"],
      render: (props: any) => <ChevronRightIcon animate={animate} {...props} />,
    },
    {
      name: "SunIcon",
      label: "Sun",
      description: "A premium animated sun icon, perfect for light mode toggles.",
      tags: ["ui", "theme", "light", "sun", "day"],
      render: (props: any) => <SunIcon animate={animate} {...props} />,
    },
    {
      name: "MoonIcon",
      label: "Moon",
      description: "A premium animated moon icon, perfect for dark mode toggles.",
      tags: ["ui", "theme", "dark", "moon", "night"],
      render: (props: any) => <MoonIcon animate={animate} {...props} />,
    },
    {
      name: "SearchIcon",
      label: "Search",
      description: "An animated magnifying glass for beautiful search interactions.",
      tags: ["ui", "search", "find", "magnify"],
      render: (props: any) => <SearchIcon animate={animate} {...props} />,
    },
    {
      name: "LoaderIcon",
      label: "Loader Spinner",
      description: "A silky smooth infinite rotating spinner with draw-in animation.",
      tags: ["ui", "loader", "spinner", "loading"],
      render: (props: any) => <LoaderIcon animate={animate} {...props} />,
    },
    {
      name: "ArrowUpIcon",
      label: "Arrow Up",
      description: "A premium upward arrow with two-step spring motion.",
      tags: ["ui", "arrow", "up", "direction"],
      render: (props: any) => <ArrowUpIcon animate={animate} {...props} />,
    },
    {
      name: "ArrowDownIcon",
      label: "Arrow Down",
      description: "A premium downward arrow with two-step spring motion.",
      tags: ["ui", "arrow", "down", "direction"],
      render: (props: any) => <ArrowDownIcon animate={animate} {...props} />,
    },
    {
      name: "ArrowLeftIcon",
      label: "Arrow Left",
      description: "A premium leftward arrow with two-step spring motion.",
      tags: ["ui", "arrow", "left", "direction"],
      render: (props: any) => <ArrowLeftIcon animate={animate} {...props} />,
    },
    {
      name: "ArrowRightIcon",
      label: "Arrow Right",
      description: "A premium rightward arrow with two-step spring motion.",
      tags: ["ui", "arrow", "right", "direction"],
      render: (props: any) => <ArrowRightIcon animate={animate} {...props} />,
    },
    {
      name: "ArrowUpRightIcon",
      label: "Arrow Up Right",
      description: "A premium top-right arrow with two-step spring motion.",
      tags: ["ui", "arrow", "up-right", "direction", "external"],
      render: (props: any) => <ArrowUpRightIcon animate={animate} {...props} />,
    },
    {
      name: "ArrowUpLeftIcon",
      label: "Arrow Up Left",
      description: "A premium top-left arrow with two-step spring motion.",
      tags: ["ui", "arrow", "up-left", "direction"],
      render: (props: any) => <ArrowUpLeftIcon animate={animate} {...props} />,
    },
    {
      name: "ArrowDownRightIcon",
      label: "Arrow Down Right",
      description: "A premium bottom-right arrow with two-step spring motion.",
      tags: ["ui", "arrow", "down-right", "direction"],
      render: (props: any) => <ArrowDownRightIcon animate={animate} {...props} />,
    },
    {
      name: "ArrowDownLeftIcon",
      label: "Arrow Down Left",
      description: "A premium bottom-left arrow with two-step spring motion.",
      tags: ["ui", "arrow", "down-left", "direction"],
      render: (props: any) => <ArrowDownLeftIcon animate={animate} {...props} />,
    },
  ];

  const staticNames = new Set(_STATIC_ICONS.map(i => i.name));
  const premiumIconKeys = Object.keys(PremiumIcons).filter(k => !staticNames.has(k) && k.endsWith("Icon"));
  const ICONS = _STATIC_ICONS.map(i => ({...i, hasAnimation: true })).concat(
    premiumIconKeys.map(key => {
      const Comp = (PremiumIcons as any)[key];
      const isCircular = key.includes("Ring") || key.includes("Dial") || key.includes("Orbit") || key.includes("Halo");
      const isAnimatedIcon = /^(Quantum|Cyber|Neural|Data|Holo|Flux|Neon|Pulse|Orbit|Plasma|Stellar|Aero|Solar|Animated)/.test(key);
      return {
        name: key,
        label: key.replace("Icon", ""),
        description: isAnimatedIcon ? `Premium ${isCircular ? "Circular" : "Abstract"} animated SVG icon.` : "Standard clean SVG icon.",
        tags: isAnimatedIcon ? ["premium", "animated", isCircular ? "circular" : "abstract"] : ["standard", "icon"],
        hasAnimation: isAnimatedIcon,
        render: (props: any) => isAnimatedIcon ? <Comp animate={animate} animated={animate} {...props} /> : <Comp {...props} />
      };
    })
  );

  const [selected, setSelected] = useState<typeof ICONS[number] | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "animated" | "static">("all");

  const filtered = ICONS.filter((icon) => {
    if (filterType === "animated" && !icon.hasAnimation) return false;
    if (filterType === "static" && icon.hasAnimation) return false;
    const q = query.toLowerCase();
    return (
      icon.name.toLowerCase().includes(q) ||
      icon.label.toLowerCase().includes(q) ||
      icon.tags.some((t) => t.includes(q))
    );
  });

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const importLine = `import { ${selected?.name} } from "futureuikit/icons"`;
  const usageCode = `<${selected?.name} animate={${animate}} size={24} className="text-foreground" />`;

  return (
    <PreviewContainer
      title="Icons"
      description="Premium animated SVG icons. No separate download required—these icons are built-in and ready to use directly after initializing the component library."
      isVirtualScreen={true}
      align="start"
    >
      <div className="flex flex-col w-full p-4 md:p-10">
        {/* Search Header */}
        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto text-center mb-10 mt-4">
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Icon Library</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Showing <span className="text-primary font-bold">{filtered.length}</span> native icons. Search to find exactly what you need.
            </p>
          </div>
          
          <div className="w-full relative px-2 sm:px-0 flex justify-center">
            <SearchComponent
              variant="floating"
              fullWidth={true}
              placeholder="Search icons (e.g., 'Aero', 'Arrow', 'Github')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              clearable
              className="w-full shadow-xl max-w-2xl"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <Button onClick={() => setAnimationKey(k => k + 1)} variant="outline" className="gap-2 rounded-xl bg-background shadow-sm hover:bg-muted/50">
              <RefreshCw className="w-4 h-4" />
              Replay Animations
            </Button>
            
            <div className="flex items-center p-1 bg-muted/40 border border-border/60 rounded-xl shadow-sm">
              <button 
                onClick={() => setFilterType("all")} 
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${filterType === "all" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterType("animated")} 
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${filterType === "animated" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Animated
              </button>
              <button 
                onClick={() => setFilterType("static")} 
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${filterType === "static" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Static
              </button>
              {filterType !== "all" && (
                <button 
                  onClick={() => setFilterType("all")} 
                  className="ml-1 p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg transition-colors"
                  title="Clear filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

        <div className="w-full h-px bg-border/40 mb-10" />

        {/* Icons flex wrap */}
        {filtered.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full" key={animationKey}>
            {filtered.map((icon) => (
              <button
                key={icon.name}
                onClick={() => setSelected(icon)}
                title={icon.name}
                className="group flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/60 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/5 min-w-18"
              >
              {icon.hasAnimation && (
                <div className="absolute top-3 right-3 flex h-2 w-2" title="Animated Icon">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/80"></span>
                </div>
              )}
                <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  {icon.render({ width: 32, height: 32 })}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground bg-muted/10 rounded-3xl border border-dashed border-border">
            <Search className="w-8 h-8 opacity-20" />
            <div className="text-center">
              <p className="font-medium">No native icons found</p>
              <p className="text-xs opacity-60">Try searching for something else</p>
            </div>
          </div>
        )}
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-2147483647 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-background border border-border rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-border/50 bg-muted/10">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 flex shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                      {selected.hasAnimation ? <ContinuousIcon renderFn={() => selected.render({ width: 24, height: 24, animate: true })} /> : selected.render({ width: 24, height: 24 })}
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-bold text-foreground truncate">{selected.name}</p>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider truncate">{selected.label} Icon</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="px-6 py-6 space-y-6 overflow-y-auto max-h-[75vh]">
                  {/* Description */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">About Icon</p>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-2xl border border-border/50">{selected.description}</p>
                  </div>

                  {/* Sizes */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Responsive Variants</p>
                    <div className="flex flex-wrap items-end justify-center sm:justify-between gap-4 px-6 py-5 rounded-2xl bg-muted/20 border border-border/50">
                      {[{ size: 16, label: "16px" }, { size: 24, label: "24px" }, { size: 32, label: "32px" }, { size: 48, label: "48px" }, { size: 64, label: "64px" }].map(({ size, label }) => (
                        <div key={size} className="flex flex-col items-center gap-2">
                          <div className="flex items-center justify-center p-2 rounded-lg bg-background border border-border/50">
                            {selected.hasAnimation ? <ContinuousIcon renderFn={() => selected.render({ width: size, height: size, className: "text-foreground", animate: true })} /> : selected.render({ width: size, height: size, className: "text-foreground" })}
                          </div>
                          <span className="text-[10px] font-medium text-muted-foreground/60">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Theme Compatibility</p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {[
                        { color: "currentColor", label: "Default", bg: "bg-foreground" },
                        { color: "#6366f1", label: "Indigo", bg: "bg-indigo-500" },
                        { color: "#10b981", label: "Emerald", bg: "bg-emerald-500" },
                        { color: "#f59e0b", label: "Amber", bg: "bg-amber-500" },
                        { color: "#ef4444", label: "Red", bg: "bg-red-500" },
                        { color: "#8b5cf6", label: "Violet", bg: "bg-violet-500" },
                      ].map(({ color, label, bg }) => (
                        <div key={label} className="flex flex-col items-center gap-2 group cursor-help" title={label}>
                          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted/30 border border-border/50 transition-all group-hover:scale-110">
                            {selected.hasAnimation ? <ContinuousIcon renderFn={() => selected.render({ width: 20, height: 20, style: { color }, animate: true })} /> : selected.render({ width: 20, height: 20, style: { color } })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Installation Note */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Installation</p>
                    <div className="space-y-2">
                      <div className="relative group">
                        <div className="absolute -top-2 left-3 px-1.5 bg-background text-[9px] font-bold text-primary uppercase tracking-wider z-10 border border-border rounded">Install Library</div>
                        <div className="flex items-center gap-3 bg-muted/30 border border-border/50 rounded-2xl px-4 py-3.5 group-hover:border-primary/30 transition-colors">
                          <code className="text-[11px] font-mono text-foreground flex-1 truncate">npm install futureuikit</code>
                          <button
                            onClick={() => copy("npm install futureuikit", "install")}
                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                          >
                            {copied === "install" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed px-1 mt-2">
                        Icons are bundled directly with the Future UI library. Just install the package once, and all icons are ready to use.
                      </p>
                    </div>
                  </div>

                  {/* Implementation */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Quick Implementation</p>
                    <div className="space-y-2">
                      <div className="relative group">
                        <div className="absolute -top-2 left-3 px-1.5 bg-background text-[9px] font-bold text-primary uppercase tracking-wider z-10 border border-border rounded">Import</div>
                        <div className="flex items-center gap-3 bg-muted/30 border border-border/50 rounded-2xl px-4 py-3.5 group-hover:border-primary/30 transition-colors">
                          <code className="text-[11px] font-mono text-foreground flex-1 truncate">{importLine}</code>
                          <button
                            onClick={() => copy(importLine, "import")}
                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                          >
                            {copied === "import" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute -top-2 left-3 px-1.5 bg-background text-[9px] font-bold text-primary uppercase tracking-wider z-10 border border-border rounded">Usage</div>
                        <div className="flex items-center gap-3 bg-muted/30 border border-border/50 rounded-2xl px-4 py-3.5 group-hover:border-primary/30 transition-colors">
                          <code className="text-[11px] font-mono text-foreground flex-1 truncate">{usageCode}</code>
                          <button
                            onClick={() => copy(usageCode, "usage")}
                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                          >
                            {copied === "usage" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </PreviewContainer>
  );
};
