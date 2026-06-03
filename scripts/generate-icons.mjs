import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const ICONS_DIR = path.join(ROOT_DIR, 'src', 'icons');
const REGISTRY_FILE = path.join(ROOT_DIR, 'src', 'data', 'registryData.ts');

const ABSTRACT_COUNT = 125;
const CIRCULAR_COUNT = 36;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(random(min, max + 1));
}

function generateAbstractSVG(seed) {
  let elements = [];
  const numElements = randomInt(3, 6);
  
  for (let i = 0; i < numElements; i++) {
    const type = randomInt(0, 2);
    if (type === 0) {
      const x1 = randomInt(2, 22);
      const y1 = randomInt(2, 22);
      const x2 = randomInt(2, 22);
      const y2 = randomInt(2, 22);
      elements.push('<motion.line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: ' + random(0.5, 1.2).toFixed(2) + ', delay: ' + random(0, 0.5).toFixed(2) + ', ease: "easeOut" } : {}} />');
    } else if (type === 1) {
      const size = randomInt(4, 12);
      const x = randomInt(2, 22 - size);
      const y = randomInt(2, 22 - size);
      elements.push('<motion.rect x="' + x + '" y="' + y + '" width="' + size + '" height="' + size + '" rx="' + randomInt(0, 2) + '" initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: ' + random(0.4, 0.9).toFixed(2) + ', delay: ' + random(0, 0.4).toFixed(2) + ', ease: "backOut" } : {}} />');
    } else {
      const ptsCount = randomInt(3, 5);
      let pts = [];
      let cx = randomInt(4, 20);
      let cy = randomInt(4, 20);
      pts.push(cx + ',' + cy);
      for (let j = 0; j < ptsCount - 1; j++) {
        if (Math.random() > 0.5) cx = randomInt(4, 20);
        else cy = randomInt(4, 20);
        pts.push(cx + ',' + cy);
      }
      elements.push('<motion.polyline points="' + pts.join(' ') + '" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: ' + random(0.6, 1.5).toFixed(2) + ', delay: ' + random(0, 0.3).toFixed(2) + ', ease: "easeInOut" } : {}} />');
    }
  }
  return elements.join('\n        ');
}

function generateCircularSVG(seed) {
  let elements = [];
  const numElements = randomInt(3, 6);
  
  for (let i = 0; i < numElements; i++) {
    const type = randomInt(0, 2);
    if (type === 0) {
      const r = randomInt(2, 10);
      elements.push('<motion.circle cx="12" cy="12" r="' + r + '" initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={shouldAnimate ? { duration: ' + random(0.5, 1).toFixed(2) + ', delay: ' + random(0, 0.3).toFixed(2) + ', ease: "easeOut" } : {}} />');
    } else if (type === 1) {
      const r = randomInt(4, 11);
      const dash = randomInt(4, 12);
      const gap = randomInt(4, 12);
      elements.push('<motion.circle cx="12" cy="12" r="' + r + '" strokeDasharray="' + dash + ' ' + gap + '" initial={shouldAnimate ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }} animate={{ rotate: 360, opacity: 1 }} transition={shouldAnimate ? { rotate: { duration: ' + random(2, 5).toFixed(2) + ', ease: "linear", repeat: Infinity }, opacity: { duration: 0.5 } } : { rotate: { duration: ' + random(2, 5).toFixed(2) + ', ease: "linear", repeat: Infinity } }} style={{ transformOrigin: "12px 12px" }} />');
    } else {
      const r = randomInt(3, 10);
      const startAngle = random(0, Math.PI);
      const endAngle = startAngle + random(Math.PI / 4, Math.PI);
      const x1 = 12 + r * Math.cos(startAngle);
      const y1 = 12 + r * Math.sin(startAngle);
      const x2 = 12 + r * Math.cos(endAngle);
      const y2 = 12 + r * Math.sin(endAngle);
      const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0;
      const d = "M " + x1.toFixed(2) + " " + y1.toFixed(2) + " A " + r + " " + r + " 0 " + largeArc + " 1 " + x2.toFixed(2) + " " + y2.toFixed(2);
      elements.push('<motion.path d="' + d + '" initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={shouldAnimate ? { duration: ' + random(0.6, 1.2).toFixed(2) + ', ease: "easeInOut" } : {}} />');
    }
  }
  return elements.join('\n        ');
}

