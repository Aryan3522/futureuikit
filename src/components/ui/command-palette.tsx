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

interface CommandContextValue {
  variant: CommandVariant;
}

const CommandContext = React.createContext<CommandContextValue>({ variant: "default" });

const useCommandContext = () => React.useContext(CommandContext);

// --- Variants ---

const commandDialogOverlayVariants = cva(
  "fixed inset-0 z-50 grid place-items-center p-4 pt-16 sm:pt-24",
  {
    variants: {
      variant: {
        default: "bg-background/80 backdrop-blur-sm",
        compact: "bg-background/80 backdrop-blur-sm",
        floating: "bg-transparent", // No backdrop for floating
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
  "relative z-50 w-full max-w-xl focus:outline-none flex flex-col overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] duration-200",
  {
    variants: {
      variant: {
        default: "rounded-xl border border-border/40 bg-background shadow-2xl",
        compact: "rounded-lg border border-border/40 bg-background shadow-xl max-w-lg",
        floating: "rounded-2xl border border-border/50 bg-background shadow-2xl ring-1 ring-black/5",
        glass: "rounded-2xl border border-white/20 dark:border-white/10 bg-background/80 backdrop-blur-2xl shadow-2xl",
        spotlight: "rounded-xl border border-primary/30 bg-background shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const commandInputVariants = cva(
  "flex w-full rounded-md bg-transparent py-4 outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-50 font-medium tracking-tight",
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
  "relative flex cursor-default select-none items-center outline-none data-[selected=true]:bg-accent/60 data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "px-3 py-3 text-sm sm:text-base mx-2 my-1 rounded-xl",
        compact: "px-2.5 py-2 text-xs sm:text-sm mx-1.5 my-0.5 rounded-lg",
        floating: "px-4 py-3.5 text-sm sm:text-base mx-3 my-1.5 rounded-xl",
        glass: "px-3 py-3 text-sm sm:text-base mx-2 my-1 rounded-xl",
        spotlight: "px-4 py-3.5 text-sm sm:text-base mx-2 my-1.5 rounded-xl data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary font-medium",
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
  className?: string;
  container?: HTMLElement | null;
  children: React.ReactNode;
}

export const CommandPalette = React.memo(({
  variant = "default",
  className,
  container,
  children,
  ...props
}: CommandPaletteProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal container={container}>
        <DialogPrimitive.Overlay className={commandDialogOverlayVariants({ variant })} />
        <DialogPrimitive.Content className={commandDialogContentVariants({ variant })}>
          <VisuallyHidden>
            <DialogPrimitive.Title>Command Palette</DialogPrimitive.Title>
          </VisuallyHidden>
          <CommandContext.Provider value={{ variant }}>
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
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});
CommandPalette.displayName = "CommandPalette";

export const Command = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & { variant?: CommandVariant }
>(({ className, variant = "default", ...props }, ref) => (
  <CommandContext.Provider value={{ variant }}>
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl bg-background text-foreground",
        variant === "glass" && "bg-background/80 backdrop-blur-2xl border border-white/20 dark:border-white/10",
        variant === "spotlight" && "border border-primary/20",
        className
      )}
      {...props}
    />
  </CommandContext.Provider>
)));
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
        className={cn(commandInputVariants({ variant }), "px-2 sm:px-3", className)}
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
    className={cn("max-h-[60vh] sm:max-h-100 overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
)));
CommandList.displayName = CommandPrimitive.List.displayName;

export const CommandEmpty = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-12 text-center text-sm text-muted-foreground"
    {...props}
  />
)));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export const CommandGroup = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => {
  const { variant } = useCommandContext();

  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden text-foreground",

        "[& [cmdk-group-heading]]:px-5",
        "[& [cmdk-group-heading]]:py-3",
        "[& [cmdk-group-heading]]:text-[11px]",
        "[& [cmdk-group-heading]]:font-bold",
        "[& [cmdk-group-heading]]:uppercase",
        "[& [cmdk-group-heading]]:tracking-[0.2em]",
        "[& [cmdk-group-heading]]:text-muted-foreground/60",

        variant === "compact" && (
          "[& [cmdk-group-heading]]:px-4 [& [cmdk-group-heading]]:py-2"
        ),

        variant === "floating" && (
          "[& [cmdk-group-heading]]:px-6"
        ),

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
  const { variant } = useCommandContext();

  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(commandItemVariants({ variant }), className)}
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
