"use client";
import React, { forwardRef } from"react";
import { Home as LucideIcon, LucideProps } from"lucide-react";

export const HomeIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
HomeIcon.displayName ="HomeIcon";
