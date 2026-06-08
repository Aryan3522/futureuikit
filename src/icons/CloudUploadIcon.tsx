"use client";
import React, { forwardRef } from"react";
import { CloudUpload as LucideIcon, LucideProps } from"lucide-react";

export const CloudUploadIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
CloudUploadIcon.displayName ="CloudUploadIcon";
