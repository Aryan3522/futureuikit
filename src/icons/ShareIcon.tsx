"use client";
import React, { forwardRef } from"react";
import { Share as LucideIcon, LucideProps } from"lucide-react";

export const ShareIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
ShareIcon.displayName ="ShareIcon";
