"use client";
import React, { forwardRef } from"react";
import { PackageCheck as LucideIcon, LucideProps } from"lucide-react";

export const PackageCheckIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
PackageCheckIcon.displayName ="PackageCheckIcon";
