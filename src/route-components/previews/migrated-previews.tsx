"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Code, Cpu, Database, Cloud, Zap, Shield, Rocket, Globe, Mail, Fingerprint, Layers, Blocks, Box } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { AspectRatio } from "@/components/ui/aspect-ratio";



import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Custom / Magic UI imports
import IconCloud from "@/components/ui/icon-cloud";
import TypingAnimation from "@/components/ui/typing-animation";
import { Highlighter } from "@/components/ui/highlighter";
import Text3dFlip from "@/components/ui/text-3d-flip";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { GutterLines } from "@/components/ui/GutterLines";

export const MigratedPreviews = {
  "badge": function BadgePreview() {
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    return (
      <PreviewContainer 
        title="Badge" 
        description="A small status descriptor for UI elements."
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        variants={["solid", "secondary", "outline", "ghost"]}
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
        <div className="flex items-center justify-center min-h-75">
          <Badge variant={previewVariant} color={previewColor} shape={previewShape} spacing={previewSpacing}>
            Badge
          </Badge>
        </div>
      </PreviewContainer>
    );
  },
  "alert-dialog": function AlertDialogPreview() {
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    return (
      <PreviewContainer 
        title="Alert Dialog" 
        description="A modal dialog that interrupts the user with important content and expects a response."
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        variants={["solid", "outline", "ghost", "link"]}
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
        <div className="flex items-center justify-center min-h-75">
          <AlertDialog variant={previewVariant} color={previewColor} shape={previewShape} spacing={previewSpacing}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PreviewContainer>
    );
  },

  "aspect-ratio": function AspectRatioPreview() {
    const [previewRatio, setPreviewRatio] = React.useState<any>("16:9");
    const ratios = ["16:9", "4:3", "1:1", "21:9", "3:2", "9:16"];
    
    return (
      <PreviewContainer 
        title="Aspect Ratio" 
        description="Displays content within a desired ratio."
        extraControls={
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Aspect Ratio</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {ratios.map(r => (
                <button key={r} onClick={() => setPreviewRatio(r)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewRatio === r ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{r}</button>
              ))}
            </div>
          </div>
        }
      >
        <div className="w-full max-w-sm mx-auto my-10">
          <AspectRatio variant={previewRatio} className="bg-muted rounded-md overflow-hidden flex items-center justify-center border border-border shadow-sm transition-all duration-300">
            <span className="text-muted-foreground font-semibold">{previewRatio}</span>
          </AspectRatio>
        </div>
      </PreviewContainer>
    );
  },

  "collapsible": function CollapsiblePreview() {
    const [previewLayout, setPreviewLayout] = React.useState<any>("default");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    const items = [
      { label: "radix-ui/primitives", description: "React UI primitives" },
      { label: "radix-ui/colors", description: "Color system utilities" },
      { label: "radix-ui/themes", description: "Theme infrastructure" },
    ];

    return (
      <PreviewContainer
        title="Collapsible"
        description="An interactive component which expands/collapses a panel with premium layouts and animations."
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        variants={["default", "minimal", "contained", "card", "sidebar"]}
        activeVariant={previewLayout}
        onVariantChange={setPreviewLayout}
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
        <div className="flex items-center justify-center min-h-75">
          <Collapsible layout={previewLayout} color={previewColor} shape={previewShape} spacing={previewSpacing} className="w-95">
            <CollapsibleTrigger>
              @peduarte starred {items.length} repositories
            </CollapsibleTrigger>
            <CollapsibleContent items={items} />
          </Collapsible>
        </div>
      </PreviewContainer>
    );
  },

  "context-menu": function ContextMenuPreview() {
    return (
      <PreviewContainer title="Context Menu" description="Displays a menu to the user — such as a set of actions or functions — triggered by a button.">
        <div className="flex items-center justify-center min-h-100">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-37.5 w-75 items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem inset>Back</ContextMenuItem>
              <ContextMenuItem inset disabled>Forward</ContextMenuItem>
              <ContextMenuItem inset>Reload</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </PreviewContainer>
    );
  },

  "dropdown-menu": function DropdownMenuPreview() {
    const [previewVariant, setPreviewVariant] = React.useState<any>("default");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
    const [previewSize, setPreviewSize] = React.useState<any>("default");

    return (
      <PreviewContainer 
        title="Dropdown Menu" 
        description="Displays a menu to the user — such as a set of actions or functions — triggered by a button."
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        variants={["default", "premium", "clean", "solid", "floating", "minimal"]}
        activeVariant={previewVariant}
        onVariantChange={setPreviewVariant}
        extraControls={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "sm", "md", "lg", "xl"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewSize(s)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSize === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
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
        <div className="flex items-center justify-center min-h-75">
          <DropdownMenu variant={previewVariant} color={previewColor} shape={previewShape} spacing={previewSpacing} size={previewSize}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" color={previewColor}>Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </PreviewContainer>
    );
  },

  "hover-card": function HoverCardPreview() {
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewTheme, setPreviewTheme] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    return (
      <PreviewContainer 
        title="Hover Card" 
        description="For sighted users to preview content available behind a link."
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
                {(["default", "modern", "clean", "futuristic", "brutal", "halftone"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewTheme(s)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewTheme === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
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
        <div className="flex items-center justify-center min-h-75">
          <HoverCard variant={previewVariant} color={previewColor} theme={previewTheme} shape={previewShape} spacing={previewSpacing}>
            <HoverCardTrigger asChild>
              <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </PreviewContainer>
    );
  },


  "menubar": function MenubarPreview() {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("outline");
    const [previewTheme, setPreviewTheme] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    const extraControls = (
      <div className="flex flex-col gap-4 w-full mt-4 border-t border-border/50 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Theme</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["default", "modern", "clean", "futuristic", "brutal", "halftone"] as const).map(t => (
              <button key={t} onClick={() => setPreviewTheme(t)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewTheme === t ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{t}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["default", "square", "rounded", "sharp"] as const).map(s => (
              <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
              <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg uppercase transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <PreviewContainer 
        title="Menubar" 
        description="A visually persistent menu common in desktop applications."
        colors={DEFAULT_COLORS} 
        activeColor={previewColor} 
        onColorChange={setPreviewColor} 
        variants={["solid", "outline", "ghost", "link"]} 
        activeVariant={previewVariant} 
        onVariantChange={setPreviewVariant} 
        extraControls={extraControls}
      >
        <div className="flex items-center justify-center min-h-75">
          <Menubar color={previewColor} variant={previewVariant} theme={previewTheme} shape={previewShape} spacing={previewSpacing}>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarItem disabled>New Incognito Window</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </PreviewContainer>
    );
  },

  "pagination": function PaginationPreview() {
    const [page, setPage] = React.useState(1);
    const [previewVariant, setPreviewVariant] = React.useState<any>("outline");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");
    const [previewSize, setPreviewSize] = React.useState<any>("md");
    
    return (
      <PreviewContainer 
        title="Pagination" 
        description="Pagination with page navigation, next and previous links."
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        variants={["solid", "outline", "ghost", "link", "glass", "neon"]}
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
        <div className="flex items-center justify-center min-h-50">
          <Pagination color={previewColor} variant={previewVariant} shape={previewShape} spacing={previewSpacing} size={previewSize}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setPage(Math.max(1, page - 1)); }} 
                  className={page === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={page === 1} onClick={(e) => { e.preventDefault(); setPage(1); }}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={page === 2} onClick={(e) => { e.preventDefault(); setPage(2); }}>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={page === 3} onClick={(e) => { e.preventDefault(); setPage(3); }}>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setPage(Math.min(3, page + 1)); }}
                  className={page === 3 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </PreviewContainer>
    );
  },

  "radio-group": function RadioGroupPreview() {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [shape, setShape] = React.useState<any>("default");
    const [spacing, setSpacing] = React.useState<any>("default");
    const [variant, setVariant] = React.useState<any>("modern");

    return (
      <PreviewContainer 
        title="Radio Group" 
        description="A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time."
        variants={["modern", "minimal", "glow"]}
        activeVariant={variant}
        onVariantChange={setVariant}
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        extraControls={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "square", "rounded", "sharp"] as const).map(s => (
                  <button key={s} onClick={() => setShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", shape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing / Size</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "2x", "4x", "6x", "8x"] as const).map(sp => (
                  <button key={sp} onClick={() => setSpacing(sp)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", spacing === sp ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{sp === "default" ? "default" : sp}</button>
                ))}
              </div>
            </div>
          </>
        }
      >
        <div className="flex items-center justify-center min-h-75">
          <RadioGroup defaultValue="option-1" color={previewColor} shape={shape} spacing={spacing} variant={variant}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-1" id="r1" />
              <label htmlFor="r1" className={cn("font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", spacing === "2x" ? "text-xs" : spacing === "6x" || spacing === "8x" ? "text-base" : "text-sm")}>
                Option 1
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-2" id="r2" />
              <label htmlFor="r2" className={cn("font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", spacing === "2x" ? "text-xs" : spacing === "6x" || spacing === "8x" ? "text-base" : "text-sm")}>
                Option 2
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-3" id="r3" disabled />
              <label htmlFor="r3" className={cn("font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", spacing === "2x" ? "text-xs" : spacing === "6x" || spacing === "8x" ? "text-base" : "text-sm")}>
                Option 3 (Disabled)
              </label>
            </div>
          </RadioGroup>
        </div>
      </PreviewContainer>
    );
  },

  "resizable": function ResizablePreview() {
    return (
      <PreviewContainer title="Resizable" description="Accessible resizable panel groups and layouts with keyboard support.">
        <div className="flex items-center justify-center min-h-100 w-full px-10">
          <ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-50 items-center justify-center p-6">
                <span className="font-semibold">One</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={25}>
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Two</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Three</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </PreviewContainer>
    );
  },

  "scroll-area": function ScrollAreaPreview() {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    return (
      <PreviewContainer 
        title="Scroll Area" 
        description="Augments native scroll functionality with premium visual variants and cross-browser custom styling."
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        variants={["default", "minimal", "glass", "glow"]}
        activeVariant={previewVariant}
        onVariantChange={setPreviewVariant}
        extraControls={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Thickness (Spacing)</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewSpacing(s)}
                    className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "square", "rounded", "sharp"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewShape(s)}
                    className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
                ))}
              </div>
            </div>
          </>
        }
      >
        <div className="flex items-center justify-center min-h-100 w-full">
          <ScrollArea 
            type="always"
            color={previewColor} 
            variant={previewVariant} 
            shape={previewShape} 
            spacing={previewSpacing}
            className="h-50 w-87.5 border p-4"
          >
            Jokester began sneaking into the castle in the middle of the night and leaving
            jokes all over the place: under the king&apos;s pillow, in his soup, even in the
            royal toilet. The king was furious, but he couldn&apos;t seem to stop Jokester. And
            then, one day, the people of the kingdom discovered that the jokes left by
            Jokester were so funny that they couldn&apos;t help but laugh. And once they
            started laughing, they couldn&apos;t stop. Jokester began sneaking into the castle in the middle of the night and leaving
            jokes all over the place: under the king&apos;s pillow, in his soup, even in the
            royal toilet. The king was furious, but he couldn&apos;t seem to stop Jokester. And
            then, one day, the people of the kingdom discovered that the jokes left by
            Jokester were so funny that they couldn&apos;t help but laugh. And once they
            started laughing, they couldn&apos;t stop.
          </ScrollArea>
        </div>
      </PreviewContainer>
    );
  },

  "skeleton": function SkeletonPreview() {
    return (
      <PreviewContainer title="Skeleton" description="Use to show a placeholder while content is loading.">
        <div className="flex items-center justify-center min-h-75">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-62.5" />
              <Skeleton className="h-4 w-50" />
            </div>
          </div>
        </div>
      </PreviewContainer>
    );
  },

  "slider": function SliderPreview() {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSize, setPreviewSize] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    const extraControls = (
      <div className="flex flex-col gap-4 w-full mt-4 border-t border-border/50 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["default", "square", "rounded", "sharp"] as const).map(s => (
              <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Thumb Size</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["default", "sm", "md", "lg", "xl"] as const).map(s => (
              <button key={s} onClick={() => setPreviewSize(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewSize === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Track Spacing</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
              <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg uppercase transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <PreviewContainer 
        title="Slider" 
        description="An input where the user selects a value from within a given range."
        variants={["solid", "outline", "ghost", "glass", "elevated", "soft"]}
        activeVariant={previewVariant}
        onVariantChange={setPreviewVariant}
        isVirtualScreen={true} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
        extraControls={extraControls}
      >
        <div className="flex items-center justify-center min-h-75 px-10 w-full">
          <div className="flex flex-col items-center justify-center gap-10 w-full max-w-4xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-12 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-xl">
            <Slider defaultValue={[50]} max={100} step={1} className="w-[80%]" variant={previewVariant as any} color={previewColor} shape={previewShape} size={previewSize} spacing={previewSpacing} />
            <Slider defaultValue={[25, 75]} max={100} step={1} className="w-[80%]" variant={previewVariant as any} color={previewColor} shape={previewShape} size={previewSize} spacing={previewSpacing} />
          </div>
        </div>
      </PreviewContainer>
    );
  },

  "toggle-group": function ToggleGroupPreview() {
    return (
      <PreviewContainer title="Toggle Group" description="A set of two-state buttons that can be toggled on or off.">
        <div className="flex items-center justify-center min-h-50">
          <ToggleGroup type="multiple">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">Italic</ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">Underline</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </PreviewContainer>
    );
  },

  "tooltip": function TooltipPreview() {
    return (
      <PreviewContainer title="Tooltip" description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.">
        <div className="flex items-center justify-center min-h-75">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </PreviewContainer>
    );
  },

  "icon-cloud": function IconCloudPreview() {
    const [previewContent, setPreviewContent] = React.useState<any>("images");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    const slugs = [
      "typescript", "javascript", "react", "nodedotjs", "nextdotjs",
      "tailwindcss", "framer", "vercel", "github", "figma",
      "supabase", "stripe", "prisma", "graphql", "python",
      "rust", "go", "docker", "kubernetes", "amazonaws"
    ];

    const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/white`);
    
    const icons = [
      <Activity key="1" />, <Code key="2" />, <Cpu key="3" />, <Database key="4" />,
      <Cloud key="5" />, <Zap key="6" />, <Shield key="7" />, <Rocket key="8" />,
      <Globe key="9" />, <Mail key="10" />, <Fingerprint key="11" />, <Layers key="12" />,
      <Blocks key="13" />, <Box key="14" />, <Activity key="15" />, <Code key="16" />
    ];

    let currentProps: any = {};
    if (previewContent === "images") {
      currentProps.images = images.slice(0, 15);
    } else if (previewContent === "icons") {
      currentProps.icons = icons.slice(0, 15);
    } else if (previewContent === "mixed") {
      currentProps.images = images.slice(0, 8);
      currentProps.icons = icons.slice(0, 8);
    } else if (previewContent === "numbers (10)") {
      currentProps.count = 10;
    } else if (previewContent === "numbers (20)") {
      currentProps.count = 20;
    } else if (previewContent === "numbers (50)") {
      currentProps.count = 50;
    }

    return (
      <PreviewContainer 
        title="Icon Cloud" 
        description="A dynamic, fully data-driven 3D interactive icon cloud."
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        extraControls={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Content</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["images", "icons", "mixed", "numbers (10)", "numbers (20)", "numbers (50)"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewContent(s)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewContent === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
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
        <div className="flex items-center justify-center min-h-125">
          {/* Key is used to force re-render when changing sizes for a fresh spin effect (optional) */}
          <IconCloud 
            key={`${previewContent}-${previewSpacing}`}
            color={previewColor} 
            shape={previewShape} 
            spacing={previewSpacing}
            {...currentProps} 
          />
        </div>
      </PreviewContainer>
    );
  },

  "typing-animation": function TypingAnimationPreview() {
    return (
      <PreviewContainer title="Typing Animation" description="A text component that animates as if being typed.">
        <div className="flex items-center justify-center min-h-50">
          <TypingAnimation className="text-4xl font-bold text-primary">Hello, welcome to Future UI!</TypingAnimation>
        </div>
      </PreviewContainer>
    );
  },

  "highlighter": function HighlighterPreview() {
    const [previewVariant, setPreviewVariant] = React.useState<any>("highlight");
    const [previewColor, setPreviewColor] = React.useState<any>("default");

    return (
      <PreviewContainer 
        title="Highlighter" 
        description="A component to highlight specific text content."
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        variants={["highlight", "underline", "box", "circle", "strike-through", "crossed-off", "bracket"]}
        activeVariant={previewVariant}
        onVariantChange={setPreviewVariant}
      >
        <div className="flex items-center justify-center min-h-75">
          <div className="w-full max-w-md bg-background border p-8 rounded-xl text-foreground text-center font-medium text-lg leading-relaxed shadow-sm">
            <p>
              This is a beautiful <Highlighter action={previewVariant} color={previewColor}>highlighted</Highlighter> text effect.
            </p>
          </div>
        </div>
      </PreviewContainer>
    );
  },

  "text-3d-flip": function Text3dFlipPreview() {
    return (
      <PreviewContainer title="Text 3D Flip" description="A text animation component that flips 3D.">
        <div className="flex items-center justify-center min-h-75">
          <Text3dFlip>Future UI</Text3dFlip>
        </div>
      </PreviewContainer>
    );
  },

  "sonner": function SonnerPreview() {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("elevated");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSize, setPreviewSize] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    const extraControls = (
      <div className="flex flex-col gap-4 w-full mt-4 border-t border-border/50 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["default", "square", "rounded", "sharp"] as const).map(s => (
              <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Text & Icon Size</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["default", "sm", "md", "lg", "xl"] as const).map(s => (
              <button key={s} onClick={() => setPreviewSize(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewSize === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing / Padding</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
              <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg uppercase transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <PreviewContainer 
        title="Sonner" 
        description="An opinionated toast notification component for React."
        variants={["solid", "outline", "ghost", "glass", "elevated", "soft"]}
        activeVariant={previewVariant}
        onVariantChange={setPreviewVariant}
        isVirtualScreen={true} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
        extraControls={extraControls}
      >
        <div className="flex flex-col items-center justify-center min-h-75 gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: { label: "Undo", onClick: () => console.log("Undo") },
              })}
            >
              Default Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.success("Successfully completed!")}
            >
              Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("Something went wrong")}
            >
              Error Toast
            </Button>
          </div>
          <Toaster variant={previewVariant} color={previewColor} shape={previewShape} size={previewSize} spacing={previewSpacing} />
        </div>
      </PreviewContainer>
    );
  },

  "GutterLines": function GutterLinesPreview() {
    const [variant, setVariant] = React.useState<"default" | "dense" | "wide" | "vertical">("default");
    const [color, setColor] = React.useState<any>("default");
    const [spacing, setSpacing] = React.useState<"default" | "2x" | "4x" | "6x" | "8x">("default");
    const [size, setSize] = React.useState<"default" | "sm" | "md" | "lg">("default");

    return (
      <PreviewContainer 
        title="Gutter Lines" 
        description="A decorative repeating line pattern component with multiple variants."
        variants={["default", "vertical"]}
        activeVariant={variant}
        onVariantChange={setVariant as any}
        isVirtualScreen={true}
        contentClassName="p-0 border-none relative overflow-hidden h-[100vh]"
        colors={DEFAULT_COLORS}
        activeColor={color}
        onColorChange={setColor}
        extraControls={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                  <button key={s} onClick={() => setSpacing(s)} className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${spacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size / Thickness</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "sm", "md", "lg"] as const).map(s => (
                  <button key={s} onClick={() => setSize(s)} className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${size === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
                ))}
              </div>
            </div>
          </>
        }
      >
        <GutterLines variant={variant as "default" | "vertical"} color={color} spacing={spacing} size={size} className="absolute inset-0 w-full h-full pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-background/80 backdrop-blur-sm border border-border p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold tracking-tight">Content Layer</h3>
            <p className="text-muted-foreground text-sm mt-2">GutterLines sits in the background</p>
          </div>
        </div>
      </PreviewContainer>
    );
  },
};
