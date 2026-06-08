"use client";
import React, { forwardRef } from "react";
import { Play as LucideIcon, LucideProps } from "lucide-react";

export const PlayIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
PlayIcon.displayName = "PlayIcon";
