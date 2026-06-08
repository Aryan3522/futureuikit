"use client";
import React, { forwardRef } from"react";
import { Mic as LucideIcon, LucideProps } from"lucide-react";

export const MicIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
MicIcon.displayName ="MicIcon";
