"use client";
import React, { forwardRef } from"react";
import { CreditCard as LucideIcon, LucideProps } from"lucide-react";

export const CreditCardIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
 return <LucideIcon ref={ref} {...props} />;
});
CreditCardIcon.displayName ="CreditCardIcon";
