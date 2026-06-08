"use client";
import React, { forwardRef } from"react";
import { Table as LucideIcon, LucideProps } from"lucide-react";

export const TableIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
TableIcon.displayName ="TableIcon";
