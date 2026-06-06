const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'route-components', 'ComponentDetail.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Remove Header import
content = content.replace('import { Header } from "@/components/ui/header";\n', '');

// 2. Remove Header from JSX and fix layout wrapper
content = content.replace(/<div className="min-h-screen bg-background text-foreground font-sans relative selection:bg-primary\/30 pt-32 md:pt-40 lg:pt-48 pb-32">\s*<Header \/>\s*<div className="max-w-\[1440px\] mx-auto flex items-start gap-8 lg:gap-12 px-4 md:px-8 lg:px-12 relative z-10 min-w-0">/, `<div className="w-full relative selection:bg-primary/30 min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center text-sm font-medium text-muted-foreground whitespace-nowrap overflow-x-auto scrollbar-hide">
        <Link href="/components" className="hover:text-foreground transition-colors">Components</Link>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0 opacity-50" />
        <span className="capitalize">{type}</span>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0 opacity-50" />
        <span className="text-foreground">{component.title}</span>
      </nav>

      <div className="flex items-start gap-8 lg:gap-12 relative z-10 min-w-0">`);

// 3. Update TOC Sidebar classes so it doesn't overlap header
content = content.replace(/"fixed lg:sticky lg:top-48 left-0 top-0 h-\[100dvh\] lg:h-\[calc\(100vh-220px\)\] w-\[280px\] lg:w-\[220px\] bg-background lg:bg-transparent border-r border-border\/40 lg:border-none p-6 pt-24 lg:p-0 lg:pt-0 shadow-2xl lg:shadow-none"/,
  '"fixed lg:sticky lg:top-20 left-0 top-0 h-[100dvh] lg:h-[calc(100vh-100px)] w-[280px] lg:w-[220px] bg-background lg:bg-transparent border-r border-border/40 lg:border-none p-6 pt-24 lg:p-0 lg:pt-0 shadow-2xl lg:shadow-none"');

fs.writeFileSync(targetPath, content);
console.log('Fixed ComponentDetail.tsx');
