const fs = require('fs');
const path = require('path');

const footerCode = `import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-background relative z-10 mt-auto">
      <div className="max-w-[1400px] mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display text-xl font-bold tracking-tighter text-foreground">FUTURE_UI</span>
          <span className="font-mono text-[13px] text-[#c6c6c7]">© {new Date().getFullYear()} FUTURE UI. PRECISION ENGINEERED.</span>
        </div>
        <div className="flex items-center gap-8">
          <Link className="font-mono text-[13px] text-[#988e90] hover:text-foreground/80 transition-colors opacity-80 hover:opacity-100" href="/privacy">Privacy</Link>
          <Link className="font-mono text-[13px] text-[#988e90] hover:text-foreground/80 transition-colors opacity-80 hover:opacity-100" href="/terms">Terms</Link>
          <a className="font-mono text-[13px] text-[#988e90] hover:text-foreground/80 transition-colors opacity-80 hover:opacity-100" href="https://github.com/Aryan3522/future-ui" target="_blank">Github</a>
          <a className="font-mono text-[13px] text-[#988e90] hover:text-foreground/80 transition-colors opacity-80 hover:opacity-100" href="#">Discord</a>
        </div>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'components', 'ui', 'footer.tsx'), footerCode);

function removeFooter(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const footerRegex = /{\/\* FOOTER \*\/}\s*<footer.*?<\/footer>/s;
    const fallbackRegex = /{\/\* Footer \*\/}\s*<footer.*?<\/footer>/s;
    
    content = content.replace(footerRegex, '');
    content = content.replace(fallbackRegex, '');
    
    fs.writeFileSync(filePath, content);
  }
}

removeFooter(path.join(__dirname, 'src', 'app', 'page.tsx'));
removeFooter(path.join(__dirname, 'src', 'app', 'docs', 'page.tsx'));
removeFooter(path.join(__dirname, 'src', 'components', 'Comps.tsx'));

// Add Footer to layout.tsx
const layoutPath = path.join(__dirname, 'src', 'app', 'layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

if (!layoutContent.includes('import { Footer }')) {
  layoutContent = layoutContent.replace('import AppProviders from "@/next/AppProviders";', 'import AppProviders from "@/next/AppProviders";\nimport { Footer } from "@/components/ui/footer";');
  layoutContent = layoutContent.replace('<AppProviders>{children}</AppProviders>', '<AppProviders>\n          <div className="flex flex-col min-h-screen">\n            {children}\n            <Footer />\n          </div>\n        </AppProviders>');
  fs.writeFileSync(layoutPath, layoutContent);
}

console.log('Footers extracted and replaced.');
