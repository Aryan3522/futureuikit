"use client";
import React, { forwardRef } from"react";
import { Upload as LucideIcon, LucideProps } from"lucide-react";

export const UploadIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
UploadIcon.displayName ="UploadIcon";
