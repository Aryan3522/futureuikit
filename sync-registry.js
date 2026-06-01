const fs = require('fs');
const path = './src/data/registryData.ts';
let content = fs.readFileSync(path, 'utf8');
const componentCode = fs.readFileSync('./src/components/ui/cinematic-carousel.tsx', 'utf8');

// The registry structure is a JS object exported.
// We can find `"cinematic-carousel": { ... "content": "..." ... }`

// Let's find the exact string "cinematic-carousel.tsx" and then find the nearest "content": before or after it.
const searchStr = '"name": "cinematic-carousel.tsx"';
const nameIdx = content.indexOf(searchStr);

if (nameIdx === -1) {
    console.error("Could not find name string.");
    process.exit(1);
}

// Find "content": around it. It is usually right after.
const contentIdx = content.indexOf('"content":', nameIdx);
if (contentIdx === -1) {
    console.error("Could not find content key.");
    process.exit(1);
}

const startQuote = content.indexOf('"', contentIdx + 10);
let endQuote = startQuote + 1;
while (endQuote < content.length) {
    if (content[endQuote] === '"' && content[endQuote - 1] !== '\\') {
        break;
    }
    endQuote++;
}

const newContentStr = JSON.stringify(componentCode);

content = content.slice(0, startQuote) + newContentStr + content.slice(endQuote + 1);

fs.writeFileSync(path, content);
console.log("Registry synced successfully!");
