"use client";
import React, { forwardRef } from"react";
import { AlertCircle as LucideIcon, LucideProps } from"lucide-react";

export const AlertCircleIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
AlertCircleIcon.displayName ="AlertCircleIcon";
