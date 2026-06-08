"use client";
import React, { forwardRef } from"react";
import { CheckSquare as LucideIcon, LucideProps } from"lucide-react";

export const CheckSquareIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
CheckSquareIcon.displayName ="CheckSquareIcon";
