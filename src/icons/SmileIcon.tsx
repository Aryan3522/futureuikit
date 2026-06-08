"use client";
import React, { forwardRef } from"react";
import { Smile as LucideIcon, LucideProps } from"lucide-react";

export const SmileIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
SmileIcon.displayName ="SmileIcon";
