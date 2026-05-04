/**
 * @registry-slug expanding-card
 * @registry-name Expanding Flex Card
 * @registry-dependency framer-motion
 */
"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface ExpandingCardOption {
  id: string | number;
  img: string;
  icon: React.ReactNode;
  main: string;
  sub: string;
}

export interface ExpandingFlexCardProps {
  options?: ExpandingCardOption[];
  className?: string;
}

export const ExpandingFlexCard: React.FC<ExpandingFlexCardProps> = ({ options = [], className }) => {
  const [activeOption, setActiveOption] = useState<string | number | undefined>(options[0]?.id);

  if (!options.length) return null;

  // Limit to 8 cards
  const displayOptions = options.slice(0, 8);

  return (
    <div className={cn("flex gap-3 w-full max-w-4xl h-100 overflow-hidden px-4 py-8 items-center justify-center", className)}>
      <style>{`
        .expanding-card {
          position: relative;
          background-size: cover;
          background-position: center;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          overflow: hidden;
          height: 100%;
          min-width: 60px;
        }
        .expanding-card.closed {
          flex: 0.5;
          border-radius: 100px;
        }
        .expanding-card.open {
          flex: 4;
          border-radius: 24px;
        }
        .card-content {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease 0.2s;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          padding: 12px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          pointer-events: none;
        }
        .expanding-card.open .card-content {
          opacity: 1;
          transform: translateY(0);
        }
        .card-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 20px;
        }
        .card-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .card-title {
          font-weight: 700;
          font-size: 16px;
          line-height: 1.2;
          white-space: nowrap;
        }
        .card-label {
          font-size: 12px;
          opacity: 0.8;
          white-space: nowrap;
        }
        
        /* Icon visibility for closed state */
        .closed-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .expanding-card.open .closed-icon {
          opacity: 0;
        }
      `}</style>
      {displayOptions.map((opt) => (
        <div
          key={opt.id}
          onClick={() => setActiveOption(opt.id)}
          className={cn(
            "expanding-card",
            activeOption === opt.id ? "open" : "closed"
          )}
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("${opt.img}")` }}
        >
          <div className="closed-icon">{opt.icon}</div>
          
          <div className="card-content">
            <div className="card-icon-wrapper">
              {opt.icon}
            </div>
            <div className="card-info flex flex-col">
              <div className="card-title">{opt.main}</div>
              <div className="card-label">{opt.sub}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
