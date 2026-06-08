"use client";

import React, { useState, useEffect } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { GlowyButton } from "@/components/ui/glowy-button";
import { BasicCard } from "@/components/ui/basic-card";
import { BoxyRotateLoader } from "@/components/ui/boxy-rotate-loader";
import { BoxyBounceLoader } from "@/components/ui/boxy-bounce-loader";
import { BoxyShiftLoader } from "@/components/ui/boxy-shift-loader";
import { BasicLoader } from "@/components/ui/basic-loader";
import { DotBackground } from "@/components/ui/dot-background";
import { CarouselSlider } from "@/components/ui/carousel-slider";
import { NavMenu } from "@/components/ui/nav-menu";
import { ErrorPage } from "@/components/ui/error-page";
import { CinematicError } from "@/components/ui/cinematic-error";
import { FilterBuilder, FilterGroup, FilterField, createEmptyGroup, FilterRule } from "@/components/ui/filter-builder";
import { ExpandingFlexCard } from "@/components/ui/expanding-flex-card";
import { NexusCard } from "@/components/ui/nexus-card";
import { GlassPanel } from "@/components/ui/glass-panel";
import { HoverGlareCard } from "@/components/ui/hover-glare-card";
import { NoirHero3D } from "@/components/ui/noir-hero-3d";
import { Header } from "@/components/ui/header";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarButton } from "@/components/ui/sidebar-button";
import { Particles } from "@/components/ui/particles";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { SearchInput } from "@/components/ui/search-input";
import { Search as SearchComponent } from "@/components/ui/search";
import { componentsList } from "@/data/component-library-data";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon, DiscordIcon, YoutubeIcon, XIcon, ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, SunIcon, MoonIcon, SearchIcon, LoaderIcon, ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, ArrowUpLeftIcon, ArrowDownRightIcon, ArrowDownLeftIcon } from "@/icons";
import * as PremiumIcons from "@/icons";
import { PointCursor } from "@/components/ui/PointCursor";
import { Accordion } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Calculator } from "@/components/ui/calculator";
import { DynamicForm, FieldConfig } from "@/components/ui/dynamic-form";
import { Sparkles, Terminal, Mail, Lock, User, Globe, Phone as PhoneIcon, Check as CheckIcon, AlertCircle as AlertCircleIcon, Home, Search, Settings, Compass, MessageSquare, Plus, Monitor, Filter, Check, Copy, X } from "lucide-react";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { BrowserWindow } from "@/components/ui/browser-window";
import { Terminal as UITerminal, type TerminalVariant } from "@/components/ui/terminal";
import { CursorGlowButton } from "@/components/ui/cursor-glow-button";
import { Dock, DockItem, DockDivider } from "@/components/ui/dock";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Toggle } from "@/components/ui/toggle";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { CommandPalette, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut } from "@/components/ui/command-palette";
import { Select, SelectTrigger, SelectContent, SelectSearch, SelectList, SelectGroup, SelectItem, SelectEmpty } from "@/components/ui/select";
import { FileUpload, UploadDropzone, UploadPreview, UploadProgress, FileState } from "@/components/ui/file-upload";
import { FormBuilder, SchemaField } from "@/components/ui/form-builder";
import { KanbanBoard, KanbanColumn, KanbanCard, KanbanColumnData } from "@/components/ui/kanban";
import { WorkflowBuilder, WorkflowCanvas, WorkflowToolbar, WorkflowMiniMap } from "@/components/ui/workflow-builder";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { AIChat, ChatMessages, ChatInput, ChatPromptSuggestions } from "@/components/ui/ai-chat";
import { AutomotiveCarousel } from "@/components/ui/automotive-carousel";
import { ScifiHelmet } from "@/components/ui/scifi-helmet";
import { BmwM4 } from "@/components/ui/bmw-m4";
import { OTPVerification } from "@/components/ui/otp-verification";
import { PremiumUploadButton } from "@/components/ui/premium-upload-button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Typography helper components for the preview
const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold",
      h4: "scroll-m-20 text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
    },
  },
  defaultVariants: { variant: "h1" },
});

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
    },
  },
  defaultVariants: { variant: "default" },
});

const Heading: React.FC<{
  className?: string;
  variant?: any;
  as?: any;
  children: React.ReactNode;
}> = ({ className, variant, as: Tag = "h1", ...props }) => (
  <Tag className={cn(headingVariants({ variant, className }))} {...props} />
);

const Text: React.FC<{
  className?: string;
  variant?: any;
  as?: any;
  children: React.ReactNode;
}> = ({ className, variant, as: Tag = "p", ...props }) => (
  <Tag className={cn(textVariants({ variant, className }))} {...props} />
);

const Label: React.FC<{
  className?: string;
  as?: any;
  children: React.ReactNode;
}> = ({ className, as: Tag = "label", ...props }) => (
  <Tag
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
);

const Code: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  ...props
}) => (
  <code
    className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      className,
    )}
    {...props}
  />
);

// ==========================================
// STANDARD PREVIEW WRAPPER
// ==========================================

