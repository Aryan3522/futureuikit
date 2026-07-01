/**
 * @registry-slug menu
 * @registry-name Circle Navigation Menu
 * @registry-description A Future UI Circle Navigation Menu component.
 * @registry-category ui
 * @registry-type components:ui
 */
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Home, User, Settings, Mail, Bell, Search } from "lucide-react";

export type NavMenuColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type NavMenuShape = "default" | "square" | "rounded" | "sharp";
export type NavMenuSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface NavMenuItem {
  title: string;
  icon?: React.ReactNode;
  image?: string;
  onClick?: () => void;
}

export type NavMenuVariant = "solid" | "outline" | "ghost" | "link";

export interface NavMenuProps {
  items?: NavMenuItem[];
  className?: string;
  color?: NavMenuColor;
  shape?: NavMenuShape;
  spacing?: NavMenuSpacing;
  variant?: NavMenuVariant;
  boundsContainer?: React.RefObject<HTMLDivElement | null>;
}

export const NavMenu: React.FC<NavMenuProps> = React.memo(({ 
  items = [], className, color = "default", shape = "default", spacing = "default", variant = "solid", boundsContainer 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const defaultItems: NavMenuItem[] = [
    { title: "Home", icon: <Home className="w-5 h-5" /> },
    { title: "Profile", icon: <User className="w-5 h-5" /> },
    { title: "Settings", icon: <Settings className="w-5 h-5" /> },
    { title: "Messages", icon: <Mail className="w-5 h-5" /> },
    { title: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { title: "Search", icon: <Search className="w-5 h-5" /> },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;
  const numItems = displayItems.length;

  const getColorValue = useCallback(() => {
    switch (color) {
      case "blue": return "hsl(221, 83%, 53%)";
      case "emerald": return "hsl(160, 84%, 39%)";
      case "rose": return "hsl(346, 87%, 43%)";
      case "amber": return "hsl(43, 96%, 56%)";
      case "violet": return "hsl(262, 83%, 58%)";
      case "indigo": return "hsl(239, 84%, 67%)";
      case "sky": return "hsl(199, 89%, 48%)";
      case "slate": return "hsl(215, 16%, 47%)";
      case "orange": return "hsl(24, 95%, 53%)";
      default: return "hsl(var(--foreground))";
    }
  }, [color]);

  const getHoverTextColor = useCallback(() => {
    if (color === "default") return "hsl(var(--background))";
    return "#ffffff";
  }, [color]);

  const colorValue = getColorValue();
  const textColor = getHoverTextColor();
  const borderRadius = shape === "square" ? "0" : shape === "sharp" ? "2px" : shape === "rounded" ? "12px" : "50%";

  const getSpacingValues = useCallback(() => {
    switch (spacing) {
      case "2x": return { baseTranslate: 80, itemSize: 48, gap: 16 };
      case "4x": return { baseTranslate: 100, itemSize: 60, gap: 20 };
      case "6x": return { baseTranslate: 120, itemSize: 72, gap: 24 };
      case "8x": return { baseTranslate: 140, itemSize: 84, gap: 28 };
      default: return { baseTranslate: 100, itemSize: 60, gap: 20 };
    }
  }, [spacing]);
  const { itemSize, baseTranslate, gap } = getSpacingValues();

  const [layout, setLayout] = useState<{r: number, a: number, isText: boolean}[]>([]);
  const [maxRadius, setMaxRadius] = useState(baseTranslate);

  useEffect(() => {
    const newLayout: {r: number, a: number, isText: boolean}[] = [];
    let itemsRemaining = numItems;
    let ringIndex = 0;

    while (itemsRemaining > 0) {
      const currentRadius = baseTranslate + ringIndex * (itemSize + gap);
      let maxItems;
      
      if (ringIndex === 0) {
        maxItems = 8; // Force max 8 on the inner ring
      } else {
        const arcLen = 2 * Math.PI * currentRadius;
        maxItems = Math.max(1, Math.floor(arcLen / (itemSize + gap)));
      }
      
      const itemsInThisRing = Math.min(itemsRemaining, maxItems);
      const step = 360 / itemsInThisRing;
      
      for (let i = 0; i < itemsInThisRing; i++) {
        const globalIndex = numItems - itemsRemaining + i;
        const item = displayItems[globalIndex];
        const isText = !!(item.title && !item.icon && !item.image);
        newLayout.push({ r: currentRadius, a: i * step, isText });
      }
      
      itemsRemaining -= itemsInThisRing;
      ringIndex++;
    }
    
    setLayout(newLayout);
    setMaxRadius(ringIndex > 0 ? baseTranslate + (ringIndex - 1) * (itemSize + gap) : baseTranslate);
  }, [numItems, baseTranslate, itemSize, gap, displayItems]);

  useEffect(() => {
    if (menuOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Radius needed to contain the entire expanded menu including the outermost ring
      const collisionRadius = maxRadius + itemSize / 2 + 15;

      let boundLeft = 0;
      let boundRight = window.innerWidth;
      let boundTop = 0;
      let boundBottom = window.innerHeight;

      if (boundsContainer?.current) {
        const boundRect = boundsContainer.current.getBoundingClientRect();
        boundLeft = boundRect.left;
        boundRight = boundRect.right;
        boundTop = boundRect.top;
        boundBottom = boundRect.bottom;
      }

      let dx = 0;
      let dy = 0;

      if (centerX - collisionRadius < boundLeft) dx = boundLeft - (centerX - collisionRadius);
      if (centerX + collisionRadius > boundRight) dx = boundRight - (centerX + collisionRadius);
      if (centerY - collisionRadius < boundTop) dy = boundTop - (centerY - collisionRadius);
      if (centerY + collisionRadius > boundBottom) dy = boundBottom - (centerY + collisionRadius);

      setOffset({ x: dx, y: dy });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [menuOpen, boundsContainer, maxRadius, itemSize]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Generate dynamic CSS rules mapped by position index
  const dynamicStyles = layout.map((pos, i) => {
    if (pos.isText) {
      // For text elements, rotate radially (tangential alignment)
      // `rotate(90deg)` aligns the baseline of the text with the radius line
      return `
        .circular-nav.open .circ-item:nth-child(${i + 2}) { 
          transform: rotate(${pos.a}deg) translate(-${pos.r}px) rotate(90deg); 
        }
      `;
    } else {
      // Normal icon elements stay perfectly upright
      return `
        .circular-nav.open .circ-item:nth-child(${i + 2}) { 
          transform: rotate(${pos.a}deg) translate(-${pos.r}px) rotate(-${pos.a}deg); 
        }
      `;
    }
  }).join("");

  return (
    <div ref={containerRef} className={cn("relative flex items-center justify-center", className)} style={{ width: itemSize, height: itemSize }}>
      <style>{`
        .circular-nav {
          position: relative;
          width: ${itemSize}px;
          height: ${itemSize}px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .toggler-wrapper {
          position: absolute;
          width: ${itemSize}px;
          height: ${itemSize}px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 20;
          background: ${variant === 'solid' ? colorValue : 'transparent'};
          border: ${variant === 'outline' ? `2px solid ${colorValue}` : 'none'};
          border-radius: ${borderRadius};
          transition: all 0.3s ease;
        }
        
        .toggler-wrapper:hover {
          background: ${variant === 'solid' ? colorValue : variant === 'outline' ? 'transparent' : 'hsl(var(--muted)/0.5)'};
          opacity: 0.9;
        }

        .nav-toggler {
          position: absolute;
          width: ${itemSize * 0.45}px;
          height: ${itemSize * 0.05}px;
          border-radius: 2.5px;
          background: ${variant === 'solid' ? textColor : colorValue};
          z-index: 10;
          transition: background 0.5s, transform 0.5s;
        }
        .nav-toggler::before,
        .nav-toggler::after {
          content: "";
          position: absolute;
          width: ${itemSize * 0.45}px;
          height: ${itemSize * 0.05}px;
          border-radius: 2.5px;
          background: ${variant === 'solid' ? textColor : colorValue};
          transition: transform 0.5s, top 0.5s;
        }
        .nav-toggler::before { top: ${itemSize * 0.16}px; }
        .nav-toggler::after { top: -${itemSize * 0.16}px; }

        .circular-nav.open .nav-toggler { background: transparent; }
        .circular-nav.open .nav-toggler::before { transform: rotate(45deg); top: 0; }
        .circular-nav.open .nav-toggler::after { transform: rotate(-45deg); top: 0; }
        
        .circ-item {
          position: absolute;
          height: ${itemSize}px;
          background: ${variant === 'solid' ? 'hsl(var(--muted) / 0.8)' : variant === 'outline' ? 'transparent' : 'transparent'};
          border: ${variant === 'outline' ? `1px solid ${colorValue}` : variant === 'solid' ? '1px solid hsl(var(--border))' : 'none'};
          border-radius: ${borderRadius};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${variant === 'solid' ? 'hsl(var(--foreground))' : colorValue};
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease, background 0.2s ease, color 0.2s ease;
          pointer-events: none;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
        }

        .circ-item.text-item {
          padding: 0 16px;
          min-width: ${itemSize}px;
          font-weight: 500;
          border-radius: 9999px; /* Pill shape for text */
        }
        
        .circ-item.icon-item {
          width: ${itemSize}px;
        }

        .circular-nav.open .circ-item { opacity: 1; pointer-events: auto; }
        
        ${dynamicStyles}
        
        .circ-item:hover {
          background: ${variant === 'link' ? 'transparent' : colorValue};
          color: ${variant === 'link' ? colorValue : textColor};
        }
      `}</style>
      <div 
        className={cn("circular-nav", menuOpen && "open")}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        <div className="toggler-wrapper" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="nav-toggler"></div>
        </div>
        {displayItems.map((item, idx) => {
          const isText = !!(item.title && !item.icon && !item.image);
          return (
            <div
              key={idx}
              className={cn("circ-item", isText ? "text-item" : "icon-item")}
              title={item.title}
              onClick={() => {
                setMenuOpen(false);
                if (item.onClick) item.onClick();
              }}
            >
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-[inherit]" />
              ) : isText ? (
                <span>{item.title}</span>
              ) : (
                item.icon
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
NavMenu.displayName = "NavMenu";

