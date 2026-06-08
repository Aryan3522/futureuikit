"use client";
import React, { forwardRef } from "react";
import { Eye as LucideIcon, LucideProps } from "lucide-react";

export const EyeIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
EyeIcon.displayName = "EyeIcon";
