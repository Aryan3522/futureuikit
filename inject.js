const fs = require('fs');
const path = require('path');

const componentPath = path.join(__dirname, 'src', 'components', 'ui', 'otp-verification.tsx');
const registryPath = path.join(__dirname, 'src', 'data', 'registryData.ts');
const libraryDataPath = path.join(__dirname, 'src', 'data', 'component-library-data.ts');

const componentContent = fs.readFileSync(componentPath, 'utf8');

let registryCode = fs.readFileSync(registryPath, 'utf8');

const newEntry = `
  "otp-verification": {
    "name": "OTP Verification",
    "type": "components:ui",
    "description": "A premium OTP Verification component with Framer Motion animations.",
    "category": "ui",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "name": "otp-verification.tsx",
        "content": ${JSON.stringify(componentContent)},
        "targetPath": "components/ui/otp-verification.tsx"
      }
    ]
  }
};`;

registryCode = registryCode.replace(/\n\s*\}\s*;\s*$/, ',' + newEntry);

fs.writeFileSync(registryPath, registryCode);
console.log('Successfully added otp-verification to registryData.ts');

// Also update component-library-data.ts
let libraryData = fs.readFileSync(libraryDataPath, 'utf8');

const newLibEntry = `
  {
    title: "OTP Verification",
    description: "A premium OTP Verification component with overlapping deck animations and Framer Motion effects.",
    slug: "otp-verification",
    images: ["/placeholder.svg"],
    video: "",
    isNew: true,
  }
];`;

libraryData = libraryData.replace(/\n\s*\]\s*;\s*$/, ',' + newLibEntry);
fs.writeFileSync(libraryDataPath, libraryData);
console.log('Successfully added otp-verification to component-library-data.ts');
