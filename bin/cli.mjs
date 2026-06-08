#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

/**
 * CLI for Future UI
 * Handles component installation with tech stack detection and path resolution.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load CLI's own package.json for version and default config
const cliPackageJson = JSON.parse(
  await fs.readFile(path.join(__dirname, "..", "package.json"), "utf-8")
);

const DEFAULT_REGISTRY_URL =
  cliPackageJson.config?.registryUrl || "https://futureuikit.vercel.app/api/registry";

const args = process.argv.slice(2);
const command = args[0];
const slug = args[1];
const registryFlagIndex = args.findIndex((arg) => arg === "--registry");
const force = args.includes("--force");

const registryUrl =
  (registryFlagIndex >= 0 ? args[registryFlagIndex + 1] : undefined) ||
  process.env.FUTURE_UI_REGISTRY_URL ||
  process.env.FUTURE_UI_API_URL ||
  DEFAULT_REGISTRY_URL;

function printHelp() {
  console.log(`Future UI CLI v${cliPackageJson.version}

Usage:
  npx futureuikit add <component-slug> [--force] [--registry <url>]

Examples:
  npx futureuikit add boxy-bounce
  npx futureuikit add icons
  npx futureuikit add boxy-bounce --registry https://futureuikit.vercel.app/api/registry

Environment:
  FUTURE_UI_REGISTRY_URL  Override the registry base URL.
`);
}

if (command === "--version" || command === "-v") {
  console.log(cliPackageJson.version);
  process.exit(0);
}

if (command === "--help" || command === "-h") {
  printHelp();
  process.exit(0);
}

if (command !== "add" || !slug || (registryFlagIndex >= 0 && !args[registryFlagIndex + 1])) {
  printHelp();
  process.exit(1);
}

/**
 * Detects the user's project stack and directory structure.
 */
async function detectProjectStack(cwd) {
  let isSrc = false;
  let isNext = false;
  let isTs = false;
  let framework = "React";

  // Check for src directory
  try {
    await fs.access(path.join(cwd, "src"));
    isSrc = true;
  } catch {}

  // Check package.json for framework details
  try {
    const pkgContent = await fs.readFile(path.join(cwd, "package.json"), "utf-8");
    const pkg = JSON.parse(pkgContent);
    const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    
    if (allDeps.next) {
      isNext = true;
      framework = "Next.js";
    } else if (allDeps.vite) {
      framework = "Vite/React";
    }
  } catch (err) {
    console.warn("Warning: Could not read package.json in current directory. Using default React settings.");
  }

  // Check for TypeScript
  try {
    await fs.access(path.join(cwd, "tsconfig.json"));
    isTs = true;
  } catch {}

  return { isSrc, isNext, isTs, framework };
}

function buildRegistryUrl(baseUrl, componentSlug) {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(encodeURIComponent(componentSlug), normalizedBase).toString();
}

/**
 * Ensures 'cn' utility exists in the project.
 */
async function ensureUtils(baseDir, isTs) {
  const libDir = path.join(baseDir, "lib");
  const utilsPath = path.join(libDir, isTs ? "utils.ts" : "utils.js");

  try {
    await fs.mkdir(libDir, { recursive: true });
  } catch {}

  const cnCode = isTs 
    ? `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`
    : `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
`;

  try {
    await fs.access(utilsPath);
    const content = await fs.readFile(utilsPath, "utf-8");
    if (!content.includes("export function cn") && !content.includes("export const cn")) {
      console.log(`Appending 'cn' utility to ${utilsPath}...`);
      await fs.appendFile(utilsPath, `\n${cnCode}`);
    }
  } catch {
    console.log(`Creating ${utilsPath}...`);
    await fs.writeFile(utilsPath, cnCode, "utf-8");
  }
}

/**
 * Ensures path aliases are configured in tsconfig/jsconfig.
 */
async function ensureConfig(cwd, isSrc, isTs) {
  const configName = isTs ? "tsconfig.json" : "jsconfig.json";
  const configPath = path.join(cwd, configName);

  let config = { compilerOptions: { paths: {} } };
  try {
    const content = await fs.readFile(configPath, "utf-8");
    config = JSON.parse(content);
  } catch {
    console.log(`Creating ${configName} with path aliases...`);
  }

  if (!config.compilerOptions) config.compilerOptions = {};
  if (!config.compilerOptions.paths) config.compilerOptions.paths = {};

  if (!config.compilerOptions.paths["@/*"]) {
    config.compilerOptions.paths["@/*"] = [isSrc ? "./src/*" : "./*"];
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
    console.log(`Updated ${configName} with '@/*' alias.`);
  }
}

/**
 * Injects required CSS into the project's global stylesheet.
 */
