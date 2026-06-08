"use client";
import React, { forwardRef } from "react";
import { Link as LucideIcon, LucideProps } from "lucide-react";

export const LinkIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
LinkIcon.displayName = "LinkIcon";
