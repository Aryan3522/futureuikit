"use client";
import React, { forwardRef } from "react";
import { Image as LucideIcon, LucideProps } from "lucide-react";

export const ImageIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
ImageIcon.displayName = "ImageIcon";
