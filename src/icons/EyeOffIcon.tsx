"use client";
import React, { forwardRef } from"react";
import { EyeOff as LucideIcon, LucideProps } from"lucide-react";

export const EyeOffIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
EyeOffIcon.displayName ="EyeOffIcon";
