import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "icons/index": "src/icons/index.ts",
  },
  format: ["esm", "cjs"],
  dts: false,
  splitting: false,
  clean: true,
  external: ["react", "react-dom"],
  outDir: "dist",
  banner: {
    js: '"use client";',
  },
});
