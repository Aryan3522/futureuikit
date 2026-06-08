"use client";
import React, { forwardRef } from "react";
import { Calendar as LucideIcon, LucideProps } from "lucide-react";

export const CalendarIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
CalendarIcon.displayName = "CalendarIcon";
