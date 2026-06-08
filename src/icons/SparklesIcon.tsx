"use client";
import React, { forwardRef } from"react";
import { Sparkles as LucideIcon, LucideProps } from"lucide-react";

export const SparklesIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
SparklesIcon.displayName ="SparklesIcon";
