#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

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
  process.env.FUTURE_UI_REGISTRY_URL ||
  process.env.FUTURE_UI_API_URL ||
  (registryFlagIndex >= 0 ? args[registryFlagIndex + 1] : undefined) ||
  DEFAULT_REGISTRY_URL;

function printHelp() {
  console.log(`Future UI CLI

Usage:
  npx future-ui add <component-slug> [--force] [--registry <url>]

Examples:
  npx future-ui add boxy-bounce
  npx future-ui add boxy-bounce --registry https://your-site.vercel.app/api/registry

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

    try {
      await fs.access(path.join(cwd, "src"));
      baseDir = path.join(cwd, "src");
    } catch {
      // Projects without src/ receive files under components/ui.
    }

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
