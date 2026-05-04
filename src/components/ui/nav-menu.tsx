/**
 * @registry-slug menu
 * @registry-name Circle Navigation Menu
 */
"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface NavMenuItem {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface NavMenuProps {
  items?: NavMenuItem[];
  className?: string;
}

export const NavMenu: React.FC<NavMenuProps> = ({ items = [], className }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const defaultItems: NavMenuItem[] = [
    { title: "Cat", icon: "🐱" },
    { title: "Cookie", icon: "🍪" },
    { title: "Bird", icon: "🐦" },
    { title: "Fly", icon: "🪰" },
    { title: "Gem", icon: "💎" },
    { title: "Cheers", icon: "🍻" },
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
          background: rgba(230, 239, 250, 0.9);
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
          background: rgba(230, 239, 250, 0.9);
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
          background: rgba(230, 230, 250, 0.7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          opacity: 0;
          transition: transform 0.5s ease, opacity 0.5s ease;
          pointer-events: none;
          cursor: pointer;
        }
        .circular-nav.open .circ-item { opacity: 1; pointer-events: auto; }
        .circular-nav.open .circ-item:nth-child(2) { transform: rotate(0deg) translate(-100px) rotate(0deg); }
        .circular-nav.open .circ-item:nth-child(3) { transform: rotate(60deg) translate(-100px) rotate(60deg); }
        .circular-nav.open .circ-item:nth-child(4) { transform: rotate(120deg) translate(-100px) rotate(120deg); }
        .circular-nav.open .circ-item:nth-child(5) { transform: rotate(180deg) translate(-100px) rotate(180deg); }
        .circular-nav.open .circ-item:nth-child(6) { transform: rotate(240deg) translate(-100px) rotate(240deg); }
        .circular-nav.open .circ-item:nth-child(7) { transform: rotate(300deg) translate(-100px) rotate(300deg); }
        
        .circ-item:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
      <div className={cn("circular-nav", menuOpen && "open")}>
        <div className="toggler-wrapper" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="nav-toggler"></div>
        </div>
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="circ-item"
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
};
