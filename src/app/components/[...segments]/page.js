import { notFound } from "next/navigation";
import ComponentsCategoryPage from "@/route-components/CompsCategory";
import ComponentDetail from "@/route-components/ComponentDetail";

export default async function Page({ params }) {
  const { segments = [] } = await params;

  if (segments.length === 1) {
    return <ComponentsCategoryPage category={segments[0]} />;
  }

  if (segments.length === 3) {
    const [type, slug, id] = segments;
    return <ComponentDetail type={type} slug={slug} id={id} />;
  }

  notFound();
}