async function injectCSS(baseDir, cssContent) {
  if (!cssContent) return;

  const appGlobals = path.join(baseDir, "app", "globals.css");
  const srcGlobals = path.join(baseDir, "globals.css");
  const stylesGlobals = path.join(baseDir, "styles", "globals.css");

  let targetCSS = null;
  const pathsToTry = [appGlobals, srcGlobals, stylesGlobals];

  for (const p of pathsToTry) {
    try {
      await fs.access(p);
      targetCSS = p;
      break;
    } catch {}
  }

  if (!targetCSS) {
    // If none exist, create one in a sensible place
    try {
      const appDir = path.join(baseDir, "app");
      await fs.mkdir(appDir, { recursive: true });
      targetCSS = appGlobals;
    } catch {
      targetCSS = srcGlobals;
    }
  }

  try {
    let existing = "";
    try {
      existing = await fs.readFile(targetCSS, "utf-8");
    } catch {}

    if (existing.includes(cssContent)) return;

    const markerStart = "/* future-ui:start */";
    const markerEnd = "/* future-ui:end */";

    if (existing.includes(markerStart)) {
      await fs.appendFile(targetCSS, `\n${cssContent}\n`);
    } else {
      await fs.appendFile(targetCSS, `\n\n${markerStart}\n${cssContent}\n${markerEnd}\n`);
    }
    console.log(`Injected styles into ${targetCSS}`);
  } catch (err) {
    console.warn(`Warning: Could not inject CSS: ${err.message}`);
  }
}

/**
 * Installs missing dependencies.
 */
async function ensureDependencies(cwd, required = []) {
  const packageJsonPath = path.join(cwd, "package.json");
  try {
    const content = await fs.readFile(packageJsonPath, "utf-8");
    const pkg = JSON.parse(content);
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

    const baseRequired = ["clsx", "tailwind-merge"];
    const allRequired = [...new Set([...baseRequired, ...required])];
    const missing = allRequired.filter((d) => !deps[d]);

    if (missing.length > 0) {
      console.log(`Installing missing dependencies: ${missing.join(", ")}...`);
      try {
        execSync(`npm install ${missing.join(" ")}`, { stdio: "inherit", cwd });
      } catch (err) {
        console.warn(`Warning: Failed to install dependencies: ${err.message}`);
        console.log(`Please run: npm install ${missing.join(" ")}`);
      }
    }
  } catch (err) {
    // If package.json doesn't exist, we can't reliably install
  }
}

async function addComponent(componentSlug) {
  try {
    const cwd = process.cwd();
    console.log(`\nFuture UI: Detecting project stack in ${cwd}...`);
    
    const { isSrc, framework, isTs } = await detectProjectStack(cwd);
    console.log(`Project detected: ${framework}${isSrc ? " (with src/)" : ""} - ${isTs ? "TypeScript" : "JavaScript"}`);

    const baseDir = isSrc ? path.join(cwd, "src") : cwd;

    const url = buildRegistryUrl(registryUrl, componentSlug);
    console.log(`Fetching '${componentSlug}' from registry...`);

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) throw new Error(`Component '${componentSlug}' not found.`);
      throw new Error(`Registry error: ${response.status} ${response.statusText}`);
    }

    const componentData = await response.json();
    if (!Array.isArray(componentData.files) || componentData.files.length === 0) {
      throw new Error("No files found for this component.");
    }

    // Prepare project
    await ensureUtils(baseDir, isTs);
    await ensureConfig(cwd, isSrc, isTs);
    await ensureDependencies(cwd, componentData.dependencies || []);

    if (componentData.requiresCSS && componentData.css) {
      await injectCSS(baseDir, componentData.css);
    }

    // Install files
    for (const file of componentData.files) {
      // Logic: resolve targetPath relative to baseDir (src/ or ROOT/)
      // targetPath examples: "components/ui/button.tsx", "hooks/use-toast.ts"
      const relativePath = file.targetPath || path.join("components", "ui", file.name);
      const absolutePath = path.resolve(baseDir, relativePath);
      const targetDir = path.dirname(absolutePath);

      // Security check: ensure absolutePath is still within cwd
      if (!absolutePath.startsWith(cwd)) {
        throw new Error(`Unsafe file path returned by registry: ${relativePath}`);
      }

      try {
        await fs.mkdir(targetDir, { recursive: true });
      } catch {}

      try {
        const existing = await fs.readFile(absolutePath, "utf-8");
        if (existing === file.content) {
          console.log(`Already up to date: ${relativePath}`);
          continue;
        }

        if (!force) {
          throw new Error(`${relativePath} already exists. Use --force to overwrite.`);
        }
      } catch (err) {
        if (err.code !== "ENOENT") throw err;
      }

      const finalContentToWrite = file.content.replace(/@(sm|md|lg|xl|2xl):/g, '$1:');
      await fs.writeFile(absolutePath, finalContentToWrite, "utf-8");
      console.log(`Added ${relativePath}`);
    }

    if (componentSlug === "icons") {
      console.log("\nIcons are ready for named imports:");
      console.log('  import { GithubIcon, SunIcon } from "@/components/ui/icons";');
    }

    console.log(`\nSUCCESS: Component '${componentSlug}' installed successfully.`);
  } catch (error) {
    console.error(`\nERROR: ${error.message}`);
    process.exit(1);
  }
}

addComponent(slug);
