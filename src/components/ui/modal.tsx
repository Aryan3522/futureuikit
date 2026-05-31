"use client";

/**
 * @registry-slug modal
 * @registry-name Modal
 * @registry-dependency @radix-ui/react-dialog
 * @registry-dependency framer-motion
 * @registry-dependency class-variance-authority
 * @registry-dependency lucide-react
 */

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Context ---

export type ModalVariant = "default" | "floating" | "glass" | "elevated" | "minimal" | "spotlight";
export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full-width" | "full-screen";
export type ModalPosition = "center" | "top-center" | "bottom-sheet" | "left-side" | "right-side";

interface ModalContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  variant: ModalVariant;
  size: ModalSize;
  position: ModalPosition;
}

const ModalContext = React.createContext<ModalContextValue | undefined>(undefined);

const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal provider");
  }
  return context;
};

// --- Components ---

export interface ModalProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  variant?: ModalVariant;
  size?: ModalSize;
  position?: ModalPosition;
  container?: HTMLElement | null; // Added for preview constraining
}

export const Modal: React.FC<ModalProps> = React.memo(({
          open,
          defaultOpen,
          onOpenChange,
          variant = "default",
          size = "md",
          position = "center",
          children,
          container, // Not used here, passed to context or Portal directly?
          ...props
        }) => {
          const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false);
          const isControlled = open !== undefined;
          const isOpen = isControlled ? open : internalOpen;

          const handleOpenChange = React.useCallback(
            (newOpen: boolean) => {
              if (!isControlled) {
                setInternalOpen(newOpen);
              }
              onOpenChange?.(newOpen);
            },
            [isControlled, onOpenChange]
          );

          return (
            <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange} {...props}>
              <ModalContext.Provider value={{ isOpen, setIsOpen: handleOpenChange, variant, size, position }}>
                {children}
              </ModalContext.Provider>
            </DialogPrimitive.Root>
          );
        });
Modal.displayName = "Modal";

export const ModalTrigger = React.memo(DialogPrimitive.Trigger);
ModalTrigger.displayName = "ModalTrigger";
export const ModalClose = React.memo(DialogPrimitive.Close);
ModalClose.displayName = "ModalClose";

// --- Content & Variants ---

const modalOverlayVariants = cva(
  "fixed inset-0 z-50 overflow-y-auto flex",
  {
    variants: {
      variant: {
        default: "bg-background/80 backdrop-blur-sm",
        floating: "bg-background/60 backdrop-blur-[2px]",
        glass: "bg-background/40 backdrop-blur-md",
        elevated: "bg-background/90 backdrop-blur-sm",
        minimal: "bg-background/80",
        spotlight: "bg-background/95 backdrop-blur-sm",
      },
      position: {
        center: "items-center justify-center p-4",
        "top-center": "items-start justify-center pt-16 p-4",
        "bottom-sheet": "items-end justify-center p-0 md:p-4",
        "left-side": "items-start justify-start p-0",
        "right-side": "items-start justify-end p-0",
      }
    },
    defaultVariants: {
      variant: "default",
      position: "center",
    }
  }
);

const modalContentVariants = cva(
  "relative z-50 flex flex-col focus:outline-none overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-background border border-border/40 shadow-xl",
        floating: "bg-background border border-border/50 shadow-2xl rounded-2xl ring-1 ring-black/5",
        glass: "bg-background/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl",
        elevated: "bg-background border border-border/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]",
        minimal: "bg-background shadow-md",
        spotlight: "bg-background border border-primary/30 shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)]",
      },
      size: {
        xs: "w-full max-w-xs",
        sm: "w-full max-w-sm",
        md: "w-full max-w-md",
        lg: "w-full max-w-lg",
        xl: "w-full max-w-xl",
        "full-width": "w-full max-w-[calc(100%-2rem)] mx-auto",
        "full-screen": "w-screen h-[100dvh] rounded-none border-none",
      },
      position: {
        center: "rounded-xl",
        "top-center": "rounded-xl mt-4 sm:mt-8",
        "bottom-sheet": "rounded-t-2xl sm:rounded-xl rounded-b-none sm:rounded-b-xl w-full",
        "left-side": "rounded-r-2xl sm:rounded-xl rounded-l-none sm:rounded-l-xl h-full min-h-[100dvh]",
        "right-side": "rounded-l-2xl sm:rounded-xl rounded-r-none sm:rounded-r-xl h-full min-h-[100dvh]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      position: "center",
    }
  }
);

