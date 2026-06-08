"use client";
import React, { forwardRef } from"react";
import { Underline as LucideIcon, LucideProps } from"lucide-react";

export const UnderlineIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
UnderlineIcon.displayName ="UnderlineIcon";
