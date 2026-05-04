"use client";

import React, { useState } from "react";
import { componentsList } from "@/data/component-library-data";
import ComponentsGrid from "@/components/ui/ComponentsGrid";

const Comps: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filterButtons = ["All", ...Array.from(new Set(componentsList.map((l) => l.type)))];
  const filteredComponents =
    selectedCategory === "All"
      ? componentsList
      : componentsList.filter((item) => item.type === selectedCategory);

  return (
    <div className="select-none min-h-screen flex justify-center pt-24">
      <main
        className="relative flex-1 max-w-7xl p-4 md:p-8"
      >
        <h1 className="text-3xl font-bold">Components</h1>
        <p className="text-muted-foreground">
          Explore and preview reusable UI components. Use the category filters below to browse different component types.
        </p>
        <div className="mt-4 w-full">
          <div className="flex flex-nowrap gap-1 mb-4 overflow-x-auto scrollbar-none pb-2 w-full max-w-full min-w-0">
            {filterButtons.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1.5 rounded-md text-sm ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent border text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <ComponentsGrid items={filteredComponents} />
        </div>
      </main>
    </div>
  );
};

export default Comps;
