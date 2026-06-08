"use client";
import React, { forwardRef } from"react";
import { Settings as LucideIcon, LucideProps } from"lucide-react";

export const SettingsIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
SettingsIcon.displayName ="SettingsIcon";
