"use client";
import React, { forwardRef } from "react";
import { BrainCircuit as LucideIcon, LucideProps } from "lucide-react";

export const BrainCircuitIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
BrainCircuitIcon.displayName = "BrainCircuitIcon";
