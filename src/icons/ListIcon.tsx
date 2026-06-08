"use client";
import React, { forwardRef } from"react";
import { List as LucideIcon, LucideProps } from"lucide-react";

export const ListIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
ListIcon.displayName ="ListIcon";
