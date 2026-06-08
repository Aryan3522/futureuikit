"use client";
import React, { forwardRef } from"react";
import { Compass as LucideIcon, LucideProps } from"lucide-react";

export const CompassIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
CompassIcon.displayName ="CompassIcon";
