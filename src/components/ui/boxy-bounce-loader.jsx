"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BoxyBounceLoader = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-full min-h-[inherit]", className)} {...props}>
      <style>{`
        .pl2-container {
          --hue: 223;
          --bg: hsl(var(--hue), 90%, 90%);
          --fg: hsl(var(--hue), 90%, 10%);
          --primary: hsl(var(--hue), 90%, 50%);
          --trans-dur: 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pl2 {
          display: block;
          width: 8em;
          height: 8em;
        }
        .pl2__rect, .pl2__rect-g {
          animation: pl2-a 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .pl2__rect { animation-name: pl2-b; }
        .pl2__rect-g .pl2__rect { transform-origin: 20px 128px; }
        .pl2__rect-g:first-child, .pl2__rect-g:first-child .pl2__rect { animation-delay: -0.25s; }
        .pl2__rect-g:nth-child(2), .pl2__rect-g:nth-child(2) .pl2__rect { animation-delay: -0.125s; }
        .pl2__rect-g:nth-child(2) .pl2__rect { transform-origin: 64px 128px; }
        .pl2__rect-g:nth-child(3) .pl2__rect { transform-origin: 108px 128px; }
        @keyframes pl2-a {
          from, 25%, 66.67%, to { transform: translateY(0); }
          50% { animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0); transform: translateY(-80px); }
        }
        @keyframes pl2-b {
          from, to { animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0); width: 40px; height: 24px; transform: rotate(180deg) translateX(0); }
          33.33% { animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1); width: 20px; height: 64px; transform: rotate(180deg) translateX(10px); }
          66.67% { animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1); width: 28px; height: 44px; transform: rotate(180deg) translateX(6px); }
        }
      `}</style>
      <div className="pl2-container">
        <svg className="pl2" viewBox="0 0 128 128" width="128" height="128">
          <defs>
            <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
            <mask id="pl-mask">
              <rect x="0" y="0" width="128" height="128" fill="url(#pl-grad)" />
            </mask>
          </defs>
          <g fill="hsl(223, 90%, 50%)">
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="0" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="44" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="88" y="128" width="40" height="24" transform="rotate(180)" /></g>
          </g>
          <g fill="hsl(283,90%,50%)" mask="url(#pl-mask)">
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="0" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="44" y="128" width="40" height="24" transform="rotate(180)" /></g>
            <g className="pl2__rect-g"><rect className="pl2__rect" rx="8" ry="8" x="88" y="128" width="40" height="24" transform="rotate(180)" /></g>
          </g>
        </svg>
      </div>
    </div>
  );
};
