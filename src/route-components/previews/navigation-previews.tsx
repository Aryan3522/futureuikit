/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Header } from "@/components/ui/header";
import { NavMenu } from "@/components/ui/nav-menu";
import { SidebarButton } from "@/components/ui/sidebar-button";
import { Accordion } from "@/components/ui/accordion";
import { Dock, DockItem, DockDivider } from "@/components/ui/dock";
import { 
  CommandPalette, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem, 
  CommandSeparator, 
  CommandShortcut 
} from "@/components/ui/command-palette";
import { GlobalBreadcrumb } from "@/components/ui/global-breadcrumb";
import ComponentPageSidebar from "@/components/ui/ComponentPageSidebar";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";
import { Home, User, Settings, Mail, Bell, Search, Monitor, Plus, Filter, MessageSquare, Compass } from "lucide-react";

export const HeaderPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("glass");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
    const [previewTheme, setPreviewTheme] = React.useState<any>("default");
    const [previewLayout, setPreviewLayout] = React.useState<any>("default");

  return (
    <PreviewContainer 
      title="Header" 
      description="A premium navigation header with a left-side drawer for mobile." 
      isVirtualScreen={true}
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor} 
      variants={["solid", "outline", "ghost", "glass"]} 
      activeVariant={previewVariant} 
      onVariantChange={setPreviewVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Layout</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "centered", "left"] as const).map(l => (
                <button key={l} onClick={() => setPreviewLayout(l)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewLayout === l ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Theme</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "modern", "clean", "futuristic", "brutal", "halftone"] as const).map(t => (
                <button key={t} onClick={() => setPreviewTheme(t)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewTheme === t ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setPreviewShape(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      <div
        className="w-full h-full min-h-125 relative bg-muted/10 border border-border/20 rounded-xl overflow-y-auto shadow-inner @container"
        style={{ transform: "translateZ(0)" }}
      >
         {/* Background noise/pattern for context */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
         <Header variant={previewVariant} color={previewColor} shape={previewShape} spacing={previewSpacing} theme={previewTheme} layout={previewLayout} />
         <div className="w-full min-h-[150vh] flex items-start justify-center pt-16 pb-16">
           <div className="text-center space-y-2 opacity-50 relative z-10">
             <p className="font-semibold text-lg">Page Content Area</p>
             <p className="text-sm">Scroll down to see the sticky header behavior.</p>
           </div>
         </div>
      </div>
    </PreviewContainer>
  );
};

export const NavMenuPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
    const [previewItemCount, setPreviewItemCount] = React.useState<number>(8);
    const [previewPosition, setPreviewPosition] = React.useState<string>("center");
    const [previewType, setPreviewType] = React.useState<"mixed" | "text">("mixed");
    const boundsRef = React.useRef<HTMLDivElement>(null);

    const generateItems = (count: number, type: "mixed" | "text") => {
      if (type === "text") {
        const textItems = ["Home", "About", "Services", "Portfolio", "Contact", "Blog", "Careers", "FAQ", "Terms", "Privacy"];
        const result = [];
        for (let i = 0; i < count; i++) {
          result.push({ title: textItems[i % textItems.length] });
        }
        return result;
      }
      const baseItems = [
        { title: "Home", icon: <Home className="w-5 h-5" /> },
        { title: "User", image: "https://github.com/shadcn.png" },
        { title: "Settings", icon: <Settings className="w-5 h-5" /> },
        { title: "Messages", icon: <Mail className="w-5 h-5" /> },
        { title: "Notifications", icon: <Bell className="w-5 h-5" /> },
        { title: "Search", icon: <Search className="w-5 h-5" /> },
      ];
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(baseItems[i % baseItems.length]);
      }
      return result;
    };

  return (
    <PreviewContainer 
      title="Navigation Menu" 
      description="A dynamic floating menu." 
      contentClassName="relative" 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor} 
      variants={["solid", "outline", "ghost", "link"]} 
      activeVariant={previewVariant} 
      onVariantChange={setPreviewVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Type</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["mixed", "text"] as const).map(t => (
                <button key={t} onClick={() => setPreviewType(t)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewType === t ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Items</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {([6, 8, 16, 24] as const).map(c => (
                <button key={c} onClick={() => setPreviewItemCount(c)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewItemCount === c ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{c} Items</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Position</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["center", "top-left", "top-right", "bottom-left", "bottom-right"] as const).map(p => (
                <button key={p} onClick={() => setPreviewPosition(p)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewPosition === p ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{p.replace("-", " ")}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setPreviewShape(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      {/* Preview Display Area */}
      <div ref={boundsRef} className="w-full h-[600px] relative overflow-hidden bg-muted/5 border border-border/20 rounded-xl">
        <div className={`absolute transition-all duration-500 ease-in-out z-50
          ${previewPosition === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
          ${previewPosition === 'top-left' ? 'top-2 left-2' : ''}
          ${previewPosition === 'top-right' ? 'top-2 right-2' : ''}
          ${previewPosition === 'bottom-left' ? 'bottom-2 left-2' : ''}
          ${previewPosition === 'bottom-right' ? 'bottom-2 right-2' : ''}
        `}>
          <NavMenu 
            color={previewColor} 
            shape={previewShape} 
            spacing={previewSpacing}
            variant={previewVariant}
            boundsContainer={boundsRef}
            items={generateItems(previewItemCount, previewType)}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      </div>
    </PreviewContainer>
  );
};

export const SidebarButtonPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Sidebar Button" description="Navigation button with active state and category styling for sidebars." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
        <div className="w-full max-w-60 flex flex-col gap-1 p-4 bg-muted/20 rounded-xl">
          <SidebarButton label="Dashboard" isActive />
          <SidebarButton label="Analytics" />
          <SidebarButton label="Settings" />
          <div className="h-4" />
          <SidebarButton label="User Profile" isCategory />
          <SidebarButton label="Billing" isCategory />
        </div>
      </div>
    </PreviewContainer>
  );
};

export const AccordionPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
    const [previewTheme, setPreviewTheme] = React.useState<any>("default");

  return (
    <PreviewContainer 
      title="Accordion" 
      description="A vertically collapsing accordion component." 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor} 
      variants={["solid", "outline", "ghost", "link"]} 
      activeVariant={previewVariant} 
      onVariantChange={setPreviewVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Theme</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "modern", "clean", "futuristic", "brutal", "halftone"] as const).map(t => (
                <button key={t} onClick={() => setPreviewTheme(t)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewTheme === t ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setPreviewShape(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      <div className="flex items-center justify-center w-full max-w-2xl h-full p-4 mx-auto">
        <Accordion
          variant={previewVariant}
          color={previewColor}
          shape={previewShape}
          spacing={previewSpacing}
          theme={previewTheme}
          items={[
            {
              title: "What is Future UI?",
              content:
                "Future UI is a modern, high-performance UI component library built for Next.js 16 and React 19. It leverages Tailwind CSS 4 and Framer Motion to provide visually stunning, reusable components.",
            },
            {
              title: "How do I install components?",
              content:
                "You can use our custom CLI tool to add components directly to your project. Simply run 'npx futureuikit add <slug>' and we'll handle the rest, including dependencies and path aliases.",
            },
            {
              title: "Is it customizable?",
              content:
                "Yes! Since you download the source code, you have full ownership and can customize every aspect of the components to fit your specific needs and design system.",
            },
          ]}
        />
      </div>
    </PreviewContainer>
  );
};

export const DockPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("ghost");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
    const [previewTheme, setPreviewTheme] = React.useState<any>("macos");
    const [previewLayout, setPreviewLayout] = React.useState<any>("horizontal");

  return (
    <PreviewContainer 
      title="Dock Navigation" 
      description="A fluid, macOS-inspired interactive dock with premium layouts."
      variants={["solid", "outline", "ghost", "link"]}
      activeVariant={previewVariant}
      onVariantChange={setPreviewVariant} 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Theme</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "modern", "clean", "futuristic", "brutal", "halftone", "macos"] as const).map(t => (
                <button key={t} onClick={() => setPreviewTheme(t)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewTheme === t ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Layout</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["horizontal", "vertical"] as const).map(l => (
                <button key={l} onClick={() => setPreviewLayout(l)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewLayout === l ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setPreviewShape(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      <div className="w-full flex items-center justify-center min-h-75 p-12">
        <Dock variant={previewVariant} color={previewColor} shape={previewShape} spacing={previewSpacing} theme={previewTheme} layout={previewLayout}>
          {previewTheme === "macos" ? (
            <>
              <DockItem label="Finder" active>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png" className="w-full h-full object-contain drop-shadow-md" alt="Finder" />
              </DockItem>
              <DockItem label="Chrome">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png" className="w-full h-full object-contain drop-shadow-md" alt="Chrome" />
              </DockItem>
              <DockItem label="Brave">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Brave_icon_lionface.png" className="w-full h-full object-contain drop-shadow-md" alt="Brave" />
              </DockItem>
              <DockItem label="VSCode" active>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" className="w-full h-full object-contain drop-shadow-md" alt="VSCode" />
              </DockItem>
              <DockDivider />
              <DockItem label="Terminal">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png" className="w-full h-full object-contain drop-shadow-md" alt="Terminal" />
              </DockItem>
              <DockItem label="Trash">
                <img src="https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/master/src/places/scalable/user-trash.svg" className="w-full h-full object-contain drop-shadow-md opacity-90" alt="Trash" />
              </DockItem>
            </>
          ) : (
            <>
              <DockItem label="Home" active>
                <Home className="w-5 h-5" />
              </DockItem>
              <DockItem label="Search">
                <Search className="w-5 h-5" />
              </DockItem>
              <DockDivider />
              <DockItem label="Messages">
                <MessageSquare className="w-5 h-5" />
              </DockItem>
              <DockItem label="Notifications">
                <Bell className="w-5 h-5" />
              </DockItem>
              <DockDivider />
              <DockItem label="Settings">
                <Settings className="w-5 h-5" />
              </DockItem>
            </>
          )}
        </Dock>
      </div>
    </PreviewContainer>
  );
};

export const CommandPalettePreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <PreviewContainer
      title="Command Palette"
      description="A powerful command palette for rapid navigation with premium animations and theming."
      colors={DEFAULT_COLORS}
      activeColor={previewColor}
      onColorChange={setPreviewColor}
      variants={["default", "compact", "floating", "glass", "spotlight"]}
      activeVariant={previewVariant}
      onVariantChange={setPreviewVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setPreviewShape(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      <div className="flex flex-col items-center justify-center w-full h-full min-h-75">
        <div
          onClick={() => setOpen(true)}
          className="w-full max-w-sm h-32 border-2 border-dashed border-muted-foreground/30 rounded-2xl flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 hover:bg-muted/5 transition-all group"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
            <Search className="w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm font-medium">Click to open Command Palette</span>
          </div>
        </div>

        <CommandPalette open={open} onOpenChange={setOpen} color={previewColor} variant={previewVariant} shape={previewShape} spacing={previewSpacing}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Monitor className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem>
                <Compass className="mr-2 h-4 w-4" />
                <span>Explore Components</span>
              </CommandItem>
              <CommandItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Feedback</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandPalette>
      </div>
    </PreviewContainer>
  );
};

export const GlobalBreadcrumbPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("ghost");
    const [previewSize, setPreviewSize] = React.useState<any>("md");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
  return (
    <PreviewContainer 
      title="Breadcrumb" 
      description="A global breadcrumb navigation component." 
      colors={DEFAULT_COLORS} 
      activeColor={previewColor} 
      onColorChange={setPreviewColor} 
      variants={["solid", "outline", "ghost", "link"]} 
      activeVariant={previewVariant} 
      onVariantChange={setPreviewVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["sm", "md", "lg"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSize(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSize === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setPreviewShape(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      <div className="w-full flex items-center justify-start p-4 md:p-12 min-h-75">
         <GlobalBreadcrumb color={previewColor} variant={previewVariant} size={previewSize} shape={previewShape} spacing={previewSpacing} />
      </div>
    </PreviewContainer>
  );
};

export const ComponentPageSidebarPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [open, setOpen] = useState(true);
  return (
    <PreviewContainer title="Page Sidebar" description="A dedicated sidebar for component documentation." isVirtualScreen={true} align="start" colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <div className="w-full h-full min-h-125 relative overflow-hidden bg-muted/10 border border-border/50 rounded-xl" style={{ transform: "translateZ(0)" }}>
        <ComponentPageSidebar open={open} setOpen={setOpen} />
        <div className={`transition-all duration-300 p-8 ${open ? "ml-64" : "ml-16"}`}>
          <div className="max-w-2xl space-y-4 opacity-50">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-64 bg-muted rounded w-full mt-8" />
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

