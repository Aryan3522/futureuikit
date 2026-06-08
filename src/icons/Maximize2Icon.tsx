"use client";
import React, { forwardRef } from"react";
import { Maximize2 as LucideIcon, LucideProps } from"lucide-react";

export const Maximize2Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
Maximize2Icon.displayName ="Maximize2Icon";
