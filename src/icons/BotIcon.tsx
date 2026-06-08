"use client";
import React, { forwardRef } from"react";
import { Bot as LucideIcon, LucideProps } from"lucide-react";

export const BotIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
BotIcon.displayName ="BotIcon";
