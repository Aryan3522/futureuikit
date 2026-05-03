"use client";

import { PillHeader } from "@/components/ui/PillHeader";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Comps from "@/components/Comps";
import Blogs from "@/components/Blogs";
import Credits from "@/components/Credits";
import { HomePageLayout } from "@/components/HomePageLayout";
import GlassPortfolioCard from "@/components/ui/GlassPortfolioCard";
import { HeroWithScales } from "@/components/HeroWithScales";

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
        {/* <About />
        <Projects />
        <Skills />
        <ExploreComponents />
        <ExploreBlogs />
        <Contact /> */}
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
