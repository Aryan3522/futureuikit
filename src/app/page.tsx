import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import ExploreComponents from "@/components/ExploreComponents";
import { Code2, Zap, Palette, ShieldCheck, Rocket, Layout, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { DotBackground } from "@/components/ui/dot-background";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <header className="w-full h-screen flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-8 border border-primary/20 backdrop-blur-md">
          <Zap size={12} className="fill-primary md:w-3.5 md:h-3.5" />
          The Evolution of UI Design
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter bg-linear-to-b from-foreground via-foreground to-primary bg-clip-text text-transparent italic leading-[1.1] md:leading-[0.9]">
          NEXT-GEN <br className="hidden sm:block" /> COMPONENTS.
        </h1>
        
        <p className="text-base md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium px-2">
          A premium collection of high-performance, accessible, and stunningly modern UI components designed to accelerate your Next.js workflow.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-6 w-full max-w-sm sm:max-w-none mx-auto">
          <Link href="/components" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 md:h-14 text-base md:text-lg font-bold italic shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all">
              Launch Components
            </Button>
          </Link>
          <Link href={process.env.NEXT_PUBLIC_GITHUB_REPO || "https://github.com/Aryan3522/future-ui"} target="_blank" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-12 md:h-14 text-base md:text-lg font-bold italic border-primary/20 hover:bg-primary/5">
              Source Code
            </Button>
          </Link>
        </div>
      </header>

      {/* Value Proposition */}
      <section className="w-full px-4 py-16 md:py-24 border-y border-border/40 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
            <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 italic tracking-tight uppercase">WHY FUTURE UI?</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed px-2">
              Future UI isn&apos;t just another component library. It&apos;s a design system focused on motion, 
              depth, and professional aesthetics that helps you stand out in a crowded digital space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <div className="p-6 rounded-2xl bg-card/30 border border-border/50 space-y-4 group hover:bg-card/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Zap size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold italic">Blightly Fast</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Engineered with zero-runtime CSS and optimized for Next.js 15, ensuring your applications stay lightning-fast.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card/30 border border-border/50 space-y-4 group hover:bg-card/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Palette size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold italic">Customizable</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Every component is styled with Tailwind CSS, making it trivial to adapt to your specific brand identity and design tokens.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card/30 border border-border/50 space-y-4 group hover:bg-card/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <ShieldCheck size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold italic">Accessible</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Built with semantic HTML and ARIA standards in mind, ensuring your UI is usable by everyone, everywhere.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card/30 border border-border/50 space-y-4 group hover:bg-card/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Code2 size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold italic">Developer First</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Copy-paste or CLI installation. No complex configuration or bloated dependencies. Just code that works.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card/30 border border-border/50 space-y-4 group hover:bg-card/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Layout size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold italic">Production Ready</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Battle-tested components that handle edge cases, responsiveness, and dark mode out of the box.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card/30 border border-border/50 space-y-4 group hover:bg-card/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Rocket size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold italic">Motion Driven</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Integrated with Framer Motion for smooth, organic transitions that give your UI a premium, living feel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full px-4 py-4 md:py-12 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative group">
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-card/30 backdrop-blur-md p-8 md:p-20 duration-500 hover:border-primary/40 text-center">
            {/* Inner background pattern */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
              <DotBackground dotColor="#fff" gap={20} />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                <Rocket size={14} className="animate-bounce" />
                Boost your workflow
              </div>

              <div className="space-y-4 md:space-y-6">
                <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter leading-[0.9] uppercase">
                  READY TO <br />
                  <span className="bg-linear-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">BUILD?</span>
                </h2>
                
                <p className="text-base md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-medium">
                  Start your next project with Future UI and experience the difference in speed and quality. 
                  High-performance components for high-performance teams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
                <Link href="/components" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-12 h-16 text-xl font-bold italic shadow-2xl bg-primary hover:bg-primary/90 transition-all group/btn">
                    Get Started
                  </Button>
                </Link>
                
                <Link href="/docs" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto rounded-full px-10 h-16 text-lg font-bold italic hover:bg-primary/5 transition-all">
                    View Docs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto py-12 md:py-16 border-t border-border/40 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/Logo.webp" 
                alt="Future UI Logo" 
                width={32} 
                height={32} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter">FUTURE UI</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm md:text-base">
            <Link href="/components" className="text-muted-foreground hover:text-foreground transition-colors font-bold italic">Components</Link>
            <Link href={process.env.NEXT_PUBLIC_GITHUB_PROFILE || "https://github.com/Aryan3522"} className="text-muted-foreground hover:text-foreground transition-colors font-bold italic">GitHub</Link>
            <Link href={process.env.NEXT_PUBLIC_LINKEDIN_PROFILE || "https://www.linkedin.com/in/aryan-hooda-code/"} className="text-muted-foreground hover:text-foreground transition-colors font-bold italic">Connect</Link>
          </div>
          
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            © 2026 Future UI. Built with ❤️ by Aryan Hooda.
          </p>
        </div>
      </footer>
    </div>
  );
}
