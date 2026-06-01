const fs = require('fs');

const iconData = {
  name: 'Icons',
  type: 'components:ui',
  dependencies: ['framer-motion'],
  files: [
    'GithubIcon.tsx', 'LinkedinIcon.tsx', 'TwitterIcon.tsx', 
    'InstagramIcon.tsx', 'DiscordIcon.tsx', 'YoutubeIcon.tsx', 'XIcon.tsx', 
    'ChevronUpIcon.tsx', 'ChevronDownIcon.tsx', 'ChevronLeftIcon.tsx', 'ChevronRightIcon.tsx', 'SunIcon.tsx', 'MoonIcon.tsx', 'index.ts'
  ].map(file => ({
    name: file,
    content: fs.readFileSync('src/icons/' + file, 'utf-8'),
    targetPath: 'icons/' + file
  }))
};

let registryContent = fs.readFileSync('src/data/registryData.ts', 'utf-8');

if (!registryContent.includes('"icons": {')) {
  registryContent = registryContent.replace(
    'export const registry: Registry = {',
    'export const registry: Registry = {\n  "icons": ' + JSON.stringify(iconData, null, 2) + ','
  );
  fs.writeFileSync('src/data/registryData.ts', registryContent);
  console.log('Successfully injected Icons into registryData.ts');
} else {
  console.log('Icons already exist in registryData.ts');
}
