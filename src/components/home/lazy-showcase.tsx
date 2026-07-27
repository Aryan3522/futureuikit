"use client";

import React from "react";
import dynamic from "next/dynamic";

/**
 * Defers the heavy horizontal showcase (three.js, GLB models, workflow
 * builder, chat) until the user approaches it. Low-end devices never pay
 * for it up front, and the initial page stays light.
 */
const ShowcaseHorizontal = dynamic(
  () => import("./showcase-horizontal").then((m) => ({ default: m.ShowcaseHorizontal })),
  { ssr: false, loading: () => null }
);

export function LazyShowcase() {
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      // Start loading one viewport ahead of arrival
      { rootMargin: "100% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef} className="min-h-screen">
      {load ? (
        <ShowcaseHorizontal />
      ) : (
        <div className="h-screen flex items-center justify-center">
          <span className="font-mono-label text-xs uppercase tracking-[0.3em] text-muted-foreground/50 animate-pulse">
            Loading showcase…
          </span>
        </div>
      )}
    </div>
  );
}
