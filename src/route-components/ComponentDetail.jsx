"use client";

import React, { useState, useMemo, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { componentsList } from "@/data/component-library-data";
import { registry } from "@/data/component-library-data";
import ComponentPageSidebar from "@/components/ui/ComponentPageSidebar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Code as CodeIcon, Copy, GalleryHorizontalEnd, ListCollapse, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    { id: 1, tag: "EXPLORE", title: "EXOTIC ADVENTURE", location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1556206079-747a7a424d3d?ixlib=rb-4.0.3&q=80", tagBg: "bg-indigo-600" },
    { id: 2, tag: "CITY", title: "URBAN EXPLORER", location: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1571900670723-a317a66e3fb7?ixlib=rb-4.0.3&q=80", tagBg: "bg-emerald-600" },
    { id: 3, tag: "HISTORY", title: "MAJESTIC PARIS", location: "Paris, France", image: "https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&q=80", tagBg: "bg-amber-600" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 500 : -500, opacity: 0, scale: 1.1 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 500 : -500, opacity: 0, scale: 0.9 }),
  };

  return (
    <div 
      className="group relative w-full max-w-4xl mx-auto h-[400px] overflow-hidden rounded-3xl bg-black shadow-2xl select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%), url("${slides[currentIndex].image}")` }}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col gap-2">
              <span className={cn("inline-block self-start px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest", slides[currentIndex].tagBg)}>
                {slides[currentIndex].tag}
              </span>
              <h2 className="text-3xl md:text-5xl font-black italic uppercase leading-none tracking-tighter">
                {slides[currentIndex].title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-white/70 font-bold italic uppercase">
                <MapPin size={14} className="text-primary" /> {slides[currentIndex].location}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-4 pointer-events-none">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevSlide} className="pointer-events-auto p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white">
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextSlide} className="pointer-events-auto p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white">
          <ChevronRight size={20} />
        </motion.button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }} className="relative h-1 rounded-full bg-white/20 overflow-hidden" style={{ width: currentIndex === idx ? "24px" : "6px" }}>
            {currentIndex === idx && <motion.div layoutId="activeDot" className="absolute inset-0 bg-white" />}
          </button>
        ))}
      </div>
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

const PreviewButton = ({ variant = "primary", mode = "modern", color, children, disabled, icon: Icon, ...props }) => {
  const intentColors = {
    primary: "#2563eb",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#06b6d4",
    secondary: "#64748b",
  };

  const finalColor = color || intentColors[variant] || intentColors.primary;

  const getVariantStyles = () => {
    const baseStyles = { borderRadius: "6px" };
    switch (mode) {
      case "modern":
        return { ...baseStyles, background: finalColor, color: "#ffffff", border: "none" };
      case "clean":
        return { ...baseStyles, background: finalColor, color: "#ffffff", border: "none" };
      case "minimal":
        return { ...baseStyles, background: "transparent", color: finalColor, border: `1px solid ${finalColor}` };
      default:
        return { ...baseStyles, background: finalColor, color: "#ffffff", border: "none" };
    }
  };

  const modeClasses = {
    modern: "relative overflow-hidden px-5 py-2 rounded-md font-semibold tracking-wide text-xs",
    clean: "px-4 py-1.5 rounded-md font-medium text-xs",
    minimal: "px-4 py-1.5 rounded-md font-medium hover:bg-opacity-10 text-xs",
  };

  return (
    <motion.button
      whileHover={!disabled ? { 
        scale: 1.05,
        filter: mode === "minimal" ? "brightness(0.95)" : "brightness(1.1)",
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 cursor-pointer select-none transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        modeClasses[mode] || modeClasses.modern
      )}
      style={getVariantStyles()}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {Icon && (
        <motion.div animate={disabled ? {} : { x: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <Icon size={14} />
        </motion.div>
      )}
      {mode === "modern" && !disabled && (
        <motion.div
          className="absolute inset-0 z-0 bg-white/10"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
};

const PreviewGlowyButton = ({ variant = "primary", mode = "modern", children, disabled, icon: Icon = ArrowRight }) => {
  const intentColors = {
    primary: { base: "#00afaf", glow: "rgba(0, 175, 175, 0.5)" },
    success: { base: "#10b981", glow: "rgba(16, 185, 129, 0.5)" },
    warning: { base: "#f59e0b", glow: "rgba(245, 158, 11, 0.5)" },
    danger: { base: "#ef4444", glow: "rgba(239, 68, 68, 0.5)" },
    info: { base: "#06b6d4", glow: "rgba(6, 182, 212, 0.5)" },
    secondary: { base: "#64748b", glow: "rgba(100, 116, 139, 0.5)" },
  };

  const theme = intentColors[variant] || intentColors.primary;
  
  return (
    <div className="relative select-none inline-block">
      <style>{`
        .p-glowy-${variant} {
          --color: ${theme.base};
          --glow: ${theme.glow};
          position: relative;
          min-width: 100px;
          height: 36px;
          padding: 0 1rem;
          border-radius: 6px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          border: none;
          font-weight: 600;
          font-size: 11px;
          color: white;
          background: rgb(15 23 42 / 0.9);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 400ms ease;
        }
        .p-glowy-${variant}:hover {
          background: rgb(15 23 42 / 1);
          box-shadow: 0 0 15px var(--glow), inset 0 0 8px -5px var(--color);
          transform: translateY(-1px);
        }
        .p-glowy-${variant}.m-minimal {
          background: transparent;
          box-shadow: 0 0 0 1px var(--color);
          color: var(--color);
        }
        .p-glowy-${variant}.m-clean {
          background: var(--color);
          box-shadow: none;
        }
      `}</style>
      <button className={cn(`p-glowy-${variant}`, mode !== "modern" && `m-${mode}`)}>
        {children}
        {Icon && <Icon size={12} />}
      </button>
    </div>
  );
};

const PreviewCard = ({ variant, color, name, title }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "modern": return "bg-card/40 backdrop-blur-xl border-white/10";
      case "clean": return "bg-card border-border";
      case "minimal": return "bg-transparent border-border/50";
      default: return "bg-card/60 backdrop-blur-md border-border/40";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn("max-w-[280px] w-full rounded-2xl border p-5 transition-all duration-300 text-foreground cursor-pointer", getVariantStyles())}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>AH</div>
        <div className="overflow-hidden">
          <h3 className="text-sm font-bold tracking-tight truncate">{name}</h3>
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider truncate">{title}</p>
        </div>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground mb-4 line-clamp-2">Building scalable web apps with modern technologies.</p>
      <div className="flex gap-2">
        <button className="flex-1 rounded-lg py-1.5 text-[10px] font-bold text-white cursor-pointer" style={{ background: color }}>Connect</button>
        <button className="flex-1 border border-border/40 rounded-lg py-1.5 text-[10px] font-bold text-foreground cursor-pointer">Profile</button>
      </div>
    </motion.div>
  );
};

const PreviewLoader = ({ variant, color, text }) => {
  const getLoader = () => {
    switch (variant) {
      case "modern":
        return (
          <div className="relative w-10 h-10">
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-solid border-transparent" 
              style={{ borderTopColor: color }} 
              animate={{ rotate: 360 }} 
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
            />
            <motion.div 
              className="absolute inset-1 rounded-full border-2 border-solid border-transparent opacity-50" 
              style={{ borderBottomColor: color }} 
              animate={{ rotate: -360 }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} 
            />
          </div>
        );
      case "clean":
        return (
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={i} 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: color }} 
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} 
              />
            ))}
          </div>
        );
      case "minimal":
        return (
          <motion.div 
            className="w-6 h-6 rounded-full border-2 border-solid border-transparent" 
            style={{ borderTopColor: color }} 
            animate={{ rotate: 360 }} 
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} 
          />
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {getLoader()}
      {text && <p className="text-[10px] font-medium text-muted-foreground tracking-wide animate-pulse">{text}</p>}
    </div>
  );
};

