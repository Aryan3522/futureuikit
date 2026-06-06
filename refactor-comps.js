const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'components', 'Comps.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Add import for useSearchParams
content = content.replace(
  'import Link from "next/link";',
  'import Link from "next/link";\nimport { useSearchParams } from "next/navigation";'
);

// 2. Remove TOP_PICKS, CATEGORIES_SECTION, SIDEBAR_NAV
// Wait, we need CATEGORIES_SECTION for the grid on the components page.
// We should ONLY remove SIDEBAR_NAV and TOP_PICKS
content = content.replace(/const TOP_PICKS = \[\n?[^;]+\];/s, '');
content = content.replace(/const SIDEBAR_NAV = \[\n?[^;]+\];/s, '');

// 3. Update Comps component state
const oldStateBlock = `export default function Comps() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("components");
  const [searchQuery, setSearchQuery] = useState("");`;

const newStateBlock = `export default function Comps() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "components";
  const selectedCategory = searchParams.get("category");`;

content = content.replace(oldStateBlock, newStateBlock);

// 4. Remove topPicksComponents and newArrivalsComponents
content = content.replace(/const topPicksComponents = useMemo\(\(\) => \{\n    return componentsList.filter\(c => TOP_PICKS.includes\(c.slug\)\);\n  \}, \[\]\);\n\n  /g, '');
content = content.replace(/const newArrivalsComponents = useMemo\(\(\) => \{\n    return componentsList.filter\(c => c.isNew\);\n  \}, \[\]\);\n\n  /g, '');

// 5. Update wrapper and remove sidebar
const oldWrapperStart = `<div className="min-h-screen bg-background text-foreground font-body-md overflow-clip pt-16 relative">
      {/* Noise Background */}
      <div 
        className="fixed inset-0 z-1 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
          transform: \`translate(\${mousePos.x}px, \${mousePos.y}px)\`
        }}
      />

      <div className="max-w-360 mx-auto flex items-start gap-6 pt-16 pb-32 px-4 md:px-16 relative z-10">`;

// Find the sidebar and remove it
const sidebarRegex = /<aside.*?<\/aside>/s;
content = content.replace(sidebarRegex, '');

const newWrapperStart = `<div className="relative w-full">
      {/* Noise Background */}
      <div 
        className="fixed inset-0 z-1 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
          transform: \`translate(\${mousePos.x}px, \${mousePos.y}px)\`
        }}
      />

      <div className="w-full relative z-10 pb-32">`;

content = content.replace(oldWrapperStart, newWrapperStart);

fs.writeFileSync(targetPath, content);
console.log('Comps.tsx updated!');
