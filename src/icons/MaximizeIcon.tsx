"use client";
import React, { forwardRef } from "react";
import { Maximize as LucideIcon, LucideProps } from "lucide-react";

export const MaximizeIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
MaximizeIcon.displayName = "MaximizeIcon";
