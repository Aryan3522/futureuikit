"use client";

import { PillHeader } from "@/components/ui/PillHeader";
import React from "react";

// Note: These components were missing in the workspace.
// Placeholders provided to ensure TypeScript compilation.
const Hero = () => <div>Hero Placeholder</div>;
const Footer = () => <div>Footer Placeholder</div>;
const Comps = () => <div>Comps Placeholder</div>;
const Blogs = () => <div>Blogs Placeholder</div>;
const Credits = () => <div>Credits Placeholder</div>;
const HomePageLayout = () => <div>HomePageLayout Placeholder</div>;
const GlassPortfolioCard = () => <div>GlassPortfolioCard Placeholder</div>;
const HeroWithScales = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export function HomePage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground pt-24">
      <PillHeader />
      <main>
        <Hero />
        <HeroWithScales>
          <HomePageLayout />
          <GlassPortfolioCard />
        </HeroWithScales>
      </main>
      <Footer />
    </div>
  );
}

export function ComponentPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground pt-24">
      <PillHeader />
      <main>
        <Comps />
      </main>
    </div>
  );
}

export function BlogsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground pt-24">
      <PillHeader />
      <HeroWithScales>
        <Blogs />
        <GlassPortfolioCard />
      </HeroWithScales>
      <Footer />
    </div>
  );
}

export function CreditsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground pt-24">
      <PillHeader />
      <main className="flex-1">
        <Credits />
      </main>
      <Footer />
    </div>
  );
}
