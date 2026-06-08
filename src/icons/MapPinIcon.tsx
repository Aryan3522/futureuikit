"use client";
import React, { forwardRef } from "react";
import { MapPin as LucideIcon, LucideProps } from "lucide-react";

export const MapPinIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
MapPinIcon.displayName = "MapPinIcon";
