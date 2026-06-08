"use client";
import React, { forwardRef } from"react";
import { ShieldCheck as LucideIcon, LucideProps } from"lucide-react";

export const ShieldCheckIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
ShieldCheckIcon.displayName ="ShieldCheckIcon";
