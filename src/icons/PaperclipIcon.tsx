"use client";
import React, { forwardRef } from "react";
import { Paperclip as LucideIcon, LucideProps } from "lucide-react";

export const PaperclipIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
PaperclipIcon.displayName = "PaperclipIcon";
