/**
 * @registry-slug calculator
 * @registry-name Calculator
 * @registry-description A Future UI Calculator component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  Minus, 
  X, 
  Divide, 
  Delete, 
  RotateCcw, 
  Percent, 
  Equal 
} from "lucide-react";

export type CalculatorColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CalculatorShape = "default" | "square" | "rounded" | "sharp";
export type CalculatorSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface CalculatorProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "brutal" | "neon";
  color?: CalculatorColor;
  shape?: CalculatorShape;
  spacing?: CalculatorSpacing;
}

const colorThemeMap: Record<CalculatorColor, { text: string; bg: string; border: string; neonGlow: string; bgSoft: string; shadow: string }> = {
  default: { text: "text-foreground", bg: "bg-primary text-primary-foreground", border: "border-primary", neonGlow: "shadow-primary/50", bgSoft: "bg-primary/10", shadow: "shadow-[0_0_15px_0]" },
  blue: { text: "text-blue-600 dark:text-blue-500", bg: "bg-blue-600 text-white", border: "border-blue-600 dark:border-blue-500", neonGlow: "shadow-blue-500/50", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", shadow: "shadow-[0_0_15px_0]" },
  emerald: { text: "text-emerald-600 dark:text-emerald-500", bg: "bg-emerald-600 text-white", border: "border-emerald-600 dark:border-emerald-500", neonGlow: "shadow-emerald-500/50", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", shadow: "shadow-[0_0_15px_0]" },
  rose: { text: "text-rose-600 dark:text-rose-500", bg: "bg-rose-600 text-white", border: "border-rose-600 dark:border-rose-500", neonGlow: "shadow-rose-500/50", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", shadow: "shadow-[0_0_15px_0]" },
  amber: { text: "text-amber-600 dark:text-amber-500", bg: "bg-amber-600 text-white", border: "border-amber-600 dark:border-amber-500", neonGlow: "shadow-amber-500/50", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", shadow: "shadow-[0_0_15px_0]" },
  violet: { text: "text-violet-600 dark:text-violet-500", bg: "bg-violet-600 text-white", border: "border-violet-600 dark:border-violet-500", neonGlow: "shadow-violet-500/50", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", shadow: "shadow-[0_0_15px_0]" },
  indigo: { text: "text-indigo-600 dark:text-indigo-500", bg: "bg-indigo-600 text-white", border: "border-indigo-600 dark:border-indigo-500", neonGlow: "shadow-indigo-500/50", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", shadow: "shadow-[0_0_15px_0]" },
  sky: { text: "text-sky-600 dark:text-sky-500", bg: "bg-sky-600 text-white", border: "border-sky-600 dark:border-sky-500", neonGlow: "shadow-sky-500/50", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", shadow: "shadow-[0_0_15px_0]" },
  slate: { text: "text-slate-600 dark:text-slate-400", bg: "bg-slate-600 text-white", border: "border-slate-600 dark:border-slate-500", neonGlow: "shadow-slate-500/50", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", shadow: "shadow-[0_0_15px_0]" },
  orange: { text: "text-orange-600 dark:text-orange-500", bg: "bg-orange-600 text-white", border: "border-orange-600 dark:border-orange-500", neonGlow: "shadow-orange-500/50", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", shadow: "shadow-[0_0_15px_0]" },
};

const getShapeClass = (shape: CalculatorShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-3xl";
    case "default": return "rounded-[2.5rem]";
  }
};

const getButtonShapeClass = (shape: CalculatorShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-2xl";
  }
};

const getSpacingClass = (spacing: CalculatorSpacing) => {
  switch (spacing) {
    case "2x": return "p-4 gap-4";
    case "4x": return "p-5 sm:p-8 gap-6";
    case "6x": return "p-6 sm:p-10 gap-8";
    case "8x": return "p-8 sm:p-12 gap-10";
    default: return "p-5 sm:p-8 gap-6";
  }
};

export const Calculator: React.FC<CalculatorProps> = React.memo(({
          className,
          variant = "glass",
          color = "default",
          shape = "default",
          spacing = "default",
          ...props
        }) => {
          const [display, setDisplay] = useState("0");
          const [prevValue, setPrevValue] = useState<number | null>(null);
          const [operation, setOperation] = useState<string | null>(null);
          const [waitingForOperand, setWaitingForOperand] = useState(false);

          const activeTheme = colorThemeMap[color];
          const shapeClass = variant === "brutal" ? "rounded-none" : getShapeClass(shape);
          const btnShapeClass = variant === "brutal" ? "rounded-none" : getButtonShapeClass(shape);
          const spacingClass = getSpacingClass(spacing);

          const clearAll = () => {
            setDisplay("0");
            setPrevValue(null);
            setOperation(null);
            setWaitingForOperand(false);
          };

          const inputDigit = (digit: string) => {
            if (waitingForOperand) {
              setDisplay(digit);
              setWaitingForOperand(false);
            } else {
              setDisplay(display === "0" ? digit : display + digit);
            }
          };

          const inputDot = () => {
            if (waitingForOperand) {
              setDisplay("0.");
              setWaitingForOperand(false);
            } else if (!display.includes(".")) {
              setDisplay(display + ".");
            }
          };

          const performOperation = (nextOperation: string) => {
            const inputValue = parseFloat(display);

            if (prevValue === null) {
              setPrevValue(inputValue);
            } else if (operation) {
              const currentValue = prevValue || 0;
              const newValue = calculate(currentValue, inputValue, operation);
              setPrevValue(newValue);
              setDisplay(String(newValue));
            }

            setWaitingForOperand(true);
            setOperation(nextOperation);
          };

          const calculate = (prev: number, next: number, op: string) => {
            switch (op) {
              case "+": return prev + next;
              case "-": return prev - next;
              case "*": return prev * next;
              case "/": return prev / next;
              default: return next;
            }
          };

          const handleEquals = () => {
            const inputValue = parseFloat(display);
            if (prevValue !== null && operation) {
              const newValue = calculate(prevValue, inputValue, operation);
              setDisplay(String(newValue));
              setPrevValue(null);
              setOperation(null);
              setWaitingForOperand(true);
            }
          };

          const toggleSign = () => {
            setDisplay(String(parseFloat(display) * -1));
          };

          const inputPercent = () => {
            setDisplay(String(parseFloat(display) / 100));
          };

          const deleteLast = () => {
            if (display.length > 1) {
              setDisplay(display.slice(0, -1));
            } else {
              setDisplay("0");
            }
          };

          const getContainerStyles = () => {
            switch (variant) {
              case "glass":
                return "bg-background/40 backdrop-blur-3xl border border-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden";
              case "brutal":
                return "bg-background border-4 border-foreground relative";
              case "neon":
                return cn("bg-background border relative overflow-hidden shadow-[inset_0_0_20px_0]", activeTheme.border, activeTheme.neonGlow);
            }
          };

          const getDisplayStyles = () => {
            switch (variant) {
              case "glass":
                return "text-5xl font-light tracking-tighter text-foreground";
              case "brutal":
                return "text-5xl font-mono font-black uppercase tracking-tighter text-foreground border-b-4 border-foreground mb-2 pb-4";
              case "neon":
                return cn("text-5xl font-mono font-bold tracking-widest", activeTheme.text);
            }
          };

          const Button = ({ 
            children, 
            onClick, 
            className, 
            type = "digit" 
          }: { 
            children: React.ReactNode; 
            onClick: () => void; 
            className?: string;
            type?: "digit" | "op" | "func" | "equal";
          }) => {
            const getVariantButtonStyles = () => {
              switch (variant) {
                case "glass": {
                  const base = cn("h-14 sm:h-16 flex items-center justify-center font-medium text-xl transition-all duration-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]", btnShapeClass);
                  if (type === "equal") return cn(base, activeTheme.bg, "hover:brightness-90 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]");
                  if (type === "op") return cn(base, activeTheme.bgSoft, activeTheme.text, "hover:brightness-90");
                  if (type === "func") return cn(base, "bg-muted/50 text-muted-foreground hover:bg-muted/80");
                  return cn(base, "bg-foreground/5 text-foreground hover:bg-foreground/10");
                }
                case "brutal": {
                  const base = "h-14 sm:h-16 flex items-center justify-center font-mono font-bold text-xl border-2 border-foreground shadow-[3px_3px_0px_0px] shadow-foreground hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all text-foreground rounded-none";
                  if (type === "equal") return cn(base, activeTheme.bg, "border-foreground shadow-foreground hover:shadow-none");
                  if (type === "op") return cn(base, "bg-foreground text-background shadow-foreground");
                  if (type === "func") return cn(base, "bg-muted text-foreground shadow-foreground");
                  return cn(base, "bg-card text-foreground shadow-foreground");
                }
                case "neon": {
                  const base = cn("h-14 sm:h-16 flex items-center justify-center font-mono font-medium text-xl border hover:brightness-110 transition-all duration-300", btnShapeClass);
                  if (type === "equal") return cn(base, activeTheme.bg, activeTheme.border, activeTheme.shadow, activeTheme.neonGlow, "hover:brightness-110");
                  if (type === "op") return cn(base, activeTheme.border, activeTheme.text, activeTheme.bgSoft);
                  if (type === "func") return cn(base, "border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10");
                  return cn(base, "border-transparent text-foreground hover:bg-muted");
                }
              }
            };

            return (
              <motion.button
                whileTap={{ scale: variant === "brutal" ? 1 : 0.95 }}
                onClick={onClick}
                className={cn(getVariantButtonStyles(), className)}
              >
                {children}
              </motion.button>
            );
          };

          return (
            <div 
              className={cn(
                "max-w-[360px] sm:max-w-[400px] w-full flex flex-col mx-auto",
                getContainerStyles(),
                shapeClass,
                spacingClass,
                className
              )}
              {...props}
            >
              {/* Decorative Neon Orbs */}
              {variant === "neon" && (
                <>
                  <div className={cn("absolute -top-20 -left-20 w-40 h-40 blur-[50px] rounded-full pointer-events-none", activeTheme.bgSoft)} />
                  <div className={cn("absolute -bottom-20 -right-20 w-40 h-40 blur-[50px] rounded-full pointer-events-none", activeTheme.bgSoft)} />
                </>
              )}

              {/* Decorative Glass Highlights */}
              {variant === "glass" && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              )}

              <div className="flex flex-col items-end justify-end h-28 px-1 sm:px-2 overflow-hidden relative z-10 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={display}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={cn("w-full text-right overflow-hidden break-all leading-tight", getDisplayStyles())}
                    style={variant === "neon" ? { textShadow: "0 0 10px currentColor" } : {}}
                  >
                    {display}
                  </motion.div>
                </AnimatePresence>
                {operation && (
                  <div className={cn(
                    "text-sm font-medium uppercase tracking-widest mt-2",
                    variant === "brutal" ? "font-mono font-bold text-muted-foreground" : "text-muted-foreground"
                  )}>
                    {prevValue} {operation}
                  </div>
                )}
              </div>

              <div className={cn("grid grid-cols-4 relative z-10", spacing === "8x" ? "gap-4 sm:gap-5" : spacing === "6x" ? "gap-3 sm:gap-4" : spacing === "4x" ? "gap-2 sm:gap-3" : "gap-2")}>
                <Button type="func" onClick={clearAll}><RotateCcw className="w-5 h-5" /></Button>
                <Button type="func" onClick={toggleSign}>+/-</Button>
                <Button type="func" onClick={inputPercent}><Percent className="w-5 h-5" /></Button>
                <Button type="op" onClick={() => performOperation("/")}><Divide className="w-5 h-5" /></Button>

                <Button onClick={() => inputDigit("7")}>7</Button>
                <Button onClick={() => inputDigit("8")}>8</Button>
                <Button onClick={() => inputDigit("9")}>9</Button>
                <Button type="op" onClick={() => performOperation("*")}><X className="w-5 h-5" /></Button>

                <Button onClick={() => inputDigit("4")}>4</Button>
                <Button onClick={() => inputDigit("5")}>5</Button>
                <Button onClick={() => inputDigit("6")}>6</Button>
                <Button type="op" onClick={() => performOperation("-")}><Minus className="w-5 h-5" /></Button>

                <Button onClick={() => inputDigit("1")}>1</Button>
                <Button onClick={() => inputDigit("2")}>2</Button>
                <Button onClick={() => inputDigit("3")}>3</Button>
                <Button type="op" onClick={() => performOperation("+")}><Plus className="w-5 h-5" /></Button>

                <Button onClick={() => inputDigit("0")}>0</Button>
                <Button onClick={inputDot}>.</Button>
                <Button type="func" onClick={deleteLast}><Delete className="w-5 h-5" /></Button>
                <Button type="equal" onClick={handleEquals}>
                  <Equal className="w-5 h-5" />
                </Button>
              </div>
            </div>
          );
        });
Calculator.displayName = "Calculator";