function getComponentTemplate(name, svgContent) {
  return [
    '"use client";',
    '',
    'import React from "react";',
    'import { motion, SVGMotionProps } from "framer-motion";',
    '',
    'interface IconProps extends SVGMotionProps<SVGSVGElement> {',
    '  animated?: boolean;',
    '  animate?: boolean;',
    '  size?: number | string;',
    '}',
    '',
    'let hasAnimated = false;',
    '',
    'export const ' + name + ': React.FC<IconProps> = React.memo(',
    '  ({ size, width, height, animate, animated, strokeWidth, ...props }) => {',
    '    const resolvedSize = size ?? 24;',
    '    const isAnimatedProp = animated !== undefined ? animated : animate;',
    '    const isAnimated = isAnimatedProp === true;',
    '    ',
    '    const [shouldAnimate] = React.useState(() => isAnimated && !hasAnimated);',
    '',
    '    React.useEffect(() => {',
    '      if (shouldAnimate) {',
    '        hasAnimated = true;',
    '      }',
    '    }, [shouldAnimate]);',
    '',
    '    return (',
    '      <motion.svg',
    '        xmlns="http://www.w3.org/2000/svg"',
    '        width={width ?? resolvedSize}',
    '        height={height ?? resolvedSize}',
    '        viewBox="0 0 24 24"',
    '        fill="none"',
    '        stroke="currentColor"',
    '        strokeWidth={strokeWidth ?? "1.5"}',
    '        strokeLinecap="round"',
    '        strokeLinejoin="round"',
    '        {...props}',
    '      >',
    '        ' + svgContent,
    '      </motion.svg>',
    '    );',
    '  }',
    ');',
    '',
    name + '.displayName = "' + name + '";',
    ''
  ].join('\n');
}

async function run() {
  console.log('Generating premium icons...');
  
  try {
    await fs.mkdir(ICONS_DIR, { recursive: true });
  } catch (e) {}

  let newIcons = [];
  
  for (let i = 1; i <= ABSTRACT_COUNT; i++) {
    const padded = String(i).padStart(3, '0');
    const name = 'Abstract' + padded + 'Icon';
    const svg = generateAbstractSVG(i);
    const content = getComponentTemplate(name, svg);
    
    await fs.writeFile(path.join(ICONS_DIR, name + '.tsx'), content, 'utf8');
    newIcons.push({ name, content });
  }

  for (let i = 1; i <= CIRCULAR_COUNT; i++) {
    const padded = String(i).padStart(3, '0');
    const name = 'Circular' + padded + 'Icon';
    const svg = generateCircularSVG(i);
    const content = getComponentTemplate(name, svg);
    
    await fs.writeFile(path.join(ICONS_DIR, name + '.tsx'), content, 'utf8');
    newIcons.push({ name, content });
  }

  console.log('Successfully wrote ' + newIcons.length + ' icon files to src/icons.');

  const indexPath = path.join(ICONS_DIR, 'index.ts');
  let indexContent = '';
  try {
    indexContent = await fs.readFile(indexPath, 'utf8');
  } catch (e) {}

  for (const icon of newIcons) {
    const exportStatement = 'export * from "./' + icon.name + '";';
    if (!indexContent.includes(exportStatement)) {
      indexContent += '\n' + exportStatement;
    }
  }
  await fs.writeFile(indexPath, indexContent.trim() + '\n', 'utf8');
  console.log('Updated src/icons/index.ts');

  console.log('Injecting icons into registryData.ts...');
  let registryContent = await fs.readFile(REGISTRY_FILE, 'utf8');
  
  const marker = '"targetPath": "components/ui/icons/YoutubeIcon.tsx"\\n      }';
  const fallbackMarker = '"targetPath": "components/ui/icons/YoutubeIcon.tsx"\\r\\n      }';
  
  let targetMarker = registryContent.includes(marker) ? marker : null;
  if (!targetMarker && registryContent.includes(fallbackMarker)) {
    targetMarker = fallbackMarker;
  }
  
  if (!targetMarker) {
    console.error('Could not find YoutubeIcon marker in registryData.ts.');
    const iconsIndex = registryContent.indexOf('"icons": {');
    if (iconsIndex !== -1) {
      const filesIndex = registryContent.indexOf('"files": [', iconsIndex);
      if (filesIndex !== -1) {
        let openBrackets = 0;
        let injectionPoint = -1;
        for (let i = filesIndex + '"files": ['.length; i < registryContent.length; i++) {
          if (registryContent[i] === '[') openBrackets++;
          if (registryContent[i] === ']') {
            if (openBrackets === 0) {
              injectionPoint = i;
              break;
            }
            openBrackets--;
          }
        }
        
        if (injectionPoint !== -1) {
          let injectionPayload = '';
          for (const icon of newIcons) {
            injectionPayload += ',\n      {\n        "name": "' + icon.name + '.tsx",\n        "content": ' + JSON.stringify(icon.content) + ',\n        "targetPath": "components/ui/icons/' + icon.name + '.tsx"\n      }';
          }
          
          registryContent = registryContent.slice(0, injectionPoint) + injectionPayload + registryContent.slice(injectionPoint);
          await fs.writeFile(REGISTRY_FILE, registryContent, 'utf8');
          console.log('Successfully injected into registryData.ts via bracket matching!');
        }
      }
    }
  } else {
    let injectionPayload = targetMarker;
    for (const icon of newIcons) {
      injectionPayload += ',\n      {\n        "name": "' + icon.name + '.tsx",\n        "content": ' + JSON.stringify(icon.content) + ',\n        "targetPath": "components/ui/icons/' + icon.name + '.tsx"\n      }';
    }
    registryContent = registryContent.replace(targetMarker, injectionPayload);
    await fs.writeFile(REGISTRY_FILE, registryContent, 'utf8');
    console.log('Successfully injected into registryData.ts via string replacement!');
  }
}

run().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
