"use client";
import React, { forwardRef } from "react";
import { Clock as LucideIcon, LucideProps } from "lucide-react";

export const ClockIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
ClockIcon.displayName = "ClockIcon";
