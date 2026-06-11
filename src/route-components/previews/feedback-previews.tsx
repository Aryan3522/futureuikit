"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Toggle } from "@/components/ui/toggle";
import { ErrorPage } from "@/components/ui/error-page";
import { CinematicError } from "@/components/ui/cinematic-error";
import { PreviewContainer } from "../preview-engine/PreviewContainer";

export const ToastPreview: React.FC = () => {
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

export const ModalPreview: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<"default" | "floating" | "glass" | "elevated" | "minimal" | "spotlight">("default");
  const [size, setSize] = React.useState<"xs" | "sm" | "md" | "lg" | "xl" | "full-width" | "full-screen">("md");
  const [position, setPosition] = React.useState<"center" | "top-center" | "bottom-sheet" | "left-side" | "right-side">("center");

  return (
    <PreviewContainer
      title="Modal"
      description="A premium modal interface with diverse variants and positions."
      variants={["default", "floating", "glass", "elevated", "minimal", "spotlight"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["xs", "sm", "md", "lg", "xl", "full-width", "full-screen"] as const).map(s => (
                <button key={s} onClick={() => setSize(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", size === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Position</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["center", "top-center", "bottom-sheet", "left-side", "right-side"] as const).map(p => (
                <button key={p} onClick={() => setPosition(p)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", position === p ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{p.replace("-", " ")}</button>
              ))}
            </div>
          </div>
        </>
      }
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-100 md:min-h-125 h-full p-4">
        <div className="flex items-center justify-center w-full h-64 relative">
          <Button onClick={() => setOpen(true)} size="lg" className="rounded-full shadow-lg shadow-primary/20 px-8">Open Modal</Button>
        </div>

        <Modal open={open} onOpenChange={setOpen} variant={variant} size={size} position={position}>
          <ModalContent>
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

export const DrawerPreview: React.FC = () => {
  const [placement, setPlacement] = React.useState<"left" | "right" | "top" | "bottom">("right");
  const [variant, setVariant] = React.useState<"default" | "compact" | "glass" | "elevated" | "floating">("default");

  return (
    <PreviewContainer
      title="Drawer"
      description="A flexible drawer with placement options and multiple styles."
      variants={["default", "compact", "glass", "elevated", "floating"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      contentClassName="relative overflow-hidden"
      extraControls={
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Placement</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["left", "right", "top", "bottom"] as const).map(p => (
              <button key={p} onClick={() => setPlacement(p)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", placement === p ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{p}</button>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex-1 flex items-center justify-center w-full h-full min-h-75">
        <Drawer placement={placement} variant={variant}>
          <DrawerTrigger asChild>
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">Open Drawer</Button>
          </DrawerTrigger>
        <DrawerContent>
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

export const TogglePreview: React.FC = () => {
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

export const ErrorPagePreview: React.FC = () => {
  return (
    <PreviewContainer title="Error Page" description="A clean, full-screen error component." contentClassName="p-0">
      <ErrorPage errorCode="404" errorText="ERROR" />
    </PreviewContainer>
  );
};

export const CinematicErrorPreview: React.FC = () => {
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
};
