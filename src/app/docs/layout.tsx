import React, { Suspense } from"react";
import { Header } from"@/components/ui/header";
import { DocsSidebar } from"@/components/layout/DocsSidebar";
import { GlobalBreadcrumb } from"@/components/ui/global-breadcrumb";

export default function DocsLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <div className="min-h-screen bg-background text-foreground flex flex-col font-body-md overflow-clip relative">
 {/* Persistent Top Header */}
 <Header />

 {/* Main Layout Area */}
 <div className="flex-1 max-w-[1400px] w-full mx-auto flex items-start px-4 md:px-8">
 {/* Persistent Left Sidebar */}
 <Suspense fallback={<div className="w-64 shrink-0 hidden lg:block border-r border-border/40"/>}>
 <DocsSidebar />
 </Suspense>

 {/* Dynamic Content Area */}
 <main className="flex-1 min-w-0 w-full lg:pl-8 py-8 md:py-12">
 <GlobalBreadcrumb />
 {children}
 </main>
 </div>
 </div>
 );
}
