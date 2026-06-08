"use client";
import React, { forwardRef } from "react";
import { Copy as LucideIcon, LucideProps } from "lucide-react";

export const CopyIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
CopyIcon.displayName = "CopyIcon";
