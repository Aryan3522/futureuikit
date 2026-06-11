# Future UI - Project Instructions

Future UI is a modern, high-performance UI component library built for Next.js 16 and React 19. It leverages Tailwind CSS 4 and Framer Motion to provide visually stunning, reusable components. The project includes a custom CLI (`futureuikit`) for distributing components via a registry API.

## Project Structure

* `bin/cli.mjs`: The custom CLI tool used to install components into other projects.
* `src/app/api/registry/`: The API routes that serve component code to the CLI.
* `src/data/registryData.js`: The "source of truth" for component distribution. It contains the code for every component served by the registry.
* `src/data/component-library-data.js`: Metadata for the component library (titles, descriptions, previews).
* `src/components/ui/`: The implementation of UI components used within the library's own website.
* `src/app/`: Next.js App Router pages and layouts.

## Key Technologies

* **Framework**: Next.js 16 (App Router)
* **Library**: React 19
* **Styling**: Tailwind CSS 4 (using `@tailwindcss/postcss`)
* **Animations**: Framer Motion 12
* **Icons**: Lucide React
* **Primitives**: Radix UI

## Development Workflows

### Running the Project

* **Development Server**: `npm run dev`
* **Build**: `npm run build`
* **Production Start**: `npm run start`
* **Linting**: `npm run lint`

### Adding a New Component

To add a new component to the library and make it available via the CLI:

1. **Implement the Component**: Create the component file in `src/components/ui/`. Ensure it follows the project's styling and animation conventions.
2. **Add to Registry Data**: Add the component's source code to `src/data/registryData.js`. Use the existing entries as a template. This is what the CLI actually downloads.

   * If the component requires custom global CSS, set `requiresCSS: true` and provide the `css` property.
3. **Add Metadata**: Add an entry to `src/data/component-library-data.js` with the component's title, description, slug (matching the registry key), and preview assets.
4. **Verify**: Start the dev server and check the component's preview page. Test the registry endpoint: `curl http://localhost:3000/api/registry/<your-slug>`.

### CLI Development

The CLI (`bin/cli.mjs`) can be tested locally using:

`node bin/cli.mjs add <slug> --registry http://localhost:3000/api/registry`

Note: The CLI expects certain environment variables like `FUTURE_UI_REGISTRY_URL` if not using the default.

## Coding Conventions

* **Modern React**: Use React 19 features where appropriate.
* **Client Components**: Most UI components should be marked with `"use client";` as they use Framer Motion or React hooks.
* **Tailwind CSS 4**: Utilize the new features of Tailwind 4. Prefer the `cn` utility for conditional classes.
* **Accessibility**: Ensure components are accessible, utilizing Radix UI primitives when possible.
* **Animations**: Use Framer Motion for smooth, high-quality interactions.
* **Types**: While the project currently uses `.js` and `.jsx`, it is configured for TypeScript. New components can be written in `.tsx`.

## Contribution Guidelines

* Follow the existing code style.
* Ensure all new components are documented in the library metadata.
* Test components thoroughly in both light and dark modes.
* Before submitting a PR, run `npm run lint` and `npm run build` to ensure no regressions.

## Gemini Execution Protocol (Strict Enforcement Layer)

To ensure deterministic, production-safe outputs, Gemini must adhere to the following operational constraints:

### Pre-Production Confirmation Gate

* Gemini must always ask for explicit approval before any production deployment or finalization.
* Gemini must summarize intended changes and clearly list impacted files before requesting approval.
* No production action is allowed without user confirmation.

### Absolute File Protection & Deletion Protocol

* **NEVER** delete any file without explicit, separate permission, even if the user explicitly asks for a deletion.
* If a deletion is requested or seems necessary, Gemini must:
  1.  List the exact names of the files proposed for deletion.
  2.  Explain the rationale for their removal.
  3.  Wait for explicit user approval for those specific files before proceeding.

### Code Integrity & Completeness

* All generated code must be syntactically correct, fully complete, and immediately executable.
* **ZERO TRUNCATION POLICY**: Gemini must never truncate any line or block of code. Every section must be fully written out.
* No placeholders, TODOs, or incomplete implementations are allowed.
* All imports, dependencies, and types must be fully resolved.