const ComponentLivePreview = ({ id, slug }) => {
  switch (Number(id)) {
    case 1: // Primary Button
      return (
        <div className="flex flex-col gap-8 w-full max-w-4xl p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-items-center">
            <PreviewButton variant="primary">Primary</PreviewButton>
            <PreviewButton variant="success">Success</PreviewButton>
            <PreviewButton variant="warning">Warning</PreviewButton>
            <PreviewButton variant="danger">Danger</PreviewButton>
            <PreviewButton variant="info">Info</PreviewButton>
            <PreviewButton variant="secondary">Secondary</PreviewButton>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-items-center border-t border-border/20 pt-8">
            <PreviewButton variant="primary" mode="modern">Modern</PreviewButton>
            <PreviewButton variant="success" mode="clean">Clean Success</PreviewButton>
            <PreviewButton variant="danger" mode="minimal">Minimal Danger</PreviewButton>
            <PreviewButton variant="primary" disabled>Disabled</PreviewButton>
          </div>
        </div>
      );

    case 2: // Glowy Button
      return (
        <div className="flex flex-col gap-8 w-full max-w-4xl p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-items-center">
            <PreviewGlowyButton variant="primary">Primary</PreviewGlowyButton>
            <PreviewGlowyButton variant="success">Success</PreviewGlowyButton>
            <PreviewGlowyButton variant="warning">Warning</PreviewGlowyButton>
            <PreviewGlowyButton variant="danger">Danger</PreviewGlowyButton>
            <PreviewGlowyButton variant="info">Info</PreviewGlowyButton>
            <PreviewGlowyButton variant="secondary">Secondary</PreviewGlowyButton>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-items-center border-t border-border/20 pt-8">
            <PreviewGlowyButton variant="primary" mode="modern">Modern Glow</PreviewGlowyButton>
            <PreviewGlowyButton variant="success" mode="clean">Clean Glow</PreviewGlowyButton>
            <PreviewGlowyButton variant="danger" mode="minimal">Minimal Glow</PreviewGlowyButton>
            <PreviewGlowyButton variant="primary" disabled>Disabled</PreviewGlowyButton>
          </div>
        </div>
      );

    case 3: // Basic Card
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 w-full justify-items-center">
          <PreviewCard variant="modern" color="#6366f1" name="Aryan Hooda" title="Full Stack Developer" />
          <PreviewCard variant="clean" color="#10b981" name="John Doe" title="Product Designer" />
          <PreviewCard variant="minimal" color="#f59e0b" name="Sarah Smith" title="UI Engineer" />
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 p-8 w-full max-w-2xl items-center justify-items-center">
          <PreviewLoader variant="modern" color="#3b82f6" text="Modern..." />
          <PreviewLoader variant="clean" color="#10b981" text="Clean..." />
          <PreviewLoader variant="minimal" color="#f59e0b" text="Minimal..." />
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