interface PreviewContainerProps {
  title: string;
  description?: string;
  variants?: readonly string[];
  activeVariant?: string;
  onVariantChange?: (variant: any) => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  isVirtualScreen?: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  canvasClassName?: string;
  extraControls?: React.ReactNode;
  align?: "center" | "start";
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({
  title,
  description,
  variants,
  activeVariant,
  onVariantChange,
  children,
  className,
  contentClassName,
  isVirtualScreen = true,
  scrollRef,
  canvasClassName,
  extraControls,
  align = "center",
}) => {
  return (
    <div className={cn("w-full h-full flex flex-col overflow-y-auto bg-background", className)}>
      {/* Header & Controls */}
      {((variants && variants.length > 0) || extraControls) && (
        <div className="flex flex-col gap-3 w-full shrink-0 relative z-10 px-4 py-4 md:px-8 md:py-6 bg-transparent">
          {variants && variants.length > 0 && onVariantChange && (
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground">Layout Variant</span>
              <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
                {variants.map(v => (
                  <button
                    key={v}
                    onClick={() => onVariantChange(v)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap",
                      activeVariant === v
                        ? "bg-background shadow-sm text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {extraControls && (
            <div className="w-full flex flex-col gap-3">
              {extraControls}
            </div>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className={cn("flex justify-center flex-1 w-full relative px-2 sm:px-4 pb-4 sm:pb-8 pt-2 sm:pt-4 overflow-y-auto", align === "center" ? "items-center" : "items-start", contentClassName)}>
        {isVirtualScreen ? (
          <BrowserWindow
            title={title}
            className="w-full h-full mx-auto"
            contentClassName={cn("flex flex-col", canvasClassName)}
            scrollRef={scrollRef}
          >
            <div className={cn("w-full h-full flex flex-col relative", align === "center" ? "items-center justify-center" : "items-start justify-start")}>
              {children}
            </div>
          </BrowserWindow>
        ) : (
          <div className={cn("w-full h-full flex flex-col relative", align === "center" ? "items-center justify-center" : "items-start justify-start")}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

const ToastPreview: React.FC = () => {
  const { toast } = useToast();
  const [position, setPosition] = React.useState<
    "top-right" | "top-left" | "bottom-right" | "bottom-left"
  >("bottom-right");

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-md justify-items-stretch">
        {(
          ["top-left", "top-right", "bottom-left", "bottom-right"] as const
        ).map((pos) => (
          <Button
            key={pos}
            variant={position === pos ? "default" : "outline"}
            size="sm"
            onClick={() => setPosition(pos)}
            className="capitalize w-full"
          >
            {pos.replace("-", " ")}
          </Button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => {
            toast({
              title: "Success",
              description: "Toast integrated successfully!",
              position,
            });
          }}
        >
          Show Success Toast
        </Button>

        <Button
          variant="destructive"
          className="w-full sm:w-auto"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Something went wrong!",
              position,
            });
          }}
        >
          Show Destructive Toast
        </Button>
      </div>
    </div>
  );
};

const CalendarPreview: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [highlighted, setHighlighted] = React.useState<Date[]>([]);
  const [variant, setVariant] = React.useState<"modern" | "clean">("modern");

  const toggleHighlight = (targetDate: Date) => {
    setHighlighted((prev) => {
      const exists = prev.some(
        (d) => d.toDateString() === targetDate.toDateString(),
      );
      if (exists) {
        return prev.filter(
          (d) => d.toDateString() !== targetDate.toDateString(),
        );
      }
      return [...prev, targetDate];
    });
  };

  return (
    <PreviewContainer
      title="Calendar"
      description="A beautiful, interactive calendar with selection and highlighting."
      variants={["modern", "clean"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      align="start"
    >
      <div className="flex flex-col items-center justify-start w-full min-h-full p-6 gap-8 py-12">
        <Calendar
          value={date}
          onChange={setDate}
          highlightedDates={highlighted}
          onHighlightToggle={toggleHighlight}
          variant={variant}
        />

        <div className="flex flex-col gap-6 items-center w-full max-w-sm">
          <div className="w-full h-px bg-linear-to-r from-transparent via-border/40 to-transparent" />
          <div className="flex flex-col gap-4 items-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setHighlighted([])}
              className="text-[10px] uppercase tracking-widest font-black h-10 px-6 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
            >
              Clear Highlights
            </Button>
            <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest font-bold text-center leading-relaxed">
              Interact with the grid to{" "}
              <span className="text-primary/60 italic underline underline-offset-4">
                Toggle Highlighting
              </span>{" "}
              or select dates.
            </p>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

const CalculatorPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"glass" | "brutal" | "neon">(
    "glass",
  );

  return (
    <PreviewContainer
      title="Calculator"
      description="A fully functional, styled calculator with various aesthetic variants."
      variants={["glass", "brutal", "neon"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="flex items-center justify-center w-full flex-1">
        <Calculator variant={variant} />
      </div>
    </PreviewContainer>
  );
};

const DynamicFormPreview: React.FC = () => {
  const [activeDemo, setActiveDemo] = React.useState<"contact" | "wizard" | "login">("contact");
  const [submittedData, setSubmittedData] = React.useState<any>(null);

  const contactFields: FieldConfig[] = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "e.g. John Doe",
      required: true,
      icon: User,
      colSpan: 1
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "e.g. john@company.com",
      required: true,
      icon: Mail,
      colSpan: 1
    },
    {
      name: "subject",
      type: "autocomplete",
      label: "Inquiry Subject",
      placeholder: "Select or search...",
      required: true,
      options: [
        { label: "Product Integration Support", value: "integration" },
        { label: "Enterprise Licensing & Sales", value: "sales" },
        { label: "Partnership Opportunities", value: "partnerships" },
        { label: "Other inquiries", value: "other" }
      ],
      colSpan: 2
    },
    {
      name: "otherSubjectDetails",
      type: "text",
      label: "Inquiry Details",
      placeholder: "Provide more details on other subject",
      required: true,
      condition: (values) => values.subject === "other",
      colSpan: 2
    },
    {
      name: "message",
      type: "textarea",
      label: "Detailed Description",
      placeholder: "How can we help your business succeed?",
      required: true,
      colSpan: 2
    },
    {
      name: "interests",
      type: "multi-select",
      label: "Areas of Interest",
      placeholder: "Choose subjects...",
      options: [
        { label: "Next.js 16 Framework", value: "nextjs" },
        { label: "React 19 Server Components", value: "react19" },
        { label: "Tailwind CSS v4.0", value: "tailwind4" },
        { label: "Framer Motion Physics", value: "framer" }
      ],
      colSpan: 2
    },
    {
      name: "newsletter",
      type: "switch",
      label: "Subscribe to our developer newsletters",
      defaultValue: true,
      colSpan: 2
    }
  ];

  const wizardFields: FieldConfig[] = [
    {
      name: "username",
      type: "text",
      label: "Desired Username",
      placeholder: "e.g. johndoe_dev",
      required: true,
      icon: User,
      colSpan: 2
    },
    {
      name: "companyUrl",
      type: "url",
      label: "Company Website URL",
      placeholder: "e.g. https://google.com",
      required: true,
      icon: Globe,
      colSpan: 2
    },
    {
      name: "wizardEmail",
      type: "email",
      label: "Primary Email",
      placeholder: "e.g. dev@company.com",
      required: true,
      icon: Mail,
      colSpan: 1
    },
    {
      name: "wizardPhone",
      type: "phone",
      label: "Phone Number",
      placeholder: "e.g. +1 555-0199",
      required: true,
      icon: PhoneIcon,
      colSpan: 1
    },
    {
      name: "verificationCode",
      type: "otp",
      label: "Enter 6-digit Verification Code",
      required: true,
      otpLength: 6,
      colSpan: 2
    }
  ];

  const wizardSteps = [
    { title: "Profile Credentials", fieldNames: ["username", "companyUrl"] },
    { title: "Contact Details", fieldNames: ["wizardEmail", "wizardPhone"] },
    { title: "Verification Grid", fieldNames: ["verificationCode"] }
  ];

  const loginFields: FieldConfig[] = [
    {
      name: "loginEmail",
      type: "email",
      label: "Corporate Email Address",
      placeholder: "you@enterprise.com",
      required: true,
      icon: Mail,
      colSpan: 2
    },
    {
      name: "loginPassword",
      type: "password",
      label: "Access Password",
      placeholder: "Enter account password",
      required: true,
      icon: Lock,
      colSpan: 2
    },
    {
      name: "rememberMe",
      type: "checkbox",
      label: "Remember this device for 30 days",
      defaultValue: true,
      colSpan: 2
    }
  ];

  return (
    <PreviewContainer
      title="Dynamic Form"
      description="A highly dynamic, JSON-driven form builder with built-in validation."
      variants={["contact", "wizard", "login"]}
      activeVariant={activeDemo}
      contentClassName="items-start py-8"
      align="start"
      onVariantChange={(v) => {
        setActiveDemo(v);
        setSubmittedData(null);
      }}
    >
      <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full max-w-5xl m-auto">
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <AnimatePresence mode="wait">
            {activeDemo === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full"
              >
                <DynamicForm
                  variant="modern"
                  fields={contactFields}
                  submitButtonText="Send Inquiry"
                  showResetButton={true}
                  onSubmit={(data) => {
                    setSubmittedData(data);
                  }}
                />
              </motion.div>
            )}

            {activeDemo === "wizard" && (
              <motion.div
                key="wizard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full"
              >
                <DynamicForm
                  variant="glass"
                  fields={wizardFields}
                  steps={wizardSteps}
                  submitButtonText="Verify & Register"
                  showResetButton={false}
                  onSubmit={(data) => {
                    setSubmittedData(data);
                  }}
                />
              </motion.div>
            )}

            {activeDemo === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-md mx-auto"
              >
                <DynamicForm
                  variant="dark"
                  fields={loginFields}
                  submitButtonText="Authorize Session"
                  showResetButton={true}
                  autoSaveKey="saas_login_autosave"
                  onSubmit={(data) => {
                    setSubmittedData(data);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-80 shrink-0 flex flex-col justify-between p-6 rounded-2xl border border-border/40 bg-muted/10 backdrop-blur-sm">
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-black text-primary flex items-center gap-1.5 select-none">
              <Terminal className="w-4 h-4" /> Live Engine Output
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Submit any of the live forms to see the processed type-safe JSON payload emitted by the validation resolver in real time.
            </p>
          </div>

          <div className="mt-4 flex-1 flex flex-col justify-center min-h-50 border border-dashed border-border/60 rounded-xl p-4 bg-black/5 dark:bg-black/40 overflow-hidden">
            {submittedData ? (
              <div className="space-y-3 h-full flex flex-col justify-between">
                <div className="text-[10px] font-black uppercase tracking-wider text-emerald-500 flex items-center gap-1">
                  <CheckIcon className="w-3.5 h-3.5" /> Payload Validation Passed
                </div>
                <pre className="text-[11px] font-mono text-foreground/80 overflow-auto max-h-48 custom-scrollbar bg-muted/40 p-2 rounded-lg leading-relaxed flex-1 select-text">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSubmittedData(null)}
                  className="w-full h-8 text-[10px] uppercase font-bold tracking-wider"
                >
                  Clear Output
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4 text-muted-foreground/40 space-y-2 select-none h-full">
                <Sparkles className="w-8 h-8 animate-pulse text-muted-foreground/30" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Awaiting Form Submit</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

const DockPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"modern" | "clean" | "interactive">("modern");

  return (
    <PreviewContainer
      title="Dock"
      description="A macOS style animated dock with interactive icons."
      variants={["modern", "clean", "interactive"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="flex flex-col items-center w-full flex-1 justify-center transition-all duration-500 ease-in-out pb-20 pt-16">
        <Dock variant={variant}>
          <DockItem label="Home" href="#"><Home size={20} /></DockItem>
          <DockItem label="Explore" href="#"><Compass size={20} /></DockItem>
          {variant !== "clean" && <DockDivider />}
          <DockItem label="Messages" href="#"><MessageSquare size={20} /></DockItem>
          <DockItem label="Apps" href="#"><Plus size={20} /></DockItem>
          <DockItem label="Desktop" href="#"><Monitor size={20} /></DockItem>
          {variant !== "clean" && <DockDivider />}
          <DockItem label="Settings" onClick={() => {}}><Settings size={20} /></DockItem>
        </Dock>

        <div className="mt-12 text-sm text-center max-w-sm h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={variant}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-muted-foreground"
            >
              {variant === "modern" && "The standard macOS style dock with smooth cinematic scaling and a glassmorphic backdrop."}
              {variant === "clean" && "A minimal, non-scaling dock perfect for standard enterprise dashboards and clean minimal UIs."}
              {variant === "interactive" && "A highly bouncy, playful variant with intense physics, floating elements, and deep shadows."}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </PreviewContainer>
  );
};


const DrawerPreview: React.FC = () => {
  const [placement, setPlacement] = React.useState<"left" | "right" | "top" | "bottom">("right");
  const [variant, setVariant] = React.useState<"default" | "compact" | "glass" | "elevated" | "floating">("default");
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <PreviewContainer
      title="Drawer"
      description="A flexible drawer with placement options and multiple styles."
      variants={["default", "compact", "glass", "elevated", "floating"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      contentClassName="relative overflow-hidden"
      extraControls={
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Placement</span>
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
            {(["left", "right", "top", "bottom"] as const).map(p => (
              <button key={p} onClick={() => setPlacement(p)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", placement === p ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{p}</button>
            ))}
          </div>
        </div>
      }
    >
      <div ref={setContainer} className="flex-1 flex items-center justify-center w-full h-full min-h-75 relative overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <Drawer placement={placement} variant={variant}>
          <DrawerTrigger asChild>
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">Open Drawer</Button>
          </DrawerTrigger>
        <DrawerContent container={container}>
          <DrawerHeader>
            <DrawerTitle>Premium Drawer</DrawerTitle>
            <DrawerDescription>A native feeling interaction powered by Framer Motion.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4 pt-4">
              <div className="w-full h-32 rounded-xl bg-muted animate-pulse" />
              <div className="w-3/4 h-8 rounded-lg bg-muted animate-pulse" />
              <div className="w-1/2 h-8 rounded-lg bg-muted animate-pulse" />
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button className="w-full">Confirm Action</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </div>
    </PreviewContainer>
  );
};

const TogglePreview: React.FC = () => {
  return (
    <PreviewContainer title="Toggle" description="A flexible toggle component with multiple states and variants.">
      <div className="flex flex-col items-center justify-center w-full h-full p-12 space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 justify-items-center">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Default</span>
            <Toggle size="md" variant="default" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Modern</span>
            <Toggle size="md" variant="modern" defaultChecked />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Glass</span>
            <Toggle size="md" variant="glass" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Neon</span>
            <Toggle size="md" variant="neon" defaultChecked />
          </div>
        </div>

        <div className="w-full h-px bg-border/40" />

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Sizes</span>
          <div className="flex items-center gap-8">
            <Toggle size="sm" variant="default" />
            <Toggle size="md" variant="default" defaultChecked />
            <Toggle size="lg" variant="default" />
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

const ModalPreview: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<"default" | "floating" | "glass" | "elevated" | "minimal" | "spotlight">("default");
  const [size, setSize] = React.useState<"xs" | "sm" | "md" | "lg" | "xl" | "full-width" | "full-screen">("md");
  const [position, setPosition] = React.useState<"center" | "top-center" | "bottom-sheet" | "left-side" | "right-side">("center");
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <PreviewContainer
      title="Modal"
      description="A premium modal interface with diverse variants and positions."
      variants={["default", "floating", "glass", "elevated", "minimal", "spotlight"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
              {(["xs", "sm", "md", "lg", "xl", "full-width", "full-screen"] as const).map(s => (
                <button key={s} onClick={() => setSize(s)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", size === s ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Position</span>
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
              {(["center", "top-center", "bottom-sheet", "left-side", "right-side"] as const).map(p => (
                <button key={p} onClick={() => setPosition(p)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", position === p ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{p.replace("-", " ")}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      <div ref={setContainer} className="flex-1 flex flex-col items-center justify-center w-full min-h-100 md:min-h-125 h-full p-4 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-center justify-center w-full h-64 relative">
          <Button onClick={() => setOpen(true)} size="lg" className="rounded-full shadow-lg shadow-primary/20 px-8">Open Modal</Button>
        </div>

        <Modal open={open} onOpenChange={setOpen} variant={variant} size={size} position={position} container={container}>
          <ModalContent container={container}>
            <ModalHeader>
              <ModalTitle>Premium Modal Interface</ModalTitle>
              <ModalDescription>Configure variants, sizes, and positions effortlessly.</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4 py-2">
                <div className="w-full h-32 rounded-xl bg-muted/50 animate-pulse border border-border/50" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-4/6 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-full animate-pulse" />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </PreviewContainer>
  );
};

const CommandPalettePreview: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<"default" | "compact" | "floating" | "glass" | "spotlight">("spotlight");
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

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
      description="A quick, keyboard-accessible command palette."
      variants={["default", "compact", "floating", "glass", "spotlight"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      // Controls removed
    >
      <div ref={setContainer} className="flex flex-col items-center justify-center w-full h-full p-4 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-center justify-center w-full h-32 border border-dashed border-border/50 rounded-2xl relative cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setOpen(true)}>
          <p className="text-muted-foreground font-medium">Click here or press <CommandShortcut className="ml-2 inline-flex bg-background px-1.5 py-0.5 rounded-md border">Cmd+K</CommandShortcut> to open</p>
        </div>

        <CommandPalette open={open} onOpenChange={setOpen} variant={variant} container={container}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>Create New Project</span>
              </CommandItem>
              <CommandItem>
                <Terminal className="mr-2 h-4 w-4" />
                <span>Run Terminal Command</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferences</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Monitor className="mr-2 h-4 w-4" />
                <span>Appearance</span>
                <CommandShortcut>⌘A</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandPalette>
      </div>
    </PreviewContainer>
  );
};

const SelectPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "soft" | "floating" | "glass" | "minimal">("default");
  const [size, setSize] = React.useState<"sm" | "md" | "lg">("md");
  const [isMulti, setIsMulti] = React.useState(false);
  const [searchable, setSearchable] = React.useState(true);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  const frameworks = [
    { value: "nextjs", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxtjs", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "gatsby", label: "Gatsby" },
    { value: "redwood", label: "RedwoodJS" },
    { value: "solidstart", label: "SolidStart" },
  ];

  return (
    <PreviewContainer
      title="Select Input"
      description="A highly customizable select component with search and multi-select capabilities."
      variants={["default", "soft", "floating", "glass", "minimal"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
              {(["sm", "md", "lg"] as const).map((s) => (
                <button key={s} onClick={() => setSize(s)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", size === s ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Mode</span>
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
              <button onClick={() => setIsMulti(false)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", !isMulti ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>Single</button>
              <button onClick={() => setIsMulti(true)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", isMulti ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>Multi</button>
            </div>
          </div>
        </>
      }
    >
      <div ref={setContainer} className="flex flex-col items-center justify-start w-full h-full p-4 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-start justify-center w-full h-full flex-1 pt-12">
          <Select
            key={isMulti ? "multi" : "single"}
            variant={variant}
            size={size}
            multiSelect={isMulti}
            searchable={searchable}
            container={container}
          >
            <SelectTrigger placeholder={isMulti ? "Select frameworks..." : "Select a framework..."} />
            <SelectContent>
              <SelectSearch placeholder="Search framework..." />
              <SelectList>
                <SelectEmpty>No frameworks found.</SelectEmpty>
                <SelectGroup heading="Popular">
                  {frameworks.slice(0, 4).map((fw) => (
                    <SelectItem key={fw.value} value={fw.value} label={fw.label}>
                      {fw.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup heading="Rising">
                  {frameworks.slice(4).map((fw) => (
                    <SelectItem key={fw.value} value={fw.value} label={fw.label}>
                      {fw.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectList>
            </SelectContent>
          </Select>
        </div>
      </div>
    </PreviewContainer>
  );
};

const FileUploadPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "compact" | "card" | "glass" | "minimal">("default");
  const [files, setFiles] = React.useState<FileState[]>([]);

  // Simulate an upload process
  const handleUpload = (filesToUpload: File[]) => {
    // In a real app, this would use XMLHttpRequest or fetch.
    // For the preview, we'll simulate progress per file.
    filesToUpload.forEach((file) => {
      // Small delay before starting
      setTimeout(() => {
        setFiles(prev => prev.map(f => {
          if (f.file === file && f.status === 'idle') return { ...f, status: 'uploading', progress: 0 };
          return f;
        }));

        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15 + 5;

          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setFiles(prev => prev.map(f => {
              if (f.file === file) return { ...f, status: 'success', progress };
              return f;
            }));
          } else {
            setFiles(prev => prev.map(f => {
              if (f.file === file) return { ...f, progress };
              return f;
            }));
          }
        }, 300);
      }, 500);
    });
  };

  return (
    <PreviewContainer
      title="File Upload"
      description="A drag-and-drop file upload component with real-time progress."
      variants={["default", "compact", "card", "glass", "minimal"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-4 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-center justify-center w-full max-w-md flex-1 mb-32 pt-12">
          <FileUpload
            variant={variant}
            maxFiles={5}
            maxSize={1024 * 1024 * 10} // 10MB
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".gif"],
              "video/*": [".mp4", ".webm"],
              "application/pdf": [".pdf"]
            }}
            onUpload={handleUpload}
            onFilesChange={setFiles}
          >
            <UploadDropzone />
            <UploadPreview />
            <UploadProgress />
          </FileUpload>
        </div>
      </div>
    </PreviewContainer>
  );
};

const sampleSchema: SchemaField[] = [
  {
    name: "personalInfo",
    type: "group",
    label: "Personal Information",
    description: "Please provide your basic details.",
    colSpan: "full",
    fields: [
      { name: "firstName", type: "text", label: "First Name", placeholder: "John", required: true, colSpan: 2 },
      { name: "lastName", type: "text", label: "Last Name", placeholder: "Doe", required: true, colSpan: 2 },
      { name: "email", type: "email", label: "Email Address", placeholder: "john@example.com", required: true, colSpan: "full" },
    ]
  },
  {
    name: "role",
    type: "select",
    label: "Role",
    placeholder: "Select a role",
    required: true,
    colSpan: 2,
    options: [
      { label: "Developer", value: "developer" },
      { label: "Designer", value: "designer" },
      { label: "Manager", value: "manager" },
    ]
  },
  {
    name: "experience",
    type: "number",
    label: "Years of Experience",
    placeholder: "e.g. 5",
    required: true,
    colSpan: 2,
    validation: { min: 0, max: 50 }
  },
  {
    name: "teamMembers",
    type: "array",
    label: "Team Members",
    description: "Add members who will report to you.",
    colSpan: "full",
    showIf: (values) => values.role === "manager",
    fields: [
      { name: "name", type: "text", label: "Member Name", placeholder: "Jane Doe", required: true, colSpan: 2 },
      { name: "title", type: "text", label: "Title", placeholder: "Engineer", required: true, colSpan: 2 },
    ]
  },
  {
    name: "terms",
    type: "checkbox",
    label: "I agree to the terms and conditions",
    required: true,
    colSpan: "full"
  }
];

const FormBuilderPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "minimal" | "enterprise" | "compact">("default");
  const [layout, setLayout] = React.useState<"single" | "two" | "three" | "auto">("auto");
  const [submittedData, setSubmittedData] = React.useState<any>(null);

  return (
    <PreviewContainer
      title="Form Builder"
      description="A schema-driven form builder for rapid layout construction."
      variants={["default", "minimal", "enterprise", "compact"]}
      activeVariant={variant}
      align="start"
      onVariantChange={setVariant}
      extraControls={
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Layout Mode</span>
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
            {(["auto", "single", "two", "three"] as const).map((l) => (
              <button key={l} onClick={() => setLayout(l)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", layout === l ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{l}</button>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-start w-full min-h-full p-4 md:p-8 relative z-10" style={{ transform: 'translateZ(0)' }}>
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <FormBuilder
              schema={sampleSchema}
              variant={variant}
              layout={layout}
              onSubmit={(data) => setSubmittedData(data)}
            />
          </div>
          {submittedData && (
            <div className="w-full lg:w-80 shrink-0">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <h4 className="text-sm font-semibold mb-2">Submitted Data</h4>
                <pre className="text-xs overflow-auto p-3 rounded-lg bg-background border border-border/50">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </PreviewContainer>
  );
};

const initialKanbanData: KanbanColumnData[] = [
  {
    id: "col-todo",
    title: "To Do",
    cards: [
      { id: "c1", title: "Research competitors", priority: "medium", dueDate: "Oct 12", labels: [{ text: "Design", color: "#8b5cf6" }] },
      { id: "c2", title: "Setup monorepo", priority: "high", dueDate: "Oct 14", labels: [{ text: "Engineering", color: "#3b82f6" }], assignees: [{ name: "Alex" }] },
      { id: "c3", title: "Draft documentation", priority: "low", comments: 2 },
    ]
  },
  {
    id: "col-prog",
    title: "In Progress",
    cards: [
      { id: "c4", title: "Implement Kanban Board", priority: "urgent", dueDate: "Oct 10", labels: [{ text: "Feature", color: "#10b981" }], assignees: [{ name: "Sam" }, { name: "Jordan" }] },
      { id: "c5", title: "Fix API routing bug", priority: "high", attachments: 1 },
    ]
  },
  {
    id: "col-done",
    title: "Done",
    cards: [
      { id: "c6", title: "Design system audit", priority: "medium", labels: [{ text: "Design", color: "#8b5cf6" }] },
    ]
  }
];

const KanbanPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "compact" | "enterprise" | "minimal">("enterprise");

  return (
    <PreviewContainer
      title="Kanban Board"
      description="A highly interactive, drag-and-drop Kanban board."
      variants={["default", "compact", "enterprise", "minimal"]}
      activeVariant={variant}
      align="start"
      onVariantChange={setVariant}
    >
      <div className="w-full flex justify-center self-start">
        <KanbanBoard variant={variant} initialColumns={initialKanbanData} />
      </div>
    </PreviewContainer>
  );
};

const WorkflowPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "compact" | "enterprise" | "minimal" | "glass">("enterprise");

  return (
    <PreviewContainer
      title="Workflow Builder"
      description="A node-based visual workflow editor for powerful automation pipelines."
      variants={["default", "enterprise", "minimal", "glass", "compact"]}
      activeVariant={variant}
      align="start"
      onVariantChange={setVariant}
    >
      <div className="w-full h-full min-h-150 p-4 md:p-8 flex items-center justify-center relative z-10">
        <div className="w-full h-150 max-w-5xl bg-background/20 rounded-xl overflow-hidden p-0 border border-border/50 relative shadow-xl">
          <WorkflowBuilder
            variant={variant}
            initialNodes={[
              { id: "trigger-1", type: "trigger", position: { x: 100, y: 150 }, data: { label: "Schedule Trigger", description: "Runs every 1 hour" } },
              { id: "agent-1", type: "agent", position: { x: 450, y: 150 }, data: { label: "AI Classifier", description: "Analyzes incoming data" } },
              { id: "action-1", type: "action", position: { x: 800, y: 50 }, data: { label: "Slack Notification", description: "Send positive reviews" } },
              { id: "action-2", type: "action", position: { x: 800, y: 250 }, data: { label: "Zendesk Ticket", description: "Flag negative reviews" } }
            ]}
            initialEdges={[
              { id: "e1", source: "trigger-1", target: "agent-1", animated: true },
              { id: "e2", source: "agent-1", target: "action-1" },
              { id: "e3", source: "agent-1", target: "action-2" }
            ]}
            className="w-full h-full"
          >
            <WorkflowCanvas />
            <WorkflowToolbar />
            <WorkflowMiniMap />
          </WorkflowBuilder>
        </div>
      </div>
    </PreviewContainer>
  );
};

// ==========================================
// FILTER BUILDER
// ==========================================

const DEMO_TASKS = [
  { id: 1, title: "Implement new dashboard", status: "in_progress", priority: "critical", assignee: "Alice", due_date: "2026-06-15", story_points: 8, is_active: true, tags: ["frontend", "ui"] },
  { id: 2, title: "Fix login bug", status: "todo", priority: "high", assignee: "Bob", due_date: "2026-06-05", story_points: 3, is_active: true, tags: ["bug", "auth"] },
  { id: 3, title: "Update dependencies", status: "done", priority: "low", assignee: "Charlie", due_date: "2026-05-20", story_points: 2, is_active: false, tags: ["chore"] },
  { id: 4, title: "Write API documentation", status: "todo", priority: "medium", assignee: "Alice", due_date: "2026-06-10", story_points: 5, is_active: true, tags: ["docs", "api"] },
  { id: 5, title: "Design landing page", status: "in_progress", priority: "high", assignee: "Bob", due_date: "2026-06-25", story_points: 13, is_active: true, tags: ["design", "marketing"] },
  { id: 6, title: "Setup CI/CD pipeline", status: "done", priority: "critical", assignee: "Diana", due_date: "2026-05-15", story_points: 8, is_active: false, tags: ["devops", "infrastructure"] },
  { id: 7, title: "Optimize database queries", status: "todo", priority: "high", assignee: "Charlie", due_date: "2026-06-30", story_points: 5, is_active: true, tags: ["backend", "performance"] },
  { id: 8, title: "User testing session", status: "in_progress", priority: "medium", assignee: "Diana", due_date: "2026-06-12", story_points: 3, is_active: true, tags: ["research", "qa"] },
  { id: 9, title: "Refactor state management", status: "todo", priority: "medium", assignee: "Alice", due_date: "2026-07-05", story_points: 13, is_active: false, tags: ["frontend", "tech-debt"] },
  { id: 10, title: "Fix payment gateway timeout", status: "in_progress", priority: "critical", assignee: "Charlie", due_date: "2026-06-02", story_points: 8, is_active: true, tags: ["bug", "payments"] },
  { id: 11, title: "Create email templates", status: "done", priority: "low", assignee: "Bob", due_date: "2026-05-28", story_points: 2, is_active: false, tags: ["design", "email"] },
  { id: 12, title: "Audit security policies", status: "todo", priority: "high", assignee: "Diana", due_date: "2026-06-20", story_points: 5, is_active: true, tags: ["security", "compliance"] },
];

const evaluateRule = (task: any, rule: FilterRule) => {
  const taskValue = task[rule.fieldId];
  const filterValue = rule.value;

  if (rule.operatorId === "is_empty") return !taskValue;
  if (rule.operatorId === "is_not_empty") return !!taskValue;

  if (taskValue === undefined) return false;

  const valString = String(taskValue).toLowerCase();
  const filterString = String(filterValue).toLowerCase();

  switch (rule.operatorId) {
    case "eq": return valString === filterString;
    case "neq": return valString !== filterString;
    case "contains": return valString.includes(filterString);
    case "not_contains": return !valString.includes(filterString);
    case "starts_with": return valString.startsWith(filterString);
    case "ends_with": return valString.endsWith(filterString);
    case "gt": return Number(taskValue) > Number(filterValue);
    case "lt": return Number(taskValue) < Number(filterValue);
    default: return false;
  }
};

const evaluateGroup = (task: any, group: FilterGroup): boolean => {
  if (!group.children || group.children.length === 0) return true;

  if (group.logicalOperator === "AND") {
    return group.children.every(child =>
      child.type === "group" ? evaluateGroup(task, child as FilterGroup) : evaluateRule(task, child as FilterRule)
    );
  } else {
    return group.children.some(child =>
      child.type === "group" ? evaluateGroup(task, child as FilterGroup) : evaluateRule(task, child as FilterRule)
    );
  }
};

function FilterBuilderPreview() {
  const [variant, setVariant] = useState<"default" | "minimal" | "enterprise" | "compact" | "glass">("default");

  const fields: FilterField[] = [
    { id: "status", label: "Status", type: "select", options: [
      { value: "todo", label: "To Do" },
      { value: "in_progress", label: "In Progress" },
      { value: "done", label: "Done" }
    ]},
    { id: "priority", label: "Priority", type: "select", options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "critical", label: "Critical" }
    ]},
    { id: "assignee", label: "Assignee", type: "user" },
    { id: "due_date", label: "Due Date", type: "date" },
    { id: "story_points", label: "Story Points", type: "number" },
    { id: "title", label: "Title", type: "text" },
    { id: "tags", label: "Labels", type: "tags" },
    { id: "is_active", label: "Active", type: "boolean" },
  ];

  const [data, setData] = useState<FilterGroup>(() => {
    // Initial realistic data with hardcoded IDs to prevent SSR hydration mismatch
    const root: FilterGroup = {
      type: "group",
      id: "root-group-1",
      logicalOperator: "AND",
      children: []
    };
    root.children = [
      { type: "rule", id: "r1", fieldId: "status", operatorId: "eq", value: "in_progress" },
      {
        type: "group",
        id: "g1",
        logicalOperator: "OR",
        children: [
          { type: "rule", id: "r2", fieldId: "priority", operatorId: "eq", value: "high" },
          { type: "rule", id: "r3", fieldId: "priority", operatorId: "eq", value: "critical" },
        ]
      }
    ];
    return root;
  });

  return (
    <PreviewContainer
      title="Filter Builder"
      description="Manage and filter your project tasks with advanced query logic."
      variants={["default", "minimal", "enterprise", "compact", "glass"]}
      activeVariant={variant}
      align="start"
      onVariantChange={setVariant}
      contentClassName="bg-transparent border-none p-4 md:p-8 shadow-none min-h-0 items-start overflow-y-auto custom-scrollbar"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-2 space-y-6">

          {/* The Component Itself */}
          <div className={cn(
            "rounded-2xl transition-all duration-500",
            variant === "glass" ? "p-6 bg-linear-to-br from-background/40 to-background/10 backdrop-blur-xl border border-white/10 shadow-2xl" : "",
            variant !== "glass" && variant !== "minimal" ? "p-6 bg-background border shadow-sm" : "",
            variant === "minimal" ? "p-2" : ""
          )}>
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filter Rules
            </div>
            <FilterBuilder
              initialData={data}
              onChange={setData}
              fields={fields}
              variant={variant}
            />
          </div>

          {/* Active Results Table */}
          <div className="bg-background rounded-2xl border shadow-sm overflow-hidden flex flex-col h-75">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 p-4 border-b bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
              <div className="col-span-2">Task Title</div>
              <div>Status</div>
              <div>Priority</div>
              <div className="hidden sm:block">Assignee</div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {DEMO_TASKS.filter(t => evaluateGroup(t, data)).length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60"
                  >
                    <Filter className="w-8 h-8 text-muted-foreground mb-3" />
                    <h3 className="text-sm font-medium">No tasks found</h3>
                    <p className="text-xs text-muted-foreground mt-1">Try adjusting your filter rules.</p>
                  </motion.div>
                ) : (
                  DEMO_TASKS.filter(t => evaluateGroup(t, data)).map(task => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={task.id}
                      className="grid grid-cols-4 sm:grid-cols-5 gap-4 p-3 rounded-xl hover:bg-muted/50 items-center text-sm transition-colors border border-transparent hover:border-border/50 mb-1"
                    >
                      <div className="col-span-2 font-medium truncate">{task.title}</div>
                      <div className="min-w-0 flex">
                        <Badge variant={task.status === "done" ? "default" : task.status === "in_progress" ? "secondary" : "outline"} className="capitalize max-w-full">
                          <span className="truncate block w-full text-center">{task.status.replace("_", " ")}</span>
                        </Badge>
                      </div>
                      <div>
                        <span className={cn(
                          "text-xs font-medium px-2 py-1 rounded-md capitalize",
                          task.priority === "critical" && "bg-red-500/10 text-red-500",
                          task.priority === "high" && "bg-orange-500/10 text-orange-500",
                          task.priority === "medium" && "bg-blue-500/10 text-blue-500",
                          task.priority === "low" && "bg-slate-500/10 text-slate-500"
                        )}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                          {task.assignee.charAt(0)}
                        </div>
                        <span className="text-muted-foreground truncate">{task.assignee}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Output State Viewer */}
        <div className="bg-background rounded-2xl border p-5 overflow-hidden flex flex-col h-125 lg:h-auto shadow-sm relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-foreground">Output JSON</span>
            </div>
            <div className="px-2 py-1 rounded bg-muted text-[10px] text-muted-foreground font-medium">
              Live State
            </div>
          </div>
          <div className="flex-1 overflow-auto rounded-xl border bg-muted/30 p-4 custom-scrollbar">
            <pre
              className="text-[11px] leading-relaxed text-foreground font-mono whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, '<span class="text-indigo-300">"$1"</span>:')
              }}
            />
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}

export const PreviewRegistry: Record<string, React.FC> = {
  footer: function FooterPreview() {
    return (
      <PreviewContainer 
        title="Footer" 
        description="A minimal, modern footer component for Future UI." 
        isVirtualScreen={true}
        align="start"
      >
        <div className="w-full flex items-end min-h-[400px] mt-auto">
          <Footer />
        </div>
      </PreviewContainer>
    );
  },
  "premium-upload-button": function PremiumUploadButtonPreview() {
    const [variant, setVariant] = React.useState<"clean" | "modern" | "minimal" | "enterprise" | "windows" | "futuristic" | "apple" | "ai">("modern");
    return (
      <PreviewContainer 
        title="Premium Upload Button" 
        description="A premium, highly interactive file upload button with various design variants." 
        isVirtualScreen={true}
        variants={["clean", "modern", "minimal", "enterprise", "windows", "futuristic", "apple", "ai"]}
        activeVariant={variant}
        onVariantChange={setVariant}
      >
        <div className="w-full flex items-center justify-center p-4 min-h-[400px]">
          <PremiumUploadButton variant={variant} />
        </div>
      </PreviewContainer>
    );
  },
  primary: function PrimaryPreview() {
    return (
      <PreviewContainer title="Primary Button" description="Semantic primary buttons with micro-interactions.">
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-items-center w-full">
            <PrimaryButton variant="primary">Primary</PrimaryButton>
            <PrimaryButton variant="success">Success</PrimaryButton>
            <PrimaryButton variant="warning">Warning</PrimaryButton>
            <PrimaryButton variant="danger">Danger</PrimaryButton>
            <PrimaryButton variant="info">Info</PrimaryButton>
            <PrimaryButton variant="secondary">Secondary</PrimaryButton>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "glass-panel": function GlassPanelPreview() {
    return (
      <PreviewContainer title="Glass Panel" description="A premium glassmorphic panel with heavy blur and luminous shadows.">
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75 relative">
          <DotBackground dotColor="currentColor" maskOpacity={0.1} />
          <div className="relative z-10 w-full max-w-lg">
            <GlassPanel variant="heavy" glow="subtle" className="p-8">
              <h2 className="text-xl font-bold mb-4">Glassmorphism</h2>
              <p className="text-muted-foreground">This panel uses heavy background blur with subtle border highlights to create a premium frosted glass effect.</p>
            </GlassPanel>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "hover-glare-card": function HoverGlareCardPreview() {
    const [layout, setLayout] = React.useState<"default" | "media" | "content" | "stats" | "compact" | "feature">("default");
    const [styleVariant, setStyleVariant] = React.useState<"default" | "glass" | "solid" | "ghost">("glass");
    const [glow, setGlow] = React.useState<"none" | "primary" | "secondary" | "white">("primary");
    return (
      <PreviewContainer
        title="Hover Glare Card"
        description="A highly composable premium card with a signature diagonal glare sweep. Supports multiple real-world layouts."
        variants={["default", "media", "content", "stats", "compact", "feature"]}
        activeVariant={layout}
        onVariantChange={setLayout as any}
        extraControls={
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full mt-2">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Style & Glow</span>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
                {(["default", "glass", "solid", "ghost"] as const).map(v => (
                  <button key={v} onClick={() => setStyleVariant(v)} className={cn("px-3 py-1 text-xs font-medium rounded-md capitalize transition-all", styleVariant === v ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{v}</button>
                ))}
              </div>
              <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-muted-foreground mx-2">Glow:</span>
                {(["none", "primary", "secondary", "white"] as const).map(g => (
                  <button key={g} onClick={() => setGlow(g)} className={cn("px-2 py-1 text-xs font-medium rounded-md capitalize transition-all", glow === g ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{g}</button>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <div className="flex items-center justify-center w-full h-full p-4 sm:p-8 min-h-100">
          <HoverGlareCard
            layout={layout}
            variant={styleVariant}
            glow={glow}
          />
        </div>
      </PreviewContainer>
    );
  },
  "noir-hero-3d": function NoirHero3DPreview() {
    return (
      <PreviewContainer title="Noir Hero 3D" description="A premium 3D geometric centerpiece built with React Three Fiber.">
        <div className="w-full h-full min-h-125 bg-black rounded-xl overflow-hidden relative">
          <NoirHero3D className="w-full h-full" />
        </div>
      </PreviewContainer>
    );
  },
  header: function HeaderPreview() {
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
  },
  glowy: function GlowyPreview() {
    return (
      <PreviewContainer title="Glowy Button" description="Buttons with a highly aesthetic background glow effect on hover.">
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
          <div className="flex flex-wrap gap-6 items-center justify-center w-full">
            <GlowyButton variant="primary">Primary</GlowyButton>
            <GlowyButton variant="success">Success</GlowyButton>
            <GlowyButton variant="danger">Danger</GlowyButton>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "basic-card": function BasicCardPreview() {
    const [variant, setVariant] = React.useState<
      "default" | "elevated" | "interactive" | "feature" | "stats" | "content" | "compact" | "media"
    >("default");

    return (
      <PreviewContainer
        title="Basic Card"
        description="A premium composable card system. Each variant is purpose-built for a specific UI context."
        variants={["default", "elevated", "interactive", "feature", "stats", "content", "compact", "media"]}
        activeVariant={variant}
        onVariantChange={setVariant}
      >
        <div className="w-full flex items-center justify-center p-8">
          <BasicCard variant={variant} />
        </div>
      </PreviewContainer>
    );
  },
  "boxy-rotate": function BoxyRotatePreview() {
    return (
      <PreviewContainer title="Boxy Rotate Loader" description="A minimal 3D rotating box loader.">
        <BoxyRotateLoader />
      </PreviewContainer>
    );
  },
  "boxy-bounce": function BoxyBouncePreview() {
    return (
      <PreviewContainer title="Boxy Bounce Loader" description="A playful bouncing box loader.">
        <BoxyBounceLoader />
      </PreviewContainer>
    );
  },
  "boxy-shift": function BoxyShiftPreview() {
    return (
      <PreviewContainer title="Boxy Shift Loader" description="An elegant shifting box loader.">
        <BoxyShiftLoader />
      </PreviewContainer>
    );
  },
  "text-system": function TextSystemPreview() {
    return (
      <PreviewContainer title="Text System" description="A robust and fully responsive typography system." align="start">
        <div className="max-w-2xl w-full flex flex-col gap-8 select-text text-left">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-blue-500">
              Semantic Headings
            </Label>
            <Heading variant="h1">Heading 1</Heading>
            <Heading variant="h2">Heading 2</Heading>
            <Heading variant="h3">Heading 3</Heading>
          </div>
          <div className="space-y-4">
            <Label className="text-xs uppercase tracking-widest text-emerald-500">
              Text Variants
            </Label>
            <Text variant="lead">
              This is a lead paragraph with larger font and muted color.
            </Text>
            <Text>
              This is the default body text that users will read most of the time.
            </Text>
            <Text variant="large">This is large text for emphasis.</Text>
            <Text variant="muted">
              This is muted text for secondary information.
            </Text>
            <Text variant="blockquote">
              &quot;This is a blockquote variant for citing sources or
              highlighting quotes.&quot;
            </Text>
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-orange-500">
              Form Elements
            </Label>
            <div className="flex flex-col gap-2">
              <Label>Input Label</Label>
              <div className="flex items-center gap-2">
                <Code>npm install futureuikit</Code>
              </div>
            </div>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "infinite-slider": function InfiniteSliderPreview() {
    return (
      <PreviewContainer title="Carousel Slider" description="An expansive interactive image slider." contentClassName="p-0 border-none">
        <CarouselSlider
          slides={[
            {
              id: 1,
              tag: "EXPLORE",
              title: "EXOTIC ADVENTURE",
              location: "Bali, Indonesia",
              image:
                "https://images.unsplash.com/photo-1556206079-747a7a424d3d?ixlib=rb-4.0.3&q=80",
              tagBg: "bg-indigo-600",
            },
            {
              id: 2,
              tag: "CITY",
              title: "URBAN EXPLORER",
              location: "Tokyo, Japan",
              image:
                "https://images.unsplash.com/photo-1571900670723-a317a66e3fb7?ixlib=rb-4.0.3&q=80",
              tagBg: "bg-emerald-600",
            },
            {
              id: 3,
              tag: "NATURE",
              title: "MOUNTAIN RETREAT",
              location: "Swiss Alps",
              image:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80",
              tagBg: "bg-amber-600",
            },
          ]}
        />
      </PreviewContainer>
    );
  },
  menu: function NavMenuPreview() {
    return (
      <PreviewContainer title="Navigation Menu" description="A dynamic floating menu." contentClassName="relative">
        <NavMenu />
      </PreviewContainer>
    );
  },
  "error-page": function ErrorPagePreview() {
    return (
      <PreviewContainer title="Error Page" description="A clean, full-screen error component." contentClassName="p-0">
        <ErrorPage errorCode="404" errorText="ERROR" />
      </PreviewContainer>
    );
  },
  "expanding-card": function ExpandingCardPreview() {
    return (
      <PreviewContainer title="Expanding Flex Card" description="A beautiful, interactive expanding flex layout.">
        <ExpandingFlexCard
          options={[
            {
              id: 1,
              main: "Forest",
              sub: "Majestic trees",
              img: "https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
              icon: "🚶",
            },
            {
              id: 2,
              main: "Winter",
              sub: "Delicate fall",
              img: "https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg",
              icon: "❄️",
            },
            {
              id: 3,
              main: "Ocean",
              sub: "Deep blue",
              img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
              icon: "🌊",
            },
            {
              id: 4,
              main: "Desert",
              sub: "Golden sands",
              img: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?ixlib=rb-4.0.3&q=80",
              icon: "☀️",
            },
          ]}
        />
      </PreviewContainer>
    );
  },
  basic: function BasicLoaderPreview() {
    const [variant, setVariant] = useState<"modern" | "clean" | "minimal">("modern");
    return (
      <PreviewContainer
        title="Basic Loader"
        description="Versatile spinning or pulsing loaders."
        variants={["modern", "clean", "minimal"]}
        activeVariant={variant}
        onVariantChange={setVariant}
      >
        <div className="flex flex-col gap-4 items-center justify-center min-h-75">
          <BasicLoader
            variant={variant}
            color={variant === "clean" ? "#10b981" : variant === "minimal" ? "#f59e0b" : "#3b82f6"}
            text={variant === "clean" ? "Clean Dots..." : variant === "minimal" ? "Minimal..." : "Modern Rings..."}
          />
        </div>
      </PreviewContainer>
    );
  },
  toast: function ToastWrapperPreview() {
    return (
      <PreviewContainer title="Toast Notifications" description="Customizable toast notification system.">
        <ToastPreview />
      </PreviewContainer>
    );
  },
  "dot-background": function DotBackgroundPreview() {
    return (
      <PreviewContainer title="Dot Background" description="A clean, dot-matrix style background component." contentClassName="p-0 border-none">
        <DotBackground dotColor="#6366f1" maskOpacity={0.5}>
          <div className="flex items-center justify-center w-full h-full min-h-100">
            <h3 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase opacity-50 text-foreground">
              Premium Dotted Grid
            </h3>
          </div>
        </DotBackground>
      </PreviewContainer>
    );
  },
  badge: function BadgePreview() {
    return (
      <PreviewContainer title="Badge" description="A small status descriptor for UI elements.">
        <div className="flex flex-wrap gap-8 items-center justify-center w-full">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </PreviewContainer>
    );
  },
  button: function StandardButtonPreview() {
    return (
      <PreviewContainer title="Standard Button" description="The base button component matching Radix / shadcn spec.">
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
          <div className="flex flex-wrap gap-8 items-center justify-center w-full">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">
              <GithubIcon className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="default" className="bg-[#0077b5] text-white hover:bg-[#0077b5]/90">
              <LinkedinIcon className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  card: function StandardCardPreview() {
    const [variant, setVariant] = React.useState<"default" | "outline" | "ghost" | "glass">("default");

    return (
      <PreviewContainer
        title="Standard Card"
        description="A base structural card component."
        variants={["default", "outline", "ghost", "glass"]}
        activeVariant={variant}
        onVariantChange={setVariant as any}
      >
        <Card className="w-full max-w-md mx-auto" variant={variant}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-left">
              Card Content inside the default card.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Action</Button>
          </CardFooter>
        </Card>
      </PreviewContainer>
    );
  },
  "sidebar-button": function SidebarButtonPreview() {
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
  },
  particles: function ParticlesPreview() {
    return (
      <PreviewContainer title="Particles" description="A dynamic particle system for beautiful backgrounds." contentClassName="bg-slate-950 dark:bg-background p-0 border-none">
        <div className="w-full h-full relative overflow-hidden min-h-100">
          <Particles quantity={150} color="#3b82f6" />
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <h3 className="text-2xl font-bold text-white dark:text-foreground italic tracking-tighter uppercase">
              Dynamic Particle System
            </h3>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "perspective-grid": function PerspectiveGridPreview() {
    return (
      <PreviewContainer title="Perspective Grid" description="A 3D perspective grid horizon background." contentClassName="bg-slate-950 dark:bg-background p-0 border-none">
        <div className="w-full h-full relative overflow-hidden min-h-100">
          <PerspectiveGrid gridLineGap={50} />
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <h3 className="text-2xl font-bold text-white dark:text-foreground italic tracking-tighter uppercase">
              Perspective Horizon
            </h3>
          </div>
        </div>
      </PreviewContainer>
    );
  },

  "search": function SearchPreview() {
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
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground hidden sm:block">Size & State</span>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
            {(["sm", "md", "lg"] as const).map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap",
                  size === s ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-border hidden sm:block"></div>

          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
            <button onClick={() => setLoading(!loading)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200", loading ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>Loading</button>
            <button onClick={() => setDisabled(!disabled)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200", disabled ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>Disabled</button>
            <button onClick={() => setClearable(!clearable)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200", clearable ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>Clearable</button>
            <button onClick={() => setFullWidth(!fullWidth)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200", fullWidth ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>Full Width</button>
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
        extraControls={controls}
      >
        <div className="w-full h-full flex flex-col items-center justify-center min-h-100 relative overflow-hidden">
           <div className="w-full max-w-2xl mx-auto relative flex justify-center">
             <SearchComponent
               variant={variant}
               inputVariant={inputVariant}
               size={size}
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
  },
  "search-input": function SearchInputPreview() {
    const [variant, setVariant] = React.useState<"default" | "minimal" | "glass" | "pill">("default");
    return (
      <PreviewContainer
        title="Search Input"
        description="A highly styled, interactive search input component with micro-animations."
        variants={["default", "minimal", "glass", "pill"]}
        activeVariant={variant}
        onVariantChange={setVariant as any}
      >
        <div className="w-full max-w-sm">
          <SearchInput placeholder="Try searching 'button'..." variant={variant} data={componentsList} />
        </div>
      </PreviewContainer>
    );
  },
  "icons": function IconsPreview() {
    const [animate, setAnimate] = useState(true);
    const _STATIC_ICONS = [
      {
        name: "GithubIcon",
        label: "GitHub",
        description: "The official GitHub logo as a clean, scalable SVG React component.",
        tags: ["social", "developer", "git", "github"],
        render: (props: any) => <GithubIcon {...props} animate={animate} />,
      },
      {
        name: "LinkedinIcon",
        label: "LinkedIn",
        description: "The official LinkedIn logo as a clean, scalable SVG React component.",
        tags: ["social", "professional", "network", "linkedin"],
        render: (props: any) => <LinkedinIcon {...props} animate={animate} />,
      },
      {
        name: "TwitterIcon",
        label: "Twitter",
        description: "The classic Twitter bird logo with premium hover and entry animations.",
        tags: ["social", "classic", "twitter", "bird"],
        render: (props: any) => <TwitterIcon {...props} animate={animate} />,
      },
      {
        name: "InstagramIcon",
        label: "Instagram",
        description: "Modern Instagram camera icon with smooth path drawing and spring effects.",
        tags: ["social", "photo", "instagram", "meta"],
        render: (props: any) => <InstagramIcon {...props} animate={animate} />,
      },
      {
        name: "DiscordIcon",
        label: "Discord",
        description: "The Discord gaming logo with reactive hover physics and blinking effects.",
        tags: ["social", "gaming", "discord", "chat"],
        render: (props: any) => <DiscordIcon {...props} animate={animate} />,
      },
      {
        name: "YoutubeIcon",
        label: "YouTube",
        description: "Premium YouTube icon with interactive play-button micro-animations.",
        tags: ["social", "video", "youtube", "google"],
        render: (props: any) => <YoutubeIcon {...props} animate={animate} />,
      },
      {
        name: "XIcon",
        label: "X (Twitter)",
        description: "The new X brand logo with high-speed rotation and path drawing motion.",
        tags: ["social", "x", "twitter", "modern"],
        render: (props: any) => <XIcon {...props} animate={animate} />,
      },
      {
        name: "ChevronUpIcon",
        label: "Chevron Up",
        description: "A smoothly animated upward-pointing chevron for menus and accordions.",
        tags: ["ui", "arrow", "chevron", "up", "direction"],
        render: (props: any) => <ChevronUpIcon {...props} animate={animate} />,
      },
      {
        name: "ChevronDownIcon",
        label: "Chevron Down",
        description: "A smoothly animated downward-pointing chevron for dropdowns and expansible content.",
        tags: ["ui", "arrow", "chevron", "down", "direction"],
        render: (props: any) => <ChevronDownIcon {...props} animate={animate} />,
      },
      {
        name: "ChevronLeftIcon",
        label: "Chevron Left",
        description: "A smoothly animated left-pointing chevron for back buttons and pagination.",
        tags: ["ui", "arrow", "chevron", "left", "direction"],
        render: (props: any) => <ChevronLeftIcon {...props} animate={animate} />,
      },
      {
        name: "ChevronRightIcon",
        label: "Chevron Right",
        description: "A smoothly animated right-pointing chevron for forward buttons and navigation.",
        tags: ["ui", "arrow", "chevron", "right", "direction"],
        render: (props: any) => <ChevronRightIcon {...props} animate={animate} />,
      },
      {
        name: "SunIcon",
        label: "Sun",
        description: "A premium animated sun icon, perfect for light mode toggles.",
        tags: ["ui", "theme", "light", "sun", "day"],
        render: (props: any) => <SunIcon {...props} animate={animate} />,
      },
      {
        name: "MoonIcon",
        label: "Moon",
        description: "A premium animated moon icon, perfect for dark mode toggles.",
        tags: ["ui", "theme", "dark", "moon", "night"],
        render: (props: any) => <MoonIcon {...props} animate={animate} />,
      },
      {
        name: "SearchIcon",
        label: "Search",
        description: "An animated magnifying glass for beautiful search interactions.",
        tags: ["ui", "search", "find", "magnify"],
        render: (props: any) => <SearchIcon {...props} animate={animate} />,
      },
      {
        name: "LoaderIcon",
        label: "Loader Spinner",
        description: "A silky smooth infinite rotating spinner with draw-in animation.",
        tags: ["ui", "loader", "spinner", "loading"],
        render: (props: any) => <LoaderIcon {...props} animate={animate} />,
      },
      {
        name: "ArrowUpIcon",
        label: "Arrow Up",
        description: "A premium upward arrow with two-step spring motion.",
        tags: ["ui", "arrow", "up", "direction"],
        render: (props: any) => <ArrowUpIcon {...props} animate={animate} />,
      },
      {
        name: "ArrowDownIcon",
        label: "Arrow Down",
        description: "A premium downward arrow with two-step spring motion.",
        tags: ["ui", "arrow", "down", "direction"],
        render: (props: any) => <ArrowDownIcon {...props} animate={animate} />,
      },
      {
        name: "ArrowLeftIcon",
        label: "Arrow Left",
        description: "A premium leftward arrow with two-step spring motion.",
        tags: ["ui", "arrow", "left", "direction"],
        render: (props: any) => <ArrowLeftIcon {...props} animate={animate} />,
      },
      {
        name: "ArrowRightIcon",
        label: "Arrow Right",
        description: "A premium rightward arrow with two-step spring motion.",
        tags: ["ui", "arrow", "right", "direction"],
        render: (props: any) => <ArrowRightIcon {...props} animate={animate} />,
      },
      {
        name: "ArrowUpRightIcon",
        label: "Arrow Up Right",
        description: "A premium top-right arrow with two-step spring motion.",
        tags: ["ui", "arrow", "up-right", "direction", "external"],
        render: (props: any) => <ArrowUpRightIcon {...props} animate={animate} />,
      },
      {
        name: "ArrowUpLeftIcon",
        label: "Arrow Up Left",
        description: "A premium top-left arrow with two-step spring motion.",
        tags: ["ui", "arrow", "up-left", "direction"],
        render: (props: any) => <ArrowUpLeftIcon {...props} animate={animate} />,
      },
      {
        name: "ArrowDownRightIcon",
        label: "Arrow Down Right",
        description: "A premium bottom-right arrow with two-step spring motion.",
        tags: ["ui", "arrow", "down-right", "direction"],
        render: (props: any) => <ArrowDownRightIcon {...props} animate={animate} />,
      },
      {
        name: "ArrowDownLeftIcon",
        label: "Arrow Down Left",
        description: "A premium bottom-left arrow with two-step spring motion.",
        tags: ["ui", "arrow", "down-left", "direction"],
        render: (props: any) => <ArrowDownLeftIcon {...props} animate={animate} />,
      },
    ];

    const staticNames = new Set(_STATIC_ICONS.map(i => i.name));
    const premiumIconKeys = Object.keys(PremiumIcons).filter(k => !staticNames.has(k) && k.endsWith("Icon"));
    const ICONS = _STATIC_ICONS.concat(
      premiumIconKeys.map(key => {
        const Comp = (PremiumIcons as any)[key];
        const isCircular = key.includes("Ring") || key.includes("Dial") || key.includes("Orbit") || key.includes("Halo");
        const isAnimatedIcon = /^(Quantum|Cyber|Neural|Data|Holo|Flux|Neon|Pulse|Orbit|Plasma|Stellar|Aero|Solar|Animated)/.test(key);
        return {
          name: key,
          label: key.replace("Icon", ""),
          description: isAnimatedIcon ? `Premium ${isCircular ? "Circular" : "Abstract"} animated SVG icon.` : "Standard clean SVG icon.",
          tags: isAnimatedIcon ? ["premium", "animated", isCircular ? "circular" : "abstract"] : ["standard", "icon"],
          render: (props: any) => isAnimatedIcon ? <Comp {...props} animate={animate} animated={animate} /> : <Comp {...props} />
        };
      })
    );

    const [selected, setSelected] = useState<typeof ICONS[number] | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    const filtered = ICONS.filter((icon) => {
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

    const importLine = `import { ${selected?.name} } from "@/components/ui/icons"`;
    const usageCode = `<${selected?.name} animate={${animate}} size={24} className="text-foreground" />`;

    return (
      <PreviewContainer
        title="Icons"
        description="Premium animated SVG icons — optimized for performance and aesthetic impact."
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
            
            <div className="w-full relative px-2 sm:px-0">
              <SearchComponent
                variant="floating"
                size="lg"
                placeholder="Search icons (e.g., 'Aero', 'Arrow', 'Github')..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                clearable
                className="w-full shadow-xl"
              />
            </div>
          </div>

          <div className="w-full h-px bg-border/40 mb-10" />

          {/* Icons flex wrap */}
          {filtered.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full">
              {filtered.map((icon) => (
                <button
                  key={icon.name}
                  onClick={() => setSelected(icon)}
                  title={icon.name}
                  className="group flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/60 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/5 min-w-18"
                >
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

        {/* Detail modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
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
                      {selected.render({ width: 24, height: 24 })}
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
                            {selected.render({ width: size, height: size, className: "text-foreground" })}
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
                            {selected.render({ width: 20, height: 20, style: { color } })}
                          </div>
                        </div>
                      ))}
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
        </AnimatePresence>
      </PreviewContainer>
    );
  },
  "scroll-progress": function ScrollProgressPreview() {
    return (
      <PreviewContainer 
        title="Scroll Progress" 
        description="A minimal scroll progress indicator."
        isVirtualScreen={true}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center relative min-h-[300px]">
          <p className="text-muted-foreground font-medium">
            Scroll down the main page to see the global scroll progress bar in action!
          </p>
        </div>
      </PreviewContainer>
    );
  },
  "point-cursor": function PointCursorPreview() {
    return (
      <PreviewContainer title="Point Cursor" description="A custom interactive cursor.">
        <PointCursor className="rounded-xl overflow-hidden border border-border bg-muted/10 w-full h-full">
          <div className="flex flex-col items-center justify-center w-full h-full min-h-75 sm:min-h-100 p-8 text-center space-y-8 relative overflow-hidden">
            {/* Decorative background to make it feel like a "playground" */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <DotBackground dotColor="currentColor" gap={20} />
            </div>

            <div className="space-y-3 relative z-10">
              <Badge variant="secondary" className="mb-2">
                Isolated Custom Cursor
              </Badge>
              <h3 className="text-2xl font-bold tracking-tight">
                Interactive Playground
              </h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                The custom cursor is only active inside this box. Hover over the
                elements to test the{" "}
                <span className="text-primary font-bold italic">Dot-to-Ring</span>{" "}
                transformation.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <Button className="rounded-full px-8 shadow-lg shadow-primary/20">
                Hover Me
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 bg-background/50 backdrop-blur-sm"
              >
                Try This One
              </Button>
              <a
                href="#"
                className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors py-2 px-4"
                onClick={(e) => e.preventDefault()}
              >
                Interactive Link
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md relative z-10 mx-auto">
              <div className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm clickable">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                  Custom Box
                </span>
                <p className="text-xs mt-1">Has &apos;clickable&apos; class</p>
              </div>
              <div className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                  Standard Box
                </span>
                <p className="text-xs mt-1">Normal behavior</p>
              </div>
            </div>
          </div>
        </PointCursor>
      </PreviewContainer>
    );
  },
  accordion: function AccordionPreview() {
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
  },
  calendar: CalendarPreview,
  calculator: CalculatorPreview,
  "cinematic-error": function CinematicErrorPreview() {
    return (
      <PreviewContainer
        title="Cinematic Error"
        description="A dramatic and immersive error page."
        contentClassName="p-0 bg-transparent border-0 shadow-none"
      >
        <div className="w-full h-full absolute inset-0 overflow-hidden">
          <CinematicError />
        </div>
      </PreviewContainer>
    );
  },
  "nexus-card": function NexusCardPreview() {
    const [variant, setVariant] = React.useState<"default" | "glass" | "solid" | "neon">("default");

    return (
      <PreviewContainer
        title="Nexus Card"
        description="A premium 3D parallax card with reactive spotlight."
        variants={["default", "glass", "solid", "neon"]}
        activeVariant={variant}
        onVariantChange={setVariant as any}
      >
        <div className="flex items-center justify-center w-full h-full p-4 sm:p-8">
          <NexusCard className="w-80 h-96" variant={variant}>
            <h2 className="text-2xl font-bold text-foreground mb-2">Nexus Design</h2>
            <p className="text-muted-foreground">Hover over this card to experience the premium tactile feel, reactive spotlight, and 3D parallax tilt.</p>
          </NexusCard>
        </div>
      </PreviewContainer>
    );
  },
  "scroll-text-reveal": function ScrollTextRevealPreview() {
    const scrollContainer = React.useRef<HTMLDivElement>(null);

    return (
      <PreviewContainer
        title="Scroll Text Reveal"
        description="Text that reveals itself as you scroll down the screen."
        scrollRef={scrollContainer}
        canvasClassName="block p-0 sm:p-0 md:p-0"
      >
        <div className="w-full h-full">
          
          {/* Section 1 */}
          <section className="w-full h-full flex flex-col items-center justify-center shrink-0">
            <span className="text-sm font-medium tracking-[0.25em] uppercase text-muted-foreground/50 select-none">
              Scroll Down To Reveal
            </span>
          </section>
          
          {/* Section 2 */}
          <section className="w-full h-full flex flex-col items-center justify-center shrink-0 px-6 md:px-12">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-center leading-[1.2] max-w-5xl">
              <ScrollTextReveal container={scrollContainer}>
                The future of UI design is here. Experience seamless, highly optimized animations that elevate your application&apos;s feel.
              </ScrollTextReveal>
            </h2>
          </section>
          
          {/* Section 3 */}
          <section className="w-full h-full flex flex-col items-center justify-center shrink-0">
            <span className="text-sm font-medium tracking-[0.25em] uppercase text-muted-foreground/50 select-none">
              Scroll Up To Reverse
            </span>
          </section>

        </div>
      </PreviewContainer>
    );
  },
  "rich-text-editor": function RichTextEditorPreviewWrapper() {
    const [variant, setVariant] = useState<"default" | "minimal" | "writing" | "enterprise" | "glass">("default");
    return (
      <PreviewContainer
        title="Rich Text Editor"
        description="A powerful Notion-style rich text editor built with Tiptap."
        variants={["default", "minimal", "writing", "enterprise", "glass"]}
        activeVariant={variant}
        onVariantChange={setVariant}
      >
        <div className="w-full max-w-4xl mx-auto min-h-125">
          <RichTextEditor
            variant={variant}
            content={`
              <h1>Welcome to the Rich Text Editor ✨</h1>
              <p>This is a highly customizable, Notion-like editor built with Tiptap. It's fully functional out of the box and supports various modern features.</p>
              <p><strong>Try these interactions:</strong></p>
              <ul data-type="taskList">
                <li data-type="taskItem" data-checked="false">Type <code>/</code> on a new line to open the <strong>Slash Command menu</strong>.</li>
                <li data-type="taskItem" data-checked="false">Select any text to see the floating <strong>Bubble Menu</strong> for quick formatting.</li>
                <li data-type="taskItem" data-checked="false">Write markdown shortcuts like <code># </code> for headings or <code>> </code> for blockquotes.</li>
              </ul>
              <blockquote>"The best tools get out of your way and let you focus on what matters most."</blockquote>
              <pre><code>function test() {\n  console.log('It even has code blocks!');\n}</code></pre>
              <p>You can also insert tables and images seamlessly.</p>
            `}
          />
        </div>
      </PreviewContainer>
    );
  },
  "cursor-glow-button": function CursorGlowButtonPreview() {
    return (
      <PreviewContainer title="Cursor Glow Button" description="Buttons with a reactive glowing effect following the cursor.">
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-3xl justify-items-center">
            <CursorGlowButton variant="default">Primary</CursorGlowButton>
            <CursorGlowButton variant="secondary">Secondary</CursorGlowButton>
            <CursorGlowButton variant="outline">Outline</CursorGlowButton>
            <CursorGlowButton variant="destructive" glowColor="rgba(239, 68, 68, 0.8)">Destructive</CursorGlowButton>
            <CursorGlowButton variant="ghost">Ghost</CursorGlowButton>
            <CursorGlowButton variant="link">Link</CursorGlowButton>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "filter-builder": FilterBuilderPreview,
  "dynamic-form": DynamicFormPreview,
  dock: DockPreview,
  drawer: DrawerPreview,
  toggle: TogglePreview,
  modal: ModalPreview,
  "command-palette": CommandPalettePreview,
  select: SelectPreview,
  "file-upload": FileUploadPreview,
  "form-builder": FormBuilderPreview,
  kanban: KanbanPreview,
  "workflow-builder": WorkflowPreview,
  "ai-chat": AIChatPreview,
  "browser-window": BrowserWindowPreview,
  "automotive-carousel": AutomotiveCarouselPreview,
  "scifi-helmet": ScifiHelmetPreview,
  "bmw-m4": BmwM4Preview,
  terminal: TerminalPreview,
  "otp-verification": OTPVerificationPreview,
};

function TerminalPreview() {
  const [activeVariant, setActiveVariant] = useState<TerminalVariant>("macos");

  const handleCommand = async (cmd: string) => {
    // Artificial delay to simulate network/processing
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      `Preview mode: Command execution is disabled.`,
      `Download the component to define custom logic for: ${cmd}`
    ];
  };

  const variants: TerminalVariant[] = [
    "macos", "windows", "ubuntu", "powershell", "cmd", "bash", "linux", "zsh"
  ];

  return (
    <PreviewContainer 
      title="Terminal Window" 
      description="Authentic, animated terminal components for multiple OS variants."
      variants={variants}
      activeVariant={activeVariant}
      onVariantChange={setActiveVariant}
      isVirtualScreen={true}
      canvasClassName="bg-zinc-100 dark:bg-zinc-900/50"
    >
      <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12">
        <UITerminal 
          key={activeVariant} // Force remount on variant change to reset history
          variant={activeVariant}
          className="w-full max-w-3xl aspect-[4/5] sm:aspect-video shadow-2xl"
          interactive={true}
          onCommand={handleCommand}
          commands={[`Welcome to the ${activeVariant} terminal preview!`, "Type any command and press Enter."]}
          output={[]}
        />
      </div>
    </PreviewContainer>
  );
}

function AIChatPreview() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState<"chatgpt" | "claude" | "perplexity" | "compact" | "enterprise" | "minimal">("chatgpt");
  const [inputVariant, setInputVariant] = useState<"standard" | "floating" | "command" | "multiline" | "workspace">("standard");

  // ---- Response Data ----

  const GREETINGS = [
    // English
    "hi", "hello", "hey", "hey there", "hi there", "howdy", "greetings", "what's up", "sup", "yo",
    // Spanish
    "hola", "buenos dias", "buenas tardes", "buenas noches",
    // French
    "bonjour", "bonsoir", "salut",
    // German
    "hallo", "guten tag", "guten morgen", "guten abend",
    // Italian
    "ciao", "salve", "buongiorno",
    // Portuguese
    "olá", "oi", "bom dia",
    // Japanese (romaji)
    "konnichiwa", "ohayo", "konbanwa",
    // Hindi (romaji)
    "namaste", "namaskar",
    // Arabic (romaji)
    "marhaba", "ahlan",
    // Chinese (romaji)
    "ni hao",
    // Korean (romaji)
    "annyeong", "annyeonghaseyo",
    // Russian (romaji)
    "privet", "zdravstvuyte",
    // Dutch
    "hoi", "dag", "goedendag",
    // Swedish
    "hej", "god dag",
  ];

  const GREETING_RESPONSES = [
    "Hello! 👋 How can I help you today? Try asking me for a poem, some code, or just chat!",
    "Hey there! Great to see you. What are we building today?",
    "Hi! I'm your AI assistant. Ask me for code, poems, or anything else!",
    "Greetings! I'm fully wired up and ready to help. What's on your mind?",
    "Hello! I'm a demo AI interface. Type 'poem' for a poem or 'react code' for a React component!",
    "Hey! 🚀 I'm ready. Ask me for code in any language, a poem, or just say something fun!",
    "Howdy! What can I do for you today?",
    "Bonjour! (Hello!) I'm your multilingual AI assistant. How can I help?",
    "¡Hola! I speak all languages — ask me anything!",
    "Ciao! Your AI is ready. What do you need?",
  ];

  const POEMS = [
    {
      title: "The Road Not Taken (excerpt) – Robert Frost",
      text: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth.",
    },
    {
      title: "If — Rudyard Kipling (excerpt)",
      text: "If you can keep your head when all about you\n    Are losing theirs and blaming it on you,\nIf you can trust yourself when all men doubt you,\n    But make allowance for their doubting too;",
    },
    {
      title: "Still I Rise – Maya Angelou (excerpt)",
      text: "You may write me down in history\nWith your bitter, twisted lies,\nYou may trod me in the very dirt\nBut still, like dust, I'll rise.",
    },
    {
      title: "Shall I compare thee – Shakespeare (Sonnet 18)",
      text: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate.\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date.",
    },
    {
      title: "Ozymandias – Percy Bysshe Shelley",
      text: "I met a traveller from an antique land,\nWho said — 'Two vast and trunkless legs of stone\nStand in the desert. Near them, on the sand,\nHalf sunk, a shattered visage lies.'",
    },
    {
      title: "Hope is the Thing with Feathers – Emily Dickinson",
      text: "Hope is the thing with feathers\nThat perches in the soul,\nAnd sings the tune without the words,\nAnd never stops at all.",
    },
    {
      title: "Do Not Go Gentle – Dylan Thomas (excerpt)",
      text: "Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light.",
    },
    {
      title: "Invictus – William Ernest Henley (excerpt)",
      text: "Out of the night that covers me,\n      Black as the pit from pole to pole,\nI thank whatever gods may be\n      For my unconquerable soul.",
    },
  ];

  const CODE_SNIPPETS = [
    {
      lang: "tsx",
      label: "React Counter Component",
      code: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-4xl font-bold">{count}</h1>
      <div className="flex gap-2">
        <button onClick={() => setCount(c => c - 1)} className="px-4 py-2 bg-red-500 text-white rounded-lg">-</button>
        <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-green-500 text-white rounded-lg">+</button>
      </div>
    </div>
  );
}`,
    },
    {
      lang: "tsx",
      label: "React Todo List",
      code: `import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, input]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <div className="flex gap-2 mb-4">
        <input value={input} onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-1 text-sm" placeholder="Add a task..." />
        <button onClick={add} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Add</button>
      </div>
      <ul className="space-y-1">
        {todos.map((t, i) => <li key={i} className="text-sm px-3 py-1 bg-muted rounded">{t}</li>)}
      </ul>
    </div>
  );
}`,
    },
    {
      lang: "typescript",
      label: "TypeScript Generic Stack",
      code: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.peek()); // 2
console.log(stack.pop());  // 2`,
    },
    {
      lang: "python",
      label: "Python Fibonacci",
      code: `def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    if n == 1:
        return [0]

    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq

result = fibonacci(10)
print(result)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
    },
    {
      lang: "python",
      label: "Python Decorator",
      code: `import time
from functools import wraps

def timer(func):
    """A decorator that prints execution time."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} took {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

slow_sum(1_000_000)`,
    },
    {
      lang: "javascript",
      label: "JavaScript Debounce",
      code: `function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const handleSearch = debounce((query) => {
  console.log("Searching for:", query);
  // fetch("/api/search?q=" + query)
}, 300);

// Usage
document.getElementById("search").addEventListener("input", e => {
  handleSearch(e.target.value);
});`,
    },
    {
      lang: "java",
      label: "Java Binary Search",
      code: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13};
        System.out.println(search(arr, 7)); // 3
        System.out.println(search(arr, 4)); // -1
    }
}`,
    },
    {
      lang: "cpp",
      label: "C++ Linked List",
      code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

class LinkedList {
    Node* head = nullptr;
public:
    void push(int val) {
        Node* n = new Node(val);
        n->next = head;
        head = n;
    }
    void print() {
        for (Node* cur = head; cur; cur = cur->next)
            cout << cur->data << " -> ";
        cout << "null" << endl;
    }
};

int main() {
    LinkedList list;
    list.push(3); list.push(2); list.push(1);
    list.print(); // 1 -> 2 -> 3 -> null
}`,
    },
    {
      lang: "rust",
      label: "Rust Ownership Example",
      code: `fn main() {
    let s1 = String::from("Hello, Rust!");
    let s2 = s1.clone(); // Deep copy

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);

    let len = calculate_length(&s1); // Borrow
    println!("Length of '{}' is {}", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}`,
    },
    {
      lang: "go",
      label: "Go Goroutine",
      code: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d starting\\n", id)
    // Simulate work
    fmt.Printf("Worker %d done\\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }

    wg.Wait()
    fmt.Println("All workers done!")
}`,
    },
    {
      lang: "swift",
      label: "Swift Protocol",
      code: `protocol Drawable {
    func draw() -> String
}

struct Circle: Drawable {
    var radius: Double
    func draw() -> String {
        return "Drawing a circle with radius \\(radius)"
    }
}

struct Rectangle: Drawable {
    var width: Double
    var height: Double
    func draw() -> String {
        return "Drawing a \\(width)x\\(height) rectangle"
    }
}

let shapes: [Drawable] = [Circle(radius: 5), Rectangle(width: 10, height: 4)]
shapes.forEach { print($0.draw()) }`,
    },
    {
      lang: "kotlin",
      label: "Kotlin Data Class",
      code: `data class User(
    val id: Int,
    val name: String,
    val email: String
)

fun main() {
    val user1 = User(1, "Alice", "alice@example.com")
    val user2 = user1.copy(name = "Bob", email = "bob@example.com")

    println(user1) // User(id=1, name=Alice, email=alice@example.com)
    println(user2) // User(id=1, name=Bob, email=bob@example.com)
    println(user1 == user2) // false
}`,
    },
    {
      lang: "css",
      label: "CSS Glassmorphism Card",
      code: `.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
}`,
    },
    {
      lang: "sql",
      label: "SQL Window Function",
      code: `-- Rank employees by salary within each department
SELECT
    name,
    department,
    salary,
    RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS salary_rank,
    AVG(salary) OVER (
        PARTITION BY department
    ) AS dept_avg_salary
FROM employees
ORDER BY department, salary_rank;`,
    },
  ];

  const getResponse = (userText: string): string => {
    const t = userText.toLowerCase().trim();

    // Greetings check
    const isGreeting = GREETINGS.some(g => t === g || t.startsWith(g + " ") || t.endsWith(" " + g) || t.includes(" " + g + " ") || t === g);
    if (isGreeting) {
      return GREETING_RESPONSES[Math.floor(Math.random() * GREETING_RESPONSES.length)];
    }

    // Poem
    if (t.includes("poem") || t.includes("poetry") || t.includes("verse") || t.includes("rhyme")) {
      const p = POEMS[Math.floor(Math.random() * POEMS.length)];
      return `Here's a poem for you:\n\n**${p.title}**\n\n${p.text}`;
    }

    // Code — language-specific matches first, then generic "code" keyword
    const langMatches: { keywords: string[]; lang: string }[] = [
      { keywords: ["react", "jsx", "tsx", "component"], lang: "tsx" },
      { keywords: ["typescript", "ts"], lang: "typescript" },
      { keywords: ["javascript", "js", "node"], lang: "javascript" },
      { keywords: ["python", "py"], lang: "python" },
      { keywords: ["java"], lang: "java" },
      { keywords: ["c++", "cpp"], lang: "cpp" },
      { keywords: ["rust"], lang: "rust" },
      { keywords: ["go", "golang"], lang: "go" },
      { keywords: ["swift"], lang: "swift" },
      { keywords: ["kotlin"], lang: "kotlin" },
      { keywords: ["css", "style", "glassmorphism"], lang: "css" },
      { keywords: ["sql", "database", "query"], lang: "sql" },
    ];

    let matchedLang: string | null = null;
    for (const { keywords, lang } of langMatches) {
      if (keywords.some(k => t.includes(k))) {
        matchedLang = lang;
        break;
      }
    }

    if (matchedLang || t.includes("code") || t.includes("example") || t.includes("snippet") || t.includes("write") || t.includes("show")) {
      const pool = matchedLang
        ? CODE_SNIPPETS.filter(s => s.lang === matchedLang)
        : CODE_SNIPPETS;
      const snippet = pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      return `Here's a **${snippet.label}** for you:\n\n\`\`\`${snippet.lang}\n${snippet.code}\n\`\`\`\n\nYou can copy this using the copy button at the top-right of the code block!`;
    }

    // Default
    return "I'm a fully interactive demo AI interface. I can respond to greetings in any language, write poems, and generate code in React, TypeScript, Python, Java, C++, Rust, Go, Swift, Kotlin, CSS, SQL, and more!\n\nTry asking:\n- **\"hi\"** (or any greeting)\n- **\"write a poem\"**\n- **\"show me some Python code\"**\n- **\"give me a React component\"**";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg = { id: Date.now().toString(), role: "user", content: userText };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", isStreaming: true }]);

      const responseText = getResponse(userText);
      let currentText = "";
      let i = 0;

      const interval = setInterval(() => {
        currentText += responseText[i];
        setMessages((prev) => prev.map(m => m.id === assistantId ? { ...m, content: currentText } : m));
        i++;
        if (i >= responseText.length) {
          clearInterval(interval);
          setMessages((prev) => prev.map(m => m.id === assistantId ? { ...m, isStreaming: false } : m));
          setIsLoading(false);
        }
      }, 12);
    }, 300);
  };

  const SUGGESTIONS = [
    "Hi", "Hola", "Bonjour", "Namaste", "Ni hao",
    "Write a poem", "Give me React code", "Show me Python code",
    "Write a SQL query", "Give me a Go example",
  ];

  return (
    <PreviewContainer
      title="AI Chat"
      description="A highly customizable AI chat interface with markdown and code support."
      variants={["chatgpt", "claude", "perplexity", "compact", "enterprise", "minimal"]}
      activeVariant={layout}
      align="start"
      onVariantChange={setLayout}
      contentClassName="p-0 overflow-hidden"
      extraControls={
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Input Variant</span>
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
            {(["standard", "floating", "command", "multiline", "workspace"] as const).map((v) => (
              <button key={v} onClick={() => setInputVariant(v)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", inputVariant === v ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{v}</button>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex w-full h-full min-h-125">
        {/* Chat panel — fills remaining height, no page scroll */}
        <div className="flex-1 min-h-125 overflow-hidden relative">
          <AIChat
            messages={messages}
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onStop={() => setIsLoading(false)}
            layout={layout}
            inputVariant={inputVariant}
          >
            <ChatMessages />
            <ChatPromptSuggestions suggestions={SUGGESTIONS} />
            <ChatInput />
          </AIChat>
        </div>
      </div>
    </PreviewContainer>
  );
}

function BrowserWindowPreview() {
  return (
    <PreviewContainer
      title="Browser Window"
      description="A clean, responsive mock browser window for displaying UI components or screenshots."
      isVirtualScreen={false}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-0 relative z-10 overflow-hidden">
        <BrowserWindow className="w-full h-full">
          <div className="flex flex-col items-center justify-center w-full h-full bg-muted/10 text-muted-foreground p-8 text-center space-y-4">
            <h3 className="text-xl font-medium text-foreground">Welcome to Future UI</h3>
            <p className="max-w-md text-sm">The modern component library for ambitious engineering teams.</p>
          </div>
        </BrowserWindow>
      </div>
    </PreviewContainer>
  );
}

function ScifiHelmetPreview() {
  return (
    <PreviewContainer
      title="Sci-Fi Helmet"
      description="A premium 3D Sci-Fi Helmet with interactive orbit controls."
      canvasClassName="bg-[#050505] p-0 overflow-hidden"
    >
      <ScifiHelmet className="w-full h-full" />
    </PreviewContainer>
  );
}



function BmwM4Preview() {
  return (
    <PreviewContainer
      title="BMW M4"
      description="A premium 3D M4 Car component with interactive orbit controls."
      canvasClassName="bg-[#050505] p-0 overflow-hidden"
    >
      <BmwM4 className="w-full h-full" />
    </PreviewContainer>
  );
}

function AutomotiveCarouselPreview() {
  const [variant, setVariant] = useState<"bike" | "car" | "chair" | "m4">("m4");
  const slides = [
    {
      id: 1,
      title: "THE VISION",
      description: "A masterclass in automotive engineering.",
      annotations: []
    },
    {
      id: 2,
      title: "",
      description: "",
      annotations: [
        { id: "dash-1", position: [0.17, 0.75, 0.65] as [number, number, number], label: "M-Sport Steering Handle" },
        { id: "dash-2", position: [-0.4, 0.95, 0.65] as [number, number, number], label: "14.9-inch Curved Screen" },
        { id: "dash-3", position: [-0.3, 0.65, 0.5] as [number, number, number], label: "Carbon Fiber Gear" },
        { id: "dash-4", position: [-0.9, 0.88, 0.65] as [number, number, number], label: "Carbon Trim Dashboard" }
      ]
    },
    {
      id: 3,
      title: "",
      description: "",
      annotations: [
        { id: "seat-1", position: [0.35, 0.65, -0.15] as [number, number, number], label: "Ergonomic Driver Seat" },
        { id: "seat-2", position: [-0.35, 0.65, -0.15] as [number, number, number], label: "Ventilated Passenger Seat" }
      ]
    },
    {
      id: 4,
      title: "Aerodynamic Perfection",
      description: "Aggressive rear stance featuring the signature LED Taillight Matrix, active aero spoiler, and performance-tuned sport exhaust.",
      annotations: []
    }
  ];
  return (
    <PreviewContainer title="Automotive Carousel" isVirtualScreen={true} className="overflow-hidden pb-4">
      <div className="relative w-full h-full overflow-hidden rounded-xl border border-border/50">
        <AutomotiveCarousel slides={slides} objectVariant={variant} />
      </div>
    </PreviewContainer>
  );
}

function OTPVerificationPreview() {
  const [status, setStatus] = useState<string>("Waiting for code...");

  return (
    <PreviewContainer 
      title="OTP Verification" 
      description="A smooth, animated OTP input component with auto-focus and backspace support."
      isVirtualScreen={true}
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl flex flex-col items-center gap-8 md:gap-12">
          <div className="text-center space-y-2 md:space-y-4">
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground">Verification Code</h3>
            <p className="text-sm md:text-base text-muted-foreground">Enter the 6-digit code sent to your device</p>
          </div>
          
          <div className="w-full flex justify-center scale-[0.8] sm:scale-90 md:scale-100 origin-center">
            <OTPVerification 
              length={6} 
              onVerify={async (code) => {
                setStatus("Verifying...");
                await new Promise(resolve => setTimeout(resolve, 1500));
                if (code === "123456") {
                  setStatus("Verification successful!");
                  return true;
                }
                setStatus("Invalid code. Try 123456.");
                return false;
              }} 
            />
          </div>

          <div className="text-sm md:text-base font-medium h-6">
            <span className={status.includes("successful") ? "text-emerald-500" : status.includes("Invalid") ? "text-red-500" : "text-muted-foreground"}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}
