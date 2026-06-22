import { NextResponse } from"next/server";
import { registry } from"@/data/component-library-data";

export const dynamic ="force-static";

export function generateStaticParams() {
 return Object.keys(registry).map((slug) => ({
 slug,
 }));
}

export async function GET(
 _req: Request,
 { params }: { params: Promise<{ slug: string }> }
) {
 const { slug } = await params;
 const component = registry[slug];

 if (!component) {
 return NextResponse.json(
 { error:"Component not found"},
 { status: 404 }
 );
 }

  // Deep clone to avoid mutating the original registry object
  const cleanComponent = JSON.parse(JSON.stringify(component));

  // Content is already stripped of DocBlocks by the sync script (sync.mjs).
  // Only trim whitespace — do NOT strip code comments (they are useful for end users).
  cleanComponent.files = cleanComponent.files.map((file: any) => ({
  ...file,
  content: file.content.trim()
  }));

  return NextResponse.json(cleanComponent);
}
