import fs from 'fs';
import path from 'path';

const registryPath = path.join(process.cwd(), 'src/data/registryData.ts');
const glassPanelPath = path.join(process.cwd(), 'src/components/ui/glass-panel.tsx');
const noirHeroPath = path.join(process.cwd(), 'src/components/ui/noir-hero-3d.tsx');

const glassPanelContent = fs.readFileSync(glassPanelPath, 'utf8');
const noirHeroContent = fs.readFileSync(noirHeroPath, 'utf8');

let registryData = fs.readFileSync(registryPath, 'utf8');

const newComponents = `  "glass-panel": {
    "name": "Glass Panel",
    "type": "components:ui",
    "dependencies": [
      "framer-motion",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "files": [
      {
        "name": "glass-panel.tsx",
        "content": ${JSON.stringify(glassPanelContent)},
        "targetPath": "components/ui/glass-panel.tsx"
      }
    ]
  },
  "noir-hero-3d": {
    "name": "Noir Hero 3D",
    "type": "components:ui",
    "dependencies": [
      "three",
      "@react-three/fiber",
      "@react-three/drei"
    ],
    "files": [
      {
        "name": "noir-hero-3d.tsx",
        "content": ${JSON.stringify(noirHeroContent)},
        "targetPath": "components/ui/noir-hero-3d.tsx"
      }
    ]
  },
`;

registryData = registryData.replace('export const registry: Registry = {\n', 'export const registry: Registry = {\n' + newComponents);

fs.writeFileSync(registryPath, registryData, 'utf8');
console.log('Registry updated successfully!');
