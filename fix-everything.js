const fs = require('fs');

function replace(file, find, replace) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.split(find).join(replace);
  fs.writeFileSync(file, content, 'utf8');
}

function regexReplace(file, regex, replace) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replace);
  fs.writeFileSync(file, content, 'utf8');
}

// 1. Revert SlideUpRevealShape in advanced-previews.tsx
let adv = fs.readFileSync('src/route-components/previews/advanced-previews.tsx', 'utf8');
adv = adv.replace(
  /const shapeToTheme: Record<SlideUpRevealShape, SlideUpRevealVariant> = \{\s*default: "default",\s*rounded: "aurora",\s*square: "space",\s*sharp: "cyberpunk"\s*\};/g,
  `const shapeToTheme: Record<SlideUpRevealShape, SlideUpRevealVariant> = {
    rectangle: "default",
    rounded: "aurora",
    squircle: "space",
    arc: "cyberpunk",
    wave: "neon",
    curtain: "default",
    silk: "aurora",
    holographic: "cyberpunk",
  };`
);
adv = adv.replace(
  /const SHAPE_VARIANTS: SlideUpRevealShape\[\] = \["default", "rounded", "square", "sharp"\];/g,
  `const SHAPE_VARIANTS: SlideUpRevealShape[] = ["rectangle", "rounded", "squircle", "arc", "wave", "curtain", "silk", "holographic"];`
);
adv = adv.replace(
  /const \[shape, setShape\] = useState<SlideUpRevealShape>\("square"\);/g,
  `const [shape, setShape] = useState<SlideUpRevealShape>("squircle");`
);
fs.writeFileSync('src/route-components/previews/advanced-previews.tsx', adv, 'utf8');


// 2. Fix card-previews.tsx
replace('src/route-components/previews/card-previews.tsx', 'variant="default"', 'variant="solid"');

// 3. Fix feedback-previews.tsx
replace('src/route-components/previews/feedback-previews.tsx', 'variant="default"', 'variant="solid"');
replace('src/route-components/previews/feedback-previews.tsx', 'variant="outline"', 'variant="outline"'); // Keep outline

// For ToggleProps error (variant="default" is not assignable to "glass" | "elevated" | "soft" | "modern" | "enterprise" | "neon" | "scenic"...)
// We should probably just remove variant from Toggle components in feedback-previews.tsx or change them to "modern"
regexReplace('src/route-components/previews/feedback-previews.tsx', /variant="default"/g, 'variant="modern"');
regexReplace('src/route-components/previews/feedback-previews.tsx', /variant="solid"/g, 'variant="modern"');

// 4. Fix form-previews.tsx
replace('src/route-components/previews/form-previews.tsx', '"zinc"', '"slate"');
replace('src/route-components/previews/form-previews.tsx', 'size="md"', '');

// 5. Fix loader-previews.tsx
replace('src/route-components/previews/loader-previews.tsx', 'color="#10b981"', 'color="emerald"');
replace('src/route-components/previews/loader-previews.tsx', 'color="#f59e0b"', 'color="amber"');
replace('src/route-components/previews/loader-previews.tsx', 'color="#3b82f6"', 'color="blue"');

// 6. Fix migrated-previews.tsx
replace('src/route-components/previews/migrated-previews.tsx', 'variant="comfortable"', 'spacing="4x"');
replace('src/route-components/previews/migrated-previews.tsx', 'variant="compact"', 'spacing="2x"');
replace('src/route-components/previews/migrated-previews.tsx', 'text="Future UI"', 'children="Future UI"');
replace('src/route-components/previews/migrated-previews.tsx', 'variant="dense"', 'density="high"');

// 7. Fix search-previews.tsx
regexReplace('src/route-components/previews/search-previews.tsx', /\ssize="[\w-]+"/g, '');

console.log('Fixed everything.');
