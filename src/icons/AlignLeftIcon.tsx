"use client";
import React, { forwardRef } from"react";
import { AlignLeft as LucideIcon, LucideProps } from"lucide-react";

export const AlignLeftIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
AlignLeftIcon.displayName ="AlignLeftIcon";
