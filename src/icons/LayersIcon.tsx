"use client";
import React, { forwardRef } from"react";
import { Layers as LucideIcon, LucideProps } from"lucide-react";

export const LayersIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
LayersIcon.displayName ="LayersIcon";
