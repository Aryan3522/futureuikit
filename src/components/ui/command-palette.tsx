"use client";

/**
 * @registry-slug command-palette
 * @registry-name Command Palette
 * @registry-description A Future UI Command Palette component.
 * @registry-category ui
 * @registry-dependency cmdk
 * @registry-dependency @radix-ui/react-dialog
 * @registry-dependency lucide-react
 * @registry-dependency class-variance-authority
 */

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// --- Context ---

export type CommandVariant = "default" | "compact" | "floating" | "glass" | "spotlight";
export type CommandColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CommandShape = "default" | "square" | "rounded" | "sharp";
export type CommandSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface CommandContextValue {
  variant: CommandVariant;
  color: CommandColor;
  shape: CommandShape;
  spacing: CommandSpacing;
}

const CommandContext = React.createContext<CommandContextValue>({ variant: "default", color: "default", shape: "default", spacing: "default" });

const useCommandContext = () => React.useContext(CommandContext);

const colorThemeMap: Record<CommandColor, { border: string; shadow: string; bgSelected: string; textSelected: string }> = {
  default: { border: "border-primary/30", shadow: "shadow-[0_0_40px_-10px] shadow-primary/30", bgSelected: "data-[selected=true]:bg-primary/10", textSelected: "data-[selected=true]:text-primary" },
  blue: { border: "border-blue-600/30 dark:border-blue-500/30", shadow: "shadow-[0_0_40px_-10px] shadow-blue-600/30 dark:shadow-blue-500/30", bgSelected: "data-[selected=true]:bg-blue-600/10 dark:data-[selected=true]:bg-blue-500/10", textSelected: "data-[selected=true]:text-blue-600 dark:data-[selected=true]:text-blue-500" },
  emerald: { border: "border-emerald-600/30 dark:border-emerald-500/30", shadow: "shadow-[0_0_40px_-10px] shadow-emerald-600/30 dark:shadow-emerald-500/30", bgSelected: "data-[selected=true]:bg-emerald-600/10 dark:data-[selected=true]:bg-emerald-500/10", textSelected: "data-[selected=true]:text-emerald-600 dark:data-[selected=true]:text-emerald-500" },
  rose: { border: "border-rose-600/30 dark:border-rose-500/30", shadow: "shadow-[0_0_40px_-10px] shadow-rose-600/30 dark:shadow-rose-500/30", bgSelected: "data-[selected=true]:bg-rose-600/10 dark:data-[selected=true]:bg-rose-500/10", textSelected: "data-[selected=true]:text-rose-600 dark:data-[selected=true]:text-rose-500" },
  amber: { border: "border-amber-600/30 dark:border-amber-500/30", shadow: "shadow-[0_0_40px_-10px] shadow-amber-600/30 dark:shadow-amber-500/30", bgSelected: "data-[selected=true]:bg-amber-600/10 dark:data-[selected=true]:bg-amber-500/10", textSelected: "data-[selected=true]:text-amber-600 dark:data-[selected=true]:text-amber-500" },
  violet: { border: "border-violet-600/30 dark:border-violet-500/30", shadow: "shadow-[0_0_40px_-10px] shadow-violet-600/30 dark:shadow-violet-500/30", bgSelected: "data-[selected=true]:bg-violet-600/10 dark:data-[selected=true]:bg-violet-500/10", textSelected: "data-[selected=true]:text-violet-600 dark:data-[selected=true]:text-violet-500" },
  indigo: { border: "border-indigo-600/30 dark:border-indigo-500/30", shadow: "shadow-[0_0_40px_-10px] shadow-indigo-600/30 dark:shadow-indigo-500/30", bgSelected: "data-[selected=true]:bg-indigo-600/10 dark:data-[selected=true]:bg-indigo-500/10", textSelected: "data-[selected=true]:text-indigo-600 dark:data-[selected=true]:text-indigo-500" },
  sky: { border: "border-sky-600/30 dark:border-sky-500/30", shadow: "shadow-[0_0_40px_-10px] shadow-sky-600/30 dark:shadow-sky-500/30", bgSelected: "data-[selected=true]:bg-sky-600/10 dark:data-[selected=true]:bg-sky-500/10", textSelected: "data-[selected=true]:text-sky-600 dark:data-[selected=true]:text-sky-500" },
  slate: { border: "border-slate-600/30 dark:border-slate-500/30", shadow: "shadow-[0_0_40px_-10px] shadow-slate-600/30 dark:shadow-slate-500/30", bgSelected: "data-[selected=true]:bg-slate-600/10 dark:data-[selected=true]:bg-slate-500/10", textSelected: "data-[selected=true]:text-slate-600 dark:data-[selected=true]:text-slate-400" },
  orange: { border: "border-orange-600/30 dark:border-orange-500/30", shadow: "shadow-[0_0_40px_-10px] shadow-orange-600/30 dark:shadow-orange-500/30", bgSelected: "data-[selected=true]:bg-orange-600/10 dark:data-[selected=true]:bg-orange-500/10", textSelected: "data-[selected=true]:text-orange-600 dark:data-[selected=true]:text-orange-500" },
};

