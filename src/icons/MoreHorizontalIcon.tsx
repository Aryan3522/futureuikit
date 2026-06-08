"use client";
import React, { forwardRef } from "react";
import { MoreHorizontal as LucideIcon, LucideProps } from "lucide-react";

export const MoreHorizontalIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
MoreHorizontalIcon.displayName = "MoreHorizontalIcon";
