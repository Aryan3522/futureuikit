#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";

/**
 * Future UI CLI Tool
 * Used to add components to a project from the Future UI registry.
 */

// Placeholder domain - you will update this once you deploy your site
// Example: https://future-ui-site.vercel.app/components
const API_BASE_URL = process.env.FUTURE_UI_API_URL || "https://your-domain.com/components";

const args = process.argv.slice(2);
const command = args[0];
const slug = args[1];

// Minimal help/usage
if (command !== "add" || !slug) {
  console.error("\x1b[31m%s\x1b[0m", "Usage: npx future-ui add <component-slug>");
  process.exit(1);
}

/**
 * Main function to fetch and install a component
 */
async function addComponent(slug) {
  try {
    const url = `${API_BASE_URL}/${slug}`;
    console.log(`\x1b[36m%s\x1b[0m`, `Fetching component data for '${slug}'...`);
    
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Component '${slug}' not found in the registry.`);
      }
      throw new Error(`Failed to fetch component: ${response.statusText}`);
    }
    
    const componentData = await response.json();
    
    if (!componentData.files || componentData.files.length === 0) {
      console.error("\x1b[31m%s\x1b[0m", "No files found for this component.");
      return;
    }

    // Determine target directory: components/ui
    // We check if a 'src' folder exists and use it as the base if it does.
    const cwd = process.cwd();
    let baseDir = cwd;
    
    try {
      await fs.access(path.join(cwd, "src"));
      baseDir = path.join(cwd, "src");
    } catch {
      // No src folder found, using root
    }
    
    const targetDir = path.join(baseDir, "components", "ui");

    // Ensure the target directory exists
    try {
      await fs.access(targetDir);
    } catch {
      console.log(`\x1b[33m%s\x1b[0m`, `Creating directory: ${targetDir}`);
      await fs.mkdir(targetDir, { recursive: true });
    }

    // Write all component files to the directory
    for (const file of componentData.files) {
      const filePath = path.join(targetDir, file.name);
      await fs.writeFile(filePath, file.content, "utf-8");
      console.log(`\x1b[32m%s\x1b[0m`, `✅ Successfully added ${file.name} to ${targetDir}`);
    }
    
    console.log(`\n\x1b[32m%s\x1b[0m`, `🎉 Component '${slug}' added successfully!`);
    console.log(`\x1b[33m%s\x1b[0m`, `Note: Make sure to install any required dependencies like 'framer-motion' or 'lucide-react'.`);

  } catch (error) {
    console.error(`\x1b[31m%s\x1b[0m`, `❌ Error: ${error.message}`);
    if (API_BASE_URL.includes("your-domain.com")) {
      console.log(`\n\x1b[33m%s\x1b[0m`, `💡 Hint: You need to set your production URL in the CLI script or use the FUTURE_UI_API_URL environment variable.`);
    }
  }
}

addComponent(slug);
