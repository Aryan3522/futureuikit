"use client"
import Comps from "@/components/Comps";
import { PillHeader } from "@/components/ui/PillHeader";

export default function Page() {
  return (
    <div className="min-h-screen bg-transparent text-foreground pt-24">
      <PillHeader />
      <main>
        <Comps />
      </main>
    </div>
  );
}
