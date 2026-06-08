"use client";
import React, { forwardRef } from"react";
import { Quote as LucideIcon, LucideProps } from"lucide-react";

export const QuoteIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
QuoteIcon.displayName ="QuoteIcon";
