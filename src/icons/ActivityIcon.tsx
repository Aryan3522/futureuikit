"use client";
import React, { forwardRef } from"react";
import { Activity as LucideIcon, LucideProps } from"lucide-react";

export const ActivityIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
ActivityIcon.displayName ="ActivityIcon";
