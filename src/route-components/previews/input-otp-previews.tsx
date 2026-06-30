"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

export const InputOTPPreview: React.FC = () => {
  const [previewColor, setPreviewColor] = useState<any>("default");
  const [previewVariant, setPreviewVariant] = useState<any>("outline");
  const [shape, setShape] = useState<any>("default");
  const [spacing, setSpacing] = useState<any>("default");
  const [theme, setTheme] = useState<any>("default");
  const [digitCount, setDigitCount] = useState<"4" | "6" | "8">("6");

  const renderSlots = (count: number) => {
    const slots = [];
    for (let i = 0; i < count; i++) {
      slots.push(<InputOTPSlot key={i} index={i} />);
    }
    return slots;
  };

  const renderGroupedSlots = () => {
    if (digitCount === "4") {
      return (
        <InputOTPGroup>
          {renderSlots(4)}
        </InputOTPGroup>
      );
    }
    if (digitCount === "6") {
      return (
        <>
          <InputOTPGroup>
            {renderSlots(3)}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {renderSlots(3).map((slot, i) => <InputOTPSlot key={i + 3} index={i + 3} />)}
          </InputOTPGroup>
        </>
      );
    }
    if (digitCount === "8") {
      return (
        <>
          <InputOTPGroup>
            {renderSlots(4)}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {renderSlots(4).map((slot, i) => <InputOTPSlot key={i + 4} index={i + 4} />)}
          </InputOTPGroup>
        </>
      );
    }
  };

  const extraControls = (
    <div className="flex flex-col gap-4 w-full mt-4 border-t border-border/50 pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Theme</span>
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["default", "modern", "clean", "futuristic", "brutal", "halftone"] as const).map(t => (
            <button key={t} onClick={() => setTheme(t)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", theme === t ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{t}</button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["default", "square", "rounded", "sharp"] as const).map(s => (
            <button key={s} onClick={() => setShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", shape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
            <button key={s} onClick={() => setSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg uppercase transition-all duration-300 whitespace-nowrap", spacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Digits</span>
        <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
          {(["4", "6", "8"] as const).map(d => (
            <button key={d} onClick={() => setDigitCount(d)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 whitespace-nowrap", digitCount === d ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{d}-Digit</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <PreviewContainer
      title="Input OTP"
      description="Accessible one-time password component with copy paste functionality."
      colors={DEFAULT_COLORS}
      activeColor={previewColor}
      onColorChange={setPreviewColor}
      variants={["outline", "solid", "ghost", "link"]}
      activeVariant={previewVariant}
      onVariantChange={setPreviewVariant}
      extraControls={extraControls}
    >
      <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-4 sm:p-8 overflow-x-auto max-w-full">
        <InputOTP 
          maxLength={Number(digitCount)}
          variant={previewVariant}
          color={previewColor}
          shape={shape}
          spacing={spacing}
          theme={theme}
        >
          {renderGroupedSlots()}
        </InputOTP>
      </div>
    </PreviewContainer>
  );
};
