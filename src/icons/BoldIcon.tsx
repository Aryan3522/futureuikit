"use client";
import React, { forwardRef } from "react";
import { Bold as LucideIcon, LucideProps } from "lucide-react";

export const BoldIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
BoldIcon.displayName = "BoldIcon";
