"use client";

import React from"react";
import { Prism as SyntaxHighlighter } from"react-syntax-highlighter";
import {
 vscDarkPlus,
 vs,
} from"react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, CheckCircle2 } from"lucide-react";
import { useTheme } from"@/contexts/ThemeContext";

interface CodeBlockProps {
 code: string;
 language?: string;
 filename?: string;
 showHeader?: boolean;
}

export function CodeBlock({
 code,
 language ="tsx",
 filename,
 showHeader = true,
}: CodeBlockProps) {
 const [copied, setCopied] = React.useState(false);
 const { theme } = useTheme();

 const activeSyntaxStyle =
 theme ==="dark"
 ? vscDarkPlus
 : vs;

 const handleCopy = () => {
 navigator.clipboard.writeText(code);
 setCopied(true);
 setTimeout(() => setCopied(false), 1500);
 };

 return (
 <div className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 shadow-sm">
 {showHeader && (
 // <div className="flex items-center justify-between px-4 py-3 bg-zinc-100 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
 <div className="flex justify-between items-center px-4 py-3 bg-card border-b border-border">
 <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-muted-foreground">
 {filename || language}
 </span>

 <button
 onClick={handleCopy}
 className="text-zinc-500 hover:text-zinc-900 dark:text-muted-foreground dark:hover:text-white transition-colors"
 >
 {copied ? (
 <CheckCircle2
 size={16}
 className="text-emerald-500"
 />
 ) : (
 <Copy size={16} />
 )}
 </button>
 </div>
 )}

 <SyntaxHighlighter
 language={language}
 style={activeSyntaxStyle}
 customStyle={{
 margin: 0,
 padding:"1.5rem",
 fontSize:"0.85rem",
 lineHeight:"1.6",
 }}
 codeTagProps={{
 style: {
 fontFamily:
"var(--font-jetbrains-mono), monospace",
 },
 }}
 >
 {code}
 </SyntaxHighlighter>
 </div>
 );
}