"use client"
import React from "react";
import Comps from "@/components/Comps";
import { Header } from "@/components/ui/header";

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
