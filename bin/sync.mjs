import fs from "fs";
import path from "path";

const COMPONENTS_DIR = path.resolve("src/components/ui");
const REGISTRY_FILE = path.resolve("src/data/registryData.ts");
const SRC_DIR = path.resolve("src");

/**
 * Recursively walks a directory and returns all .tsx and .ts files.
 */
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

/**
 * Parses the registry metadata from a file's DocBlock.
 */
function parseDocblock(content) {
  const match = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!match) return null;

  const block = match[1];
  if (!block.includes("@registry-slug")) return null;

  const meta = {
    slug: "",
    name: "",
    description: "",
    category: "ui",
    type: "components:ui",
    dependencies: [],
    files: [],
  };

  const lines = block.split("\n");
  for (const line of lines) {
    const cleaned = line.replace(/^\s*\*\s?/, "").trim();
    if (!cleaned) continue;

    const parts = cleaned.split(/\s+/);
    const tag = parts[0];
    const value = cleaned.slice(tag.length).trim();

    if (tag === "@registry-slug") {
      meta.slug = value;
    } else if (tag === "@registry-name" || tag === "@name") {
      // Prefer @registry-name over @name as fallback
      if (!meta.name || tag === "@registry-name") {
        meta.name = value;
      }
    } else if (tag === "@registry-description" || tag === "@description") {
      // Prefer @registry-description over @description as fallback
      if (!meta.description || tag === "@registry-description") {
        meta.description = value;
      }
    } else if (tag === "@registry-category") {
      meta.category = value;
    } else if (tag === "@registry-type") {
      meta.type = value;
    } else if (tag === "@registry-dependency") {
      // Support space-separated dependencies on one line
      const deps = value.split(/\s+/).filter(Boolean);
      meta.dependencies.push(...deps);
    } else if (tag === "@registry-file") {
      // Support space-separated files on one line
      const extraFiles = value.split(/\s+/).filter(Boolean);
      meta.files.push(...extraFiles);
    }
  }

  return meta;
}

/**
 * Removes the registry DocBlock from the component code.
 */
function stripDocblock(content) {
  // Target only the DocBlock that contains the registry metadata.
  return content.replace(/\/\*\*[\s\S]*?@registry-slug[\s\S]*?\*\//, "").trimStart();
}

/**
 * Creates a registry entry for a single component.
 */
function createRegistryEntry(filePath, metadata) {
  const files = [];

  // 1. Process the primary component file
  const primaryContent = fs.readFileSync(filePath, "utf8");
  files.push({
    name: path.basename(filePath),
    content: stripDocblock(primaryContent),
    targetPath: path.relative(SRC_DIR, filePath).replace(/\\/g, "/"),
  });

  // 2. Process any additional files defined in the DocBlock
  for (const extraFilePath of metadata.files) {
    const resolvedPath = path.resolve(extraFilePath);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Referenced registry file not found: ${extraFilePath} (referenced in ${filePath})`);
    }

    const extraContent = fs.readFileSync(resolvedPath, "utf8");
    files.push({
      name: path.basename(resolvedPath),
      content: extraContent,
      targetPath: path.relative(SRC_DIR, resolvedPath).replace(/\\/g, "/"),
    });
  }

  return {
    name: metadata.name,
    type: metadata.type,
    description: metadata.description,
    category: metadata.category,
    dependencies: Array.from(new Set(metadata.dependencies)),
    files,
  };
}

/**
 * Main execution function.
 */
function main() {
  console.log("🔄 Starting Registry Synchronization...");

  const registry = {};
  const slugs = new Set();
  const allFiles = walk(COMPONENTS_DIR);

  for (const file of allFiles) {
    const content = fs.readFileSync(file, "utf8");
    const metadata = parseDocblock(content);

    // Skip files that don't have a registry DocBlock
    if (!metadata) continue;

    // Validation
    if (!metadata.slug) {
      throw new Error(`CRITICAL: File ${file} is missing @registry-slug`);
    }

    if (!metadata.name) {
      throw new Error(`CRITICAL: File ${file} is missing @registry-name (or @name fallback)`);
    }

    if (slugs.has(metadata.slug)) {
      throw new Error(`CRITICAL: Duplicate registry slug detected: ${metadata.slug}`);
    }

    slugs.add(metadata.slug);

    // Create entry
    registry[metadata.slug] = createRegistryEntry(file, metadata);
    console.log(`   + Registered: ${metadata.slug}`);
  }

  // Sort registry keys alphabetically
  const sortedRegistry = {};
  Object.keys(registry)
    .sort()
    .forEach((key) => {
      sortedRegistry[key] = registry[key];
    });

  // Prepare file content
  const output = `import { Registry } from '@/types';

export const registry: Registry = ${JSON.stringify(sortedRegistry, null, 2)};
`;

  // Write to destination
  fs.writeFileSync(REGISTRY_FILE, output, "utf8");

  console.log(`\n✅ Successfully synchronized ${slugs.size} components to ${path.basename(REGISTRY_FILE)}`);
}

// Execute the sync
main();
