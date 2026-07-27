import fs from "fs";
import path from "path";

const COMPONENTS_DIR = path.resolve("src/components/ui");
const REGISTRY_FILE = path.resolve("src/data/registryData.ts");
const REGISTRY_META_FILE = path.resolve("src/data/registryMeta.ts");
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
    typeLabel: "",
    details: [],
    usage: [],
    codeNext: "",
    isNew: false,
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
    } else if (tag === "@registry-type-label") {
      meta.typeLabel = value;
    } else if (tag === "@registry-detail") {
      meta.details.push(value);
    } else if (tag === "@registry-usage") {
      meta.usage.push(value);
    } else if (tag === "@registry-code-next") {
      meta.codeNext = value;
    } else if (tag === "@registry-is-new") {
      meta.isNew = true;
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

// Packages every consumer project already has — never listed as installable deps.
const FRAMEWORK_PROVIDED = new Set(["react", "react-dom", "next", "futureuikit"]);

// Internal aliases that the CLI creates itself (lib/utils) — safe to import.
const SAFE_INTERNAL_IMPORTS = new Set(["@/lib/utils"]);

/**
 * Extracts bare npm module specifiers from import/export/require statements.
 * Returns package names (scope-aware), excluding relative and alias imports.
 */
function extractBareImports(content) {
  const deps = new Set();
  const importRe =
    /(?:import|export)\s+[^'"]*?from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|require\(\s*['"]([^'"]+)['"]\s*\)|import\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRe.exec(content)) !== null) {
    const spec = match[1] || match[2] || match[3] || match[4];
    if (!spec || spec.startsWith(".") || spec.startsWith("@/") || spec.startsWith("node:")) continue;
    const parts = spec.split("/");
    const name = spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
    if (!FRAMEWORK_PROVIDED.has(name)) deps.add(name);
  }
  return deps;
}

/**
 * Extracts internal "@/..." alias imports so we can warn when a component
 * imports app-internal modules that are not shipped with its registry entry.
 */
