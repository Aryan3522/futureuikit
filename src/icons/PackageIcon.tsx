"use client";
import React, { forwardRef } from "react";
import { Package as LucideIcon, LucideProps } from "lucide-react";

export const PackageIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
PackageIcon.displayName = "PackageIcon";
