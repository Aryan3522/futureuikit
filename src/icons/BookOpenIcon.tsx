"use client";
import React, { forwardRef } from "react";
import { BookOpen as LucideIcon, LucideProps } from "lucide-react";

export const BookOpenIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
BookOpenIcon.displayName = "BookOpenIcon";
