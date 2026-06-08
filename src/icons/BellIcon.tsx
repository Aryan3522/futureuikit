"use client";
import React, { forwardRef } from "react";
import { Bell as LucideIcon, LucideProps } from "lucide-react";

export const BellIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
BellIcon.displayName = "BellIcon";
