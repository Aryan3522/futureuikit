"use client";

import dynamic from "next/dynamic";

/** Code-splits the persistent 3D journey out of the critical path. */
export const Journey3DLazy = dynamic(() => import("./journey-3d"), {
  ssr: false,
  loading: () => null,
});

export default Journey3DLazy;
