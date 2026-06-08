"use client";
import React, { forwardRef } from"react";
import { MessageSquare as LucideIcon, LucideProps } from"lucide-react";

export const MessageSquareIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
MessageSquareIcon.displayName ="MessageSquareIcon";
