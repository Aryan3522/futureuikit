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

export interface NavMenuItem {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface NavMenuProps {
  items?: NavMenuItem[];
  className?: string;
}

export const NavMenu: React.FC<NavMenuProps> = React.memo(({ items = [], className }) => {
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

          return (
            <div className={cn("relative flex flex-col items-center justify-center min-h-75 w-full", className)}>
              <style>{`
        .circular-nav {
          position: relative;
          width: 250px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .nav-toggler {
          position: absolute;
          width: 40px;
          height: 5px;
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
          width: 40px;
          height: 5px;
          border-radius: 2.5px;
          background: hsl(var(--foreground) / 0.9);
          transition: transform 0.5s, top 0.5s;
        }
        .nav-toggler::before { top: 10px; }
        .nav-toggler::after { top: -10px; }

        .toggler-wrapper {
          position: absolute;
          width: 60px;
          height: 60px;
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
          width: 60px;
          height: 60px;
          background: hsl(var(--muted) / 0.8);
          border: 1px solid hsl(var(--border));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsl(var(--foreground));
          opacity: 0;
          transition: transform 0.5s ease, opacity 0.5s ease, background 0.2s ease;
          pointer-events: none;
          cursor: pointer;
        }
        .circular-nav.open .circ-item { opacity: 1; pointer-events: auto; }
        .circular-nav.open .circ-item:nth-child(2) { transform: rotate(0deg) translate(-100px) rotate(0deg); }
        .circular-nav.open .circ-item:nth-child(3) { transform: rotate(60deg) translate(-100px) rotate(-60deg); }
        .circular-nav.open .circ-item:nth-child(4) { transform: rotate(120deg) translate(-100px) rotate(-120deg); }
        .circular-nav.open .circ-item:nth-child(5) { transform: rotate(180deg) translate(-100px) rotate(-180deg); }
        .circular-nav.open .circ-item:nth-child(6) { transform: rotate(240deg) translate(-100px) rotate(-240deg); }
        .circular-nav.open .circ-item:nth-child(7) { transform: rotate(300deg) translate(-100px) rotate(-300deg); }
        
        .circ-item:hover {
          background: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
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
