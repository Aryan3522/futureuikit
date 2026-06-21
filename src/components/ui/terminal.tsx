/**
 * @registry-slug terminal
 * @registry-name Terminal
 * @registry-description A premium, highly customizable terminal window component with authentic styling for various OS variants (macOS, Windows, Ubuntu, etc) and built-in animations.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-dependency class-variance-authority
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Terminal as TerminalIcon, Plus, X, Minus, Square } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type TerminalVariant =
  | "windows"
  | "powershell"
  | "cmd"
  | "bash"
  | "ubuntu"
  | "linux"
  | "macos"
  | "zsh";

export type TerminalColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type TerminalShape = "default" | "square" | "rounded" | "sharp";
export type TerminalSpacing = "default" | "2x" | "4x" | "6x" | "8x";

const terminalVariants = cva(
  "relative overflow-hidden flex flex-col font-mono text-sm transition-shadow duration-300 shadow-xl",
  {
    variants: {
      variant: {
        windows: "bg-[#0c0c0c] text-[#cccccc] border-[#3e3e42]",
        powershell: "bg-[#012456] text-white border-[#012456]",
        cmd: "bg-black text-[#cccccc] border-border",
        bash: "bg-[#1e1e1e] text-[#cccccc] border-white/10",
        ubuntu: "bg-[#300a24] text-white border-[#3e0c2e]",
        linux: "bg-[#1a1b26] text-[#a9b1d6] border-[#292e42]",
        macos: "bg-background text-foreground border-border",
        zsh: "bg-[#18181b] text-[#a1a1aa] border-border/50",
      },
    },
    defaultVariants: {
      variant: "macos",
    },
  }
);

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof terminalVariants> {
  title?: string;
  commands?: string[];
  output?: string[];
  animated?: boolean;
  showLineNumbers?: boolean;
  showPrompt?: boolean;
  showHeader?: boolean;
  copyable?: boolean;
  interactive?: boolean;
  color?: TerminalColor;
  shape?: TerminalShape;
  spacing?: TerminalSpacing;
  onCommand?: (command: string) => void | string | string[] | Promise<void | string | string[]>;
}

const colorThemeMap: Record<TerminalColor, string> = {
  default: "",
  blue: "ring-1 ring-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
  emerald: "ring-1 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
  rose: "ring-1 ring-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]",
  amber: "ring-1 ring-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
  violet: "ring-1 ring-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]",
  indigo: "ring-1 ring-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]",
  sky: "ring-1 ring-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.3)]",
  slate: "ring-1 ring-slate-500/50 shadow-[0_0_15px_rgba(100,116,139,0.3)]",
  orange: "ring-1 ring-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]",
};

const getShapeClass = (shape: TerminalShape) => {
  switch (shape) {
    case "square": return "rounded-none border-x-0 border-b-0";
    case "sharp": return "rounded-sm border";
    case "rounded": return "rounded-2xl border";
    case "default": return "rounded-xl border";
  }
};

const getSpacingClass = (spacing: TerminalSpacing) => {
  switch (spacing) {
    case "2x": return "p-2 md:p-3";
    case "4x": return "p-4 md:p-6";
    case "6x": return "p-6 md:p-8";
    case "8x": return "p-8 md:p-10";
    default: return "p-4 md:p-6";
  }
};

const WindowsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.3 0H0V6.3H6.3V0Z" fill="#00ADEF" />
    <path d="M14 0H7.7V6.3H14V0Z" fill="#00ADEF" />
    <path d="M6.3 7.7H0V14H6.3V7.7Z" fill="#00ADEF" />
    <path d="M14 7.7H7.7V14H14V7.7Z" fill="#00ADEF" />
  </svg>
);

const UbuntuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="7" fill="#E95420" />
    <circle cx="7" cy="7" r="3" stroke="white" strokeWidth="1.5" />
  </svg>
);

const TerminalAppIcon = ({ variant }: { variant: TerminalVariant }) => {
  switch (variant) {
    case "macos":
      return (
        <div className="w-full h-full bg-gradient-to-b from-foreground/80 to-foreground rounded-[22%] border border-foreground/40 flex flex-col overflow-hidden shadow-inner p-1">
          <div className="h-2.5 w-full flex items-center gap-[3px] px-1 mt-0.5">
             <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
             <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
             <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 flex items-center justify-center text-white font-mono text-xl font-bold tracking-tighter pb-1">
            &gt;_
          </div>
        </div>
      );
    case "windows":
    case "powershell":
    case "cmd":
      return (
        <div className="w-full h-full bg-[#0c0c0c] rounded-[22%] border border-[#3e3e42] flex items-center justify-center">
          {variant === "windows" ? <div className="scale-150"><WindowsIcon /></div> : <TerminalIcon className="w-8 h-8 text-white" />}
        </div>
      );
    case "ubuntu":
      return (
        <div className="w-full h-full bg-[#E95420] rounded-[22%] flex items-center justify-center shadow-inner">
          <div className="scale-150"><UbuntuIcon /></div>
        </div>
      );
    default:
      return (
        <div className="w-full h-full bg-[#1a1b26] rounded-[22%] border border-border flex items-center justify-center shadow-inner">
          <TerminalIcon className="w-8 h-8 text-[#a9b1d6]" />
        </div>
      );
  }
};

type WindowState = "default" | "minimized" | "maximized" | "closed";
type Tab = { id: string; title: string };

export const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  (
    {
      title,
      variant = "macos",
      commands = [],
      output = [],
      animated = false,
      showLineNumbers = false,
      showPrompt = true,
      showHeader = true,
      copyable = true,
      interactive = false,
      color = "default",
      shape = "default",
      spacing = "default",
      onCommand,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const terminalId = React.useId();
    const [copied, setCopied] = useState(false);
    const [displayedCommands, setDisplayedCommands] = useState<string[]>(
      animated ? [] : commands
    );
    const [isTyping, setIsTyping] = useState(animated);
    const [typingLineIndex, setTypingLineIndex] = useState(0);
    const [typingCharIndex, setTypingCharIndex] = useState(0);
    
    // Window State
    const [windowState, setWindowState] = useState<WindowState>("default");
    
    // Tabs State (for Windows variants)
    const defaultTitle = React.useMemo(() => {
      if (title) return title;
      switch (variant) {
        case "windows": return "Windows Terminal";
        case "powershell": return "Administrator: Windows PowerShell";
        case "cmd": return "Command Prompt";
        case "bash": return "bash";
        case "ubuntu": return "ubuntu@server:~";
        case "linux": return "terminal";
        case "macos": return "bash — 80x24";
        case "zsh": return "zsh";
        default: return "Terminal";
      }
    }, [variant, title]);

    const [tabs, setTabs] = useState<Tab[]>([{ id: "1", title: defaultTitle }]);
    const [activeTabId, setActiveTabId] = useState<string>("1");

    // Interactive state
    const [history, setHistory] = useState<{ command: string; output: string[] }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);

    const activeTheme = colorThemeMap[color];
    const shapeClass = getShapeClass(shape);
    const spacingClass = getSpacingClass(spacing);

    useEffect(() => {
      if (!animated || commands.length === 0) return;

      if (typingLineIndex < commands.length) {
        const currentCommand = commands[typingLineIndex];
        
        if (typingCharIndex < currentCommand.length) {
          const timeout = setTimeout(() => {
            setDisplayedCommands((prev) => {
              const newCommands = [...prev];
              if (!newCommands[typingLineIndex]) {
                newCommands[typingLineIndex] = "";
              }
              newCommands[typingLineIndex] = currentCommand.slice(0, typingCharIndex + 1);
              return newCommands;
            });
            setTypingCharIndex((prev) => prev + 1);
          }, 30 + Math.random() * 40); // Random typing speed

          return () => clearTimeout(timeout);
        } else {
          // Pause at end of line before next command
          const timeout = setTimeout(() => {
            setTypingLineIndex((prev) => prev + 1);
            setTypingCharIndex(0);
          }, 400);
          return () => clearTimeout(timeout);
        }
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsTyping(false);
      }
    }, [animated, commands, typingLineIndex, typingCharIndex]);

    const handleContainerClick = () => {
      if (windowState === "minimized") {
        setWindowState("default");
        return;
      }
      if (interactive && inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const cmd = inputValue.trim();
        setInputValue("");
        
        if (!cmd) {
          setHistory((prev) => [...prev, { command: "", output: [] }]);
          return;
        }

        setHistory((prev) => [...prev, { command: cmd, output: [] }]);
        
        if (onCommand) {
          setIsAwaitingResponse(true);
          try {
            const result = await onCommand(cmd);
            if (result) {
              const outputLines = Array.isArray(result) ? result : [result];
              setHistory((prev) => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].output = outputLines;
                return newHistory;
              });
            }
          } finally {
            setIsAwaitingResponse(false);
          }
        }
      }
    };

    const handleCopy = () => {
      const textToCopy = commands.join("\n");
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const renderHeader = () => {
      if (!showHeader) return null;

      if (variant === "macos") {
        return (
          <div className="flex items-center px-4 py-3 bg-muted border-b border-border select-none">
            <div className="flex gap-2 relative z-10">
              <button onClick={(e) => { e.stopPropagation(); setWindowState("closed"); }} className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center group/btn cursor-pointer overflow-hidden"><X className="w-2 h-2 text-black/50 opacity-0 group-hover/btn:opacity-100 transition-opacity" /></button>
              <button onClick={(e) => { e.stopPropagation(); setWindowState("minimized"); }} className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center group/btn cursor-pointer overflow-hidden"><Minus className="w-2 h-2 text-black/50 opacity-0 group-hover/btn:opacity-100 transition-opacity" /></button>
              <button onClick={(e) => { e.stopPropagation(); setWindowState(windowState === "maximized" ? "default" : "maximized"); }} className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center group/btn cursor-pointer overflow-hidden"><Square className="w-2 h-2 text-black/50 opacity-0 group-hover/btn:opacity-100 transition-opacity" /></button>
            </div>
            <div className="absolute inset-x-0 text-center text-xs font-semibold text-muted-foreground pointer-events-none">
              {defaultTitle}
            </div>
          </div>
        );
      }

      if (variant === "ubuntu") {
        return (
          <div className="flex items-center justify-between px-3 py-2 bg-[#3b1233] border-b border-[#5e2750] select-none">
            <span className="text-xs font-bold text-white/90 pointer-events-none">{defaultTitle}</span>
            <div className="flex gap-2">
              <button onClick={(e) => { e.stopPropagation(); setWindowState("minimized"); }} className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer transition-colors"><Minus className="w-2.5 h-2.5" /></button>
              <button onClick={(e) => { e.stopPropagation(); setWindowState(windowState === "maximized" ? "default" : "maximized"); }} className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer transition-colors"><Square className="w-2 h-2" /></button>
              <button onClick={(e) => { e.stopPropagation(); setWindowState("closed"); }} className="w-4 h-4 rounded-full bg-[#E95420] hover:bg-[#ff6e3a] opacity-90 flex items-center justify-center text-white cursor-pointer transition-colors"><X className="w-2.5 h-2.5" /></button>
            </div>
          </div>
        );
      }

      if (variant === "cmd" || variant === "powershell" || variant === "windows") {
        return (
          <div className="flex flex-col bg-[#0c0c0c] border-b border-[#3e3e42] select-none">
            {/* Title Bar with Tabs */}
            <div className="flex items-end justify-between pr-2 pt-2">
              <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar no-scrollbar pl-2 w-full pr-12">
                {tabs.map((tab) => (
                  <div 
                    key={tab.id}
                    onClick={(e) => { e.stopPropagation(); setActiveTabId(tab.id); }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] rounded-t-md cursor-pointer group transition-colors flex-shrink-0",
                      activeTabId === tab.id ? "bg-[#1c1c1c]" : "bg-transparent hover:bg-[#1c1c1c]/50"
                    )}
                  >
                    {variant === "windows" ? <WindowsIcon /> : <TerminalIcon className="w-3.5 h-3.5 text-white" />}
                    <span className="text-xs text-[#cccccc] truncate flex-1">{tab.title}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (tabs.length > 1) {
                          const newTabs = tabs.filter(t => t.id !== tab.id);
                          setTabs(newTabs);
                          if (activeTabId === tab.id) setActiveTabId(newTabs[newTabs.length - 1].id);
                        } else {
                          setWindowState("closed");
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded-sm text-[#cccccc] transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const newId = Date.now().toString();
                    setTabs([...tabs, { id: newId, title: defaultTitle }]);
                    setActiveTabId(newId);
                  }}
                  className="p-1.5 mb-1 ml-1 text-[#cccccc] hover:bg-white/10 rounded-md transition-colors flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <div className="flex gap-1 pb-1 flex-shrink-0 absolute right-2 top-2">
                <button onClick={(e) => { e.stopPropagation(); setWindowState("minimized"); }} className="p-1.5 hover:bg-white/10 text-[#cccccc] transition-colors rounded-sm">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setWindowState(windowState === "maximized" ? "default" : "maximized"); }} className="p-1.5 hover:bg-white/10 text-[#cccccc] transition-colors rounded-sm">
                  <Square className="w-3 h-3" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setWindowState("closed"); }} className="p-1.5 hover:bg-red-500 hover:text-white text-[#cccccc] transition-colors rounded-sm">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Default header for bash, linux, zsh
      return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-inherit bg-black/10 select-none">
          <span className="text-xs opacity-70 pointer-events-none">{defaultTitle}</span>
          <div className="flex gap-2">
            <button onClick={(e) => { e.stopPropagation(); setWindowState("minimized"); }} className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer transition-colors"><Minus className="w-2 h-2" /></button>
            <button onClick={(e) => { e.stopPropagation(); setWindowState(windowState === "maximized" ? "default" : "maximized"); }} className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer transition-colors"><Square className="w-1.5 h-1.5" /></button>
            <button onClick={(e) => { e.stopPropagation(); setWindowState("closed"); }} className="w-3 h-3 rounded-full bg-[#E95420] hover:bg-[#ff6e3a] opacity-90 flex items-center justify-center text-white cursor-pointer transition-colors"><X className="w-2 h-2" /></button>
          </div>
        </div>
      );
    };

    const getPrompt = () => {
      switch (variant) {
        case "powershell": return <span className="text-[#eedf00] mr-2">PS C:\&gt;</span>;
        case "cmd": return <span className="text-white mr-2">C:\&gt;</span>;
        case "bash": return <span className="text-[#16c60c] mr-2">user@host:~$</span>;
        case "ubuntu": return <span className="text-[#8ae234] mr-2">user@server:~$</span>;
        case "linux": return <span className="text-[#7aa2f7] mr-2">[user@localhost ~]$</span>;
        case "zsh": return <span className="text-[#f7768e] font-bold mr-2">➜</span>;
        case "macos": return <span className="text-muted-foreground mr-2">~ %</span>;
        case "windows": return <span className="text-[#16c60c] mr-2">C:\Users\User&gt;</span>;
        default: return <span className="mr-2">$</span>;
      }
    };

    return (
      <AnimatePresence>
        {windowState === "minimized" && (
          <motion.div
            key="minimized"
            layoutId={`terminal-${terminalId}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            className="w-16 h-16 absolute bottom-4 left-0 right-0 mx-auto z-50 cursor-pointer shadow-2xl hover:scale-105 transition-transform"
            onClick={handleContainerClick}
          >
            <TerminalAppIcon variant={variant as TerminalVariant} />
          </motion.div>
        )}
        
        {windowState !== "minimized" && windowState !== "closed" && (
          <motion.div
            key="window"
            layoutId={`terminal-${terminalId}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            ref={ref as any}
            className={cn(
              terminalVariants({ variant }),
              shapeClass,
              activeTheme,
              windowState === "maximized" ? "fixed md:absolute inset-0 z-50 !w-full !h-full !max-w-none !max-h-none !rounded-none" : "",
              className
            )}
            {...(props as any)}
          >
            <>
              {renderHeader()}
                
                {copyable && commands.length > 0 && (
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "absolute z-20 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100",
                      showHeader ? "top-14 right-4" : "top-4 right-4",
                      variant === "macos" ? "bg-muted text-muted-foreground" : "bg-white/10 text-white hover:bg-white/20",
                      copied ? "opacity-100" : "hover:opacity-100 focus:opacity-100"
                    )}
                    style={{ opacity: copied ? 1 : undefined }}
                    aria-label="Copy commands"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <Check className={cn("w-4 h-4", variant === "macos" ? "text-emerald-600 dark:text-emerald-400" : "text-emerald-400")} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="opacity-50"
                        >
                          <Copy className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                )}

                <div ref={containerRef} className={cn("relative flex-1 overflow-auto group custom-scrollbar", spacingClass)} onClick={handleContainerClick}>
                  
                  {/* Force remount of internal state if tab changes (optional: right now history is global) */}
                  <div key={activeTabId} className="min-h-full flex flex-col">
                    {children ? (
                      <div className="h-full">{children}</div>
                    ) : interactive ? (
                      <div className="flex flex-col gap-1.5 cursor-text min-h-full">
                    {history.map((item, idx) => (
                      <div key={`hist-${idx}`} className="flex flex-col gap-1.5">
                        <div className="flex items-start">
                          {showLineNumbers && (
                            <span className="text-inherit opacity-30 select-none w-6 text-right mr-4 shrink-0">
                              {idx + 1}
                            </span>
                          )}
                          {showPrompt && <span className="shrink-0 select-none">{getPrompt()}</span>}
                          <span className="whitespace-pre-wrap break-all">{item.command}</span>
                        </div>
                        {item.output && item.output.length > 0 && (
                          <div className="flex flex-col gap-1 opacity-80 mt-1">
                            {item.output.map((line, outIdx) => (
                              <div key={`hist-out-${idx}-${outIdx}`} className="flex items-start">
                                {showLineNumbers && (
                                  <span className="text-inherit opacity-30 select-none w-6 text-right mr-4 shrink-0">
                                    ~
                                  </span>
                                )}
                                <span className="whitespace-pre-wrap break-all">{line}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex items-start mt-1">
                      {showLineNumbers && (
                        <span className="text-inherit opacity-30 select-none w-6 text-right mr-4 shrink-0">
                          {history.length + 1}
                        </span>
                      )}
                      {showPrompt && <span className="shrink-0 select-none">{getPrompt()}</span>}
                      {isAwaitingResponse ? (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className={cn("inline-block w-2 h-4 ml-0.5 align-middle", variant === "macos" ? "bg-foreground" : "bg-white")}
                        />
                      ) : (
                        <div className="flex-1 relative flex items-center">
                          <input 
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent outline-none border-none text-inherit font-mono p-0 m-0 focus:ring-0 focus:outline-none"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {displayedCommands.map((command, idx) => (
                      <div key={`cmd-${idx}`} className="flex items-start">
                        {showLineNumbers && (
                          <span className="text-inherit opacity-30 select-none w-6 text-right mr-4 shrink-0">
                            {idx + 1}
                          </span>
                        )}
                        {showPrompt && <span className="shrink-0 select-none">{getPrompt()}</span>}
                        <span className="whitespace-pre-wrap break-all">
                          {command}
                          {isTyping && idx === typingLineIndex && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              className={cn("inline-block w-2 h-4 ml-0.5 align-middle", variant === "macos" ? "bg-foreground" : "bg-white")}
                            />
                          )}
                        </span>
                      </div>
                    ))}
                    
                    {!isTyping && output && output.length > 0 && (
                      <motion.div
                        initial={animated ? { opacity: 0, y: 5 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="mt-2 flex flex-col gap-1 opacity-80"
                      >
                        {output.map((line, idx) => (
                          <div key={`out-${idx}`} className="flex items-start">
                            {showLineNumbers && (
                              <span className="text-inherit opacity-30 select-none w-6 text-right mr-4 shrink-0">
                                {commands.length + idx + 1}
                              </span>
                            )}
                            <span className="whitespace-pre-wrap break-all">{line}</span>
                          </div>
                        ))}
                        
                        {/* Final blinking cursor after output */}
                        <div className="flex items-start mt-2">
                          {showLineNumbers && (
                            <span className="text-inherit opacity-30 select-none w-6 text-right mr-4 shrink-0">
                              {commands.length + output.length + 1}
                            </span>
                          )}
                          {showPrompt && <span className="shrink-0 select-none">{getPrompt()}</span>}
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className={cn("inline-block w-2 h-4 ml-0.5 align-middle", variant === "macos" ? "bg-foreground" : "bg-white")}
                          />
                        </div>
                      </motion.div>
                    )}
                    
                    {!isTyping && (!output || output.length === 0) && (
                      <div className="flex items-start mt-1">
                        {showLineNumbers && (
                          <span className="text-inherit opacity-30 select-none w-6 text-right mr-4 shrink-0">
                            {commands.length + 1}
                          </span>
                        )}
                        {showPrompt && <span className="shrink-0 select-none">{getPrompt()}</span>}
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className={cn("inline-block w-2 h-4 ml-0.5 align-middle", variant === "macos" ? "bg-foreground" : "bg-white")}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        </motion.div>
      )}
    </AnimatePresence>
    );
  }
);
Terminal.displayName = "Terminal";
