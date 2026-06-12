# Future UI - AI Enforcement Rules

## Absolute Priority

Priority Order:

1. Project Stability
2. Existing Architecture
3. Existing Patterns
4. Registry Compatibility
5. CLI Compatibility
6. UI Consistency
7. Developer Experience
8. Performance

Never sacrifice higher priority items for lower priority items.

---

# Existing Pattern Enforcement

Before creating or modifying:

* Components
* Icons
* Metadata
* Preview Registrations
* Routes
* CLI Integrations

You must first inspect existing implementations.

Rules:

1. Find the closest existing example.
2. Follow the same structure.
3. Follow the same naming conventions.
4. Follow the same typing conventions.
5. Follow the same export conventions.
6. Follow the same registration conventions.

Do not invent new patterns when an existing pattern already exists.

---

# Future UI First Rule

Always use Future UI assets first.

Before importing:

* UI Components
* Icons

Check whether an equivalent implementation already exists.

Use:

* src/components/ui
* src/icons

before considering external solutions.

Do not replace Future UI components with external UI libraries.

Do not replace Future UI icons with external icon libraries.

---

# Registry Protection Rule

Never manually edit:

src/data/registryData.ts

registryData.ts is generated automatically.

Manual modifications are prohibited.

If registry updates are required:

Inform the user.

Do not run sync automatically.

Do not modify generated registry output manually.

---

# Sync Protection Rule

Never run:

npm run sync

unless the user explicitly requests it.

Never suggest automatic sync execution.

The user controls registry generation.

---

# Preview Registry Rule

Every component visible on the website must be registered inside:

src/route-components/PreviewRegistry.tsx

Before creating a new component:

Verify whether PreviewRegistry requires updates.

Before completion:

Verify PreviewRegistry integration.

Never forget PreviewRegistry registration.

---

# component-library-data.ts Rule

Before editing:

src/data/component-library-data.ts

Inspect existing entries.

Determine:

* Existing schema
* Existing field names
* Existing categories
* Existing usage examples

Do not invent:

* Metadata fields
* Categories
* Registration formats

Follow the existing schema exactly.

---

# File Scope Protection

Modify only requested files.

No unrelated refactoring.

No unrelated cleanup.

No unrelated renaming.

No unrelated optimization.

If additional files are required:

1. Stop.
2. List files.
3. Explain why.
4. Request approval.

---

# Deletion Protection

Never delete files automatically.

Before deletion:

1. List files.
2. Explain why.
3. Request approval.
4. Wait.

No exceptions.

---

# CLI Protection

Never delete:

* bin/cli.mjs
* bin/sync.mjs

Never break:

* CLI installation
* Registry API
* Registry generation
* Registry synchronization
* Component installation
* Icon installation

These systems are permanently protected.

---

# Generated Files Rule

Never manually edit generated files.

If a file is generated:

Treat it as read-only.

Generated files must only be changed through their generating workflow.

---

# Hallucination Prevention Rule

Do not assume:

* Metadata schemas
* Registry schemas
* Component schemas
* Category structures
* Preview registration structures

Inspect the codebase first.

Use existing implementations as the source of truth.

When uncertain:

Ask the user.

Do not guess.

---

# Final Rule

Preserve:

* Stability
* Existing architecture
* Registry integrity
* CLI integrity
* Preview integrity

When uncertain:

Do not invent.

# Required File Inspection Rule

Before modifying any system, inspect the relevant files first.

Examples:

Component Creation:

- src/components/ui/*
- src/data/component-library-data.ts
- src/route-components/PreviewRegistry.tsx

Registry Changes:

- bin/sync.mjs
- src/data/registryData.ts
- src/app/api/registry/[slug]/route.ts

Icon Changes:

- src/icons/*

Do not assume file structure.

Do not assume schema structure.

Do not assume implementation details.

Read existing code before making decisions.

# Required File Inspection Rule

Before modifying any system, inspect the relevant files first.

Component Creation:

Inspect:

* src/components/ui/*
* src/data/component-library-data.ts
* src/route-components/PreviewRegistry.tsx

Registry Related Changes:

Inspect:

* bin/sync.mjs
* src/data/registryData.ts
* src/app/api/registry/[slug]/route.ts

Icon Related Changes:

Inspect:

* src/icons/*

Documentation Related Changes:

Inspect:

* Existing documentation entries
* Existing component entries

Do not assume:

* Schemas
* Metadata structures
* Registration patterns
* Preview structures
* Category structures

Read existing implementations first.

Existing implementations are the source of truth.

# Architecture Preservation Rule

Never create parallel systems.

Do not create:

* Alternative registries
* Alternative metadata systems
* Alternative preview systems
* Alternative icon systems
* Alternative component registration systems
* Alternative routing systems
* Alternative component catalogs

Always extend the existing architecture.

Use existing systems whenever possible.

When uncertain:

Ask before introducing a new architectural pattern.

# Registry Generation Rule

The registry pipeline is:

src/components/ui/*
↓
Registry JSDoc Metadata
↓
npm run sync
↓
src/data/registryData.ts
↓
Registry API
↓
futureuikit CLI

The user controls registry generation.

Never automatically run:

npm run sync

Never manually modify:

src/data/registryData.ts

Never attempt to recreate registry generation logic.

Never generate registry output manually.

If registry regeneration is required:

Inform the user and allow the user to run the sync command.

# Preview Registry Enforcement

PreviewRegistry.tsx is mandatory.

Whenever a new component is created:

Verify whether:

src/route-components/PreviewRegistry.tsx

requires updates.

A component is not considered fully integrated into the website unless:

* Component metadata exists in component-library-data.ts
* Preview registration exists in PreviewRegistry.tsx

Always verify preview availability before considering implementation complete.

# Future UI Consistency Rule

Future UI consistency is more important than creativity.

Before creating:

* Components
* Icons
* Metadata
* Registrations
* Previews

Find the closest existing implementation and follow its pattern.

Match:

* File structure
* Naming conventions
* Typing conventions
* Registry conventions
* Preview conventions
* Documentation conventions
* Variant conventions

Do not invent new patterns when an existing pattern already exists.

When uncertain:

Inspect existing implementations.

If uncertainty remains:

Ask the user.

Do not guess.
