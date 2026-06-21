const fs = require('fs');

const file = 'src/route-components/previews/advanced-previews.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix SlideUpRevealShape map
content = content.replace(
  /const shapeToTheme: Record<SlideUpRevealShape, SlideUpRevealVariant> = \{\s*rectangle: "default",\s*rounded: "aurora",\s*squircle: "space",\s*arc: "cyberpunk",\s*wave: "neon",\s*curtain: "default",\s*silk: "aurora",\s*holographic: "cyberpunk",?\s*\};/g,
  `const shapeToTheme: Record<SlideUpRevealShape, SlideUpRevealVariant> = {
    default: "default",
    rounded: "aurora",
    square: "space",
    sharp: "cyberpunk"
  };`
);

// Fix SlideUpRevealShape SHAPE_VARIANTS array
content = content.replace(
  /const SHAPE_VARIANTS: SlideUpRevealShape\[\] = \["rectangle", "rounded", "squircle", "arc", "wave", "curtain", "silk", "holographic"\];/g,
  `const SHAPE_VARIANTS: SlideUpRevealShape[] = ["default", "rounded", "square", "sharp"];`
);

// Fix SlideUpReveal useState generic param
content = content.replace(
  /const \[shape, setShape\] = useState<SlideUpRevealShape>\("squircle"\);/g,
  `const [shape, setShape] = useState<SlideUpRevealShape>("square");`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed advanced-previews.tsx SlideUpReveal');
