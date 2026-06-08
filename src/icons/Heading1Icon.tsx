"use client";
import React, { forwardRef } from "react";
import { Heading1 as LucideIcon, LucideProps } from "lucide-react";

export const Heading1Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
Heading1Icon.displayName = "Heading1Icon";
