"use client";
import React, { forwardRef } from "react";
import { Lock as LucideIcon, LucideProps } from "lucide-react";

export const LockIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
LockIcon.displayName = "LockIcon";