const animationConfigs = {
  center: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 },
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  "top-center": {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  "bottom-sheet": {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
    transition: { type: "spring", damping: 28, stiffness: 250 }
  },
  "left-side": {
    initial: { opacity: 0, x: "-100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
    transition: { type: "spring", damping: 28, stiffness: 250 }
  },
  "right-side": {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
    transition: { type: "spring", damping: 28, stiffness: 250 }
  }
};

export interface ModalContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  className?: string;
  hideCloseButton?: boolean;
  container?: HTMLElement | null; // For local portal constraint
}

export const ModalContent = React.memo(React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, ModalContentProps>(
          ({ className, hideCloseButton = false, container, children, ...props }, ref) => {
            const { isOpen, variant, size, position } = useModalContext();
            const animConfig = animationConfigs[position];

            const positionClass = container ? "absolute" : "fixed";
            
            const baseOverlayClass = cn(
              modalOverlayVariants({ variant, position }),
              size === "full-screen" && "p-0"
            );
            const overlayClass = container ? baseOverlayClass.replace("fixed", positionClass) : baseOverlayClass;

            const baseContentClass = cn(modalContentVariants({ variant, size, position }), className);
            const contentClass = container 
              ? baseContentClass.replace(/w-screen/g, "w-full").replace(/h-\[100dvh\]/g, "h-full").replace(/min-h-\[100dvh\]/g, "min-h-full")
              : baseContentClass;

            return (
              <AnimatePresence>
                {isOpen && (
                  <DialogPrimitive.Portal forceMount container={container}>
                    <DialogPrimitive.Overlay asChild forceMount>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={overlayClass}
                      >
                        <DialogPrimitive.Content
                          ref={ref}
                          forceMount
                          asChild
                          {...props}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <motion.div
                            initial={animConfig.initial}
                            animate={animConfig.animate}
                            exit={animConfig.exit}
                            transition={animConfig.transition as any}
                            className={contentClass}
                          >
                            {children}
                            {!hideCloseButton && (
                              <DialogPrimitive.Close asChild>
                                <motion.button whileTap={{ scale: 0.9 }} className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full p-1.5 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10">
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Close</span>
                                </motion.button>
                              </DialogPrimitive.Close>
                            )}
                          </motion.div>
                        </DialogPrimitive.Content>
                      </motion.div>
                    </DialogPrimitive.Overlay>
                  </DialogPrimitive.Portal>
                )}
              </AnimatePresence>
            );
          }
        ));
ModalContent.displayName = "ModalContent";

export const ModalHeader = React.memo(({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
          <div className={cn("flex flex-col space-y-1.5 px-4 sm:px-6 pt-4 sm:pt-6 pb-4", className)} {...props} />
        ));
ModalHeader.displayName = "ModalHeader";

export const ModalTitle = React.memo(React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
          ({ className, ...props }, ref) => (
            <DialogPrimitive.Title
              ref={ref}
              className={cn("text-lg font-semibold leading-none tracking-tight", className)}
              {...props}
            />
          )
        ));
ModalTitle.displayName = "ModalTitle";

export const ModalDescription = React.memo(React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(
          ({ className, ...props }, ref) => (
            <DialogPrimitive.Description
              ref={ref}
              className={cn("text-sm text-muted-foreground", className)}
              {...props}
            />
          )
        ));
ModalDescription.displayName = "ModalDescription";

export const ModalBody = React.memo(({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
          <div className={cn("px-4 sm:px-6 py-2 overflow-y-auto min-h-0", className)} {...props} />
        ));
ModalBody.displayName = "ModalBody";

export const ModalFooter = React.memo(({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
          <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-4 sm:px-6 py-4 sm:py-6 mt-auto", className)} {...props} />
        ));
ModalFooter.displayName = "ModalFooter";
