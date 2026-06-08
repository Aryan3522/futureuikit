"use client";
import React, { forwardRef } from "react";
import { Pencil as LucideIcon, LucideProps } from "lucide-react";

export const PencilIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
PencilIcon.displayName = "PencilIcon";
