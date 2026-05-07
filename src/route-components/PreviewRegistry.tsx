"use client";

import React from "react";
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
import { ExpandingFlexCard } from "@/components/ui/expanding-flex-card";
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
import { GithubIcon } from "@/components/ui/github-icon";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { PointCursor } from "@/components/ui/PointCursor";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

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

export const PreviewRegistry: Record<string, React.FC> = {
  primary: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-items-center w-full">
        <PrimaryButton variant="primary">Primary</PrimaryButton>
        <PrimaryButton variant="success">Success</PrimaryButton>
        <PrimaryButton variant="warning">Warning</PrimaryButton>
        <PrimaryButton variant="danger">Danger</PrimaryButton>
        <PrimaryButton variant="info">Info</PrimaryButton>
        <PrimaryButton variant="secondary">Secondary</PrimaryButton>
      </div>
    </div>
  ),
  glowy: () => (
    <div className="flex flex-wrap gap-6 items-center justify-center w-full h-full p-4">
      <GlowyButton variant="primary">Primary</GlowyButton>
      <GlowyButton variant="success">Success</GlowyButton>
      <GlowyButton variant="danger">Danger</GlowyButton>
    </div>
  ),
  "basic-card": () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full justify-items-center">
        <div className="flex flex-col gap-2 items-center w-full">
          <BasicCard
            variant="modern"
            color="#6366f1"
            name="Aryan Hooda"
            title="Full Stack Developer"
          />
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <BasicCard
            variant="clean"
            color="#10b981"
            name="John Doe"
            title="Product Designer"
          />
        </div>
      </div>
    </div>
  ),
  "boxy-rotate": () => (
    <div className="flex items-center justify-center w-full h-full">
      <BoxyRotateLoader />
    </div>
  ),
  "boxy-bounce": () => (
    <div className="flex items-center justify-center w-full h-full">
      <BoxyBounceLoader />
    </div>
  ),
  "boxy-shift": () => (
    <div className="flex items-center justify-center w-full h-full">
      <BoxyShiftLoader />
    </div>
  ),
  "text-system": () => (
    <div className="flex items-center justify-center w-full h-full">
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
            &quot;This is a blockquote variant for citing sources or highlighting
            quotes.&quot;
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
    </div>
  ),
  "infinite-slider": () => (
    <div className="w-full h-full overflow-hidden rounded-xl">
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
    </div>
  ),
  menu: () => (
    <div className="flex items-center justify-center w-full h-full relative">
      <NavMenu />
    </div>
  ),
  "error-page": () => <ErrorPage errorCode="404" errorText="ERROR" />,
  "expanding-card": () => (
    <div className="w-full h-full flex items-center justify-center">
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
    </div>
  ),
  basic: () => (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full max-w-3xl items-center justify-items-center">
        <div className="flex flex-col gap-4 items-center">
          <BasicLoader variant="modern" color="#3b82f6" text="Modern Rings..." />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <BasicLoader variant="clean" color="#10b981" text="Clean Dots..." />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <BasicLoader variant="minimal" color="#f59e0b" text="Minimal..." />
        </div>
      </div>
    </div>
  ),
  toast: ToastPreview,
  "dot-background": () => (
    <DotBackground dotColor="#6366f1" maskOpacity={0.15}>
      <div className="flex items-center justify-center w-full h-full">
        <h3 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase opacity-50">
          Premium Dotted Grid
        </h3>
      </div>
    </DotBackground>
  ),
  badge: () => (
    <div className="flex flex-wrap gap-8 items-center justify-center w-full h-full">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  button: () => (
    <div className="flex flex-wrap gap-8 items-center justify-center w-full h-full">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  card: () => (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-left">
            This is the main content area of the card component. It can hold any
            type of content.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  "sidebar-button": () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-full max-w-60 flex flex-col gap-1 p-4 bg-muted/20 rounded-xl">
        <SidebarButton label="Dashboard" isActive />
        <SidebarButton label="Analytics" />
        <SidebarButton label="Settings" />
        <div className="h-4" />
        <SidebarButton label="User Profile" isCategory />
        <SidebarButton label="Billing" isCategory />
      </div>
    </div>
  ),
  particles: () => (
    <div className="w-full h-full bg-slate-950">
      <Particles quantity={150} color="#3b82f6" />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h3 className="text-2xl font-bold text-white italic tracking-tighter uppercase pointer-events-none">
          Dynamic Particle System
        </h3>
      </div>
    </div>
  ),
  "perspective-grid": () => (
    <div className="w-full h-full bg-slate-950">
      <PerspectiveGrid gridLineGap={50} />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h3 className="text-2xl font-bold text-white italic tracking-tighter uppercase pointer-events-none">
          Perspective Horizon
        </h3>
      </div>
    </div>
  ),
  "search-input": () => (
    <div className="flex items-center justify-center w-full h-full p-8">
      <div className="w-full max-w-sm">
        <SearchInput placeholder="Try searching 'button'..." />
      </div>
    </div>
  ),
  "github-icon": () => (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full p-8">
      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-center gap-2">
          <GithubIcon className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold opacity-50">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-primary">
          <GithubIcon className="w-10 h-10" />
          <span className="text-[10px] uppercase font-bold opacity-50">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <GithubIcon className="w-16 h-16" />
          <span className="text-[10px] uppercase font-bold opacity-50">lg</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Badge variant="outline" className="gap-2">
          <GithubIcon className="w-3 h-3" /> GitHub Repo
        </Badge>
        <Button size="sm" className="gap-2">
          <GithubIcon className="w-4 h-4" /> View Source
        </Button>
      </div>
    </div>
  ),
  "linkedin-icon": () => (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full p-8">
      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-center gap-2">
          <LinkedinIcon className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold opacity-50">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-primary">
          <LinkedinIcon className="w-10 h-10" />
          <span className="text-[10px] uppercase font-bold opacity-50">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <LinkedinIcon className="w-16 h-16" />
          <span className="text-[10px] uppercase font-bold opacity-50">lg</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Badge variant="outline" className="gap-2">
          <LinkedinIcon className="w-3 h-3" /> LinkedIn Profile
        </Badge>
        <Button size="sm" className="gap-2 bg-[#0077b5] hover:bg-[#0077b5]/90 border-none">
          <LinkedinIcon className="w-4 h-4 fill-white" /> Connect Now
        </Button>
      </div>
    </div>
  ),
  "scroll-progress": () => (
    <div className="flex items-center justify-center w-full h-full p-8 text-center">
      <p className="text-muted-foreground font-medium">
        The scroll progress will be shown on top of the viewport right above header
      </p>
    </div>
  ),
  "point-cursor": () => (
    <PointCursor className="rounded-xl overflow-hidden border border-border bg-muted/10">
      <div className="flex flex-col items-center justify-center w-full h-[300px] sm:h-[400px] p-8 text-center space-y-8 relative overflow-hidden">
        {/* Decorative background to make it feel like a "playground" */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <DotBackground dotColor="currentColor" gap={20} />
        </div>

        <div className="space-y-3 relative z-10">
          <Badge variant="secondary" className="mb-2">Isolated Custom Cursor</Badge>
          <h3 className="text-2xl font-bold tracking-tight">Interactive Playground</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            The custom cursor is only active inside this box. 
            Hover over the elements to test the <span className="text-primary font-bold italic">Dot-to-Ring</span> transformation.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center relative z-10">
          <Button className="rounded-full px-8 shadow-lg shadow-primary/20">
            Hover Me
          </Button>
          <Button variant="outline" className="rounded-full px-8 bg-background/50 backdrop-blur-sm">
            Try This One
          </Button>
          <a href="#" className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors py-2 px-4" onClick={(e) => e.preventDefault()}>
            Interactive Link
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md relative z-10">
          <div className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm clickable">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Custom Box</span>
            <p className="text-xs mt-1">Has 'clickable' class</p>
          </div>
          <div className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Standard Box</span>
            <p className="text-xs mt-1">Normal behavior</p>
          </div>
        </div>
      </div>
    </PointCursor>
  ),
};
