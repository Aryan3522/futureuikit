const fs = require('fs');

const migrated = 'src/route-components/previews/migrated-previews.tsx';
let migratedContent = fs.readFileSync(migrated, 'utf8');

// Remove Breadcrumb imports
migratedContent = migratedContent.replace(/import \{\s*Breadcrumb,\s*BreadcrumbItem,\s*BreadcrumbLink,\s*BreadcrumbList,\s*BreadcrumbPage,\s*BreadcrumbSeparator,\s*\} from "@\/components\/ui\/breadcrumb";/g, '');

// Remove BreadcrumbPreview Component and export
migratedContent = migratedContent.replace(/export const BreadcrumbPreview: React\.FC = \(\) => \{[\s\S]*?\n  \};\s*\n/g, '');

// Remove size="icon" from Button in DatePicker
migratedContent = migratedContent.replace(/size="icon"/g, '');

// Fix HighlighterColor
migratedContent = migratedContent.replace(/color="#facc15"/g, 'color="amber"');

fs.writeFileSync(migrated, migratedContent, 'utf8');

console.log('Fixed Breadcrumb, size="icon", and HighlighterColor');
