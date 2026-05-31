"use client";

/**
 * @registry-slug command-palette
 * @registry-name Command Palette
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
        default: "bg-black/40 backdrop-blur-sm",
        compact: "bg-black/40 backdrop-blur-sm",
        floating: "bg-transparent", // No backdrop for floating
        glass: "bg-black/20 backdrop-blur-md",
        spotlight: "bg-black/80 backdrop-blur-sm",
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
  "flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "h-14 px-4 text-base",
        compact: "h-10 px-3 text-sm",
        floating: "h-16 px-6 text-lg",
        glass: "h-14 px-5 text-base",
        spotlight: "h-16 px-6 text-lg font-medium tracking-tight",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const commandItemVariants = cva(
  "relative flex cursor-default select-none items-center rounded-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
  {
    variants: {
      variant: {
        default: "px-2 py-2.5 text-sm mx-2 my-1",
        compact: "px-2 py-1.5 text-xs mx-1.5 my-0.5",
        floating: "px-3 py-3 text-sm mx-3 my-1.5 rounded-md",
        glass: "px-3 py-2.5 text-sm mx-2 my-1 rounded-md",
        spotlight: "px-3 py-3 text-sm mx-2 my-1 rounded-md data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary",
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

export const CommandPalette = ({
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
};

export const Command = React.forwardRef<
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
));
Command.displayName = CommandPrimitive.displayName;

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const { variant } = useCommandContext();
  
  return (
    <div className="flex items-center border-b border-border/40 px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-5 w-5 shrink-0 text-muted-foreground opacity-70" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(commandInputVariants({ variant }), className)}
        {...props}
      />
    </div>
  );
});
CommandInput.displayName = CommandPrimitive.Input.displayName;

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[60vh] sm:max-h-[400px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-12 text-center text-sm text-muted-foreground"
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => {
  const { variant } = useCommandContext();
  
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden text-foreground",
        "[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground",
        variant === "compact" && "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1",
        variant === "floating" && "[&_[cmdk-group-heading]]:px-5",
        className
      )}
      {...props}
    />
  );
});
CommandGroup.displayName = CommandPrimitive.Group.displayName;

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border/40", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export const CommandItem = React.forwardRef<
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
});
CommandItem.displayName = CommandPrimitive.Item.displayName;

export const CommandShortcut = ({
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
};
CommandShortcut.displayName = "CommandShortcut";
