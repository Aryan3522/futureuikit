"use client";

/**
 * @registry-slug ai-chat
 * @registry-name AI Chat Interface
 * @registry-description A Future UI AI Chat Interface component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-dependency react-markdown
 * @registry-dependency remark-gfm
 * @registry-dependency react-syntax-highlighter
 * @registry-dependency class-variance-authority
 * @registry-dependency clsx
 * @registry-dependency tailwind-merge
 */

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Bot, User, Copy, ThumbsUp, ThumbsDown,
  RefreshCcw, Paperclip, Mic, StopCircle,
  Pencil, Check, ImagePlus, FileText, X, ChevronDown, ArrowDown,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & CONTEXT
// ==========================================

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  isStreaming?: boolean;
  createdAt?: Date;
  attachments?: string[];
}

export type AIChatColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type AIChatShape = "default" | "square" | "rounded" | "sharp";
export type AIChatSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface AIChatContextType {
  messages: Message[];
  isLoading: boolean;
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStop?: () => void;
  onReload?: (id: string) => void;
  onEdit?: (id: string, newContent: string) => void;
  layout: "chatgpt" | "claude" | "perplexity" | "compact" | "enterprise" | "minimal";
  inputVariant: "standard" | "floating" | "command" | "multiline" | "workspace";
  color: AIChatColor;
  shape: AIChatShape;
  spacing: AIChatSpacing;
}

const AIChatContext = createContext<AIChatContextType | null>(null);

export const useAIChat = () => {
  const ctx = useContext(AIChatContext);
  if (!ctx) throw new Error("useAIChat must be used within AIChat");
  return ctx;
};

