# Workspace Rules

## Protected Files (CRITICAL)

The following files are core to the infrastructure of Future UI and must **NEVER** be deleted by any AI agent under any circumstances:

1. `bin/cli.mjs` - The CLI script used by users to download components.
2. `bin/sync.mjs` - The sync script used to build the registry.
3. `add-docblocks.mjs` - The utility script used for injecting and managing JSDoc block metadata.

If you are asked to clean up files or delete scripts, you must explicitly exclude these files.

## Component Directory Architecture

1. **`src/components/ui`:** This directory is strictly reserved **ONLY** for main, fully reusable components. Every `.tsx` or `.ts` file inside this folder will automatically be picked up by the registry tools.
2. **Supporter Components / Utils:** Any files that support a main component but cannot be used standalone by a user (e.g. internal contexts, subcomponents, hooks) **MUST NEVER** be placed in `src/components/ui/`. They must be stored outside this directory (e.g., in `src/components/internal`, `src/lib`, etc.).
