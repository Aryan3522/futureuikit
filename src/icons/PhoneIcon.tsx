"use client";
import React, { forwardRef } from "react";
import { Phone as LucideIcon, LucideProps } from "lucide-react";

export const PhoneIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
PhoneIcon.displayName = "PhoneIcon";