function extractInternalImports(content) {
  const found = new Set();
  const re = /(?:import|export)\s+[^'"]*?from\s*['"](@\/[^'"]+)['"]/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    found.add(match[1]);
  }
  return found;
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

  // Site-internal icon imports are rewritten to the published package so
  // consumers resolve icons from futureuikit itself ("@/icons" only exists
  // inside this repo).
  let usesPackagedIcons = false;
  const publishTransform = (code) => {
    const rewritten = code.replace(/from\s*(['"])@\/icons\1/g, 'from $1futureuikit/icons$1');
    if (rewritten !== code) usesPackagedIcons = true;
    return rewritten;
  };

  // 1. Process the primary component file
  const primaryContent = fs.readFileSync(filePath, "utf8");
  files.push({
    name: path.basename(filePath),
    content: publishTransform(stripDocblock(primaryContent)),
    targetPath: path.relative(SRC_DIR, filePath).replace(/\\/g, "/"),
  });

  // 2. Process any additional files defined in the DocBlock
  for (const extraFilePath of metadata.files) {
    const resolvedPath = path.resolve(extraFilePath);

    // Registry files must live inside src/ — never publish arbitrary paths.
    const relToSrc = path.relative(SRC_DIR, resolvedPath);
    if (relToSrc.startsWith("..") || path.isAbsolute(relToSrc)) {
      throw new Error(
        `Registry file outside src/ is not allowed: ${extraFilePath} (referenced in ${filePath})`
      );
    }

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Referenced registry file not found: ${extraFilePath} (referenced in ${filePath})`);
    }

    const extraContent = fs.readFileSync(resolvedPath, "utf8");
    files.push({
      name: path.basename(resolvedPath),
      content: publishTransform(extraContent),
      targetPath: path.relative(SRC_DIR, resolvedPath).replace(/\\/g, "/"),
    });
  }

  // Merge hand-declared dependencies with ones detected from the actual
  // imports in every shipped file, so installed components always compile.
  // Keyed by package name so a hand-declared versioned spec ("pkg@^2") wins
  // over the bare name detected from imports. Subpaths are normalized to
  // package names ("next/link" -> "next") and framework packages dropped.
  const depSpecByName = new Map();
  const packageNameOf = (spec) => {
    // A version suffix only follows the name: "pkg@^2", "@scope/pkg@^2".
    const withoutVersion = spec.startsWith("@")
      ? "@" + spec.slice(1).split("@")[0]
      : spec.split("@")[0];
    const parts = withoutVersion.split("/");
    return withoutVersion.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
  };
  for (const declared of metadata.dependencies) {
    const name = packageNameOf(declared);
    if (FRAMEWORK_PROVIDED.has(name)) continue;
    // Keep the declared spec only when it is the bare name or name@version;
    // subpath forms ("next/link") collapse to the package name.
    const isNameOrVersioned = declared === name || declared.slice(name.length).startsWith("@");
    depSpecByName.set(name, isNameOrVersioned ? declared : name);
  }
  for (const f of files) {
    for (const dep of extractBareImports(f.content)) {
      if (!depSpecByName.has(dep)) depSpecByName.set(dep, dep);
    }
  }
  if (usesPackagedIcons && !depSpecByName.has("futureuikit")) {
    depSpecByName.set("futureuikit", "futureuikit");
  }
  const detected = new Set(depSpecByName.values());

  // Warn when a shipped file imports app-internal modules that are neither
  // part of this entry's files nor created by the CLI — consumers would get
  // an unresolvable import.
  const shippedTargets = new Set(
    files.map((f) => "@/" + f.targetPath.replace(/\.(tsx|ts|jsx|js)$/, ""))
  );
  for (const f of files) {
    for (const internal of extractInternalImports(f.content)) {
      if (!SAFE_INTERNAL_IMPORTS.has(internal) && !shippedTargets.has(internal)) {
        console.warn(
          `   ! WARNING [${metadata.slug}]: ${f.name} imports "${internal}" which is not shipped with this entry.`
        );
      }
    }
  }

  return {
    name: metadata.name,
    type: metadata.type,
    description: metadata.description,
    category: metadata.category,
    typeLabel: metadata.typeLabel || undefined,
    details: metadata.details.length > 0 ? metadata.details : undefined,
    usage: metadata.usage.length > 0 ? metadata.usage : undefined,
    codeNext: metadata.codeNext || undefined,
    isNew: metadata.isNew || undefined,
    dependencies: Array.from(detected).sort(),
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

  // Also emit a lightweight metadata-only module (no file contents) for
  // client-side consumers — keeps megabytes of source strings out of
  // browser bundles. The full registry stays server-only.
  const meta = {};
  for (const [slug, entry] of Object.entries(sortedRegistry)) {
    meta[slug] = {
      name: entry.name,
      type: entry.type,
      description: entry.description,
      category: entry.category,
      typeLabel: entry.typeLabel,
      details: entry.details,
      usage: entry.usage,
      codeNext: entry.codeNext,
      isNew: entry.isNew,
      dependencies: entry.dependencies,
      files: entry.files.map((f) => ({ name: f.name, targetPath: f.targetPath })),
    };
  }
  const metaOutput = `// Generated by bin/sync.mjs — registry metadata WITHOUT component source.
// Safe to import from client components; the full registry (registryData.ts)
// must stay server-side only.

export interface RegistryMetaItem {
  name: string;
  type: string;
  description?: string;
  category?: string;
  typeLabel?: string;
  details?: string[];
  usage?: string[];
  codeNext?: string;
  isNew?: boolean;
  dependencies?: string[];
  files: { name: string; targetPath?: string }[];
}

export const registryMeta: Record<string, RegistryMetaItem> = ${JSON.stringify(meta, null, 2)};
`;
  fs.writeFileSync(REGISTRY_META_FILE, metaOutput, "utf8");

  console.log(`\n✅ Successfully synchronized ${slugs.size} components to ${path.basename(REGISTRY_FILE)} (+ ${path.basename(REGISTRY_META_FILE)})`);
}

// Execute the sync
main();
