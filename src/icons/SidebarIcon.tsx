"use client";
import React, { forwardRef } from "react";
import { Sidebar as LucideIcon, LucideProps } from "lucide-react";

export const SidebarIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
SidebarIcon.displayName = "SidebarIcon";
