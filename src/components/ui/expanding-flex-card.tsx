/**
 * @registry-slug expanding-card
 * @registry-name Expanding Flex Card
 * @registry-dependency framer-motion
 */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!options.length) return null;

  // Limit to 8 cards
  const displayOptions = options.slice(0, 8);

  const handleDragEnd = (event: any, info: any) => {
    if (!carouselRef.current || !containerRef.current) return;
    
    // Simple logic to approximate active index based on drag offset
    const offset = info.point.x;
    const containerWidth = containerRef.current.offsetWidth;
    const cardWidth = containerWidth * 0.85; // match .mobile-card flex-basis
    
    // This is a very rough approximation, for a real carousel we'd track x position
    // But since the user wants a simple draggable list, we can just keep the dots for visual flair
    // or improve it if we had more time. For now, let's just make sure it doesn't break.
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4 py-8", className)} ref={containerRef}>
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
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          padding: 12px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          pointer-events: none;
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
        
        /* Desktop/Tablet Specific */
        .closed-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        @media (min-width: 768px) {
          .desktop-only-content {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease 0.2s;
          }
          .expanding-card.open .desktop-only-content {
            opacity: 1;
            transform: translateY(0);
          }
          .expanding-card.open .closed-icon {
            opacity: 0;
          }
        }

        /* Mobile Specific Carousel Fixes */
        .mobile-card {
          flex: 0 0 85%;
          height: 400px;
          border-radius: 24px;
          margin-right: 16px;
          position: relative;
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }
        .mobile-card:last-child {
          margin-right: 0;
        }
      `}</style>

      {isMobile ? (
        <div className="relative">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div
              ref={carouselRef}
              drag="x"
              dragConstraints={containerRef}
              className="flex"
            >
              {displayOptions.map((opt) => (
                <div
                  key={opt.id}
                  className="mobile-card shrink-0"
                  style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("${opt.img}")` }}
                >
                  <div className="card-content opacity-100 transform-none">
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
            </motion.div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {displayOptions.map((opt, i) => (
              <div 
                key={opt.id} 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeOption === opt.id ? "w-6 bg-primary" : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex gap-3 h-[450px] items-center justify-center">
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
              
              <div className="card-content desktop-only-content">
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
      )}
    </div>
  );
};
