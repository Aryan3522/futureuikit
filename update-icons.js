const fs = require('fs');
const files = fs.readdirSync('src/icons')
  .filter(f => f.endsWith('.tsx') && f !== 'index.ts')
  .map(f => `export * from "./${f.replace('.tsx', '')}";`)
  .join('\n');
fs.writeFileSync('src/icons/index.ts', files + '\n');
console.log('Updated src/icons/index.ts');
