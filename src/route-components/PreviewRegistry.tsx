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
    <div className="flex flex-col gap-6 items-center justify-center w-full h-full p-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {(
          ["top-left", "top-right", "bottom-left", "bottom-right"] as const
        ).map((pos) => (
          <Button
            key={pos}
            variant={position === pos ? "default" : "outline"}
            size="sm"
            onClick={() => setPosition(pos)}
            className="capitalize"
          >
            {pos.replace("-", " ")}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
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
  "error-page": () => (
    <div className="flex items-center justify-center w-full h-full p-4 overflow-auto">
      <ErrorPage errorCode="404" errorText="ERROR" />
    </div>
  ),
  "expanding-card": () => (
    <div className="w-full h-full p-4 flex items-center justify-center overflow-hidden">
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
    <div className="w-full h-full overflow-hidden">
      <DotBackground dotColor="#6366f1" maskOpacity={0.15}>
        <div className="flex items-center justify-center h-full">
          <h3 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase opacity-50">
            Premium Dotted Grid
          </h3>
        </div>
      </DotBackground>
    </div>
  ),
  badge: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center w-full h-full p-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  button: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center w-full h-full p-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  card: () => (
    <div className="flex items-center justify-center w-full h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
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
    <div className="flex items-center justify-center w-full h-full p-8 bg-muted/30">
      <div className="w-full max-w-60 flex flex-col gap-1">
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
    <div className="w-full h-full bg-slate-950 relative overflow-hidden rounded-xl">
      <Particles className="absolute inset-0" quantity={150} color="#3b82f6" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h3 className="text-2xl font-bold text-white italic tracking-tighter uppercase">
          Dynamic Particle System
        </h3>
      </div>
    </div>
  ),
  "perspective-grid": () => (
    <div className="w-full h-full bg-slate-950 relative overflow-hidden rounded-xl">
      <PerspectiveGrid className="absolute inset-0" gridLineGap={50} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h3 className="text-2xl font-bold text-white italic tracking-tighter uppercase">
          Perspective Horizon
        </h3>
      </div>
    </div>
  ),
};
