"use client";
import React, { forwardRef } from"react";
import { Terminal as LucideIcon, LucideProps } from"lucide-react";

export const TerminalIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
TerminalIcon.displayName ="TerminalIcon";
