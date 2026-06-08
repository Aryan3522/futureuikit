"use client";
import React, { forwardRef } from "react";
import { Code2 as LucideIcon, LucideProps } from "lucide-react";

export const Code2Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
Code2Icon.displayName = "Code2Icon";
