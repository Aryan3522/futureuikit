"use client";

import React, { useEffect, useRef } from"react";
import { cn } from"@/lib/utils";

const TERMINAL_STEPS = Object.freeze([
 { type:"command", text:"npx futureuikit init"},
 { type:"output", text:"✓ Future UI initialized. Global CSS and tailwind.config updated."},
 { type:"command", text:"npx futureuikit add browser-window"},
 { type:"output", text:"✓ Browser Window added to src/components/ui/browser-window.tsx"},
 { type:"command", text:"npx futureuikit add noir-hero-3d"},
 { type:"output", text:"✓ Noir Hero 3D added. Installed dependencies: three, @react-three/fiber"},
 { type:"command", text:"npm run dev"},
 { type:"output", text:"▲ Next.js 16.2.6 (Turbopack)\n- Local: http://localhost:3000\n- Ready in 143ms"},
] as const);

export const AnimatedTerminal = React.memo(() => {
 const containerRef = useRef<HTMLDivElement>(null);
 const contentRef = useRef<HTMLDivElement>(null);
 const cursorRef = useRef<HTMLSpanElement>(null);

 useEffect(() => {
 let isCancelled = false;
 let currentStepIndex = 0;
 
 // Clear content initially
 if (contentRef.current) {
 contentRef.current.innerHTML ="";
 }

 const typeCommand = async (text: string, element: HTMLElement) => {
 for (let i = 0; i <= text.length; i++) {
 if (isCancelled) return;
 element.textContent = text.slice(0, i);
 if (containerRef.current) {
 containerRef.current.scrollTop = containerRef.current.scrollHeight;
 }
 // Random typing speed between 30ms and 70ms
 await new Promise((r) => setTimeout(r, Math.random() * 40 + 30));
 }
 await new Promise((r) => setTimeout(r, 400));
 };

 const renderOutputLineHTML = (text: string) => {
 if (text.startsWith("✓")) {
 return `<span class="text-[#00ffcc] mr-2">✓</span><span class="text-[#a1a1aa]">${text.substring(1)}</span>`;
 }
 if (text.startsWith("▲")) {
 return `<span class="text-white font-bold mr-2">▲</span><span class="text-[#a1a1aa]">${text.substring(1)}</span>`;
 }
 return `<span class="text-[#a1a1aa]">${text}</span>`;
 };

 const runSequence = async () => {
 while (!isCancelled) {
 if (!contentRef.current) return;
 contentRef.current.innerHTML ="";

 for (let i = 0; i < TERMINAL_STEPS.length; i++) {
 if (isCancelled) return;
 const step = TERMINAL_STEPS[i];

 const lineDiv = document.createElement("div");
 lineDiv.className ="flex gap-4 w-full";
 
 if (step.type ==="command") {
 const promptSpan = document.createElement("span");
 promptSpan.className ="text-[#8b5cf6] font-bold shrink-0";
 promptSpan.textContent ="$";
 
 const textDiv = document.createElement("div");
 textDiv.className ="whitespace-pre-wrap leading-relaxed text-white";
 
 lineDiv.appendChild(promptSpan);
 lineDiv.appendChild(textDiv);
 
 if (contentRef.current && cursorRef.current) {
 // Move cursor to this line temporarily
 cursorRef.current.style.display ="inline-block";
 textDiv.appendChild(cursorRef.current);
 }
 
 contentRef.current.appendChild(lineDiv);
 
 // Text node to type into
 const textNode = document.createElement("span");
 textDiv.insertBefore(textNode, cursorRef.current);
 
 await typeCommand(step.text, textNode);
 } else {
 const textDiv = document.createElement("div");
 textDiv.className ="whitespace-pre-wrap leading-relaxed";
 textDiv.innerHTML = renderOutputLineHTML(step.text);
 lineDiv.appendChild(textDiv);
 contentRef.current.appendChild(lineDiv);
 await new Promise((r) => setTimeout(r, 500));
 }
 
 if (containerRef.current) {
 containerRef.current.scrollTop = containerRef.current.scrollHeight;
 }
 }
 
 // Wait 5 seconds before restarting sequence
 if (cursorRef.current) cursorRef.current.style.display ="none";
 await new Promise((r) => setTimeout(r, 5000));
 }
 };

 runSequence();

 return () => {
 isCancelled = true;
 };
 }, []);

 return (
 <div
 ref={containerRef}
 className="w-full h-full bg-[#0a0a0a] rounded-xl overflow-y-auto overflow-x-hidden flex flex-col font-mono text-xs md:text-sm p-6 gap-3 text-left items-start shadow-inner"
 >
 <div ref={contentRef} className="w-full flex flex-col gap-3"></div>
 <span ref={cursorRef} className="w-2 h-4 bg-[#8b5cf6] animate-pulse ml-1 align-middle hidden"/>
 </div>
 );
});

AnimatedTerminal.displayName ="AnimatedTerminal";
