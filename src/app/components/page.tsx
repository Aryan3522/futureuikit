"use client"
import Comps from "@/components/Comps";
import { Header } from "@/components/ui/header";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Header />
      <main>
        <Comps />
      </main>
    </div>
  );
}
