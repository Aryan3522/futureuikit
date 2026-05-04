"use client";

import React from "react";
import { notFound } from "next/navigation";
import { compsCategory } from "@/route-components/componentsCategoryData";
import { PillHeader } from "@/components/ui/PillHeader";

interface ComponentsCategoryPageProps {
  category: string;
}

const ComponentsCategoryPage: React.FC<ComponentsCategoryPageProps> = ({ category }) => {
  const current = compsCategory.find(
    (item) => item.slug === category
  );

  if (!current) {
    notFound();
  }

  const CategoryComponent = current.component;

  return (
    <div className="min-h-screen text-foreground pt-24">
      <PillHeader />
      <main>
        <CategoryComponent />
      </main>
    </div>
  );
};

export default ComponentsCategoryPage;
