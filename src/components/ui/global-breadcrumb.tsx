"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { componentsList } from "@/data/component-library-data";

import { getCategoryUrl } from "@/lib/utils";

function BreadcrumbInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!pathname.startsWith("/docs") && !pathname.startsWith("/components")) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const crumbs: React.ReactNode[] = [];

  crumbs.push(
    <Link key="docs" href="/docs" className="hover:text-foreground transition-colors">
      Docs
    </Link>
  );

  if (segments[0] === "components") {
    crumbs.push(
      <Link key="components" href="/components" className="hover:text-foreground transition-colors">
        Components
      </Link>
    );

    if (segments.length >= 3) {
      const slug = segments[2];
      const component = componentsList.find(c => c.slug === slug);
      
      const exactCategory = component ? component.type : segments[1];

      crumbs.push(
        <Link key="category" href={getCategoryUrl(exactCategory)} className="hover:text-foreground transition-colors capitalize">
          {exactCategory}
        </Link>
      );
      
      crumbs.push(
        <span key="name" className="text-foreground">
          {component ? component.title : slug.replace(/-/g, " ")}
        </span>
      );
    } else {
      const categoryParam = searchParams.get("category");
      if (categoryParam) {
        crumbs.push(
          <span key="category" className="text-foreground capitalize">{categoryParam}</span>
        );
      }
    }
  }

  return (
    <nav className="mb-8 flex items-center text-sm font-medium text-muted-foreground whitespace-nowrap overflow-x-auto scrollbar-hide">
      {crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2 shrink-0 opacity-50" />}
          {crumb}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function GlobalBreadcrumb() {
  return (
    <Suspense fallback={null}>
      <BreadcrumbInner />
    </Suspense>
  );
}
