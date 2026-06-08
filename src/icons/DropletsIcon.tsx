"use client";
import React, { forwardRef } from "react";
import { Droplets as LucideIcon, LucideProps } from "lucide-react";

export const DropletsIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
DropletsIcon.displayName = "DropletsIcon";
