import { NextResponse } from "next/server";
import { registry } from "@/data/component-library-data";

export async function GET(req, { params }) {
  const { slug } = await params;
  
  const component = registry[slug];

  if (!component) {
    return NextResponse.json(
      { error: "Component not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(component);
}
