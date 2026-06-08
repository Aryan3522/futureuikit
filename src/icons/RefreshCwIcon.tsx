"use client";
import React, { forwardRef } from"react";
import { RefreshCw as LucideIcon, LucideProps } from"lucide-react";

export const RefreshCwIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
RefreshCwIcon.displayName ="RefreshCwIcon";
