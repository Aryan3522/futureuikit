"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const GlowyButton = React.forwardRef(
  ({ className, children, icon, ...props }, ref) => {
    return (
      <div className={cn("relative select-none inline-block", className)}>
        <style>{`
          .glowy-btn-custom {
            --h: 60px;
            --color: #00afaf;
            --text-color: rgb(210 210 240);
            position: relative;
            min-width: 180px;
            height: var(--h);
            padding: 0 4.25rem 0 2.5rem;
            border-radius: var(--h);
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border: none;
            font-family: inherit;
            color: var(--text-color);
            background: rgb(4 8 20 / 0.8);
            box-shadow: 0 0 0 1px rgb(200 200 220 / 0.22);
            overflow: hidden;
            cursor: pointer;
            transition: all 500ms ease;
            z-index: 2;
          }
          .glowy-btn-custom::before {
            content: "";
            position: absolute;
            inset: 0;
            background: rgb(200 200 220 / 0.1);
            box-shadow: inset 0 0px 24px 0 rgb(170 230 250 / 0.12);
            border-radius: var(--h);
            z-index: 1;
            transition: transform 500ms ease, box-shadow 500ms ease;
          }
          .glowy-btn-custom .btn-text {
            transition: transform 500ms ease;
            z-index: 2;
            white-space: nowrap;
          }
          .glowy-btn-custom .btn-icon {
            position: absolute;
            right: 1.25rem;
            width: 20px;
            height: 20px;
            opacity: 0;
            transform: translateX(15px);
            transition: all 500ms ease;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .glowy-btn-custom:hover {
            box-shadow: 0 0 20px var(--color),
              inset 0 0 26px -10px var(--color),
              0 0 0 1px rgb(200 200 220 / 0.22);
          }
          .glowy-btn-custom:hover::before {
            transform: translateX(calc(100% - var(--h)));
            box-shadow: inset 0 0px 0px 0 transparent;
          }
          .glowy-btn-custom:hover .btn-text {
            transform: translateX(-15px);
          }
          .glowy-btn-custom:hover .btn-icon {
            opacity: 1;
            transform: translateX(0);
            color: var(--color);
          }
        `}</style>
        <button ref={ref} className="glowy-btn-custom" {...props}>
          <span className="btn-text">{children}</span>
          <div className="btn-icon">
            {icon || (
              <svg viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z" fill="currentColor"/>
              </svg>
            )}
          </div>
        </button>
      </div>
    );
  }
);
GlowyButton.displayName = "GlowyButton";
