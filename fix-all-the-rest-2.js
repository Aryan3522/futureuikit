const fs = require('fs');

function replaceStr(file, find, replace) {
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

// feedback-previews.tsx
regexReplace('src/route-components/previews/feedback-previews.tsx', /variant=\{position === pos \? "default" : "outline"\}/g, 'variant={position === pos ? "solid" : "outline"}');
regexReplace('src/route-components/previews/feedback-previews.tsx', /variant="modern"/g, 'variant="solid"'); // from my previous broken replace

// form-previews.tsx
regexReplace('src/route-components/previews/form-previews.tsx', /size=\{size\}/g, '');

// loader-previews.tsx
regexReplace('src/route-components/previews/loader-previews.tsx', /color="#10b981"/g, 'color="emerald"');
regexReplace('src/route-components/previews/loader-previews.tsx', /color="#f59e0b"/g, 'color="amber"');
regexReplace('src/route-components/previews/loader-previews.tsx', /color="#3b82f6"/g, 'color="blue"');

// migrated-previews.tsx
regexReplace('src/route-components/previews/migrated-previews.tsx', /variant="comfortable"/g, 'spacing="4x"');
regexReplace('src/route-components/previews/migrated-previews.tsx', /variant="compact"/g, 'spacing="2x"');
regexReplace('src/route-components/previews/migrated-previews.tsx', /text="Future UI"/g, 'children="Future UI"');
regexReplace('src/route-components/previews/migrated-previews.tsx', /variant="dense"/g, 'density="high"');

// search-previews.tsx
regexReplace('src/route-components/previews/search-previews.tsx', /\ssize="md"/g, '');

console.log('Fixed all the rest');
