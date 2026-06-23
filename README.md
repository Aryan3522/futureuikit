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
- 🧩 **90+ components** — Buttons, loaders, cards, particles, calendars, error pages, and more
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
| `accordion` | Accordion | Layout |
| `ai-chat` | AI Chat Interface | Application |
| `alert-dialog` | Alert Dialog | Feedback |
| `aspect-ratio` | Aspect Ratio | Layout |
| `automotive-carousel` | Automotive Carousel | Display |
| `badge` | Badge | Display |
| `basic-card` | Basic Card | Display |
| `basic-loader` | Basic Loader | Loader |
| `bmw-m4` | BMW M4 | UI |
| `boxy-bounce` | Bouncy Loader | Loader |
| `boxy-rotate` | Rotating Loader | Loader |
| `boxy-shift` | Boxy Loader | Loader |
| `browser-window` | Browser Window | Application |
| `button` | Button | Form |
| `calculator` | Calculator | Utility |
| `calendar` | Calendar | Utility |
| `card` | Card | Layout |
| `cinematic-error` | Cinematic Error | Feedback |
| `clay-morph-button` | Clay Morphism Button | Form |
| `collapsible` | Collapsible | Layout |
| `command-palette` | Command Palette | Navigation |
| `component-page-sidebar` | Component Page Sidebar | Navigation |
| `components-grid` | Components Grid | Display |
| `context-menu` | Context Menu | Navigation |
| `cursor-glow-button` | Cursor Glow Button | Form |
| `dock` | Dock | Navigation |
| `dot-background` | Dot Background | Background |
| `drawer` | Drawer | Feedback |
| `dropdown-menu` | Dropdown Menu | Navigation |
| `dynamic-form` | Dynamic Form System | Form |
| `error-page` | Error Page | Feedback |
| `expanding-card` | Expanding Flex Card | Display |
| `file-upload` | FileUpload | Form |
| `filter-builder` | Filter Builder | Form |
| `footer` | Footer | Layout |
| `form-builder` | FormBuilder | Form |
| `glass-panel` | Glass Panel | Display |
| `global-breadcrumb` | Global Breadcrumb | Navigation |
| `glowy` | Glowy Button | Form |
| `GutterLines` | GutterLines | Background |
| `header` | Header | Navigation |
| `highlighter` | Highlighter | Typography |
| `hover-card` | Hover Card | Navigation |
| `hover-glare-card` | Hover Glare Card | Display |
| `icon-cloud` | Icon Cloud | Display |
| `infinite-slider` | Infinite Carousel Slider | Display |
| `input-otp` | Input Otp | Form |
| `kanban` | Kanban Board | Board |
| `menu` | Circle Navigation Menu | Navigation |
| `menubar` | Menubar | Navigation |
| `minimal-button` | Minimal Button | Form |
| `modal` | Modal | Feedback |
| `nexus-card` | Nexus Card | Display |
| `noir-hero-3d` | Noir Hero 3D | Display |
| `otp-input` | Premium OTP Input | Form |
| `otp-verification` | OTP Verification | Form |
| `pagination` | Pagination | Navigation |
| `particles` | Particles | Background |
| `perspective-grid` | Perspective Grid | Background |
| `point-cursor` | Point Cursor | UI |
| `premium-upload-button` | Premium Upload Button | Form |
| `primary` | Primary Button | Form |
| `project-deck` | Project Deck | Display |
| `puzzle-video` | Puzzle Video | Display |
| `radio-group` | Radio Group | Form |
| `resizable` | Resizable | Layout |
| `rich-text-editor` | Rich Text Editor | Editor |
| `scifi-helmet` | Sci-Fi Helmet | Display |
| `scroll-area` | Scroll Area | Layout |
| `scroll-progress` | Scroll Progress | UI |
| `scroll-text-reveal` | Scroll Text Reveal | Typography |
| `search` | Search | Form |
| `search-input` | Search Input | Form |
| `select` | Select | Form |
| `sidebar-button` | Sidebar Button | Navigation |
| `skeleton` | Skeleton | Loader |
| `skeuomorphic-button` | Skeuomorphic Button | Form |
| `slide-up-reveal` | Slide Up Reveal | Typography |
| `slider` | Slider | Form |
| `sonner` | Sonner | Feedback |
| `terminal` | Terminal | Application |
| `text-3d-flip` | Text 3d Flip | Typography |
| `text-system` | Typography System | Typography |
| `toast` | Toast Notification | Feedback |
| `toggle` | Toggle | Form |
| `toggle-group` | Toggle Group | Form |
| `tooltip` | Tooltip | Navigation |
| `typing-animation` | Typing Animation | Typography |
| `velocity-marquee` | Velocity Marquee | Display |
| `workflow-builder` | Workflow Builder | Board |


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
