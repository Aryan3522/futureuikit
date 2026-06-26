"use client";

/* eslint-disable react-hooks/static-components */
import React, { Suspense } from "react";
import { PreviewRegistry } from"@/route-components/PreviewRegistry";
import type { PreviewComponent } from "@/route-components/preview-engine/preview-types";

export interface ComponentRendererProps {
 slug: string;
 fallback?: React.ReactNode;
}

export function getRegistryPreview(slug: string): PreviewComponent | null {
  return PreviewRegistry[slug] ?? null;
}

export function ComponentRenderer({ slug, fallback }: ComponentRendererProps) {
 const Preview = getRegistryPreview(slug);

 if (Preview) {
 return <Preview />;
 }

 return fallback ?? null;
}
