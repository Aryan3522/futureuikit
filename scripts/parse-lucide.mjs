import fs from 'fs';
import path from 'path';

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      walk(path.join(dir, file), fileList);
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        fileList.push(path.join(dir, file));
      }
    }
  }
  return fileList;
}

const allFiles = walk('./src');
const icons = new Set();
let totalFilesWithLucide = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('lucide-react')) {
    totalFilesWithLucide++;
    const regex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const imports = match[1].split(',').map(s => s.trim()).filter(Boolean);
      for (let imp of imports) {
        if (imp.includes('type ')) continue;
        
        const aliasMatch = imp.match(/(\w+)\s+as\s+(\w+)/);
        if (aliasMatch) {
          icons.add(aliasMatch[1]);
        } else {
          icons.add(imp);
        }
      }
    }
  }
}

const iconArray = [...icons].sort();
console.log(`Found ${iconArray.length} unique Lucide icons across ${totalFilesWithLucide} files:`);
console.log(iconArray.join(', '));
