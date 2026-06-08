"use client";
import React, { forwardRef } from "react";
import { Heading6 as LucideIcon, LucideProps } from "lucide-react";

export const Heading6Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
Heading6Icon.displayName = "Heading6Icon";
