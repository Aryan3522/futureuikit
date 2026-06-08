"use client";
import React, { forwardRef } from "react";
import { ImagePlus as LucideIcon, LucideProps } from "lucide-react";

export const ImagePlusIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
ImagePlusIcon.displayName = "ImagePlusIcon";
