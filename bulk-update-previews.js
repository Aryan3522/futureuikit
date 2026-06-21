const fs = require('fs');
const path = require('path');

const PREVIEWS_DIR = path.join(__dirname, 'src/route-components/previews');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if no PreviewContainer
  if (!content.includes('PreviewContainer')) return;

  // Add DEFAULT_COLORS import
  if (content.includes('PreviewContainer') && !content.includes('DEFAULT_COLORS')) {
    content = content.replace(
      /(import\s+{[^}]*)(PreviewContainer)([^}]*}\s+from\s+['"][^'"]*PreviewContainer['"];?)/,
      '$1$2, DEFAULT_COLORS$3'
    );
  }

  const componentRegex = /export\s+(?:const\s+(\w+)(?:\s*:\s*React\.FC)?\s*=\s*\([^)]*\)\s*=>\s*{|function\s+(\w+)\s*\([^)]*\)\s*{)/g;

  let match;
  let newContent = content;
  let offset = 0;

  while ((match = componentRegex.exec(content)) !== null) {
    const compName = match[1] || match[2];
    const openBraceIndex = match.index + match[0].length;
    
    let bracketCount = 1;
    let closeBraceIndex = -1;
    for (let i = openBraceIndex; i < content.length; i++) {
      if (content[i] === '{') bracketCount++;
      if (content[i] === '}') bracketCount--;
      if (bracketCount === 0) {
        closeBraceIndex = i;
        break;
      }
    }

    if (closeBraceIndex === -1) continue;

    const body = content.substring(openBraceIndex, closeBraceIndex);
    
    if (!body.includes('<PreviewContainer')) continue;

    let modifiedBody = body;
    let injectedStates = '';
    
    if (!modifiedBody.includes('setPreviewColor')) {
      injectedStates += `\n  const [previewColor, setPreviewColor] = React.useState<any>("default");`;
    }
    if (!modifiedBody.includes('setPreviewVariant')) {
      injectedStates += `\n  const [previewVariant, setPreviewVariant] = React.useState<any>("solid");`;
    }

    if (injectedStates) {
      modifiedBody = injectedStates + '\n' + modifiedBody;
    }

    const pcRegex = /<PreviewContainer([\s\S]*?)>/;
    const pcMatch = pcRegex.exec(modifiedBody);
    if (pcMatch) {
      let pcProps = pcMatch[1];
      
      if (!pcProps.includes('colors={')) {
        pcProps += `\n      colors={DEFAULT_COLORS}\n      activeColor={previewColor}\n      onColorChange={setPreviewColor}`;
      }
      if (!pcProps.includes('variants={')) {
        pcProps += `\n      variants={["solid", "outline", "ghost", "link"]}\n      activeVariant={previewVariant}\n      onVariantChange={setPreviewVariant}`;
      }

      modifiedBody = modifiedBody.substring(0, pcMatch.index) + `<PreviewContainer${pcProps}>` + modifiedBody.substring(pcMatch.index + pcMatch[0].length);
    }

    const tagRegex = /<([A-Z]\w+)([\s\S]*?)(\/?>)/g;
    let tagMatch;
    let bodyWithProps = "";
    let lastIndex = 0;
    while ((tagMatch = tagRegex.exec(modifiedBody)) !== null) {
      const tagName = tagMatch[1];
      if (tagName === 'PreviewContainer' || tagName === 'BrowserWindow' || tagName === 'motion' || tagName === 'AnimatePresence' || tagName === 'Icons' || tagName === 'Badge' || tagName === 'Card' || tagName === 'CardContent' || tagName === 'CardHeader') {
         bodyWithProps += modifiedBody.substring(lastIndex, tagMatch.index + tagMatch[0].length);
         lastIndex = tagMatch.index + tagMatch[0].length;
         continue;
      }

      let tagProps = tagMatch[2];
      
      // Inject color only if color isn't there and we are injecting color
      if (!tagProps.includes('color=')) {
        tagProps += ` color={previewColor}`;
      }
      // Inject variant
      if (!tagProps.includes('variant=')) {
        tagProps += ` variant={previewVariant}`;
      }

      bodyWithProps += modifiedBody.substring(lastIndex, tagMatch.index) + `<${tagName}${tagProps}${tagMatch[3]}`;
      lastIndex = tagMatch.index + tagMatch[0].length;
    }
    bodyWithProps += modifiedBody.substring(lastIndex);

    newContent = newContent.substring(0, openBraceIndex + offset) + bodyWithProps + newContent.substring(closeBraceIndex + offset);
    offset += (bodyWithProps.length - body.length);
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Processed ${path.basename(filePath)}`);
}

fs.readdirSync(PREVIEWS_DIR).forEach(file => {
  if (file.endsWith('-previews.tsx')) {
    processFile(path.join(PREVIEWS_DIR, file));
  }
});
