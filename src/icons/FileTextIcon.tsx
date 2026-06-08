"use client";
import React, { forwardRef } from"react";
import { FileText as LucideIcon, LucideProps } from"lucide-react";

export const FileTextIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
FileTextIcon.displayName ="FileTextIcon";
