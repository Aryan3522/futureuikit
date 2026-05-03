"use client";

import React, { useState, useMemo, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { componentsList } from "@/data/component-library-data";
import { registry } from "@/data/component-library-data";
import ComponentPageSidebar from "@/components/ui/ComponentPageSidebar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Code as CodeIcon, Copy, GalleryHorizontalEnd, ListCollapse, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { PillHeader } from "@/components/ui/PillHeader";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold",
      h4: "scroll-m-20 text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
    },
  },
  defaultVariants: { variant: "h1" },
});

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
    },
  },
  defaultVariants: { variant: "default" },
});

const Heading = ({ className, variant, as: Tag = "h1", ...props }) => (
  <Tag className={cn(headingVariants({ variant, className }))} {...props} />
);

const Text = ({ className, variant, as: Tag = "p", ...props }) => (
  <Tag className={cn(textVariants({ variant, className }))} {...props} />
);

const Label = ({ className, as: Tag = "label", ...props }) => (
  <Tag className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
);

const Code = ({ className, ...props }) => (
  <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)} {...props} />
);

const CarouselSlider = () => {
  const slides = [
    {
      id: 1,
      tag: "Exploration",
      title: "The exotic islands of Hawaii",
      location: "Maui, Hawaii",
      image: "https://images.unsplash.com/photo-1556206079-747a7a424d3d?ixlib=rb-4.0.3&q=80",
      tagBg: "bg-indigo-600"
    },
    {
      id: 2,
      tag: "Adventure",
      title: "Island of Eternal Spring",
      location: "Lanzarote, Spain",
      image: "https://images.unsplash.com/photo-1571900670723-a317a66e3fb7?ixlib=rb-4.0.3&q=80",
      tagBg: "bg-emerald-600"
    },
    {
      id: 3,
      tag: "History",
      title: "The Majestic Eiffel Tower",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&q=80",
      tagBg: "bg-amber-600"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div 
      className="group relative w-full max-w-4xl mx-auto h-[450px] overflow-hidden rounded-2xl bg-black shadow-2xl select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
            currentIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%), url("${slide.image}")` }}
        >
          <div className={`absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white transition-all duration-700 delay-300 ${
            currentIndex === idx ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div className="flex flex-col gap-3">
              <span className={`inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${slide.tagBg}`}>
                {slide.tag}
              </span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight max-w-2xl italic">
                {slide.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-white/70 font-medium">
                <MapPin size={16} className="text-white/50" />
                {slide.location}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              currentIndex === idx ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
         <div 
           key={currentIndex}
           className="h-full bg-white/50 animate-progress"
           style={{ animationDuration: '5000ms' }}
         />
      </div>

      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        .animate-progress { animation: progress 5s linear forwards; }
      `}</style>
    </div>
  );
};

const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative select-text flex flex-col items-center justify-center min-h-[300px] w-full">
      <style>{`
        .menu-container {
          position: relative;
          width: 250px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .menu-label {
          position: absolute;
          width: 40px;
          height: 5px;
          border-radius: 2.5px;
          background: rgba(230, 239, 250, 0.9);
          cursor: pointer;
          z-index: 10;
          transition: background 0.5s, transform 0.5s;
        }
        .menu-label::before,
        .menu-label::after {
          content: "";
          position: absolute;
          width: 40px;
          height: 5px;
          border-radius: 2.5px;
          background: rgba(230, 239, 250, 0.9);
          transition: transform 0.5s, top 0.5s;
        }
        .menu-label::before { top: 10px; }
        .menu-label::after { top: -10px; }

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

        .menu-container.open .menu-label {
          background: transparent;
        }
        .menu-container.open .menu-label::before {
          transform: rotate(45deg);
          top: 0;
        }
        .menu-container.open .menu-label::after {
          transform: rotate(-45deg);
          top: 0;
        }
        
        .menu-item-circ {
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
        .menu-container.open .menu-item-circ {
          opacity: 1;
          pointer-events: auto;
        }
        .menu-container.open .menu-item-circ:nth-child(2) { transform: rotate(0deg) translate(-100px) rotate(0deg); }
        .menu-container.open .menu-item-circ:nth-child(3) { transform: rotate(60deg) translate(-100px) rotate(-60deg); }
        .menu-container.open .menu-item-circ:nth-child(4) { transform: rotate(120deg) translate(-100px) rotate(-120deg); }
        .menu-container.open .menu-item-circ:nth-child(5) { transform: rotate(180deg) translate(-100px) rotate(-180deg); }
        .menu-container.open .menu-item-circ:nth-child(6) { transform: rotate(240deg) translate(-100px) rotate(-240deg); }
        .menu-container.open .menu-item-circ:nth-child(7) { transform: rotate(300deg) translate(-100px) rotate(-300deg); }
        
        .menu-item-circ:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
      <div className={`menu-container ${menuOpen ? "open" : ""} select-text select-none`}>
        <div className="toggler-wrapper" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="menu-label"></div>
        </div>
        <div className="menu-item-circ" onClick={() => setMenuOpen(false)}>🐱</div>
        <div className="menu-item-circ" onClick={() => setMenuOpen(false)}>🍪</div>
        <div className="menu-item-circ" onClick={() => setMenuOpen(false)}>🐦</div>
        <div className="menu-item-circ" onClick={() => setMenuOpen(false)}>🪰</div>
        <div className="menu-item-circ" onClick={() => setMenuOpen(false)}>💎</div>
        <div className="menu-item-circ" onClick={() => setMenuOpen(false)}>🍻</div>
      </div>
    </div>
  );
};

const ExpandingFlexCards = () => {
  const options = [
    {
      id: 1,
      main: "Forest",
      sub: "Majestic trees and silence",
      img: "https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
      icon: "🚶"
    },
    {
      id: 2,
      main: "Winter",
      sub: "The snowflakes' delicate fall",
      img: "https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg",
      icon: "❄️"
    },
    {
      id: 3,
      main: "Spring",
      sub: "Life blooming everywhere",
      img: "https://66.media.tumblr.com/5af3f8303456e376ceda1517553ba786/tumblr_o4986gakjh1qho82wo1_1280.jpg",
      icon: "🌲"
    },
    {
      id: 4,
      main: "Summer",
      sub: "Warm sunny days of joy",
      img: "https://66.media.tumblr.com/5516a22e0cdacaa85311ec3f8fd1e9ef/tumblr_o45jwvdsL11qho82wo1_1280.jpg",
      icon: "☀️"
    }
  ];

  const [activeOption, setActiveOption] = useState(1);
  const displayOptions = options.slice(0, 8);

  return (
    <div className="flex gap-3 w-full max-w-4xl h-[400px] overflow-hidden px-4 py-8 items-center justify-center select-none">
      <style>{`
        .preview-card {
          position: relative;
          background-size: cover;
          background-position: center;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          overflow: hidden;
          height: 100%;
          min-width: 60px;
        }
        .preview-card.closed {
          flex: 0.5;
          border-radius: 100px;
        }
        .preview-card.open {
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
        .preview-card.open .card-content {
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
        .closed-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .preview-card.open .closed-icon {
          opacity: 0;
        }
      `}</style>
      {displayOptions.map((opt) => (
        <div
          key={opt.id}
          onClick={() => setActiveOption(opt.id)}
          className={`preview-card ${activeOption === opt.id ? "open" : "closed"}`}
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("${opt.img}")` }}
        >
          <div className="closed-icon">{opt.icon}</div>
          <div className="card-content">
            <div className="card-icon-wrapper">{opt.icon}</div>
            <div className="card-info">
              <div className="card-title">{opt.main}</div>
              <div className="card-label">{opt.sub}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ComponentLivePreview = ({ id, slug }) => {
  switch (Number(id)) {
    case 1: // Primary Button
      return (
        <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition cursor-pointer select-text shadow-md">
          Primary Button
        </button>
      );

    case 2: // Glowy Button
      return (
        <div className="relative select-text select-none inline-block">
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
              font-family: "Montserrat", sans-serif;
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
          <button className="glowy-btn-custom select-text">
            <span className="btn-text">GlowyButton</span>
            <div className="btn-icon">
              <svg viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z" fill="currentColor"/>
              </svg>
            </div>
          </button>
        </div>
      );

    case 3: // Basic Card
      return (
        <div className="max-w-sm rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-6 select-text shadow-lg hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 text-foreground">
          <div className="flex items-center gap-4 mb-4 select-text">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-lg">AH</div>
            <div>
              <h3 className="text-lg font-bold text-foreground select-text">Aryan Hooda</h3>
              <p className="text-xs text-muted-foreground select-text">Full Stack Developer</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4 select-text leading-relaxed">
            Building scalable web apps with React, Node.js & MongoDB. Passionate about clean UI and high-performance backend systems.
          </p>
          <div className="flex justify-between mb-4 border-t border-border/20 pt-3 text-center select-text">
            <div>
              <h4 className="text-sm font-bold text-foreground select-text">24</h4>
              <span className="text-xs text-muted-foreground select-text">Projects</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground select-text">3+</h4>
              <span className="text-xs text-muted-foreground select-text">Years</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground select-text">1.2k</h4>
              <span className="text-xs text-muted-foreground select-text">Followers</span>
            </div>
          </div>
          <div className="flex gap-2 select-text">
            <button className="flex-1 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white rounded-md py-2 text-sm font-medium hover:opacity-90 select-text">Connect</button>
            <button className="flex-1 bg-muted/50 border border-border/40 hover:bg-muted text-foreground rounded-md py-2 text-sm font-medium transition select-text">Profile</button>
          </div>
        </div>
      );

    case 4: // Boxy Loader (boxy-rotate)
      return (
        <div className="flex flex-col items-center justify-center select-text">
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
            .pl1__g,
            .pl1__rect {
              animation: pl1-a 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
            }
            .pl1__g {
              transform-origin: 64px 64px;
            }
            .pl1__rect:first-child {
              animation-name: pl1-b;
            }
            .pl1__rect:nth-child(2) {
              animation-name: pl1-c;
            }
            @keyframes pl1-a {
              from {
                transform: rotate(0);
              }
              80%,
              to {
                animation-timing-function: steps(1, start);
                transform: rotate(90deg);
              }
            }
            @keyframes pl1-b {
              from {
                animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0);
                width: 40px;
                height: 40px;
              }
              20% {
                animation-timing-function: steps(1, start);
                width: 40px;
                height: 0;
              }
              60% {
                animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
                width: 0;
                height: 40px;
              }
              80%,
              to {
                width: 40px;
                height: 40px;
              }
            }
            @keyframes pl1-c {
              from {
                animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0);
                width: 40px;
                height: 40px;
                transform: translate(0, 48px);
              }
              20% {
                animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1);
                width: 40px;
                height: 88px;
                transform: translate(0, 0);
              }
              40% {
                animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0);
                width: 40px;
                height: 40px;
                transform: translate(0, 0);
              }
              60% {
                animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1);
                width: 88px;
                height: 40px;
                transform: translate(0, 0);
              }
              80%,
              to {
                width: 40px;
                height: 40px;
                transform: translate(48px, 0);
              }
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
                      <rect
                        className="pl1__rect"
                        rx="8"
                        ry="8"
                        width="40"
                        height="40"
                        transform="translate(0,48)"
                      />
                    </g>
                    <g className="pl1__rect-g" transform="rotate(180,44,44)">
                      <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                      <rect
                        className="pl1__rect"
                        rx="8"
                        ry="8"
                        width="40"
                        height="40"
                        transform="translate(0,48)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <g fill="hsl(343,90%,50%)" mask="url(#pl-mask)">
                <g className="pl1__g">
                  <g transform="translate(20,20) rotate(0,44,44)">
                    <g className="pl1__rect-g">
                      <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                      <rect
                        className="pl1__rect"
                        rx="8"
                        ry="8"
                        width="40"
                        height="40"
                        transform="translate(0,48)"
                      />
                    </g>
                    <g className="pl1__rect-g" transform="rotate(180,44,44)">
                      <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                      <rect
                        className="pl1__rect"
                        rx="8"
                        ry="8"
                        width="40"
                        height="40"
                        transform="translate(0,48)"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      );

    case 5: // Boxy Loader (boxy-bounce)
      return (
        <div className="flex flex-col items-center justify-center select-text">
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
            .pl2__rect,
            .pl2__rect-g {
              animation: pl2-a 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
            }
            .pl2__rect {
              animation-name: pl2-b;
            }
            .pl2__rect-g .pl2__rect {
              transform-origin: 20px 128px;
            }
            .pl2__rect-g:first-child,
            .pl2__rect-g:first-child .pl2__rect {
              animation-delay: -0.25s;
            }
            .pl2__rect-g:nth-child(2),
            .pl2__rect-g:nth-child(2) .pl2__rect {
              animation-delay: -0.125s;
            }
            .pl2__rect-g:nth-child(2) .pl2__rect {
              transform-origin: 64px 128px;
            }
            .pl2__rect-g:nth-child(3) .pl2__rect {
              transform-origin: 108px 128px;
            }
            @keyframes pl2-a {
              from,
              25%,
              66.67%,
              to {
                transform: translateY(0);
              }
              50% {
                animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0);
                transform: translateY(-80px);
              }
            }
            @keyframes pl2-b {
              from,
              to {
                animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0);
                width: 40px;
                height: 24px;
                transform: rotate(180deg) translateX(0);
              }
              33.33% {
                animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1);
                width: 20px;
                height: 64px;
                transform: rotate(180deg) translateX(10px);
              }
              66.67% {
                animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1);
                width: 28px;
                height: 44px;
                transform: rotate(180deg) translateX(6px);
              }
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
                <g className="pl2__rect-g">
                  <rect className="pl2__rect" rx="8" ry="8" x="0" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
                  <rect className="pl2__rect" rx="8" ry="8" x="44" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
                  <rect className="pl2__rect" rx="8" ry="8" x="88" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
              </g>

              <g fill="hsl(283,90%,50%)" mask="url(#pl-mask)">
                <g className="pl2__rect-g">
                  <rect className="pl2__rect" rx="8" ry="8" x="0" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
                  <rect className="pl2__rect" rx="8" ry="8" x="44" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
                  <rect className="pl2__rect" rx="8" ry="8" x="88" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      );

    case 6: // Boxy Loader (boxy-shift)
      return (
        <div className="flex flex-col items-center justify-center select-text">
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
              from {
                transform: translate(64px, 0);
                width: 64px;
                height: 64px;
              }
              25% {
                transform: translate(0, 0);
                width: 128px;
                height: 32px;
              }
              50% {
                transform: translate(0, 0);
                width: 64px;
                height: 64px;
              }
              75% {
                transform: translate(0, 0);
                width: 32px;
                height: 128px;
              }
              to {
                transform: translate(0, 64px);
                width: 64px;
                height: 64px;
              }
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

    case 7: // Typography System
      return (
        <div className="max-w-2xl w-full flex flex-col gap-8 p-4 select-text">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-blue-500">Semantic Headings</Label>
            <Heading variant="h1">Heading 1</Heading>
            <Heading variant="h2">Heading 2</Heading>
            <Heading variant="h3">Heading 3</Heading>
          </div>

          <div className="space-y-4">
            <Label className="text-xs uppercase tracking-widest text-blue-500">Text Variants</Label>
            <Text variant="lead">
              This is a lead paragraph. It{"'"}s designed to stand out and draw the reader in.
            </Text>
            <Text>
              This is the default body text. It follows standard leading and spacing rules for optimal readability across various devices and screen sizes.
            </Text>
            <Text variant="muted">
              This is muted text, perfect for secondary information or legal disclaimers.
            </Text>
            <Text variant="blockquote">
              {"\""}Typography is the craft of endowing human language with a durable visual form.{"\""}
            </Text>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-blue-500">Inline Elements</Label>
            <div className="flex items-center gap-4">
              <Label>A standard label</Label>
              <Code>npm install futureuikit</Code>
            </div>
          </div>
        </div>
      );

    case 8: // Carousel Slider
      return <CarouselSlider />;

    case 9: // NavMenu
      return <NavMenu />;

    case 10: // Feedback Page
      return (
        <div className="text-center select-text max-w-md select-none">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
            .error-neon-container {
              font-family: 'Monoton', cursive;
              text-align: center;
              text-transform: uppercase;
              font-size: 60px;
              color: red;
              text-shadow: 0 0 80px red, 0 0 30px FireBrick, 0 0 6px DarkRed;
              line-height: 1;
              cursor: pointer;
            }
            .error-neon-container p {
              margin: 10px;
            }
            .neon-error {
              color: #fff;
              text-shadow: 0 0 80px #ffffff, 0 0 30px #008000, 0 0 6px #0000ff;
            }
            .neon-error span {
              animation: upper 6s linear infinite;
            }
            .neon-code span:nth-of-type(2) {
              animation: lower 9s linear infinite;
            }
            .neon-code span:nth-of-type(1) {
              text-shadow: none;
              opacity: 0.4;
            }
            .error-neon-container:hover .neon-error {
              text-shadow: 0 0 200px #ffffff, 0 0 80px #008000, 0 0 6px #0000ff;
            }
            .error-neon-container:hover .neon-code {
              text-shadow: 0 0 100px red, 0 0 40px FireBrick, 0 0 8px DarkRed;
            }
            @keyframes upper {
              0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
                opacity: 0.99;
                text-shadow: 0 0 80px #ffffff, 0 0 30px #008000, 0 0 6px #0000ff;
              }
              20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
                opacity: 0.4;
                text-shadow: none;
              }
            }
            @keyframes lower {
              0%, 12%, 18.999%, 23%, 31.999%, 37%, 44.999%, 46%, 49.999%, 51%, 58.999%, 61%, 68.999%, 71%, 85.999%, 96%, 100% {
                opacity: 0.99;
                text-shadow: 0 0 80px red, 0 0 30px FireBrick, 0 0 6px DarkRed;
              }
              19%, 22.99%, 32%, 36.999%, 45%, 45.999%, 50%, 50.99%, 59%, 60.999%, 69%, 70.999%, 86%, 95.999% {
                opacity: 0.4;
                text-shadow: none;
              }
            }
          `}</style>
          <div className="error-neon-container select-text select-none">
            <p className="neon-error select-text select-none">E<span>R</span>ROR</p>
            <p className="neon-code select-text select-none">4<span>0</span><span>4</span></p>
          </div>
        </div>
      );

    case 11: // Expanding Flex Card
      return <ExpandingFlexCards />;

    case 12: // Basic Loader
      return (
        <div className="flex flex-col justify-center items-center gap-4 select-text select-none">
          <style>{`
            .loading-spinner {
              width: 50px;
              height: 50px;
              border: 6px solid #ccc;
              border-top-color: #3498db;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
          <div className="loading-spinner"></div>
          <p className="text-base text-muted-foreground select-text animate-pulse">Loading, please wait...</p>
        </div>
      );

    default:
      return (
        <div className="text-center select-text">
          Live Next.js Preview for {slug}
        </div>
      );
  }
};

const ComponentDetail = ({ type, slug, id }) => {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const component = componentsList.find(
    (item) =>
      item.id === Number(id) &&
      item.type.toLowerCase() === type &&
      item.slug === slug
  );

  if (!component) {
    notFound();
  }

  const registryComponent = registry[slug];
  const reusableCode = registryComponent?.files[0]?.content || "";
  const cliCommand = `npx futureuikit add ${slug}`;
  const htmlCode = component?.codes?.html || "";
  const cssCode = component?.codes?.css || "";
  const nextUsage = component?.codes?.next || component?.codes?.react || "";

  const availableCodes = [];
  if (cliCommand) availableCodes.push({ key: "cli", label: "CLI", code: cliCommand, lang: "bash" });
  if (reusableCode) availableCodes.push({ key: "manual", label: "Manual", code: reusableCode, lang: "javascript" });
  if (nextUsage) availableCodes.push({ key: "usage", label: "Usage", code: nextUsage, lang: "javascript" });
  if (htmlCode) availableCodes.push({ key: "html", label: "HTML", code: htmlCode, lang: "html" });
  if (cssCode) availableCodes.push({ key: "css", label: "CSS", code: cssCode, lang: "css" });

  const [activeCode, setActiveCode] = useState(availableCodes[0]?.key || "cli");

  const activeCodeData = availableCodes.find(c => c.key === activeCode) || availableCodes[0];

  const codeToShow = activeCodeData?.code || "";
  const langToShow = activeCodeData?.lang || "javascript";

  return (
    <div className="select-none min-h-screen flex justify-center text-foreground pt-16 md:pt-24">
      <PillHeader />
      <div className="relative flex-1 w-full max-w-5xl transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="mb-4 rounded-xl border border-border bg-card/40 backdrop-blur p-4 md:p-6 shadow-sm">
            <div className="mb-4 pb-4 border-b flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="h-9 w-9 shrink-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight line-clamp-1">
                {component.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-base md:text-lg">
              {component.description}
            </p>
          </div>

          <section className="mb-4">
            <div className="rounded-xl overflow-hidden border border-border bg-card/40 backdrop-blur-md p-2 md:p-6 shadow-sm">
              <div className="flex justify-center items-center rounded-lg overflow-hidden bg-card/30 backdrop-blur-lg border border-border/40 w-full min-h-[300px] md:min-h-[450px] mb-4 relative select-text shadow-inner">
                <div className="w-full h-full flex items-center justify-center p-4">
                  <ComponentLivePreview id={id} slug={slug} />
                </div>
              </div>

              {/* Code Section */}
              <div className="relative rounded-lg border border-border/50 bg-card/10 backdrop-blur-md p-3 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <CodeIcon size={24} className="text-primary" />
                    <span className="text-sm uppercase tracking-wider">Source</span>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
                      {availableCodes.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setActiveCode(item.key)}
                          className={`whitespace-nowrap px-3 py-1.5 rounded-md text-[10px] md:text-xs font-medium transition ${activeCode === item.key
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-muted text-muted-foreground hover:bg-muted/70"
                            }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Copy */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(codeToShow);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      className="shrink-0 text-xs p-2 rounded-md bg-muted hover:bg-muted/90 transition border border-border/50"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                <div className="rounded-lg bg-[#1e1e1e] border border-zinc-800 backdrop-blur-md overflow-hidden">
                  <SyntaxHighlighter
                    className="select-text cursor-text max-h-[500px] overflow-auto overflow-x-hidden rounded-lg"
                    language={langToShow}
                    style={vscDarkPlus}
                    customStyle={{
                      background: "transparent",
                      padding: "1rem",
                      borderRadius: "0.75rem",
                      fontSize: "0.95rem",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      border: "none",
                    }}
                    codeTagProps={{
                      style: {
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      },
                    }}
                  >
                    {codeToShow}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-1 md:mb-2">
            <div className="rounded-md border border-border bg-card/40 backdrop-blur p-2 md:p-6 shadow">
              <div className="flex gap-2 items-center text-2xl font-semibold mb-2 pb-2 border-b">
                <ListCollapse className="text-red-600" /> Details
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {component.details}
              </p>
            </div>
          </section>

          <section className="mb-1 md:mb-2">
            <div className="rounded-md border border-border bg-card/40 backdrop-blur p-2 md:p-6 shadow">
              <div className="flex gap-2 items-center text-2xl font-semibold mb-2 pb-2 border-b">
                <GalleryHorizontalEnd className="text-blue-600" /> How to Use?
              </div>
              <ul className="space-y-3 list-decimal pl-5 text-muted-foreground">
                {component.usage.map((step, i) => (
                  <li key={i} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetail;
