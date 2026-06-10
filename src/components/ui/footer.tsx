import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-background relative z-10 mt-auto">
      <div className="max-w-350 mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display text-xl font-bold tracking-tighter text-foreground">FUTURE_UI</span>
          <span className="font-mono text-[13px] text-[#c6c6c7]">© {new Date().getFullYear()} FUTURE UI. PRECISION ENGINEERED.</span>
        </div>
        <div className="flex items-center gap-8">
          <Link className="font-mono text-[13px] text-[#988e90] hover:text-foreground/80 transition-colors opacity-80 hover:opacity-100" href="/privacy">Privacy</Link>
          <Link className="font-mono text-[13px] text-[#988e90] hover:text-foreground/80 transition-colors opacity-80 hover:opacity-100" href="/terms">Terms</Link>
          <a className="font-mono text-[13px] text-[#988e90] hover:text-foreground/80 transition-colors opacity-80 hover:opacity-100" href="https://github.com/Aryan3522/future-ui" target="_blank">Github</a>
          <a className="font-mono text-[13px] text-[#988e90] hover:text-foreground/80 transition-colors opacity-80 hover:opacity-100" href="#">Discord</a>
        </div>
      </div>
    </footer>
  );
}
