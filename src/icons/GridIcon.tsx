"use client";
import React, { forwardRef } from "react";
import { Grid as LucideIcon, LucideProps } from "lucide-react";

export const GridIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
GridIcon.displayName = "GridIcon";
