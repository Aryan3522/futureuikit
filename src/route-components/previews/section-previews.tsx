"use client";

import React from "react";
import {
  Home,
  Settings,
  Users,
  BarChart3,
  Inbox,
  Zap,
  Shield,
  Sparkles,
  Layers,
  Globe,
  FileX,
  Plus,
} from "lucide-react";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";
import { Button } from "@/components/ui/button";
import {
  Navbar,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
  NavbarMobileToggle,
  NavbarMobileMenu,
} from "@/components/ui/navbar";
import { Pricing } from "@/components/ui/pricing";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { Stats } from "@/components/ui/stats";
import { Testimonials } from "@/components/ui/testimonials";
import { FAQ } from "@/components/ui/faq";
import { CTABanner } from "@/components/ui/cta-banner";
import {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  SidebarToggle,
} from "@/components/ui/sidebar";
import { Stepper } from "@/components/ui/stepper";
import { EmptyState } from "@/components/ui/empty-state";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { DatePicker } from "@/components/ui/date-picker";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const NavbarPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("glass");
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Navbar"
      variants={["glass", "solid", "floating", "minimal"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
      align="start"
    >
      <div className="w-full min-h-72 relative">
        <Navbar variant={variant} color={color} elevateOnScroll={false} className="relative">
          <NavbarBrand>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background text-xs font-black">F</span>
            FUTURE_UI
          </NavbarBrand>
          <NavbarLinks>
            <NavbarLink href="#" active>Home</NavbarLink>
            <NavbarLink href="#">Components</NavbarLink>
            <NavbarLink href="#">Docs</NavbarLink>
            <NavbarLink href="#">Pricing</NavbarLink>
          </NavbarLinks>
          <NavbarActions>
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button size="sm">Get started</Button>
          </NavbarActions>
          <NavbarMobileToggle />
          <NavbarMobileMenu>
            <NavbarLink href="#" active>Home</NavbarLink>
            <NavbarLink href="#">Components</NavbarLink>
            <NavbarLink href="#">Docs</NavbarLink>
            <NavbarLink href="#">Pricing</NavbarLink>
          </NavbarMobileMenu>
        </Navbar>
        <div className="p-8 text-sm text-muted-foreground">
          Resize the preview to see the mobile menu toggle.
        </div>
      </div>
    </PreviewContainer>
  );
};

const PRICING_TIERS = [
  {
    name: "Starter",
    description: "For personal projects",
    monthly: 0,
    features: ["All core components", "Community support", "MIT license"],
    cta: "Start free",
  },
  {
    name: "Pro",
    description: "For serious builders",
    monthly: 19,
    yearly: 15,
    features: ["Everything in Starter", "Premium sections", "Priority support", "Figma kit"],
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Team",
    description: "For growing teams",
    monthly: 49,
    yearly: 39,
    features: ["Everything in Pro", "Unlimited seats", "Private Slack", "Custom themes"],
  },
];

export const PricingPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("violet");

  return (
    <PreviewContainer
      title="Pricing"
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="w-full max-w-4xl p-8">
        <Pricing tiers={PRICING_TIERS} color={color} />
      </div>
    </PreviewContainer>
  );
};

export const BentoGridPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("blue");

  return (
    <PreviewContainer
      title="Bento Grid"
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="w-full max-w-3xl p-8">
        <BentoGrid columns={3}>
          <BentoItem
            color={color}
            colSpan={2}
            icon={<Zap />}
            title="Blazing fast"
            description="Static generation and tiny client bundles keep every page instant."
          />
          <BentoItem
            color={color}
            icon={<Shield />}
            title="Type-safe"
            description="Strict TypeScript across every component."
          />
          <BentoItem
            color={color}
            icon={<Sparkles />}
            title="Premium motion"
            description="Framer Motion springs tuned by hand."
          />
          <BentoItem
            color={color}
            colSpan={2}
            icon={<Layers />}
            title="Composable by design"
            description="Small primitives that stack into complete pages — copy the source and own every line."
          />
        </BentoGrid>
      </div>
    </PreviewContainer>
  );
};

