const fs = require('fs');

const file = 'src/route-components/previews/card-previews.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /const \[variant, setVariant\] = React\.useState<"default" \| "outline" \| "ghost" \| "glass">\("default"\);/g,
  `const [variant, setVariant] = React.useState<"solid" | "outline" | "ghost" | "glass">("solid");`
);

content = content.replace(
  /variants=\{\["default", "outline", "ghost", "glass"\]\}/g,
  `variants={["solid", "outline", "ghost", "glass"]}`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed card-previews.tsx');
