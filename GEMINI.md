# Future UI

IMPORTANT

This file defines the entire project architecture, workflows, component guidelines, registry protection, and CLI operations. Follow everything stated here.

## 1. Project Context and Markdown Usage

- **Use Available MD Files:** Always read and use all the `.md` files available in the project for context and instructions before starting any task. 
- Currently, unnecessary md files have been removed, and we will write md files one by one as needed. Keep `README.md` and this `GEMINI.md` intact.

## 2. Tech Stack

Future UI is a modern component library built with the following specific tech stack. You MUST follow this exact stack without hallucinating or introducing unrequested frameworks:

* Next.js (latest) - *Note: This version has breaking changes. APIs, conventions, and file structure may differ from older versions. Read Next.js docs before writing code.*
* React 19 - *Prefer `"use client"` for interactive components. Avoid premature optimization (`useMemo`, etc.) unless measurably beneficial.*
* Tailwind CSS 4
* Framer Motion
* Radix UI (when appropriate for accessibility)

## 3. CLI & Component Downloads (CRITICAL)

The main feature of this project is the download of the components. **It must always work properly without any errors, and the components must be fully reusable and bug-free.**

* **Protected Files:** `bin/cli.mjs`, `bin/sync.mjs`, `add-docblocks.mjs`, and any other scripts needed in the project for component downloads.
* **NEVER delete these CLI and utility script files ever.**
* If you need to upgrade them, **always test the changes properly** and thoroughly check if the downloads of the components are working properly or not.

## 4. Component Design & Theming

* **Universal Variant API & Consistency:** When creating new components, you must keep consistency in mind. If a user uses one variant of all components in their project, they must all be fully consistent and look unified on their website.
  * **Style Variants (`variant`):** `solid` (Solid background), `outline` (Transparent with Border), `ghost` (Transparent, hover effect), `link` (Underlined text).
  * **Color Variants (`color`):** Every component MUST support these 10 distinct color palettes for its styles, mapped correctly for both light and dark modes:
    1. `default` (Black & White - the ultimate default)
    2. `blue` (Blue-600)
    3. `emerald` (Emerald-500)
    4. `rose` (Rose-500)
    5. `amber` (Amber-500)
    6. `violet` (Violet-600)
    7. `indigo` (Indigo-600)
    8. `sky` (Sky-500)
    9. `slate` (Slate-600)
    10. `orange` (Orange-500)
  * **Shape Variants (`shape`):** `default`, `square`, `rounded`, `sharp`. All components must have shape variants.
  * **Spacing Variants (`spacing`):** `default`, `2x`, `4x`, `6x`, `8x`. Applicable to interactive elements and containers.
* **Black and White Default:** **Always default `color` to `"default"` (Black and White)**.
* **No Shadows:** Do not use `shadow`, `shadow-sm`, `shadow-lg`, or `drop-shadow` in any component.
* **Theme Alignment:** All components and their 10 colors must be fully theme-aligned (look premium in both light and dark modes).
* **Spacing Consistency:** The whole website and all components must follow a **44x spacing consistency** strictly.
* **Premium & Reusable:** All components must be fully optimized, premium, and reusable without modification.

## 5. Documentation & DocBlocks

* **Main/Reusable Components:** When creating new components, always check if the component which is created is the main/reusable component which can be directly used. If it is a main component, you **MUST** add a DocBlock code in it.
* **Component Directory Enforcement:** **ONLY** main/reusable components are permitted to live in the `src/components/ui` directory. All other files (like supporter components, internal utilities, and context files that cannot be used directly in any project) **MUST** be placed completely outside the `ui` directory (for example, in `src/components/internal` or `src/lib`).
* **Supporter Components:** If it is a supporter component (meaning it cannot be used directly in any project), **NEVER** add DocBlock code in it, and ensure it is kept outside the `src/components/ui` directory.

The DocBlock for main components should look like this:

```javascript
/**
 * @registry-slug component-name
 * @registry-name Component Name
 * @registry-description Description
 * @registry-category ui
 * @registry-type components:ui
 */
```

## 6. Registry & Preview Workflow

A component is NOT considered fully integrated until all required website registrations are completed and previewed.

1. **Create File:** Every reusable component must live in `src/components/ui` and be in its own file (`.ts` or `.tsx`). 
2. **Metadata:** Add component metadata to `src/data/component-library-data.ts`. Follow the existing schema exactly. Do not assume or invent schemas.
3. **Preview Registration:** Register the preview inside `src/route-components/PreviewRegistry.tsx`. **Show the component's preview properly in the preview page.**
4. **Sync Registry:** **Sync the registry properly** using `npm run sync`. However, the user controls registry generation—do not run it automatically unless explicitly requested or clearly part of your approved task.
   - *Registry Pipeline:* `JSDoc Metadata -> npm run sync -> src/data/registryData.ts -> Registry API -> CLI`.
5. **Verification:** Run `npm run lint` and `npm run build`. Verify light/dark mode, responsiveness, and variant behavior before completion.

## 7. Existing Architecture & Agent Policies

* **Required File Inspection:** Before modifying any component, icon, metadata, documentation, or CLI script, inspect existing implementations. Follow the exact same structure, naming, typing, export, and registration conventions. Do not guess.
* **No Parallel Systems:** Never create alternative registries, metadata systems, preview systems, or icon systems. Extend the existing architecture.
* **File Scope:** Modify only requested files. No unrelated refactoring or optimization.
* **Generated Files:** Treat generated files (like `src/data/registryData.ts`) as read-only. Never modify them manually.
* **Deletion Protection:** Never delete files automatically. If deletion is needed: list files, explain why, request approval, and wait.
* **Hallucination Prevention:** Do not assume schemas for metadata or structures. Always read existing implementations first.