"use client";
import React, { forwardRef } from "react";
import { Highlighter as LucideIcon, LucideProps } from "lucide-react";

export const HighlighterIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
HighlighterIcon.displayName = "HighlighterIcon";
