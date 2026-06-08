"use client";
import React, { forwardRef } from"react";
import { AlignJustify as LucideIcon, LucideProps } from"lucide-react";

export const AlignJustifyIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
AlignJustifyIcon.displayName ="AlignJustifyIcon";