### File Change & Scope Isolation Rule

* Gemini must **ONLY** modify files explicitly requested by the user.
* No changes are allowed outside the specified scope (e.g., no "cleanup" of unrelated files).
* If additional files are required, Gemini must request permission before proceeding.
* **READ-ONLY INTEGRITY**: When reading code for context, do not write to or modify those files unless strictly necessary to fulfill the requested change.

### Post-Implementation Testing Requirement

* Always test the application after major changes (e.g., `npm run build`, `npm run start`, or specific component verification).
* After completing implementation, Gemini must ask the user whether they want application-level validation/testing to be performed.
* Testing must only occur if:
  * The user explicitly says "yes"
  * The user explicitly requests testing
  * The user directly instructs Gemini to validate the application

### UI Consistency & Spacing Standards

* **UI CONSISTENCY**: The UI must always stay consistent with the existing design language.
* **4X SPACING RULE**: All spacing (margins, padding, gaps) must strictly follow the 4x spacing rule (increments of 4px/1rem).
* Preview pages for all components must be structurally similar and aesthetically aligned.

## Future UI Component Development Standards (Mandatory)

### Component & Icon Creation

* **FILE SEPARATION**: Every new component or icon must be created in its own separate file.
* **DOCBLOCK ENFORCEMENT**: Every newly created reusable component must include a single DocBlock explaining its purpose, API, and usage.
* **REGISTRATION**: New components/icons must be added to:
  * `src/data/registryData.js`
  * `src/data/component-library-data.js`
  * The Components Listing Page
  * The Component Details Page
  * The Preview Page
* **PREVIEW INTEGRITY**: Ensure all information and code provided to the user is verified and tested before being added to a preview page.
* Registration must be performed "properly" without changing unrelated code in those files.


### Import and Export Standardization

Always use the simplest possible imports and exports.

Preferred:

```tsx
import React from "react";

const Component = () => {
  return <div />;
};

export default Component;
```

or

```tsx
export function Component() {
  return <div />;
}
```

Avoid unnecessary complexity.

### React Optimization Rules

Do not use:

* optimizePackageImports
* React.memo
* useMemo
* useCallback
* dynamic optimization patterns

unless a measurable performance benefit exists.

Rules:

* React.memo may only be used for highly static reusable components.
* Do not wrap components in memo by default.
* Do not optimize prematurely.
* Favor readability and maintainability.

### Component Template Standard

When generating reusable React components:

* Follow the structure generated by the ES7+ React extension:

  * `rafce`
  * `rafc`

Use their import/export style as the project standard.

Do not introduce alternative export patterns unless required.

### UI Consistency Enforcement

New components must:

* Match Future UI design language.
* Match spacing conventions.
* Match typography conventions.
* Match animation conventions.
* Match dark mode conventions.
* Match responsive behavior conventions.

A new component should visually feel like it was built alongside all existing Future UI components.

### Styling Enforcement

* Use Tailwind CSS utilities already used within the project.
* Reuse existing utility patterns.
* Avoid introducing custom CSS unless required.
* Avoid creating duplicate style systems.

### Registry Integrity Requirement

Whenever modifying:

* Registry Components
* Registry API
* CLI Install Flow

Verify:

* Registry slug matches component slug.
* Registry response returns valid code.
* CLI installation succeeds.
* Generated component compiles without modification.

### Post-Implementation Verification (Mandatory)

After every implementation:

1. Review all modified files.
2. Verify imports.
3. Verify exports.
4. Verify routing.
5. Verify component registration.
6. Verify preview rendering.
7. Verify dark mode.
8. Verify light mode.
9. Verify registry integration.
10. Verify no duplicate code exists.

Do not deliver code until verification is completed.

### File Scope Protection

Modify only requested files.

If additional files are required:

* Stop.
* List the files.
* Explain why they are required.
* Request approval.

Do not proceed until approval is received.

### Future UI Architectural Priority

Priority Order:

1. Project Stability
2. Existing UI Consistency
3. Component Reusability
4. Registry Compatibility
5. Developer Experience
6. Performance Optimization

