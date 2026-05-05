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

## Package Versioning Rules

* Follow a strict incremental versioning strategy based on semantic versioning (MAJOR.MINOR.PATCH).

### Increment Logic

* Always increment the **PATCH** version first.

  * Example: `0.1.0` → `0.1.1`
* If PATCH reaches `9`, roll over:

  * Example: `0.1.9` → `0.2.0`
* Continue this pattern consistently for all updates.

### Constraints

* DO NOT skip versions.
* DO NOT jump versions manually.
* DO NOT increment MINOR or MAJOR directly unless PATCH rollover requires it.

### Correction Rule

* The correct last valid version is `0.2.2`.

### Reset Instruction

* Treat `0.2.2` as the current base version.
* The next version MUST be:

  * `0.2.3`

### Enforcement

* Every time the package is updated:

  1. Read the current version.
  2. Apply increment logic.
  3. Update `package.json` accordingly.
  4. Ensure CLI output reflects the updated version.

## Gemini Execution Protocol (Strict Enforcement Layer)

To ensure deterministic, production-safe outputs, Gemini must adhere to the following operational constraints:

### Pre-Production Confirmation Gate

* Gemini must always ask for explicit approval before any production deployment or finalization.
* Gemini must summarize intended changes and clearly list impacted files before requesting approval.
* No production action is allowed without user confirmation.

### Code Integrity & Completeness

* All generated code must be syntactically correct, fully complete, and immediately executable.
* No placeholders, TODOs, or incomplete implementations are allowed.
* All imports, dependencies, and types must be fully resolved.

### Line-by-Line Completion Guarantee

* Gemini must complete all code line by line with full implementation.
* No skipped sections, pseudo-code, or abstract descriptions are allowed.

### Zero Truncation Policy

* Gemini must never truncate any line or block of code.
* All outputs must be complete in a single response unless explicitly instructed otherwise.

### File Change Isolation Rule

* Gemini must only modify files explicitly requested by the user.
* No changes are allowed outside the specified scope.
* If additional files are required, Gemini must request permission before proceeding.

### No Placeholder Comments Policy

* Gemini must not use comments indicating omitted code sections.
* Every section must be fully written out and complete.

### Deterministic Output Standard

* Outputs must be predictable, repeatable, and free from ambiguity.
* No assumptions or hidden logic are allowed.

### Error-Free Delivery Requirement

* All code must pass build, lint, and runtime checks conceptually before being returned.
* No unresolved references or missing dependencies are allowed.

### Interaction Protocol

* If instructions are incomplete, Gemini must ask for clarification before proceeding.
* If instructions are ambiguous or conflicting, Gemini must pause and request direction.

### Post-Implementation Testing Requirement

* After completing any implementation, Gemini must perform a full application-level validation.
* Gemini must simulate running the project (equivalent to `npm run build` and `npm run start`) and verify:

  * No build-time errors
  * No runtime exceptions
  * No missing dependencies or broken imports
  * No type errors (for TypeScript files)
* Gemini must also validate critical user flows relevant to the implemented feature.
* If any issue is detected, Gemini must fix all errors before returning the final output.
* Code delivery is considered incomplete until the application is logically verified as error-free.
