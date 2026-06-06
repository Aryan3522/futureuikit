const fs = require('fs');
const path = require('path');

function updateComponentDetail() {
  const targetPath = path.join(__dirname, 'src', 'route-components', 'ComponentDetail.tsx');
  let content = fs.readFileSync(targetPath, 'utf8');

  // Update Breadcrumb
  const oldBreadcrumb = `<nav className="mb-8 flex items-center text-sm font-medium text-muted-foreground whitespace-nowrap overflow-x-auto scrollbar-hide">
        <Link href="/components" className="hover:text-foreground transition-colors">Components</Link>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0 opacity-50" />
        <span className="capitalize">{type}</span>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0 opacity-50" />
        <span className="text-foreground">{component.title}</span>
      </nav>`;
      
  const newBreadcrumb = `<nav className="mb-8 flex items-center text-sm font-medium text-muted-foreground whitespace-nowrap overflow-x-auto scrollbar-hide">
        <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0 opacity-50" />
        <Link href="/components" className="hover:text-foreground transition-colors">Components</Link>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0 opacity-50" />
        <span className="capitalize">{type}</span>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0 opacity-50" />
        <span className="text-foreground">{component.title}</span>
      </nav>`;
      
  content = content.replace(oldBreadcrumb, newBreadcrumb);

  // Remove TOC Sidebar and Toggle Button
  const sidebarRegex = /{\/\* Mobile\/Tablet Sidebar Toggle \*\/}.*?<\/aside>/s;
  content = content.replace(sidebarRegex, '');

  fs.writeFileSync(targetPath, content);
}

function updateComps() {
  const targetPath = path.join(__dirname, 'src', 'components', 'Comps.tsx');
  let content = fs.readFileSync(targetPath, 'utf8');

  // Add Breadcrumb to Comps
  const oldHeaderArea = `<div className="w-full relative z-10 pb-32">`;
  const newHeaderArea = `<div className="w-full relative z-10 pb-32">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center text-sm font-medium text-muted-foreground whitespace-nowrap overflow-x-auto scrollbar-hide px-4 md:px-0">
          <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0 opacity-50" />
          <span className="text-foreground">Components</span>
        </nav>`;

  if (!content.includes('Breadcrumb Navigation')) {
    content = content.replace(oldHeaderArea, newHeaderArea);
  }

  // Make sure ChevronRight is imported in Comps.tsx if it isn't
  if (!content.includes('ChevronRight')) {
    content = content.replace('import { Check, Copy, ArrowRight, Layers, Sparkles, Droplets, Grid, List, Link as LinkIcon, PackageCheck, Code2 } from "lucide-react";', 
      'import { Check, Copy, ArrowRight, Layers, Sparkles, Droplets, Grid, List, Link as LinkIcon, PackageCheck, Code2, ChevronRight } from "lucide-react";');
    content = content.replace('import { Check, Copy, ArrowRight, Layers, Sparkles, Droplets, Grid, List, Link as LinkIcon, PackageCheck, Code2,  } from "lucide-react";', 
      'import { Check, Copy, ArrowRight, Layers, Sparkles, Droplets, Grid, List, Link as LinkIcon, PackageCheck, Code2, ChevronRight } from "lucide-react";');
      
    // General fallback
    if (!content.includes('ChevronRight')) {
      content = content.replace('from "lucide-react";', ', ChevronRight } from "lucide-react";').replace('}, ChevronRight', '}');
    }
  }

  fs.writeFileSync(targetPath, content);
}

function updateDocs() {
  const targetPath = path.join(__dirname, 'src', 'app', 'docs', 'page.tsx');
  if (fs.existsSync(targetPath)) {
    let content = fs.readFileSync(targetPath, 'utf8');
    
    // Check if we need to add a breadcrumb
    const oldWrapper = `<div className="max-w-4xl mx-auto py-12 md:py-24 px-4 sm:px-6 lg:px-8">`;
    const newWrapper = `<div className="max-w-4xl mx-auto py-12 md:py-24 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center text-sm font-medium text-muted-foreground whitespace-nowrap overflow-x-auto scrollbar-hide">
          <span className="text-foreground">Docs</span>
        </nav>`;
        
    if (content.includes(oldWrapper) && !content.includes('Breadcrumb Navigation')) {
      content = content.replace(oldWrapper, newWrapper);
      fs.writeFileSync(targetPath, content);
    }
  }
}

try {
  updateComponentDetail();
  updateComps();
  updateDocs();
  console.log('Successfully updated UI for consistency.');
} catch (e) {
  console.error(e);
}