Never sacrifice stability or consistency for optimization.

# Script File Lifecycle Policy

## Temporary Script Files

Whenever you create a script file for a one-time task, migration, data transformation, cleanup operation, registry generation, validation, debugging, analysis, refactoring, or maintenance activity, that script must be treated as temporary.

Rules:

1. Create the temporary script only when absolutely necessary.
2. Execute the script and verify it completes successfully.
3. Apply and verify the intended changes.
4. Immediately delete the temporary script after successful execution.
5. Ensure no references to the temporary script remain anywhere in the codebase.
6. Remove any temporary npm scripts added solely for executing the temporary file.
7. Never leave one-time-use scripts committed in the project.
8. Never leave debugging, migration, validation, inspection, or maintenance scripts in the repository after use.
9. Temporary scripts must not accumulate in the scripts directory.
10. The repository should remain clean after task completion.

## Permanent Script Files

Only permanent CLI-related scripts may remain in the project.

Allowed permanent scripts include:

* Component installation CLI
* Icon installation CLI
* Registry resolution
* Registry download handlers
* Dependency installation helpers
* Runtime CLI utilities
* Package publishing utilities that are actively required
* Core CLI infrastructure

These files are considered production infrastructure and must not be removed.

## Cleanup Verification

Before completing any task:

* Check for newly created temporary scripts.
* Delete all one-time-use scripts.
* Remove unused imports created for temporary execution.
* Remove temporary package.json entries.
* Remove temporary build artifacts.
* Remove temporary generated files that are not part of the final product.

## Repository Standard

The project must never contain:

* Temporary migration scripts
* Temporary fix scripts
* Debug scripts
* Inspection scripts
* Data conversion scripts
* Analysis scripts
* One-time automation scripts
* Experimental utility scripts

unless they are actively required for the production CLI system.

The only script files that should remain long-term are those required for the Component CLI and Icon CLI functionality and their supporting production infrastructure.

# Critical Protection Rule — CLI Infrastructure

## Never Delete Core CLI Files

The Component CLI and Icon CLI systems are critical production infrastructure.

Under no circumstances may the following be deleted, replaced, disabled, broken, renamed, or removed unless explicitly instructed by the project owner:

* Component CLI command files
* Icon CLI command files
* CLI entry points
* Registry download handlers
* Registry resolution logic
* Component installation logic
* Icon installation logic
* Dependency installation logic
* CLI configuration files
* CLI utilities required by component or icon downloads
* Any file directly referenced by the Component CLI or Icon CLI execution flow

## Mandatory Verification Before Deletion

Before deleting any file, perform dependency analysis and determine whether the file is:

* Imported by the Component CLI
* Imported by the Icon CLI
* Referenced by CLI commands
* Referenced by registry installation logic
* Referenced by registry download logic
* Required during component installation
* Required during icon installation
* Required during CLI execution

If there is any possibility that a file participates in the CLI installation pipeline, it must be preserved.

## Protected Systems

The following systems are permanently protected:

1. Component Download System
2. Icon Download System
3. Registry System
4. CLI Command System
5. CLI Runtime Infrastructure
6. Package Installation Pipeline
7. Registry Fetching Pipeline
8. Registry Resolution Pipeline

These systems must remain fully functional after every task.

## Deletion Policy

Temporary scripts:

* May be deleted after successful execution and verification.

Production CLI files:

* Must never be deleted.
* Must never be automatically cleaned up.
* Must never be treated as unused.
* Must never be removed during refactoring.
* Must never be removed during optimization.
* Must never be removed during cleanup operations.

If a file's purpose cannot be determined with certainty, preserve the file and report it for manual review instead of deleting it.

## Final Validation Requirement

After every cleanup, refactor, optimization, or maintenance task:

* Verify `futureuikit add <component>` works correctly.
* Verify `futureuikit add-icon <icon>` works correctly.
* Verify registry downloads work correctly.
* Verify dependency installation works correctly.
* Verify no CLI imports are broken.
* Verify no CLI runtime errors exist.

CLI functionality takes priority over cleanup, optimization, and file reduction.
