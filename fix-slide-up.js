const fs = require('fs');

const file = 'src/route-components/previews/advanced-previews.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
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

content = content.replace(
  /const SHAPE_VARIANTS: SlideUpRevealShape\[\] = \["default", "rounded", "square", "sharp"\];/g,
  `const SHAPE_VARIANTS: SlideUpRevealShape[] = ["rectangle", "rounded", "squircle", "arc", "wave", "curtain", "silk", "holographic"];`
);

content = content.replace(
  /const \[shape, setShape\] = useState<SlideUpRevealShape>\("square"\);/g,
  `const [shape, setShape] = useState<SlideUpRevealShape>("squircle");`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed SlideUpRevealShape');
