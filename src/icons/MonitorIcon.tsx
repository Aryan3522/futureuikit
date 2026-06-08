"use client";
import React, { forwardRef } from "react";
import { Monitor as LucideIcon, LucideProps } from "lucide-react";

export const MonitorIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
MonitorIcon.displayName = "MonitorIcon";
