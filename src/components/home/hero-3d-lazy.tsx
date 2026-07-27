"use client";

import dynamic from "next/dynamic";

/**
 * Client boundary that code-splits the three.js scene out of the critical
 * path. The hero text paints immediately; the 3D chunk streams in after.
 */
export const Hero3DLazy = dynamic(() => import("./hero-3d"), {
  ssr: false,
  loading: () => null,
});

export default Hero3DLazy;
