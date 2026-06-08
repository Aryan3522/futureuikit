"use client";
import React, { forwardRef } from"react";
import { Cpu as LucideIcon, LucideProps } from"lucide-react";

export const CpuIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
CpuIcon.displayName ="CpuIcon";
