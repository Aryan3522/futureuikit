"use client";
import React, { forwardRef } from"react";
import { Strikethrough as LucideIcon, LucideProps } from"lucide-react";

export const StrikethroughIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
StrikethroughIcon.displayName ="StrikethroughIcon";
