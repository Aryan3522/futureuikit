"use client";

import React from"react";
import { PreviewRegistry } from"@/route-components/PreviewRegistry";
import { registry } from"@/data/component-library-data";

export interface ComponentRendererProps {
 slug: string;
 fallback?: React.ReactNode;
}

export function getRegistryPreview(slug: string): React.FC | null {
 if (!registry[slug]) return null;
 return PreviewRegistry[slug] ?? null;
}

export function ComponentRenderer({ slug, fallback }: ComponentRendererProps) {
 const Preview = getRegistryPreview(slug);

 if (!Preview) {
 return fallback ?? (
 <div className="text-center select-text opacity-50">
 Live Preview for {slug}
 </div>
 );
 }

 // eslint-disable-next-line react-hooks/static-components -- Registry previews are stable module-level components selected by slug.
 return <Preview />;
}
