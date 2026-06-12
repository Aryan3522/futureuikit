import { JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AppProviders from "@/next/AppProviders";
import { Footer } from "@/components/ui/footer";
import Script from "next/script";
import React from "react";
import { Metadata, Viewport } from "next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const BASE_URL = "https://futureuikit.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ─── Primary Meta ───────────────────────────────────────────────────────────
  title: {
    default: "Future UI — React 19 Component Library with Tailwind CSS 4 & Framer Motion",
    template: "%s | Future UI",
  },
  description:
    "Future UI is a free, open-source React 19 component library built with Tailwind CSS 4 and Framer Motion. Ship stunning, accessible, high-performance UIs in seconds. The best React UI library for modern web apps.",

  // ─── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    "React 19 component library",
    "React UI library",
    "Next.js component library",
    "Tailwind CSS UI components",
    "Framer Motion components",
    "Future UI",
    "open source React components",
    "accessible UI components",
    "modern UI library",
    "React design system",
    "animated React components",
    "UI kit React",
    "headless UI React",
    "beautiful React components",
    "free React UI library",
    "TypeScript UI components",
  ],

  // ─── Authorship & Canonical ──────────────────────────────────────────────────
  authors: [{ name: "Future UI Team", url: BASE_URL }],
  creator: "Future UI",
  publisher: "Future UI",
  category: "Technology",
  alternates: {
    canonical: "/",
  },

  // ─── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Future UI",
    title: "Future UI — React 19 Component Library with Tailwind CSS 4 & Framer Motion",
    description:
      "Elevate your web apps with Future UI. A high-performance, accessible, and visually stunning React 19 component library powered by Tailwind CSS 4 and Framer Motion. Build faster, design better.",
    images: [
      {
        url: "/og-image.png", // 🔁 Create a 1200×630px OG image and place it in /public
        width: 1200,
        height: 630,
        alt: "Future UI — React 19 Component Library",
        type: "image/png",
      },
    ],
  },

  // ─── Twitter / X Card ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@futureuikit", // 🔁 Replace with your Twitter/X handle
    creator: "@futureui",
    title: "Future UI — React 19 Component Library",
    description:
      "Ship stunning UIs in seconds. Free, open-source React 19 component library with Tailwind CSS 4 + Framer Motion.",
    images: ["/og-image.png"],
  },

  // ─── Icons ──────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/FUI.ico", sizes: "any" },
      { url: "/FUI.webp", type: "image/webp" },
      { url: "/icon-192.webp", sizes: "192x192", type: "image/png" }, // 🔁 Add if available
      { url: "/icon-512.webp", sizes: "512x512", type: "image/png" }, // 🔁 Add if available
    ],
    shortcut: "/FUI.webp",
    apple: "/FUI.webp",
  },

  // ─── Manifest ───────────────────────────────────────────────────────────────
  manifest: "/site.webmanifest", // 🔁 Create /public/site.webmanifest (see note below)

  // ─── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Verification ───────────────────────────────────────────────────────────
  verification: {
    google: "PrvjZ6MJSP4TCXj26hfV4wj7yqaQZLfk-DUaL8VE3Ok",
    // yandex: "your-yandex-token",   // 🔁 Add if targeting Russian market
    // bing: "your-bing-token",        // 🔁 Add for Bing Webmaster Tools
  },

  // ─── App Links & Classification ─────────────────────────────────────────────
  applicationName: "Future UI",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // ⚠️ Changed from 1 — Google penalizes user-scalable=no for accessibility
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },   // 🔁 Match your dark bg
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Future UI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: BASE_URL,
  description:
    "Future UI is a free, open-source React 19 component library built with Tailwind CSS 4 and Framer Motion for building stunning, accessible web interfaces.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Future UI",
    url: BASE_URL,
  },
  keywords:
    "React component library, React 19, Tailwind CSS, Framer Motion, UI components, open source",
  softwareVersion: "0.2.5", // 🔁 Keep updated with your actual version
  license: "https://github.com/Aryan3522/future-ui/blob/main/LICENSE", // 🔁 Update if different
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          id="dark-mode"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add('dark');}catch(_){}})();`,
          }}
        />
      </head>
      <body
        className="antialiased bg-background text-foreground overflow-x-clip selection:bg-secondary/30"
        suppressHydrationWarning
      >
        <div className="fixed inset-0 noise-overlay z-100" aria-hidden="true" />
        <AppProviders>
          <div className="flex flex-col min-h-screen @container">
            {children}
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}