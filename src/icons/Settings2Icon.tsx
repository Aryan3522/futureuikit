"use client";
import React, { forwardRef } from "react";
import { Settings2 as LucideIcon, LucideProps } from "lucide-react";

export const Settings2Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
Settings2Icon.displayName = "Settings2Icon";
