"use client";

import React from "react";
import { Search as SearchComponent } from "@/components/ui/search";
import { SearchInput } from "@/components/ui/search-input";
import { componentsList } from "@/data/component-library-data";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const SearchPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [variant, setVariant] = React.useState<"standard" | "compact" | "floating" | "command" | "icon">("standard");
  const [inputVariant, setInputVariant] = React.useState<"standard" | "compact" | "floating" | "command">("floating");
  const [size, setSize] = React.useState<"sm" | "md" | "lg">("md");
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [clearable, setClearable] = React.useState(true);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredComponents = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return componentsList.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  const controls = (
    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
      <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground hidden sm:block">Size & State</span>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["sm", "md", "lg"] as const).map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", size === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-border hidden sm:block"></div>

        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          <button onClick={() => setLoading(!loading)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", loading ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>Loading</button>
          <button onClick={() => setDisabled(!disabled)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", disabled ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>Disabled</button>
          <button onClick={() => setClearable(!clearable)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", clearable ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>Clearable</button>
          <button onClick={() => setFullWidth(!fullWidth)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", fullWidth ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>Full Width</button>
        </div>
      </div>
    </div>
  );

  return (
    <PreviewContainer
      title="Search"
      description="A premium, modern, and highly configurable generic search input primitive."
      variants={["standard", "compact", "floating", "command", "icon"]}
      activeVariant={variant}
      onVariantChange={setVariant as any}
      extraControls={controls} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="w-full h-full flex flex-col items-center justify-center min-h-100 relative overflow-hidden">
         <div className="w-full max-w-2xl mx-auto relative flex justify-center">
           <SearchComponent
             variant={variant}
             inputVariant={inputVariant}

             loading={loading}
             disabled={disabled}
             clearable={clearable}
             fullWidth={fullWidth}
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
             placeholder="Search components (e.g., 'button')..."
           >
             {searchQuery && (
               <div className={cn(
                 "absolute top-full left-0 w-full overflow-hidden z-50",
                 // Dynamic styles based on effective variant
                 (variant === "icon" ? inputVariant : variant) === "command"
                   ? "bg-muted/30 border border-border/50 shadow-xl rounded-xl backdrop-blur-md mt-2"
                   : (variant === "icon" ? inputVariant : variant) === "floating"
                   ? "bg-background/80 backdrop-blur-xl border border-border/40 shadow-2xl rounded-2xl mt-3"
                   : (variant === "icon" ? inputVariant : variant) === "compact"
                   ? "bg-muted/40 border border-transparent shadow-sm rounded-lg backdrop-blur-sm mt-2"
                   : "bg-background border border-border/60 shadow-lg rounded-xl mt-2"
               )}>
                 <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-4 py-3 border-b border-border/30">Live Search Results</div>
                 {filteredComponents.length > 0 ? (
                   <div className="p-2">
                     {filteredComponents.map(comp => (
                       <div key={comp.slug} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer group">
                         <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{comp.title}</h4>
                           <p className="text-xs text-muted-foreground truncate">{comp.description}</p>
                         </div>
                         <div className="text-[10px] font-mono px-2 py-1 rounded-full bg-muted group-hover:bg-background text-muted-foreground capitalize shrink-0">{comp.category}</div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-8 text-sm text-muted-foreground italic">No components found for &quot;{searchQuery}&quot;</div>
                 )}
               </div>
             )}
           </SearchComponent>
         </div>

         <AnimatePresence>
           {variant === "icon" && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 10 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-40"
             >
               <div className="flex items-center gap-2 p-1.5 bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl pointer-events-auto">
                 <div className="px-3 text-[10px] font-bold tracking-widest uppercase text-muted-foreground hidden sm:block">Overlay Style</div>
                 <div className="w-px h-6 bg-border/50 hidden sm:block"></div>
                 {(["standard", "compact", "floating", "command"] as const).map(v => (
                   <button
                     key={v}
                     onClick={() => setInputVariant(v)}
                     className={cn(
                       "px-4 py-2 text-xs font-semibold rounded-xl capitalize transition-all duration-300",
                       inputVariant === v
                         ? "bg-primary text-primary-foreground shadow-md scale-105"
                         : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                     )}
                   >
                     {v}
                   </button>
                 ))}
               </div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>
    </PreviewContainer>
  );
};

export const SearchInputPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [variant, setVariant] = React.useState<"default" | "minimal" | "glass" | "pill">("default");
  return (
    <PreviewContainer
      title="Search Input"
      description="A highly styled, interactive search input component with micro-animations."
      variants={["default", "minimal", "glass", "pill"]}
      activeVariant={variant}
      onVariantChange={setVariant as any} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="w-full max-w-sm">
        <SearchInput placeholder="Try searching 'button'..." variant={variant} data={componentsList} />
      </div>
    </PreviewContainer>
  );
};
