"use client";

/**
 * @registry-slug drawer
 * @registry-name Drawer
 * @registry-description A Future UI Drawer component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency class-variance-authority
 * @registry-dependency lucide-react
 * @registry-dependency @radix-ui/react-slot
 * @registry-file src/components/ui/button.tsx
 */

import * as React from "react";
import { createPortal } from "react-dom";
import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence, motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const DrawerContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  placement: "left" | "right" | "top" | "bottom";
  variant: "default" | "floating" | "glass" | "compact" | "elevated";
} | null>(null);

function useDrawer() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer provider");
  }
  return context;
}

export interface DrawerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultIsOpen?: boolean;
  placement?: "left" | "right" | "top" | "bottom";
  variant?: "default" | "floating" | "glass" | "compact" | "elevated";
}

export const Drawer = React.memo(function Drawer({
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
  defaultIsOpen = false,
  placement = "right",
  variant = "default",
}: DrawerProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = React.useState(defaultIsOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const setIsOpen = React.useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledIsOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DrawerContext.Provider value={{ isOpen, setIsOpen, placement, variant }}>
      {children}
    </DrawerContext.Provider>
  );
});
Drawer.displayName = "Drawer";

export const DrawerTrigger = React.memo(React.forwardRef<
          HTMLButtonElement,
          React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
        >(({ className, children, asChild = false, onClick, ...props }, ref) => {
          const { setIsOpen } = useDrawer();

          const Comp = asChild ? Slot : "button";
          const buttonProps = asChild ? {} : { type: "button" as const };

          return (
            <Comp
              ref={ref as any}
              className={className}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setIsOpen(true);
                onClick?.(e);
              }}
              {...buttonProps}
              {...props}
            >
              {children}
            </Comp>
          );
        }));
DrawerTrigger.displayName = "DrawerTrigger";

const drawerVariants = cva(
  "fixed z-50 flex flex-col focus:outline-none",
  {
    variants: {
      placement: {
        left: "inset-y-0 left-0 h-full",
        right: "inset-y-0 right-0 h-full",
        top: "inset-x-0 top-0 w-full flex-col",
        bottom: "inset-x-0 bottom-0 w-full flex-col-reverse",
      },
      variant: {
        default: "bg-background border-border shadow-2xl",
        floating: "bg-background border border-border shadow-2xl rounded-3xl",
        glass: "bg-background/70 backdrop-blur-2xl border-white/10 shadow-2xl",
        compact: "bg-background border-border shadow-2xl",
        elevated: "bg-background border-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]",
      },
    },
    compoundVariants: [
      {
        placement: ["left", "right"],
        variant: ["default", "glass", "elevated"],
        className: "w-3/4 sm:w-[400px]",
      },
      {
        placement: ["left", "right"],
        variant: "compact",
        className: "w-[280px]",
      },
      {
        placement: ["left", "right"],
        variant: "floating",
        className: "w-3/4 sm:w-[400px] h-[calc(100%-2rem)] my-4 mx-4",
      },
      {
        placement: "left",
        variant: ["default", "compact", "glass", "elevated"],
        className: "border-r",
      },
      {
        placement: "right",
        variant: ["default", "compact", "glass", "elevated"],
        className: "border-l",
      },
      {
        placement: "top",
        variant: ["default", "compact", "glass", "elevated"],
        className: "border-b h-auto max-h-[80vh]",
      },
      {
        placement: "bottom",
        variant: ["default", "compact", "glass", "elevated"],
        className: "border-t h-auto max-h-[80vh]",
      },
      {
        placement: ["top", "bottom"],
        variant: "floating",
        className: "h-auto max-h-[80vh] mx-auto w-[calc(100%-2rem)]",
      },
      {
        placement: "top",
        variant: "floating",
        className: "mt-4",
      },
      {
        placement: "bottom",
        variant: "floating",
        className: "mb-4",
      }
    ],
    defaultVariants: {
      placement: "right",
      variant: "default",
    },
  }
);

