"use client";
import React, { forwardRef } from"react";
import { Filter as LucideIcon, LucideProps } from"lucide-react";

export const FilterIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
FilterIcon.displayName ="FilterIcon";