const getShapeClass = (shape: CommandShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-2xl";
  }
};

const getItemShapeClass = (shape: CommandShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-lg";
    case "default": return "rounded-xl";
  }
};

const getSpacingClass = (spacing: CommandSpacing) => {
  switch (spacing) {
    case "2x": return "p-2";
    case "4x": return "p-4";
    case "6x": return "p-6";
    case "8x": return "p-8";
    default: return "";
  }
};

// --- Variants ---

const commandDialogOverlayVariants = cva(
  "fixed inset-0 z-[10000] flex items-center justify-center bg-background/80 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-background/80 backdrop-blur-sm",
        compact: "bg-background/80 backdrop-blur-sm",
        floating: "bg-background/40 backdrop-blur-[2px]", // Slight blur for floating
        glass: "bg-background/40 backdrop-blur-md",
        spotlight: "bg-background/90 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const commandDialogContentVariants = cva(
  "relative z-[10000] w-full max-w-xl focus:outline-none flex flex-col overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",
  {
    variants: {
      variant: {
        default: "border border-border/40 bg-background shadow-2xl",
        compact: "border border-border/40 bg-background shadow-xl max-w-lg",
        floating: "border border-border/50 bg-background shadow-2xl ring-1 ring-black/5",
        glass: "border border-white/20 dark:border-white/10 bg-background/80 backdrop-blur-2xl shadow-2xl",
        spotlight: "border bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const commandInputVariants = cva(
  "flex w-full bg-transparent py-4 outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-50 font-medium tracking-tight",
  {
    variants: {
      variant: {
        default: "h-14 px-5 text-base sm:text-lg",
        compact: "h-12 px-4 text-sm sm:text-base",
        floating: "h-16 px-6 text-lg sm:text-xl",
        glass: "h-14 px-5 text-base sm:text-lg",
        spotlight: "h-16 px-8 text-lg sm:text-xl font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const commandItemVariants = cva(
  "relative flex cursor-default select-none items-center outline-none transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "px-3 py-3 text-sm sm:text-base mx-2 my-1 data-[selected=true]:bg-accent/60 data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        compact: "px-2.5 py-2 text-xs sm:text-sm mx-1.5 my-0.5 data-[selected=true]:bg-accent/60 data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        floating: "px-4 py-3.5 text-sm sm:text-base mx-3 my-1.5 data-[selected=true]:bg-accent/60 data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        glass: "px-3 py-3 text-sm sm:text-base mx-2 my-1 data-[selected=true]:bg-accent/60 data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        spotlight: "px-4 py-3.5 text-sm sm:text-base mx-2 my-1.5 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// --- Components ---

export interface CommandPaletteProps extends DialogPrimitive.DialogProps {
  variant?: CommandVariant;
  color?: CommandColor;
  shape?: CommandShape;
  spacing?: CommandSpacing;
  className?: string;
  container?: HTMLElement | null;
  children: React.ReactNode;
}

export const CommandPalette = React.memo(({
  variant = "default",
  color = "default",
  shape = "default",
  spacing = "default",
  className,
  container,
  children,
  ...props
}: CommandPaletteProps) => {
  const activeTheme = colorThemeMap[color];
  const shapeClass = getShapeClass(shape);

  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal container={container}>
        <DialogPrimitive.Overlay asChild>
          <div className={commandDialogOverlayVariants({ variant })}>
            <DialogPrimitive.Content
              onOpenAutoFocus={(e) => e.preventDefault()}
              className={cn(commandDialogContentVariants({ variant }), shapeClass, variant === "spotlight" && cn(activeTheme.border, activeTheme.shadow))}
            >
              <VisuallyHidden>
                <DialogPrimitive.Title>Command Palette</DialogPrimitive.Title>
              </VisuallyHidden>
              <CommandContext.Provider value={{ variant, color, shape, spacing }}>
                <CommandPrimitive
                  className={cn(
                    "flex h-full w-full flex-col overflow-hidden bg-transparent text-foreground",
                    className
                  )}
                >
                  {children}
                </CommandPrimitive>
              </CommandContext.Provider>
            </DialogPrimitive.Content>
          </div>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});
CommandPalette.displayName = "CommandPalette";

export const Command = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & { variant?: CommandVariant, color?: CommandColor, shape?: CommandShape, spacing?: CommandSpacing }
>(({ className, variant = "default", color = "default", shape = "default", spacing = "default", ...props }, ref) => {
  const activeTheme = colorThemeMap[color];
  const shapeClass = getShapeClass(shape);

  return (
    <CommandContext.Provider value={{ variant, color, shape, spacing }}>
      <CommandPrimitive
        ref={ref}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden bg-background text-foreground",
          shapeClass,
          variant === "glass" && "bg-background/80 backdrop-blur-2xl border border-white/20 dark:border-white/10",
          variant === "spotlight" && cn("border", activeTheme.border),
          className
        )}
        {...props}
      />
    </CommandContext.Provider>
  );
}));
Command.displayName = CommandPrimitive.displayName;

export const CommandInput = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const { variant } = useCommandContext();

  return (
    <div className="flex items-center border-b border-border/40 px-4 sm:px-5" cmdk-input-wrapper="">
      <Search className="mr-1 h-5 w-5 shrink-0 text-muted-foreground/50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(commandInputVariants({ variant }), "px-2 sm:px-3 rounded-md", className)}
        {...props}
      />
    </div>
  );
}));
CommandInput.displayName = CommandPrimitive.Input.displayName;

export const CommandList = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[60vh] sm:max-h-100 overflow-x-hidden", className)}
    {...props}
  />
)));
CommandList.displayName = CommandPrimitive.List.displayName;

