"use client";
import React, { forwardRef } from "react";
import { Type as LucideIcon, LucideProps } from "lucide-react";

export const TypeIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
TypeIcon.displayName = "TypeIcon";
