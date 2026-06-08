"use client";
import React, { forwardRef } from"react";
import { Square as LucideIcon, LucideProps } from"lucide-react";

export const SquareIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
SquareIcon.displayName ="SquareIcon";
