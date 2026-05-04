# Future UI - Project Instructions

Future UI is a modern, high-performance UI component library built for Next.js 16 and React 19. It leverages Tailwind CSS 4 and Framer Motion to provide visually stunning, reusable components. The project includes a custom CLI (`futureuikit`) for distributing components via a registry API.

## Project Structure

- `bin/cli.mjs`: The custom CLI tool used to install components into other projects.
- `src/app/api/registry/`: The API routes that serve component code to the CLI.
- `src/data/registryData.js`: The "source of truth" for component distribution. It contains the code for every component served by the registry.
- `src/data/component-library-data.js`: Metadata for the component library (titles, descriptions, previews).
- `src/components/ui/`: The implementation of UI components used within the library's own website.
- `src/app/`: Next.js App Router pages and layouts.

## Key Technologies

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4 (using `@tailwindcss/postcss`)
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Primitives**: Radix UI

## Development Workflows

### Running the Project

- **Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Production Start**: `npm run start`
- **Linting**: `npm run lint`

### Adding a New Component

To add a new component to the library and make it available via the CLI:

1.  **Implement the Component**: Create the component file in `src/components/ui/`. Ensure it follows the project's styling and animation conventions.
2.  **Add to Registry Data**: Add the component's source code to `src/data/registryData.js`. Use the existing entries as a template. This is what the CLI actually downloads.
    - If the component requires custom global CSS, set `requiresCSS: true` and provide the `css` property.
3.  **Add Metadata**: Add an entry to `src/data/component-library-data.js` with the component's title, description, slug (matching the registry key), and preview assets.
4.  **Verify**: Start the dev server and check the component's preview page. Test the registry endpoint: `curl http://localhost:3000/api/registry/<your-slug>`.

### CLI Development

The CLI (`bin/cli.mjs`) can be tested locally using `node bin/cli.mjs add <slug> --registry http://localhost:3000/api/registry`.
Note: The CLI expects certain environment variables like `FUTURE_UI_REGISTRY_URL` if not using the default.

## Coding Conventions

- **Modern React**: Use React 19 features where appropriate.
- **Client Components**: Most UI components should be marked with `"use client";` as they use Framer Motion or React hooks.
- **Tailwind CSS 4**: Utilize the new features of Tailwind 4. Prefer the `cn` utility for conditional classes.
- **Accessibility**: Ensure components are accessible, utilizing Radix UI primitives when possible.
- **Animations**: Use Framer Motion for smooth, high-quality interactions.
- **Types**: While the project currently uses `.js` and `.jsx`, it is configured for TypeScript. New components can be written in `.tsx`.

## Contribution Guidelines

- Follow the existing code style.
- Ensure all new components are documented in the library metadata.
- Test components thoroughly in both light and dark modes.
- Before submitting a PR, run `npm run lint` and `npm run build` to ensure no regressions.

## Package Versioning Rules

- Follow a strict incremental versioning strategy based on semantic versioning (MAJOR.MINOR.PATCH).

### Increment Logic

- Always increment the **PATCH** version first.
  - Example: `0.1.0` → `0.1.1`
- If PATCH reaches `9`, roll over:
  - Example: `0.1.9` → `0.2.0`
- Continue this pattern consistently for all updates.

### Constraints

- DO NOT skip versions.
- DO NOT jump versions manually.
- DO NOT increment MINOR or MAJOR directly unless PATCH rollover requires it.

### Correction Rule

- The current version `0.2.0` is invalid and was added by mistake.
- The correct last valid version is `0.1.1`.

### Reset Instruction

- Treat `0.1.1` as the current base version.
- The next version MUST be:
  - `0.1.2`

### Enforcement

- Every time the package is updated:
  1. Read the current version.
  2. Apply increment logic.
  3. Update `package.json` accordingly.
  4. Ensure CLI output reflects the updated version.
