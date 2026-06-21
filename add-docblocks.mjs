import fs from 'fs';
import path from 'path';

const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');

function toTitleCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Read all files in the ui directory
const files = fs.readdirSync(uiDir);

for (const file of files) {
  if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;
  
  const slug = file.replace(/\.tsx?$/, '');
  const filePath = path.join(uiDir, file);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if it already has a registry docblock
  if (!content.includes('@registry-slug')) {
    const title = toTitleCase(slug);
    const docblock = `/**
 * @registry-slug ${slug}
 * @registry-name ${title}
 * @registry-description A standard ${title} component.
 * @registry-category ui
 * @registry-type components:ui
 */
`;
    // Insert docblock after "use client"; if it exists, otherwise at top
    if (content.includes('"use client"')) {
      content = content.replace(/"use client"(;?)/, `"use client"$1\n\n${docblock}`);
    } else if (content.includes("'use client'")) {
      content = content.replace(/'use client'(;?)/, `'use client'$1\n\n${docblock}`);
    } else {
      content = docblock + content;
    }
    fs.writeFileSync(filePath, content);
    console.log(`Added docblock to ${file}`);
  }
}

console.log("Docblock scan complete.");
