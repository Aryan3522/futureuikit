"use client";
import React, { forwardRef } from"react";
import { Divide as LucideIcon, LucideProps } from"lucide-react";

export const DivideIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
DivideIcon.displayName ="DivideIcon";
