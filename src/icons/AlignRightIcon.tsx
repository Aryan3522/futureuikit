"use client";
import React, { forwardRef } from"react";
import { AlignRight as LucideIcon, LucideProps } from"lucide-react";

export const AlignRightIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
AlignRightIcon.displayName ="AlignRightIcon";
