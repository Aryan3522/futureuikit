"use client";
import React, { forwardRef } from"react";
import { MousePointerClick as LucideIcon, LucideProps } from"lucide-react";

export const MousePointerClickIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
MousePointerClickIcon.displayName ="MousePointerClickIcon";
