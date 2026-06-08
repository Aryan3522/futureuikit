"use client";
import React, { forwardRef } from"react";
import { RefreshCcw as LucideIcon, LucideProps } from"lucide-react";

export const RefreshCcwIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
RefreshCcwIcon.displayName ="RefreshCcwIcon";