export const StatsPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("plain");
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Stats"
      variants={["plain", "card", "divided"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="w-full max-w-3xl p-8">
        <Stats
          variant={variant}
          color={color}
          items={[
            { label: "Components", value: 116, suffix: "+" },
            { label: "Downloads", value: 48, suffix: "k" },
            { label: "GitHub stars", value: 2.4, decimals: 1, suffix: "k" },
            { label: "Uptime", value: 99.9, decimals: 1, suffix: "%" },
          ]}
        />
      </div>
    </PreviewContainer>
  );
};

const TESTIMONIAL_ITEMS = [
  { quote: "Shipped our entire marketing site in two days. The motion design is unreal.", author: "Jane Doe", role: "Founder, Lumen", rating: 5 },
  { quote: "Finally a library where the defaults actually look premium out of the box.", author: "Sam Smith", role: "Design Engineer", rating: 5 },
  { quote: "The CLI workflow means we own the source. No black-box dependencies.", author: "Kai Ito", role: "CTO, Nimbus", rating: 4 },
  { quote: "Our dashboard went from wireframe to production in a single sprint.", author: "Ada Chen", role: "Product Lead", rating: 5 },
];

export const TestimonialsPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("marquee");
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Testimonials"
      variants={["marquee", "grid"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="w-full max-w-3xl p-8">
        <Testimonials items={TESTIMONIAL_ITEMS} variant={variant} color={color} duration={30} />
      </div>
    </PreviewContainer>
  );
};

const FAQ_ITEMS = [
  { question: "Do I need to install the whole library?", answer: "No — the CLI copies only the components you ask for straight into your project, so you own the source." },
  { question: "Does it work with the Next.js App Router?", answer: "Yes. Every component is built for React 19 and the App Router, with correct client/server boundaries." },
  { question: "Can I customize the theme?", answer: "Everything is driven by CSS variables and Tailwind tokens. Run the init command and edit the generated theme block." },
  { question: "Is it free for commercial use?", answer: "Yes — MIT licensed, no attribution required." },
];

export const FAQPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("list");
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="FAQ"
      variants={["list", "card", "split"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="w-full max-w-2xl p-8">
        <FAQ items={FAQ_ITEMS} variant={variant} color={color} />
      </div>
    </PreviewContainer>
  );
};

export const CTABannerPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("gradient");
  const [color, setColor] = React.useState<any>("violet");

  return (
    <PreviewContainer
      title="CTA Banner"
      variants={["gradient", "glass", "outline"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="w-full max-w-3xl p-8">
        <CTABanner
          variant={variant}
          color={color}
          eyebrow="Ready when you are"
          title="Build your next site with Future UI"
          description="102+ premium components, one CLI command away. Copy the source, own the code, ship faster."
          actions={
            <>
              <Button size="lg" className={variant === "gradient" ? "bg-white text-black hover:bg-white/90" : undefined}>
                Get started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={variant === "gradient" ? "border-white/40 text-white hover:bg-white/10" : undefined}
              >
                View components
              </Button>
            </>
          }
        />
      </div>
    </PreviewContainer>
  );
};

export const SidebarPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("default");
  const [active, setActive] = React.useState("Dashboard");

  const items = [
    { icon: <Home />, label: "Dashboard" },
    { icon: <Inbox />, label: "Inbox", badge: "12" },
    { icon: <BarChart3 />, label: "Analytics" },
    { icon: <Users />, label: "Team" },
  ];

  return (
    <PreviewContainer
      title="Sidebar"
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex h-96 w-full max-w-2xl overflow-hidden rounded-2xl border border-border/60 my-8">
        <Sidebar color={color} className="border-r">
          <SidebarHeader>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground text-background text-xs font-black">F</span>
            <span>FUTURE_UI</span>
          </SidebarHeader>
          <SidebarNav>
            <SidebarSection title="Workspace">
              {items.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  badge={item.badge}
                  active={active === item.label}
                  onClick={() => setActive(item.label)}
                >
                  {item.label}
                </SidebarItem>
              ))}
            </SidebarSection>
            <SidebarSection title="System">
              <SidebarItem icon={<Settings />} active={active === "Settings"} onClick={() => setActive("Settings")}>
                Settings
              </SidebarItem>
            </SidebarSection>
          </SidebarNav>
          <SidebarFooter>
            <SidebarToggle />
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 items-center justify-center bg-muted/20 text-sm text-muted-foreground">
          {active} content
        </div>
      </div>
    </PreviewContainer>
  );
};

