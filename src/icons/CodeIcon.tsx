"use client";
import React, { forwardRef } from"react";
import { Code as LucideIcon, LucideProps } from"lucide-react";

export const CodeIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
CodeIcon.displayName ="CodeIcon";
