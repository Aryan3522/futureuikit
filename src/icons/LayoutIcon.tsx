"use client";
import React, { forwardRef } from"react";
import { Layout as LucideIcon, LucideProps } from"lucide-react";

export const LayoutIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
LayoutIcon.displayName ="LayoutIcon";
