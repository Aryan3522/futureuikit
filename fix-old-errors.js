const fs = require('fs');

function replaceFile(file, replaces) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  replaces.forEach(r => {
    content = content.replace(r[0], r[1]);
  });
  fs.writeFileSync(file, content, 'utf8');
}

// 1. migrated-previews.tsx
replaceFile('src/route-components/previews/migrated-previews.tsx', [
  [/<RadioGroup\s+defaultValue="comfortable"\s+variant="comfortable">/g, '<RadioGroup defaultValue="comfortable" spacing="4x">'],
  [/<RadioGroup\s+defaultValue="compact"\s+variant="compact">/g, '<RadioGroup defaultValue="compact" spacing="2x">'],
  [/<TypingAnimation\s+text="Future UI"\s+className="text-4xl font-bold"\s*\/>/g, '<TypingAnimation className="text-4xl font-bold">Future UI</TypingAnimation>'],
  [/<Highlighter\s+color="#facc15"/g, '<Highlighter color="amber"'],
  [/<GutterLines\s+variant="dense"/g, '<GutterLines density="high"'], // GutterLines fix?
  [/size="[\w-]+"\s*/g, ''], // Remove size="" from migrated-previews.tsx buttons
]);

// 2. layout-previews.tsx
replaceFile('src/route-components/previews/layout-previews.tsx', [
  [/size="[\w-]+"\s*/g, ''], // Remove size from ClayMorphButton
  [/shape="soft-rounded"/g, 'shape="rounded"'],
  [/shape="pill"/g, 'shape="rounded"'],
  [/shape="circle"/g, 'shape="rounded"'],
  [/shape="squircle"/g, 'shape="rounded"'],
  [/shape="stadium"/g, 'shape="rounded"'],
  [/shape="cut-corners"/g, 'shape="sharp"'],
  [/color="zinc"/g, 'color="slate"'],
]);

// 3. search-previews.tsx
replaceFile('src/route-components/previews/search-previews.tsx', [
  [/size="[\w-]+"\s*/g, ''], // Remove size from Search
]);

// 4. loader-previews.tsx
replaceFile('src/route-components/previews/loader-previews.tsx', [
  [/color="#10b981"/g, 'color="emerald"'],
  [/color="#f59e0b"/g, 'color="amber"'],
  [/color="#3b82f6"/g, 'color="blue"'],
]);

console.log("Applied old fixes.");
