"use client";
import React, { forwardRef } from"react";
import { ListOrdered as LucideIcon, LucideProps } from"lucide-react";

export const ListOrderedIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
ListOrderedIcon.displayName ="ListOrderedIcon";
