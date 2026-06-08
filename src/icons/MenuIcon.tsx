"use client";
import React, { forwardRef } from"react";
import { Menu as LucideIcon, LucideProps } from"lucide-react";

export const MenuIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
MenuIcon.displayName ="MenuIcon";
