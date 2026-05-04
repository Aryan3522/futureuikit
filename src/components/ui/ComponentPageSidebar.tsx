"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import {
    MousePointerClick,
    Square,
    Type,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Home,
    Moon,
    Sun,
    GalleryHorizontal,
    Navigation,
    MessageSquare,
    Compass,
    Newspaper,
    type LucideIcon,
} from "lucide-react";

interface SidebarItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const sidebarItems: SidebarItem[] = [
    { label: "Home", to: "/", icon: Home },
    { label: "Insights", to: "/blogs", icon: Newspaper },
    { label: "Discover UI", to: "/components", icon: Compass },
    { label: "Buttons", to: "/components/buttons", icon: MousePointerClick },
    { label: "Cards", to: "/components/cards", icon: Square },
    { label: "Typography", to: "/components/typography", icon: Type },
    { label: "Loaders", to: "/components/loaders", icon: Loader2 },
    { label: "Carousels", to: "/components/carousels", icon: GalleryHorizontal },
    { label: "Navigation", to: "/components/menu", icon: Navigation },
    { label: "Feedback", to: "/components/feedback", icon: MessageSquare },
];

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

interface ComponentPageSidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComponentPageSidebar: React.FC<ComponentPageSidebarProps> = ({ open, setOpen }) => {
    const { theme, toggleTheme } = useTheme() as { theme: string; toggleTheme: () => void };
    const pathname = usePathname();
    return (
        <aside
            className={`fixed left-0 top-0 z-[9999] h-screen ${open ? "w-64" : "w-16"
                } bg-white/60 dark:bg-black/10 backdrop-blur-xl border-r border-border shadow-lg transition-all duration-300`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4">
                {open && (
                    <motion.div
                        className="overflow-hidden flex items-center justify-center cursor-pointer"
                    >
                        <motion.div
                            className="w-8 h-8 bg-primary rounded-md overflow-hidden flex items-center justify-center cursor-pointer"
                        >
                            <button onClick={scrollToTop} aria-label="Logo">
                                <Image
                                    src="/Images/FUI.webp"
                                    alt="Logo"
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        </motion.div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="w-9 h-9 p-0 hover:bg-transparent md:hover:bg-subtle"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </Button>
                    </motion.div>
                )}

                <button
                    onClick={() => setOpen((v) => !v)}
                    className="ml-auto rounded-md p-1 hover:bg-muted transition"
                    aria-label="Toggle Sidebar"
                >
                    {open ? (
                        <ChevronLeft className="h-5 w-5" />
                    ) : (
                        <ChevronRight className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 px-2">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                        pathname === item.to ||
                        (item.to !== "/" && pathname.startsWith(item.to));
                    return (
                        <Link
                            key={item.label}
                            href={item.to}
                            title={!open ? item.label : undefined}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors ${open ? "justify-start" : "justify-center"
                                }
                                ${isActive ? "bg-primary hover:bg-primary/80 text-primary-foreground hover:text-primary-foreground" : ""}`}
                        >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            {open && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default ComponentPageSidebar;
