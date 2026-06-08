"use client";
import React, { forwardRef } from "react";
import { ThumbsDown as LucideIcon, LucideProps } from "lucide-react";

export const ThumbsDownIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
ThumbsDownIcon.displayName = "ThumbsDownIcon";
