"use client";
import React, { forwardRef } from"react";
import { Shield as LucideIcon, LucideProps } from"lucide-react";

export const ShieldIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
ShieldIcon.displayName ="ShieldIcon";
