"use client";
import React, { forwardRef } from "react";
import { Heading4 as LucideIcon, LucideProps } from "lucide-react";

export const Heading4Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
Heading4Icon.displayName = "Heading4Icon";