export const CommandEmpty = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("py-12 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
)));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export const CommandGroup = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => {
  const { variant, spacing } = useCommandContext();
  const spacingClass = getSpacingClass(spacing);

  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden text-foreground",

        "[[cmdk-group-heading]]:px-5",
        "[[cmdk-group-heading]]:py-3",
        "[[cmdk-group-heading]]:text-[11px]",
        "[[cmdk-group-heading]]:font-bold",
        "[[cmdk-group-heading]]:uppercase",
        "[[cmdk-group-heading]]:tracking-[0.2em]",
        "[[cmdk-group-heading]]:text-muted-foreground/60",

        variant === "compact" && (
          "[[cmdk-group-heading]]:px-4 [[cmdk-group-heading]]:py-2"
        ),

        variant === "floating" && (
          "[[cmdk-group-heading]]:px-6"
        ),
        spacingClass,
        className
      )}
      {...props}
    />
  );
}));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

export const CommandSeparator = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border/40", className)}
    {...props}
  />
)));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export const CommandItem = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { variant, color, shape } = useCommandContext();
  const activeTheme = colorThemeMap[color];
  const itemShapeClass = getItemShapeClass(shape);

  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(commandItemVariants({ variant }), itemShapeClass, variant === "spotlight" && cn(activeTheme.bgSelected, activeTheme.textSelected, "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"), className)}
      {...props}
    />
  );
}));
CommandItem.displayName = CommandPrimitive.Item.displayName;

export const CommandShortcut = React.memo(({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground/70",
        className
      )}
      {...props}
    />
  );
});
CommandShortcut.displayName = "CommandShortcut";
