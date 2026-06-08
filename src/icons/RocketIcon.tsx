"use client";
import React, { forwardRef } from"react";
import { Rocket as LucideIcon, LucideProps } from"lucide-react";

export const RocketIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
RocketIcon.displayName ="RocketIcon";
