/**
 * @registry-slug menu
 * @registry-name Circle Navigation Menu
 * @registry-description A Future UI Circle Navigation Menu component.
 * @registry-category ui
 */
"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, User, Settings, Mail, Bell, Search } from "lucide-react";

export type NavMenuColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type NavMenuShape = "default" | "square" | "rounded" | "sharp";
export type NavMenuSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface NavMenuItem {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface NavMenuProps {
  items?: NavMenuItem[];
  className?: string;
  color?: NavMenuColor;
  shape?: NavMenuShape;
  spacing?: NavMenuSpacing;
}

export const NavMenu: React.FC<NavMenuProps> = React.memo(({ items = [], className, color = "default", shape = "default", spacing = "default" }) => {
          const [menuOpen, setMenuOpen] = useState(false);

          const defaultItems: NavMenuItem[] = [
            { title: "Home", icon: <Home className="w-5 h-5" /> },
            { title: "Profile", icon: <User className="w-5 h-5" /> },
            { title: "Settings", icon: <Settings className="w-5 h-5" /> },
            { title: "Messages", icon: <Mail className="w-5 h-5" /> },
            { title: "Notifications", icon: <Bell className="w-5 h-5" /> },
            { title: "Search", icon: <Search className="w-5 h-5" /> },
          ];

          const displayItems = items.length > 0 ? items : defaultItems;

          const getHoverColors = () => {
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
          };

          const getHoverTextColor = () => {
            if (color === "default") return "hsl(var(--background))";
            return "#ffffff";
          };

          const borderRadius = shape === "square" ? "0" : shape === "sharp" ? "2px" : shape === "rounded" ? "12px" : "50%";

          const getSpacingValues = () => {
            switch (spacing) {
              case "2x": return { navSize: 200, itemSize: 48, translate: 80 };
              case "4x": return { navSize: 250, itemSize: 60, translate: 100 };
              case "6x": return { navSize: 300, itemSize: 72, translate: 120 };
              case "8x": return { navSize: 350, itemSize: 84, translate: 140 };
              default: return { navSize: 250, itemSize: 60, translate: 100 };
            }
          };
          const { navSize, itemSize, translate } = getSpacingValues();

          return (
            <div className={cn("relative flex flex-col items-center justify-center min-h-[350px] w-full", className)}>
              <style>{`
        .circular-nav {
          position: relative;
          width: ${navSize}px;
          height: ${navSize}px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .nav-toggler {
          position: absolute;
          width: ${itemSize * 0.66}px;
          height: ${itemSize * 0.083}px;
          border-radius: 2.5px;
          background: hsl(var(--foreground) / 0.9);
          cursor: pointer;
          z-index: 10;
          transition: background 0.5s, transform 0.5s;
        }
        .nav-toggler::before,
        .nav-toggler::after {
          content: "";
          position: absolute;
          width: ${itemSize * 0.66}px;
          height: ${itemSize * 0.083}px;
          border-radius: 2.5px;
          background: hsl(var(--foreground) / 0.9);
          transition: transform 0.5s, top 0.5s;
        }
        .nav-toggler::before { top: ${itemSize * 0.16}px; }
        .nav-toggler::after { top: -${itemSize * 0.16}px; }

        .toggler-wrapper {
          position: absolute;
          width: ${itemSize}px;
          height: ${itemSize}px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 20;
        }

        .circular-nav.open .nav-toggler { background: transparent; }
        .circular-nav.open .nav-toggler::before { transform: rotate(45deg); top: 0; }
        .circular-nav.open .nav-toggler::after { transform: rotate(-45deg); top: 0; }
        
        .circ-item {
          position: absolute;
          width: ${itemSize}px;
          height: ${itemSize}px;
          background: hsl(var(--muted) / 0.8);
          border: 1px solid hsl(var(--border));
          border-radius: ${borderRadius};
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsl(var(--foreground));
          opacity: 0;
          transition: transform 0.5s ease, opacity 0.5s ease, background 0.2s ease, color 0.2s ease;
          pointer-events: none;
          cursor: pointer;
        }
        .circular-nav.open .circ-item { opacity: 1; pointer-events: auto; }
        .circular-nav.open .circ-item:nth-child(2) { transform: rotate(0deg) translate(-${translate}px) rotate(0deg); }
        .circular-nav.open .circ-item:nth-child(3) { transform: rotate(60deg) translate(-${translate}px) rotate(-60deg); }
        .circular-nav.open .circ-item:nth-child(4) { transform: rotate(120deg) translate(-${translate}px) rotate(-120deg); }
        .circular-nav.open .circ-item:nth-child(5) { transform: rotate(180deg) translate(-${translate}px) rotate(-180deg); }
        .circular-nav.open .circ-item:nth-child(6) { transform: rotate(240deg) translate(-${translate}px) rotate(-240deg); }
        .circular-nav.open .circ-item:nth-child(7) { transform: rotate(300deg) translate(-${translate}px) rotate(-300deg); }
        
        .circ-item:hover {
          background: ${getHoverColors()};
          color: ${getHoverTextColor()};
        }
      `}</style>
              <div className={cn("circular-nav", menuOpen && "open")}>
                <div className="toggler-wrapper" onClick={() => setMenuOpen(!menuOpen)}>
                  <div className="nav-toggler"></div>
                </div>
                {displayItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="circ-item shadow-md"
                    title={item.title}
                    onClick={() => {
                      setMenuOpen(false);
                      if (item.onClick) item.onClick();
                    }}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>
          );
        });
NavMenu.displayName = "NavMenu";
