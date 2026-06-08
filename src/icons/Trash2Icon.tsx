"use client";
import React, { forwardRef } from"react";
import { Trash2 as LucideIcon, LucideProps } from"lucide-react";

export const Trash2Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
Trash2Icon.displayName ="Trash2Icon";
