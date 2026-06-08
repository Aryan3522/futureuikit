"use client";
import React, { forwardRef } from "react";
import { Italic as LucideIcon, LucideProps } from "lucide-react";

export const ItalicIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
ItalicIcon.displayName = "ItalicIcon";
