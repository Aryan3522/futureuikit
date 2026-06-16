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

export interface CalculatorProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "brutal" | "neon";
}

export const Calculator: React.FC<CalculatorProps> = React.memo(({
          className,
          variant = "glass",
          ...props
        }) => {
          const [display, setDisplay] = useState("0");
          const [prevValue, setPrevValue] = useState<number | null>(null);
          const [operation, setOperation] = useState<string | null>(null);
          const [waitingForOperand, setWaitingForOperand] = useState(false);

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
                return "bg-background/40 backdrop-blur-3xl border border-border/50 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden";
              case "brutal":
                return "bg-background border-4 border-foreground rounded-none relative";
              case "neon":
                return "bg-background border border-primary/30 rounded-xl relative overflow-hidden shadow-[inset_0_0_20px_0] shadow-primary/10";
            }
          };

          const getDisplayStyles = () => {
            switch (variant) {
              case "glass":
                return "text-5xl font-light tracking-tighter text-foreground";
              case "brutal":
                return "text-5xl font-mono font-black uppercase tracking-tighter text-foreground border-b-4 border-foreground mb-2 pb-4";
              case "neon":
                return "text-5xl font-mono font-bold tracking-widest text-primary";
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
                  const base = "h-14 sm:h-16 rounded-2xl flex items-center justify-center font-medium text-xl transition-all duration-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]";
                  if (type === "equal") return cn(base, "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]");
                  if (type === "op") return cn(base, "bg-primary/10 text-primary hover:bg-primary/20");
                  if (type === "func") return cn(base, "bg-muted/50 text-muted-foreground hover:bg-muted/80");
                  return cn(base, "bg-foreground/5 text-foreground hover:bg-foreground/10");
                }
                case "brutal": {
                  const base = "h-14 sm:h-16 rounded-none flex items-center justify-center font-mono font-bold text-xl border-2 border-foreground shadow-[3px_3px_0px_0px] shadow-foreground hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all text-foreground";
                  if (type === "equal") return cn(base, "bg-primary text-primary-foreground border-primary shadow-primary");
                  if (type === "op") return cn(base, "bg-foreground text-background shadow-foreground");
                  if (type === "func") return cn(base, "bg-muted text-foreground shadow-foreground");
                  return cn(base, "bg-card text-foreground shadow-foreground");
                }
                case "neon": {
                  const base = "h-14 sm:h-16 rounded-lg flex items-center justify-center font-mono font-medium text-xl border border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300";
                  if (type === "equal") return cn(base, "bg-primary text-primary-foreground shadow-[0_0_15px_0] shadow-primary/50 hover:bg-primary hover:shadow-[0_0_25px_0] hover:shadow-primary/80 border-primary");
                  if (type === "op") return cn(base, "border-primary/50 text-primary hover:bg-primary/20");
                  if (type === "func") return cn(base, "border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10");
                  return base;
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
                "max-w-[360px] sm:max-w-[400px] w-full p-5 sm:p-8 flex flex-col gap-6 mx-auto",
                getContainerStyles(),
                className
              )}
              {...props}
            >
              {/* Decorative Neon Orbs */}
              {variant === "neon" && (
                <>
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
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

              <div className="grid grid-cols-4 gap-2 sm:gap-3 relative z-10">
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
