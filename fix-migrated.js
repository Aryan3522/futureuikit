const fs = require('fs');

const migrated = 'src/route-components/previews/migrated-previews.tsx';
let migratedContent = fs.readFileSync(migrated, 'utf8');

// Fix RadioGroup
migratedContent = migratedContent.replace(/<RadioGroup defaultValue="option-1" variant=\{variant\}>/g, '<RadioGroup defaultValue="option-1">');

// Fix TypingAnimation
migratedContent = migratedContent.replace(/<TypingAnimation\s+text="Future UI"\s+className="text-4xl font-bold"\s*\/>/g, '<TypingAnimation className="text-4xl font-bold">Future UI</TypingAnimation>');
migratedContent = migratedContent.replace(/<TypingAnimation text="Hello, welcome to Future UI!" className="text-4xl font-bold text-primary" \/>/g, '<TypingAnimation className="text-4xl font-bold text-primary">Hello, welcome to Future UI!</TypingAnimation>');

// Fix Terminal
migratedContent = migratedContent.replace(/<Terminal variant=\{variant\}/g, '<Terminal');

// Fix Dock
migratedContent = migratedContent.replace(/<Dock variant=\{variant\}/g, '<Dock');

// Fix GutterLines
migratedContent = migratedContent.replace(/<GutterLines variant=\{variant\} color=\{color\} className="absolute inset-0 w-full h-full pointer-events-none" \/>/g, '<GutterLines variant={variant as "default" | "vertical"} color={color} className="absolute inset-0 w-full h-full pointer-events-none" />');
migratedContent = migratedContent.replace(/variants=\{\["default", "dense", "wide", "vertical"\]\}/g, 'variants={["default", "vertical"]}');

fs.writeFileSync(migrated, migratedContent, 'utf8');

const search = 'src/route-components/previews/search-previews.tsx';
let searchContent = fs.readFileSync(search, 'utf8');

// Fix Search
searchContent = searchContent.replace(/size="sm"/g, '');
searchContent = searchContent.replace(/size="md"/g, '');
searchContent = searchContent.replace(/size="lg"/g, '');

fs.writeFileSync(search, searchContent, 'utf8');

console.log('Fixed migrated and search');
