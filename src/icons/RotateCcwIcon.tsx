"use client";
import React, { forwardRef } from "react";
import { RotateCcw as LucideIcon, LucideProps } from "lucide-react";

export const RotateCcwIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
RotateCcwIcon.displayName = "RotateCcwIcon";
