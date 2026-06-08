"use client";
import React, { forwardRef } from "react";
import { StopCircle as LucideIcon, LucideProps } from "lucide-react";

export const StopCircleIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
StopCircleIcon.displayName = "StopCircleIcon";
