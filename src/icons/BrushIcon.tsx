"use client";
import React, { forwardRef } from"react";
import { Brush as LucideIcon, LucideProps } from"lucide-react";

export const BrushIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
BrushIcon.displayName ="BrushIcon";
