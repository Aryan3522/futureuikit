"use client";
import React, { forwardRef } from "react";
import { ThumbsUp as LucideIcon, LucideProps } from "lucide-react";

export const ThumbsUpIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
ThumbsUpIcon.displayName = "ThumbsUpIcon";
