/**
 * @registry-slug boxy-rotate
 * @registry-name Rotating Loader
 * @registry-description A Future UI Rotating Loader component.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface BoxyRotateLoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BoxyRotateLoader: React.FC<BoxyRotateLoaderProps> = React.memo(({ className, ...props }) => {
          return (
            <div className={cn("flex flex-col items-center justify-center w-full h-full min-h-[inherit]", className)} {...props}>
              <style>{`
        .pl1-container {
          --hue: 223;
          --bg: hsl(var(--hue), 90%, 90%);
          --fg: hsl(var(--hue), 90%, 10%);
          --primary: hsl(var(--hue), 90%, 50%);
          --trans-dur: 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pl1 {
          display: block;
          width: 8em;
          height: 8em;
        }
        .pl1__g, .pl1__rect {
          animation: pl1-a 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .pl1__g { transform-origin: 64px 64px; }
        .pl1__rect:first-child { animation-name: pl1-b; }
        .pl1__rect:nth-child(2) { animation-name: pl1-c; }
        @keyframes pl1-a {
          from { transform: rotate(0); }
          80%, to { animation-timing-function: steps(1, start); transform: rotate(90deg); }
        }
        @keyframes pl1-b {
          from { animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0); width: 40px; height: 40px; }
          20% { animation-timing-function: steps(1, start); width: 40px; height: 0; }
          60% { animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1); width: 0; height: 40px; }
          80%, to { width: 40px; height: 40px; }
        }
        @keyframes pl1-c {
          from { animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0); width: 40px; height: 40px; transform: translate(0, 48px); }
          20% { animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1); width: 40px; height: 88px; transform: translate(0, 0); }
          40% { animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0); width: 40px; height: 40px; transform: translate(0, 0); }
          60% { animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1); width: 88px; height: 40px; transform: translate(0, 0); }
          80%, to { width: 40px; height: 40px; transform: translate(48px, 0); }
        }
      `}</style>
              <div className="pl1-container">
                <svg className="pl1" viewBox="0 0 128 128" width="128" height="128">
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
                    <g className="pl1__g">
                      <g transform="translate(20,20) rotate(0,44,44)">
                        <g className="pl1__rect-g">
                          <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                          <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
                        </g>
                        <g className="pl1__rect-g" transform="rotate(180,44,44)">
                          <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                          <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
                        </g>
                      </g>
                    </g>
                  </g>
                  <g fill="hsl(343,90%,50%)" mask="url(#pl-mask)">
                    <g className="pl1__g">
                      <g transform="translate(20,20) rotate(0,44,44)">
                        <g className="pl1__rect-g">
                          <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                          <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
                        </g>
                        <g className="pl1__rect-g" transform="rotate(180,44,44)">
                          <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                          <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          );
        });
BoxyRotateLoader.displayName = "BoxyRotateLoader";
