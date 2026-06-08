"use client";
import React, { forwardRef } from "react";
import { File as LucideIcon, LucideProps } from "lucide-react";

export const FileIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
FileIcon.displayName = "FileIcon";
