import { notFound } from "next/navigation";
import ComponentsCategoryPage from "@/route-components/CompsCategory";
import ComponentDetail from "@/route-components/ComponentDetail";
import React from "react";

interface PageProps {
  params: Promise<{
    segments: string[];
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const segments = params?.segments ?? [];

  if (segments.length === 1) {
    return <ComponentsCategoryPage category={segments[0]} />;
  }

  if (segments.length === 3) {
    const [type, slug, id] = segments;

    return (
      <ComponentDetail
        type={type}
        slug={slug}
        id={id}
      />
    );
  }

  return notFound();
}