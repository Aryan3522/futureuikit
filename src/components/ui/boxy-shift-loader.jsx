"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BoxyShiftLoader = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-full min-h-[inherit]", className)} {...props}>
      <style>{`
        .pl3-container {
          --hue: 223;
          --bg: hsl(var(--hue), 90%, 90%);
          --fg: hsl(var(--hue), 90%, 10%);
          --primary: hsl(var(--hue), 90%, 50%);
          --trans-dur: 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pl3 {
          display: block;
          width: 8em;
          height: 8em;
        }
        .pl3__rect {
          animation: pl3 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .pl3__rect-g {
          transform-origin: 64px 64px;
        }
        @keyframes pl3 {
          from { transform: translate(64px, 0); width: 64px; height: 64px; }
          25% { transform: translate(0, 0); width: 128px; height: 32px; }
          50% { transform: translate(0, 0); width: 64px; height: 64px; }
          75% { transform: translate(0, 0); width: 32px; height: 128px; }
          to { transform: translate(0, 64px); width: 64px; height: 64px; }
        }
      `}</style>
      <div className="pl3-container">
        <svg className="pl3" viewBox="0 0 128 128" width="128" height="128">
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
            <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)" />
            <g className="pl3__rect-g" transform="scale(-1,-1)">
              <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)" />
            </g>
          </g>
          <g fill="hsl(163,90%,50%)" mask="url(#pl-mask)">
            <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)" />
            <g className="pl3__rect-g" transform="scale(-1,-1)">
              <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