export const DrawerContent = React.memo(React.forwardRef<
          HTMLDivElement,
          React.HTMLAttributes<HTMLDivElement> & { container?: HTMLElement | null }
        >(({ className, children, container, ...props }, ref) => {
          const { isOpen, setIsOpen, placement, variant } = useDrawer();
          const contentRef = React.useRef<HTMLDivElement>(null);
          const [mounted, setMounted] = React.useState(false);

          React.useEffect(() => {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMounted(true);
          }, []);

          // Expose ref
          React.useImperativeHandle(ref, () => contentRef.current!);

          // Scroll lock & Escape key
          React.useEffect(() => {
            if (!isOpen) return;

            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e: KeyboardEvent) => {
              if (e.key === "Escape") {
                setIsOpen(false);
              }
            };

            document.addEventListener("keydown", handleKeyDown);

            return () => {
              document.body.style.overflow = originalStyle;
              document.removeEventListener("keydown", handleKeyDown);
            };
          }, [isOpen, setIsOpen]);

          // Focus trap
          React.useEffect(() => {
            if (!isOpen || !contentRef.current) return;

            const focusableElements = contentRef.current.querySelectorAll(
              'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            // Focus the first element on open
            if (firstElement) {
              setTimeout(() => firstElement.focus({ preventScroll: true }), 50); // slight delay to allow animation to start
            } else {
              setTimeout(() => contentRef.current?.focus({ preventScroll: true }), 50);
            }

            const handleTabKey = (e: KeyboardEvent) => {
              if (e.key !== "Tab") return;

              if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                  lastElement?.focus({ preventScroll: true });
                  e.preventDefault();
                }
              } else {
                if (document.activeElement === lastElement) {
                  firstElement?.focus({ preventScroll: true });
                  e.preventDefault();
                }
              }
            };

            document.addEventListener("keydown", handleTabKey);
            return () => document.removeEventListener("keydown", handleTabKey);
          }, [isOpen]);

          const animationVariants: any = {
            hidden: {
              x: placement === "left" ? "-100%" : placement === "right" ? "100%" : 0,
              y: placement === "top" ? "-100%" : placement === "bottom" ? "100%" : 0,
              opacity: variant === "floating" ? 0 : 1,
              scale: variant === "floating" ? 0.95 : 1,
            },
            visible: {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                damping: 24,
                stiffness: 200,
                mass: 0.8,
              },
            },
            exit: {
              x: placement === "left" ? "-100%" : placement === "right" ? "100%" : 0,
              y: placement === "top" ? "-100%" : placement === "bottom" ? "100%" : 0,
              opacity: variant === "floating" ? 0 : 1,
              scale: variant === "floating" ? 0.95 : 1,
              transition: {
                type: "spring",
                damping: 24,
                stiffness: 200,
                mass: 0.8,
              },
            },
          };

          if (!mounted) return null;

          const target = container || document.body;
          const positionClass = container ? "absolute" : "fixed";

          return createPortal(
            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(`${positionClass} inset-0 z-50 bg-background/80 backdrop-blur-sm`)}
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                  />

                  {/* Drawer Content */}
                  <motion.div
                    ref={contentRef}
                    variants={animationVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    role="dialog"
                    aria-modal="true"
                    tabIndex={-1}
                    className={cn(drawerVariants({ placement, variant }).replace("fixed", positionClass), className)}
                    {...(props as any)}
                  >
                    {children}
                  </motion.div>
                </>
              )}
            </AnimatePresence>,
            target
          );
        }));
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = React.memo(React.forwardRef<
          HTMLDivElement,
          React.HTMLAttributes<HTMLDivElement>
        >(({ className, children, ...props }, ref) => (
          <div
            ref={ref}
            className={cn("flex flex-col space-y-1.5 p-6", className)}
            {...props}
          >
            {children}
          </div>
        )));
DrawerHeader.displayName = "DrawerHeader";

export const DrawerTitle = React.memo(React.forwardRef<
          HTMLHeadingElement,
          React.HTMLAttributes<HTMLHeadingElement>
        >(({ className, ...props }, ref) => (
          <h2
            ref={ref}
            className={cn(
              "text-lg font-semibold leading-none tracking-tight",
              className
            )}
            {...props}
          />
        )));
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.memo(React.forwardRef<
          HTMLParagraphElement,
          React.HTMLAttributes<HTMLParagraphElement>
        >(({ className, ...props }, ref) => (
          <p
            ref={ref}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
          />
        )));
DrawerDescription.displayName = "DrawerDescription";

export const DrawerBody = React.memo(React.forwardRef<
          HTMLDivElement,
          React.HTMLAttributes<HTMLDivElement>
        >(({ className, ...props }, ref) => (
          <div
            ref={ref}
            className={cn("flex-1 overflow-y-auto p-6 pt-0", className)}
            {...props}
          />
        )));
DrawerBody.displayName = "DrawerBody";

export const DrawerFooter = React.memo(React.forwardRef<
          HTMLDivElement,
          React.HTMLAttributes<HTMLDivElement>
        >(({ className, ...props }, ref) => (
          <div
            ref={ref}
            className={cn("mt-auto flex flex-col gap-2 p-6", className)}
            {...props}
          />
        )));
DrawerFooter.displayName = "DrawerFooter";

export const DrawerClose = React.memo(React.forwardRef<
          HTMLButtonElement,
          React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
        >(({ className, asChild = false, ...props }, ref) => {
          const { setIsOpen } = useDrawer();

          if (asChild) {
            const Comp = Slot;
            return (
              <Comp
                ref={ref}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setIsOpen(false);
                  props.onClick?.(e);
                }}
                {...props}
              />
            );
          }

          return (
            <motion.button
              whileTap={{ scale: 0.9 }}
              ref={ref}
              type="button"
              onClick={() => setIsOpen(false)}
              className={cn(
                "absolute right-4 top-4 rounded-full p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
                className
              )}
              {...(props as any)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </motion.button>
          );
        }));
DrawerClose.displayName = "DrawerClose";
