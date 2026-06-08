"use client";
import React, { forwardRef } from"react";
import { Delete as LucideIcon, LucideProps } from"lucide-react";

export const DeleteIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
DeleteIcon.displayName ="DeleteIcon";
