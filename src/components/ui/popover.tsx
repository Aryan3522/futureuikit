/**
 * @registry-slug popover
 * @registry-name Popover
 * @registry-description A dependency-free popover primitive with spring entrance, side/align placement, and outside-click dismissal.
 * @registry-category overlay
 * @registry-type components:ui
 * @registry-dependency framer-motion
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

const usePopover = () => {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) throw new Error("Popover components must be used inside <Popover>");
  return ctx;
};

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Popover = ({ open: controlled, defaultOpen = false, onOpenChange, children }: PopoverProps) => {
  const [internal, setInternal] = React.useState(defaultOpen);
  const open = controlled !== undefined ? controlled : internal;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentId = React.useId();

  const setOpen = (v: boolean) => {
    if (controlled === undefined) setInternal(v);
    onOpenChange?.(v);
  };

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentId }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, asChild, children, onClick, ...props }, ref) => {
    const ctx = usePopover();
    const { triggerRef } = ctx;
    const composedRef = (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.setOpen(!ctx.open);
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        ref: composedRef,
        onClick: handleClick,
        "aria-expanded": ctx.open,
        "aria-controls": ctx.contentId,
      });
    }

    return (
      <button
        ref={composedRef}
        type="button"
        aria-expanded={ctx.open}
        aria-controls={ctx.contentId}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";

const sideClasses: Record<Side, string> = {
  bottom: "top-full mt-2",
  top: "bottom-full mb-2",
  right: "left-full ml-2 top-0",
  left: "right-full mr-2 top-0",
};

const alignClasses: Record<Side, Record<Align, string>> = {
  bottom: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
  top: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
  right: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
  left: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
};

const originMap: Record<Side, string> = {
  bottom: "origin-top",
  top: "origin-bottom",
  right: "origin-left",
  left: "origin-right",
};

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: Side;
  align?: Align;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, side = "bottom", align = "center", children, ...props }, ref) => {
    const ctx = usePopover();
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (!ctx.open) return;
      const onPointerDown = (e: PointerEvent) => {
        const target = e.target as Node;
        if (contentRef.current?.contains(target) || ctx.triggerRef.current?.contains(target)) return;
        ctx.setOpen(false);
      };
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          ctx.setOpen(false);
          ctx.triggerRef.current?.focus();
        }
      };
      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctx.open]);

    return (
      <AnimatePresence>
        {ctx.open && (
          <motion.div
            ref={(node) => {
              contentRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            id={ctx.contentId}
            role="dialog"
            initial={{ opacity: 0, scale: 0.95, y: side === "top" ? 4 : side === "bottom" ? -4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 34 }}
            className={cn(
              "absolute z-50 min-w-56 rounded-xl border border-border/60 bg-background p-4 shadow-xl shadow-black/10",
              sideClasses[side],
              alignClasses[side][align],
              originMap[side],
              className
            )}
            {...(props as React.ComponentProps<typeof motion.div>)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

const PopoverClose = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const ctx = usePopover();
  return (
    <button type="button" onClick={() => ctx.setOpen(false)} className={className} {...props}>
      {children}
    </button>
  );
};

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
