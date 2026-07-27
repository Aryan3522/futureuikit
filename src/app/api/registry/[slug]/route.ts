import { NextResponse } from "next/server";
import { registry } from "@/data/registryData";

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({
    slug,
  }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Own-property lookup only — a bare `registry[slug]` resolves prototype
    // members ("constructor", "__proto__", ...) and crashes the handler.
    const component = Object.prototype.hasOwnProperty.call(registry, slug)
      ? registry[slug]
      : undefined;

    if (!component || !Array.isArray(component.files)) {
      return NextResponse.json({ error: "Component not found" }, { status: 404 });
    }

    // Deep clone to avoid mutating the original registry object
    const cleanComponent = JSON.parse(JSON.stringify(component));

    // Content is already stripped of DocBlocks by the sync script (sync.mjs).
    // Only trim whitespace — do NOT strip code comments (they are useful for end users).
    cleanComponent.files = cleanComponent.files.map((file: { content: string }) => ({
      ...file,
      content: file.content.trim(),
    }));

    return NextResponse.json(cleanComponent);
  } catch {
    return NextResponse.json({ error: "Internal registry error" }, { status: 500 });
  }
}
