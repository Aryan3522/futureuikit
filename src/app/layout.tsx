import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import AppProviders from "@/next/AppProviders";
import { PointCursor } from "@/components/ui/PointCursor";
import Script from "next/script";
import React from "react";
import { Metadata } from "next";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <head>
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
      </head>
      <body
        className="antialiased bg-background text-foreground"
        suppressHydrationWarning
      >
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
