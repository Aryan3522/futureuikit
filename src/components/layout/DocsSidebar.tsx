"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { componentsList } from "@/data/component-library-data";
import { cn } from "@/lib/utils";

const TOP_PICKS = ["nexus-card", "glass-panel", "glowy", "cinematic-error", "browser-window", "noir-hero-3d"];

const SIDEBAR_NAV = [
  {
    title: "LIBRARY",
    links: [
      { id: "components", label: "Components Directory" }
    ]
  },
  {
    title: "INTRODUCTION",
    links: [
      { id: "getting-started", label: "Getting Started" },
      { id: "installation", label: "Installation" },
      { id: "philosophy", label: "Core Philosophy" },
    ]
  },
  {
    title: "SYSTEM",
    links: [
      { id: "theming", label: "Theming" },
      { id: "typography", label: "Typography" },
      { id: "colors", label: "Color Palette" },
    ]
  }
];

import { getCategoryUrl } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "components";
  const currentCategory = searchParams.get("category");

  const componentCategories = useMemo(() => {
    return Array.from(new Set(componentsList.map((l) => l.type))).sort();
  }, []);

  const topPicksComponents = useMemo(() => {
    return componentsList.filter(c => TOP_PICKS.includes(c.slug));
  }, []);

  const newArrivalsComponents = useMemo(() => {
    return componentsList.filter(c => c.isNew);
  }, []);

  // Determine if a component link is active
  const isComponentActive = (type: string, slug: string, id: string | number) => {
    return pathname === `/components/${type.toLowerCase()}/${slug}/${id}`;
  };

  const isNavActive = (id: string) => {
    return pathname === "/components" && currentTab === id && !currentCategory;
  };

  const isCategoryActive = (cat: string) => {
    return pathname === "/components" && currentTab === "components" && currentCategory === cat;
  };

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto overflow-x-hidden scrollbar-hide py-8 px-4 border-r border-border/40">
      <div className="space-y-8 pb-16">
        {SIDEBAR_NAV.map((section, idx) => (
          <div key={idx}>
            <h4 className="font-semibold text-sm text-foreground mb-3">{section.title}</h4>
            <ul className="space-y-1">
              {section.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link 
                    href={`/components?tab=${link.id}`}
                    className={cn(
                      "transition-colors py-1.5 px-2 block text-sm w-full rounded-md",
                      isNavActive(link.id) 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Top Picks */}
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">TOP PICKS ✨</h4>
          <ul className="space-y-1">
            {topPicksComponents.map((item, idx) => (
              <li key={idx}>
                <Link 
                  href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                  className={cn(
                    "transition-colors py-1.5 px-2 block text-sm w-full rounded-md",
                    isComponentActive(item.type, item.slug, item.id)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* New Arrivals */}
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">NEW ARRIVALS 🚀</h4>
          <ul className="space-y-1">
            {newArrivalsComponents.map((item, idx) => (
              <li key={idx}>
                <Link 
                  href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                  className={cn(
                    "transition-colors py-1.5 px-2 block text-sm w-full rounded-md",
                    isComponentActive(item.type, item.slug, item.id)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Categories */}
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">CATEGORIES</h4>
          <ul className="space-y-1">
            {componentCategories.map((cat, cIdx) => (
              <li key={cIdx}>
                <Link 
                  href={getCategoryUrl(cat)}
                  className={cn(
                    "transition-colors py-1.5 px-2 block text-sm w-full rounded-md",
                    isCategoryActive(cat)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
