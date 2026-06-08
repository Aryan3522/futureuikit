"use client";
import React, { forwardRef } from "react";
import { MousePointer2 as LucideIcon, LucideProps } from "lucide-react";

export const MousePointer2Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
MousePointer2Icon.displayName = "MousePointer2Icon";
