#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  await fs.readFile(path.join(__dirname, "..", "package.json"), "utf-8")
);

const DEFAULT_REGISTRY_URL =
  packageJson.config?.registryUrl || "https://futureuikit.vercel.app/api/registry";

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
  console.log(`Future UI CLI

Usage:
  npx futureuikit add <component-slug> [--force] [--registry <url>]

Examples:
  npx futureuikit add boxy-bounce
  npx futureuikit add boxy-bounce --registry https://your-site.vercel.app/api/registry

Environment:
  FUTURE_UI_REGISTRY_URL  Override the registry base URL.
`);
}

if (command === "--version" || command === "-v") {
  console.log(packageJson.version);
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

function buildRegistryUrl(baseUrl, componentSlug) {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(encodeURIComponent(componentSlug), normalizedBase).toString();
}

function resolveSafeTarget(baseDir, fileName) {
  if (!fileName || path.basename(fileName) !== fileName) {
    throw new Error(`Registry returned an unsafe file name: ${fileName}`);
  }

  const target = path.resolve(baseDir, fileName);
  const normalizedBase = path.resolve(baseDir);

  if (!target.startsWith(`${normalizedBase}${path.sep}`)) {
    throw new Error(`Registry returned a file outside the target directory: ${fileName}`);
  }

  return target;
}

async function ensureUtils(baseDir) {
  const libDir = path.join(baseDir, "lib");
  const utilsJsPath = path.join(libDir, "utils.js");
  const utilsTsPath = path.join(libDir, "utils.ts");

  try {
    await fs.mkdir(libDir, { recursive: true });
  } catch {
    // Already exists
  }

  let exists = false;
  let targetPath = utilsJsPath;

  try {
    await fs.access(utilsTsPath);
    exists = true;
    targetPath = utilsTsPath;
  } catch {
    try {
      await fs.access(utilsJsPath);
      exists = true;
      targetPath = utilsJsPath;
    } catch {}
  }

  const cnCode = `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
`;

  if (!exists) {
    console.log(`Creating ${targetPath}...`);
    await fs.writeFile(targetPath, cnCode, "utf-8");
  } else {
    const content = await fs.readFile(targetPath, "utf-8");
    if (!content.includes("export function cn") && !content.includes("export const cn")) {
      console.log(`Adding 'cn' utility to ${targetPath}...`);
      await fs.appendFile(targetPath, `\n${cnCode}`);
    }
  }
}

async function ensureConfig(cwd, isSrc) {
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  const jsconfigPath = path.join(cwd, "jsconfig.json");

  let configPath = null;
  try {
    await fs.access(tsconfigPath);
    configPath = tsconfigPath;
  } catch {
    try {
      await fs.access(jsconfigPath);
      configPath = jsconfigPath;
    } catch {}
  }

  if (!configPath) {
    configPath = jsconfigPath;
    const initialConfig = {
      compilerOptions: {
        paths: {
          "@/*": [isSrc ? "./src/*" : "./*"],
        },
      },
    };
    console.log(`Creating jsconfig.json with path aliases...`);
    await fs.writeFile(configPath, JSON.stringify(initialConfig, null, 2), "utf-8");
    return;
  }

  try {
    const content = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(content);

    if (!config.compilerOptions) config.compilerOptions = {};
    if (!config.compilerOptions.paths) config.compilerOptions.paths = {};

    if (!config.compilerOptions.paths["@/*"]) {
      console.log(`Adding '@/*' alias to ${path.basename(configPath)}...`);
      config.compilerOptions.paths["@/*"] = [isSrc ? "./src/*" : "./*"];
      await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
    }
  } catch (err) {
    console.warn(`Warning: Could not update ${path.basename(configPath)}: ${err.message}`);
  }
}

async function injectCSS(baseDir, cssContent) {
  if (!cssContent) return;

  const appGlobals = path.join(baseDir, "app", "globals.css");
  const stylesGlobals = path.join(baseDir, "styles", "globals.css");

  let targetCSS = null;
  try {
    await fs.access(appGlobals);
    targetCSS = appGlobals;
  } catch {
    try {
      await fs.access(stylesGlobals);
      targetCSS = stylesGlobals;
    } catch {
      const appDir = path.join(baseDir, "app");
      try {
        await fs.mkdir(appDir, { recursive: true });
        targetCSS = appGlobals;
      } catch {
        // Fallback failed
      }
    }
  }

  if (targetCSS) {
    try {
      let existing = "";
      try {
        existing = await fs.readFile(targetCSS, "utf-8");
      } catch {
        // File doesn't exist yet
      }

      if (existing.includes(cssContent)) {
        return;
      }

      const markerStart = "/* future-ui:start */";
      const markerEnd = "/* future-ui:end */";

      if (existing.includes(markerStart)) {
        // Append inside markers? No, the spec says "Append styles (idempotent check required)"
        // Let's just append at the end for now, but use markers if it's the first time.
        await fs.appendFile(targetCSS, `\n${cssContent}\n`);
      } else {
        await fs.appendFile(
          targetCSS,
          `\n\n${markerStart}\n${cssContent}\n${markerEnd}\n`
        );
      }
      console.log(`Injected styles into ${targetCSS}`);
    } catch (err) {
      console.warn(`Warning: Could not inject CSS into ${targetCSS}: ${err.message}`);
    }
  }
}

async function ensureDependencies(cwd, required = []) {
  const packageJsonPath = path.join(cwd, "package.json");
  try {
    const content = await fs.readFile(packageJsonPath, "utf-8");
    const pkg = JSON.parse(content);

    const deps = pkg.dependencies || {};
    const devDeps = pkg.devDependencies || {};

    const baseRequired = ["clsx", "tailwind-merge"];
    const allRequired = [...new Set([...baseRequired, ...required])];
    
    const missing = allRequired.filter((d) => !deps[d] && !devDeps[d]);

    if (missing.length > 0) {
      console.log(`Missing dependencies: ${missing.join(", ")}`);
      console.log(`Installing ${missing.join(" ")}...`);
      try {
        execSync(`npm install ${missing.join(" ")}`, { stdio: "inherit", cwd });
      } catch (err) {
        console.warn(`Warning: Failed to install dependencies automatically: ${err.message}`);
        console.log(`Please run: npm install ${missing.join(" ")}`);
      }
    }
  } catch (err) {
    console.warn(`Warning: Could not check package.json: ${err.message}`);
  }
}

async function addComponent(componentSlug) {
  try {
    const url = buildRegistryUrl(registryUrl, componentSlug);
    console.log(`Fetching component data for '${componentSlug}'...`);

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Component '${componentSlug}' not found in the registry.`);
      }

      throw new Error(`Failed to fetch component: ${response.status} ${response.statusText}`);
    }

    const componentData = await response.json();

    if (!Array.isArray(componentData.files) || componentData.files.length === 0) {
      throw new Error("No files found for this component.");
    }

    const cwd = process.cwd();
    let baseDir = cwd;
    let isSrc = false;

    try {
      await fs.access(path.join(cwd, "src"));
      baseDir = path.join(cwd, "src");
      isSrc = true;
    } catch {
      // Projects without src/ receive files under components/ui.
    }

    // --- Dependency Resolution ---
    await ensureUtils(baseDir);
    await ensureConfig(cwd, isSrc);
    await ensureDependencies(cwd, componentData.dependencies || []);

    // --- CSS Injection ---
    if (componentData.requiresCSS && componentData.css) {
      await injectCSS(baseDir, componentData.css);
    }
    // ------------------------------

    const targetDir = path.join(baseDir, "components", "ui");

    try {
      await fs.access(targetDir);
    } catch {
      console.log(`Creating directory: ${targetDir}`);
      await fs.mkdir(targetDir, { recursive: true });
    }

    for (const file of componentData.files) {
      if (typeof file.name !== "string" || typeof file.content !== "string") {
        throw new Error("Registry returned an invalid file payload.");
      }

      const filePath = resolveSafeTarget(targetDir, file.name);

      try {
        const existing = await fs.readFile(filePath, "utf-8");
        if (existing === file.content) {
          console.log(`Already up to date: ${file.name}`);
          continue;
        }

        if (!force) {
          throw new Error(
            `${file.name} already exists with different content. Re-run with --force to overwrite it.`
          );
        }
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }

      await fs.writeFile(filePath, file.content, "utf-8");
      console.log(`Added ${file.name} to ${targetDir}`);
    }

    console.log(`\nComponent '${componentSlug}' added successfully.`);
    console.log(
      "Note: Make sure required dependencies such as framer-motion or lucide-react are installed."
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(`Registry URL: ${registryUrl}`);
    process.exit(1);
  }
}

addComponent(slug);
