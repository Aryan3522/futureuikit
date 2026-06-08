"use client";
import React, { forwardRef } from "react";
import { Video as LucideIcon, LucideProps } from "lucide-react";

export const VideoIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return <LucideIcon ref={ref} {...props} />;
});
VideoIcon.displayName = "VideoIcon";
