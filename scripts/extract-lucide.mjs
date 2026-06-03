import { icons } from 'lucide';
import fs from 'fs';

const requiredIcons = [
  "Activity", "AlertCircle", "AlignCenter", "AlignJustify", "AlignLeft", "AlignRight", "ArrowDown", "ArrowLeft", 
  "ArrowRight", "ArrowUpRight", "Bell", "Bold", "BookOpen", "Bot", "Brush", "Calculator", "Calendar", "Check", 
  "CheckCircle2", "CheckSquare", "ChevronDown", "ChevronLeft", "ChevronRight", "Clock", "Code", "Code2", 
  "Compass", "Copy", "Cpu", "CreditCard", "Delete", "Divide", "Droplets", "Edit2", "Equal", "Eye", "EyeOff", 
  "File", "FileCode", "FileText", "Filter", "GalleryHorizontal", "Globe", "Grid", "Grip", "GripVertical", 
  "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6", "HelpCircle", "Highlighter", "Home", 
  "Image", "ImagePlus", "Italic", "Layers", "Layout", "Link", "List", "ListOrdered", "Loader2", "Lock", "Mail", 
  "MapPin", "Maximize", "Menu", "MessageSquare", "Mic", "Minus", "Monitor", "MoreHorizontal", "MousePointer2", 
  "MousePointerClick", "Navigation", "Newspaper", "Package", "PackageCheck", "Palette", "Paperclip", "Pencil", 
  "Percent", "Phone", "Play", "Plus", "Quote", "RefreshCcw", "Rocket", "RotateCcw", "Rows3", "Search", "Send", 
  "Settings", "Settings2", "Shield", "ShieldCheck", "Smile", "Sparkles", "Square", "StopCircle", "Strikethrough", 
  "Table", "Target", "Terminal", "ThumbsDown", "ThumbsUp", "Trash2", "Type", "Underline", "UploadCloud", "User", 
  "Video", "X", "Zap"
];

const extracted = {};

for (const name of requiredIcons) {
  // Try to find the icon in the lucide object. Note: Lucide exports might be camelCase or PascalCase.
  const icon = icons[name] || icons[name.charAt(0).toLowerCase() + name.slice(1)];
  if (icon) {
    // icon is typically an array of SVG child nodes: [ [tag, { attributes }], [tag, { attributes }] ]
    extracted[name] = icon[2] || icon; 
  } else {
    extracted[name] = null;
  }
}

fs.writeFileSync('extracted-lucide-paths.json', JSON.stringify(extracted, null, 2));
console.log("Extracted paths for", Object.keys(extracted).filter(k => extracted[k]).length, "out of", requiredIcons.length, "icons.");
