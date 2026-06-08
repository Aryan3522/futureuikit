"use client";
import React, { forwardRef } from"react";
import { Heading3 as LucideIcon, LucideProps } from"lucide-react";

export const Heading3Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
Heading3Icon.displayName ="Heading3Icon";
