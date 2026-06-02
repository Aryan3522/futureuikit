import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppProviders from "@/next/AppProviders";
import { PointCursor } from "@/components/ui/PointCursor";
import Script from "next/script";
import React from "react";
import { Metadata, Viewport } from "next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Future UI | The Next-Gen React 19 UI Library for Stunning Interfaces",
  description:
    "Elevate your web apps with Future UI. A high-performance, accessible, and visually stunning React 19 component library powered by Tailwind CSS 4 and Framer Motion. Build faster, design better, and ship beautiful UIs in seconds.",
  icons: {
    icon: "/FUI.ico",
    shortcut: "/FUI.webp",
    apple: "/FUI.webp",
  },
  verification: {
    google: "PrvjZ6MJSP4TCXj26hfV4wj7yqaQZLfk-DUaL8VE3Ok",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link href="https://cdn.jsdelivr.net/npm/geist@1.0.3/dist/fonts/geist-sans/Geist-Variable.woff2" rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" />
        <Script
          id="dark-mode"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('dark');
                } catch (_) {}
              })();
            `,
          }}
        />
        <Script
          id="disable-zoom"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.addEventListener('wheel', function(e) {
                  if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                  }
                }, { passive: false });
              })();
            `,
          }}
        />
      </head>
      <body
        className="antialiased bg-background text-foreground overflow-x-hidden selection:bg-secondary/30"
        suppressHydrationWarning
      >
        <div className="fixed inset-0 noise-overlay z-[100]"></div>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
