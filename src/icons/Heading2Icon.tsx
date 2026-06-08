"use client";
import React, { forwardRef } from "react";
import { Heading2 as LucideIcon, LucideProps } from "lucide-react";

export const Heading2Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
Heading2Icon.displayName = "Heading2Icon";
