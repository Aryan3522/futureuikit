"use client";
import React, { forwardRef } from "react";
import { Equal as LucideIcon, LucideProps } from "lucide-react";

export const EqualIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
EqualIcon.displayName = "EqualIcon";
