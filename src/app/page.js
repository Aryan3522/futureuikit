import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PillHeader } from "@/components/ui/PillHeader";
import ExploreComponents from "@/components/ExploreComponents";
import { Code2, Zap, Palette, ShieldCheck, Rocket, Layout } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans pt-20">
      <PillHeader />

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-24 pb-20 md:pt-40 md:pb-32 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 border border-primary/20 backdrop-blur-md">
          <Zap size={14} className="fill-primary" />
          The Evolution of UI Design
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent italic leading-[0.9]">
          NEXT-GEN <br /> COMPONENTS.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          A premium collection of high-performance, accessible, and stunningly modern UI components designed to accelerate your Next.js workflow.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/components">
            <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold italic shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all">
              Launch Components
            </Button>
          </Link>
          <Link href="https://github.com/Aryan3522/future-ui" target="_blank">
            <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg font-bold italic border-primary/20 hover:bg-primary/5">
              Source Code
            </Button>
          </Link>
        </div>
      </header>

      {/* Value Proposition */}
      <section className="container mx-auto px-4 py-24 border-y border-border/40 bg-background/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-6 italic tracking-tight">WHY FUTURE UI?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Future UI isn&apos;t just another component library. It&apos;s a design system focused on motion, 
            depth, and professional aesthetics that helps you stand out in a crowded digital space.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold italic">Blightly Fast</h3>
            <p className="text-muted-foreground leading-relaxed">
              Engineered with zero-runtime CSS and optimized for Next.js 15, ensuring your applications stay lightning-fast.
            </p>
          </div>
          
          <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Palette size={24} />
            </div>
            <h3 className="text-2xl font-bold italic">Customizable</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every component is styled with Tailwind CSS, making it trivial to adapt to your specific brand identity and design tokens.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-2xl font-bold italic">Accessible</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built with semantic HTML and ARIA standards in mind, ensuring your UI is usable by everyone, everywhere.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Code2 size={24} />
            </div>
            <h3 className="text-2xl font-bold italic">Developer First</h3>
            <p className="text-muted-foreground leading-relaxed">
              Copy-paste or CLI installation. No complex configuration or bloated dependencies. Just code that works.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Layout size={24} />
            </div>
            <h3 className="text-2xl font-bold italic">Production Ready</h3>
            <p className="text-muted-foreground leading-relaxed">
              Battle-tested components that handle edge cases, responsiveness, and dark mode out of the box.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Rocket size={24} />
            </div>
            <h3 className="text-2xl font-bold italic">Motion Driven</h3>
            <p className="text-muted-foreground leading-relaxed">
              Integrated with Framer Motion for smooth, organic transitions that give your UI a premium, living feel.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Showcase */}
      <section className="py-24 bg-card/10 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">EXPLORE THE LIBRARY.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Browse our collection of interactive components. From buttons to complex carousels, 
                everything you need to build faster is right here.
              </p>
            </div>
            <Link href="/components">
              <Button variant="outline" className="rounded-full px-8 h-12 font-bold italic">View All Components</Button>
            </Link>
          </div>
          
          <ExploreComponents />
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto p-12 md:p-24 rounded-[3rem] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">READY TO BUILD?</h2>
            <p className="text-xl md:text-2xl mb-12 text-primary-foreground/80 leading-relaxed font-medium">
              Start your next project with Future UI and experience the difference in speed and design quality.
            </p>
            <Link href="/components">
              <Button size="lg" variant="secondary" className="rounded-full px-12 h-16 text-xl font-bold italic shadow-xl hover:scale-105 transition-all">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-16 border-t border-border/40">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black italic">F</div>
            <span className="text-2xl font-black italic tracking-tighter">FUTURE UI</span>
          </div>
          
          <div className="flex gap-12">
            <Link href="/components" className="text-muted-foreground hover:text-foreground transition-colors font-bold italic">Components</Link>
            <Link href="https://github.com/Aryan3522" className="text-muted-foreground hover:text-foreground transition-colors font-bold italic">GitHub</Link>
            <Link href="https://www.linkedin.com/in/aryan-hooda-code/" className="text-muted-foreground hover:text-foreground transition-colors font-bold italic">Connect</Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            � 2026 Future UI. Built with ?? by Aryan Hooda.
          </p>
        </div>
      </footer>
    </div>
  );
}
