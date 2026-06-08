"use client"
import React, { Suspense } from"react";
import Comps from"@/components/Comps";

export default function Page() {
 return (
 <Suspense fallback={<div className="h-full w-full flex items-center justify-center min-h-[50vh]">Loading...</div>}>
 <Comps />
 </Suspense>
 );
}
