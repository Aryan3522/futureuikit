#!/usr/bin/env node

import fs from "fs";
import path from "path";

const COMPONENTS_DIR = path.resolve("src/components/ui");
const ICONS_DIR = path.resolve("src/icons");
const README_FILE = path.resolve("README.md");

function walk(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...walk(fullPath));
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      results.push(fullPath);
    }
  }
  return results;
}

function parseDocblock(content) {
  const match = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!match) return null;
  const block = match[1];
  if (!block.includes("@registry-slug")) return null;

  const meta = { slug: "", name: "", category: "ui" };
  const lines = block.split("\n");
  for (const line of lines) {
    const cleaned = line.replace(/^\s*\*\s?/, "").trim();
    if (!cleaned) continue;
    const parts = cleaned.split(/\s+/);
    const tag = parts[0];
    const value = cleaned.slice(tag.length).trim();

    if (tag === "@registry-slug") meta.slug = value;
    else if (tag === "@registry-name" || tag === "@name") {
      if (!meta.name || tag === "@registry-name") meta.name = value;
    }
    else if (tag === "@registry-category") meta.category = value;
  }
  return meta.slug ? meta : null;
}

function formatCategory(slug, category) {
  if (slug === "icons") return "Icon";

  // First check curated slug-based categories (takes priority)
  const slugCategory = {
    "primary": "Form",
    "glowy": "Form",
    "skeuomorphic-button": "Form",
    "clay-morph-button": "Form",
    "minimal-button": "Form",
    "cursor-glow-button": "Form",
    "button": "Form",
    "badge": "Display",
    "search-input": "Form",
    "search": "Form",
    "select": "Form",
    "file-upload": "Form",
    "toggle": "Form",
    "toggle-group": "Form",
    "slider": "Form",
    "radio-group": "Form",
    "input-otp": "Form",
    "dynamic-form": "Form",
    "form-builder": "Form",
    "otp-input": "Form",
    "otp-verification": "Form",
    "filter-builder": "Form",
    "toast": "Feedback",
    "modal": "Feedback",
    "drawer": "Feedback",
    "error-page": "Feedback",
    "cinematic-error": "Feedback",
    "sonner": "Feedback",
    "alert-dialog": "Feedback",
    "basic-loader": "Loader",
    "boxy-bounce": "Loader",
    "boxy-rotate": "Loader",
    "boxy-shift": "Loader",
    "skeleton": "Loader",
    "basic-card": "Display",
    "card": "Layout",
    "expanding-card": "Display",
    "hover-glare-card": "Display",
    "nexus-card": "Display",
    "glass-panel": "Display",
    "infinite-slider": "Display",
    "badge": "Display",
    "accordion": "Layout",
    "collapsible": "Layout",
    "dock": "Navigation",
    "menu": "Navigation",
    "header": "Navigation",
    "sidebar-button": "Navigation",
    "menubar": "Navigation",
    "global-breadcrumb": "Navigation",
    "dropdown-menu": "Navigation",
    "context-menu": "Navigation",
    "hover-card": "Navigation",
    "tooltip": "Navigation",
    "command-palette": "Navigation",
    "component-page-sidebar": "Navigation",
    "pagination": "Navigation",
    "particles": "Background",
    "dot-background": "Background",
    "perspective-grid": "Background",
    "point-cursor": "UI",
    "scroll-progress": "UI",
    "scroll-area": "UI",
    "resizable": "UI",
    "calculator": "Utility",
    "calendar": "Utility",
    "text-system": "Typography",
    "footer": "Layout",
    "kanban": "Board",
    "workflow-builder": "Board",
    "rich-text-editor": "Editor",
    "ai-chat": "Application",
    "terminal": "Application",
    "browser-window": "Application",
    "project-deck": "Display",
    "puzzle-video": "Display",
    "velocity-marquee": "Display",
    "components-grid": "Display",
    "text-3d-flip": "Typography",
    "typing-animation": "Typography",
    "scroll-text-reveal": "Typography",
    "slide-up-reveal": "Typography",
    "highlighter": "Typography",
    "aspect-ratio": "Layout",
    "icon-cloud": "Display",
    "premium-upload-button": "Form",
    "GutterLines": "Background",
    "noir-hero-3d": "Display",
    "scifi-helmet": "Display",
    "automotive-carousel": "Display",
    "resizable": "Layout",
    "scroll-area": "Layout",
    "icon": "Icon",
  };
  if (slugCategory[slug]) return slugCategory[slug];

  // Fallback: use category from DocBlock
  const docblockCategory = {
    "loader": "Loader",
    "ui": "UI",
    "form": "Form",
    "feedback": "Feedback",
    "background": "Background",
    "display": "Display",
    "layout": "Layout",
    "navigation": "Navigation",
    "typography": "Typography",
    "utility": "Utility",
    "icon": "Icon",
  };
  if (docblockCategory[category]) return docblockCategory[category];

  return "UI";
}

function formatName(name, slug) {
  if (slug === "icons") return "Icons (300+)";
  return name;
}

function main() {
  // Collect all registry components
  const components = [];
  const allFiles = walk(COMPONENTS_DIR);
  for (const file of allFiles) {
    const content = fs.readFileSync(file, "utf8");
    const meta = parseDocblock(content);
    if (!meta) continue;
    components.push(meta);
  }

  // Sort alphabetically by slug
  components.sort((a, b) => a.slug.localeCompare(b.slug));

  // Count icons
  const iconFiles = fs.readdirSync(ICONS_DIR).filter(
    (f) => (f.endsWith(".tsx") || f.endsWith(".ts")) && f !== "utils.ts"
  );

  const componentCount = components.length;
  const iconCount = iconFiles.length;
  const totalCount = componentCount + iconCount;

  // Generate the component table
  let table = `| Slug | Component | Category |
|------|-----------|----------|
`;
  for (const comp of components) {
    const displayName = formatName(comp.name, comp.slug);
    table += `| \`${comp.slug}\` | ${displayName} | ${formatCategory(comp.slug, comp.category)} |
`;
  }

  // Read current README
  let readme = fs.readFileSync(README_FILE, "utf8");

  // Update component count in features section: e.g. "29+ components" -> "90+ components"
  const countRegex = /\d+\+\s*components/;
  if (countRegex.test(readme)) {
    readme = readme.replace(countRegex, `${componentCount}+ components`);
  }

  // Replace the Available Components section.
  // Find the table between "## 📦 Available Components" and the next "---" or ">" or "##"
  const sectionHeader = "## 📦 Available Components";
  const headerIndex = readme.indexOf(sectionHeader);
  if (headerIndex === -1) {
    console.error("Could not find '## 📦 Available Components' section in README.md");
    process.exit(1);
  }

  const afterHeader = readme.slice(headerIndex + sectionHeader.length);
  // Find the next section start: "---", "##", or end of file
  const nextSectionMatch = afterHeader.match(/\n(---|\n##|>)/);
  const tableEnd = nextSectionMatch ? headerIndex + sectionHeader.length + nextSectionMatch.index : readme.length;

  // Rebuild the section
  const newSection = `${sectionHeader}\n\n${table.trimEnd()}\n\n`;
  readme = readme.slice(0, headerIndex) + newSection + readme.slice(tableEnd);

  // Write back
  fs.writeFileSync(README_FILE, readme, "utf8");
  console.log(`Updated README.md: ${componentCount} components, ${iconCount} icons`);
}

main();
