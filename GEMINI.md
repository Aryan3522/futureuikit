# Future UI

IMPORTANT

This file defines:

* Project architecture
* Project workflows
* Component workflows
* Registry workflows
* Documentation workflows
* Development standards

All enforcement rules, protection rules, anti-hallucination rules, file protection rules, registry protection rules, CLI protection rules, sync protection rules, and AI operational requirements are defined in:

AGENT_RULES.md

Both files must always be followed together.

If any conflict exists:

AGENT_RULES.md takes precedence.


## Project Overview

Future UI is a modern component library built with:

* Next.js (latest)
* React 19
* Tailwind CSS 4
* Framer Motion

The project distributes reusable components through the Future UI registry and CLI.

---

# Core Philosophy

Components must be:

* Reusable
* Production-ready
* Framework-friendly
* Minimal
* Interactive
* Accessible
* Consistent

Users should be able to install a component and immediately use it without modification.

---

# Technology Standards

## Framework

* Next.js latest
* React 19

## Styling

* Tailwind CSS 4

## Animations

* Framer Motion

## Accessibility

* Radix UI when appropriate

## Language

Reusable components should be written in:

* .ts
* .tsx

---

# Future UI First Policy

Always prefer:

* Future UI Components
* Future UI Icons

Locations:

* src/components/ui
* src/icons

before introducing external alternatives.

---

# Component Standards

Every reusable component must:

* Live in src/components/ui
* Be in its own file
* Be production-ready
* Be reusable
* Be responsive
* Support dark mode
* Support light mode
* Follow Future UI design language

---

# Variant Standards

Where appropriate:

Components should support variants.

Examples:

* modern
* clean
* minimal

Variants must be:

* Typed
* Consistent
* Production-ready

---

# Documentation Requirement

Every reusable component must include a DocBlock.

The DocBlock should describe:

* Purpose
* API
* Usage

---

# Registry Architecture

Source of Truth:

src/components/ui/*.tsx

Registry metadata originates from JSDoc metadata inside component files.

Example:

/**

* @registry-slug example-component
* @registry-name Example Component
* @registry-description Example Description
* @registry-category ui
* @registry-type components:ui
  */

---

# Registry Flow

Component File
↓
JSDoc Metadata
↓
npm run sync
↓
registryData.ts
↓
Registry API
↓
futureuikit CLI

---

# Website Flow

Component File
↓
component-library-data.ts
↓
PreviewRegistry.tsx
↓
Component Pages
↓
Documentation Website

---

# Component Creation Workflow

Step 1

Create:

src/components/ui/[component].tsx

Step 2

Add registry JSDoc metadata.

Step 3

Add component metadata to:

src/data/component-library-data.ts

Step 4

Register preview inside:

src/route-components/PreviewRegistry.tsx

Step 5

Verify:

* Component preview
* Component rendering
* Component availability

Step 6

Run validation:

npm run lint

npm run build

---

# Testing Requirements

Verify:

* Light mode
* Dark mode
* Responsive behavior
* Variant behavior

before completion.

---

# React Standards

Prefer:

"use client"

for interactive components.

Avoid premature optimization.

Do not use:

* React.memo
* useMemo
* useCallback

unless measurable benefits exist.

---

# Styling Rules

Prefer:

* Tailwind utilities
* Existing patterns
* Existing design language

Avoid:

* Duplicate styling systems
* Unnecessary custom CSS

---

# Import Standards

Preferred:

import React from "react";

export default Component;

or

export function Component() {}

Keep imports simple.

Keep exports predictable.

---

# Production Approval Gate

Before deployment:

1. Summarize changes.
2. List impacted files.
3. Request approval.

Never deploy automatically.

# Architecture Preservation Rule

Never create parallel systems.

Examples:

Do not create:

- alternative registries
- alternative metadata systems
- alternative preview systems
- alternative icon systems
- alternative component registration systems

Use the existing architecture.

Extend existing systems instead of replacing them.

When uncertain:

Ask before introducing a new pattern.

# Website Registration Requirements

A component is NOT considered fully integrated until all required website registrations are completed.

Website Integration Requirements:

1. Component exists inside:

src/components/ui

2. Component metadata exists inside:

src/data/component-library-data.ts

3. Component preview is registered inside:

src/route-components/PreviewRegistry.tsx

A component that exists only in src/components/ui is considered incomplete.

A component that exists in component-library-data.ts but is missing from PreviewRegistry.tsx is considered incomplete.

A component must be visible and functional on the website before implementation is considered complete.

Always verify:

* Component page rendering
* Preview rendering
* Component availability
* Navigation to the component page

# Generated Files

The following files are generated and must be treated as read-only:

src/data/registryData.ts

Do not manually edit generated files.

Generated files must only be updated through the official generation workflow.

Registry generation is controlled by the user.

Do not manually update generated registry output.

## Frontend Design Skill

A frontend design skill is installed at:

.agents/skills/frontend-design/SKILL.md

Before generating:

- Components
- Layouts
- Landing pages
- Documentation pages
- Dashboard examples
- Interactive UI

Read and follow the frontend-design skill.

However:

- Maintain Future UI design consistency.
- Do not create random visual identities for individual components.
- Prioritize reusable component design over artistic experimentation.
- Follow Future UI design tokens and architecture.
- Production readiness is more important than visual novelty.