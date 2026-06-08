"use client";
import React, { forwardRef } from "react";
import { GripVertical as LucideIcon, LucideProps } from "lucide-react";

export const GripVerticalIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
GripVerticalIcon.displayName = "GripVerticalIcon";
