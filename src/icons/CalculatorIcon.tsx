"use client";
import React, { forwardRef } from "react";
import { Calculator as LucideIcon, LucideProps } from "lucide-react";

export const CalculatorIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
CalculatorIcon.displayName = "CalculatorIcon";
