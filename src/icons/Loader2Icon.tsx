"use client";
import React, { forwardRef } from"react";
import { Loader2 as LucideIcon, LucideProps } from"lucide-react";

export const Loader2Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
Loader2Icon.displayName ="Loader2Icon";
