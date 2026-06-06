const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'components', 'Comps.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// Remove topPicksComponents and newArrivalsComponents cleanly using a simpler replace
content = content.replace(/const topPicksComponents = useMemo\(\(\) => \{[\s\S]*?\}, \[\]\);/, '');
content = content.replace(/const newArrivalsComponents = useMemo\(\(\) => \{[\s\S]*?\}, \[\]\);/, '');

// Replace the main wrapper div
content = content.replace(/<div className="min-h-screen bg-background text-foreground font-body-md overflow-clip pt-16 relative">/, '<div className="relative w-full">');
content = content.replace(/className="fixed inset-0 z-1 pointer-events-none opacity-5"/, 'className="fixed inset-0 z-1 pointer-events-none opacity-[0.03]"');

// Remove the max-w-360 layout wrapper that breaks the layout
content = content.replace(/<div className="max-w-360 mx-auto flex items-start gap-6 pt-16 pb-32 px-4 md:px-16 relative z-10">/, '<div className="w-full relative z-10 pb-32">');

fs.writeFileSync(targetPath, content);
console.log('Fixed Comps.tsx');
