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

// migrated-previews.tsx
replace('src/route-components/previews/migrated-previews.tsx', 'variant="comfortable"', 'spacing="4x"');
replace('src/route-components/previews/migrated-previews.tsx', 'variant="compact"', 'spacing="2x"');
replace('src/route-components/previews/migrated-previews.tsx', 'text="Future UI"', 'children="Future UI"');
replace('src/route-components/previews/migrated-previews.tsx', 'color="#facc15"', 'color="amber"');
replace('src/route-components/previews/migrated-previews.tsx', 'variant="dense"', 'density="high"');

// icons-previews.tsx
regexReplace('src/route-components/previews/icons-previews.tsx', /\ssize="[\w-]+"/g, '');

// search-previews.tsx
regexReplace('src/route-components/previews/search-previews.tsx', /\ssize="[\w-]+"/g, '');

// feedback-previews.tsx
regexReplace('src/route-components/previews/feedback-previews.tsx', /\ssize="[\w-]+"/g, '');
replace('src/route-components/previews/feedback-previews.tsx', 'variant="default"', 'variant="solid"');
replace('src/route-components/previews/feedback-previews.tsx', 'variant="destructive"', 'variant="solid"');

// loader-previews.tsx
replace('src/route-components/previews/loader-previews.tsx', 'color="#10b981"', 'color="emerald"');
replace('src/route-components/previews/loader-previews.tsx', 'color="#f59e0b"', 'color="amber"');
replace('src/route-components/previews/loader-previews.tsx', 'color="#3b82f6"', 'color="blue"');

// layout-previews.tsx
replace('src/route-components/previews/layout-previews.tsx', 'variant="primary"', 'color="blue"');
replace('src/route-components/previews/layout-previews.tsx', 'variant="success"', 'color="emerald"');
replace('src/route-components/previews/layout-previews.tsx', 'variant="warning"', 'color="amber"');
replace('src/route-components/previews/layout-previews.tsx', 'variant="danger"', 'color="rose"');
replace('src/route-components/previews/layout-previews.tsx', 'variant="info"', 'color="sky"');
replace('src/route-components/previews/layout-previews.tsx', 'variant="secondary"', 'color="slate"');
regexReplace('src/route-components/previews/layout-previews.tsx', /<GlowyButton\s+variant="[^"]*"/g, '<GlowyButton');

// form-previews.tsx
replace('src/route-components/previews/form-previews.tsx', '{ name: "zinc", class: "bg-muted" }', '{ name: "slate", class: "bg-muted" }');
replace('src/route-components/previews/form-previews.tsx', '<"indigo" | "rose" | "emerald" | "amber" | "sky" | "violet" | "zinc">("indigo")', '<"indigo" | "rose" | "emerald" | "amber" | "sky" | "violet" | "slate">("indigo")');
