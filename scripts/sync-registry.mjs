import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const UI_DIR = path.join(ROOT_DIR, "src", "components", "ui");
const ICONS_DIR = path.join(ROOT_DIR, "src", "icons");
const REGISTRY_PATH = path.join(ROOT_DIR, "src", "data", "registryData.ts");

/**
 * Extracts metadata and files from component source code.
 */
async function parseComponent(filePath) {
  const content = await fs.readFile(filePath, "utf-8");
  const fileName = path.basename(filePath);

  const slugMatch = content.match(/@registry-slug\s+([^\n]+)/);
  if (!slugMatch) return null;

  const slug = slugMatch[1].trim();
  const name = (content.match(/@registry-name\s+([^\n]+)/)?.[1] || slug).trim();
  const description = (content.match(/@registry-description\s+([^\n]+)/)?.[1] || "").trim();
  const category = (content.match(/@registry-category\s+([^\n]+)/)?.[1] || "ui").trim();
  const type = (content.match(/@registry-type\s+([^\n]+)/)?.[1] || "components:ui").trim();

  const dependencies = [
    ...new Set(
      [...content.matchAll(/@registry-dependency\s+([^\n]+)/g)]
        .flatMap((m) => m[1].trim().split(/\s+/))
        .filter(Boolean)
    ),
  ];
  const extraFilesPaths = [...content.matchAll(/@registry-file\s+([^\n]+)/g)].map(m => m[1].trim());

  const files = [
    {
      name: fileName,
      content: content.replace(/\/\*\*[\s\S]*?@registry-slug[\s\S]*?\*\//, "").trim(),
      targetPath: `components/ui/${fileName}`
    }
  ];

  for (const extraPath of extraFilesPaths) {
    const fullPath = path.resolve(ROOT_DIR, extraPath);
    const extraContent = await fs.readFile(fullPath, "utf-8");
    files.push({
      name: path.basename(extraPath),
      content: extraContent.replace(/\/\*\*[\s\S]*?@registry-slug[\s\S]*?\*\//, "").trim(),
      targetPath: extraPath.replace(/^src\//, "")
    });
  }

  return {
    slug,
    data: {
      name,
      type,
      description,
      category,
      dependencies,
      files
    }
  };
}

async function parseIcons() {
  const files = await fs.readdir(ICONS_DIR);
  const iconFiles = files
    .filter((file) => /\.(tsx|ts)$/.test(file))
    .sort((a, b) => (a === "index.ts" ? 1 : b === "index.ts" ? -1 : a.localeCompare(b)));

  const registryFiles = [];
  for (const file of iconFiles) {
    const content = await fs.readFile(path.join(ICONS_DIR, file), "utf-8");
    registryFiles.push({
      name: file,
      content: content.trim(),
      targetPath: `components/ui/icons/${file}`,
    });
  }

  return {
    name: "Icons",
    type: "components:ui",
    description: "A premium collection of animated SVG React icons.",
    category: "icons",
    dependencies: ["framer-motion"],
    files: registryFiles,
  };
}

async function sync() {
  console.log("Syncing registry...");
  const files = await fs.readdir(UI_DIR);
  const registry = {};

  for (const file of files) {
    if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      const result = await parseComponent(path.join(UI_DIR, file));
      if (result) {
        console.log(`Found component: ${result.slug} (${file})`);
        registry[result.slug] = result.data;
      }
    }
  }

  registry.icons = await parseIcons();
  console.log(`Found component: icons (${registry.icons.files.length} files)`);

  const output = `import { Registry } from '@/types';

export const registry: Registry = ${JSON.stringify(registry, null, 2)};
`;

  await fs.writeFile(REGISTRY_PATH, output, "utf-8");
  console.log(`Registry updated at ${REGISTRY_PATH}`);
}

sync().catch(err => {
  console.error("Sync failed:", err);
  process.exit(1);
});
