"use client";
import React, { forwardRef } from"react";
import { Edit2 as LucideIcon, LucideProps } from"lucide-react";

export const Edit2Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
Edit2Icon.displayName ="Edit2Icon";
