"use client";
import React, { forwardRef } from "react";
import { FileCode as LucideIcon, LucideProps } from "lucide-react";

export const FileCodeIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
FileCodeIcon.displayName = "FileCodeIcon";
