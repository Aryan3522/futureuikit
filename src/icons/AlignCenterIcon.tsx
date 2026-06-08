"use client";
import React, { forwardRef } from"react";
import { AlignCenter as LucideIcon, LucideProps } from"lucide-react";

export const AlignCenterIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
AlignCenterIcon.displayName ="AlignCenterIcon";
