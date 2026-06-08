"use client";
import React, { forwardRef } from"react";
import { Check as LucideIcon, LucideProps } from"lucide-react";

export const CheckIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
CheckIcon.displayName ="CheckIcon";
