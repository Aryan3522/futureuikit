"use client";

import React, { useState, useEffect } from "react";
import ComponentPageSidebar from "@/components/ui/ComponentPageSidebar";
import ComponentsGrid from "@/components/ui/ComponentsGrid";
import { componentsList } from "@/data/component-library-data";

const CompsLoaders = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
      const savedValue = localStorage.getItem("isOpen");
      if (savedValue !== null) {
        setOpen(JSON.parse(savedValue));
      }
    }, 0);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("isOpen", JSON.stringify(open));
    }
  }, [open, isMounted]);

  const filteredComponents = componentsList.filter(
    (item) => item.type === "Loader"
  );

  return (
    <div className="select-none min-h-screen flex">
      <ComponentPageSidebar open={open} setOpen={setOpen} />

      <main
        className={`relative flex-1 w-full p-2 md:p-8 transition-all duration-300 ml-16 ${
          open ? "md:ml-64" : "md:ml-16"
        }`}
      >
        <h1 className="text-3xl font-bold">Loaders</h1>
        <p className="text-muted-foreground">
          Explore Modern and reusable Loading Animations!
        </p>
        <div className="mt-4">
          <ComponentsGrid items={filteredComponents} />
        </div>
      </main>
    </div>
  );
};

export default CompsLoaders;
