import fs from "fs";
import path from "path";

const COMPONENTS_DIR = path.resolve("src/components/ui");
const REGISTRY_FILE = path.resolve("src/data/registryData.ts");
const BACKUP_FILE = path.resolve("src/data/registryData.backup.ts");

function walk(dir) {
  const results = [];

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...walk(fullPath));
    } else if (file.endsWith(".tsx")) {
      results.push(fullPath);
    }
  }

  return results;
}

function parseDocblock(content) {
  const match = content.match(/^\/\*\*([\s\S]*?)\*\//);

  if (!match) return null;

  const block = match[1];

  const meta = {
    slug: "",
    name: "",
    description: "",
    category: "ui",
    dependencies: [],
  };

  for (const line of block.split("\n")) {
    const cleaned = line.replace(/^\s*\*\s?/, "").trim();

    if (cleaned.startsWith("@registry-slug")) {
      meta.slug = cleaned.replace("@registry-slug", "").trim();
    }

    if (cleaned.startsWith("@registry-name")) {
      meta.name = cleaned.replace("@registry-name", "").trim();
    }

    if (cleaned.startsWith("@registry-description")) {
      meta.description = cleaned
        .replace("@registry-description", "")
        .trim();
    }

    if (cleaned.startsWith("@registry-category")) {
      meta.category = cleaned
        .replace("@registry-category", "")
        .trim();
    }

    if (cleaned.startsWith("@registry-dependency")) {
      meta.dependencies.push(
        cleaned.replace("@registry-dependency", "").trim()
      );
    }
  }

  return meta;
}

function stripRegistryDocblock(content) {
  return content
    .replace(/^\/\*\*[\s\S]*?\*\//, "")
    .trimStart();
}

function loadRegistryObject(fileContent) {
  const start = fileContent.indexOf("{");
  const end = fileContent.lastIndexOf("};");

  if (start === -1 || end === -1) {
    throw new Error("Could not locate registry object.");
  }

  const objectString = fileContent.slice(start, end + 1);

  try {
    return Function(`return (${objectString})`)();
  } catch (err) {
    console.error("Failed to parse registryData.ts");
    throw err;
  }
}

function saveRegistry(registry) {
  const output = `import { Registry } from '@/types';

export const registry: Registry = ${JSON.stringify(
    registry,
    null,
    2
  )};
`;

  fs.writeFileSync(REGISTRY_FILE, output, "utf8");
}

function main() {
  console.log("🔄 Sync started");

  if (!fs.existsSync(REGISTRY_FILE)) {
    throw new Error("registryData.ts not found");
  }

  fs.copyFileSync(REGISTRY_FILE, BACKUP_FILE);
  console.log("📦 Backup created");

  const registryContent = fs.readFileSync(REGISTRY_FILE, "utf8");
  const registry = loadRegistryObject(registryContent);

  const files = walk(COMPONENTS_DIR);

  const seenSlugs = new Set();

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");

    const metadata = parseDocblock(raw);

    if (!metadata) {
      continue;
    }

    if (!metadata.slug) {
      throw new Error(
        `${path.basename(file)} missing @registry-slug`
      );
    }

    if (!metadata.name) {
      throw new Error(
        `${path.basename(file)} missing @registry-name`
      );
    }

    if (seenSlugs.has(metadata.slug)) {
      throw new Error(
        `Duplicate registry slug: ${metadata.slug}`
      );
    }

    seenSlugs.add(metadata.slug);

    const componentCode = stripRegistryDocblock(raw);

    registry[metadata.slug] = {
      name: metadata.name,
      type: "components:ui",
      description: metadata.description,
      category: metadata.category,
      dependencies: [...new Set(metadata.dependencies)],
      files: [
        {
          name: path.basename(file),
          content: componentCode,
          targetPath: `components/ui/${path.basename(file)}`
        }
      ]
    };

    console.log(`✓ ${metadata.slug}`);
  }

  const sortedRegistry = Object.keys(registry)
    .sort()
    .reduce((acc, key) => {
      acc[key] = registry[key];
      return acc;
    }, {});

  saveRegistry(sortedRegistry);

  console.log(
    `✅ Sync complete (${files.length} files scanned)`
  );
}

main();