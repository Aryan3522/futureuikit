const fs = require('fs');
const path = require('path');

const libPath = path.join(__dirname, 'src', 'data', 'component-library-data.ts');
let code = fs.readFileSync(libPath, 'utf8');

const entry = `
  {
    title: "Premium Upload Button",
    slug: "premium-upload-button",
    description: "A premium, highly interactive file upload button with various design variants, success states, and robust error handling.",
    type: "components:ui",
    features: [
      "Framer Motion driven animations.",
      "Beautiful light and dark mode support.",
      "Multiple design variants."
    ],
    installation: "npx futureuikit add premium-upload-button",
    usage: {
      next: 'import { PremiumUploadButton } from "@/components/ui/premium-upload-button";\\n\\nexport default function Example() {\\n  return <PremiumUploadButton />;\\n}'
    },
    anatomy: [
      "Overview: A premium button for file uploads.",
      "Usage: Use it anywhere you need a high-quality upload trigger."
    ]
  }
`;

if (!code.includes('slug: "premium-upload-button"')) {
    // find the end of rawComponentsList
    const searchStr = 'export const rawComponentsList: ComponentItem[] = [';
    const startIdx = code.indexOf(searchStr);
    
    // just append it right after the start
    code = code.replace(searchStr, searchStr + entry + ',');
    fs.writeFileSync(libPath, code);
    console.log('Injected to component-library-data.ts');
} else {
    console.log('Already exists in component-library-data.ts');
}
