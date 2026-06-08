"use client";
import React, { forwardRef } from "react";
import { Heading5 as LucideIcon, LucideProps } from "lucide-react";

export const Heading5Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
Heading5Icon.displayName = "Heading5Icon";
