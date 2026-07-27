/**
 * @registry-slug navbar
 * @registry-name Navbar
 * @registry-description A standalone responsive navbar with glass blur, scroll elevation, and an animated mobile menu.
 * @registry-category navigation
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type NavbarColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const accentTextMap: Record<NavbarColor, string> = {
  default: "text-foreground",
  blue: "text-blue-600 dark:text-blue-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  rose: "text-rose-600 dark:text-rose-400",
  amber: "text-amber-600 dark:text-amber-400",
  violet: "text-violet-600 dark:text-violet-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  sky: "text-sky-600 dark:text-sky-400",
  slate: "text-slate-600 dark:text-slate-400",
  orange: "text-orange-600 dark:text-orange-400",
};

const navbarVariants = cva(
  "sticky top-0 z-50 w-full transition-all duration-300",
  {
    variants: {
      variant: {
        glass: "bg-background/70 backdrop-blur-xl border-b border-border/40 supports-[backdrop-filter]:bg-background/50",
        solid: "bg-background border-b border-border",
        floating: "mx-auto mt-4 max-w-6xl rounded-2xl border border-border/50 bg-background/70 backdrop-blur-xl shadow-lg shadow-black/5",
        minimal: "bg-transparent",
      },
      size: {
        sm: "h-14",
        md: "h-16",
        lg: "h-20",
      },
    },
    defaultVariants: { variant: "glass", size: "md" },
  }
);

interface NavbarContextValue {
  color: NavbarColor;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const NavbarContext = React.createContext<NavbarContextValue>({
  color: "default",
  mobileOpen: false,
  setMobileOpen: () => {},
});

export interface NavbarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof navbarVariants> {
  color?: NavbarColor;
  /** Add a subtle shadow once the page is scrolled. */
  elevateOnScroll?: boolean;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant, size, color = "default", elevateOnScroll = true, children, ...props }, ref) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
      if (!elevateOnScroll) return;
      const onScroll = () => setScrolled(window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, [elevateOnScroll]);

    return (
      <NavbarContext.Provider value={{ color, mobileOpen, setMobileOpen }}>
        <motion.nav
          ref={ref}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            navbarVariants({ variant, size }),
            scrolled && elevateOnScroll && "shadow-md shadow-black/5",
            className
          )}
          {...(props as React.ComponentProps<typeof motion.nav>)}
        >
          <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
            {children}
          </div>
        </motion.nav>
      </NavbarContext.Provider>
    );
  }
);
Navbar.displayName = "Navbar";

const NavbarBrand = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex shrink-0 items-center gap-2.5 font-bold tracking-tight text-foreground", className)} {...props}>
    {children}
  </div>
);

const NavbarLinks = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("hidden md:flex items-center gap-1", className)} {...props}>
    {children}
  </div>
);

export interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ className, active, children, ...props }, ref) => {
    const { color } = React.useContext(NavbarContext);
    return (
      <a
        ref={ref}
        className={cn(
          "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
          active ? accentTextMap[color] : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          className
        )}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {children}
        {active && (
          <motion.span
            layoutId="fui-navbar-active"
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
            className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-current"
          />
        )}
      </a>
    );
  }
);
NavbarLink.displayName = "NavbarLink";

const NavbarActions = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("hidden md:flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

const NavbarMobileToggle = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { mobileOpen, setMobileOpen } = React.useContext(NavbarContext);
  return (
    <button
      type="button"
      aria-label={mobileOpen ? "Close menu" : "Open menu"}
      aria-expanded={mobileOpen}
      onClick={() => setMobileOpen(!mobileOpen)}
      className={cn(
        "md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
      {...props}
    >
      {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  );
};

const NavbarMobileMenu = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { mobileOpen, setMobileOpen } = React.useContext(NavbarContext);
  return (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={cn(
            "md:hidden absolute left-0 right-0 top-full overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-xl",
            className
          )}
          {...(props as React.ComponentProps<typeof motion.div>)}
        >
          <div className="flex flex-col gap-1 p-4" onClick={() => setMobileOpen(false)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Navbar, NavbarBrand, NavbarLinks, NavbarLink, NavbarActions, NavbarMobileToggle, NavbarMobileMenu };
