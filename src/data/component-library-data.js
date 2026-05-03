import { registry } from './registryData';

export const componentsList = [
  {
    "id": 1,
    "title": "Primary Button",
    "type": "Button",
    "slug": "primary",
    "category": "form",
    "heroImage": "/Images/primary-button.webp",
    "previewImage": "/Images/primary-button.webp",
    "previewVideo": "/Videos/Primary-button.webm",
    "description": "A fully modern and customizable primary button designed for high-end UI. It features multiple variants (modern, clean, minimal), smooth framer-motion animations, and full color profile support. No shadows are used, keeping it clean and professional for any project.",
    "details": [
      "Built with React and Framer Motion for smooth, organic interactions.",
      "Supports multiple visual variants: Modern, Clean, and Minimal.",
      "Fully customizable color profile via props.",
      "Zero-shadow design for a clean, professional aesthetic.",
      "Smooth scale and filter animations on hover and tap.",
      "Highly reusable and easy to integrate into any Next.js project."
    ],
    "codes": {
      "next": "import { PrimaryButton } from \"@/components/ui/primary-button\";\n\nexport default function Example() {\n  return (\n    <div className=\"flex gap-4\">\n      <PrimaryButton variant=\"modern\" color=\"#6366f1\">Modern</PrimaryButton>\n      <PrimaryButton variant=\"clean\" color=\"#10b981\">Clean</PrimaryButton>\n      <PrimaryButton variant=\"minimal\" color=\"#f59e0b\">Minimal</PrimaryButton>\n    </div>\n  );\n}"
    },
    "usage": [
      "Add the button HTML markup to your page or component.",
      "Apply the primary button CSS class to style it.",
      "Place the button where a main action is required, such as forms or CTAs.",
      "Update the button text to match your action, like Submit or Save.",
      "Customize colors or size in CSS if needed to fit your design."
    ]
  },
  {
    "id": 2,
    "title": "Glowy Button",
    "type": "Button",
    "slug": "glowy",
    "category": "form",
    "heroImage": "/Images/glowy-button.webp",
    "previewImage": "/Images/glowy-button.webp",
    "previewVideo": "/Videos/hover-glow-button.webm",
    "description": "A glowy button built using HTML and CSS that features a subtle glowing effect to grab user attention. It highlights important actions with a modern, visually appealing style while remaining lightweight and easy to integrate into any web interface. Ideal for call-to-action buttons where you want extra emphasis without sacrificing usability.",
    "details": [
      "Built using pure HTML and CSS with no external libraries. ",
      "Features a glowing effect that enhances visibility and visual appeal. ",
      "Uses box-shadow or gradient styles to create a soft neon-like glow. ",
      "Includes hover and focus states for interactive feedback. ",
      "Fully responsive and compatible with all modern browsers. ",
      "Easy to customize — change glow color, intensity, or size in CSS. ",
      "Ideal for call-to-action buttons that need extra emphasis. "
    ],
    "codes": {
      "next": "import { GlowyButton } from \"@/components/ui/glowy-button\";\n\nexport default function Example() {\n  return (\n    <GlowyButton onClick={() => console.log(\"Glow!\")}>\n      Hover Me\n    </GlowyButton>\n  );\n}"
    },
    "usage": [
      "Add the glowy button HTML markup to your page or component.",
      "Apply the glowy button CSS class to enable the glow effect.",
      "Use the button to highlight important or special actions.",
      "Update the button text to reflect the intended action.",
      "Adjust glow color, intensity, or size in CSS to match your design."
    ]
  },
  {
    "id": 3,
    "title": "Basic Card",
    "type": "Cards",
    "slug": "basic-card",
    "category": "layout",
    "heroImage": "/Images/basic-card.webp",
    "previewImage": "/Images/basic-card.webp",
    "previewVideo": "/Videos/Basic-card.webm",
    "description": "A modern, highly flexible card component with multiple variants and built-in animations. Designed to be clean and minimal, it avoids heavy shadows in favor of subtle borders and glassmorphism. Perfect for profiles, feature blocks, and data display.",
    "details": [
      "Built with Framer Motion for smooth entry and hover animations.",
      "Supports Modern (Glass), Clean (Solid), and Minimal (Outline) variants.",
      "Fully customizable color scheme for icons and primary actions.",
      "Minimalist design without heavy shadows for a clean look.",
      "Responsive layout that adapts to any container.",
      "Easily configurable stats and call-to-action buttons."
    ],
    "codes": {
      "next": "import { BasicCard } from \"@/components/ui/basic-card\";\n\nexport default function Example() {\n  return (\n    <BasicCard \n      variant=\"modern\"\n      color=\"#6366f1\"\n      name=\"Aryan Hooda\"\n      title=\"Full Stack Developer\"\n    />\n  );\n}"
    },
    "usage": [
      "Import BasicCard into your React component.",
      "Choose a variant: 'modern', 'clean', or 'minimal'.",
      "Pass a custom color for the avatar and primary button.",
      "Provide stats and descriptions as needed to fit your use case.",
      "Add onClick handlers for primary and secondary actions."
    ]
  },
  {
    "id": 4,
    "title": "Rotating Loader",
    "type": "Loader",
    "slug": "boxy-rotate",
    "category": "ui",
    "heroImage": "/Images/Loading-screen1.webp",
    "previewImage": "/Images/Loading-screen1.webp",
    "previewVideo": "/Videos/boxy-preloader-1.webm",
    "description": "A modern box-style loading screen with four rotating blocks that creates a smooth and engaging visual while content is loading. Ideal for pages, sections, or actions where users need clear feedback that a process is in progress.",
    "details": [
      "Shows four boxes rotating to indicate an active loading state. ",
      "Gives users clear visual feedback that something is in progress. ",
      "Works well for page loads, API calls, and background tasks. ",
      "Lightweight and smooth animation for a modern UI feel. ",
      "Easy to customize colors and size using CSS. ",
      "Can be used as a full-screen loader or inside small sections. "
    ],
    "codes": {
      "next": "import { BoxyRotateLoader } from \"@/components/ui/boxy-rotate-loader\";\n\nexport default function Example() {\n  return <BoxyRotateLoader />;\n}"
    },
    "usage": [
      "Add the loading screen markup to the page where content may take time to load.",
      "Place it inside a container that will hold your main content.",
      "Display the loader while data is being fetched or a task is processing.",
      "Hide the loader once the content or result is ready to show.",
      "Use it on full pages, sections, or inside buttons for visual feedback.",
      "Keep it centered using flex or grid for a clean loading state.",
      "Adjust colors in CSS to match your application theme if needed."
    ]
  },
  {
    "id": 5,
    "title": "Bouncy Loader",
    "type": "Loader",
    "slug": "boxy-bounce",
    "category": "ui",
    "heroImage": "/Images/Loading-screen2.webp",
    "previewImage": "/Images/Loading-screen2.webp",
    "previewVideo": "/Videos/boxy-preloader-2.webm",
    "description": "A clean loading screen with stacked boxes that rise and fall in sequence, giving a clear sense of ongoing activity while content or data is being loaded.",
    "details": [
      "Uses multiple boxes moving up and down to show loading progress. ",
      "Helps users understand that a process is currently running. ",
      "Suitable for page loads, API requests, and async actions. ",
      "Smooth animation keeps the interface feeling responsive. ",
      "Lightweight and easy to integrate into any layout. ",
      "Colors and size can be customized through CSS variables. "
    ],
    "codes": {
      "next": "import { BoxyBounceLoader } from \"@/components/ui/boxy-bounce-loader\";\n\nexport default function Example() {\n  return <BoxyBounceLoader />;\n}"
    },
    "usage": [
      "Insert the loading screen markup where content may take time to appear.",
      "Place it inside the container that will later show your main content.",
      "Display it during data fetching, API calls, or background processing.",
      "Remove or hide it once the task is completed and content is ready.",
      "Use it in pages, sections, or modals to indicate active progress.",
      "Center it within the layout for better visual focus.",
      "Adjust colors and size in CSS to match your application style."
    ]
  },
  {
    "id": 6,
    "title": "Boxy Loader",
    "type": "Loader",
    "slug": "boxy-shift",
    "category": "ui",
    "heroImage": "/Images/Loading-screen3.webp",
    "previewImage": "/Images/Loading-screen3.webp",
    "previewVideo": "/Videos/boxy-preloader-3.webm",
    "description": "A dynamic box-style loading screen where blocks stretch and shift positions, creating a smooth visual cue that content is being prepared in the background.",
    "details": [
      "Shows boxes stretching and changing positions to indicate loading. ",
      "Gives clear feedback that work is happening in the background. ",
      "Well suited for page loads, data processing, and transitions. ",
      "Smooth animation keeps users engaged during wait times. ",
      "Lightweight design that doesn’t impact performance. ",
      "Easy to customize size and colors using CSS. "
    ],
    "codes": {
      "next": "import { BoxyShiftLoader } from \"@/components/ui/boxy-shift-loader\";\n\nexport default function Example() {\n  return <BoxyShiftLoader />;\n}"
    },
    "usage": [
      "Add the loading screen markup to the area where content will appear after loading.",
      "Place it inside a wrapper that controls your layout or section.",
      "Show it while heavy tasks or data processing are running.",
      "Hide it as soon as the final content is ready to display.",
      "Use it on full pages or inside cards, modals, and panels.",
      "Keep it centered to maintain a clear focus during loading.",
      "Tweak colors and size in CSS to fit your design system."
    ]
  },
  {
    "id": 7,
    "title": "Typography System",
    "type": "Typography",
    "slug": "text-system",
    "category": "ui",
    "heroImage": "/Images/Typography.webp",
    "previewImage": "/Images/Typography.webp",
    "previewVideo": "/Videos/Typography-1.webm",
    "description": "Typography showcases a set of foundational text styles built with simple, reusable CSS to ensure consistency and readability across the interface. It demonstrates examples of heading levels, body text, muted text, and caption text, providing a clear visual hierarchy for content. Designed as a baseline typographic system, it helps maintain a cohesive look and makes it easy to apply uniform text styles throughout your application.",
    "details": [
      "Demonstrates heading levels to create a clear content hierarchy.",
      "Includes body text styles optimized for readability and spacing.",
      "Shows muted text for secondary or less prominent information.",
      "Provides caption text styles for labels and small annotations.",
      "Uses simple, reusable CSS rules for consistent typography.",
      "Helps maintain a uniform text system across the entire UI."
    ],
    "codes": {
      "next": "import { HeadingOne, BodyText } from \"@/components/ui/typography\";\n\nexport default function Example() {\n  return (\n    <div>\n      <HeadingOne>Hello World</HeadingOne>\n      <BodyText>This is a reusable typography system.</BodyText>\n    </div>\n  );\n}"
    },
    "usage": [
      "Use the heading styles to structure titles and section headers in your layouts.",
      "Apply body text styles for main content and longer paragraphs.",
      "Use muted text for secondary information or helper descriptions.",
      "Apply caption text for labels, notes, and small annotations.",
      "Keep typography consistent across pages by reusing the same classes.",
      "Combine text styles with spacing utilities for better readability.",
      "Customize font sizes, weights, and colors in CSS to fit your design system."
    ]
  },
  {
    "id": 8,
    "title": "Carousel Slider",
    "type": "Carousel",
    "slug": "infinite-slider",
    "category": "ui",
    "heroImage": "/Images/infinite-carousel-swiper.webp",
    "previewImage": "/Images/infinite-carousel-swiper.webp",
    "previewVideo": "/Videos/infinite-carousel-1.webm",
    "description": "A premium, cinematic carousel slider powered by Framer Motion. It features smooth physics-based transitions, staggered content entry, and interactive navigation elements. Designed for high-impact visual storytelling with full responsiveness.",
    "details": [
      "Advanced animations using Framer Motion's AnimatePresence.",
      "Cinematic slide transitions with staggered content reveals.",
      "Interactive navigation arrows and smart pagination dots.",
      "Automatic progress indicator synchronized with the auto-play timer.",
      "Supports high-resolution images with sophisticated gradient overlays.",
      "Fully responsive and optimized for both touch and mouse interactions."
    ],
    "codes": {
      "next": "import { CarouselSlider } from \"@/components/ui/carousel-slider\";\n\nconst slides = [\n  { id: 1, title: \"EXOTIC ADVENTURE\", tag: \"EXPLORE\", location: \"Bali, Indonesia\", image: \"...\" },\n  { id: 2, title: \"URBAN EXPLORER\", tag: \"CITY\", location: \"Tokyo, Japan\", image: \"...\" },\n];\n\nexport default function Example() {\n  return <CarouselSlider slides={slides} autoPlayInterval={5000} />;\n}"
    },
    "usage": [
      "Import CarouselSlider into your page or section.",
      "Provide an array of slide objects with title, tag, location, and image.",
      "Adjust autoPlayInterval to control the slide duration.",
      "Use high-quality images for the best visual impact.",
      "Position the slider within a full-width or large-container layout."
    ]
  },
  {
    "id": 9,
    "title": "NavMenu",
    "type": "Navigation",
    "slug": "menu",
    "category": "ui",
    "heroImage": "/Images/circle-navbar.webp",
    "previewImage": "/Images/circle-navbar.webp",
    "previewVideo": "/Videos/circle-menu.webm",
    "description": "Circle Navigation Menu is a modern, interactive navigation component built using pure HTML and CSS. It features a compact trigger button that expands into a circular menu, revealing navigation links arranged around the center. With smooth transitions and a clean radial layout, it delivers an engaging user experience while saving screen space. Ideal for portfolios and creative interfaces, this menu adds a premium, futuristic touch without relying on JavaScript.",
    "details": [
      "Opens a circular navigation layout from a single central button.",
      "Displays menu items arranged around the center for quick access.",
      "Provides an interactive and visually engaging navigation experience.",
      "Uses smooth CSS transitions for opening and closing animations.",
      "Ideal for portfolios, landing pages, and creative interfaces.",
      "Built with pure HTML and CSS, making it lightweight and easy to customize."
    ],
    "codes": {
      "next": "import { NavMenu } from \"@/components/ui/nav-menu\";\n\nconst items = [\n  { title: \"Home\", icon: <span>🏠</span> },\n  { title: \"Settings\", icon: <span>⚙️</span> },\n];\n\nexport default function Example() {\n  return <NavMenu items={items} />;\n}"
    },
    "usage": [
      "Add the circular nav menu markup where your site navigation should appear.",
      "Place it inside a wrapper that controls positioning and layering on the page.",
      "Use the main button as the trigger to open and close the circular menu.",
      "Show the menu when users need quick access to primary navigation links.",
      "Use it on landing pages, portfolios, or sections with limited space.",
      "Keep it centered or anchored for a balanced and intuitive layout.",
      "Adjust sizes, spacing, and colors in CSS to match your design system."
    ]
  },
  {
    "id": 10,
    "title": "Error Page",
    "type": "Feedback",
    "slug": "error-page",
    "category": "ui",
    "heroImage": "/Images/Error-page.webp",
    "previewImage": "/Images/Error-page.webp",
    "previewVideo": "/Videos/Error-page.webm",
    "description": "Error Page is a simple, user-friendly fallback screen designed to handle broken routes, missing content, or unexpected issues gracefully. It informs users that something went wrong while guiding them back to a safe path with clear messaging and navigation options. Built with a clean layout and responsive design, this page helps maintain a polished experience even when errors occur.",
    "details": [
      "Displays a clear message when a page is not found or an error occurs.",
      "Helps users understand that something went wrong without confusion.",
      "Provides action buttons or links to navigate back to safe pages.",
      "Maintains a clean and consistent layout with the rest of the UI.",
      "Works well for 404, 500, and general fallback scenarios.",
      "Designed to be lightweight and easy to customize with CSS."
    ],
    "codes": {
      "next": "import { FeedbackPage } from \"@/components/ui/feedback-page\";\n\nexport default function Example() {\n  return <FeedbackPage errorCode=\"404\" errorText=\"NOT FOUND\" />;\n}"
    },
    "usage": [
      "Add the error page markup to handle missing routes or unexpected errors.",
      "Render it when a user navigates to an invalid or unavailable page.",
      "Provide a clear call-to-action to return to the home or main page.",
      "Use it as a fallback for 404, 500, or general error scenarios.",
      "Import the required Google Fonts in your CSS to match the preview typography.",
      "Keep the layout simple and centered for better readability.",
      "Customize colors, spacing, and messages in CSS to fit your design system."
    ]
  },
  {
    "id": 11,
    "title": "Expanding Flex Card",
    "type": "Cards",
    "slug": "expanding-card",
    "category": "layout",
    "heroImage": "/Images/Expanding-flex-cards.webp",
    "previewImage": "/Images/Expanding-flex-cards.webp",
    "previewVideo": "/Videos/Expanding-flex-cards.webm",
    "description": "Interactive Expanding Cards is a set of image-based cards where one card stays open by default and the others remain closed. When a user clicks on any card, it smoothly expands to show its content while all other cards collapse. This creates a clean and engaging way to highlight one item at a time, making it perfect for galleries, feature sections, or category showcases.",
    "details": [
      "Displays a row of cards where one card is expanded by default.",
      "Expands the clicked card while collapsing all other cards.",
      "Uses smooth transitions for width, scale, and content reveal.",
      "Supports background images for each card using CSS variables.",
      "Shows an icon and text label inside every card.",
      "Keeps the layout responsive by hiding cards on smaller screens.",
      "Highlights one item at a time for better focus and readability."
    ],
    "codes": {
      "next": "import { ExpandingFlexCard } from \"@/components/ui/expanding-flex-card\";\n\nconst options = [\n  { id: 1, main: \"Title\", sub: \"Subtitle\", img: \"...\", icon: \"🌟\" }\n];\n\nexport default function Example() {\n  return <ExpandingFlexCard options={options} />;\n}"
    },
    "usage": [
      "Add the cards container and option markup to the section where you want the cards to appear.",
      "Keep one card marked as active to make it open by default on page load.",
      "Use JavaScript to toggle the active class so the clicked card expands and others collapse.",
      "Set each card’s background image using the --optionBackground CSS variable.",
      "Place icons and text inside the label area to describe each card’s content.",
      "Adjust heights, widths, and border-radius values in CSS to change the card shape and size.",
      "Customize colors, shadows, and transitions in the styles to match your design system.",
      "Use media queries to control how many cards are visible on smaller screens.",
      "Replace text, icons, and images to adapt the cards for galleries, features, or categories.",
      "Test interactions to ensure only one card stays open at a time for the best experience."
    ]
  },
  {
    "id": 12,
    "title": "Basic Loader",
    "type": "Loader",
    "slug": "basic",
    "category": "loader",
    "heroImage": "/Images/Loading-spinner.webp",
    "previewImage": "/Images/Loading-spinner.webp",
    "previewVideo": "/Videos/Loading-spinner.webm",
    "description": "A modern, animated loading indicator with multiple visual styles. Built with Framer Motion, it provides smooth and engaging feedback while users wait for content or data to load.",
    "details": [
      "Built with Framer Motion for high-quality, smooth animations.",
      "Supports Modern (Rings), Clean (Dots), and Minimal (Circle) variants.",
      "Fully customizable color for the loading indicator.",
      "Lightweight and highly responsive design.",
      "Optional animated loading text with a pulse effect.",
      "Perfect for page transitions, API calls, and data fetching states."
    ],
    "codes": {
      "next": "import { BasicLoader } from \"@/components/ui/basic-loader\";\n\nexport default function Example() {\n  return (\n    <div className=\"flex flex-col gap-8\">\n      <BasicLoader variant=\"modern\" color=\"#3b82f6\" text=\"Modern Rings...\" />\n      <BasicLoader variant=\"clean\" color=\"#10b981\" text=\"Clean Dots...\" />\n      <BasicLoader variant=\"minimal\" color=\"#f59e0b\" text=\"Minimalist...\" />\n    </div>\n  );\n}"
    },
    "usage": [
      "Import BasicLoader into your React component.",
      "Choose a variant: 'modern', 'clean', or 'minimal'.",
      "Pass a custom color to match your brand's theme.",
      "Optionally provide a custom loading text or disable it.",
      "Use it to indicate progress during asynchronous operations."
    ]
  }
];

export { registry };
