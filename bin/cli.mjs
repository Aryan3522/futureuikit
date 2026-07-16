#!/usr/bin/env node

import fs from "fs/promises";
import { accessSync } from "fs";
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

// Check Node.js version (needed for global fetch)
if (process.versions.node && parseInt(process.versions.node.split(".")[0], 10) < 18) {
  console.error("Future UI CLI requires Node.js 18 or later.");
  process.exit(1);
}

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
  npx futureuikit init
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
    const pkg = JSON.parse(pkgContent.replace(/^\uFEFF/, ""));
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
 * Detects which package manager the project uses by checking lockfiles.
 */
function detectPackageManager(cwd) {
  try {
    fs.accessSync(path.join(cwd, "pnpm-lock.yaml"));
    return "pnpm";
  } catch {}
  try {
    fs.accessSync(path.join(cwd, "yarn.lock"));
    return "yarn";
  } catch {}
  try {
    fs.accessSync(path.join(cwd, "bun.lockb"));
    return "bun";
  } catch {}
  return "npm";
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
    const startIdx = existing.indexOf(markerStart);
    const endIdx = existing.indexOf(markerEnd);

    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      // Replace content between existing markers
      const before = existing.slice(0, startIdx + markerStart.length);
      const after = existing.slice(endIdx);
      existing = `${before}\n${cssContent}\n${after}`;
      await fs.writeFile(targetCSS, existing, "utf-8");
    } else {
      // No markers found; append at end
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
    const pkg = JSON.parse(content.replace(/^\uFEFF/, ""));
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

    const baseRequired = ["clsx", "tailwind-merge"];
    const allRequired = [...new Set([...baseRequired, ...required])];
    const missing = allRequired.filter((d) => !deps[d]);

    if (missing.length > 0) {
      const pm = detectPackageManager(cwd);
      const installCmd =
        pm === "npm" ? "npm install" :
        pm === "yarn" ? "yarn add" :
        pm === "pnpm" ? "pnpm add" :
        "bun add";
      console.log(`Installing missing dependencies with ${pm}: ${missing.join(", ")}...`);
      try {
        execSync(`${installCmd} ${missing.join(" ")}`, { stdio: "inherit", cwd });
      } catch (err) {
        console.warn(`Warning: Failed to install dependencies: ${err.message}`);
        console.log(`Please run: ${installCmd} ${missing.join(" ")}`);
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

      // Security check: ensure absolutePath is still within cwd (cross-platform)
      const rel = path.relative(cwd, absolutePath);
      if (rel.startsWith("..") || path.isAbsolute(rel)) {
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
      console.log("\nIcons are built into Future UI — no extra installation needed.");
      console.log("Import directly from the package:");
      console.log('  import { GithubIcon, SunIcon } from "futureuikit/icons";');
    }

    console.log(`\nSUCCESS: Component '${componentSlug}' installed successfully.`);
  } catch (error) {
    console.error(`\nERROR: ${error.message}`);
    process.exit(1);
  }
}

async function initProject() {
  try {
    const cwd = process.cwd();
    console.log(`\nFuture UI: Initializing project in ${cwd}...`);
    
    const { isSrc } = await detectProjectStack(cwd);
    const baseDir = isSrc ? path.join(cwd, "src") : cwd;

    const initCss = `
@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
  --animate-marquee-x: marquee-x var(--duration) linear infinite;
  --animate-marquee-y: marquee-y var(--duration) linear infinite;

  @keyframes accordion-down {
    from { height: 0; }
    to { height: var(--radix-accordion-content-height); }
  }
  @keyframes accordion-up {
    from { height: var(--radix-accordion-content-height); }
    to { height: 0; }
  }
  @keyframes marquee-x {
    from { transform: translateX(0); }
    to { transform: translateX(calc(-100% - var(--gap))); }
  }
  @keyframes marquee-y {
    from { transform: translateY(0); }
    to { transform: translateY(calc(-100% - var(--gap))); }
  }
  @keyframes hero-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes hero-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes hero-badge-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}

:root {
  --background: 240 10% 100%;
  --foreground: 240 10% 3.9%;
  --card: 240 10% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 240 10% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 239 84% 67%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 239 84% 67%;
  --radius: 0.5rem;
  --duration: 20s;
  --gap: 1rem;
}

.dark {
  --background: 0 0% 0%;
  --foreground: 20 6% 90%;
  --card: 0 0% 0%;
  --card-foreground: 20 6% 90%;
  --popover: 0 0% 0%;
  --popover-foreground: 20 6% 90%;
  --primary: 0 0% 78%;
  --primary-foreground: 0 0% 19%;
  --secondary: 258 100% 87%;
  --secondary-foreground: 258 100% 20%;
  --muted: 0 0% 8%;
  --muted-foreground: 20 5% 65%;
  --accent: 0 0% 8%;
  --accent-foreground: 20 6% 90%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 20%;
  --input: 0 0% 20%;
  --ring: 258 90% 66%;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  
  /* Global Premium Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: hsl(var(--foreground) / 0.15);
    border-radius: 9999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: hsl(var(--foreground) / 0.3);
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--foreground) / 0.15) transparent;
  }
  @media (max-width: 1024px) {
    ::-webkit-scrollbar {
      display: none;
    }
    * {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
  }

  /* NOIR_OS Utility Classes */
  .glass-mantle {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .glass-heavy {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
`;

    await injectCSS(baseDir, initCss);
    
    // Also ensure utils exist
    await ensureUtils(baseDir, true);

    console.log("\nSUCCESS: Future UI initialized successfully.");
    console.log("You can now add components: npx futureuikit add <component-slug>");
  } catch (error) {
    console.error(`\nERROR: ${error.message}`);
    process.exit(1);
  }
}

if (command === "init") {
  initProject();
} else if (command === "add") {
  addComponent(slug);
}
