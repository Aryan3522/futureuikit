"use client";
import React, { forwardRef } from"react";
import { Globe as LucideIcon, LucideProps } from"lucide-react";

export const GlobeIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
GlobeIcon.displayName ="GlobeIcon";
