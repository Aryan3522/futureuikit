import { registry } from "./registryData";
import { ComponentItem } from "@/types";

export const rawComponentsList: ComponentItem[] = [

  {
    id: 1001,
    title: "Sci-Fi Helmet",
    type: "Components",
    slug: "scifi-helmet",
    category: "ui",
    isNew: true,
    description: "A premium 3D Sci-Fi Helmet model with auto-rotation, cinematic lighting, contact shadows, and interactive orbit controls powered by React Three Fiber.",
    details: [
      "Auto-rotating cinematic presentation.",
      "Contact shadows for premium grounding.",
      "Interactive orbit controls.",
      "Smooth scale-in entrance animation with idle float.",
      "Responsive scaling on all screen sizes."
    ],
    codes: {
      next: "import { ScifiHelmet } from \"@/components/ui/scifi-helmet\";\n\nexport default function Example() {\n  return (\n    <div className=\"w-full h-[500px]\">\n      <ScifiHelmet autoRotate rotationSpeed={1} />\n    </div>\n  );\n}",
    },
    usage: [
      "Install: Run 'npx futureuikit add scifi-helmet'.",
      "Import Bike3D from '@/components/ui/scifi-helmet'.",
      "Drop into any container with a defined width and height.",
      "Control rotation via autoRotate and rotationSpeed props.",
      "Toggle controls with enableControls prop."
    ],
  },
  {
    id: 1000,
    title: "Terminal Window",
    type: "Components",
    slug: "terminal",
    category: "ui",
    isNew: true,
    description: "A highly customizable, authentic-looking terminal component. Supports 8 OS variants (macOS, Windows, Ubuntu, Bash, ZSH, etc) with built-in typing animations, copy-to-clipboard functionality, premium framer-motion physics, and interactive command execution.",
    details: [
      "8 distinct authentic variants: Windows, PowerShell, CMD, Bash, Ubuntu, Linux, macOS, and ZSH.",
      "Interactive typing mode: Allow users to type and execute commands.",
      "Built-in framer-motion typing and cursor animations for static modes.",
      "Auto-adapts to your application's font-mono family.",
      "Intelligent copy-to-clipboard handling.",
      "Responsive wrapping and no horizontal overflow issues.",
    ],
    codes: {
      next: `import { Terminal } from "@/components/ui/terminal";

export default function Example() {
  return (
    <Terminal 
      variant="macos" 
      commands={["npm install futureuikit", "npx futureuikit add terminal"]} 
      animated 
    />
  );
}`,
    },
    usage: [
      "Install: Run 'npx futureuikit add terminal'.",
      "Variants: Pass the 'variant' prop with one of the 8 supported OS environments.",
      "Animation: Pass the 'animated' prop to automatically type out the commands sequentially.",
      "Interactive: Pass 'interactive={true}' and 'onCommand={(cmd) => handleCommand(cmd)}' to let users type their own commands.",
      "Content: Use 'commands' (array of strings) to show terminal commands, and 'output' (array of strings) for terminal responses.",
      "Custom Wrapper: You can pass custom 'children' to render your own complex terminal content instead of standard commands.",
    ],
  },
  {
    id: 991,
    title: "Noir Hero 3D",
    type: "Background",
    slug: "noir-hero-3d",
    category: "ui",
    isNew: true,
    description: "A premium 3D geometric centerpiece built with React Three Fiber, featuring interactive rotation, hover physics, and luminous rendering designed for the NOIR_OS aesthetic.",
    details: [
      "Premium 3D rendering with @react-three/fiber and drei.",
      "Mouse interaction with floating physics.",
      "Luminous materials with glass-like refraction.",
      "Perfect for high-end hero sections.",
    ],
    codes: {
      next: 'import { NoirHero3D } from "@/components/ui/noir-hero-3d";\n\nexport default function Example() {\n  return (\n    <div className="w-full h-[500px]">\n      <NoirHero3D className="w-full h-full" />\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add noir-hero-3d'.",
      "Dependencies: Installs three, @react-three/fiber, and @react-three/drei automatically.",
      "Wrap it in a container with defined width and height.",
    ],
  },
  {
    id: 992,
    title: "Glass Panel",
    type: "Cards",
    slug: "glass-panel",
    category: "layout",
    isNew: true,
    description: "A premium glassmorphic panel with heavy blur, luminous shadows, and Framer Motion integration. Built for the NOIR_OS aesthetic.",
    details: [
      "Mantle and Heavy blur variants.",
      "Built-in luminous glow states.",
      "Integrated with Framer Motion.",
      "Subtle 1px border highlights.",
    ],
    codes: {
      next: 'import { GlassPanel } from "@/components/ui/glass-panel";\n\nexport default function Example() {\n  return (\n    <GlassPanel variant="heavy" glow="subtle" className="p-8">\n      <h2 className="text-white">Premium Glass</h2>\n    </GlassPanel>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add glass-panel'.",
      "Variants: 'mantle' for lighter blur, 'heavy' for thick frosted glass.",
      "Glow: Add 'glow=\"subtle\"' or 'glow=\"luminous\"' for ambient shadows.",
    ],
  },
  {
    id: 993,
    title: "Hover Glare Card",
    type: "Cards",
    slug: "hover-glare-card",
    category: "layout",
    isNew: true,
    description: "A premium card component with a sweeping diagonal CSS glare effect on hover. Includes multiple visual variants and luminous glow states.",
    details: [
      "Pure CSS-driven diagonal glare effect for maximum performance.",
      "Supports Default, Glass, Solid, and Ghost variants.",
      "Built-in luminous glow states for interactive feedback.",
      "Clean, minimalist aesthetic suitable for modern dashboards.",
    ],
    codes: {
      next: 'import { HoverGlareCard } from "@/components/ui/hover-glare-card";\n\nexport default function Example() {\n  return (\n    <HoverGlareCard variant="glass" glow="primary" className="p-6">\n      <h3 className="text-xl font-bold text-white mb-2">Premium Card</h3>\n      <p className="text-muted-foreground">Hover to see the glare effect.</p>\n    </HoverGlareCard>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add hover-glare-card'.",
      "Variants: Choose between 'default', 'glass', 'solid', or 'ghost'.",
      "Glow: Add 'glow=\"primary\"', 'glow=\"secondary\"', or 'glow=\"white\"' for ambient shadows.",
      "Glare Opacity: Adjust the intensity of the diagonal glare via the 'glareOpacity' prop.",
    ],
  },
  {
    id: 999,
    title: "Browser Window",
    type: "Layout",
    slug: "browser-window",
    category: "layout",
    isNew: true,
    description: "A clean, responsive mock browser window for displaying UI components or screenshots in a contained environment.",
    details: [
      "Perfect for component showcases, documentation, and portfolio sites.",
      "Automatically handles aspect ratio and responsive scaling.",
      "Built-in mock window header with macOS style traffic lights.",
      "Provides an isolated canvas with customized scrollbars.",
    ],
    codes: {
      next: 'import { BrowserWindow } from "@/components/ui/browser-window";\n\nexport default function Example() {\n  return (\n    <BrowserWindow className="max-w-2xl aspect-video">\n      <div className="flex items-center justify-center h-full">\n        Your Content Here\n      </div>\n    </BrowserWindow>\n  );\n}',
    },
        usage: [
      "Install: Run 'npx futureuikit add browser-window'.",
      "Wrap any content in <BrowserWindow> to mock a browser view.",
      "Use 'contentClassName' to style the internal canvas.",
    ],
  },
  {
    id: 1000,
    title: "macOS Browser",
    type: "Layout",
    slug: "macos-browser",
    category: "layout",
    isNew: true,
    description: "A premium, highly interactive macOS Safari-style browser window component with a functional Home Screen and Favourites.",
    details: [
      "Authentic macOS Safari UI with traffic lights, tabs, and layout.",
      "Interactive Home Screen featuring customizable Favourites.",
      "Native-feeling dragging, maximizing, and minimizing mechanics.",
      "Fluid premium animations powered by Framer Motion."
    ],
    codes: {
      next: 'import { MacOsBrowser } from "@/components/ui/macos-browser";\n\nexport default function Example() {\n  return (\n    <div className="w-full h-[600px] flex items-center justify-center p-4">\n      <MacOsBrowser \n        inline \n        url="https://futureuikit.com" \n        title="Future UI"\n      />\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add macos-browser'.",
      "Render <MacOsBrowser /> to spawn an OS-level detached window.",
      "Use 'inline' prop to render it constrained within your layout instead.",
    ],
  },
  {
    id: 1,
    title: "Primary Button",
    type: "Button",
    slug: "primary",
    category: "form",
    description:
      "A fully modern and customizable primary button designed for high-end UI. It features semantic intents (primary, success, warning, danger, info, secondary) and multiple visual styles (modern, clean, minimal). Built with Framer Motion for organic interactions, it supports disabled states and full color customization.",
    details: [
      "Built with React and Framer Motion for smooth, organic interactions.",
      "Supports semantic intents: Primary, Success, Warning, Danger, Info, and Secondary.",
      "Supports multiple visual modes: Modern (Glass), Clean (Solid), and Minimal (Outline).",
      "Built-in support for disabled states with appropriate styling and interaction prevention.",
      "Fully customizable color profile via props (overrides semantic defaults).",
      "Zero-shadow design for a clean, professional aesthetic.",
      "Highly reusable and easy to integrate into any Next.js project.",
    ],
    codes: {
      next: 'import { PrimaryButton } from "@/components/ui/primary-button";\n\nexport default function Example() {\n  return (\n    <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-4">\n      {/* Simple Variant usage */}\n      <PrimaryButton variant="primary" type="submit">Submit Form</PrimaryButton>\n      <PrimaryButton variant="success">Success Action</PrimaryButton>\n      \n      {/* Full accessibility & standard attributes support */}\n      <PrimaryButton \n        variant="danger" \n        onFocus={() => console.log(\'Focused!\')}\n        aria-label="Delete item"\n      >\n        Delete\n      </PrimaryButton>\n\n      {/* Styling modes */}\n      <PrimaryButton variant="info" mode="minimal">Minimal Info</PrimaryButton>\n      \n      {/* Native disabled state */}\n      <PrimaryButton disabled>Cannot Click</PrimaryButton>\n    </form>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add primary' to download the component and dependencies.",
      "Import: 'import { PrimaryButton } from \"@/components/ui/primary-button\";'",
      "Variants: Use the 'variant' prop to switch between 'primary', 'success', 'warning', 'danger', 'info', and 'secondary'.",
      "Modes: Toggle the 'mode' prop between 'modern' (glass), 'clean' (solid), and 'minimal' (outline).",
      "Customization: Provide a 'color' prop to override the default semantic styling with any valid CSS color.",
      "Standard Props: Supports all native HTML button attributes including 'disabled', 'type', and 'onClick'.",
    ],
  },
  {
    id: 2,
    title: "Glowy Button",
    type: "Button",
    slug: "glowy",
    category: "form",
    description:
      "A signature pill-shaped button featuring a premium glass-morph interaction. Initially covered by a full-width colored glass sheet, the layer smoothly shrinks into a compact circle on hover/tap, revealing a hidden icon while emitting a vibrant outer glow.",
    details: [
      "Premium pill-shaped UI with edge-to-edge glass sheet coverage.",
      "Interactive shrinking glass: the full-width layer collapses into a sleek circle on the right side upon interaction.",
      "Dynamic icon reveal: the icon scales into view as the glass sheet shrinks.",
      "Smooth physics-based spring animations for a responsive, modern feel.",
      "Semantic variant support: Primary, Success, Warning, Danger, Info, and Secondary.",
      "Integrated with Lucide React for high-quality iconography.",
      "Full mobile support: animations are optimized for both hover and touch interactions.",
    ],
    codes: {
      next: 'import { GlowyButton } from "@/components/ui/glowy-button";\nimport { Rocket, Zap } from "lucide-react";\n\nexport default function Example() {\n  return (\n    <div className="flex flex-wrap gap-4">\n      {/* Semantic Variants */}\n      <GlowyButton variant="primary">Launch</GlowyButton>\n      <GlowyButton variant="success" icon={Rocket}>Success</GlowyButton>\n      <GlowyButton variant="danger">Delete</GlowyButton>\n      <GlowyButton variant="info">Info Action</GlowyButton>\n      <GlowyButton variant="warning" icon={Zap}>Warning Action</GlowyButton>\n      \n      {/* Customization */}\n      <GlowyButton \n        color="#8b5cf6" \n        glowColor="rgba(139, 92, 246, 0.5)"\n        onClick={() => alert(\'Custom Glow!\')}\n      >\n        Purple Glow\n      </GlowyButton>\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add glowy' to add the component and Lucide-React dependencies.",
      "Import: 'import { GlowyButton } from \"@/components/ui/glowy-button\";'",
      "Variants: Set the 'variant' prop to 'primary', 'success', 'warning', 'danger', 'info', or 'secondary'.",
      "Icons: Pass a Lucide icon component to the 'icon' prop (defaults to ArrowRight).",
      "Advanced Styling: Use 'color' for the button base and 'glowColor' to customize the outer shadow intensity.",
      "Interaction: Perfect for high-impact CTAs that require interactive visual feedback.",
    ],
  },
  {
    id: 3,
    title: "Basic Card",
    type: "Cards",
    slug: "basic-card",
    category: "layout",
    description:
      "A modern, highly flexible card component with multiple variants and built-in animations. Designed to be clean and minimal, it avoids heavy shadows in favor of subtle borders and glassmorphism. Perfect for profiles, feature blocks, and data display.",
    details: [
      "Built with Framer Motion for smooth entry and hover animations.",
      "Supports Modern (Glass), Clean (Solid), and Minimal (Outline) variants.",
      "Fully customizable color scheme for icons and primary actions.",
      "Minimalist design without heavy shadows for a clean look.",
      "Responsive layout that adapts to any container.",
      "Easily configurable stats and call-to-action buttons.",
    ],
    codes: {
      next: 'import { BasicCard } from "@/components/ui/basic-card";\n\nexport default function Example() {\n  return (\n    <BasicCard \n      variant="modern"\n      color="#6366f1"\n      name="Aryan Hooda"\n      title="Full Stack Developer"\n    />\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add basic-card' to download.",
      "Import: 'import { BasicCard } from \"@/components/ui/basic-card\";'",
      "Variants: Choose between 'modern' (glass effect), 'clean' (solid background), and 'minimal' (outline style).",
      "Customization: The 'color' prop controls the theme accent (avatars, icons, and primary buttons).",
      "Data: Pass 'name', 'title', and optionally 'stats' (array of {label, value}) to populate the card.",
      "Actions: Use 'onPrimaryClick' and 'onSecondaryClick' props to handle user interactions.",
    ],
  },
  {
    id: 4,
    title: "Rotating Loader",
    type: "Loader",
    slug: "boxy-rotate",
    category: "ui",
    description:
      "A modern box-style loading screen with four rotating blocks that creates a smooth and engaging visual while content is loading. Ideal for pages, sections, or actions where users need clear feedback that a process is in progress.",
    details: [
      "Shows four boxes rotating to indicate an active loading state.",
      "Gives users clear visual feedback that something is in progress.",
      "Works well for page loads, API calls, and background tasks.",
      "Lightweight and smooth animation for a modern UI feel.",
      "Easy to customize colors and size using CSS.",
      "Can be used as a full-screen loader or inside small sections.",
    ],
    codes: {
      next: 'import { BoxyRotateLoader } from "@/components/ui/boxy-rotate-loader";\n\nexport default function Example() {\n  return <BoxyRotateLoader />;\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add boxy-rotate'.",
      "Import: 'import { BoxyRotateLoader } from \"@/components/ui/boxy-rotate-loader\";'",
      "Display: Render the component conditionally while your 'loading' state is true.",
      "Placement: Center it within a container using 'flex items-center justify-center' for the best effect.",
      "Customization: Edit the source file to change the box colors or size variables.",
    ],
  },
  {
    id: 5,
    title: "Bouncy Loader",
    type: "Loader",
    slug: "boxy-bounce",
    category: "ui",
    description:
      "A clean loading screen with stacked boxes that rise and fall in sequence, giving a clear sense of ongoing activity while content or data is being loaded.",
    details: [
      "Uses multiple boxes moving up and down to show loading progress.",
      "Helps users understand that a process is currently running.",
      "Suitable for page loads, API requests, and async actions.",
      "Smooth animation keeps the interface feeling responsive.",
      "Lightweight and easy to integrate into any layout.",
      "Colors and size can be customized through CSS variables.",
    ],
    codes: {
      next: 'import { BoxyBounceLoader } from "@/components/ui/boxy-bounce-loader";\n\nexport default function Example() {\n  return <BoxyBounceLoader />;\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add boxy-bounce'.",
      "Import: 'import { BoxyBounceLoader } from \"@/components/ui/boxy-bounce-loader\";'",
      "Utilization: Ideal for partial content loading where multiple elements are being fetched simultaneously.",
      "Styling: Inherits current text colors by default, but can be customized in the component source.",
    ],
  },
  {
    id: 6,
    title: "Boxy Loader",
    type: "Loader",
    slug: "boxy-shift",
    category: "ui",
    description:
      "A dynamic box-style loading screen where blocks stretch and shift positions, creating a smooth visual cue that content is being prepared in the background.",
    details: [
      "Shows boxes stretching and changing positions to indicate loading.",
      "Gives clear feedback that work is happening in the background.",
      "Well suited for page loads, data processing, and transitions.",
      "Smooth animation keeps users engaged during wait times.",
      "Lightweight design that doesn’t impact performance.",
      "Easy to customize size and colors using CSS.",
    ],
    codes: {
      next: 'import { BoxyShiftLoader } from "@/components/ui/boxy-shift-loader";\n\nexport default function Example() {\n  return <BoxyShiftLoader />;\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add boxy-shift'.",
      "Import: 'import { BoxyShiftLoader } from \"@/components/ui/boxy-shift-loader\";'",
      "Best For: Content blocks, modals, or entire dashboards during initial load.",
      "Configuration: The component uses standard CSS transitions; modify the 'transition-duration' in the source for faster/slower pulses.",
    ],
  },
  {
    id: 7,
    title: "Typography System",
    type: "Typography",
    slug: "text-system",
    category: "ui",
    description:
      "Typography showcases a set of foundational text styles built with simple, reusable CSS to ensure consistency and readability across the interface. It demonstrates examples of heading levels, body text, muted text, and caption text, providing a clear visual hierarchy for content. Designed as a baseline typographic system, it helps maintain a cohesive look and makes it easy to apply uniform text styles throughout your application.",
    details: [
      "Demonstrates heading levels to create a clear content hierarchy.",
      "Includes body text styles optimized for readability and spacing.",
      "Shows muted text for secondary or less prominent information.",
      "Provides caption text styles for labels and small annotations.",
      "Uses simple, reusable CSS rules for consistent typography.",
      "Helps maintain a uniform text system across the entire UI.",
    ],
    codes: {
      next: 'import { Heading, Text, Label, Code } from "@/components/ui/typography";\n\nexport default function Example() {\n  return (\n    <div className="space-y-4">\n      <Heading variant="h1">Hello World</Heading>\n      <Text variant="lead">This is a reusable typography system.</Text>\n      <div className="flex items-center gap-2">\n         <Label>Version:</Label>\n         <Code>v1.0.0</Code>\n      </div>\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add text-system'.",
      "Import: 'import { Heading, Text, Label, Code } from \"@/components/ui/typography\";'",
      "Headings: Use 'Heading' with 'variant' props from 'h1' to 'h6'.",
      "Body Text: Use 'Text' with variants like 'lead', 'large', 'small', 'muted', or 'blockquote'.",
      "Labels: Use the 'Label' component for form titles and metadata captions.",
      "In-line Code: Use the 'Code' component for technical terms or short snippets.",
    ],
  },
  {
    id: 8,
    title: "Carousel Slider",
    type: "Carousel",
    slug: "infinite-slider",
    category: "ui",
    description:
      "A premium, cinematic carousel slider powered by Framer Motion. It features smooth physics-based transitions, staggered content entry, and interactive navigation elements. Designed for high-impact visual storytelling with full responsiveness.",
    details: [
      "Advanced animations using Framer Motion's AnimatePresence.",
      "Cinematic slide transitions with staggered content reveals.",
      "Interactive navigation arrows and smart pagination dots.",
      "Automatic progress indicator synchronized with the auto-play timer.",
      "Supports high-resolution images with sophisticated gradient overlays.",
      "Fully responsive and optimized for both touch and mouse interactions.",
    ],
    codes: {
      next: 'import { CarouselSlider } from "@/components/ui/carousel-slider";\n\nconst slides = [\n  { id: 1, title: "EXOTIC ADVENTURE", tag: "EXPLORE", location: "Bali, Indonesia", image: "..." },\n  { id: 2, title: "URBAN EXPLORER", tag: "CITY", location: "Tokyo, Japan", image: "..." },\n];\n\nexport default function Example() {\n  return <CarouselSlider slides={slides} autoPlayInterval={5000} />;\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add infinite-slider'.",
      "Import: 'import { CarouselSlider } from \"@/components/ui/carousel-slider\";'",
      "Configuration: Provide an array of 'slides', each requiring 'id', 'title', 'tag', 'location', and 'image' (URL).",
      "Auto-play: Use 'autoPlayInterval' (ms) to set the rotation speed. Set to 0 to disable auto-navigation.",
      "Controls: Toggle 'showArrows' and 'showDots' props (boolean) to customize the navigation interface.",
      "Responsiveness: The slider is optimized for full-width headers or hero sections.",
    ],
  },
  {
    id: 9,
    title: "NavMenu",
    type: "Navigation",
    slug: "menu",
    category: "ui",
    description:
      "Circle Navigation Menu is a modern, interactive navigation component built using pure HTML and CSS. It features a compact trigger button that expands into a circular menu, revealing navigation links arranged around the center. With smooth transitions and a clean radial layout, it delivers an engaging user experience while saving screen space. Ideal for portfolios and creative interfaces, this menu adds a premium, futuristic touch without relying on JavaScript.",
    details: [
      "Opens a circular navigation layout from a single central button.",
      "Displays menu items arranged around the center for quick access.",
      "Provides an interactive and visually engaging navigation experience.",
      "Uses smooth CSS transitions for opening and closing animations.",
      "Ideal for portfolios, landing pages, and creative interfaces.",
      "Built with pure HTML and CSS, making it lightweight and easy to customize.",
    ],
    codes: {
      next: 'import { NavMenu } from "@/components/ui/nav-menu";\n\nconst items = [\n  { title: "Home", icon: <span>🏠</span> },\n  { title: "Settings", icon: <span>⚙️</span> },\n];\n\nexport default function Example() {\n  return <NavMenu items={items} />;\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add menu'.",
      "Import: 'import { NavMenu } from \"@/components/ui/nav-menu\";'",
      "Items: Pass an array of 'items' containing 'title', 'icon' (ReactNode), and optionally an 'onClick' handler.",
      "Positioning: Use a parent wrapper with 'fixed' or 'absolute' positioning to anchor the menu (e.g., bottom-right).",
      "Customization: The radial spacing is controlled via CSS variables in the component file for easy adjustment.",
    ],
  },
  {
    id: 10,
    title: "Error Page",
    type: "Pages",
    slug: "error-page",
    category: "ui",
    description:
      "Error Page is a simple, user-friendly fallback screen designed to handle broken routes, missing content, or unexpected issues gracefully. It informs users that something went wrong while guiding them back to a safe path with clear messaging and navigation options. Built with a clean layout and responsive design, this page helps maintain a polished experience even when errors occur.",
    details: [
      "Displays a clear message when a page is not found or an error occurs.",
      "Helps users understand that something went wrong without confusion.",
      "Provides action buttons or links to navigate back to safe pages.",
      "Maintains a clean and consistent layout with the rest of the UI.",
      "Works well for 404, 500, and general fallback scenarios.",
      "Designed to be lightweight and easy to customize with CSS.",
    ],
    codes: {
      next: 'import { ErrorPage } from "@/components/ui/error-page";\n\nexport default function Example() {\n  return <ErrorPage errorCode="404" errorText="NOT FOUND" />;\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add error-page'.",
      "Import: 'import { ErrorPage } from \"@/components/ui/error-page\";'",
      "Deployment: Use this component inside your Next.js 'not-found.tsx' or 'error.tsx' files.",
      "Props: Customize the visual message via 'errorCode' and 'errorText' props.",
      "Styling: The neon effect is self-contained; ensure you have the 'antialiased' class on your body for best text rendering.",
    ],
  },
  {
    id: 11,
    title: "Expanding Flex Card",
    type: "Cards",
    slug: "expanding-card",
    category: "layout",
    description:
      "A stunning, fully responsive flex-based card system. On desktop and tablet, cards expand on hover/click to reveal content. On mobile, it automatically transforms into a smooth, draggable carousel with pagination indicators.",
    details: [
      "Dynamic flex-grow animations for desktop/tablet layouts.",
      "Automatic transformation to a draggable carousel on mobile devices.",
      "Glassmorphism content overlays with blur effects.",
      "Customizable icons, background images, and text content.",
      "Built-in pagination indicators for the mobile carousel view.",
      "Smooth spring physics using Framer Motion.",
    ],
    codes: {
      next: 'import { ExpandingFlexCard } from "@/components/ui/expanding-flex-card";\n\nconst options = [\n  { id: 1, main: "Forest", sub: "Majestic trees", img: "...", icon: "🚶" }\n];\n\nexport default function Example() {\n  return <ExpandingFlexCard options={options} />;\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add expanding-card'.",
      "Import: 'import { ExpandingFlexCard } from \"@/components/ui/expanding-flex-card\";'",
      "Data Structure: Provide an 'options' array with 'id', 'img' (background URL), 'icon', 'main' (title), and 'sub' (caption).",
      "Adaptive UI: The component automatically switches between Flex (Desktop) and Carousel (Mobile) based on viewport width.",
      "Customization: Pass custom CSS classes via the 'className' prop to control card height or container width.",
    ],
  },
  {
    id: 12,
    title: "Basic Loader",
    type: "Loader",
    slug: "basic",
    category: "loader",
    description:
      "A modern, animated loading indicator with multiple visual styles. Built with Framer Motion, it provides smooth and engaging feedback while users wait for content or data to load.",
    details: [
      "Built with Framer Motion for high-quality, smooth animations.",
      "Supports Modern (Rings), Clean (Dots), and Minimal (Circle) variants.",
      "Fully customizable color for the loading indicator.",
      "Lightweight and highly responsive design.",
      "Optional animated loading text with a pulse effect.",
      "Perfect for page transitions, API calls, and data fetching states.",
    ],
    codes: {
      next: 'import { BasicLoader } from "@/components/ui/basic-loader";\n\nexport default function Example() {\n  return (\n    <div className="flex flex-col gap-8">\n      <BasicLoader variant="modern" color="#3b82f6" text="Modern Rings..." />\n      <BasicLoader variant="clean" color="#10b981" text="Clean Dots..." />\n      <BasicLoader variant="minimal" color="#f59e0b" text="Minimalist..." />\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add basic'.",
      "Import: 'import { BasicLoader } from \"@/components/ui/basic-loader\";'",
      "Variants: Use 'modern' for high-end cinematic rings, 'clean' for minimal dots, or 'minimal' for a simple pulse.",
      "Color: Override the default theme via the 'color' prop (accepts hex, hsl, or rgb).",
      "Text: Provide a 'text' prop to show a pulsing status message below the animation.",
    ],
  },
  {
    id: 13,
    title: "Toast Notification",
    type: "Feedback",
    slug: "toast",
    category: "ui",
    description:
      "A succinct message that is displayed temporarily in a corner of the screen. Built with Radix UI primitives and Framer Motion for high-quality interactions, it supports default and destructive variants, titles, and descriptions.",
    details: [
      "Built with Radix UI Toast primitives for accessibility.",
      "Supports Default and Destructive variants.",
      "Animated with Framer Motion for smooth entry and exit.",
      "Customizable titles, descriptions, and action buttons.",
      "Auto-dismiss functionality with configurable delays.",
      "Stackable notifications with a dedicated viewport.",
    ],
    "codes": {
      "next": "import { useToast } from \"@/hooks/use-toast\";\nimport { Button } from \"@/components/ui/button\";\n\nexport default function Example() {\n  const { toast } = useToast();\n\n  return (\n    <Button\n      onClick={() => {\n        toast({\n          title: \"Scheduled: Catch up\",\n          description: \"Friday, February 10, 2024 at 5:57 PM\",\n        });\n      }}\n    >\n      Show Toast\n    </Button>\n  );\n}"
    },
    "usage": [
      "Install: Run 'npx futureuikit add toast' to add the provider, hook, and component files.",
      "Root Setup: Place the <Toaster /> component in your root 'layout.tsx' within the <body>.",
      "Triggering: Import the 'useToast' hook and call 'toast({...})' with 'title' and 'description'.",
      "Variants: Set 'variant: \"destructive\"' in the toast options for error messages.",
      "Placement: Control the toast position via the <Toaster /> component props (e.g., top-right).",
    ]
  },
  {
    id: 14,
    title: "Dot Background",
    type: "Background",
    slug: "dot-background",
    category: "ui",
    description:
      "A highly customizable dotted background component with a built-in radial mask. Perfect for creating depth and modern aesthetics in sections, hero areas, or cards without using heavy image assets.",
    details: [
      "Pure CSS-based dotted grid using radial gradients.",
      "Built-in radial mask for smooth blending with the page background.",
      "Fully customizable dot size, gap (spacing), and color.",
      "Adjustable mask opacity to control the intensity of the effect.",
      "Works as a wrapper or a standalone background layer.",
      "Lightweight and performant with zero image dependencies.",
    ],
    codes: {
      next: 'import { DotBackground } from "@/components/ui/dot-background";\n\nexport default function Example() {\n  return (\n    <div className="w-full h-[400px] border rounded-3xl overflow-hidden">\n      <DotBackground \n        dotColor="#6366f1" \n        dotSize={1.5} \n        gap={24} \n        maskOpacity={0.1}\n      >\n        <h2 className="text-2xl font-bold">Content Over Background</h2>\n      </DotBackground>\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add dot-background'.",
      "Import: 'import { DotBackground } from \"@/components/ui/dot-background\";'",
      "Nesting: Wrap your entire section content inside 'DotBackground' for an immediate professional upgrade.",
      "Customization: Use 'dotSize' (px) and 'gap' (px) to adjust the grid density.",
      "Masking: The 'maskOpacity' prop (0 to 1) controls the radial fade-out toward the container edges.",
    ],
  },
  {
    id: 15,
    title: "Badge",
    type: "UI",
    slug: "badge",
    category: "ui",
    description:
      "A clean, customizable badge component for labels, tags, and status indicators. Built with class-variance-authority for easy variant management and featuring a modern, minimalist aesthetic with glassmorphism support.",
    details: [
      "Built with React and class-variance-authority for scalable styling.",
      "Supports multiple variants: Default (Glass), Secondary, Destructive, and Outline.",
      "Modern, minimalist design with uppercase tracking for a premium feel.",
      "Fully customizable via standard HTML attributes and Tailwind classes.",
      "Lightweight and optimized for high-density information displays.",
    ],
    codes: {
      next: 'import { Badge } from "@/components/ui/badge";\n\nexport default function Example() {\n  return (\n    <div className="flex gap-2">\n      <Badge variant="default">New</Badge>\n      <Badge variant="secondary">Feature</Badge>\n      <Badge variant="destructive">Error</Badge>\n      <Badge variant="outline">Draft</Badge>\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add badge'.",
      "Import: 'import { Badge } from \"@/components/ui/badge\";'",
      "Variants: Choose between 'default' (premium glass), 'secondary' (muted), 'destructive' (error), or 'outline'.",
      "Styling: Use Tailwind classes in 'className' for custom padding, colors, or rounded corners.",
      "Hierarchy: Best used for metadata, status updates, or categorical tags.",
    ],
  },
  {
    id: 16,
    title: "Button",
    type: "Button",
    slug: "button",
    category: "form",
    description:
      "The foundational button component with multiple variants, sizes, and full Radix UI Slot support for polymorphic usage. Designed to be the workhorse of your UI with consistent styling and accessible interactions.",
    details: [
      "Supports standard variants: Default, Destructive, Outline, Secondary, Ghost, and Link.",
      "Four size options: Default, Small (sm), Large (lg), and Icon.",
      "Full asChild support via Radix UI Slot for flexible component composition.",
      "Highly accessible with built-in focus states and disabled handling.",
      "Consistent, professional aesthetic that fits any design system.",
    ],
    codes: {
      next: 'import { Button } from "@/components/ui/button";\nimport { Mail } from "lucide-react";\n\nexport default function Example() {\n  return (\n    <div className="flex flex-wrap gap-4 items-center">\n      <Button variant="default">Button</Button>\n      <Button variant="secondary">Secondary</Button>\n      <Button variant="outline" size="sm">Small Outline</Button>\n      <Button variant="ghost" size="icon"><Mail /></Button>\n      <Button asChild>\n        <a href="/login">Login with Link</a>\n      </Button>\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add button' to install the component and Radix UI Slot dependency.",
      "Import: 'import { Button } from \"@/components/ui/button\";'",
      "Variants: Pick the visual weight via 'variant' ('default', 'secondary', 'outline', 'ghost', 'destructive', 'link').",
      "Sizes: Adjust scaling via 'size' ('default', 'sm', 'lg', 'icon').",
      "Polymorphism: Use 'asChild' to render as a custom link component (like 'next/link') while preserving styles.",
    ],
  },
  {
    id: 17,
    title: "Card",
    type: "Cards",
    slug: "card",
    category: "layout",
    description:
      "A set of modular card components including Header, Title, Description, Content, and Footer. Designed for maximum flexibility, allowing you to compose complex layouts with a clean, consistent aesthetic.",
    details: [
      "Modular design: Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter.",
      "Clean, minimalist aesthetic with subtle borders and shadows.",
      "Highly flexible composition for diverse content types.",
      "Fully responsive and easy to style with Tailwind CSS.",
      "Standardizes information containers across your application.",
    ],
    codes: {
      next: 'import {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from "@/components/ui/card";\n\nexport default function Example() {\n  return (\n    <Card className="w-[350px]">\n      <CardHeader>\n        <CardTitle>Create project</CardTitle>\n        <CardDescription>Deploy your new project in one-click.</CardDescription>\n      </CardHeader>\n      <CardContent>\n        <p>Card Content goes here.</p>\n      </CardContent>\n      <CardFooter className="flex justify-between">\n        <button>Cancel</button>\n        <button>Deploy</button>\n      </CardFooter>\n    </Card>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add card'.",
      "Import: 'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from \"@/components/ui/card\";'",
      "Composition: Use the sub-components to build your layout; only the main 'Card' wrapper is required.",
      "Styling: Apply Tailwind utility classes to the 'Card' component to control sizing and alignment.",
      "Flexibility: Any component can be placed inside 'CardContent' or 'CardFooter' for rich interactive cards.",
    ],
  },
  {
    id: 18,
    title: "Sidebar Button",
    type: "Navigation",
    slug: "sidebar-button",
    category: "ui",
    description:
      "A minimalist button optimized for sidebar navigation. Features an active state indicator, category indentation, and smooth transition effects for a premium navigation experience.",
    details: [
      "Minimalist design focused on text and active state clarity.",
      "Built-in 'isActive' prop with a visual dot indicator and typography change.",
      "Supports 'isCategory' for hierarchical indentation in navigation lists.",
      "Hover effects and smooth transitions for interactive feedback.",
      "Perfect for dashboard sidebars and complex navigation systems.",
    ],
    codes: {
      next: 'import { SidebarButton } from "@/components/ui/sidebar-button";\n\nexport default function Example() {\n  return (\n    <div className="w-64 space-y-1">\n      <SidebarButton label="Dashboard" isActive />\n      <SidebarButton label="Settings" />\n      <SidebarButton label="User Profile" isCategory />\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add sidebar-button'.",
      "Import: 'import { SidebarButton } from \"@/components/ui/sidebar-button\";'",
      "State: Control the 'isActive' prop based on your current route/path for visual navigation feedback.",
      "Hierarchy: Use 'isCategory={true}' for parent-level menu items or group headers.",
      "Styling: The component automatically handles light/dark mode transitions and active state colors.",
    ],
  },
  {
    id: 19,
    title: "Particles",
    type: "Background",
    slug: "particles",
    category: "ui",
    description:
      "A high-performance interactive particle system background. Particles respond to mouse movement and feature smooth alpha transitions, creating a dynamic and immersive environment for futuristic UIs.",
    details: [
      "Canvas-based rendering for high performance even with many particles.",
      "Interactive magnetism: particles subtly react to mouse position.",
      "Fully customizable: quantity, staticity, ease, size, and color.",
      "Responsive design: automatically adjusts to window resizing.",
      "Smooth fading and movement for a premium ambient effect.",
    ],
    codes: {
      next: 'import { Particles } from "@/components/ui/particles";\n\nexport default function Example() {\n  return (\n    <div className="relative w-full h-screen bg-black">\n      <Particles \n        className="absolute inset-0" \n        quantity={150} \n        color="#ffffff" \n      />\n      <div className="relative z-10 flex items-center justify-center h-full">\n        <h1 className="text-white text-4xl">Interactive Particles</h1>\n      </div>\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add particles'.",
      "Import: 'import { Particles } from \"@/components/ui/particles\";'",
      "Setup: The parent container MUST have 'relative' or 'fixed' positioning and 'overflow-hidden'.",
      "Props: Set 'quantity' for density and 'color' (hex) to match your theme.",
      "Performance: Use 'staticity' and 'ease' props to fine-tune the mouse interaction responsiveness.",
    ],
  },
  {
    id: 20,
    title: "Perspective Grid",
    type: "Background",
    slug: "perspective-grid",
    category: "ui",
    description:
      "A 3D-transformed grid background that provides a sense of depth and scale. Perfect for creating 'digital horizon' or 'cyberpunk' aesthetics with smooth radial fading.",
    details: [
      "CSS-based 3D transformation for a futuristic perspective effect.",
      "Customizable grid line gap and fading radius.",
      "Built-in radial overlay for smooth blending with the background color.",
      "Lightweight and performant with zero JavaScript animation overhead.",
      "React.memo optimized to prevent unnecessary re-renders.",
    ],
    codes: {
      next: 'import { PerspectiveGrid } from "@/components/ui/perspective-grid";\n\nexport default function Example() {\n  return (\n    <div className="w-full h-[600px] bg-background relative overflow-hidden">\n      <PerspectiveGrid \n        gridLineGap={50} \n        fadeRadius={70} \n      />\n      <div className="absolute inset-0 flex items-center justify-center">\n        <h2 className="text-3xl font-bold italic">Cyber Horizon</h2>\n      </div>\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add perspective-grid'.",
      "Import: 'import { PerspectiveGrid } from \"@/components/ui/perspective-grid\";'",
      "Implementation: Best used as the bottom-most layer in hero sections or section dividers.",
      "Variants: Adjust 'gridLineGap' to change the perspective scale (lower = denser grid).",
      "Fading: Use 'fadeRadius' to control the radial gradient mask intensity (center vs edges).",
    ],
  },
  {
    id: 21,
    title: "Search Input",
    type: "UI",
    slug: "search-input",
    category: "ui",
    description:
      "A sophisticated search input with a built-in recommendation system and keyboard shortcut support (Ctrl+K). Features smooth Framer Motion animations for the result dropdown and responsive design for both desktop and mobile.",
    details: [
      "Built-in recommendation engine that filters through the entire component library.",
      "Keyboard shortcut support: quickly focus the search with Cmd/Ctrl + K.",
      "Animated results dropdown with staggered entry effects.",
      "Full mobile responsiveness with optimized touch targets.",
      "Integrated with Lucide React for intuitive iconography.",
      "Highly customizable via props for different use cases.",
    ],
    codes: {
      next: 'import { SearchInput } from "@/components/ui/search-input";\n\nexport default function Example() {\n  return (\n    <div className="w-full max-w-sm">\n      <SearchInput placeholder="Search all components..." />\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add search-input' to install the input logic and Framer Motion dependencies.",
      "Import: 'import { SearchInput } from \"@/components/ui/search-input\";'",
      "Shortcuts: The component automatically listens for global 'Cmd+K' (Mac) or 'Ctrl+K' (Windows) key events.",
      "Variants: Pass the 'mobile' prop for optimized styling on smaller screens.",
      "Integration: Connect it to your data source by modifying the 'handleSearch' function in the component source.",
    ],
  },
  {
    id: 22,
    title: "Icons",
    type: "Icons",
    slug: "icons",
    category: "ui",
    description:
      "A premium collection of brand and social icons with built-in micro-animations. Every icon is a pure SVG React component that can be used statically or with motion. Designed to give your project a professional, polished feel out of the box.",
    details: [
      "Premium Motion: Built-in micro-animations powered by Framer Motion.",
      "Toggleable: Enable or disable animations using the 'animate' prop (defaults to false).",
      "Native Implementation: Pure SVG React components with zero external dependencies.",
      "Ships with Package: Included in the main 'futureuikit' package for easy access.",
      "Fully Responsive: Supports size, width, height, className, and custom styling.",
      "Growing Library: Includes GitHub, LinkedIn, X (Twitter), Instagram, Discord, and YouTube.",
    ],
    codes: {
      next: `import { GithubIcon, InstagramIcon, DiscordIcon } from 'futureuikit/icons';

export default function Example() {
  return (
    <div className="flex gap-6 items-center">
      {/* Animated Variant */}
      <InstagramIcon animate size={32} className="text-primary" />
      
      {/* Static Variant */}
      <GithubIcon size={32} className="text-foreground" />
      
      {/* Custom Interaction */}
      <DiscordIcon animate size={40} className="text-[#5865F2]" />
    </div>
  );
}`,
    },
    usage: [
      "Install: Run 'npx futureuikit add icons' to install the icons.",
      "Animation: Pass the 'animate' prop to enable premium hover and entry motions.",
      "Static Mode: Omit the 'animate' prop (or pass false) to use icons as standard SVGs.",
      "Import: 'import { XIcon, YoutubeIcon } from \"futureuikit/icons\";'",
      "Style: Use Tailwind classes or the 'style' prop for custom colors and spacing.",
    ],
  },
  {
    id: 24,
    title: "Scroll Progress",
    type: "UI",
    slug: "scroll-progress",
    category: "ui",
    description:
      "A sleek, high-performance scroll progress indicator built with Framer Motion. It provides real-time visual feedback as users scroll through long-form content, featuring a smooth gradient effect and professional aesthetic.",
    details: [
      "Built with Framer Motion's useScroll hook for precise scroll tracking.",
      "Smooth, high-performance animation with zero layout shift.",
      "Customizable gradient colors and height via CSS.",
      "Fixed positioning ensures visibility at the top of the viewport.",
      "Perfect for blogs, documentation, and long-form articles.",
    ],
    codes: {
      next: 'import { ScrollProgress } from "@/components/ui/scroll-progress";\n\nexport default function Layout({ children }) {\n  return (\n    <>\n      <ScrollProgress />\n      {children}\n    </>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add scroll-progress'.",
      "Import: 'import { ScrollProgress } from \"@/components/ui/ScrollProgress\";'",
      "Setup: Drop the component at the top of your layout or page file. It requires no configuration.",
      "Tracking: The component automatically tracks the primary viewport scroll progress.",
      "Customization: Edit the Tailwind gradient classes in the component source to match your branding.",
    ],
  },
  {
    id: 99,
    title: "Filter Builder",
    type: "UI",
    slug: "filter-builder",
    category: "Complex",
    description: "An enterprise-grade, highly customizable dynamic filter builder. It empowers users to create complex query rules with nested AND/OR logic, making it the perfect companion for advanced data tables, search interfaces, and CRM dashboards.",
    details: [
      "Nested Groups: Supports unlimited levels of nested AND/OR logic groups to handle complex query requirements.",
      "Headless Architecture: Powered by a robust Context API that separates state management from presentation.",
      "Drag & Drop: Features clean HTML5 native drag-and-drop for reordering rules and groups without heavy external dependencies.",
      "Animations: Fully animated with Framer Motion, providing buttery smooth state transitions when adding, removing, or reordering rules.",
      "Custom Dropdowns: Includes a built-in headless dropdown system that perfectly matches all 5 aesthetic variants.",
      "Variants: Supports Default (SaaS), Minimal (Clean), Enterprise (High Contrast), Compact (Dense Data), and Glass (Premium Translucent) themes.",
      "Data Agnostic: Outputs a clean, serialized JSON tree that can be easily parsed into SQL, MongoDB queries, or API payloads."
    ],
    codes: {
      next: `import { FilterBuilder, createEmptyGroup } from "@/components/ui/filter-builder";
import { useState } from "react";

// 1. Define the fields available to your users
const myFields = [
  { id: "status", label: "Status", type: "select", options: [
    { value: "todo", label: "To Do" },
    { value: "done", label: "Done" }
  ]},
  { id: "email", label: "Email Address", type: "text" },
  { id: "created_at", label: "Date Created", type: "date" }
];

export default function AdvancedSearch() {
  // 2. Initialize with an empty group or persisted data
  const [data, setData] = useState(() => createEmptyGroup(myFields));

  // 3. Render the builder and listen for onChange events
  return (
    <div className="p-6 bg-background rounded-xl border">
      <FilterBuilder 
        initialData={data} 
        onChange={(newData) => {
          setData(newData);
          console.log("New Query State:", newData);
        }} 
        fields={myFields}
        variant="default" // "default", "minimal", "enterprise", "compact", "glass"
      />
    </div>
  );
}`
    },
    usage: [
      "Installation: Run 'npx futureuikit add filter-builder' in your terminal.",
      "Setup Fields: Define your schema using the 'FilterField' type. Supported types include 'text', 'number', 'date', 'select', 'boolean', etc.",
      "State Management: The component expects an 'initialData' object of type 'FilterGroup'. It emits changes via the 'onChange' callback.",
      "Custom Operators: While it ships with default operators (Equals, Contains, GT, LT, etc.), you can override them by passing your own 'operators' array.",
      "Variants: Use the 'variant' prop to instantly switch the visual aesthetic to match your specific dashboard design."
    ]
  },
  {
    id: 25,
    title: "Point Cursor",
    type: "UI",
    slug: "point-cursor",
    category: "ui",
    description:
      "A sophisticated custom cursor system that transforms the standard mouse pointer into a precision instrument. It features a center dot and a smooth trailing ring that dynamically reacts to interactive elements, providing a premium feel to any section or entire application.",
    details: [
      "Built with Framer Motion for high-performance, physics-based animations.",
      "Smart isolation: the custom cursor is only active within the wrapped container.",
      "Intelligent hover detection: automatically expands when hovering over links, buttons, or elements with the 'clickable' class.",
      "Smooth trailing effect using spring-based motion values.",
      "Fully customizable colors for both the central dot and the trailing ring.",
      "Accessibility conscious: falls back to the system cursor when not active.",
    ],
    codes: {
      next: 'import { PointCursor } from "@/components/ui/PointCursor";\n\nexport default function Example() {\n  return (\n    <PointCursor>\n      <section className="min-h-[400px] flex items-center justify-center bg-slate-900 text-white rounded-3xl p-12">\n        <div className="text-center">\n          <h2 className="text-3xl font-bold mb-4">Hover anywhere here!</h2>\n          <button className="bg-white text-black px-6 py-2 rounded-full font-medium">\n            Interactive Button\n          </button>\n        </div>\n      </section>\n    </PointCursor>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add point-cursor'.",
      "Import: 'import { PointCursor } from \"@/components/ui/PointCursor\";'",
      "Implementation: Wrap the container you want the cursor active in. The component automatically hides the default system cursor.",
      "Reactivity: The ring expands automatically for 'button' and 'a' tags. Add the 'clickable' class to any other element for the same effect.",
      "Visuals: Pass 'dotColor' and 'ringColor' props (CSS color strings) to match your design palette.",
    ],
  },
  {
    id: 26,
    title: "Accordion",
    type: "UI",
    slug: "accordion",
    category: "ui",
    description:
      "A clean, minimal, and modern accordion component featuring smooth Framer Motion animations. Designed for clarity and ease of use, it supports both single and multiple open items and fits perfectly into documentation, FAQs, or content-heavy layouts.",
    details: [
      "Built with Framer Motion for smooth, physics-based height transitions.",
      "Supports single or multiple item expansion via the 'allowMultiple' prop.",
      "Modern, minimalist design with subtle border treatments and clean typography.",
      "Integrated with Lucide React for intuitive directional iconography.",
      "Fully responsive and keyboard accessible.",
      "Easily customizable via Tailwind CSS classes.",
    ],
    codes: {
      next: 'import { Accordion } from "@/components/ui/accordion";\n\nconst items = [\n  { title: "What is Future UI?", content: "Future UI is a modern component library built with Next.js and Tailwind CSS." },\n  { title: "How do I install it?", content: "You can use our custom CLI to add components to your project." },\n];\n\nexport default function Example() {\n  return <Accordion items={items} />;\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add accordion'.",
      "Import: 'import { Accordion } from \"@/components/ui/accordion\";'",
      "Data: Pass an array of 'items', each with a 'title' (heading) and 'content' (can be text or React components).",
      "Behavior: Use the 'allowMultiple' boolean prop to allow opening more than one section at once.",
      "Customization: Standard Tailwind classes can be passed through to the sub-elements for bespoke styling.",
    ],
  },
  {
    id: 27,
    title: "Calendar",
    type: "UI",
    slug: "calendar",
    category: "ui",
    description:
      "A clean, minimal, and highly interactive calendar component built with Framer Motion. It provides full control over date selection, highlighting, and filtering, making it perfect for bookings, event scheduling, or date picking with a premium feel.",
    details: [
      "Smooth month/year transitions with spring-based animations.",
      "Support for multiple variants: Modern (Glass), Clean (Solid), and Minimal.",
      "Highly customizable: easily highlight specific dates, disable others, or hide them entirely.",
      "Custom date filtering logic via the 'filterDate' prop.",
      "Interactive hover and tap effects for a responsive user experience.",
      "Dependency-free (uses native Date object) and fully responsive.",
    ],
    codes: {
      next: 'import { Calendar } from "@/components/ui/calendar";\nimport { useState } from "react";\n\nexport default function Example() {\n  const [date, setDate] = useState(new Date());\n  \n  // Example: Highlight some dates\n  const highlighted = [\n    new Date(2025, 4, 15), // May 15\n    new Date(2025, 4, 20), // May 20\n  ];\n\n  // Example: Disable weekends\n  const filterDate = (d) => d.getDay() !== 0 && d.getDay() !== 6;\n\n  return (\n    <Calendar \n      value={date} \n      onChange={setDate} \n      highlightedDates={highlighted}\n      filterDate={filterDate}\n      variant="modern"\n    />\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add calendar' to get the component and motion configurations.",
      "Import: 'import { Calendar } from \"@/components/ui/calendar\";'",
      "State Management: Pass 'value' (Date) and 'onChange' (function) to track selection.",
      "Superpower: Use 'highlightedDates' (Date[]) and 'onHighlightToggle' to allow interactive date tagging/favoriting.",
      "Variants: Choose 'modern' for premium glassmorphism, 'clean' for structured solids, or 'minimal' for zero-background integration.",
      "Restrictions: Use 'filterDate' (fn: Date => boolean) to programmatically disable dates (like weekends or past dates).",
    ],
  },
  {
    id: 28,
    title: "Calculator",
    type: "Utility",
    slug: "calculator",
    category: "utility",
    description:
      "A cinematic, fully functional calculator with a modern glass-morphic interface. Supports all standard arithmetic operations, percentage calculations, and sign toggling with smooth Framer Motion transitions.",
    details: [
      "Fully functional arithmetic operations (+, -, *, /).",
      "Support for decimal points, percentages, and sign toggling (+/-).",
      "Cinematic glassmorphism UI with premium blur and subtle shadows.",
      "Interactive button feedback using physics-based spring animations.",
      "Dynamic display with smooth entry/exit transitions for numbers.",
      "Multiple visual variants: Modern (Glass), Clean (Solid), and Minimal.",
      "Responsive layout optimized for both desktop and mobile interaction.",
    ],
    codes: {
      next: 'import { Calculator } from "@/components/ui/calculator";\n\nexport default function Example() {\n  return (\n    <div className="flex items-center justify-center p-8 bg-black">\n      <Calculator variant="modern" />\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add calculator' to download the component and its dependencies.",
      "Import: 'import { Calculator } from \"@/components/ui/calculator\";'",
      "Variants: Toggle between \'modern\', \'clean\', and \'minimal\' using the \'variant\' prop.",
      "Styling: Customize the look by passing a \'className\' or \'primaryColor\'.",
      "Integration: Use it as a standalone utility component in any part of your application.",
    ],
  },
  {
    id: 29,
    title: "Cinematic Error",
    type: "Pages",
    slug: "cinematic-error",
    category: "pages",
    description:
      "A stunning, cinematic, and immersive error page designed for ultra-modern web experiences. It features dynamic mouse-tracked 3D perspective tilts, organic glowing spotlights, glassy typography, and a subtle cinematic grit overlay. It's built entirely with Framer Motion to deliver a premium, fluid aesthetic that captures attention immediately.",
    details: [
      "Dynamic 3D parallax effects tracking the user's cursor.",
      "Cinematic glowing spotlight background that shifts fluidly.",
      "Glassy, ultra-large text typography with screen-blend glowing reflections.",
      "Subtle noise and grit overlay for a premium cinematic texture.",
      "Beautifully animated 'Return Home' button with shimmer hover effects.",
      "Built with Framer Motion for highly optimized, smooth physical springs.",
      "Fully responsive and theme-adaptive (Light & Dark modes).",
    ],
    codes: {
      next: 'import { CinematicError } from "@/components/ui/cinematic-error";\n\nexport default function NotFoundPage() {\n  return (\n    <CinematicError \n      errorCode="404" \n      title="Lost in the void"\n      description="The reality you are looking for has collapsed."\n      onBack={() => console.log("Go back")}\n    />\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add cinematic-error' to download the component and dependencies.",
      "Import: 'import { CinematicError } from \"@/components/ui/cinematic-error\";'",
      "Deployment: Use this component inside your Next.js 'not-found.tsx' or 'error.tsx' files for a gorgeous fallback.",
      "Props: Customize the message via 'errorCode', 'title', and 'description' props.",
    ],
  },
  {
    id: 1001,
    title: "Nexus Card",
    type: "Cards",
    slug: "nexus-card",
    category: "ui",
    description: "A completely unique, ultra-premium, and modernistic card component. Features reactive 3D tilt, a dynamic mouse-tracking spotlight glow, tactile glassmorphism with subtle noise texture, and an animated ambient border.",
    details: [
      "Built with Framer Motion for advanced 3D physics and parallax tilt.",
      "Reactive spotlight that smoothly tracks the user's mouse position.",
      "Tactile glassmorphism with a subtle SVG noise overlay for a premium 'frosted glass' feel.",
      "Animated ambient border that acts as a continuous light source tracing the card's edge.",
      "Highly reusable with toggleable features and fully customizable colors.",
    ],
    codes: {
      next: 'import { NexusCard } from "@/components/ui/nexus-card";\n\nexport default function Example() {\n  return (\n    <NexusCard className="w-80 h-96">\n      <h2 className="text-2xl font-bold text-foreground mb-2">Nexus Design</h2>\n      <p className="text-muted-foreground">Hover over this card to experience the premium tactile feel, reactive spotlight, and 3D parallax tilt.</p>\n    </NexusCard>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add nexus-card'.",
      "Import: 'import { NexusCard } from \"@/components/ui/nexus-card\";'",
      "Interactivity: Tilt and spotlight effects are enabled by default but can be disabled via 'tilt={false}' and 'spotlight={false}'.",
      "Aesthetics: Toggle the texture and ambient light via 'noise={false}' and 'animatedBorder={false}'.",
      "Customization: Adjust 'spotlightColor', 'borderGradient', and 'containerColor' to match your brand's unique palette.",
    ],
  },
  {
    id: 100,
    title: "Scroll Text Reveal",
    type: "Typography",
    slug: "scroll-text-reveal",
    category: "ui",
    description:
      "A smooth text animation component that reveals characters one by one as they scroll into view. The animation seamlessly reverses when scrolling away, creating a highly engaging reading experience.",
    details: [
      "Powered by Framer Motion's useScroll and useTransform hooks.",
      "Automatically splits text into characters and ties their opacity, blur, and position to scroll progress.",
      "Reversible animation: elements scrub forward and backward based on scroll position.",
      "Easy to use: simply wrap any text inside the component.",
    ],
    codes: {
      next: 'import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";\n\nexport default function Example() {\n  return (\n    <div className="w-full flex flex-col items-center">\n      <div className="h-[60vh] flex items-center justify-center text-muted-foreground border-b border-border/50 w-full">\n        <span className="animate-pulse">Scroll down to reveal text ↓</span>\n      </div>\n      <div className="py-32 px-4 max-w-3xl min-h-[80vh] flex items-center justify-center">\n        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center">\n          <ScrollTextReveal>\n            The future of UI design is here. Experience seamless, highly optimized animations that elevate your application&apos;s feel.\n          </ScrollTextReveal>\n        </h2>\n      </div>\n      <div className="h-[60vh] flex items-center justify-center text-muted-foreground border-t border-border/50 w-full">\n        <span className="animate-pulse">Scroll up to see it reverse ↑</span>\n      </div>\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add scroll-text-reveal'.",
      "Import: 'import { ScrollTextReveal } from \"@/components/ui/scroll-text-reveal\";'",
      "Usage: Wrap any plain text string inside <ScrollTextReveal>.",
      "Customization: The animation range is based on its container entering the viewport.",
    ],
  },
  {
    id: 101,
    title: "Cursor Glow Button",
    type: "Button",
    slug: "cursor-glow-button",
    category: "form",
    description: "A sophisticated button with a smooth radial gradient glow that follows the cursor on hover. Built for high-performance and a premium tactile feel.",
    details: [
      "Built with Framer Motion for highly optimized GPU-accelerated glow tracking.",
      "Reactive spotlight effect tracking user's cursor position.",
      "Minimalist, modern, and clean design.",
      "Fully reusable and accepts all standard HTML button props.",
    ],
    codes: {
      next: 'import { CursorGlowButton } from "@/components/ui/cursor-glow-button";\n\nexport default function Example() {\n  return <CursorGlowButton>Hover over me!</CursorGlowButton>;\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add cursor-glow-button'.",
      "Import: 'import { CursorGlowButton } from \"@/components/ui/cursor-glow-button\";'",
      "Customization: Adjust the 'glowColor', 'glowSize', and 'glowOpacity' props to match your theme.",
    ],
  },
  {
    id: 102,

    title: "Dynamic Form System",
    type: "Form",
    slug: "dynamic-form",
    category: "form",
    description:
      "A production-ready, enterprise-grade form system for React + TypeScript. Powered by React Hook Form and Zod, it supports dynamic field generation from configuration objects, automatic validation, complex conditional rendering, multi-step wizards, custom field injection, auto-save state, and multiple premium SaaS design variants.",
    details: [
      "Dynamic field generation: Render standard inputs, password eyes, OTP grids, autocomplete comboboxes, rich file uploads, multi-selects, switches, and custom fields from simple configurations.",
      "Zod Schema Builder: Automatically constructs an optimized Zod validation schema on the fly, or allows developers to supply their own Zod schema.",
      "Premium Styling Variants: Out-of-the-box support for seven aesthetic variants (modern, minimal, glass, outline, elevated, dark, compact) using a strict 4px spacing system.",
      "Asynchronous API Submission: Built-in endpoint integration with automated loading triggers, success alerts, and error feedback callbacks.",
      "Step Stepper / Wizard Flow: Group fields into multi-step form sequences with independent validations per step.",
      "Autosave Feature: Option to persist form progress securely in localStorage with custom debounced timing.",
      "Conditional Fields: Clean visibility triggers that evaluate dependencies based on live form values."
    ],
    codes: {
      next: 'import { DynamicForm, FieldConfig } from "@/components/ui/dynamic-form";\nimport { Mail, Lock, User } from "lucide-react";\n\nconst fields: FieldConfig[] = [\n  {\n    name: "name",\n    type: "text",\n    label: "Full Name",\n    placeholder: "Enter your full name",\n    required: true,\n    icon: User,\n    colSpan: 1\n  },\n  {\n    name: "email",\n    type: "email",\n    label: "Email Address",\n    placeholder: "you@example.com",\n    required: true,\n    icon: Mail,\n    colSpan: 1\n  },\n  {\n    name: "password",\n    type: "password",\n    label: "Password",\n    placeholder: "••••••••",\n    required: true,\n    icon: Lock,\n    colSpan: 1\n  },\n  {\n    name: "role",\n    type: "select",\n    label: "Role",\n    required: true,\n    options: [\n      { label: "Developer", value: "dev" },\n      { label: "Designer", value: "design" }\n    ],\n    colSpan: 1\n  },\n  {\n    name: "notifications",\n    type: "switch",\n    label: "Enable push notifications",\n    defaultValue: true,\n    colSpan: "full"\n  }\n];\n\nexport default function Example() {\n  return (\n    <div className="max-w-md w-full mx-auto p-6 bg-card border rounded-2xl shadow-sm">\n      <h2 className="text-xl font-bold mb-4">Create Account</h2>\n      <DynamicForm\n        variant="modern"\n        fields={fields}\n        submitButtonText="Sign Up"\n        onSubmit={(data) => console.log("Submitted:", data)}\n      />\n    </div>\n  );\n}'
    },
    usage: [
      "Install: Run 'npx futureuikit add dynamic-form' to add the form system component and its package dependencies.",
      "Import: 'import { DynamicForm, FieldConfig } from \"@/components/ui/dynamic-form\";'",
      "Fields Config: Define an array of 'FieldConfig' objects specifying 'name', 'type', 'label', 'required', and validation constraints.",
      "Variants: Toggle between 'minimal', 'modern', 'glass', 'outline', 'elevated', 'dark', and 'compact' to match your page aesthetics.",
      "Steppers & Wizards: Group fields into multi-step paths by passing the 'steps' prop with grouped fieldNames.",
      "API Callbacks: Configure direct form submissions by setting the 'api' prop with an endpoint URL, and handle responses via 'onSuccess' and 'onError' callbacks."
    ]
  },
  {
    id: 103,
    title: "Dock Navigation",
    type: "Navigation",
    slug: "dock",
    category: "ui",
    description:
      "A fully reusable, production-grade Dock Style Navigation Component inspired by the macOS dock interaction system. Features smooth cinematic motion, fluid hover scaling, and clean architecture.",
    details: [
      "Built with Framer Motion for premium physics-based scaling.",
      "Cinematic wave effect that scales nearby items based on cursor proximity.",
      "Supports both internal Next.js routing and external links.",
      "Includes Classic macOS style and Divided Dock variants.",
      "Fully responsive and gracefully handles mobile touch interactions.",
      "Extensively customizable physics, gaps, sizes, and colors.",
    ],
    codes: {
      next: 'import { Dock, DockItem, DockDivider } from "@/components/ui/dock";\nimport { Home, Search, Settings, User } from "lucide-react";\n\nexport default function Example() {\n  return (\n    <Dock>\n      <DockItem label="Home" href="/">\n        <Home size={20} />\n      </DockItem>\n      <DockItem label="Search" href="/search">\n        <Search size={20} />\n      </DockItem>\n      <DockDivider />\n      <DockItem label="Profile" href="/profile">\n        <User size={20} />\n      </DockItem>\n      <DockItem label="Settings" onClick={() => alert("Settings")}>\n        <Settings size={20} />\n      </DockItem>\n    </Dock>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add dock' to add the dock component and Framer Motion dependency.",
      "Import: 'import { Dock, DockItem, DockDivider } from \"@/components/ui/dock\";'",
      "Setup: Wrap your items in the '<Dock>' provider container.",
      "Variants: Pass 'variant=\"modern\"' (default), '\"clean\"', or '\"interactive\"' to <Dock> to change its style and physics.",
      "Items: Use '<DockItem>' for individual links or buttons. Pass 'label' for tooltips and 'href' for links.",
      "Dividers: Insert '<DockDivider />' anywhere in the list for separated sections.",
      "Controls: Tweak 'magnification' and 'distance' props on the main Dock component.",
    ],
  },
  {
    id: 104,
    title: "Drawer",
    type: "Overlay",
    slug: "drawer",
    category: "ui",
    description: "A fully reusable, accessible Drawer component inspired by iOS design patterns. It features focus trapping, scroll locking, and smooth Framer Motion animations. Built as a compound component for maximum flexibility.",
    details: [
      "Compound architecture: Drawer, Trigger, Content, Header, Title, Description, Body, Footer, and Close.",
      "Five variants: Default, Floating, Glass, Compact, and Elevated.",
      "Four placements: Left, Right, Top, and Bottom.",
      "Accessible by default: Handles focus trapping, escape key to close, and scroll locking.",
      "Smooth, physics-based animations using Framer Motion.",
      "Clean, modern aesthetic utilizing a 4px spacing system."
    ],
    codes: {
      next: 'import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose } from "@/components/ui/drawer";\nimport { Button } from "@/components/ui/button";\n\nexport default function Example() {\n  return (\n    <Drawer placement="right" variant="floating">\n      <DrawerTrigger asChild>\n        <Button>Open Drawer</Button>\n      </DrawerTrigger>\n      <DrawerContent>\n        <DrawerHeader>\n          <DrawerTitle>Settings</DrawerTitle>\n          <DrawerDescription>Manage your preferences.</DrawerDescription>\n        </DrawerHeader>\n        <DrawerBody>\n          <div className="space-y-4">\n            <p>Profile configuration</p>\n            <p>Notifications</p>\n          </div>\n        </DrawerBody>\n        <DrawerFooter>\n          <DrawerClose asChild>\n            <Button variant="outline">Cancel</Button>\n          </DrawerClose>\n          <Button>Save Changes</Button>\n        </DrawerFooter>\n      </DrawerContent>\n    </Drawer>\n  );\n}'
    },
    usage: [
      "Overview: A fully reusable, accessible Drawer component inspired by iOS design patterns. It features focus trapping, scroll locking, and smooth Framer Motion animations.",
      "Installation: Run 'npx futureuikit add drawer' to add the drawer component to your project.",
      "Basic Usage: Import the components from '@/components/ui/drawer' and wrap your UI in the <Drawer> component. Use <DrawerTrigger> to open it and <DrawerContent> for the payload.",
      "Variants: Pass the 'variant' prop to <Drawer> to choose between 'default', 'floating', 'glass', 'compact', and 'elevated' aesthetics.",
      "Placements: Control the slide-in direction by passing the 'placement' prop ('left', 'right', 'top', 'bottom') to the <Drawer> component.",
      "Accessibility: The drawer handles focus trapping, scroll locking, and Escape key functionality automatically to meet ARIA guidelines.",
      "Best Practices: Use the 'elevated' variant for dashboard settings, 'floating' for quick actions, and 'glass' over complex backgrounds.",
      "API Reference: The <Drawer> accepts 'isOpen' and 'onOpenChange' for controlled state, and 'defaultIsOpen' for uncontrolled state.",
      "Examples: Check the live preview above to experiment with all variant and placement combinations interactively."
    ]
  },
  {
    id: 105,
    title: "Toggle",
    type: "Form",
    slug: "toggle",
    category: "form",
    description: "A fully reusable, clean, and futuristic Toggle component inspired by premium operating systems. It features physics-based thumb animations, multiple visual variants, responsive sizes, and robust accessibility.",
    details: [
      "Built with Framer Motion for premium, physics-based thumb animations.",
      "Eight visual variants: Default, Soft, Elevated, Glass, Modern, Enterprise, Neon, and Scenic.",
      "Four sizes (sm, md, lg, xl) and four shapes (rounded, pill, squircle, square).",
      "Robust state support: Hover, Focus, Active, Disabled, Loading, and Read Only.",
      "Icon support: Seamlessly swap checked and unchecked icons with cross-fading.",
      "Scenic support: Automatically cross-fades checkedImage and uncheckedImage backgrounds.",
      "Fully accessible with proper ARIA roles, keyboard navigation, and focus rings."
    ],
    codes: {
      next: 'import { Toggle } from "@/components/ui/toggle";\nimport { Check, X } from "lucide-react";\n\nexport default function Example() {\n  return (\n    <div className="flex flex-col gap-6">\n      <Toggle \n        label="Enable Notifications" \n        description="Receive updates on your account." \n        variant="glass" \n      />\n      <Toggle \n        label="Auto Save" \n        checkedIcon={<Check />} \n        uncheckedIcon={<X />} \n        defaultChecked \n      />\n    </div>\n  );\n}'
    },
    usage: [
      "Overview: A premium Toggle component designed for modern, high-end interfaces. It uses Framer Motion for natural thumb interactions and CVA for extensive visual configuration.",
      "Installation: Run 'npx futureuikit add toggle' to add the toggle component to your project.",
      "Usage: Import the component from '@/components/ui/toggle' and render it. Pass 'label' or 'description' props to automatically render an accessible label layout.",
      "Controlled Usage: Use the 'checked' and 'onCheckedChange' props to manage the toggle's state from a parent component.",
      "Uncontrolled Usage: Provide a 'defaultChecked' prop to let the component manage its own internal state.",
      "Sizes: Adjust the component's scale by passing the 'size' prop ('sm', 'md', 'lg', 'xl').",
      "Variants: Use the 'variant' prop ('default', 'soft', 'elevated', 'glass', 'modern', 'enterprise', 'neon', 'scenic') to match your application's aesthetic.",
      "Shapes: Pass the 'shape' prop ('rounded', 'pill', 'squircle', 'square') to control the corner radiuses of both the track and thumb.",
      "Accessibility: The toggle automatically implements standard ARIA attributes and keyboard controls. Always provide a 'label' prop for screen readers.",
      "Best Practices: Use the 'loading' prop during async operations to show a spinner. Avoid excessive 'neon' variants in standard forms.",
      "API Reference: The component extends all standard HTMLButtonElement attributes. See the source file for the complete type definition."
    ]
  },
  {
    id: 106,
    title: "Modal",
    type: "Overlay",
    slug: "modal",
    category: "ui",
    description: "A highly polished, enterprise-ready Modal component powered by Radix UI and Framer Motion. It supports multiple sizes, screen positions, visual variants, and ensures absolute accessibility out of the box.",
    details: [
      "Compound architecture: Modal, Trigger, Content, Header, Title, Description, Body, Footer, and Close.",
      "Six visual variants: Default, Floating, Glass, Elevated, Minimal, and Spotlight.",
      "Seven sizes: xs, sm, md, lg, xl, full-width, and full-screen.",
      "Five positions: Center, Top Center, Bottom Sheet, Left Side, and Right Side.",
      "Flawless accessibility: Focus trapping, Escape key to close, Scroll locking, and ARIA roles.",
      "Smooth physics-based animations that automatically adapt to the chosen position."
    ],
    codes: {
      next: 'import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";\nimport { Button } from "@/components/ui/button";\n\nexport default function Example() {\n  return (\n    <Modal variant="glass" size="md" position="center">\n      <ModalTrigger asChild>\n        <Button>Open Modal</Button>\n      </ModalTrigger>\n      <ModalContent>\n        <ModalHeader>\n          <ModalTitle>Account Settings</ModalTitle>\n          <ModalDescription>Manage your premium subscription.</ModalDescription>\n        </ModalHeader>\n        <ModalBody>\n          <div className="space-y-4">\n            <p>Your subscription is active until next year.</p>\n          </div>\n        </ModalBody>\n        <ModalFooter>\n          <ModalClose asChild>\n            <Button variant="outline">Close</Button>\n          </ModalClose>\n          <Button>Upgrade Plan</Button>\n        </ModalFooter>\n      </ModalContent>\n    </Modal>\n  );\n}'
    },
    usage: [
      "Overview: A premium, accessible Modal system designed for modern SaaS applications. Combines Radix UI's bulletproof Dialog primitive with Framer Motion's elegant animations.",
      "Installation: Run 'npx futureuikit add modal' to install the modal component.",
      "Basic Usage: Wrap your UI with the <Modal> component. Use <ModalTrigger asChild> for the launch button and <ModalContent> for the payload.",
      "Controlled Usage: Pass 'open' and 'onOpenChange' to <Modal> to manage the state via React state.",
      "Uncontrolled Usage: By default, the Modal manages its own state internally.",
      "Variants: Use the 'variant' prop ('default', 'floating', 'glass', 'elevated', 'minimal', 'spotlight') to change the backdrop and content styling.",
      "Sizes: Use the 'size' prop ('xs', 'sm', 'md', 'lg', 'xl', 'full-width', 'full-screen') to adjust the modal's maximum width.",
      "Positions: Use the 'position' prop ('center', 'top-center', 'bottom-sheet', 'left-side', 'right-side') to control where the modal appears and how it animates in.",
      "Accessibility: The modal automatically handles focus trapping, scroll locking, and Escape key functionality.",
      "Best Practices: Use the 'bottom-sheet' position for mobile-first interactions, and 'glass' variant for highly visual interfaces."
    ]
  },
  {
    id: 107,
    title: "Command Palette",
    type: "Navigation",
    slug: "command-palette",
    category: "ui",
    description: "A highly performant, accessible Command Palette component inspired by Linear and Raycast. Features fuzzy search, keyboard navigation, nested commands, and premium design variants.",
    details: [
      "Compound architecture: CommandPalette, Input, List, Group, Item, Empty, Separator, and Shortcut.",
      "Powered by cmdk for flawless, native-feeling keyboard interactions and fuzzy search.",
      "Five premium visual variants: Default, Compact, Floating, Glass, and Spotlight.",
      "Out-of-the-box support for Cmd+K / Ctrl+K keyboard shortcuts.",
      "Fully accessible with automatic focus trapping and ARIA roles."
    ],
    codes: {
      next: 'import { \n  CommandPalette, \n  CommandInput, \n  CommandList, \n  CommandEmpty, \n  CommandGroup, \n  CommandItem, \n  CommandSeparator, \n  CommandShortcut \n} from "@/components/ui/command-palette";\nimport { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";\nimport React from "react";\n\nexport default function Example() {\n  const [open, setOpen] = React.useState(false);\n\n  React.useEffect(() => {\n    const down = (e: KeyboardEvent) => {\n      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {\n        e.preventDefault();\n        setOpen((open) => !open);\n      }\n    };\n    document.addEventListener("keydown", down);\n    return () => document.removeEventListener("keydown", down);\n  }, []);\n\n  return (\n    <CommandPalette open={open} onOpenChange={setOpen} variant="spotlight">\n      <CommandInput placeholder="Type a command or search..." />\n      <CommandList>\n        <CommandEmpty>No results found.</CommandEmpty>\n        <CommandGroup heading="Suggestions">\n          <CommandItem>\n            <Calendar className="mr-2 h-4 w-4" />\n            <span>Calendar</span>\n          </CommandItem>\n          <CommandItem>\n            <Smile className="mr-2 h-4 w-4" />\n            <span>Search Emoji</span>\n          </CommandItem>\n          <CommandItem>\n            <Calculator className="mr-2 h-4 w-4" />\n            <span>Calculator</span>\n          </CommandItem>\n        </CommandGroup>\n        <CommandSeparator />\n        <CommandGroup heading="Settings">\n          <CommandItem>\n            <User className="mr-2 h-4 w-4" />\n            <span>Profile</span>\n            <CommandShortcut>⌘P</CommandShortcut>\n          </CommandItem>\n          <CommandItem>\n            <CreditCard className="mr-2 h-4 w-4" />\n            <span>Billing</span>\n            <CommandShortcut>⌘B</CommandShortcut>\n          </CommandItem>\n          <CommandItem>\n            <Settings className="mr-2 h-4 w-4" />\n            <span>Settings</span>\n            <CommandShortcut>⌘S</CommandShortcut>\n          </CommandItem>\n        </CommandGroup>\n      </CommandList>\n    </CommandPalette>\n  );\n}'
    },
    usage: [
      "Install: Run 'npx futureuikit add command-palette'.",
      "Overview: The Command Palette is built on top of 'cmdk' (the industry standard headless command menu library). It provides extremely fast, fuzzy search navigation.",
    ],
  },
  {
    id: 108,
    title: "Select / Combobox",
    type: "Form",
    slug: "select",
    category: "form",
    description: "A fully reusable, accessible Select and Combobox component with search, multi-select, and virtualization support.",
    details: [
      "Built on top of Radix UI Popover and cmdk.",
      "Supports searchable, multi-select dropdowns.",
      "Includes virtualization for handling thousands of items.",
      "Accessible with keyboard navigation and ARIA roles."
    ],
    codes: {
      next: 'import { Select, SelectTrigger, SelectContent, SelectSearch, SelectList, SelectGroup, SelectItem } from "@/components/ui/select";\n\nexport default function Example() {\n  return (\n    <Select>\n      <SelectTrigger placeholder="Select an option..." />\n      <SelectContent>\n        <SelectSearch placeholder="Search options..." />\n        <SelectList>\n          <SelectGroup heading="Options">\n            <SelectItem value="1">Option 1</SelectItem>\n            <SelectItem value="2">Option 2</SelectItem>\n            <SelectItem value="3">Option 3</SelectItem>\n          </SelectGroup>\n        </SelectList>\n      </SelectContent>\n    </Select>\n  );\n}'
    },
    usage: [
      "Overview: The Select component is built on top of Radix UI Popover and cmdk to provide an extremely robust, searchable, multi-select capable dropdown.",
      "Installation: Run 'npx futureuikit add select' to install the component and its dependencies.",
      "Multi-Select: Simply pass the 'multiSelect={true}' prop to <Select> to enable multiple selections. The trigger will automatically render selections as removable tags.",
      "Search: Enabled by default. Pass 'searchable={false}' to <Select> to hide the search input.",
      "Virtualization: For thousands of items, wrap your options in <SelectVirtualizer> and pass the items and renderItem function."
    ]
  },
  {
    id: 109,
    title: "File Upload",
    type: "Form",
    slug: "file-upload",
    category: "form",
    description: "A fully reusable, premium file upload component with drag-and-drop, validation, and real-time upload progress previews.",
    details: [
      "Built natively using standard HTML5 drag-and-drop events.",
      "Generates rich thumbnails for images and videos automatically.",
      "Compound component architecture (FileUpload, Dropzone, Preview, Progress).",
      "Handles validation rules like max files, size limits, and MIME type restrictions.",
      "Smooth, physics-based state transitions powered by Framer Motion.",
    ],
    codes: {
      next: 'import { FileUpload, UploadDropzone, UploadPreview, UploadProgress } from "@/components/ui/file-upload";\n\nexport default function Example() {\n  return (\n    <FileUpload\n      variant="default"\n      maxFiles={3}\n      maxSize={5 * 1024 * 1024} // 5MB\n      accept={{\n        "image/*": [".png", ".jpg", ".jpeg"],\n      }}\n      onUpload={(files) => console.log("Uploading:", files)}\n    >\n      <UploadDropzone title="Drag images here" />\n      <UploadPreview />\n      <UploadProgress />\n    </FileUpload>\n  );\n}'
    },
    usage: [
      "Overview: A powerful compound File Upload component allowing users to drag and drop or browse for files.",
      "Installation: Run 'npx futureuikit add file-upload' to add it to your project.",
      "Validation: Pass 'maxSize' (in bytes), 'maxFiles', and an 'accept' map to restrict uploads.",
      "Handling Uploads: Provide an 'onUpload' callback which fires automatically with a list of valid files ready for submission.",
      "Variants: The <FileUpload> root accepts 'variant' with values: 'default', 'compact', 'card', 'glass', 'minimal'.",
      "Progress: In a real app, update the internal progress state via the 'onFilesChange' hook to visualize upload metrics.",
    ]
  },
  {
    id: 112,
    title: "Automotive Carousel",
    type: "Carousel",
    slug: "automotive-carousel",
    category: "ui",
    description: "A high-end, cinematic 3D carousel specifically designed for automotive showcases. It features a responsive camera rig that navigates through the car's interior and exterior with premium damping and ultra-wide angles.",
    details: [
      "Dynamic 3D camera navigation between exterior and interior views.",
      "Strict interior-to-interior pathing to prevent roof sweeping.",
      "Responsive FOV (up to 110°) and fluid annotation scaling.",
      "Anti-overlap pointer logic for clear detail labeling.",
      "Supports GLB models (M4, Car, Bike, etc.) with auto-fitting.",
    ],
    codes: {
      next: 'import { AutomotiveCarousel } from "@/components/ui/automotive-carousel";\n\nexport default function Example() {\n  const slides = [\n    { id: 1, title: "EXTERIOR", description: "Sleek aerodynamic design.", annotations: [] },\n    { id: 2, title: "INTERIOR", description: "Premium luxury dashboard.", annotations: [{ id: "gear", position: [0.1, 0.5, 0.2], label: "Gear Shift" }] },\n  ];\n\n  return (\n    <div className="w-full h-screen">\n      <AutomotiveCarousel slides={slides} objectVariant="m4" />\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run \'npx futureuikit add automotive-carousel\'.",
      "Ensure your .glb models are in the /public/models/ folder.",
      "Import: \'import { AutomotiveCarousel } from \"@/components/ui/automotive-carousel\";\'",
      "Pass an array of slides with optional 3D annotation coordinates.",
    ],
  },
  {
    id: 110,
    title: "Form Builder",
    type: "Form",
    slug: "form-builder",
    category: "form",
    description: "A highly advanced, fully declarative schema-driven Form Builder with support for conditional fields, arrays, and nested groups.",
    details: [
      "Powered by react-hook-form and Zod validation.",
      "Dynamic field rendering based on strict schema typing.",
      "Built-in support for nested groups and repeatable array items.",
      "Includes Auto, Single, Two, and Three column responsive grid layouts.",
      "Condition evaluation allowing fields to display dynamically based on sibling values.",
    ],
    codes: {
      next: 'import { FormBuilder } from "@/components/ui/form-builder";\n\nexport default function Example() {\n  return (\n    <FormBuilder\n      schema={[\n        { name: "name", type: "text", label: "Name", required: true },\n        { name: "emails", type: "array", label: "Emails", fields: [\n           { name: "address", type: "email", label: "Email Address" }\n        ]}\n      ]}\n      onSubmit={(data) => console.log(data)}\n    />\n  );\n}'
    },
    usage: [
      "Overview: The FormBuilder allows generating complex, validated forms strictly from a JSON-like schema array.",
      "Installation: Run 'npx futureuikit add form-builder' to add it to your project.",
      "Schema Configuration: Pass an array of 'SchemaField' objects to the 'schema' prop.",
      "Validation: Zod schemas are automatically generated. Custom logic can be supplied via the 'validation.custom' callback.",
      "Conditional Fields: Provide a 'showIf: (values) => boolean' callback on any schema field to handle dynamic visibility.",
      "Arrays and Groups: Set type='array' or type='group' and supply a nested 'fields' array to deeply nest inputs.",
    ]
  }

  ,
  {
    id: 111,
    title: "Kanban Board",
    type: "Board",
    slug: "kanban",
    category: "layout",
    description: "A highly performant, zero-dependency Native HTML5 drag-and-drop Kanban Board inspired by modern project management tools like Linear.",
    details: [
      "Zero heavy dependencies, utilizes pure native HTML5 drag and drop events.",
      "Smooth drop-zone animations using framer-motion principles.",
      "Supports reordering columns horizontally and cards vertically between columns.",
      "Compound architecture consisting of <KanbanBoard>, <KanbanColumn>, and <KanbanCard>.",
      "Includes variants: Default, Compact, Enterprise, and Minimal.",
    ],
    codes: {
      next: 'import { KanbanBoard, KanbanColumn, KanbanCard } from "@/components/ui/kanban";\n\nexport default function Example() {\n  return (\n    <KanbanBoard onDragEnd={({ type, activeId, overId }) => console.log(type, activeId, overId)}>\n      <KanbanColumn id="todo" title="To Do">\n        <KanbanCard id="card1" columnId="todo" title="Implement Drag & Drop" />\n      </KanbanColumn>\n      <KanbanColumn id="done" title="Done">\n        <KanbanCard id="card2" columnId="done" title="Setup project" />\n      </KanbanColumn>\n    </KanbanBoard>\n  );\n}'
    },
    usage: [
      "Overview: A powerful layout component for managing workflow states via drag and drop.",
      "Installation: Run 'npx futureuikit add kanban' to add it to your project.",
      "Drag and Drop: Listen to the 'onDragEnd' event on the <KanbanBoard> to update your state.",
      "Cards: The <KanbanCard> supports rich meta like assignees, due dates, labels, and priority indicators.",
      "Columns: The <KanbanColumn> serves as both a droppable area for cards and a draggable entity itself.",
    ]
  },
  {
    id: 42,
    title: 'Workflow Builder',
    type: 'Board',
    slug: 'workflow-builder',
    category: 'data-display',
    description: 'A fully reusable, highly customizable, production-ready Workflow Builder component inspired by n8n, Zapier, and Langflow. Features infinite canvas, zoom/pan, custom nodes, bezier edge rendering, and full drag-and-drop support out of the box with zero heavy third-party canvas dependencies.',
    details: [
      'Bespoke Infinite Canvas with native Zoom and Pan controls via CSS transforms.',
      'SVG-based edge rendering using smooth bezier curves.',
      'Framer Motion powered node dragging and interaction.',
      'Integrated MiniMap and Toolbar components.',
      'Out-of-the-box state management for adding nodes and connecting edges.',
      'Support for custom node types via the nodeTypes prop.',
      'Keyboard accessibility (Delete/Backspace to remove selected nodes/edges).',
      'Multiple visual variants: Default, Enterprise, Minimal, Glass, Compact.'
    ],
    codes: {
      next: 'import { WorkflowBuilder } from "@/components/ui/workflow-builder";\n\nexport default function Example() {\n  return (\n    <div className="w-full h-[600px]">\n      <WorkflowBuilder \n        variant="enterprise" \n        initialNodes={[\n          { id: "1", type: "trigger", position: { x: 100, y: 200 }, data: { label: "Webhook" } },\n          { id: "2", type: "agent", position: { x: 500, y: 200 }, data: { label: "AI Processor" } }\n        ]}\n        initialEdges={[\n          { id: "e1-2", source: "1", target: "2", animated: true }\n        ]}\n      />\n    </div>\n  );\n}'
    },
    usage: [
      'Installation: Run npx futureuikit add workflow-builder',
      'Context: Wrap your custom nodes inside the builder. It automatically provides the Context for Zooming and Panning.',
      'Custom Nodes: Pass an object mapping string types to React components via the nodeTypes prop.',
      'Variants: Toggle between enterprise, minimal, glass, etc., via the variant prop.'
    ]
  },
  {
    id: 43,
    title: 'Rich Text Editor',
    type: 'Form',
    slug: 'rich-text-editor',
    category: 'data-input',
    description: 'A fully reusable, highly customizable, production-ready Rich Text Editor component inspired by Notion and Linear. Features slash commands, markdown support, bubble menus, and rich formatting powered by Tiptap.',
    details: [
      'Slash Commands (type "/" to open formatting menu).',
      'Bubble Menu for quick formatting of selected text.',
      'Markdown shortcuts (e.g., "# " for H1, "- " for bullet list).',
      'Support for Tables, Images, Task Lists, Quotes, and Code Blocks.',
      'Fully customizable Toolbar and Extensions.',
      'Multiple visual variants: Default, Minimal, Writing, Enterprise, Glass.'
    ],
    codes: {
      next: 'import { RichTextEditor } from "@/components/ui/rich-text-editor";\n\nexport default function Example() {\n  return (\n    <div className="w-full max-w-3xl mx-auto h-[500px]">\n      <RichTextEditor \n        variant="default" \n        content="<h1>Welcome</h1><p>Type / for commands</p>"\n      />\n    </div>\n  );\n}'
    },
    usage: [
      'Installation: Run npx futureuikit add rich-text-editor',
      'Usage: Use the <RichTextEditor /> component as a drop-in replacement for standard textareas.',
      'Customization: Pass custom Tiptap extensions via the extensions prop.'
    ]
  },
  {
    id: 44,
    title: 'AI Chat Interface',
    type: 'Application',
    slug: 'ai-chat',
    category: 'application-ui',
    description: 'A fully reusable, highly customizable AI Chat Interface inspired by ChatGPT, Claude, and Perplexity. Features streaming responses, markdown rendering, syntax highlighting, and multiple premium layouts.',
    details: [
      'Multi-modal support with file and image uploads.',
      'Supports streaming messages with typing indicators.',
      'Markdown rendering powered by react-markdown and syntax highlighting.',
      'Fully customizable layouts (ChatGPT, Claude, Perplexity, Compact, Enterprise).',
      'Fully customizable input variants (Standard, Floating, Command, Multi-line).',
      'Built-in message actions (Copy, Regenerate, Edit, Upvote/Downvote).',
      'Prompt suggestions and workspace sidebars.'
    ],
    codes: {
      next: 'import { AIChat, ChatMessages, ChatInput, ChatPromptSuggestions } from "@/components/ui/ai-chat";\n\nexport default function Example() {\n  return (\n    <AIChat messages={[]} input="" setInput={() => {}} onSubmit={() => {}}>\n      <ChatMessages />\n      <ChatPromptSuggestions suggestions={["Write a poem", "Explain quantum computing"]} />\n      <ChatInput />\n    </AIChat>\n  );\n}'
    },
    usage: [
      'Installation: Run npx futureuikit add ai-chat',
      'Usage: Use the <AIChat /> context provider to wrap chat subcomponents like <ChatMessages /> and <ChatInput />.',
      'Customization: Switch layouts using the layout prop and input styles via inputVariant.'
    ]
  },
  {
    id: 993,
    title: "Header",
    type: "Navigation",
    slug: "header",
    category: "layout",
    isNew: true,
    description: "A premium, responsive navigation header built with Framer Motion, featuring a desktop navigation bar and a left-side sliding drawer for mobile devices.",
    details: [
      "Responsive design with a hidden mobile drawer.",
      "Backdrop blur and premium styling.",
      "Framer Motion animations for smooth transitions.",
      "Built-in theme toggle and search input."
    ],
    codes: {
      next: 'import { Header } from "@/components/ui/header";\n\nexport default function Layout({ children }) {\n  return (\n    <>\n      <Header />\n      <main>{children}</main>\n    </>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add header'.",
      "Dependencies: Requires framer-motion, lucide-react, and existing button/search-input components.",
      "Usage: Place at the top of your layout for persistent navigation.",
    ],
  },
  {
    id: 109,
    title: "File Upload",
    type: "Form",
    slug: "file-upload",
    category: "form",
    description: "A fully reusable, premium file upload component with drag-and-drop, validation, and real-time upload progress previews.",
    details: [
      "Built natively using standard HTML5 drag-and-drop events.",
      "Generates rich thumbnails for images and videos automatically.",
      "Compound component architecture (FileUpload, Dropzone, Preview, Progress).",
      "Handles validation rules like max files, size limits, and MIME type restrictions.",
      "Smooth, physics-based state transitions powered by Framer Motion.",
    ],
    codes: {
      next: 'import { FileUpload, UploadDropzone, UploadPreview, UploadProgress } from "@/components/ui/file-upload";\n\nexport default function Example() {\n  return (\n    <FileUpload\n      variant="default"\n      maxFiles={3}\n      maxSize={5 * 1024 * 1024} // 5MB\n      accept={{\n        "image/*": [".png", ".jpg", ".jpeg"],\n      }}\n      onUpload={(files) => console.log("Uploading:", files)}\n    >\n      <UploadDropzone title="Drag images here" />\n      <UploadPreview />\n      <UploadProgress />\n    </FileUpload>\n  );\n}'
    },
    usage: [
      "Overview: A powerful compound File Upload component allowing users to drag and drop or browse for files.",
      "Installation: Run 'npx futureuikit add file-upload' to add it to your project.",
      "Validation: Pass 'maxSize' (in bytes), 'maxFiles', and an 'accept' map to restrict uploads.",
      "Handling Uploads: Provide an 'onUpload' callback which fires automatically with a list of valid files ready for submission.",
      "Variants: The <FileUpload> root accepts 'variant' with values: 'default', 'compact', 'card', 'glass', 'minimal'.",
      "Progress: In a real app, update the internal progress state via the 'onFilesChange' hook to visualize upload metrics.",
    ]
  },
  {
    id: 112,
    title: "Automotive Carousel",
    type: "Carousel",
    slug: "automotive-carousel",
    category: "ui",
    description: "A high-end, cinematic 3D carousel specifically designed for automotive showcases. It features a responsive camera rig that navigates through the car's interior and exterior with premium damping and ultra-wide angles.",
    details: [
      "Dynamic 3D camera navigation between exterior and interior views.",
      "Strict interior-to-interior pathing to prevent roof sweeping.",
      "Responsive FOV (up to 110°) and fluid annotation scaling.",
      "Anti-overlap pointer logic for clear detail labeling.",
      "Supports GLB models (M4, Car, Bike, etc.) with auto-fitting.",
    ],
    codes: {
      next: 'import { AutomotiveCarousel } from "@/components/ui/automotive-carousel";\n\nexport default function Example() {\n  const slides = [\n    { id: 1, title: "EXTERIOR", description: "Sleek aerodynamic design.", annotations: [] },\n    { id: 2, title: "INTERIOR", description: "Premium luxury dashboard.", annotations: [{ id: "gear", position: [0.1, 0.5, 0.2], label: "Gear Shift" }] },\n  ];\n\n  return (\n    <div className="w-full h-screen">\n      <AutomotiveCarousel slides={slides} objectVariant="m4" />\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run \'npx futureuikit add automotive-carousel\'.",
      "Ensure your .glb models are in the /public/models/ folder.",
      "Import: \'import { AutomotiveCarousel } from \"@/components/ui/automotive-carousel\";\'",
      "Pass an array of slides with optional 3D annotation coordinates.",
    ],
  },
  {
    id: 110,
    title: "Form Builder",
    type: "Form",
    slug: "form-builder",
    category: "form",
    description: "A highly advanced, fully declarative schema-driven Form Builder with support for conditional fields, arrays, and nested groups.",
    details: [
      "Powered by react-hook-form and Zod validation.",
      "Dynamic field rendering based on strict schema typing.",
      "Built-in support for nested groups and repeatable array items.",
      "Includes Auto, Single, Two, and Three column responsive grid layouts.",
      "Condition evaluation allowing fields to display dynamically based on sibling values.",
    ],
    codes: {
      next: 'import { FormBuilder } from "@/components/ui/form-builder";\n\nexport default function Example() {\n  return (\n    <FormBuilder\n      schema={[\n        { name: "name", type: "text", label: "Name", required: true },\n        { name: "emails", type: "array", label: "Emails", fields: [\n           { name: "address", type: "email", label: "Email Address" }\n        ]}\n      ]}\n      onSubmit={(data) => console.log(data)}\n    />\n  );\n}'
    },
    usage: [
      "Overview: The FormBuilder allows generating complex, validated forms strictly from a JSON-like schema array.",
      "Installation: Run 'npx futureuikit add form-builder' to add it to your project.",
      "Schema Configuration: Pass an array of 'SchemaField' objects to the 'schema' prop.",
      "Validation: Zod schemas are automatically generated. Custom logic can be supplied via the 'validation.custom' callback.",
      "Conditional Fields: Provide a 'showIf: (values) => boolean' callback on any schema field to handle dynamic visibility.",
      "Arrays and Groups: Set type='array' or type='group' and supply a nested 'fields' array to deeply nest inputs.",
    ]
  }

  ,
  {
    id: 111,
    title: "Kanban Board",
    type: "Board",
    slug: "kanban",
    category: "layout",
    description: "A highly performant, zero-dependency Native HTML5 drag-and-drop Kanban Board inspired by modern project management tools like Linear.",
    details: [
      "Zero heavy dependencies, utilizes pure native HTML5 drag and drop events.",
      "Smooth drop-zone animations using framer-motion principles.",
      "Supports reordering columns horizontally and cards vertically between columns.",
      "Compound architecture consisting of <KanbanBoard>, <KanbanColumn>, and <KanbanCard>.",
      "Includes variants: Default, Compact, Enterprise, and Minimal.",
    ],
    codes: {
      next: 'import { KanbanBoard, KanbanColumn, KanbanCard } from "@/components/ui/kanban";\n\nexport default function Example() {\n  return (\n    <KanbanBoard onDragEnd={({ type, activeId, overId }) => console.log(type, activeId, overId)}>\n      <KanbanColumn id="todo" title="To Do">\n        <KanbanCard id="card1" columnId="todo" title="Implement Drag & Drop" />\n      </KanbanColumn>\n      <KanbanColumn id="done" title="Done">\n        <KanbanCard id="card2" columnId="done" title="Setup project" />\n      </KanbanColumn>\n    </KanbanBoard>\n  );\n}'
    },
    usage: [
      "Overview: A powerful layout component for managing workflow states via drag and drop.",
      "Installation: Run 'npx futureuikit add kanban' to add it to your project.",
      "Drag and Drop: Listen to the 'onDragEnd' event on the <KanbanBoard> to update your state.",
      "Cards: The <KanbanCard> supports rich meta like assignees, due dates, labels, and priority indicators.",
      "Columns: The <KanbanColumn> serves as both a droppable area for cards and a draggable entity itself.",
    ]
  },
  {
    id: 42,
    title: 'Workflow Builder',
    type: 'Board',
    slug: 'workflow-builder',
    category: 'data-display',
    description: 'A fully reusable, highly customizable, production-ready Workflow Builder component inspired by n8n, Zapier, and Langflow. Features infinite canvas, zoom/pan, custom nodes, bezier edge rendering, and full drag-and-drop support out of the box with zero heavy third-party canvas dependencies.',
    details: [
      'Bespoke Infinite Canvas with native Zoom and Pan controls via CSS transforms.',
      'SVG-based edge rendering using smooth bezier curves.',
      'Framer Motion powered node dragging and interaction.',
      'Integrated MiniMap and Toolbar components.',
      'Out-of-the-box state management for adding nodes and connecting edges.',
      'Support for custom node types via the nodeTypes prop.',
      'Keyboard accessibility (Delete/Backspace to remove selected nodes/edges).',
      'Multiple visual variants: Default, Enterprise, Minimal, Glass, Compact.'
    ],
    codes: {
      next: 'import { WorkflowBuilder } from "@/components/ui/workflow-builder";\n\nexport default function Example() {\n  return (\n    <div className="w-full h-[600px]">\n      <WorkflowBuilder \n        variant="enterprise" \n        initialNodes={[\n          { id: "1", type: "trigger", position: { x: 100, y: 200 }, data: { label: "Webhook" } },\n          { id: "2", type: "agent", position: { x: 500, y: 200 }, data: { label: "AI Processor" } }\n        ]}\n        initialEdges={[\n          { id: "e1-2", source: "1", target: "2", animated: true }\n        ]}\n      />\n    </div>\n  );'
    },
    usage: [
      'Installation: Run npx futureuikit add workflow-builder',
      'Context: Wrap your custom nodes inside the builder. It automatically provides the Context for Zooming and Panning.',
      'Custom Nodes: Pass an object mapping string types to React components via the nodeTypes prop.',
      'Variants: Toggle between enterprise, minimal, glass, etc., via the variant prop.'
    ]
  },
  {
    id: 43,
    title: 'Rich Text Editor',
    type: 'Form',
    slug: 'rich-text-editor',
    category: 'data-input',
    description: 'A fully reusable, highly customizable, production-ready Rich Text Editor component inspired by Notion and Linear. Features slash commands, markdown support, bubble menus, and rich formatting powered by Tiptap.',
    details: [
      'Slash Commands (type "/" to open formatting menu).',
      'Bubble Menu for quick formatting of selected text.',
      'Markdown shortcuts (e.g., "# " for H1, "- " for bullet list).',
      'Support for Tables, Images, Task Lists, Quotes, and Code Blocks.',
      'Fully customizable Toolbar and Extensions.',
      'Multiple visual variants: Default, Minimal, Writing, Enterprise, Glass.'
    ],
    codes: {
      next: 'import { RichTextEditor } from "@/components/ui/rich-text-editor";\n\nexport default function Example() {\n  return (\n    <div className="w-full max-w-3xl mx-auto h-[500px]">\n      <RichTextEditor \n        variant="default" \n        content="<h1>Welcome</h1><p>Type / for commands</p>"\n      />\n    </div>\n  );\n}'
    },
    usage: [
      'Installation: Run npx futureuikit add rich-text-editor',
      'Usage: Use the <RichTextEditor /> component as a drop-in replacement for standard textareas.',
      'Customization: Pass custom Tiptap extensions via the extensions prop.'
    ]
  },
  {
    id: 44,
    title: 'AI Chat Interface',
    type: 'Application',
    slug: 'ai-chat',
    category: 'application-ui',
    description: 'A fully reusable, highly customizable AI Chat Interface inspired by ChatGPT, Claude, and Perplexity. Features streaming responses, markdown rendering, syntax highlighting, and multiple premium layouts.',
    details: [
      'Multi-modal support with file and image uploads.',
      'Supports streaming messages with typing indicators.',
      'Markdown rendering powered by react-markdown and syntax highlighting.',
      'Fully customizable layouts (ChatGPT, Claude, Perplexity, Compact, Enterprise).',
      'Fully customizable input variants (Standard, Floating, Command, Multi-line).',
      'Built-in message actions (Copy, Regenerate, Edit, Upvote/Downvote).',
      'Prompt suggestions and workspace sidebars.'
    ],
    codes: {
      next: 'import { AIChat, ChatMessages, ChatInput, ChatPromptSuggestions } from "@/components/ui/ai-chat";\n\nexport default function Example() {\n  return (\n    <AIChat messages={[]} input="" setInput={() => {}} onSubmit={() => {}}>\n      <ChatMessages />\n      <ChatPromptSuggestions suggestions={["Write a poem", "Explain quantum computing"]} />\n      <ChatInput />\n    </AIChat>\n  );\n}'
    },
    usage: [
      'Installation: Run npx futureuikit add ai-chat',
      'Usage: Use the <AIChat /> context provider to wrap chat subcomponents like <ChatMessages /> and <ChatInput />.',
      'Customization: Switch layouts using the layout prop and input styles via inputVariant.'
    ]
  },
  {
    id: 993,
    title: "Header",
    type: "Navigation",
    slug: "header",
    category: "layout",
    isNew: true,
    description: "A premium, responsive navigation header built with Framer Motion, featuring a desktop navigation bar and a left-side sliding drawer for mobile devices.",
    details: [
      "Responsive design with a hidden mobile drawer.",
      "Backdrop blur and premium styling.",
      "Framer Motion animations for smooth transitions.",
      "Built-in theme toggle and search input."
    ],
    codes: {
      next: 'import { Header } from "@/components/ui/header";\n\nexport default function Layout({ children }) {\n  return (\n    <>\n      <Header />\n      <main>{children}</main>\n    </>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add header'.",
      "Dependencies: Requires framer-motion, lucide-react, and existing button/search-input components.",
      "Usage: Place at the top of your layout for persistent navigation.",
    ],
  },
  {
    id: 1001,
    title: "Search",
    type: "Forms",
    slug: "search",
    category: "ui",
    isNew: true,
    description: "A premium, fully reusable Search component primitive with smooth animations, advanced variants, and highly configurable API.",
    details: [
      "Cinematic width expansion and focus ring animations using Framer Motion.",
      "Multiple premium variants: standard, compact, floating, command, and icon-only.",
      "Highly configurable API (sizes, states, loading, clearable).",
      "Proper ARIA accessibility and keyboard shortcut management (Escape, Enter).",
    ],
    codes: {
      next: 'import { Search } from "@/components/ui/search";\n\nexport default function Example() {\n  return (\n    <div className="w-full max-w-sm">\n      <Search variant="floating" size="md" placeholder="Search..." clearable animated />\n    </div>\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add search'.",
      "Dependencies: Requires framer-motion and lucide-react.",
      "Usage: Use as a generic UI primitive anywhere you need search inputs.",
    ],
  },
  {
    id: 1002,
    title: "OTP Verification",
    type: "Forms",
    slug: "otp-verification",
    category: "ui",
    isNew: true,
    description: "A smooth, animated OTP (One-Time Password) input component with auto-focus, backspace support, and customizable length.",
    details: [
      "Automatic focus shifting to the next input upon entry.",
      "Backspace handling to move focus back to the previous input.",
      "Arrow key navigation for seamless editing.",
      "Customizable length (defaults to 6 digits).",
      "Sleek visual design with smooth transitions."
    ],
    codes: {
      next: 'import { OTPVerification } from "@/components/ui/otp-verification";\n\nexport default function Example() {\n  return (\n    <OTPVerification \n      length={6} \n      onVerify={(code) => console.log(code)} \n    />\n  );\n}',
    },
    usage: [
      "Install: Run 'npx futureuikit add otp-verification'.",
      "Dependencies: Requires framer-motion and lucide-react.",
      "Usage: Drop into your verification or authentication flows.",
    ],
  }
];

// Deduplicate manual components by slug
const dedupedManual = Array.from(new Map(rawComponentsList.map(item => [item.slug, item])).values());

// Auto-generate missing components from registry
const missingFromList = Object.keys(registry).filter(slug => !dedupedManual.some(c => c.slug === slug));

const generatedComponents: ComponentItem[] = missingFromList.map((slug, index) => {
  return {
    id: 10000 + index,
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    type: "Uncategorized",
    slug: slug,
    category: "ui",
    description: `A dynamically discovered component.`,
    details: ["Generated metadata"],
    codes: { next: `import { ${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')} } from "@/components/ui/${slug}";` },
    usage: [`npx futureuikit add ${slug}`]
  };
});

export const componentsList: ComponentItem[] = [...dedupedManual, ...generatedComponents];

export { registry };
