"use client";
import React, { forwardRef } from"react";
import { HelpCircle as LucideIcon, LucideProps } from"lucide-react";

export const HelpCircleIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
HelpCircleIcon.displayName ="HelpCircleIcon";
