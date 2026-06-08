"use client";
import React, { forwardRef } from"react";
import { GalleryHorizontal as LucideIcon, LucideProps } from"lucide-react";

export const GalleryHorizontalIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
GalleryHorizontalIcon.displayName ="GalleryHorizontalIcon";
