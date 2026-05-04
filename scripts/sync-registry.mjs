import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const UI_DIR = path.join(ROOT_DIR, "src", "components", "ui");
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
  const type = (content.match(/@registry-type\s+([^\n]+)/)?.[1] || "components:ui").trim();
  
  const dependencies = [...content.matchAll(/@registry-dependency\s+([^\n]+)/g)].map(m => m[1].trim());
  const extraFilesPaths = [...content.matchAll(/@registry-file\s+([^\n]+)/g)].map(m => m[1].trim());

  const files = [
    {
      name: fileName,
      content: content.replace(/\/\*\*[\s\S]*?@registry-slug[\s\S]*?\*\//, "").trim()
    }
  ];

  for (const extraPath of extraFilesPaths) {
    const fullPath = path.resolve(ROOT_DIR, extraPath);
    const extraContent = await fs.readFile(fullPath, "utf-8");
    files.push({
      name: path.basename(extraPath),
      content: extraContent.replace(/\/\*\*[\s\S]*?@registry-slug[\s\S]*?\*\//, "").trim()
    });
  }

  return {
    slug,
    data: {
      name,
      type,
      dependencies,
      files
    }
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
