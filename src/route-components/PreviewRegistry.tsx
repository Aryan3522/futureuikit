"use client";

import React from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { GlowyButton } from "@/components/ui/glowy-button";
import { BasicCard } from "@/components/ui/basic-card";
import { BoxyRotateLoader } from "@/components/ui/boxy-rotate-loader";
import { BoxyBounceLoader } from "@/components/ui/boxy-bounce-loader";
import { BoxyShiftLoader } from "@/components/ui/boxy-shift-loader";
import { BasicLoader } from "@/components/ui/basic-loader";
import { CarouselSlider } from "@/components/ui/carousel-slider";
import { NavMenu } from "@/components/ui/nav-menu";
import { ErrorPage } from "@/components/ui/error-page";
import { ExpandingFlexCard } from "@/components/ui/expanding-flex-card";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
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

const Heading: React.FC<{ className?: string; variant?: any; as?: any; children: React.ReactNode }> = ({ className, variant, as: Tag = "h1", ...props }) => (
  <Tag className={cn(headingVariants({ variant, className }))} {...props} />
);

const Text: React.FC<{ className?: string; variant?: any; as?: any; children: React.ReactNode }> = ({ className, variant, as: Tag = "p", ...props }) => (
  <Tag className={cn(textVariants({ variant, className }))} {...props} />
);

const Label: React.FC<{ className?: string; as?: any; children: React.ReactNode }> = ({ className, as: Tag = "label", ...props }) => (
  <Tag className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
);

const Code: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, ...props }) => (
  <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)} {...props} />
);

const ToastPreview: React.FC = () => {
  const { toast } = useToast();
  const [position, setPosition] = React.useState<"top-right" | "top-left" | "bottom-right" | "bottom-left">("bottom-right");

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-wrap gap-2 justify-center">
        {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((pos) => (
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
    <div className="flex flex-col gap-8 w-full max-w-4xl p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-items-center">
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
    <div className="flex flex-wrap gap-6 items-center justify-center">
      <GlowyButton variant="primary">Primary</GlowyButton>
      <GlowyButton variant="success">Success</GlowyButton>
      <GlowyButton variant="danger">Danger</GlowyButton>
    </div>
  ),
  "basic-card": () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 w-full justify-items-center">
      <BasicCard variant="modern" color="#6366f1" name="Aryan Hooda" title="Full Stack Developer" />
      <BasicCard variant="clean" color="#10b981" name="John Doe" title="Product Designer" />
    </div>
  ),
  "boxy-rotate": () => <BoxyRotateLoader />,
  "boxy-bounce": () => <BoxyBounceLoader />,
  "boxy-shift": () => <BoxyShiftLoader />,
  "text-system": () => (
    <div className="max-w-2xl w-full flex flex-col gap-8 p-4 select-text text-left">
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-widest text-blue-500">Semantic Headings</Label>
        <Heading variant="h1">Heading 1</Heading>
        <Heading variant="h2">Heading 2</Heading>
      </div>
      <div className="space-y-4">
        <Text variant="lead">This is a lead paragraph.</Text>
        <Text>This is the default body text.</Text>
      </div>
    </div>
  ),
  "infinite-slider": () => (
    <CarouselSlider 
      slides={[
        { id: 1, tag: "EXPLORE", title: "EXOTIC ADVENTURE", location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1556206079-747a7a424d3d?ixlib=rb-4.0.3&q=80", tagBg: "bg-indigo-600" },
        { id: 2, tag: "CITY", title: "URBAN EXPLORER", location: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1571900670723-a317a66e3fb7?ixlib=rb-4.0.3&q=80", tagBg: "bg-emerald-600" },
      ]} 
    />
  ),
  menu: () => <NavMenu />,
  "error-page": () => <ErrorPage errorCode="404" errorText="ERROR" />,
  "expanding-card": () => (
    <ExpandingFlexCard 
      options={[
        { id: 1, main: "Forest", sub: "Majestic trees", img: "https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg", icon: "🚶" },
        { id: 2, main: "Winter", sub: "Delicate fall", img: "https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg", icon: "❄️" },
      ]}
    />
  ),
  basic: () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 p-8 w-full max-w-2xl items-center justify-items-center">
      <BasicLoader variant="modern" color="#3b82f6" text="Modern..." />
      <BasicLoader variant="clean" color="#10b981" text="Clean..." />
    </div>
  ),
  toast: ToastPreview
};
