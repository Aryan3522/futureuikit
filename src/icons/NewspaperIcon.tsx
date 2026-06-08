"use client";
import React, { forwardRef } from"react";
import { Newspaper as LucideIcon, LucideProps } from"lucide-react";

export const NewspaperIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
NewspaperIcon.displayName ="NewspaperIcon";
