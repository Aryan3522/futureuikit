"use client";
import React, { forwardRef } from "react";
import { Box as LucideIcon, LucideProps } from "lucide-react";

export const BoxIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
BoxIcon.displayName = "BoxIcon";