export const StepperPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("default");
  const [variant, setVariant] = React.useState<any>("horizontal");
  const [current, setCurrent] = React.useState(1);

  const steps = [
    { title: "Account", description: "Your details" },
    { title: "Payment", description: "Billing info" },
    { title: "Review", description: "Confirm order" },
    { title: "Done", description: "All set" },
  ];

  return (
    <PreviewContainer
      title="Stepper"
      variants={["horizontal", "vertical"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col items-center gap-10 w-full max-w-2xl p-8">
        <Stepper steps={steps} current={current} color={color} orientation={variant} onStepClick={setCurrent} />
        <div className="flex gap-3">
          <Button variant="outline" size="sm" disabled={current === 0} onClick={() => setCurrent((c) => Math.max(0, c - 1))}>
            Back
          </Button>
          <Button size="sm" disabled={current === steps.length - 1} onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}>
            Continue
          </Button>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const EmptyStatePreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("dashed");
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Empty State"
      variants={["dashed", "card", "plain"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="w-full max-w-lg p-8">
        <EmptyState
          variant={variant}
          color={color}
          icon={<FileX />}
          title="No projects yet"
          description="Projects you create will show up here. Start with a template or create one from scratch."
          actions={
            <>
              <Button size="sm"><Plus className="size-4" />New project</Button>
              <Button size="sm" variant="ghost">Browse templates</Button>
            </>
          }
        />
      </div>
    </PreviewContainer>
  );
};

export const PopoverPreview: React.FC = () => {
  const [side, setSide] = React.useState<any>("bottom");

  return (
    <PreviewContainer
      title="Popover"
      variants={["bottom", "top", "left", "right"] as const}
      activeVariant={side}
      onVariantChange={setSide}
    >
      <div className="flex items-center justify-center p-24">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent side={side} className="w-64">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Globe className="size-4" /> Share project
              </h4>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Anyone with the link can view this project. Press <KbdGroup keys={["Esc"]} size="sm" /> to close.
              </p>
              <Button size="sm" className="mt-1">Copy link</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </PreviewContainer>
  );
};

export const DatePickerPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("default");
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <PreviewContainer
      title="Date Picker"
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col items-center gap-4 p-16 min-h-[26rem]">
        <DatePicker color={color} value={date} onChange={setDate} />
        <p className="text-xs text-muted-foreground">
          {date ? `Selected: ${date.toDateString()}` : "No date selected"}
        </p>
      </div>
    </PreviewContainer>
  );
};

export const KbdPreview: React.FC = () => {
  const [size, setSize] = React.useState<any>("md");

  return (
    <PreviewContainer
      title="Kbd"
      variants={["sm", "md", "lg"] as const}
      activeVariant={size}
      onVariantChange={setSize}
    >
      <div className="flex flex-col items-center gap-6 p-12">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          Open command palette <KbdGroup keys={["⌘", "K"]} size={size} />
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          Save file <KbdGroup keys={["Ctrl", "S"]} size={size} />
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          Single keys <Kbd size={size}>Esc</Kbd> <Kbd size={size}>Tab</Kbd> <Kbd size={size}>↵</Kbd>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const ThemeTogglePreview: React.FC = () => {
  const [shape, setShape] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Theme Toggle"
      variants={["default", "square", "rounded", "sharp"] as const}
      activeVariant={shape}
      onVariantChange={setShape}
    >
      <div className="flex flex-col items-center gap-6 p-12">
        <div className="flex items-center gap-4">
          <ThemeToggle shape={shape} size="sm" />
          <ThemeToggle shape={shape} size="md" />
          <ThemeToggle shape={shape} size="lg" />
        </div>
        <p className="text-xs text-muted-foreground max-w-[36ch] text-center">
          Toggles the <code className="font-mono">dark</code> class on the page and persists your choice.
        </p>
      </div>
    </PreviewContainer>
  );
};