const colorThemeMap: Record<AIChatColor, { bg: string; text: string; ring: string; border: string; bgSoft: string }> = {
  default: { bg: "bg-primary text-primary-foreground", text: "text-primary", ring: "focus-within:ring-primary/20", border: "border-primary/20", bgSoft: "bg-primary/10" },
  blue: { bg: "bg-blue-600 text-white", text: "text-blue-600 dark:text-blue-500", ring: "focus-within:ring-blue-600/20 dark:focus-within:ring-blue-500/20", border: "border-blue-600/20 dark:border-blue-500/20", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-500", ring: "focus-within:ring-emerald-600/20 dark:focus-within:ring-emerald-500/20", border: "border-emerald-600/20 dark:border-emerald-500/20", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-500", ring: "focus-within:ring-rose-600/20 dark:focus-within:ring-rose-500/20", border: "border-rose-600/20 dark:border-rose-500/20", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10" },
  amber: { bg: "bg-amber-600 text-white", text: "text-amber-600 dark:text-amber-500", ring: "focus-within:ring-amber-600/20 dark:focus-within:ring-amber-500/20", border: "border-amber-600/20 dark:border-amber-500/20", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10" },
  violet: { bg: "bg-violet-600 text-white", text: "text-violet-600 dark:text-violet-500", ring: "focus-within:ring-violet-600/20 dark:focus-within:ring-violet-500/20", border: "border-violet-600/20 dark:border-violet-500/20", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10" },
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-500", ring: "focus-within:ring-indigo-600/20 dark:focus-within:ring-indigo-500/20", border: "border-indigo-600/20 dark:border-indigo-500/20", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10" },
  sky: { bg: "bg-sky-600 text-white", text: "text-sky-600 dark:text-sky-500", ring: "focus-within:ring-sky-600/20 dark:focus-within:ring-sky-500/20", border: "border-sky-600/20 dark:border-sky-500/20", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10" },
  slate: { bg: "bg-slate-600 text-white", text: "text-slate-600 dark:text-slate-400", ring: "focus-within:ring-slate-600/20 dark:focus-within:ring-slate-500/20", border: "border-slate-600/20 dark:border-slate-500/20", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10" },
  orange: { bg: "bg-orange-600 text-white", text: "text-orange-600 dark:text-orange-500", ring: "focus-within:ring-orange-600/20 dark:focus-within:ring-orange-500/20", border: "border-orange-600/20 dark:border-orange-500/20", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10" },
};

const getShapeClass = (shape: AIChatShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-2xl";
  }
};

const getButtonShapeClass = (shape: AIChatShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-md";
    case "default": return "rounded-full";
  }
};

// ==========================================
// ROOT COMPONENT
// ==========================================

export interface AIChatProps {
  messages: Message[];
  isLoading?: boolean;
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStop?: () => void;
  onReload?: (id: string) => void;
  onEdit?: (id: string, newContent: string) => void;
  layout?: "chatgpt" | "claude" | "perplexity" | "compact" | "enterprise" | "minimal";
  inputVariant?: "standard" | "floating" | "command" | "multiline" | "workspace";
  color?: AIChatColor;
  shape?: AIChatShape;
  spacing?: AIChatSpacing;
  className?: string;
  children: React.ReactNode;
}

export const AIChat = React.memo(function AIChat({
  messages,
  isLoading = false,
  input,
  setInput,
  onSubmit,
  onStop,
  onReload,
  onEdit,
  layout = "chatgpt",
  inputVariant = "standard",
  color = "default",
  shape = "default",
  spacing = "default",
  className,
  children,
}: AIChatProps) {
  const hasMessages = messages.length > 0;

  return (
    <AIChatContext.Provider
      value={{
        messages, isLoading, input, setInput, onSubmit,
        onStop, onReload, onEdit, layout, inputVariant,
        color, shape, spacing
      }}
    >
      <motion.div
        layout
        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        className={cn(
          "flex flex-col w-full h-full bg-background overflow-hidden relative",
          !hasMessages && "justify-center",
          className
        )}
      >
        {children}
      </motion.div>
    </AIChatContext.Provider>
  );
});
AIChat.displayName = "AIChat";

// ==========================================
// CHAT MESSAGES CONTAINER
// ==========================================

export const ChatMessages = React.memo(function ChatMessages({ className }: { className?: string }) {
  const { messages, layout, spacing } = useAIChat();
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Track if user is at the bottom of the chat
  const isScrolledToBottomRef = useRef(true);
  const prevMessageCountRef = useRef(messages.length);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    // Check if user is within 15px of the bottom (smaller threshold prevents sticky feeling)
    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 15;
    isScrolledToBottomRef.current = isAtBottom;
    setShowScrollButton(!isAtBottom);
  };

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    isScrolledToBottomRef.current = true;
    setShowScrollButton(false);
  };

  // Scroll ONLY within this container — never touches the page scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isNewMessage = messages.length > prevMessageCountRef.current;
    prevMessageCountRef.current = messages.length;

    if (isScrolledToBottomRef.current || isNewMessage) {
      // Use scrollTop to scroll within the container instead of scrollIntoView
      container.scrollTop = container.scrollHeight;
      isScrolledToBottomRef.current = true;
      setShowScrollButton(false);
    }
  }, [messages]);

  const hasMessages = messages.length > 0;

  const getContainerSpacing = () => {
    if (layout === "compact") return "p-2";
    switch (spacing) {
      case "2x": return "p-2 md:p-4";
      case "4x": return "p-4 md:p-6";
      case "6x": return "p-6 md:p-8";
      case "8x": return "p-8 md:p-10";
      default: return "p-4 md:p-6";
    }
  };

  const getGapSpacing = () => {
    switch (spacing) {
      case "2x": return "gap-2 pb-2";
      case "4x": return "gap-4 pb-4";
      case "6x": return "gap-6 pb-6";
      case "8x": return "gap-8 pb-8";
      default: return "gap-4 pb-4";
    }
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", bounce: 0, duration: 0.6 }}
      className={cn(
        "relative overflow-hidden",
        hasMessages ? "flex-1 opacity-100" : "flex-none h-0 opacity-0 pointer-events-none",
        className
      )}
    >
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={cn(
          "w-full h-full overflow-y-auto overscroll-contain",
          getContainerSpacing()
        )}
      >
        <div
          className={cn(
            "flex flex-col w-full",
            getGapSpacing(),
            layout === "claude" && "mx-auto max-w-3xl",
            layout === "perplexity" && "mx-auto max-w-3xl",
            layout === "chatgpt" && "mx-auto max-w-3xl",
            layout === "enterprise" && "mx-auto max-w-4xl",
            layout === "minimal" && "mx-auto max-w-3xl",
          )}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <ChatMessage key={msg.id || index} message={msg} />
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={scrollToBottom}
            className="absolute bottom-4 right-4 md:bottom-6 md:right-8 p-2 bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg text-foreground hover:bg-muted hover:shadow-xl transition-all z-10"
            title="Scroll to bottom"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
ChatMessages.displayName = "ChatMessages";

// ==========================================
// INDIVIDUAL MESSAGE
// ==========================================

const messageVariants = cva("flex w-full group", {
  variants: {
    layout: {
      chatgpt: "gap-4",
      claude: "gap-4 py-4 border-b border-border/20 last:border-0",
      perplexity: "flex-col gap-2",
      compact: "gap-2",
      enterprise: "gap-4 border border-border/40 p-4 rounded-2xl bg-card",
      minimal: "flex-col gap-2",
    },
    role: {
      user: "justify-end",
      assistant: "justify-start",
      system: "justify-center",
    },
  },
  compoundVariants: [],
});

const bubbleVariants = cva("relative flex flex-col min-w-0", {
  variants: {
    layout: {
      chatgpt: "px-4 py-2.5 text-sm",
      claude: "text-sm leading-relaxed",
      perplexity: "text-sm leading-relaxed",
      compact: "px-4 py-2 text-xs",
      enterprise: "px-4 py-3 text-sm",
      minimal: "text-sm font-light",
    },
    role: {
      user: "max-w-[85%] w-fit h-fit",
      assistant: "max-w-[85%] w-fit h-fit",
      system: "text-muted-foreground italic text-center text-xs w-full h-fit",
    },
  },
  compoundVariants: [
    { layout: "chatgpt", role: "user", className: "bg-muted text-foreground shadow-sm border border-border/50" },
    { layout: "chatgpt", role: "assistant", className: "bg-transparent text-foreground" },
    { layout: "compact", role: "assistant", className: "bg-muted border border-border/50 text-foreground mr-auto shadow-sm" },
    { layout: "claude", role: "user", className: "bg-muted/50 border border-border/50 text-foreground px-4 py-2.5 shadow-sm" },
    { layout: "perplexity", role: "user", className: "bg-muted/50 border border-border/50 text-foreground px-4 py-2.5 shadow-sm" },
    { layout: "minimal", role: "user", className: "bg-muted/50 border border-border/50 text-foreground px-4 py-2.5 shadow-sm" },
    { layout: "enterprise", role: "assistant", className: "bg-muted/50 border border-border/50 text-foreground shadow-sm" },
  ],
});

export const ChatMessage = React.memo(function ChatMessage({ message }: { message: Message }) {
  const { layout, onReload, onEdit, color, shape } = useAIChat();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const activeTheme = colorThemeMap[color];
  const shapeClass = getShapeClass(shape);

  const isUser = message.role === "user";
  const isCompact = layout === "compact";

  const showAvatar =
    (layout === "claude" || layout === "enterprise") ||
    (layout === "chatgpt" && !isUser) ||
    (layout === "perplexity" && !isUser);

  const handleCopy = () => navigator.clipboard.writeText(message.content);

  const handleSaveEdit = () => {
    if (onEdit) onEdit(message.id, editContent);
    setIsEditing(false);
  };

  // Determine dynamic classes that rely on color mapping
  const getDynamicUserClasses = () => {
    if (!isUser) return "";
    if (layout === "compact" || layout === "enterprise") return activeTheme.bg + " ml-auto shadow-sm";
    return "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(messageVariants({ layout, role: message.role }))}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar */}
      {showAvatar && !isCompact && (
        <div className="shrink-0 pt-0.5">
          <div className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full border",
            isUser
              ? "bg-background border-border"
              : cn(activeTheme.bgSoft, activeTheme.text, activeTheme.border),
            layout === "enterprise" && "rounded-sm"
          )}>
            {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
          </div>
        </div>
      )}

      {/* Bubble */}
      <div className={cn(
        bubbleVariants({ layout, role: message.role }), 
        getDynamicUserClasses(),
        // Apply shape to bubble backgrounds
        (layout === "chatgpt" || layout === "compact" || layout === "enterprise" || 
         (isUser && (layout === "claude" || layout === "perplexity" || layout === "minimal"))) && shapeClass
      )}>
        {/* Sender name tag */}
        {(layout === "perplexity" || layout === "claude" || layout === "minimal") && (
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-xs opacity-70">
              {isUser ? "You" : "Assistant"}
            </span>
            {message.isStreaming && (
              <span className={cn("h-2 w-2 rounded-full animate-pulse", activeTheme.bg)} />
            )}
          </div>
        )}

        {isEditing ? (
          <div className="flex flex-col gap-2 w-full">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={cn("w-full min-h-[80px] p-2.5 rounded-lg border bg-background text-sm resize-none focus:outline-none focus:ring-2", activeTheme.ring)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 text-xs rounded-md border hover:bg-muted transition-colors text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className={cn("px-3 py-1 text-xs rounded-md flex items-center gap-1 transition-colors hover:opacity-90", activeTheme.bg)}
              >
                <Check className="w-3 h-3" /> Save
              </button>
            </div>
          </div>
        ) : (
          <div className={cn(
            "prose prose-sm max-w-none prose-p:leading-relaxed prose-p:my-1 prose-pre:p-0 prose-pre:bg-transparent prose-headings:mb-2 prose-headings:mt-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
            // If user bubble has solid background, prose should inherit text colors
            (getDynamicUserClasses().includes("text-white") || getDynamicUserClasses().includes("text-primary-foreground")) ? "text-inherit prose-headings:text-inherit prose-a:text-inherit prose-strong:text-inherit" : "prose-neutral dark:prose-invert"
          )}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <div className="rounded-lg overflow-hidden my-3 border border-border/50 bg-[#1E1E1E] not-prose w-full max-w-full text-foreground">
                      <div className="flex items-center justify-between px-4 py-1.5 bg-black/40 border-b border-white/10 text-xs text-white/60">
                        <span className="font-mono">{match[1]}</span>
                        <button
                          onClick={() => navigator.clipboard.writeText(String(children))}
                          className="hover:text-white transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <SyntaxHighlighter
                        {...props}
                        style={vscDarkPlus as any}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: "0.875rem", background: "transparent", fontSize: "0.8125rem" }}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code {...props} className={cn("px-1.5 py-0.5 rounded text-xs font-mono", getDynamicUserClasses() ? "bg-black/20" : "bg-muted")}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>

            {/* Streaming cursor */}
            {message.isStreaming && (
              <span className="inline-block w-1.5 h-4 bg-foreground/70 animate-pulse ml-0.5 align-middle rounded-sm" />
            )}
          </div>
        )}

        {/* Message Actions */}
        {!isEditing && (
          <div className={cn(
            "flex items-center gap-1 mt-2 transition-opacity duration-150",
            isHovered ? "opacity-100" : "opacity-0",
            layout === "chatgpt" && isUser && "justify-end",
            getDynamicUserClasses() && "text-inherit"
          )}>
            {!isUser && (
              <>
                <ActionButton icon={<Copy className="w-3 h-3" />} onClick={handleCopy} title="Copy" />
                {onReload && (
                  <ActionButton icon={<RefreshCcw className="w-3 h-3" />} onClick={() => onReload(message.id)} title="Regenerate" />
                )}
                <ActionButton icon={<ThumbsUp className="w-3 h-3" />} title="Helpful" />
                <ActionButton icon={<ThumbsDown className="w-3 h-3" />} title="Not helpful" />
              </>
            )}
            {isUser && onEdit && (
              <ActionButton icon={<Pencil className="w-3 h-3" />} onClick={() => setIsEditing(true)} title="Edit" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});
ChatMessage.displayName = "ChatMessage";

function ActionButton({ icon, onClick, title }: { icon: React.ReactNode; onClick?: () => void; title: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-1.5 opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
    >
      {icon}
    </button>
  );
}

// ==========================================
// CHAT INPUT
// ==========================================

const inputContainerVariants = cva("relative w-full transition-all duration-300", {
  variants: {
    variant: {
      standard: "border-t bg-background px-4 py-4",
      floating: "bg-background border shadow-xl px-4 py-4",
      command: "border-t bg-background px-4 py-4",
      multiline: "border-t bg-muted/20 px-4 py-4",
      workspace: "border border-border/60 bg-card m-4 p-4",
    },
  },
});

export interface ChatInputProps {
  onFileUpload?: (files: File[]) => void;
  onImageUpload?: (files: File[]) => void;
}

export const ChatInput = React.memo(function ChatInput({ onFileUpload, onImageUpload }: ChatInputProps = {}) {
  const { input, setInput, onSubmit, isLoading, onStop, inputVariant, messages, color, shape } = useAIChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [attachDropdownOpen, setAttachDropdownOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const activeTheme = colorThemeMap[color];
  const shapeClass = getShapeClass(shape);
  const btnShapeClass = getButtonShapeClass(shape);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAttachDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) onSubmit(e as any);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setAttachedFiles((prev) => [...prev, ...files]);
    onFileUpload?.(files);
    setAttachDropdownOpen(false);
    e.target.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setAttachedFiles((prev) => [...prev, ...files]);
    onImageUpload?.(files);
    setAttachDropdownOpen(false);
    e.target.value = "";
  };

  const removeFile = (idx: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const toggleMic = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    if (isListening) {
      setIsListening(false);
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(input + (input ? " " : "") + transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
  };

  const hasMessages = messages.length > 0;
  const isRounded = inputVariant === "command" || inputVariant === "floating";

  return (
    <motion.div
      layout
      transition={{ type: "spring", bounce: 0, duration: 0.6 }}
      className={cn(
        inputContainerVariants({ variant: inputVariant }),
        (inputVariant === "floating" || inputVariant === "workspace") && shapeClass,
        !hasMessages && "max-w-2xl mx-auto border-transparent shadow-none bg-transparent",
        hasMessages && inputVariant === "floating" && "absolute bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl z-10"
      )}
    >
      {/* Attached files preview */}
      <AnimatePresence>
        {attachedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 mb-3"
          >
            {attachedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted border border-border/50 text-xs text-foreground max-w-[180px]"
              >
                {file.type.startsWith("image/") ? (
                  <ImagePlus className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                ) : (
                  <FileText className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                )}
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={(e) => { e.preventDefault(); if (input.trim() && !isLoading) onSubmit(e); }}
        className={cn(
          "flex items-end gap-2 bg-background border transition-shadow",
          activeTheme.ring,
          isRounded
            ? cn(btnShapeClass === "rounded-md" ? "rounded-xl" : btnShapeClass === "rounded-none" ? "rounded-none" : "rounded-full", "px-4 py-2 focus-within:ring-2 shadow-sm")
            : cn(shapeClass, "px-4 py-2 focus-within:ring-1 shadow-sm")
        )}
      >
        {/* Attachment dropdown */}
        <div className="relative shrink-0 mb-0.5" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setAttachDropdownOpen((o) => !o)}
            className={cn(
              "p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted",
              attachDropdownOpen && "bg-muted text-foreground"
            )}
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {attachDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 mb-2 w-48 rounded-xl border border-border/60 bg-background shadow-xl overflow-hidden z-50"
              >
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <ImagePlus className="w-4 h-4 text-muted-foreground" />
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  Upload File
                </button>
                {attachedFiles.length > 0 && (
                  <>
                    <div className="border-t border-border/40 mx-3" />
                    <button
                      type="button"
                      onClick={() => { setAttachedFiles([]); setAttachDropdownOpen(false); }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hidden file inputs */}
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
          <input ref={imageInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
        </div>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI..."
          className="flex-1 max-h-[180px] bg-transparent resize-none focus:outline-none py-2 text-sm leading-relaxed"
          rows={1}
        />

        <div className="flex items-center shrink-0 gap-2 mb-0.5">
          {/* Mic button */}
          <button
            type="button"
            onClick={toggleMic}
            className={cn(
              "p-2 transition-colors", btnShapeClass,
              isListening
                ? cn(activeTheme.text, activeTheme.bgSoft, "animate-pulse")
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            title={isListening ? "Stop listening" : "Voice input"}
          >
            <Mic className="w-5 h-5" />
          </button>

          {isLoading ? (
            <button
              type="button"
              onClick={onStop}
              className={cn("p-2 transition-colors", btnShapeClass, activeTheme.text, "hover:opacity-80")}
            >
              <StopCircle className="w-5 h-5 animate-pulse" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim() && attachedFiles.length === 0}
              className={cn(
                "p-2 transition-all flex items-center justify-center", btnShapeClass,
                input.trim() || attachedFiles.length > 0
                  ? cn(activeTheme.bg, "hover:opacity-90")
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {inputVariant !== "floating" && inputVariant !== "command" && (
        <p className="text-center mt-1.5 text-[10px] text-muted-foreground/60">
          AI can make mistakes. Consider verifying important information.
        </p>
      )}
    </motion.div>
  );
});
ChatInput.displayName = "ChatInput";

// ==========================================
// PROMPT SUGGESTIONS
// ==========================================

export const ChatPromptSuggestions = React.memo(function ChatPromptSuggestions({ suggestions }: { suggestions: string[] }) {
  const { setInput, onSubmit, messages, shape } = useAIChat();

  const hasMessages = messages.length > 0;
  const btnShapeClass = getButtonShapeClass(shape);

  return (
    <motion.div
      layout
      transition={{ type: "spring", bounce: 0, duration: 0.6 }}
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 px-4 py-8 max-w-2xl mx-auto w-full",
        hasMessages ? "hidden" : "flex"
      )}
    >
      {suggestions.map((prompt, i) => (
        <button
          key={i}
          onClick={() => {
            setInput(prompt);
          }}
          className={cn("text-sm px-4 py-2 border border-border/60 bg-background/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-sm",
            btnShapeClass === "rounded-md" ? "rounded-xl" : btnShapeClass === "rounded-none" ? "rounded-none" : "rounded-2xl"
          )}
        >
          {prompt}
        </button>
      ))}
    </motion.div>
  );
});
ChatPromptSuggestions.displayName = "ChatPromptSuggestions";
