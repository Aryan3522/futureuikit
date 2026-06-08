"use client";
import React, { forwardRef } from "react";
import { User as LucideIcon, LucideProps } from "lucide-react";

export const UserIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
UserIcon.displayName = "UserIcon";
