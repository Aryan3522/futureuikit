"use client";
import React, { forwardRef } from "react";
import { Mail as LucideIcon, LucideProps } from "lucide-react";

export const MailIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
MailIcon.displayName = "MailIcon";
