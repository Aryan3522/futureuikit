# Future UI — Motion-first Component Library for Next.js

[![npm version](https://img.shields.io/npm/v/futureuikit?color=%236366f1&label=npm&style=flat-square)](https://www.npmjs.com/package/futureuikit)
[![npm downloads](https://img.shields.io/npm/dm/futureuikit?color=%236366f1&style=flat-square)](https://www.npmjs.com/package/futureuikit)
[![license](https://img.shields.io/npm/l/futureuikit?color=%236366f1&style=flat-square)](https://github.com/Aryan3522/future-ui/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Aryan3522/future-ui?color=%236366f1&style=flat-square)](https://github.com/Aryan3522/future-ui/stargazers)

**Future UI** is an open-source CLI-powered component library built specifically for **Next.js 16** and **React 19**. Each component is crafted with **Framer Motion**, **Tailwind CSS 4**, and **Radix UI** — delivering cinematic animations, glassmorphism, and a seamless dark/light theme system out of the box.

> **Live Demo & Docs →** [futureuikit.vercel.app](https://futureuikit.vercel.app)

---

## ✨ Why Future UI?

- 🎬 **Motion-first** — Every component is animated with Framer Motion physics springs
- 🌗 **Theme-adaptive** — Full dark/light mode support using CSS variables
- ⚡ **CLI-powered** — Install individual components directly into your codebase (like shadcn/ui)
- 🔒 **Zero lock-in** — You own the code. No runtime dependency on Future UI after install
- 🧩 **29+ components** — Buttons, loaders, cards, particles, calendars, error pages, and more
- 🏗️ **App Router ready** — Built for Next.js 16 App Router

---

## 🚀 Quick Start

Install any component directly into your project with one command:

```bash
npx futureuikit add <component-slug>
```

### Examples

```bash
# Add a cinematic error page
npx futureuikit add cinematic-error

# Add a particle background
npx futureuikit add particles

# Add a glass calculator
npx futureuikit add calculator

# Add an expanding flex card
npx futureuikit add expanding-card
```

The CLI will:
1. **Detect** your project structure (`src/` or root, TypeScript or JavaScript)
2. **Create** `lib/utils.ts` with the `cn` helper if needed
3. **Install** all required dependencies automatically
4. **Copy** the component file into `components/ui/`

---

## 📦 Available Components

| Slug | Component | Category |
|------|-----------|----------|
| `primary` | Primary Button | Form |
| `glowy` | Glowy Button | Form |
| `calculator` | Calculator | Utility |
| `calendar` | Calendar | Utility |
| `cinematic-error` | Cinematic Error Page | Feedback |
| `error-page` | Neon Error Page | Feedback |
| `particles` | Particle Background | Background |
| `dot-background` | Dot Background | Background |
| `perspective-grid` | Perspective Grid | Background |
| `infinite-slider` | Carousel Slider | Display |
| `expanding-card` | Expanding Flex Card | Display |
| `basic-card` | Basic Card | Display |
| `accordion` | Accordion | Layout |
| `search-input` | Search Input | Form |
| `toast` | Toast Notification | Feedback |
| `scroll-progress` | Scroll Progress Bar | UI |
| `point-cursor` | Custom Cursor | UI |
| `basic` | Basic Loader | Loader |
| `boxy-bounce` | Bouncy Loader | Loader |
| `boxy-rotate` | Rotating Loader | Loader |
| `boxy-shift` | Boxy Loader | Loader |
| `menu` | Circle Navigation Menu | Navigation |
| `badge` | Badge | Display |
| `button` | Base Button | Form |
| `card` | Card | Layout |
| `sidebar-button` | Sidebar Button | Navigation |
| `text-system` | Typography System | Typography |
| `github-icon` | GitHub Icon | Icon |
| `linkedin-icon` | LinkedIn Icon | Icon |

> Browse live previews and copy-paste code at **[futureuikit.vercel.app/components](https://futureuikit.vercel.app/components)**

---

## 🛠 Prerequisites

Your project should already have:
- **Node.js** `>=18.18.0`
- **Next.js** `>=15` (with App Router)
- **React** `>=18`
- **Tailwind CSS** `>=4`
- **TypeScript** (optional, but recommended)

Components that use animations additionally require:
```bash
npm install framer-motion lucide-react
```

---

## 💻 Local Development

To run the Future UI website locally:

```bash
git clone https://github.com/Aryan3522/future-ui.git
cd future-ui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore all components.

---

## 🔧 CLI Reference

```
Usage:
  npx futureuikit add <component-slug> [options]

Options:
  --force             Overwrite existing component files
  --registry <url>    Use a custom component registry URL
  --version, -v       Print CLI version
  --help, -h          Show help

Environment Variables:
  FUTURE_UI_REGISTRY_URL    Override the default registry base URL
```

### Custom Registry

You can point the CLI to a self-hosted registry:

```bash
npx futureuikit add particles --registry https://your-domain.com/api/registry
```

---

## 🔄 Release Workflow

```bash
# 1. Sync component files to registry
npm run sync

# 2. Deploy the Next.js app (Vercel auto-deploys on push)
git push

# 3. Verify a registry endpoint
curl https://futureuikit.vercel.app/api/registry/particles

# 4. Bump version and publish to npm
npm version patch   # or minor / major
npm publish
```

---

## 🤝 Contributing

Contributions are what make the open-source community great. Any contribution you make is **hugely appreciated**.

1. **Fork** the project
2. **Create** a feature branch: `git checkout -b feat/my-new-component`
3. **Add** your component to `src/components/ui/` with registry annotations
4. **Sync** the registry: `npm run sync`
5. **Commit**: `git commit -m "feat: add MyComponent"`
6. **Push**: `git push origin feat/my-new-component`
7. **Open a Pull Request**

### Adding a New Component

```tsx
/**
 * @registry-slug my-component
 * @registry-name My Component
 * @registry-dependency framer-motion
 */
"use client";

// ... your component code
```

Then run `npm run sync` — the component is automatically added to the registry.

---

## 📜 License

MIT © [Aryan Hooda](https://github.com/Aryan3522)

---

## 🌟 Support

If Future UI helped you build something cool, please give it a ⭐ on [GitHub](https://github.com/Aryan3522/future-ui) — it helps more developers discover the project!

Built with ❤️ by [Aryan Hooda](https://github.com/Aryan3522)
