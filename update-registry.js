const fs = require('fs');
const path = require('path');

const componentPath = path.join(__dirname, 'src/components/ui/premium-upload-button.tsx');
const registryPath = path.join(__dirname, 'src/data/registryData.ts');

const componentCode = fs.readFileSync(componentPath, 'utf8');
let registryCode = fs.readFileSync(registryPath, 'utf8');

const targetName = '"name": "premium-upload-button.tsx",';
const startIdx = registryCode.indexOf(targetName);

if (startIdx !== -1) {
    const contentKeyIdx = registryCode.indexOf('"content":', startIdx);
    const contentStartQuoteIdx = registryCode.indexOf('"', contentKeyIdx + 10);
    
    let contentEndQuoteIdx = contentStartQuoteIdx + 1;
    while (contentEndQuoteIdx < registryCode.length) {
        if (registryCode[contentEndQuoteIdx] === '"' && registryCode[contentEndQuoteIdx - 1] !== '\\') {
            let backslashCount = 0;
            let j = contentEndQuoteIdx - 1;
            while(registryCode[j] === '\\') {
                backslashCount++;
                j--;
            }
            if (backslashCount % 2 === 0) {
                break;
            }
        }
        contentEndQuoteIdx++;
    }
    
    const before = registryCode.slice(0, contentStartQuoteIdx + 1);
    const after = registryCode.slice(contentEndQuoteIdx);
    
    const newContentEscaped = JSON.stringify(componentCode).slice(1, -1);
    
    fs.writeFileSync(registryPath, before + newContentEscaped + after);
    console.log("Successfully updated registryData.ts!");
} else {
    console.error("Target name not found");
}
