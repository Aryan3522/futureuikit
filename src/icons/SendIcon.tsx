"use client";
import React, { forwardRef } from "react";
import { Send as LucideIcon, LucideProps } from "lucide-react";

export const SendIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
SendIcon.displayName = "SendIcon";
