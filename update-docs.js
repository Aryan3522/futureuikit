const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'app', 'docs', 'page.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// Add ChevronRight to imports
content = content.replace('import {\n  BookOpen,', 'import {\n  BookOpen,\n  ChevronRight,');

// Remove Header import
content = content.replace('import { Header } from "@/components/ui/header";\n', '');

// Replace layout wrapper
const oldWrapperStart = `<div className="min-h-screen bg-background text-foreground font-body-md overflow-x-hidden selection:bg-secondary/30 relative">
      <Header />
      
      {/* Background glow similar to homepage */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-secondary/10 rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none" />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-40 pb-32">`;

const newWrapperStart = `<div className="w-full relative selection:bg-primary/30">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-secondary/10 rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none" />

      <main className="w-full relative z-10 pb-32">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center text-sm font-medium text-muted-foreground whitespace-nowrap overflow-x-auto scrollbar-hide px-4 md:px-0">
          <span className="text-foreground">Docs</span>
        </nav>`;

content = content.replace(oldWrapperStart, newWrapperStart);

fs.writeFileSync(targetPath, content);
console.log('Docs page refactored!');
