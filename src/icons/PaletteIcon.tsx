"use client";
import React, { forwardRef } from "react";
import { Palette as LucideIcon, LucideProps } from "lucide-react";

export const PaletteIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
PaletteIcon.displayName = "PaletteIcon";
