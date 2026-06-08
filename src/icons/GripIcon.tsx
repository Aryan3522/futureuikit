"use client";
import React, { forwardRef } from"react";
import { Grip as LucideIcon, LucideProps } from"lucide-react";

export const GripIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
GripIcon.displayName ="GripIcon";
