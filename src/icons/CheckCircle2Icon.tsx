"use client";
import React, { forwardRef } from "react";
import { CheckCircle2 as LucideIcon, LucideProps } from "lucide-react";

export const CheckCircle2Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
CheckCircle2Icon.displayName = "CheckCircle2Icon";
