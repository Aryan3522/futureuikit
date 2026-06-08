"use client";
import React, { forwardRef } from "react";
import { Percent as LucideIcon, LucideProps } from "lucide-react";

export const PercentIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
PercentIcon.displayName = "PercentIcon";
