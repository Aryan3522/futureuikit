"use client";
import React, { forwardRef } from "react";
import { Rows3 as LucideIcon, LucideProps } from "lucide-react";

export const Rows3Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
Rows3Icon.displayName = "Rows3Icon";
