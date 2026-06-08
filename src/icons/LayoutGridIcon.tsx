"use client";
import React, { forwardRef } from "react";
import { LayoutGrid as LucideIcon, LucideProps } from "lucide-react";

export const LayoutGridIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
LayoutGridIcon.displayName = "LayoutGridIcon";
