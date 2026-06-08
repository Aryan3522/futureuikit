"use client";
import React, { forwardRef } from"react";
import { Minus as LucideIcon, LucideProps } from"lucide-react";

export const MinusIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
MinusIcon.displayName ="MinusIcon";
