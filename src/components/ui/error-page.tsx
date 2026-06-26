/**
 * @registry-slug error-page
 * @registry-name Error Page
 * @registry-description A Future UI Error Page component.
 * @registry-category ui
 * @registry-dependency class-variance-authority
 */
"use client";
import React, { useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type ErrorPageColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const errorPageVariants = cva(
  "w-full h-full flex-1 flex flex-col items-center justify-center text-center transition-all duration-300",
  {
    variants: {
      variant: {
        solid: "bg-background text-foreground",
        outline: "border-2 border-border bg-transparent",
        ghost: "bg-transparent hover:bg-accent/10",
        link: "bg-transparent",
      },
      theme: {
        default: "",
        modern: "bg-muted/30 backdrop-blur-md border border-border/50 shadow-xl",
        clean: "bg-transparent border-0 shadow-none",
        futuristic: "bg-black/90 border border-white/10 relative overflow-hidden",
        brutal: "bg-background border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]",
        halftone: "bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px]",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    defaultVariants: {
      variant: "solid",
      theme: "default",
      size: "md",
    }
  }
);

export interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof errorPageVariants> {
  errorCode?: string;
  errorText?: string;
  color?: ErrorPageColor;
  homeUrl?: string;
  homeText?: string;
  showHomeButton?: boolean;
}

const colorThemeMap: Record<ErrorPageColor, { main: string; glow1: string; glow2: string; glow3: string }> = {
  default: { main: "white", glow1: "white", glow2: "lightgray", glow3: "gray" },
  blue: { main: "#3b82f6", glow1: "#3b82f6", glow2: "#2563eb", glow3: "#1d4ed8" },
  emerald: { main: "#10b981", glow1: "#10b981", glow2: "#059669", glow3: "#047857" },
  rose: { main: "#f43f5e", glow1: "#f43f5e", glow2: "#e11d48", glow3: "#be123c" },
  amber: { main: "#f59e0b", glow1: "#f59e0b", glow2: "#d97706", glow3: "#b45309" },
  violet: { main: "#8b5cf6", glow1: "#8b5cf6", glow2: "#7c3aed", glow3: "#6d28d9" },
  indigo: { main: "#6366f1", glow1: "#6366f1", glow2: "#4f46e5", glow3: "#4338ca" },
  sky: { main: "#0ea5e9", glow1: "#0ea5e9", glow2: "#0284c7", glow3: "#0369a1" },
  slate: { main: "#64748b", glow1: "#64748b", glow2: "#475569", glow3: "#334155" },
  orange: { main: "#f97316", glow1: "#f97316", glow2: "#ea580c", glow3: "#c2410c" },
};

const getSizeStyles = (size: ErrorPageProps["size"]) => {
  switch (size) {
    case "sm": return "40px";
    case "lg": return "80px";
    case "xl": return "100px";
    case "full": return "min(10vw, 120px)";
    default: return "60px";
  }
};

const getButtonSize = (size: ErrorPageProps["size"]) => {
  switch (size) {
    case "sm": return "sm";
    case "lg": return "lg";
    case "xl": return "lg";
    case "full": return "lg";
    default: return "md";
  }
};

export const ErrorPage = React.forwardRef<HTMLDivElement, ErrorPageProps>(({ 
  className, 
  errorCode = "404", 
  errorText = "ERROR",
  color = "default",
  variant,
  theme,
  size,
  homeUrl = "/",
  homeText = "RETURN HOME",
  showHomeButton = true,
  ...props
}, ref) => {
  const activeTheme = colorThemeMap[color] || colorThemeMap.default;
  const id = useId().replace(/:/g, "");
  const fontSize = getSizeStyles(size);
  const btnSize = getButtonSize(size);

  let btnVariant = "solid";
  if (theme === "clean") btnVariant = "link";
  else if (theme === "modern" || theme === "brutal" || theme === "futuristic") btnVariant = "outline";

  const btnClass = cn(
    "mt-12 tracking-widest font-bold transition-all duration-300 z-10",
    theme === "modern" && "backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 text-white",
    theme === "futuristic" && "bg-black/40 hover:bg-black/60",
    theme === "brutal" && "border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:translate-y-1 hover:shadow-none transition-transform",
    theme === "halftone" && "border-2 border-dashed"
  );

  const futuristicStyle = theme === "futuristic" ? {
    borderColor: activeTheme.main,
    color: activeTheme.main,
    boxShadow: `0 0 15px ${activeTheme.glow3}`,
  } : {};

  return (
    <div 
      ref={ref}
      className={cn(errorPageVariants({ variant, theme, size, className }))}
      {...props}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
        .error-neon-container-${id} {
          font-family: 'Monoton', cursive;
          text-align: center;
          text-transform: uppercase;
          font-size: ${fontSize};
          color: ${activeTheme.main};
          text-shadow: 0 0 80px ${activeTheme.glow1}, 0 0 30px ${activeTheme.glow2}, 0 0 6px ${activeTheme.glow3};
          line-height: 1;
          cursor: pointer;
        }
        .error-neon-container-${id} p { margin: 10px; }
        .neon-error-${id} {
          color: #fff;
          text-shadow: 0 0 80px #ffffff, 0 0 30px #aaaaaa, 0 0 6px #555555;
        }
        .neon-error-${id} span { animation: upper-${id} 6s linear infinite; }
        .neon-error-${id} span:nth-of-type(2) { animation: lower-${id} 9s linear infinite; }
        .neon-error-${id} span:nth-of-type(1) { text-shadow: none; opacity: 0.4; }
        .error-neon-container-${id}:hover .neon-error-${id} {
          text-shadow: 0 0 200px #ffffff, 0 0 80px #aaaaaa, 0 0 6px #555555;
        }
        .error-neon-container-${id}:hover .neon-code-${id} {
          text-shadow: 0 0 100px ${activeTheme.glow1}, 0 0 40px ${activeTheme.glow2}, 0 0 8px ${activeTheme.glow3};
        }
        @keyframes upper-${id} {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 0.99;
            text-shadow: 0 0 80px #ffffff, 0 0 30px #aaaaaa, 0 0 6px #555555;
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.4; text-shadow: none; }
        }
        @keyframes lower-${id} {
          0%, 12%, 18.999%, 23%, 31.999%, 37%, 44.999%, 46%, 49.999%, 51%, 58.999%, 61%, 68.999%, 71%, 85.999%, 96%, 100% {
            opacity: 0.99;
            text-shadow: 0 0 80px ${activeTheme.glow1}, 0 0 30px ${activeTheme.glow2}, 0 0 6px ${activeTheme.glow3};
          }
          19%, 22.99%, 32%, 36.999%, 45%, 45.999%, 50%, 50.99%, 59%, 60.999%, 69%, 70.999%, 86%, 95.999% { opacity: 0.4; text-shadow: none; }
        }
      `}</style>
      <div className={`error-neon-container-${id}`}>
        <div className={`neon-error-${id} flex justify-center`}>
          {errorText.split("").map((char, i) => (
            <React.Fragment key={i}>
              {i === 1 ? <span>{char}</span> : char}
            </React.Fragment>
          ))}
        </div>
        <div className={`neon-code-${id} flex justify-center`}>
          {errorCode.split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
      </div>
      
      {showHomeButton && (
        <Button 
          asChild
          variant={btnVariant as any} 
          color={theme === "modern" || theme === "futuristic" ? "default" : color} 
          size={btnSize as any} 
          className={btnClass}
          style={futuristicStyle}
        >
          <Link href={homeUrl}>{homeText}</Link>
        </Button>
      )}
    </div>
  );
});
ErrorPage.displayName = "ErrorPage";
