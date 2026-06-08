"use client";
import React, { forwardRef } from"react";
import { Navigation as LucideIcon, LucideProps } from"lucide-react";

export const NavigationIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
NavigationIcon.displayName ="NavigationIcon";
