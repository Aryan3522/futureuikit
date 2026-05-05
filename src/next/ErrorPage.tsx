"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/ui/header";

export default function ErrorPage() {
  return (
    <div className="relative min-h-screen bg-transparent text-foreground">
      <Header />
      <main className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Page not found
        </p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          This route doesn&apos;t exist.
        </h1>
        <p className="mb-8 max-w-xl text-muted-foreground">
          The page you tried to open could not be found. You can head back home
          and keep exploring the portfolio from there.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground transition hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back Home
        </Link>
      </main>
    </div>
  );
}
