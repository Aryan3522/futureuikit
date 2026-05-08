import { registry } from "./registryData";
import { ComponentItem } from "@/types";

export const componentsList: ComponentItem[] = [
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
      "Add the button HTML markup to your page or component.",
      "Apply the primary button CSS class to style it.",
      "Place the button where a main action is required, such as forms or CTAs.",
      "Update the button text to match your action, like Submit or Save.",
      "Customize colors or size in CSS if needed to fit your design.",
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
      "Import the GlowyButton component from your UI directory.",
      "Choose a semantic variant (primary, success, etc.) or provide custom colors.",
      "Optionally pass a Lucide icon component via the 'icon' prop.",
      "Add your button text as children of the component.",
      "Use it for high-impact call-to-action buttons that need extra visual emphasis.",
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
      "Import BasicCard into your React component.",
      "Choose a variant: 'modern', 'clean', or 'minimal'.",
      "Pass a custom color for the avatar and primary button.",
      "Provide stats and descriptions as needed to fit your use case.",
      "Add onClick handlers for primary and secondary actions.",
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
      "Add the loading screen markup to the page where content may take time to load.",
      "Place it inside a container that will hold your main content.",
      "Display the loader while data is being fetched or a task is processing.",
      "Hide the loader once the content or result is ready to show.",
      "Use it on full pages, sections, or inside buttons for visual feedback.",
      "Keep it centered using flex or grid for a clean loading state.",
      "Adjust colors in CSS to match your application theme if needed.",
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
      "Insert the loading screen markup where content may take time to appear.",
      "Place it inside the container that will later show your main content.",
      "Display it during data fetching, API calls, or background processing.",
      "Remove or hide it once the task is completed and content is ready.",
      "Use it in pages, sections, or modals to indicate active progress.",
      "Center it within the layout for better visual focus.",
      "Adjust colors and size in CSS to match your application style.",
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
      "Add the loading screen markup to the area where content will appear after loading.",
      "Place it inside a wrapper that controls your layout or section.",
      "Show it while heavy tasks or data processing are running.",
      "Hide it as soon as the final content is ready to display.",
      "Use it on full pages or inside cards, modals, and panels.",
      "Keep it centered to maintain a clear focus during loading.",
      "Tweak colors and size in CSS to fit your design system.",
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
      "Use the heading styles to structure titles and section headers in your layouts.",
      "Apply body text styles for main content and longer paragraphs.",
      "Use muted text for secondary information or helper descriptions.",
      "Apply caption text for labels, notes, and small annotations.",
      "Keep typography consistent across pages by reusing the same classes.",
      "Combine text styles with spacing utilities for better readability.",
      "Customize font sizes, weights, and colors in CSS to fit your design system.",
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
      "Import CarouselSlider into your page or section.",
      "Provide an array of slide objects with title, tag, location, and image.",
      "Adjust autoPlayInterval to control the slide duration.",
      "Use high-quality images for the best visual impact.",
      "Position the slider within a full-width or large-container layout.",
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
      "Add the circular nav menu markup where your site navigation should appear.",
      "Place it inside a wrapper that controls positioning and layering on the page.",
      "Use the main button as the trigger to open and close the circular menu.",
      "Show the menu when users need quick access to primary navigation links.",
      "Use it on landing pages, portfolios, or sections with limited space.",
      "Keep it centered or anchored for a balanced and intuitive layout.",
      "Adjust sizes, spacing, and colors in CSS to match your design system.",
    ],
  },
  {
    id: 10,
    title: "Error Page",
    type: "Feedback",
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
      "Add the error page markup to handle missing routes or unexpected errors.",
      "Render it when a user navigates to an invalid or unavailable page.",
      "Provide a clear call-to-action to return to the home or main page.",
      "Use it as a fallback for 404, 500, or general error scenarios.",
      "Import the required Google Fonts in your CSS to match the preview typography.",
      "Keep the layout simple and centered for better readability.",
      "Customize colors, spacing, and messages in CSS to fit your design system.",
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
      "Import ExpandingFlexCard and provide an array of card options.",
      "The component automatically handles the responsive transition between flex and carousel layouts.",
      "On mobile, users can drag the carousel to browse cards.",
      "On larger screens, clicking a card expands it while others collapse.",
      "Customize the 'className' to adjust the overall container spacing.",
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
      "Import BasicLoader into your React component.",
      "Choose a variant: 'modern', 'clean', or 'minimal'.",
      "Pass a custom color to match your brand's theme.",
      "Optionally provide a custom loading text or disable it.",
      "Use it to indicate progress during asynchronous operations.",
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
      "Add the Toaster component to your root layout (src/app/layout.tsx).",
      "Ensure Toaster is used as a self-closing component: <Toaster />.",
      "Use the useToast hook from '@/hooks/use-toast' to trigger notifications.",
      "Pass title and description strings to the toast function.",
      "Customize the variant to 'destructive' for error messages."
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
      "Import DotBackground into your React component.",
      "Use it as a wrapper around your content or as a separate layer.",
      "Adjust the dotSize and gap to fit your design's scale.",
      "Change the dotColor to match your brand (defaults to 'currentColor').",
      "Tweak the maskOpacity to control how much the grid fades towards the edges.",
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
      "Import the Badge component from your UI directory.",
      "Choose a variant: 'default', 'secondary', 'destructive', or 'outline'.",
      "Add your label text as children of the component.",
      "Use it for tags, status indicators, or small labels across your UI.",
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
      "Import the Button component from your UI directory.",
      "Select the desired variant and size via props.",
      "Use the 'asChild' prop if you need to render the button as a different element (like a Next.js Link).",
      "Add icons or text as children.",
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
      "Import the required card sub-components from your UI directory.",
      "Compose your card by wrapping content in the Card and its sub-components.",
      "Use Tailwind classes to customize the width, padding, or other styles.",
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
      "Import SidebarButton from your UI components.",
      "Use it within your sidebar layout for navigation links.",
      "Control the active state via the 'isActive' boolean prop.",
      "Use 'isCategory={true}' for nested navigation items.",
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
      "Import the Particles component.",
      "Place it as a background layer (usually with absolute or fixed positioning).",
      "Adjust the 'quantity' and 'color' to match your application's tone.",
      "Ensure the parent container has 'overflow-hidden' if using absolute positioning.",
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
      "Import PerspectiveGrid into your component.",
      "Use it as a background element in a container with 'relative' and 'overflow-hidden'.",
      "Adjust 'gridLineGap' to change the density of the grid.",
      "Tweak 'fadeRadius' to control how much of the grid is visible before fading into the background.",
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
      "Import SearchInput from your UI components directory.",
      "Place it in your header, sidebar, or any searchable section.",
      "Customize the placeholder text if needed.",
      "Optionally pass 'mobile={true}' for mobile-optimized layouts.",
    ],
  },
  {
    id: 22,
    title: "Github Icon",
    type: "Icons",
    slug: "github-icon",
    category: "ui",
    description:
      "A clean, reusable GitHub icon component built with SVG. Designed to be lightweight and easy to integrate into navigation menus, footers, or social links with full Tailwind CSS support.",
    details: [
      "Pure SVG implementation for maximum performance and clarity.",
      "Lightweight with zero external dependencies.",
      "Supports all standard SVG attributes and Tailwind CSS classes.",
      "Designed for consistent scaling across different UI sections.",
      "Perfect for social links, repository buttons, and footers.",
    ],
    codes: {
      next: 'import { GithubIcon } from "@/components/ui/github-icon";\n\nexport default function Example() {\n  return (\n    <div className="flex gap-4">\n      <GithubIcon className="w-6 h-6 text-foreground" />\n      <GithubIcon className="w-8 h-8 text-primary" />\n    </div>\n  );\n}',
    },
    usage: [
      "Import GithubIcon from your UI components directory.",
      "Apply Tailwind classes like 'w-5 h-5' to control the size.",
      "Use 'text-{color}' classes to match your application's theme.",
      "Wrap it in a link or button for interactive social elements.",
    ],
  },
  {
    id: 23,
    title: "Linkedin Icon",
    type: "Icons",
    slug: "linkedin-icon",
    category: "ui",
    description:
      "A professional LinkedIn icon component built with SVG. Lightweight, reusable, and fully customizable via Tailwind CSS for seamless integration into headers, footers, or contact pages.",
    details: [
      "High-fidelity SVG implementation for crisp rendering at any scale.",
      "Pure React component with zero external dependencies.",
      "Full support for Tailwind CSS color and sizing utilities.",
      "Standardized props interface for consistent usage across the project.",
      "Ideal for professional profiles, social link sections, and portfolios.",
    ],
    codes: {
      next: 'import { LinkedinIcon } from "@/components/ui/linkedin-icon";\n\nexport default function Example() {\n  return (\n    <div className="flex gap-4">\n      <LinkedinIcon className="w-6 h-6 text-foreground" />\n      <LinkedinIcon className="w-8 h-8 text-primary" />\n    </div>\n  );\n}',
    },
    usage: [
      "Import LinkedinIcon from your UI components directory.",
      "Use standard Tailwind sizing classes like 'w-5 h-5'.",
      "Apply text colors to match your design system.",
      "Encapsulate in a Link or Button for interactive professional links.",
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
      "Import ScrollProgress from your UI components directory.",
      "Place it at the top level of your layout or specific long-form pages.",
      "Ensure it is rendered outside of containers with 'overflow-hidden' for correct tracking.",
    ],
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
      "Import PointCursor from your UI components directory.",
      "Wrap the desired section, page, or layout with the PointCursor component.",
      "Optionally customize 'dotColor' and 'ringColor' to match your theme.",
      "Add the 'clickable' class to any custom elements you want the cursor to react to.",
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
      "Import the Accordion component into your page or section.",
      "Define an array of items, each with a 'title' and 'content'.",
      "Pass the items to the Accordion component.",
      "Use the 'allowMultiple' prop if you want users to be able to open more than one item at a time.",
    ],
  },
];

export { registry };
