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
import { PreviewContainer } from "../preview-engine/PreviewContainer";
import { Home, User, Settings, Mail, Bell, Search, Monitor, Plus, Filter, MessageSquare, Compass } from "lucide-react";

export const HeaderPreview: React.FC = () => {
  return (
    <PreviewContainer title="Header" description="A premium navigation header with a left-side drawer for mobile.">
      <div
        className="w-full h-full min-h-125 relative bg-muted/10 border border-border/20 rounded-xl overflow-hidden shadow-inner"
        style={{ transform: "translateZ(0)" }}
      >
         {/* Background noise/pattern for context */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[24px_24px]"></div>
         <Header />
         <div className="w-full h-full flex items-center justify-center pt-16">
           <div className="text-center space-y-2 opacity-50">
             <p className="font-semibold text-lg">Page Content Area</p>
             <p className="text-sm">The header is fixed to the top.</p>
           </div>
         </div>
      </div>
    </PreviewContainer>
  );
};

export const NavMenuPreview: React.FC = () => {
  return (
    <PreviewContainer title="Navigation Menu" description="A dynamic floating menu." contentClassName="relative">
      <NavMenu />
    </PreviewContainer>
  );
};

export const SidebarButtonPreview: React.FC = () => {
  return (
    <PreviewContainer title="Sidebar Button" description="Navigation button with active state and category styling for sidebars.">
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
  return (
    <PreviewContainer title="Accordion" description="A vertically collapsing accordion component.">
      <div className="flex items-center justify-center w-full max-w-2xl h-full p-4 mx-auto">
        <Accordion
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
  const [variant, setVariant] = useState<"modern" | "clean" | "interactive">("modern");
  return (
    <PreviewContainer 
      title="Interactive Dock" 
      description="A fluid, macOS-inspired interactive dock with hover scaling."
      variants={["modern", "clean", "interactive"]}
      activeVariant={variant}
      onVariantChange={setVariant as any}
    >
      <div className="w-full flex items-center justify-center min-h-75">
        <Dock className="mb-4" variant={variant}>
          <DockItem label="Home">
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
        </Dock>
      </div>
    </PreviewContainer>
  );
};

export const CommandPalettePreview: React.FC = () => {
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
    <PreviewContainer title="Command Palette" description="A powerful command palette for rapid navigation.">
      <div className="flex flex-col items-center justify-center gap-4 min-h-75">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border rounded-xl hover:bg-muted/50 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Search commands...</span>
          </div>
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
        <p className="text-xs text-muted-foreground">Press ⌘K or click the button to open the palette</p>

        <CommandPalette open={open} onOpenChange={setOpen}>
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
  return (
    <PreviewContainer title="Breadcrumb" description="A global breadcrumb navigation component.">
      <div className="w-full flex items-center justify-start p-4 md:p-12 min-h-75">
         <GlobalBreadcrumb />
      </div>
    </PreviewContainer>
  );
};

export const ComponentPageSidebarPreview: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <PreviewContainer title="Page Sidebar" description="A dedicated sidebar for component documentation." isVirtualScreen={true} align="start">
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
